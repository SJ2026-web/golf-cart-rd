import { useState, useRef } from "react";

function CustomerForm({onSubmit, totalPrice, model, cfg, lang="en", BATTERIES, MOTORS, SEAT_TYPES, TIRES, STEERING, WINDSHIELDS, OPTIONAL_ITEMS, ru, fr, pl}) {
  const t = (en,es,it) => lang==="ru"?ru(en):lang==="fr"?fr(en):lang==="pl"?pl(en):lang==="es"?es:lang==="it"?it:en;
  const [sent, setSent] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const [fieldErrors, setFieldErrors] = useState({});
  const payment1 = Math.round(totalPrice * 0.35);
  const payment2 = Math.round(totalPrice * 0.35);
  const payment3 = totalPrice - payment1 - payment2;
  const nomeRef = useRef();
  const cognomeRef = useRef();
  const telefonoRef = useRef();
  const emailRef = useRef();
  const indirizzoRef = useRef();
  const consegnaRef = useRef();
  const noteRef = useRef();
  const inp = {width:"100%",background:"#111",border:"1px solid #333",borderRadius:10,padding:"11px 14px",color:"#F5F0E8",fontSize:14,outline:"none",boxSizing:"border-box",fontFamily:"inherit"};
  const inpErr = {...inp, border:"1px solid #e05555"};
  const errText = {color:"#e05555",fontSize:11,marginTop:4};
  const validateFields = (nome, telefono, email) => {
    const errs = {};
    if(!nome.trim() || !/^[A-Za-zÀ-ÿ\s]+$/.test(nome.trim())) errs.nome = t("Letters only","Solo letras","Solo lettere");
    const digitCount = (telefono.match(/\d/g)||[]).length;
    if(!telefono.trim().startsWith("+") || digitCount < 11) errs.telefono = t("Must start with + and have at least 11 digits","Debe empezar con + y tener al menos 11 dígitos","Deve iniziare con + e avere almeno 11 cifre");
    if(!email.includes("@")) errs.email = t("Must contain @","Debe contener @","Deve contenere @");
    return errs;
  };
  const gold = {background:"linear-gradient(135deg,#C9A84C,#E2C07A)",color:"#000",border:"none",padding:"13px 28px",borderRadius:12,fontSize:14,fontWeight:700,cursor:"pointer"};
  const out = {background:"transparent",color:"#C9A84C",border:"1.5px solid #C9A84C",padding:"11px 24px",borderRadius:12,fontSize:13,fontWeight:600,cursor:"pointer"};

  if(sent) return (
    <div style={{textAlign:"center",padding:"60px 20px"}}>
      <div style={{fontSize:56,marginBottom:18}}>✅</div>
      <h2 style={{color:"#C9A84C",fontSize:24,fontWeight:800,marginBottom:12}}>{t("Request Sent!","¡Solicitud Enviada!","Richiesta Inviata!")}</h2>
      <p style={{color:"#888",fontSize:14,maxWidth:440,margin:"0 auto 24px",lineHeight:1.7}}>
        {t("Our team will contact you within 24 hours.","Le contactaremos en 24 horas.","Ti contatteremo entro 24 ore.")}
      </p>
      <button style={gold} onClick={()=>onSubmit()}>🏠 Home</button>
    </div>
  );

  const handleSend = async () => {
    if(isSending) return;
    const nome = nomeRef.current?.value || "";
    const cognome = cognomeRef.current?.value || "";
    const telefono = telefonoRef.current?.value || "";
    const email = emailRef.current?.value || "";
    const indirizzo = indirizzoRef.current?.value || "";
    const consegna = consegnaRef.current?.value || "";
    const note = noteRef.current?.value || "";
    if(!nome || !email || !telefono) { alert(t("Please fill Name, Email and Phone","Completa Nombre, Email y Teléfono","Compila Nome, Email e Telefono")); return; }
    const errs = validateFields(nome, telefono, email);
    setFieldErrors(errs);
    if(Object.keys(errs).length > 0) return;

    const bat = BATTERIES.find(b=>b.id===cfg.battery);
    const mot = MOTORS.find(m=>m.id===cfg.motor);
    const st = SEAT_TYPES.find(s=>s.id===cfg.seatType);
    const ti = TIRES.find(tire=>tire.id===cfg.tire);
    const sw = STEERING.find(s=>s.id===cfg.steering);
    const ws = WINDSHIELDS.find(w=>w.id===cfg.windshield);
    const opts = cfg.optionals.map(id=>OPTIONAL_ITEMS.find(x=>x.id===id)).filter(Boolean);

    const cartName = (cfg.cartName && cfg.cartName.trim()) ? cfg.cartName.trim() : "Golf Cart";

    const msg = [
      "NEW GOLF CART QUOTE REQUEST",
      "=====================================",
      "GOLF CART NAME (chosen by customer): "+cartName,
      "",
      "CUSTOMER INFO:",
      "Name: "+nome+" "+cognome,
      "Phone: "+telefono,
      "Email: "+email,
      "Address: "+indirizzo,
      "Delivery location: "+consegna,
      "Notes: "+note,
      "",
      "CONFIGURATION:",
      "Model: "+cfg.model,
      "Seats: "+cfg.seats,
      "Body color: "+cfg.bodyColor.code+" "+cfg.bodyColor.en,
      "Battery: "+(bat?.en||""),
      "Motor: "+(mot?.en||""),
      "Seat type: "+(st?.en||""),
      "Seat color: "+cfg.seatColor.en,
      "Tires: "+(ti?.en||""),
      "Steering: "+(sw?.en||""),
      "Windshield: "+(ws?.en||""),
      "",
      "OPTIONS:",
      ...opts.map(o=>"- "+o.en+": "+(o.always?"Included":"$"+o.price)),
      "",
      "PRICING:",
      "Base price: $"+(model?.price?.toLocaleString()||""),
      "Total: $"+totalPrice.toLocaleString(),
      "35% on order: $"+payment1.toLocaleString(),
      "35% on completion: $"+payment2.toLocaleString(),
      "30% on delivery: $"+payment3.toLocaleString(),
    ].join("\n");

    setIsSending(true);
    try {
      await window.emailjs.send("service_f1ysovn","template_e36a3gp",{
        to_email:"info@taaac.solutions",
        subject:"Golf Cart Quote Request — \""+cartName+"\" — "+nome+" "+cognome,
        message:msg,
        name:nome+" "+cognome,
        from_name:nome+" "+cognome,
        from_email:email,
        email:email,
        phone:telefono,
      },"G_ndpmoIfpB6oi8pP");

      // Email di conferma automatica al cliente
      try {
        const confirmTemplates = {
          en: "Hi {name},\n\nWe've received your request for \"{cart}\"! Our team will contact you within 24 hours to finalize the details.\n\nThank you for choosing TAAAC Solutions.",
          es: "Hola {name},\n\n¡Hemos recibido tu solicitud para \"{cart}\"! Nuestro equipo te contactará dentro de 24 horas para finalizar los detalles.\n\nGracias por elegir TAAAC Solutions.",
          it: "Ciao {name},\n\nAbbiamo ricevuto la tua richiesta per \"{cart}\"! Il nostro team ti contatterà entro 24 ore per finalizzare i dettagli.\n\nGrazie per aver scelto TAAAC Solutions.",
          fr: "Bonjour {name},\n\nNous avons bien reçu ta demande pour \"{cart}\" ! Notre équipe te contactera sous 24 heures pour finaliser les détails.\n\nMerci d'avoir choisi TAAAC Solutions.",
          pl: "Cześć {name},\n\nOtrzymaliśmy Twoje zapytanie dotyczące \"{cart}\"! Nasz zespół skontaktuje się z Tobą w ciągu 24 godzin, aby ustalić szczegóły.\n\nDziękujemy za wybór TAAAC Solutions.",
          ru: "Привет, {name}!\n\nМы получили твой запрос на \"{cart}\"! Наша команда свяжется с тобой в течение 24 часов, чтобы уточнить детали.\n\nСпасибо, что выбрал TAAAC Solutions.",
        };
        const confirmMsg = (confirmTemplates[lang] || confirmTemplates.en)
          .split("{name}").join(nome)
          .split("{cart}").join(cartName);
        await window.emailjs.send("service_f1ysovn","template_e36a3gp",{
          to_email:email,
          subject:t("We've received your request!","¡Hemos recibido tu solicitud!","Abbiamo ricevuto la tua richiesta!"),
          message:confirmMsg,
          name:"TAAAC Solutions",
          from_name:"TAAAC Solutions",
          from_email:"info@taaac.solutions",
          email:"info@taaac.solutions",
          phone:"",
        },"G_ndpmoIfpB6oi8pP");
      } catch(confirmErr) {
        console.error("Errore invio email di conferma al cliente:", confirmErr);
        // Non blocco il flusso principale se questa seconda email fallisce
      }

      try { localStorage.removeItem("golfcart_draft"); } catch(e) {}
      setSent(true);
    } catch(err) {
      console.error(err);
      alert(t("Error sending request. Please try WhatsApp.","Error al enviar la solicitud. Prueba WhatsApp.","Errore nell'invio della richiesta. Prova WhatsApp."));
    } finally {
      setIsSending(false);
    }
  };

  return (
    <div>
      <h2 style={{fontSize:"clamp(1.4rem,4vw,2rem)",fontWeight:800,color:"#F5F0E8",marginBottom:4}}>{t("Confirm & Details","Confirmar y Datos","Conferma e Dati")}</h2>
      <div style={{color:"#888",fontSize:12,marginBottom:20}}>{t("Fill in your details to receive the official quote","Rellena tus datos para recibir el presupuesto oficial","Compila i dati per ricevere il preventivo ufficiale")}</div>

      <div style={{background:"#161616",border:"1px solid #C9A84C",borderRadius:16,padding:20,marginBottom:8,textAlign:"center"}}>
        <div style={{color:"#888",fontSize:11,marginBottom:4}}>{t("Total","Total","Totale")}</div>
        <div style={{color:"#F5F0E8",fontWeight:900,fontSize:34}}>${totalPrice.toLocaleString()} <span style={{fontSize:14,fontWeight:700}}>USD</span></div>
        <div style={{color:"#7ac47a",fontSize:11,marginTop:4}}>{t("Price includes taxes and transport","Precio incluye impuestos y transporte","Prezzo comprensivo di tasse e trasporto")}</div>
      </div>
      <div style={{background:"#161616",border:"1px solid #333",borderRadius:16,padding:20,marginBottom:20,display:"flex",gap:16,flexWrap:"wrap",justifyContent:"center",textAlign:"center"}}>
        <div style={{flex:1,minWidth:110}}>
          <div style={{color:"#C9A84C",fontSize:11,fontWeight:700,marginBottom:4}}>35% {t("On Order","Al Pedido","All'Ordine")}</div>
          <div style={{color:"#E2C07A",fontWeight:900,fontSize:20}}>${payment1.toLocaleString()} <span style={{fontSize:10}}>USD</span></div>
          <div style={{color:"#888",fontSize:9,marginTop:4}}>{t("To start building your golf cart","Para iniciar la construcción","Per avviare la costruzione")}</div>
        </div>
        <div style={{width:1,background:"#222"}}/>
        <div style={{flex:1,minWidth:110}}>
          <div style={{color:"#C9A84C",fontSize:11,fontWeight:700,marginBottom:4}}>35% {t("On Completion","Al Finalizar","Al Completamento")}</div>
          <div style={{color:"#E2C07A",fontWeight:900,fontSize:20}}>${payment2.toLocaleString()} <span style={{fontSize:10}}>USD</span></div>
          <div style={{color:"#888",fontSize:9,marginTop:4}}>{t("Verified by photo, video or video call","Verificado con foto, video o videollamada","Verificato con foto, video o videochiamata")}</div>
        </div>
        <div style={{width:1,background:"#222"}}/>
        <div style={{flex:1,minWidth:110}}>
          <div style={{color:"#C9A84C",fontSize:11,fontWeight:700,marginBottom:4}}>30% {t("On Delivery","A la Entrega","Alla Consegna")}</div>
          <div style={{color:"#E2C07A",fontWeight:900,fontSize:20}}>${payment3.toLocaleString()} <span style={{fontSize:10}}>USD</span></div>
          <div style={{color:"#888",fontSize:9,marginTop:4}}>{t("Turnkey delivery","Entrega llave en mano","Consegna chiavi in mano")}</div>
        </div>
      </div>

      <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(200px,1fr))",gap:16,marginBottom:20}}>
        <div><div style={{fontSize:11,color:"#888",marginBottom:4}}>{t("Name *","Nombre *","Nome *")}</div><input ref={nomeRef} style={fieldErrors.nome?inpErr:inp} placeholder="Mario"/>{fieldErrors.nome&&<div style={errText}>{fieldErrors.nome}</div>}</div>
        <div><div style={{fontSize:11,color:"#888",marginBottom:4}}>{t("Surname *","Apellido *","Cognome *")}</div><input ref={cognomeRef} style={inp} placeholder="Rossi"/></div>
        <div><div style={{fontSize:11,color:"#888",marginBottom:4}}>{t("Phone *","Teléfono *","Telefono *")}</div><input ref={telefonoRef} defaultValue="+" style={fieldErrors.telefono?inpErr:inp} placeholder="+1 809 000 0000"/>{fieldErrors.telefono&&<div style={errText}>{fieldErrors.telefono}</div>}</div>
        <div><div style={{fontSize:11,color:"#888",marginBottom:4}}>Email *</div><input ref={emailRef} style={fieldErrors.email?inpErr:inp} placeholder="email@example.com"/>{fieldErrors.email&&<div style={errText}>{fieldErrors.email}</div>}</div>
        <div><div style={{fontSize:11,color:"#888",marginBottom:4}}>{t("Address","Dirección","Indirizzo")}</div><input ref={indirizzoRef} style={inp} placeholder="Bayahibe, Dominicus"/></div>
        <div><div style={{fontSize:11,color:"#888",marginBottom:4}}>{t("Delivery location","Lugar de entrega","Luogo consegna")}</div><input ref={consegnaRef} style={inp} placeholder="Hotel, Villa..."/></div>
        <div style={{gridColumn:"1 / -1"}}><div style={{fontSize:11,color:"#888",marginBottom:4}}>{t("Notes","Notas","Note")}</div><textarea ref={noteRef} style={{...inp,minHeight:80,resize:"vertical"}} placeholder="Additional notes..."/></div>
      </div>
      <div style={{display:"flex",justifyContent:"space-between"}}>
        <button style={out} onClick={()=>onSubmit("back")}>← {t("Back","Atrás","Indietro")}</button>
        <button style={{...gold, opacity:isSending?0.6:1, cursor:isSending?"not-allowed":"pointer"}} onClick={handleSend} disabled={isSending}>
          {isSending ? "…" : "📩"} {isSending ? t("Sending...","Enviando...","Invio...") : t("Send","Enviar","Invia")}
        </button>
      </div>
    </div>
  );
}

function ConfiguratorPage({ t, tName, S, C, setPage, step, setStep, cfg, setCfg, upd, lang, totalPrice, showOptionals, setShowOptionals, MODELS, SEATS_OPTIONS, SEAT_PRICE_EXTRA, TIRE_PRICE_EXTRA, BATTERIES, MOTORS, SEAT_TYPES, TIRES, STEERING, WINDSHIELDS, OPTIONAL_ITEMS, RAL_COLORS, SEAT_COLORS, Img, GolfCartPreview, defaultMotorFor, defaultBatteryFor, motorPrice, batteryPrice, toggleOpt, ru, fr, pl, tNamePrefix, cartDisplayName, showRobotHint, SummaryBar, showSeatOpts, setShowSeatOpts, showSteerOpts, setShowSteerOpts, showOtherInch, setShowOtherInch, showGrass, setShowGrass, showWindOpts, setShowWindOpts, showTip, setShowTip, showBattOpts, setShowBattOpts, showMotorOpts, setShowMotorOpts, prevPage }) {
  const model = MODELS.find(m=>m.id===cfg.model);
  const cartNameRef = useRef();
  const previewNameRef = useRef();

  // Step -1 — Name your Golf Cart
  if(step===-1) return (
    <div>
      <div style={{textAlign:"center",padding:"20px 0 8px"}}>
        <div style={{fontSize:36,marginBottom:14}}>🚗</div>
        <h1 style={S.title}>{tName(
          "Name your Golf Cart",
          "Ponle un nombre a tu Golf Cart",
          "Dai un nome al tuo Golf Cart",
          "Donne un nom à ton Golf Cart",
          "Nadaj imię swojemu Golf Cartowi",
          "Дай имя своему гольф-кару"
        )}</h1>
        <div style={{color:C.muted,fontSize:14,maxWidth:420,margin:"0 auto 28px",lineHeight:1.6}}>
          {tName(
            "Give it a name and make it truly yours from the very first choice.",
            "Dale un nombre y hazlo verdaderamente tuyo desde la primera elección.",
            "Dagli un nome e rendilo davvero tuo fin dalla prima scelta.",
            "Donne-lui un nom et rends-le vraiment tien dès le premier choix.",
            "Nadaj mu imię i spraw, by był naprawdę twój od pierwszego wyboru.",
            "Дай ему имя и сделай его по-настоящему своим с самого первого выбора."
          )}
        </div>
        <input
          type="text"
          ref={cartNameRef}
          defaultValue={cfg.cartName}
          onChange={(e)=>{
            const val = e.target.value.trim();
            if(previewNameRef.current) previewNameRef.current.textContent = val || "Golf Cart";
          }}
          placeholder="Golf Cart"
          maxLength={30}
          style={{
            width:"100%", maxWidth:360, background:C.card, border:"1.5px solid #333",
            borderRadius:14, padding:"16px 20px", fontSize:18, color:C.gold,
            textAlign:"center", fontWeight:700, outline:"none"
          }}
        />
        <div style={{color:C.goldLight,fontSize:14,marginTop:16,fontWeight:600}}>
          {tNamePrefix(
            "Perfect, let's start creating ",
            "Perfecto, empecemos a crear ",
            "Perfetto, iniziamo a creare ",
            "Parfait, commençons à créer ",
            "Świetnie, zacznijmy tworzyć ",
            "Отлично, начнём создавать "
          )}<span ref={previewNameRef}>{cartDisplayName}</span>
        </div>
      </div>

      <div onClick={()=>setPage("choose-your-golf-cart")} style={{marginTop:28,background:"#C9A84C0d",border:"1.5px solid #C9A84C44",borderRadius:14,padding:"14px 18px",display:"flex",alignItems:"center",gap:12,cursor:"pointer"}}>
        <svg viewBox="0 -3 40 59" width="27" height="42" fill="none" stroke="#C9A84C" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{flexShrink:0}}>
          <line x1="20" y1="8" x2="20" y2="2"/>
          <path d="M20 2 C18 -1 13 -1 13 3 C13 6 20 10 20 10 C20 10 27 6 27 3 C27 -1 22 -1 20 2 Z" fill="#0a0a0a"/>
          <rect x="8" y="10" width="24" height="18" rx="6" fill="#0a0a0a"/>
          <circle cx="6" cy="19" r="2.5"/>
          <circle cx="34" cy="19" r="2.5"/>
          <circle cx="15" cy="19" r="3" fill="#0a0a0a"/>
          <circle cx="25" cy="19" r="3" fill="#0a0a0a"/>
          <path d="M16 24 Q20 27 24 24" fill="none"/>
          <line x1="16" y1="28" x2="16" y2="31"/>
          <line x1="24" y1="28" x2="24" y2="31"/>
          <rect x="10" y="31" width="20" height="18" rx="5" fill="#0a0a0a"/>
          <path d="M10 35 Q5 38 6 44 Q6 48 9 50" fill="none"/>
          <g style={{transformOrigin:"30px 35px", animation: showRobotHint ? "robotWave 0.8s ease-in-out infinite" : "none"}}>
            <path d="M30 35 Q36 32 35 26 Q34 22 30 20" fill="none"/>
          </g>
          <line x1="16" y1="49" x2="16" y2="54"/>
          <line x1="24" y1="49" x2="24" y2="54"/>
          <ellipse cx="16" cy="55" rx="4" ry="1.5"/>
          <ellipse cx="24" cy="55" rx="4" ry="1.5"/>
        </svg>
        <div style={{color:C.goldLight,fontSize:13,fontWeight:600,lineHeight:1.4}}>
          {t("Prefer to be guided step by step? Try our virtual assistant →","¿Prefieres que te guíen paso a paso? Prueba nuestro asistente virtual →","Preferisci farti guidare passo passo? Prova il nostro assistente virtuale →")}
        </div>
      </div>

      <div style={{marginTop:24,display:"flex",justifyContent:"space-between"}}>
        <button style={S.outBtn} onClick={()=>{upd("cartName",cartNameRef.current.value);setPage(prevPage);}}>← {t("Back","Atrás","Indietro")}</button>
        <button style={S.goldBtn} onClick={()=>{upd("cartName",cartNameRef.current.value);setStep(cfg.model?1:0);window.scrollTo({top:0,behavior:"smooth"});}}>
          {t("Next","Siguiente","Avanti")} →
        </button>
      </div>
    </div>
  );

// Step 0 — Model
  if(step===0) return (
    <div>
      <h1 style={{...S.title,fontSize:"clamp(2.1rem,5.6vw,3.08rem)"}}>{tName(
        "What shape will {name} take?",
        "¿Qué forma tendrá {name}?",
        "Che forme avrà {name}?",
        "Quelle forme aura {name} ?",
        "Jaki kształt będzie mieć {name}?",
        "Какую форму примет {name}?"
      )}</h1>
      <div style={S.grid2}>
        {MODELS.map(m=>(
          <div key={m.id} style={S.card(cfg.model===m.id)} onClick={()=>{upd("model",m.id);upd("motor",defaultMotorFor(m.id,"2"));upd("battery",defaultBatteryFor("2"));upd("seats","2");upd("bodyColor",{code:"RAL 9010",hex:"#FFFFFF",it:"Bianco puro",es:"Blanco puro",en:"Pure white"});upd("seatType","standard");upd("steering","standard");upd("tire","offroad-12");}}>
            <div style={{display:"flex",justifyContent:"space-between",marginBottom:10}}>
              <span style={{background:"#C9A84C22",color:C.gold,padding:"3px 10px",borderRadius:20,fontSize:11,fontWeight:700}}>{m.tag}</span>
              <span style={{color:C.goldLight,fontWeight:800,fontSize:14}}>{t("from","desde","da")} ${m.price.toLocaleString()} USD</span>
            </div>
            <div style={{background:"transparent",borderRadius:12,marginBottom:10,display:"flex",justifyContent:"center",alignItems:"center",height:170,overflow:"hidden"}}>
              <Img k={m.imgKey} style={{width:"100%",height:"100%",objectFit:"contain",objectPosition:"center"}}/>
            </div>
            <div style={{color:cfg.model===m.id?C.gold:C.white,fontWeight:700,fontSize:15,marginBottom:8}}>{t("Model","Modelo","Modello")} {m.id}</div>
            <div style={{color:C.muted,fontSize:13,marginBottom:4,lineHeight:1.5}}>{t(m.desc.en, m.desc.es, m.desc.it)}</div>
          </div>
        ))}
      </div>
      <div style={{marginTop:24,display:"flex",justifyContent:"space-between"}}>
        <button style={S.outBtn} onClick={()=>{setStep(-1);window.scrollTo({top:0,behavior:"smooth"});}}>← {t("Back","Atrás","Indietro")}</button>
        <button style={{...S.goldBtn,opacity:cfg.model?1:.4}} disabled={!cfg.model} onClick={()=>{setStep(1);window.scrollTo({top:0,behavior:"smooth"});}}>
          {t("Next","Siguiente","Avanti")} →
        </button>
      </div>
    </div>
  );

  // Step 1 — Body Color
  if(step===1) return (
    <div>
      <SummaryBar/>
      <h1 style={{...S.title,fontSize:"clamp(2.1rem,5.6vw,3.08rem)"}}>{tName(
        "What color will {name} be?",
        "¿De qué color será {name}?",
        "Che colore avrà {name}?",
        "De quelle couleur sera {name} ?",
        "Jaki kolor będzie mieć {name}?",
        "Какого цвета будет {name}?"
      )}</h1>
      <div style={{background:C.card,border:"1px solid #222",borderRadius:14,padding:18,marginBottom:20}}>
        <div style={{display:"flex",flexWrap:"wrap",gap:10,marginBottom:16}}>
          {RAL_COLORS.map(c=>(
            <div key={c.code} title={`${c.code} — ${c.en}`}
              style={{width:40,height:40,borderRadius:9,background:c.hex,cursor:"pointer",border:cfg.bodyColor.code===c.code?"3px solid #C9A84C":"3px solid transparent",transform:cfg.bodyColor.code===c.code?"scale(1.2)":"scale(1)",transition:"transform .15s",boxShadow:c.hex==="#FFFFFF"?"inset 0 0 0 1px #444":""}}
              onClick={()=>upd("bodyColor",c)}/>
          ))}
        </div>
        {cfg.bodyColor&&<div style={{display:"flex",alignItems:"center",gap:8,marginBottom:12}}>
          <div style={{width:16,height:16,borderRadius:"50%",background:cfg.bodyColor.hex,border:"2px solid #555"}}/>
          <span style={{color:C.gold,fontWeight:600,fontSize:12}}>{cfg.bodyColor.code}</span>
          <span style={{color:C.muted,fontSize:12}}>— {t(cfg.bodyColor.en, cfg.bodyColor.es, cfg.bodyColor.it)}</span>
        </div>}
        {cfg.bodyColor&&<div style={{color:C.goldLight,fontSize:22,fontWeight:700,marginBottom:16}}>
          {tName(
            "{name} will be "+t(cfg.bodyColor.en, cfg.bodyColor.es, cfg.bodyColor.it),
            "{name} será "+t(cfg.bodyColor.en, cfg.bodyColor.es, cfg.bodyColor.it),
            "{name} sarà "+t(cfg.bodyColor.en, cfg.bodyColor.es, cfg.bodyColor.it),
            "{name} sera "+t(cfg.bodyColor.en, cfg.bodyColor.es, cfg.bodyColor.it),
            "{name} będzie "+t(cfg.bodyColor.en, cfg.bodyColor.es, cfg.bodyColor.it),
            "{name} будет "+t(cfg.bodyColor.en, cfg.bodyColor.es, cfg.bodyColor.it)
          )}
        </div>}
        <div style={{display:"flex",justifyContent:"center"}}>
          <GolfCartPreview bodyColor={cfg.bodyColor?.hex||"#FFFFFF"} seatColor={cfg.seatColor?.hex||"#C8B89A"}/>
        </div>
      </div>
      <div style={{marginTop:24,display:"flex",justifyContent:"space-between"}}>
        <button style={S.outBtn} onClick={()=>{setStep(0);window.scrollTo({top:0,behavior:"smooth"});}}>← {t("Back","Atrás","Indietro")}</button>
        <button style={{...S.goldBtn,opacity:cfg.bodyColor?1:.4}} disabled={!cfg.bodyColor} onClick={()=>{setStep(2);window.scrollTo({top:0,behavior:"smooth"});}}>
          {t("Next","Siguiente","Avanti")} →
        </button>
      </div>
    </div>
  );

  // Step 2 — Seats
  if(step===2) return (
    <div>
      <SummaryBar/>
      <h1 style={{...S.title,fontSize:"clamp(2.1rem,5.6vw,3.08rem)"}}>{tName(
        "How many seats will {name} have?",
        "¿Cuántos asientos tendrá {name}?",
        "Quanti posti avrà {name}?",
        "Combien de places aura {name} ?",
        "Ile miejsc będzie mieć {name}?",
        "Сколько мест будет у {name}?"
      )}</h1>
      <div style={S.grid3}>
        {SEATS_OPTIONS.map(s=>{
          const extra = (cfg.model && SEAT_PRICE_EXTRA[cfg.model] && SEAT_PRICE_EXTRA[cfg.model][s.id]) || 0;
          return (
          <div key={s.id} style={S.card(cfg.seats===s.id)} onClick={()=>{upd("seats",s.id);upd("motor",defaultMotorFor(cfg.model,s.id));upd("battery",defaultBatteryFor(s.id));if(s.id!=="2+2"&&s.id!=="4+2"){setCfg(p=>({...p,optionals:p.optionals.filter(id=>id!=="rear-platform")}));}}}>
            <div style={{background:"#070707",borderRadius:10,marginBottom:10,display:"flex",justifyContent:"center",alignItems:"center",minHeight:110,overflow:"hidden"}}>
              {s.imgKey
                ? <Img k={s.imgKey} style={{width:"100%",maxHeight:130}}/>
                : <div style={{textAlign:"center",padding:16}}>
                    <div style={{fontSize:32,marginBottom:6}}>✉️</div>
                    <div style={{color:C.gold,fontSize:12,fontWeight:700}}>{t("On Request","Bajo Pedido","Su Richiesta")}</div>
                  </div>
              }
            </div>
            <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
              <div style={{color:cfg.seats===s.id?C.gold:C.white,fontWeight:700,fontSize:14}}>{t(s.en, s.es, s.it)}</div>
              {extra>0 && s.id!=="other" && <span style={{color:C.goldLight,fontWeight:800,fontSize:13}}>+${extra.toLocaleString()}</span>}
            </div>
            <div style={{color:C.muted,fontSize:12,marginTop:4}}>{t(s.descEn, s.descEs, s.descIt)}</div>
          </div>
        );})}
      </div>
      <div style={{marginTop:24,display:"flex",justifyContent:"space-between"}}>
        <button style={S.outBtn} onClick={()=>{setStep(1);window.scrollTo({top:0,behavior:"smooth"});}}>← {t("Back","Atrás","Indietro")}</button>
        <button style={{...S.goldBtn,opacity:cfg.seats?1:.4}} disabled={!cfg.seats} onClick={()=>{setStep(3);window.scrollTo({top:0,behavior:"smooth"});}}>
          {t("Next","Siguiente","Avanti")} →
        </button>
      </div>
    </div>
  );

      // Step 3 — Seat Type + Seat Color
  if(step===3) {
    const stdSeat = SEAT_TYPES.find(s=>s.id==="standard");
    const stdWind2 = WINDSHIELDS.find(w=>w.id==="standard");
    return (
      <div>
        <SummaryBar/>
        <h1 style={{...S.title,fontSize:"clamp(2.1rem,5.6vw,3.08rem)"}}>💺 {tName(
          "What style will {name}'s seats have?",
          "¿Qué estilo tendrán los asientos de {name}?",
          "Che stile avranno i sedili di {name}?",
          "Quel style auront les sièges de {name} ?",
          "Jaki styl będą mieć siedzenia {name}?",
          "В каком стиле будут сиденья {name}?"
        )}</h1>
        {stdSeat && (
          <div onClick={()=>upd("seatType","standard")} style={{background:cfg.seatType==="standard"?"linear-gradient(135deg,#C9A84C20,#C9A84C08)":"#1a1a1a",border:cfg.seatType==="standard"?"2px solid #C9A84C":"1.5px solid #333",borderRadius:16,padding:20,marginBottom:20,display:"flex",gap:16,alignItems:"center",cursor:"pointer"}}>
            <div style={{background:"#070707",borderRadius:12,minWidth:90,minHeight:90,display:"flex",alignItems:"center",justifyContent:"center",overflow:"hidden",flexShrink:0}}>
              <Img k={stdSeat.imgKey} style={{width:"100%",maxHeight:100}}/>
            </div>
            <div style={{flex:1}}>
              <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:4}}>
                <div style={{color:cfg.seatType==="standard"?C.gold:C.white,fontWeight:800,fontSize:15}}>{t(stdSeat.en, stdSeat.es, stdSeat.it)}</div>
                {cfg.seatType==="standard" && <span style={{background:"#C9A84C22",color:C.gold,fontSize:10,fontWeight:700,padding:"2px 8px",borderRadius:6}}>✓ {t("Selected","Seleccionado","Selezionato")}</span>}
                {cfg.seatType!=="standard" && <span style={{background:"#22222244",color:"#666",fontSize:10,fontWeight:700,padding:"2px 8px",borderRadius:6}}>{t("Default","Por defecto","Predefinito")}</span>}
              </div>
              <div style={{color:C.muted,fontSize:13,lineHeight:1.6}}>{t(stdSeat.descEn, stdSeat.descEs, stdSeat.descIt)}</div>
            </div>
          </div>
        )}
        {!showSeatOpts ? (
          <div style={{textAlign:"center",marginBottom:20}}>
            <button style={{...S.goldBtn,width:"100%",maxWidth:420}} onClick={()=>setShowSeatOpts(true)}>
              ⚙️ {t("Other seat options","Otras opciones de asiento","Altre opzioni sedile")}
            </button>
          </div>
        ) : (
          <div>
            <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:16}}>
              <div style={{color:C.muted,fontSize:13}}>{t("Choose your seat type","Elige el tipo de asiento","Scegli il tipo di sedile")}</div>
              <button style={S.outBtn} onClick={()=>setShowSeatOpts(false)}>✕ {t("Close","Cerrar","Chiudi")}</button>
            </div>
            <div style={{...S.grid2,marginBottom:20}}>
              {SEAT_TYPES.filter(s=>s.id!=="standard").map(s=>(
                <div key={s.id} style={S.card(cfg.seatType===s.id)} onClick={()=>upd("seatType",s.id)}>
                  <div style={{background:"#070707",borderRadius:10,marginBottom:10,display:"flex",justifyContent:"center",alignItems:"center",minHeight:100,overflow:"hidden"}}>
                    <Img k={s.imgKey} style={{width:"100%",maxHeight:120}}/>
                  </div>
                  <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:2}}>
                    <div style={{color:cfg.seatType===s.id?C.gold:C.white,fontWeight:700,fontSize:13}}>{t(s.en, s.es, s.it)}</div>
                    {s.price&&<span style={{color:C.goldLight,fontSize:12,fontWeight:800,marginLeft:8}}>+${s.price}</span>}
                  </div>
                  <div style={{color:C.muted,fontSize:12}}>{t(s.descEn, s.descEs, s.descIt)}</div>
                </div>
              ))}
            </div>
          </div>
        )}

        <div style={{borderTop:"1px solid #222",marginTop:8,paddingTop:20}}>
          <h1 style={{...S.title,fontSize:"clamp(1.54rem,4.2vw,1.96rem)"}}>🎨 {tName(
            "What color will {name}'s seats be?",
            "¿De qué color serán los asientos de {name}?",
            "Che colore saranno i sedili di {name}?",
            "De quelle couleur seront les sièges de {name} ?",
            "Jakiego koloru będą siedzenia {name}?",
            "Какого цвета будут сиденья {name}?"
          )}</h1>
          <div style={{background:C.card,border:"1px solid #222",borderRadius:14,padding:18,marginBottom:8}}>
            <div style={{display:"flex",flexWrap:"wrap",gap:10,marginBottom:12}}>
              {SEAT_COLORS.map(c=>(
                <div key={c.id} title={`${c.it} / ${c.es} / ${c.en}`}
                  style={{width:40,height:40,borderRadius:9,background:c.hex,cursor:"pointer",border:cfg.seatColor.id===c.id?"3px solid #C9A84C":"3px solid transparent",transform:cfg.seatColor.id===c.id?"scale(1.2)":"scale(1)",transition:"transform .15s"}}
                  onClick={()=>upd("seatColor",c)}/>
              ))}
            </div>
            <div style={{display:"flex",alignItems:"center",gap:8}}>
              <div style={{width:16,height:16,borderRadius:"50%",background:cfg.seatColor.hex,border:"2px solid #555"}}/>
              <span style={{color:C.gold,fontWeight:600,fontSize:12}}>{t(cfg.seatColor.en, cfg.seatColor.es, cfg.seatColor.it)}</span>
            </div>
            <div style={{marginTop:16,display:"flex",justifyContent:"center"}}>
              <GolfCartPreview bodyColor={cfg.bodyColor.hex} seatColor={cfg.seatColor.hex}/>
            </div>
          </div>
        </div>

        <div style={{color:C.goldLight,fontSize:21,fontWeight:600,textAlign:"center",marginTop:20,lineHeight:1.6}}>
          {(() => {
            const currentSeat = SEAT_TYPES.find(s=>s.id===cfg.seatType);
            const seatLabel = currentSeat
              ? (currentSeat.id==="standard"
                  ? t("comfortable","confortable","confortevole")
                  : currentSeat.id==="sport"
                  ? t("sporty","deportivo","sportivo")
                  : t(currentSeat.en, currentSeat.es, currentSeat.it))
              : "";
            const colorLabel = t(cfg.seatColor.en, cfg.seatColor.es, cfg.seatColor.it);
            return tName(
              "{name} will have "+seatLabel+" seats in "+colorLabel,
              "{name} tendrá asientos "+seatLabel+" de color "+colorLabel,
              "{name} avrà uno stile "+seatLabel+" di colore "+colorLabel,
              "{name} aura des sièges "+seatLabel+" de couleur "+colorLabel,
              "{name} będzie mieć siedzenia "+seatLabel+" w kolorze "+colorLabel,
              "{name} будет иметь сиденья "+seatLabel+" цвета "+colorLabel
            );
          })()}
        </div>

        <div style={{marginTop:24,display:"flex",justifyContent:"space-between"}}>
          <button style={S.outBtn} onClick={()=>{setStep(2);window.scrollTo({top:0,behavior:"smooth"});}}>← {t("Back","Atrás","Indietro")}</button>
          <button style={S.goldBtn} onClick={()=>{setStep(4);window.scrollTo({top:0,behavior:"smooth"});}}>
            {t("Next","Siguiente","Avanti")} →
          </button>
        </div>
      </div>
    );
  }

  // Step 4 — Steering + Wheels + Windshield
  if(step===4) {
    const stdSteer = STEERING.find(s=>s.id==="standard");
    const stdTire = TIRES.find(tire=>tire.id==="offroad-12");
    const stdWind = WINDSHIELDS.find(w=>w.id==="standard");
    return (
      <div>
        <SummaryBar/>

        {/* STEERING */}
        <h1 style={{...S.title,fontSize:"clamp(2.1rem,5.6vw,3.08rem)"}}>{tName(
          "Now take control of {name}",
          "Ahora toma el control de {name}",
          "Ora prendi il controllo di {name}",
          "Prends maintenant le contrôle de {name}",
          "Teraz przejmij kontrolę nad {name}",
          "Теперь возьми {name} под контроль"
        )}</h1>
        <div style={{color:C.muted,fontSize:13,marginBottom:16}}>
          {tName(
            "Choose the steering wheel you'll feel is yours on every journey.",
            "Elige el volante que sentirás tuyo en cada viaje.",
            "Scegli il volante che sentirai tuo ad ogni viaggio.",
            "Choisis le volant que tu sentiras tien à chaque trajet.",
            "Wybierz kierownicę, którą poczujesz jako swoją w każdej podróży.",
            "Выбери руль, который ты будешь чувствовать своим в каждой поездке."
          )}
        </div>
        {stdSteer && (
          <div onClick={()=>upd("steering","standard")} style={{background:cfg.steering==="standard"?"linear-gradient(135deg,#C9A84C20,#C9A84C08)":"#1a1a1a",border:cfg.steering==="standard"?"2px solid #C9A84C":"1.5px solid #333",borderRadius:16,padding:20,marginBottom:16,display:"flex",gap:16,alignItems:"center",cursor:"pointer"}}>
            <div style={{background:"#070707",borderRadius:12,minWidth:90,minHeight:90,display:"flex",alignItems:"center",justifyContent:"center",overflow:"hidden",flexShrink:0}}>
              <Img k={stdSteer.imgKey} style={{width:"100%",maxHeight:100}}/>
            </div>
            <div style={{flex:1}}>
              <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:4}}>
                <div style={{color:cfg.steering==="standard"?C.gold:C.white,fontWeight:800,fontSize:15}}>{t(stdSteer.en, stdSteer.es, stdSteer.it)}</div>
                {cfg.steering==="standard" && <span style={{background:"#C9A84C22",color:C.gold,fontSize:10,fontWeight:700,padding:"2px 8px",borderRadius:6}}>✓ {t("Selected","Seleccionado","Selezionato")}</span>}
                {cfg.steering!=="standard" && <span style={{background:"#22222244",color:"#666",fontSize:10,fontWeight:700,padding:"2px 8px",borderRadius:6}}>{t("Default","Por defecto","Predefinito")}</span>}
              </div>
              <div style={{color:C.muted,fontSize:13,lineHeight:1.6}}>{t(stdSteer.descEn, stdSteer.descEs, stdSteer.descIt)}</div>
            </div>
          </div>
        )}
        {cfg.model!=="A" && (!showSteerOpts ? (
          <div style={{textAlign:"center",marginBottom:16}}>
            <button style={{...S.goldBtn,width:"100%",maxWidth:420}} onClick={()=>setShowSteerOpts(true)}>
              ⚙️ {t("Other steering options","Otras opciones de volante","Altre opzioni volante")}
            </button>
          </div>
        ) : (
          <div>
            <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:16}}>
              <div style={{color:C.muted,fontSize:13}}>{t("Choose your steering wheel","Elige tu volante","Scegli il volante")}</div>
              <button style={S.outBtn} onClick={()=>setShowSteerOpts(false)}>✕ {t("Close","Cerrar","Chiudi")}</button>
            </div>
            <div style={{...S.grid3,marginBottom:16}}>
              {STEERING.filter(s=>s.id!=="standard").map(s=>(
                <div key={s.id} style={S.card(cfg.steering===s.id)} onClick={()=>upd("steering",s.id)}>
                  <div style={{background:"#070707",borderRadius:10,marginBottom:10,display:"flex",justifyContent:"center",alignItems:"center",minHeight:100,overflow:"hidden"}}>
                    <Img k={s.imgKey} style={{width:"100%",maxHeight:120}}/>
                  </div>
                  <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:2}}>
                    <div style={{color:cfg.steering===s.id?C.gold:C.white,fontWeight:700,fontSize:13}}>{t(s.en, s.es, s.it)}</div>
                    {s.price&&<span style={{color:C.goldLight,fontSize:12,fontWeight:800,marginLeft:8}}>+${s.price}</span>}
                  </div>
                  <div style={{color:C.muted,fontSize:12}}>{t(s.descEn, s.descEs, s.descIt)}</div>
                </div>
              ))}
            </div>
          </div>
        ))}

        <div style={{borderTop:"1px solid #222",marginTop:8,paddingTop:20}}>
          {/* WHEELS */}
          <h2 style={{...S.title,fontSize:"clamp(1.54rem,4.2vw,1.96rem)"}}>{tName(
            "What character will {name} have?",
            "¿Qué carácter tendrá {name}?",
            "Che carattere avrà {name}?",
            "Quel caractère aura {name} ?",
            "Jaki charakter będzie mieć {name}?",
            "Какой характер будет у {name}?"
          )}</h2>
          {stdTire && (
            <div onClick={()=>upd("tire","offroad-12")} style={{background:cfg.tire==="offroad-12"?"linear-gradient(135deg,#C9A84C20,#C9A84C08)":"#1a1a1a",border:cfg.tire==="offroad-12"?"2px solid #C9A84C":"1.5px solid #333",borderRadius:16,padding:20,marginBottom:16,display:"flex",gap:16,alignItems:"center",cursor:"pointer"}}>
              <div style={{background:"#070707",borderRadius:12,minWidth:90,minHeight:90,display:"flex",alignItems:"center",justifyContent:"center",overflow:"hidden",flexShrink:0}}>
                <Img k={stdTire.imgKey} style={{width:"100%",maxHeight:100}}/>
              </div>
              <div style={{flex:1}}>
                <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:4,flexWrap:"wrap"}}>
                  <div style={{color:cfg.tire==="offroad-12"?C.gold:C.white,fontWeight:800,fontSize:15}}>{t(stdTire.en, stdTire.es, stdTire.it)}</div>
                  {cfg.tire==="offroad-12" && <span style={{background:"#C9A84C22",color:C.gold,fontSize:10,fontWeight:700,padding:"2px 8px",borderRadius:6}}>✓ {t("Selected","Seleccionado","Selezionato")}</span>}
                  {cfg.tire!=="offroad-12" && <span style={{background:"#22222244",color:"#666",fontSize:10,fontWeight:700,padding:"2px 8px",borderRadius:6}}>{t("Default","Por defecto","Predefinito")}</span>}
                </div>
                <div style={{color:C.muted,fontSize:13,lineHeight:1.6}}>{t(stdTire.descEn, stdTire.descEs, stdTire.descIt)}</div>
              </div>
            </div>
          )}
          <div style={{marginBottom:12}}>
            {!showOtherInch ? (
              <button style={{...S.goldBtn,width:"100%",maxWidth:420}} onClick={()=>setShowOtherInch(true)}>
                ⚙️ {t("Other inches","Otros pulgadas","Altri pollici")}
              </button>
            ) : (
              <div>
                <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:12}}>
                  <div style={{color:C.muted,fontSize:13}}>🏔️ {t('Off-Road 14"','Todoterreno 14"','Off-Road 14"')}</div>
                  <button style={S.outBtn} onClick={()=>setShowOtherInch(false)}>✕ {t("Close","Cerrar","Chiudi")}</button>
                </div>
                <div style={{...S.grid3,marginBottom:12}}>
                  {TIRES.filter(tire=>tire.id==="offroad-14").map(tire=>{
                    const tp = (cfg.model && TIRE_PRICE_EXTRA[cfg.model] && TIRE_PRICE_EXTRA[cfg.model][tire.id]) || 0;
                    return (
                    <div key={tire.id} style={S.card(cfg.tire===tire.id)} onClick={()=>upd("tire",tire.id)}>
                      <div style={{background:"#070707",borderRadius:10,marginBottom:10,display:"flex",justifyContent:"center",alignItems:"center",minHeight:110,overflow:"hidden"}}>
                        <Img k={tire.imgKey} style={{width:"100%",maxHeight:130}}/>
                      </div>
                      <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start"}}>
                        <div style={{color:cfg.tire===tire.id?C.gold:C.white,fontWeight:700,fontSize:13}}>{t(tire.en, tire.es, tire.it)}</div>
                        {tp>0&&<span style={{color:C.goldLight,fontSize:12,fontWeight:800,marginLeft:8}}>+${tp}</span>}
                      </div>
                      <div style={{color:C.muted,fontSize:12,marginTop:4}}>{t(tire.descEn, tire.descEs, tire.descIt)}</div>
                    </div>
                    );})}
                </div>
              </div>
            )}
          </div>
          <div style={{marginBottom:12}}>
            {!showGrass ? (
              <button style={{...S.outBtn,width:"100%",maxWidth:420}} onClick={()=>setShowGrass(true)}>
                🌿 {t("Grass tires","Neumáticos de césped","Da Erba")}
              </button>
            ) : (
              <div>
                <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:12}}>
                  <div style={{color:C.muted,fontSize:13}}>🌿 {t("Grass tires","Neumáticos de césped","Pneumatici da Erba")}</div>
                  <button style={S.outBtn} onClick={()=>setShowGrass(false)}>✕ {t("Close","Cerrar","Chiudi")}</button>
                </div>
                <div style={{...S.grid3,marginBottom:12}}>
                  {TIRES.filter(tire=>tire.type==="grass" && (cfg.model==="A" || tire.id!=="grass-10")).map(tire=>{
                    const tp = (cfg.model && TIRE_PRICE_EXTRA[cfg.model] && TIRE_PRICE_EXTRA[cfg.model][tire.id]) || 0;
                    return (
                    <div key={tire.id} style={S.card(cfg.tire===tire.id)} onClick={()=>upd("tire",tire.id)}>
                      <div style={{background:"#070707",borderRadius:10,marginBottom:10,display:"flex",justifyContent:"center",alignItems:"center",minHeight:110,overflow:"hidden"}}>
                        <Img k={tire.imgKey} style={{width:"100%",maxHeight:130}}/>
                      </div>
                      <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start"}}>
                        <div style={{color:cfg.tire===tire.id?C.gold:C.white,fontWeight:700,fontSize:13}}>{t(tire.en, tire.es, tire.it)}</div>
                        {tp>0&&<span style={{color:C.goldLight,fontSize:12,fontWeight:800,marginLeft:8}}>+${tp}</span>}
                      </div>
                      <div style={{color:C.muted,fontSize:12,marginTop:4}}>{t(tire.descEn, tire.descEs, tire.descIt)}</div>
                    </div>
                    );})}
                </div>
              </div>
            )}
          </div>
        </div>

        <div style={{borderTop:"1px solid #222",marginTop:8,paddingTop:20}}>
          {/* WINDSHIELD */}
          <h2 style={{...S.title,fontSize:"clamp(1.54rem,4.2vw,1.96rem)"}}>{tName(
            "How do you want to experience the road with {name}?",
            "¿Cómo quieres vivir la carretera con {name}?",
            "Come vuoi vivere la strada con {name}?",
            "Comment veux-tu vivre la route avec {name} ?",
            "Jak chcesz przeżywać drogę z {name}?",
            "Как ты хочешь ощущать дорогу с {name}?"
          )}</h2>
          <div style={{color:C.muted,fontSize:13,marginBottom:16}}>
            {tName(
              "Choose the windshield that will accompany every journey.",
              "Elige el parabrisas que acompañará cada viaje.",
              "Scegli il parabrezza che accompagnerà ogni viaggio.",
              "Choisis le pare-brise qui accompagnera chaque trajet.",
              "Wybierz szybę przednią, która będzie towarzyszyć każdej podróży.",
              "Выбери лобовое стекло, которое будет сопровождать каждую поездку."
            )}
          </div>
          {stdWind && (
            <div onClick={()=>upd("windshield","standard")} style={{background:cfg.windshield==="standard"?"linear-gradient(135deg,#C9A84C20,#C9A84C08)":"#1a1a1a",border:cfg.windshield==="standard"?"2px solid #C9A84C":"1.5px solid #333",borderRadius:16,padding:20,marginBottom:16,display:"flex",gap:16,alignItems:"center",cursor:"pointer"}}>
              <div style={{background:"#070707",borderRadius:12,minWidth:90,minHeight:90,display:"flex",alignItems:"center",justifyContent:"center",overflow:"hidden",flexShrink:0}}>
                <Img k={stdWind.imgKey} style={{width:"100%",maxHeight:100}}/>
              </div>
              <div style={{flex:1}}>
                <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:4}}>
                  <div style={{color:cfg.windshield==="standard"?C.gold:C.white,fontWeight:800,fontSize:15}}>{t(stdWind.en, stdWind.es, stdWind.it)}</div>
                  {cfg.windshield==="standard" && <span style={{background:"#C9A84C22",color:C.gold,fontSize:10,fontWeight:700,padding:"2px 8px",borderRadius:6}}>✓ {t("Selected","Seleccionado","Selezionato")}</span>}
                  {cfg.windshield!=="standard" && <span style={{background:"#22222244",color:"#666",fontSize:10,fontWeight:700,padding:"2px 8px",borderRadius:6}}>{t("Default","Por defecto","Predefinito")}</span>}
                </div>
                <div style={{color:C.muted,fontSize:13,lineHeight:1.6}}>{t(stdWind.descEn, stdWind.descEs, stdWind.descIt)}</div>
              </div>
            </div>
          )}
          {!showWindOpts ? (
            <div style={{textAlign:"center",marginBottom:16}}>
              <button style={{...S.goldBtn,width:"100%",maxWidth:420}} onClick={()=>setShowWindOpts(true)}>
                ⚙️ {t("Other windshield options","Otras opciones de parabrisas","Altre opzioni parabrezza")}
              </button>
            </div>
          ) : (
            <div>
              <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:16}}>
                <div style={{color:C.muted,fontSize:13}}>{t("Choose your windshield","Elige tu parabrisas","Scegli il parabrezza")}</div>
                <button style={S.outBtn} onClick={()=>setShowWindOpts(false)}>✕ {t("Close","Cerrar","Chiudi")}</button>
              </div>
              <div style={{...S.grid2,marginBottom:16}}>
                {WINDSHIELDS.filter(w=>w.id!=="standard").map(w=>(
                  <div key={w.id} style={S.card(cfg.windshield===w.id)} onClick={()=>upd("windshield",w.id)}>
                    <div style={{background:"#070707",borderRadius:10,marginBottom:10,display:"flex",justifyContent:"center",alignItems:"center",minHeight:100,overflow:"hidden"}}>
                      <Img k={w.imgKey} style={{width:"100%",maxHeight:120}}/>
                    </div>
                    <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:2}}>
                      <div style={{color:cfg.windshield===w.id?C.gold:C.white,fontWeight:700,fontSize:13}}>{t(w.en, w.es, w.it)}</div>
                      {w.price&&<span style={{color:C.goldLight,fontSize:12,fontWeight:800,marginLeft:8}}>+${w.price}</span>}
                    </div>
                    <div style={{color:C.muted,fontSize:12}}>{t(w.descEn, w.descEs, w.descIt)}</div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        <div style={{marginTop:24,display:"flex",justifyContent:"space-between"}}>
          <button style={S.outBtn} onClick={()=>{setStep(3);window.scrollTo({top:0,behavior:"smooth"});}}>← {t("Back","Atrás","Indietro")}</button>
          <button style={S.goldBtn} onClick={()=>{setStep(5);window.scrollTo({top:0,behavior:"smooth"});}}>
            {t("Next","Siguiente","Avanti")} →
          </button>
        </div>
      </div>
    );
  }

  // Step 5 — Battery + Motor
  if(step===5) {
    const stdBattId = defaultBatteryFor(cfg.seats);
    const stdBatt = BATTERIES.find(b=>b.id===stdBattId);
    const stdMotor = MOTORS.find(m=>m.id===defaultMotorFor(cfg.model,cfg.seats));
    return (
      <div>
        <SummaryBar/>

        {/* BATTERY */}
        <h1 style={{...S.title,fontSize:"clamp(1.65rem,4.4vw,2.42rem)"}}>🔋 {tName(
          "How far do you want to go with {name}?",
          "¿Hasta dónde quieres llegar con {name}?",
          "Fin dove vuoi arrivare con {name}?",
          "Jusqu'où veux-tu aller avec {name} ?",
          "Jak daleko chcesz zajechać z {name}?",
          "Как далеко ты хочешь уехать на {name}?"
        )}</h1>
        <div style={{color:C.muted,fontSize:13,marginBottom:16}}>
          {t("We've already selected the ideal battery. If you want more range, you can choose to go further.","Ya hemos seleccionado la batería ideal. Si deseas más autonomía, puedes elegir ir más allá.","Abbiamo già selezionato la batteria ideale. Se desideri più autonomia, puoi scegliere di andare oltre.")}
        </div>
        {stdBatt && (
          <div onClick={()=>upd("battery",stdBattId)} style={{background:cfg.battery===stdBattId?"linear-gradient(135deg,#C9A84C20,#C9A84C08)":"#1a1a1a",border:cfg.battery===stdBattId?"2px solid #C9A84C":"1.5px solid #333",borderRadius:16,padding:20,marginBottom:16,display:"flex",gap:16,alignItems:"center",cursor:"pointer"}}>
            <div style={{flex:1}}>
              <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:4,flexWrap:"wrap"}}>
                <div style={{color:cfg.battery===stdBattId?C.gold:C.white,fontWeight:800,fontSize:15}}>{t(stdBatt.en, stdBatt.es, stdBatt.it)}</div>
                {stdBattId==="48v150a-litio" && <span style={{background:"linear-gradient(135deg,#3a7d44,#2d9e3a)",color:"#fff",fontSize:10,fontWeight:700,padding:"2px 8px",borderRadius:6}}>{t("TAAAC's Choice","Elección TAAAC","Scelta TAAAC")} ✓</span>}
                {cfg.battery===stdBattId && <span style={{background:"#C9A84C22",color:C.gold,fontSize:10,fontWeight:700,padding:"2px 8px",borderRadius:6}}>✓ {t("Selected","Seleccionado","Selezionato")}</span>}
              </div>
              <div style={{color:C.muted,fontSize:13,lineHeight:1.6}}>{t(stdBatt.descEn||"", stdBatt.descEs||"", stdBatt.descIt||"")}</div>
              {stdBattId==="48v150a-litio" && <div style={{color:C.goldLight,fontSize:12,fontWeight:600,marginTop:6}}>{t("Recommended for daily use.","Recomendada para el uso diario.","Consigliata per l'uso quotidiano.")}</div>}
              {stdBattId==="48v150a-litio" && <button style={{background:"transparent",border:"1px solid #3a7d44",color:"#3a7d44",borderRadius:8,padding:"4px 10px",cursor:"pointer",fontSize:11,marginTop:8}} onClick={(e)=>{e.stopPropagation();setShowTip(true);}}>
                💡 {t("Read our advice","Lee nuestro consejo","Leggi il nostro consiglio")}
              </button>}
            </div>
          </div>
        )}
        {showTip&&(
          <div style={{position:"fixed",inset:0,background:"rgba(0,0,0,0.85)",zIndex:200,display:"flex",alignItems:"center",justifyContent:"center",padding:20}}>
            <div style={{background:C.card,border:"1.5px solid #C9A84C",borderRadius:20,padding:28,maxWidth:500}}>
              <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:14}}>
                <span style={{color:C.gold,fontWeight:700,fontSize:16}}>💡 {t("Advice","Consejo","Consiglio")}</span>
                <button style={{background:"transparent",border:"none",color:C.muted,fontSize:22,cursor:"pointer"}} onClick={()=>setShowTip(false)}>✕</button>
              </div>
              <p style={{color:C.white,lineHeight:1.85,fontSize:13,marginBottom:12}}>
                {t("We recommend a lithium battery because it lasts much longer, with over 3,000 charge cycles. It also charges faster, requires less maintenance, and lithium loses very little charge if the golf car sits idle for weeks. Ideal where heat and humidity are high.",
                "Recomendamos una batería de litio porque dura mucho más, con más de 3.000 ciclos de carga. Además se recarga más rápido, requiere menos mantenimiento, y el litio pierde muy poca carga si el golf car permanece parado semanas. Ideal donde el calor y la humedad son elevados.",
                "Ti consigliamo una batteria al litio perché dura molto più a lungo, con oltre 3.000 cicli di ricarica. Si ricarica più velocemente, richiede meno manutenzione e il litio perde pochissima carica se il golf cart rimane fermo per settimane. Ideale dove il caldo e l'umidità sono elevati.")}
              </p>
            </div>
          </div>
        )}
        {!showBattOpts ? (
          <div style={{textAlign:"center",marginBottom:16}}>
            <button style={{...S.goldBtn,width:"100%",maxWidth:420}} onClick={()=>setShowBattOpts(true)}>
              ⚙️ {t("Other battery options","Otras opciones de batería","Altre opzioni batteria")}
            </button>
          </div>
        ) : (
          <div>
            <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:16}}>
              <div style={{color:C.muted,fontSize:13}}>{t("Choose your battery","Elige tu batería","Scegli la batteria")}</div>
              <button style={S.outBtn} onClick={()=>setShowBattOpts(false)}>✕ {t("Close","Cerrar","Chiudi")}</button>
            </div>
            <div style={{...S.grid2,marginBottom:16}}>
              {BATTERIES.filter(b=>b.id!==stdBattId).map(b=>{
                const bp = batteryPrice(cfg.seats, b.id);
                return (
                <div key={b.id} style={S.card(cfg.battery===b.id)} onClick={()=>upd("battery",b.id)}>
                  <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start"}}>
                    <div style={{color:cfg.battery===b.id?C.gold:C.white,fontWeight:700,fontSize:13,marginBottom:3}}>{t(b.en, b.es, b.it)}</div>
                    {bp==="onrequest"
                      ? <span style={{color:C.gold,fontSize:11,fontWeight:700,marginLeft:8,whiteSpace:"nowrap"}}>{t("On Request","Bajo Pedido","Su Richiesta")}</span>
                      : (bp>0 && <span style={{color:C.goldLight,fontSize:12,fontWeight:800,marginLeft:8}}>+${bp}</span>)}
                  </div>
                  <div style={{color:C.muted,fontSize:12,marginTop:3}}>{t(b.descEn||"", b.descEs||"", b.descIt||"")}</div>
                </div>
                );})}
            </div>
          </div>
        )}

        <div style={{borderTop:"1px solid #222",marginTop:8,paddingTop:20}}>
          {/* MOTOR */}
          <h2 style={{...S.title,fontSize:"clamp(1.65rem,4.4vw,2.42rem)"}}>⚡ {tName(
            "How much energy do you want to give {name}?",
            "¿Cuánta energía quieres darle a {name}?",
            "Quanta energia vuoi dare a {name}?",
            "Combien d'énergie veux-tu donner à {name} ?",
            "Ile energii chcesz dać {name}?",
            "Сколько энергии ты хочешь дать {name}?"
          )}</h2>
          <div style={{color:C.muted,fontSize:13,marginBottom:16}}>
            {t("We've already chosen the ideal power for daily use. Want a bit more? The choice is yours.","Ya hemos elegido la potencia ideal para el uso diario. ¿Quieres algo más? La elección es tuya.","Abbiamo già scelto la potenza ideale per l'uso quotidiano. Vuoi qualcosa in più? La scelta è tua.")}
          </div>
          {stdMotor && (
            <div onClick={()=>upd("motor",defaultMotorFor(cfg.model,cfg.seats))} style={{background:(cfg.motor===defaultMotorFor(cfg.model,cfg.seats))?"linear-gradient(135deg,#C9A84C20,#C9A84C08)":"#1a1a1a",border:(cfg.motor===defaultMotorFor(cfg.model,cfg.seats))?"2px solid #C9A84C":"1.5px solid #333",borderRadius:16,padding:20,marginBottom:16,display:"flex",gap:16,alignItems:"center",cursor:"pointer"}}>
              <div style={{flex:1}}>
                <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:4,flexWrap:"wrap"}}>
                  <div style={{color:(cfg.motor===defaultMotorFor(cfg.model,cfg.seats))?C.gold:C.white,fontWeight:800,fontSize:15}}>{t(stdMotor.en, stdMotor.es, stdMotor.it)}</div>
                  <span style={{background:"linear-gradient(135deg,#3a7d44,#2d9e3a)",color:"#fff",fontSize:10,fontWeight:700,padding:"2px 8px",borderRadius:6}}>{t("TAAAC's Choice","Elección TAAAC","Scelta TAAAC")} ✓</span>
                  {(cfg.motor===defaultMotorFor(cfg.model,cfg.seats)) && <span style={{background:"#C9A84C22",color:C.gold,fontSize:10,fontWeight:700,padding:"2px 8px",borderRadius:6}}>✓ {t("Selected","Seleccionado","Selezionato")}</span>}
                </div>
                <div style={{color:C.muted,fontSize:13,lineHeight:1.6}}>{t(stdMotor.descEn, stdMotor.descEs, stdMotor.descIt)}</div>
                <div style={{color:C.goldLight,fontSize:12,fontWeight:600,marginTop:6}}>{t("Our recommended balance between performance, efficiency and daily use.","Nuestro equilibrio recomendado entre rendimiento, eficiencia y uso diario.","Il nostro equilibrio consigliato tra prestazioni, efficienza e utilizzo quotidiano.")}</div>
              </div>
            </div>
          )}
          {!showMotorOpts ? (
            <div style={{textAlign:"center",marginBottom:16}}>
              <button style={{...S.goldBtn,width:"100%",maxWidth:420}} onClick={()=>setShowMotorOpts(true)}>
                ⚙️ {t("Other motor options","Otras opciones de motor","Altre opzioni motore")}
              </button>
            </div>
          ) : (
            <div>
              <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:16}}>
                <div style={{color:C.muted,fontSize:13}}>{t("Choose your motor","Elige tu motor","Scegli il motore")}</div>
                <button style={S.outBtn} onClick={()=>setShowMotorOpts(false)}>✕ {t("Close","Cerrar","Chiudi")}</button>
              </div>
              <div style={{display:"flex",gap:10,flexWrap:"wrap",marginBottom:16}}>
                {MOTORS.map(m=>{
                  const mp = motorPrice(cfg.model, cfg.seats, m.id);
                  return (
                    <div key={m.id} style={{...S.card(cfg.motor===m.id),flex:1,minWidth:120,position:"relative"}} onClick={()=>upd("motor",m.id)}>
                      <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start"}}>
                        <div style={{color:cfg.motor===m.id?C.gold:C.white,fontWeight:900,fontSize:20}}>{t(m.en, m.es, m.it)}</div>
                        {mp>0&&<span style={{color:C.goldLight,fontSize:12,fontWeight:800,marginLeft:8}}>+${mp}</span>}
                      </div>
                      <div style={{color:C.muted,fontSize:12,marginTop:3}}>{t(m.descEn, m.descEs, m.descIt)}</div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>

        <div style={{marginTop:24,display:"flex",justifyContent:"space-between"}}>
          <button style={S.outBtn} onClick={()=>{setStep(4);window.scrollTo({top:0,behavior:"smooth"});}}>← {t("Back","Atrás","Indietro")}</button>
          <button style={S.goldBtn} onClick={()=>{setStep(6);window.scrollTo({top:0,behavior:"smooth"});}}>
            {t("Next","Siguiente","Avanti")} →
          </button>
        </div>
      </div>
    );
  }

// Step 6 — Options
  if(step===6) {
    const solarPanel = OPTIONAL_ITEMS.find(o=>o.always);
    return (
      <div>
        <SummaryBar/>
        <h1 style={S.title}>{tName(
          "There's something we've already chosen for {name}.",
          "Hay algo que ya hemos elegido para {name}.",
          "C'è qualcosa che abbiamo già scelto per {name}.",
          "Il y a quelque chose que nous avons déjà choisi pour {name}.",
          "Jest coś, co już wybraliśmy dla {name}.",
          "Есть кое-что, что мы уже выбрали для {name}."
        )}</h1>
        {solarPanel && (
          <div style={{background:"linear-gradient(135deg,#C9A84C20,#3a7d4420)",border:"2px solid",borderImage:"linear-gradient(135deg,#C9A84C,#3a7d44) 1",borderRadius:16,padding:20,marginBottom:28,display:"flex",gap:16,alignItems:"center",boxShadow:"0 0 20px #C9A84C22"}}>
            <div style={{background:"#070707",borderRadius:12,display:"flex",justifyContent:"center",alignItems:"center",minWidth:90,minHeight:90,overflow:"hidden",flexShrink:0}}>
              <Img k={solarPanel.imgKey} style={{width:"100%",maxHeight:100}}/>
            </div>
            <div style={{flex:1}}>
              <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:6,flexWrap:"wrap"}}>
                <div style={{color:C.gold,fontWeight:800,fontSize:15}}>{t("Energy from the sun. Included.","Energía del sol. Incluida.","Energia dal sole. Inclusa.")}</div>
                <span style={{background:"linear-gradient(135deg,#C9A84C,#3a7d44)",color:"#fff",fontWeight:700,fontSize:10,padding:"3px 10px",borderRadius:8}}>☀️ {t("Always Included","Siempre Incluido","Sempre Incluso")}</span>
              </div>
              <div style={{color:C.white,fontSize:14,fontWeight:500,lineHeight:1.7}}>{t("Every Golf Cart is born with a solar panel included. Because under the Caribbean sun, for us, it simply made sense.","Todo Golf Cart nace con panel solar incluido. Porque bajo el sol del Caribe, para nosotros, simplemente tenía sentido.","Ogni Golf Cart nasce con pannello solare incluso. Perché sotto il sole dei Caraibi, per noi, aveva semplicemente senso.")}</div>
            </div>
          </div>
        )}
        <div style={{color:C.goldLight,fontSize:14,fontWeight:600,marginBottom:16,textAlign:"center"}}>
          {tName(
            "{name} already has everything it needs. Now choose what you desire.",
            "{name} ya tiene todo lo que necesita. Ahora elige lo que deseas.",
            "{name} ha già tutto ciò che serve. Ora scegli ciò che desideri.",
            "{name} a déjà tout ce qu'il faut. Maintenant choisis ce que tu désires.",
            "{name} ma już wszystko, czego potrzebuje. Teraz wybierz to, czego pragniesz.",
            "У {name} уже есть всё необходимое. Теперь выбери то, что желаешь."
          )}
        </div>
        {!showOptionals ? (
          <div style={{display:"flex",flexDirection:"column",gap:14,alignItems:"center",marginTop:8}}>
            <button style={{...S.goldBtn,width:"100%",maxWidth:420,padding:"14px 24px",fontSize:15}} onClick={()=>setShowOptionals(true)}>
              ⚙️ {t("Add more options","Añadir más opcionales","Aggiungi altri optional")}
            </button>
            <div style={{color:C.muted,fontSize:13,fontWeight:500}}>{t("Customize your golf cart with accessories","Personaliza tu golf cart con accesorios","Personalizza il tuo golf cart con accessori")}</div>
          </div>
        ) : (
          <div>
            <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:16}}>
              <div style={{color:C.muted,fontSize:13}}>{t("Select the options you want to add","Seleccione las opciones que desea añadir","Seleziona le opzioni che vuoi aggiungere")}</div>
              <button style={S.outBtn} onClick={()=>setShowOptionals(false)}>✕ {t("Close","Cerrar","Chiudi")}</button>
            </div>
            <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(min(100%,160px),1fr))",gap:10}}>
              {OPTIONAL_ITEMS.filter(o=>!o.always && (o.id!=="rear-platform" || cfg.seats==="2+2" || cfg.seats==="4+2")).map(o=>{
                const sel=cfg.optionals.includes(o.id);
                return (
                  <div key={o.id}
                    style={{background:sel?"#C9A84C0f":C.card,border:sel?"1.5px solid #C9A84C":"1.5px solid #222",borderRadius:14,padding:14,cursor:"pointer",display:"flex",flexDirection:"column",gap:6}}
                    onClick={()=>toggleOpt(o.id)}>
                    <div style={{background:"#070707",borderRadius:10,display:"flex",justifyContent:"center",alignItems:"center",minHeight:90,overflow:"hidden"}}>
                      <Img k={o.imgKey} style={{width:"100%",maxHeight:110}}/>
                    </div>
                    <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start"}}>
                      <div style={{color:sel?C.gold:C.white,fontWeight:700,fontSize:12,lineHeight:1.4}}>{t(o.en, o.es, o.it)}</div>
                      <span style={{color:C.goldLight,fontSize:12,fontWeight:800,marginLeft:8}}>+${o.price}</span>
                    </div>
                    <div style={{color:C.muted,fontSize:11,lineHeight:1.5}}>{t(o.descEn, o.descEs, o.descIt)}</div>
                    {o.noteEn&&<span style={{color:C.gold,fontSize:9}}>⚠️ {t(o.noteEn,o.noteEs,o.noteIt)}</span>}
                    <div style={{alignSelf:"flex-end",width:18,height:18,borderRadius:5,background:sel?C.gold:C.surface,border:sel?"1.5px solid #C9A84C":"1.5px solid #222",display:"flex",alignItems:"center",justifyContent:"center"}}>
                      {sel&&<span style={{color:"#000",fontSize:12,fontWeight:900}}>✓</span>}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
        <div style={{marginTop:28,display:"flex",justifyContent:"space-between"}}>
          <button style={S.outBtn} onClick={()=>{setStep(5);window.scrollTo({top:0,behavior:"smooth"});}}>← {t("Back","Atrás","Indietro")}</button>
          <button style={S.goldBtn} onClick={()=>{setStep(7);window.scrollTo({top:0,behavior:"smooth"});}}>{t("Continue","Continuar","Continua")} →</button>
        </div>
      </div>
    );
  }

  // Step 7 — Summary
  if(step===7) {
    return (
      <div>
        <div style={{textAlign:"center",padding:"40px 0",minHeight:"50vh",display:"flex",flexDirection:"column",justifyContent:"center"}}>
          <div style={{color:C.white,fontWeight:800,fontSize:"clamp(1.6rem,5vw,2.4rem)",lineHeight:1.4}}>
            {t("You've made every choice.","Has hecho cada elección.","Hai fatto ogni scelta.")}
          </div>
          <div style={{height:28}}/>
          <div style={{color:C.white,fontWeight:800,fontSize:"clamp(1.6rem,5vw,2.4rem)",lineHeight:1.4,marginBottom:36}}>
            {t("Every detail carries your signature.","Cada detalle lleva tu firma.","Ogni dettaglio porta la tua firma.")}
          </div>
          <div style={{display:"flex",justifyContent:"center",marginBottom:20}}>
            <Img k={model?.imgKey} style={{maxHeight:220,maxWidth:"100%",objectFit:"contain"}}/>
          </div>
          <div style={{color:C.gold,fontWeight:900,fontSize:"clamp(1.8rem,6vw,2.6rem)",marginBottom:16}}>🚗 {cartDisplayName}</div>
          <div style={{color:C.goldLight,fontWeight:800,fontSize:33,letterSpacing:2,textTransform:"uppercase"}}>{t("Your Creation","Tu Creación","La Tua Creazione")}</div>
        </div>
        <div style={{display:"flex",justifyContent:"space-between"}}>
          <button style={S.outBtn} onClick={()=>{setStep(6);window.scrollTo({top:0,behavior:"smooth"});}}>← {t("Edit","Editar","Modifica")}</button>
          <button style={S.goldBtn} onClick={()=>{setStep(8);window.scrollTo({top:0,behavior:"smooth"});}}>{t("Next","Siguiente","Avanti")} →</button>
        </div>
      </div>
    );
  }

  // Step 8 — Technical Summary
  if(step===8) {
    const bat=BATTERIES.find(b=>b.id===cfg.battery);
    const mot=MOTORS.find(m=>m.id===cfg.motor);
    const st=SEAT_TYPES.find(s=>s.id===cfg.seatType);
    const ti=TIRES.find(t=>t.id===cfg.tire);
    const sw=STEERING.find(s=>s.id===cfg.steering);
    const ws=WINDSHIELDS.find(w=>w.id===cfg.windshield);
    return (
      <div>
        <h1 style={S.title}>{t("Summary","Resumen","Riepilogo")}</h1>
        <div style={{color:C.muted,fontSize:13,marginBottom:20}}>{t("Review your configuration","Revisa la configuración","Controlla la configurazione")}</div>
        <div style={{background:C.card,border:"1px solid #222",borderRadius:18,padding:20,marginBottom:20}}>
          <div style={{display:"flex",justifyContent:"center",marginBottom:14}}>
            <Img k={model?.imgKey} style={{maxHeight:180,maxWidth:"100%",objectFit:"contain"}}/>
          </div>
          <div style={{textAlign:"center"}}>
            <div style={{color:C.gold,fontWeight:800,fontSize:20}}>{t("Model","Modelo","Modello")} {cfg.model}</div>
            <div style={{color:C.muted,marginTop:4,fontSize:13,display:"flex",alignItems:"center",justifyContent:"center",gap:6,flexWrap:"wrap"}}>
              <span>{cfg.seats} {t("seats","plazas","posti")} ·</span>
              <span style={{display:"inline-flex",alignItems:"center",gap:5}}>
                <span style={{display:"inline-block",width:14,height:14,borderRadius:"50%",background:cfg.bodyColor.hex,border:"1px solid #555"}}/>
                {cfg.bodyColor.code} {t(cfg.bodyColor.en,cfg.bodyColor.es,cfg.bodyColor.it)}
              </span>
            </div>
          </div>
        </div>
        <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(180px,1fr))",gap:10,marginBottom:20}}>
          {[
            {it:"Batteria",es:"Batería",en:"Battery",v:`${bat?.it}`},
            {it:"Motore",es:"Motor",en:"Motor",v:`${mot?.it}`},
            {it:"Sedile",es:"Asiento",en:"Seat",v:t(st?.en,st?.es,st?.it)},
            {it:"Col. Sedile",es:"Col. Asiento",en:"Seat Color",v:t(cfg.seatColor.en,cfg.seatColor.es,cfg.seatColor.it)},
            {it:"Pneumatici",es:"Neumáticos",en:"Tires",v:t(ti?.en,ti?.es,ti?.it)},
            {it:"Volante",es:"Volante",en:"Steering",v:t(sw?.en,sw?.es,sw?.it)},
            {it:"Parabrezza",es:"Parabrisas",en:"Windshield",v:t(ws?.en,ws?.es,ws?.it)},
          ].map(r=>(
            <div key={r.it} style={{background:C.surface,borderRadius:10,padding:12}}>
              <div style={{color:C.muted,fontSize:11,marginBottom:3}}>{t(r.en, r.es, r.it)}</div>
              <div style={{color:C.white,fontWeight:600,fontSize:12,display:"flex",alignItems:"center",gap:6}}>
                {r.it==="Col. Sedile" && <span style={{display:"inline-block",width:12,height:12,borderRadius:"50%",background:cfg.seatColor.hex,border:"1px solid #555",flexShrink:0}}/>}
                {r.v}
              </div>
            </div>
          ))}
        </div>
        <h3 style={{color:C.gold,marginBottom:12}}>{t("Options","Opcionales","Optional")}</h3>
        <div style={{background:C.card,borderRadius:14,padding:16,marginBottom:20}}>
          {cfg.optionals.map(id=>{
            const o=OPTIONAL_ITEMS.find(x=>x.id===id);
            return o?(<div key={id} style={{display:"flex",alignItems:"center",justifyContent:"space-between",padding:"8px 0",borderBottom:"1px solid #222",gap:10}}>
              <div style={{display:"flex",alignItems:"center",gap:10,flex:1}}>
                {o.imgKey && <div style={{width:36,height:36,borderRadius:8,background:"#070707",overflow:"hidden",flexShrink:0,display:"flex",alignItems:"center",justifyContent:"center"}}><Img k={o.imgKey} style={{width:"100%",height:"100%",objectFit:"cover"}}/></div>}
                <div>
                  <span style={{color:C.white,fontSize:12}}>{t(o.en,o.es,o.it)}</span>
                </div>
              </div>
              {o.always
                ? <span style={{background:"linear-gradient(135deg,#C9A84C,#3a7d44)",color:"#fff",fontWeight:700,fontSize:10,padding:"3px 8px",borderRadius:8,display:"inline-block",whiteSpace:"nowrap"}}>☀️ {t("Included","Incluido","Incluso")}</span>
                : <span style={{color:C.goldLight,fontWeight:800,fontSize:12,whiteSpace:"nowrap"}}>+${o.price}</span>
              }
            </div>):null;
          })}
          <div style={{paddingTop:12,marginTop:8,borderTop:"1px solid #222"}}>
            <div style={{color:C.muted,fontSize:12}}>* {t("The official quote will be calculated by our team, including any discounts.","El presupuesto será calculado por nuestro equipo, incluyendo posibles descuentos.","Il preventivo ufficiale verrà calcolato dal nostro team, includendo eventuali scontistiche.")}</div>
          </div>
        </div>
        {/* Delivery time */}
        <div style={{background:"#0d1f0d",border:"1px solid #2a4a2a",borderRadius:12,padding:14,marginBottom:16,display:"flex",alignItems:"center",gap:12}}>
          <span style={{fontSize:24}}>🚚</span>
          <div>
            <div style={{color:"#5a9a5a",fontWeight:700,fontSize:13}}>{t("Estimated Delivery","Entrega estimada","Consegna stimata")}</div>
            <div style={{color:"#7ac47a",fontSize:12,marginTop:2}}>~90 {t("days from deposit confirmation","días desde la confirmación del depósito","giorni dalla conferma del deposito")}</div>
          </div>
        </div>
        {/* Warranty */}
        <div style={{background:"#1a1608",border:"1px solid #4a3f2a",borderRadius:12,padding:14,marginBottom:16,display:"flex",alignItems:"center",gap:12}}>
          <span style={{fontSize:24}}>🛡️</span>
          <div>
            <div style={{color:C.goldLight,fontWeight:700,fontSize:13}}>{t("12-Month Warranty Included","Garantía de 12 Meses Incluida","Garanzia 12 Mesi Inclusa")}</div>
            <div style={{color:C.muted,fontSize:13,marginTop:2}}>{t("See details in the FAQ","Ver detalles en las FAQ","Dettagli nelle FAQ")}</div>
          </div>
        </div>
        <div style={{display:"flex",justifyContent:"space-between"}}>
          <button style={S.outBtn} onClick={()=>{setStep(7);window.scrollTo({top:0,behavior:"smooth"});}}>← {t("Back","Atrás","Indietro")}</button>
          <button style={S.goldBtn} onClick={()=>{setStep(9);window.scrollTo({top:0,behavior:"smooth"});}}>📩 {t("Last Step","Último Paso","Ultimo Passaggio")} →</button>
        </div>
      </div>
    );
  }

  // Step 9 — Confirm
  if(step===9) {
    return (
      <CustomerForm
        onSubmit={(action)=>{
          if(action==="back") setStep(8);
          else { setPage("home"); setStep(0); setShowOptionals(false); }
        }}
        totalPrice={totalPrice()}
        model={model}
        cfg={cfg}
        lang={lang}
        BATTERIES={BATTERIES}
        MOTORS={MOTORS}
        SEAT_TYPES={SEAT_TYPES}
        TIRES={TIRES}
        STEERING={STEERING}
        WINDSHIELDS={WINDSHIELDS}
        OPTIONAL_ITEMS={OPTIONAL_ITEMS}
        ru={ru}
        fr={fr}
        pl={pl}
      />
    );
  }

  return null;
}

export default ConfiguratorPage;
