import PropTypes from "prop-types";
import { useEffect, useState } from "react";

// ── Integrazione Holo AI ──
// Lo script Holo (senza iframe) scrive gli articoli dentro #holo-blog con innerHTML,
// usa URL del tipo /blog?post=slug, imposta title/description/JSON-LD e un proprio canonical.
// Questa pagina:
//  - carica lo script solo quando il Blog è montato (lo script parte subito e richiede #holo-blog già nel DOM);
//  - mantiene UN SOLO canonical pulito (senza utm/gclid): /blog oppure /blog?post=slug;
//  - allinea og:/twitter: a title/description impostati da Holo;
//  - completa il JSON-LD di Holo (url pulito, mainEntityOfPage, publisher);
//  - ripulisce tutto quando si esce dal Blog.
const HOLO_SRC = "https://prod-api-holo-ai.fly.dev/public/seo/embed/025898da-d402-4286-b017-802561c20b57.js";
const SITE_URL = "https://www.taaac.solutions";
const BLOG_PATH = "/blog";

const getPostSlug = () => {
  try { return new URLSearchParams(window.location.search).get("post"); } catch(e) { return null; }
};
const isBlogPath = () => {
  try { return window.location.pathname.replace(/\/+$/, "") === BLOG_PATH; } catch(e) { return false; }
};
const cleanBlogUrl = (slug) => SITE_URL + BLOG_PATH + (slug ? "?" + new URLSearchParams({ post: slug }).toString() : "");

const removeHoloHeadTags = () => {
  try {
    document.querySelectorAll('link[rel="canonical"][data-holo]').forEach(el => el.remove());
    const ld = document.getElementById("holo-blog-jsonld");
    if(ld) ld.remove();
  } catch(e) {}
};

const setMetaByName = (name, content) => {
  let el = document.querySelector(`meta[name="${name}"]`);
  if(!el) { el = document.createElement("meta"); el.setAttribute("name", name); document.head.appendChild(el); }
  if(el.getAttribute("content") !== content) el.setAttribute("content", content);
};
const setMetaByProp = (prop, content) => {
  let el = document.querySelector(`meta[property="${prop}"]`);
  if(!el) { el = document.createElement("meta"); el.setAttribute("property", prop); document.head.appendChild(el); }
  if(el.getAttribute("content") !== content) el.setAttribute("content", content);
};

// Holo registra un listener popstate a ogni esecuzione e non espone un modo per rimuoverlo:
// quando l'utente usa Indietro/Avanti verso una pagina non-Blog, quei listener possono
// reimpostare title/description, reinserire il JSON-LD "Blog" o il loro canonical.
// Questo listener (unico, registrato una sola volta) ripristina subito dopo i valori della pagina
// corrente: setSEO() di App scrive sempre og:title/og:description uguali a title/description,
// e Holo non tocca mai i tag og:, quindi sono la fonte affidabile da cui ripristinare.
let popstateGuardInstalled = false;
const installPopstateGuard = () => {
  if(popstateGuardInstalled) return;
  popstateGuardInstalled = true;
  window.addEventListener("popstate", () => {
    setTimeout(() => {
      if(isBlogPath()) return;
      try {
        removeHoloHeadTags();
        setMetaByProp("og:type", "website");
        const ogTitle = document.querySelector('meta[property="og:title"]');
        const ogDesc = document.querySelector('meta[property="og:description"]');
        if(ogTitle && ogTitle.getAttribute("content") && document.title !== ogTitle.getAttribute("content")) document.title = ogTitle.getAttribute("content");
        if(ogDesc && ogDesc.getAttribute("content")) setMetaByName("description", ogDesc.getAttribute("content"));
      } catch(e) {}
    }, 0);
  });
};

// Stili scuri coerenti con il sito: sovrascrivono il tema chiaro di Holo (tutti i selettori di Holo
// sono già limitati a .holo-blog*, qui li limitiamo ulteriormente a .taaac-blog).
const BLOG_CSS = `
.taaac-blog .holo-blog{max-width:none;margin:0;color:#F5F0E8;font-family:inherit}
.taaac-blog .holo-blog-back{border-color:#555;color:#aaa}
.taaac-blog .holo-blog-back:hover{background:#161616;border-color:#C9A84C;color:#C9A84C}
.taaac-blog .holo-blog-card{background:#161616;border-color:#222}
.taaac-blog .holo-blog-card:hover{border-color:#C9A84C;box-shadow:0 4px 16px rgba(0,0,0,0.5)}
.taaac-blog .holo-blog-card-thumb,.taaac-blog .holo-blog-article-hero{background:#111}
.taaac-blog .holo-blog-card-title{color:#F5F0E8}
.taaac-blog .holo-blog-card:hover .holo-blog-card-title{color:#C9A84C}
.taaac-blog .holo-blog-card-excerpt{color:#a8a8a8}
.taaac-blog .holo-blog-card-date,.taaac-blog .holo-blog-article-date{color:#888}
.taaac-blog .holo-blog-article-title{color:#F5F0E8;font-weight:800}
.taaac-blog .holo-blog-article-content{color:#d8d4cc}
.taaac-blog .holo-blog-article-content h2,.taaac-blog .holo-blog-article-content h3,.taaac-blog .holo-blog-article-content h4{color:#C9A84C;line-height:1.3;margin:1.6em 0 .6em}
.taaac-blog .holo-blog-article-content a{color:#C9A84C;text-decoration:underline}
.taaac-blog .holo-blog-article-content img{max-width:100%;height:auto;border-radius:10px}
.taaac-blog .holo-blog-article-content ul,.taaac-blog .holo-blog-article-content ol{padding-left:1.3em;margin:0 0 1em}
.taaac-blog .holo-blog-article-content blockquote{border-left:3px solid #C9A84C;margin:1em 0;padding:.2em 0 .2em 1em;color:#a8a8a8}
.taaac-blog .holo-blog-article-content table{border-collapse:collapse;width:100%;margin:0 0 1em}
.taaac-blog .holo-blog-article-content th,.taaac-blog .holo-blog-article-content td{border:1px solid #333;padding:8px}
.taaac-blog .holo-blog-empty{color:#a8a8a8;border-color:#333}
`;

function BlogPage({ t6, S, C, navigateTo }) {
  const [isArticle, setIsArticle] = useState(() => !!getPostSlug());
  const [loadError, setLoadError] = useState(false);

  useEffect(() => {
    installPopstateGuard();

    let scheduled = false;
    // listMeta: title/description che App (setSEO) imposta per /blog — riconosciuti perché App scrive
    // anche og:title/og:description; articleMeta: title/description che Holo imposta aprendo un articolo.
    let listMeta = null, articleMeta = null, lastOgTitle = null, lastOgDesc = null;
    const sync = () => {
      scheduled = false;
      if(!isBlogPath()) return;
      try {
        const slug = getPostSlug();
        setIsArticle(!!slug);
        const getContent = (sel) => { const el = document.querySelector(sel); return el ? (el.getAttribute("content") || "") : ""; };

        // og:title/og:description cambiati da qualcun altro → li ha scritti App: sono i meta del Blog
        const ogTitleNow = getContent('meta[property="og:title"]');
        const ogDescNow = getContent('meta[property="og:description"]');
        if(ogTitleNow !== lastOgTitle || ogDescNow !== lastOgDesc) listMeta = { title: ogTitleNow, description: ogDescNow };

        // Holo ha appena aperto un articolo (crea il suo canonical solo in showArticle)
        const holoCanonicals = document.querySelectorAll('link[rel="canonical"][data-holo]');
        if(slug && holoCanonicals.length) articleMeta = { slug, title: document.title, description: getContent('meta[name="description"]') };
        holoCanonicals.forEach(el => el.remove());

        // Meta coerenti con la vista: elenco → quelli di App, articolo → quelli di Holo
        const meta = slug ? (articleMeta && articleMeta.slug === slug ? articleMeta : null) : listMeta;
        if(meta) {
          if(document.title !== meta.title) document.title = meta.title;
          setMetaByName("description", meta.description);
        }
        const title = document.title;
        const description = getContent('meta[name="description"]');

        // Canonical unico e pulito
        const url = cleanBlogUrl(slug);
        let canonical = document.querySelector('link[rel="canonical"]');
        if(!canonical) { canonical = document.createElement("link"); canonical.setAttribute("rel", "canonical"); document.head.appendChild(canonical); }
        if(canonical.getAttribute("href") !== url) canonical.setAttribute("href", url);

        // Social / Open Graph allineati a ciò che è visibile
        setMetaByProp("og:url", url);
        setMetaByProp("og:title", title);
        setMetaByProp("og:description", description);
        setMetaByProp("og:type", slug ? "article" : "website");
        setMetaByName("twitter:title", title);
        setMetaByName("twitter:description", description);
        lastOgTitle = title; lastOgDesc = description;

        // JSON-LD di Holo: url pulito + mainEntityOfPage + publisher
        const ld = document.getElementById("holo-blog-jsonld");
        if(ld) {
          const data = JSON.parse(ld.textContent || "{}");
          data.url = url;
          if(data["@type"] === "BlogPosting") {
            data.mainEntityOfPage = { "@type": "WebPage", "@id": url };
            if(!data.author) data.author = { "@type": "Organization", "name": "TAAAC Solutions", "url": SITE_URL + "/" };
          }
          data.publisher = { "@type": "Organization", "name": "TAAAC Solutions", "url": SITE_URL + "/" };
          const next = JSON.stringify(data);
          if(ld.textContent !== next) ld.textContent = next;
        }
      } catch(e) {}
    };
    const schedule = () => { if(!scheduled) { scheduled = true; Promise.resolve().then(sync); } };

    const headObserver = new MutationObserver(schedule);
    headObserver.observe(document.head, { childList:true, subtree:true, attributes:true, characterData:true });
    const container = document.getElementById("holo-blog");
    const bodyObserver = new MutationObserver(schedule);
    if(container) bodyObserver.observe(container, { childList:true, subtree:true, attributes:true, attributeFilter:["style"] });
    window.addEventListener("popstate", schedule);

    // Carica lo script Holo ora che #holo-blog esiste (a ogni visita del Blog)
    const script = document.createElement("script");
    script.src = HOLO_SRC;
    script.async = true;
    script.setAttribute("data-taaac-holo", "");
    script.onerror = () => setLoadError(true);
    document.body.appendChild(script);
    schedule();

    return () => {
      headObserver.disconnect();
      bodyObserver.disconnect();
      window.removeEventListener("popstate", schedule);
      try { script.remove(); } catch(e) {}
      removeHoloHeadTags();
      try { setMetaByProp("og:type", "website"); } catch(e) {}
    };
  }, []);

  const eyebrowStyle = {color:C.gold,fontSize:10,letterSpacing:4,fontWeight:700,marginBottom:14,textTransform:"uppercase"};

  return (
    <div style={{...S.sec, maxWidth:860}} className="taaac-blog">
      <style>{BLOG_CSS}</style>
      {isArticle ? (
        <div style={eyebrowStyle}>Blog · TAAAC Solutions</div>
      ) : (
        <>
          <div style={eyebrowStyle}>Blog</div>
          <h1 style={S.title}>{t6("Golf Cart Blog","Blog de Golf Carts","Blog sui Golf Cart","Blog Golf Cart","Blog o Wózkach Golfowych","Блог о гольф-карах")}</h1>
          <div style={{color:C.muted,fontSize:13,marginBottom:24,maxWidth:720,lineHeight:1.7}}>
            {t6(
              "News, tips and insights on electric golf carts in Bayahibe, Dominicus and the Dominican Republic.",
              "Noticias, consejos y novedades sobre carritos de golf eléctricos en Bayahibe, Dominicus y República Dominicana.",
              "Novità, consigli e approfondimenti sui golf cart elettrici a Bayahibe, Dominicus e in Repubblica Dominicana.",
              "Actualités, conseils et analyses sur les voiturettes de golf électriques à Bayahibe, Dominicus et en République Dominicaine.",
              "Aktualności, porady i ciekawostki o elektrycznych wózkach golfowych w Bayahibe, Dominicus i na Dominikanie.",
              "Новости, советы и материалы об электрических гольф-карах в Bayahibe, Dominicus и Доминиканской Республике."
            )}
          </div>
          <div style={S.goldLine}/>
        </>
      )}

      <div id="holo-blog"></div>

      {loadError && (
        <div style={{color:C.muted,fontSize:13,textAlign:"center",padding:"24px 0"}}>
          {t6(
            "The blog is temporarily unavailable. Please try again later.",
            "El blog no está disponible temporalmente. Inténtalo de nuevo más tarde.",
            "Il blog è temporaneamente non disponibile. Riprova più tardi.",
            "Le blog est temporairement indisponible. Veuillez réessayer plus tard.",
            "Blog jest chwilowo niedostępny. Spróbuj ponownie później.",
            "Блог временно недоступен. Пожалуйста, попробуйте позже."
          )}
        </div>
      )}

      <div style={{marginTop:40,paddingTop:24,borderTop:"1px solid #222",display:"flex",gap:20,justifyContent:"center",flexWrap:"wrap"}}>
        <a href="/guias" onClick={(e)=>navigateTo("/guias", e)} style={{color:C.gold,textDecoration:"underline",fontWeight:600,fontSize:13}}>
          {t6("Golf Cart Guides →","Guías de Golf Cart →","Guide sui Golf Cart →","Guides Golf Cart →","Poradniki Golf Cart →","Гайды по гольф-карам →")}
        </a>
        <a href="/contact" onClick={(e)=>navigateTo("/contact", e)} style={{color:C.gold,textDecoration:"underline",fontWeight:600,fontSize:13}}>
          {t6("Contact us →","Contáctanos →","Contattaci →","Contactez-nous →","Skontaktuj się z nami →","Связаться с нами →")}
        </a>
      </div>
    </div>
  );
}

BlogPage.propTypes = {
  t6: PropTypes.func.isRequired,
  S: PropTypes.object.isRequired,
  C: PropTypes.object.isRequired,
  navigateTo: PropTypes.func.isRequired,
};

export default BlogPage;
