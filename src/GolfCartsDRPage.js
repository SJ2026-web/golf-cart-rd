import PropTypes from "prop-types";

function GolfCartsDRPage({ t, t6, S, C, navigateTo, MODELS, Img }) {
  const faqs = [
    {
      q: t("Do you deliver golf carts throughout the Dominican Republic?","¿Entregan carritos de golf en toda República Dominicana?","Consegnate golf cart in tutta la Repubblica Dominicana?"),
      a: t("Yes. TAAAC Solutions is based in Bayahibe and delivers electric golf carts across the Dominican Republic.","Sí. TAAAC Solutions tiene su base en Bayahibe y entrega carritos de golf eléctricos en toda República Dominicana.","Sì. TAAAC Solutions ha sede a Bayahibe e consegna golf cart elettrici in tutta la Repubblica Dominicana."),
    },
    {
      q: t("Can I customize my golf cart?","¿Puedo personalizar mi carrito de golf?","Posso personalizzare il mio golf cart?"),
      a: t("Yes. Our online configurator lets you choose colors, seats, wheels, steering wheel and accessories for your golf cart.","Sí. Nuestro configurador en línea te permite elegir colores, asientos, ruedas, volante y accesorios para tu carrito de golf.","Sì. Il nostro configuratore online ti permette di scegliere colori, sedili, ruote, volante e accessori per il tuo golf cart."),
    },
    {
      q: t("Which golf cart model should I choose?","¿Qué modelo de carrito de golf debería elegir?","Quale modello di golf cart dovrei scegliere?"),
      a: t("It depends on your needs: Model A is classic and elegant, Model B is built for off-road terrain, Model C is sporty, and Model D is designed for family comfort. Our guided assistant can help you decide.","Depende de tus necesidades: el Model A es clásico y elegante, el Model B está hecho para terrenos todoterreno, el Model C es deportivo y el Model D está pensado para el confort familiar. Nuestro asistente guiado puede ayudarte a decidir.","Dipende dalle tue esigenze: il Model A è classico ed elegante, il Model B è pensato per terreni off-road, il Model C è sportivo e il Model D è progettato per il comfort in famiglia. Il nostro assistente guidato può aiutarti a scegliere."),
    },
    {
      q: t("How can I request information or a quote?","¿Cómo puedo solicitar información o una cotización?","Come posso richiedere informazioni o un preventivo?"),
      a: t("You can configure your golf cart online and submit a request, or contact us directly through our contact page.","Puedes configurar tu carrito de golf en línea y enviar tu solicitud, o contactarnos directamente a través de nuestra página de contacto.","Puoi configurare il tuo golf cart online e inviare la richiesta, oppure contattarci direttamente tramite la pagina contatti."),
    },
  ];

  const linkStyle = {color:C.gold,textDecoration:"underline",cursor:"pointer",fontWeight:600};

  return (
    <div style={{...S.sec, maxWidth:820}}>
      <h1 style={{...S.title,textAlign:"center"}}>{t6("Golf Carts in the Dominican Republic","Carritos de Golf en República Dominicana","Golf Cart in Repubblica Dominicana","Voiturettes de Golf en République Dominicaine","Wózki Golfowe na Dominikanie","Гольф-кары в Доминиканской Республике")}</h1>

      {/* Introduzione */}
      <p style={{color:C.muted,fontSize:15,lineHeight:1.8,marginBottom:32,textAlign:"center"}}>
        {t6(
          "TAAAC Solutions offers customizable electric golf carts for customers across the Dominican Republic. From Bayahibe and La Romana to Punta Cana and Cap Cana, customers can choose a model, personalize it online and arrange delivery and support.",
          "TAAAC Solutions ofrece carritos de golf eléctricos personalizables para clientes en toda República Dominicana. Desde Bayahibe y La Romana hasta Punta Cana y Cap Cana, puedes elegir tu modelo, personalizarlo online y organizar entrega y asistencia.",
          "TAAAC Solutions offre golf cart elettrici personalizzabili in tutta la Repubblica Dominicana. Da Bayahibe e La Romana fino a Punta Cana e Cap Cana, puoi scegliere il modello, personalizzarlo online e organizzare consegna e assistenza.",
          "TAAAC Solutions propose des voiturettes de golf électriques personnalisables dans toute la République Dominicaine. De Bayahibe et La Romana à Punta Cana et Cap Cana, choisissez votre modèle, personnalisez-le en ligne et organisez livraison et assistance.",
          "TAAAC Solutions oferuje personalizowane elektryczne wózki golfowe na całej Dominikanie. Od Bayahibe i La Romana po Punta Cana i Cap Cana możesz wybrać model, skonfigurować go online oraz ustalić dostawę i wsparcie.",
          "TAAAC Solutions предлагает персонализируемые электрические гольф-кары по всей Доминиканской Республике. От Bayahibe и La Romana до Punta Cana и Cap Cana можно выбрать модель, настроить её онлайн и организовать доставку и поддержку."
        )}
      </p>

      {/* Choose Your Golf Cart */}
      <h2 style={S.title}>{t("Choose Your Golf Cart","Elige tu Carrito de Golf","Scegli il tuo Golf Cart")}</h2>
      <div style={{...S.grid2, marginBottom:32}}>
        {MODELS.map(m => {
          const path = `/model-${m.id.toLowerCase()}`;
          return (
            <a key={m.id} href={path} onClick={(e)=>navigateTo(path, e)} style={{...S.card(false), textDecoration:"none", color:"inherit", display:"block"}}>
              <div style={{background:"#070707",borderRadius:10,marginBottom:10,display:"flex",justifyContent:"center",alignItems:"center",minHeight:110,overflow:"hidden"}}>
                <Img k={m.imgKey} style={{width:"100%",maxHeight:130}}/>
              </div>
              <div style={{color:C.gold,fontWeight:800,fontSize:15,marginBottom:4}}>
                {t(m.name.split(" / ")[0], m.name.split(" / ")[1], m.name.split(" / ")[2])}
              </div>
              <div style={{color:C.muted,fontSize:13,lineHeight:1.6}}>{t(m.desc.en, m.desc.es, m.desc.it)}</div>
            </a>
          );
        })}
      </div>

      {/* Customize Your Golf Cart */}
      <h2 style={S.title}>{t("Customize Your Golf Cart","Personaliza tu Carrito de Golf","Personalizza il tuo Golf Cart")}</h2>
      <p style={{color:C.muted,fontSize:15,lineHeight:1.8,marginBottom:16}}>
        {t(
          "Every TAAAC Solutions golf cart can be personalized through our online configurator — choose your model, colors, seats, wheels, steering wheel and accessories to build a golf cart that's truly yours.",
          "Cada carrito de golf de TAAAC Solutions puede personalizarse a través de nuestro configurador en línea — elige tu modelo, colores, asientos, ruedas, volante y accesorios para hacerlo verdaderamente tuyo.",
          "Ogni golf cart TAAAC Solutions può essere personalizzato tramite il nostro configuratore online — scegli modello, colori, sedili, ruote, volante e accessori per creare un golf cart davvero tuo."
        )}
      </p>
      <p style={{marginBottom:32}}>
        <a href="/configurator" onClick={(e)=>navigateTo("/configurator", e)} style={linkStyle}>
          {t("Start configuring your electric golf cart →","Empieza a configurar tu carrito de golf eléctrico →","Inizia a configurare il tuo golf cart elettrico →")}
        </a>
      </p>

      {/* Delivery Across the Dominican Republic */}
      <h2 style={S.title}>{t("Delivery Across the Dominican Republic","Entrega en Toda República Dominicana","Consegna in tutta la Repubblica Dominicana")}</h2>
      <p style={{color:C.muted,fontSize:15,lineHeight:1.8,marginBottom:16}}>
        {t(
          "TAAAC Solutions delivers electric golf carts throughout the Dominican Republic. We regularly serve areas such as Bayahibe, Dominicus, La Romana, Punta Cana, Bávaro and Santo Domingo — but these are just examples: delivery is available nationwide.",
          "TAAAC Solutions entrega carritos de golf eléctricos en toda República Dominicana. Atendemos regularmente zonas como Bayahibe, Dominicus, La Romana, Punta Cana, Bávaro y Santo Domingo — pero estos son solo ejemplos: la entrega está disponible en todo el país.",
          "TAAAC Solutions consegna golf cart elettrici in tutta la Repubblica Dominicana. Serviamo regolarmente zone come Bayahibe, Dominicus, La Romana, Punta Cana, Bávaro e Santo Domingo — ma sono solo esempi: la consegna è disponibile in tutto il paese."
        )}
      </p>
      <p style={{marginBottom:32}}>
        <a href="/golf-carts-bayahibe" onClick={(e)=>navigateTo("/golf-carts-bayahibe", e)} style={linkStyle}>
          {t6("golf carts in Bayahibe and Dominicus →","carritos de golf en Bayahibe y Dominicus →","golf cart a Bayahibe e Dominicus →","voiturettes de golf à Bayahibe et Dominicus →","wózki golfowe w Bayahibe i Dominicus →","гольф-кары в Bayahibe и Dominicus →")}
        </a>
      </p>
      <p style={{marginBottom:32}}>
        <a href="/como-elegir-carrito-de-golf-republica-dominicana" onClick={(e)=>navigateTo("/como-elegir-carrito-de-golf-republica-dominicana", e)} style={linkStyle}>
          {t6("Not sure which golf cart to choose? Read our complete guide →","¿No sabes qué carrito elegir? Lee nuestra guía completa →","Non sai quale golf cart scegliere? Leggi la nostra guida completa →","Vous ne savez pas quelle voiturette de golf choisir ? Consultez notre guide complet →","Nie wiesz, który wózek golfowy wybrać? Przeczytaj nasz kompletny przewodnik →","Не знаете, какой гольф-кар выбрать? Прочитайте наше полное руководство →")}
        </a>
      </p>

      {/* Why Choose an Electric Golf Cart */}
      <h2 style={S.title}>{t("Why Choose an Electric Golf Cart?","¿Por Qué Elegir un Carrito de Golf Eléctrico?","Perché Scegliere un Golf Cart Elettrico?")}</h2>
      <p style={{color:C.muted,fontSize:15,lineHeight:1.8,marginBottom:32}}>
        {t(
          "Electric golf carts are a practical, quiet and low-impact way to get around residences, villas, resorts, private communities and tourist properties in the Dominican Republic — as well as for local trips where their use is permitted.",
          "Los carritos de golf eléctricos son una forma práctica, silenciosa y de bajo impacto para moverse por residencias, villas, resorts, comunidades privadas y propiedades turísticas en República Dominicana — así como para trayectos locales donde su uso esté permitido.",
          "I golf cart elettrici sono un modo pratico, silenzioso e a basso impatto per muoversi tra residenze, ville, resort, comunità private e strutture turistiche in Repubblica Dominicana — così come per spostamenti locali dove il loro utilizzo è consentito."
        )}
      </p>

      {/* Service & Support */}
      <h2 style={S.title}>{t("Service & Support","Servicio y Asistencia","Assistenza e Supporto")}</h2>
      <p style={{color:C.muted,fontSize:15,lineHeight:1.8,marginBottom:16}}>
        {t(
          "TAAAC Solutions also offers maintenance, service and repairs for your golf cart, with local support in Bayahibe and La Romana.",
          "TAAAC Solutions también ofrece mantenimiento, servicio técnico y reparación para tu carrito de golf, con asistencia local en Bayahibe y La Romana.",
          "TAAAC Solutions offre anche manutenzione, assistenza e riparazione per il tuo golf cart, con supporto locale a Bayahibe e La Romana."
        )}
      </p>
      <p style={{marginBottom:32}}>
        <a href="/service" onClick={(e)=>navigateTo("/service", e)} style={linkStyle}>
          {t("Learn more about our service & repairs →","Conoce más sobre nuestro servicio y reparaciones →","Scopri di più su assistenza e riparazioni →")}
        </a>
      </p>

      {/* FAQ */}
      <h2 style={S.title}>{t("Frequently Asked Questions","Preguntas Frecuentes","Domande Frequenti")}</h2>
      <div style={{marginBottom:16}}>
        {faqs.map((f,i)=>(
          <div key={i} style={{marginBottom:20}}>
            <div style={{color:C.gold,fontWeight:700,fontSize:14,marginBottom:6}}>{f.q}</div>
            <div style={{color:C.muted,fontSize:14,lineHeight:1.7}}>{f.a}</div>
          </div>
        ))}
      </div>
      <p style={{marginBottom:40}}>
        <a href="/faq" onClick={(e)=>navigateTo("/faq", e)} style={linkStyle}>
          {t("See all FAQs →","Ver todas las preguntas frecuentes →","Vedi tutte le domande frequenti →")}
        </a>
      </p>

      {/* CTA finale */}
      <div style={{textAlign:"center",borderTop:"1px solid #222",paddingTop:32}}>
        <h2 style={{...S.title,fontSize:"clamp(1.4rem,4vw,1.9rem)"}}>{t("Ready to Find Your Golf Cart?","¿Listo para Encontrar tu Carrito de Golf?","Pronto a Trovare il Tuo Golf Cart?")}</h2>
        <div style={{display:"flex",flexWrap:"wrap",gap:12,justifyContent:"center",marginTop:16}}>
          <a href="/choose-your-golf-cart" onClick={(e)=>navigateTo("/choose-your-golf-cart", e)} style={{...S.goldBtn,textDecoration:"none",display:"inline-block"}}>{t("Get Guided","Déjate Guiar","Fatti Guidare")}</a>
          <a href="/configurator" onClick={(e)=>navigateTo("/configurator", e)} style={{...S.outBtn,textDecoration:"none",display:"inline-block"}}>{t("Configure Now","Configurar Ahora","Configura Ora")}</a>
          <a href="/contact" onClick={(e)=>navigateTo("/contact", e)} style={{...S.outBtn,textDecoration:"none",display:"inline-block"}}>{t("Contact Us","Contáctanos","Contattaci")}</a>
        </div>
      </div>
    </div>
  );
}

GolfCartsDRPage.propTypes = {
  t: PropTypes.func.isRequired,
  t6: PropTypes.func.isRequired,
  S: PropTypes.object.isRequired,
  C: PropTypes.object.isRequired,
  navigateTo: PropTypes.func.isRequired,
  MODELS: PropTypes.array.isRequired,
  Img: PropTypes.elementType.isRequired,
};

export default GolfCartsDRPage;
