import PropTypes from "prop-types";
import { useState, useRef, useEffect } from "react";

function GuidedAssistantPage({ t, t6, tName, S, C, setPage, setStep, cfg, setCfg, upd, MODELS, SEAT_TYPES, TIRES, STEERING, WINDSHIELDS, OPTIONAL_ITEMS, RAL_COLORS, SEAT_COLORS, defaultMotorFor, defaultBatteryFor, Img, aStep, setAStep, aUsage, setAUsage, aShowMoreOpts, setAShowMoreOpts, showRobotHint, toggleOpt }) {
  const aNameRef = useRef();
  const [showChoice, setShowChoice] = useState(false);
  const bubble = {background:C.card,border:"1px solid #222",borderRadius:18,borderTopLeftRadius:4,padding:20,marginBottom:20,maxWidth:560,marginLeft:"auto",marginRight:"auto"};
  const choiceBtn = (active) => ({
    background: active ? "linear-gradient(135deg,#C9A84C20,#C9A84C08)" : C.surface,
    border: active ? "2px solid #C9A84C" : "1.5px solid #222",
    borderRadius:14, padding:16, cursor:"pointer", textAlign:"center",
  });

  const suggestedOptIds = ["car-cover","windshield-wiper","bull-bar"];
  const availableTires = TIRES.filter(tr => {
    if(tr.id==="grass-10" && cfg.model!=="A") return false;
    if(aUsage==="golf") return tr.type==="grass";
    if(aUsage==="offroad") return tr.type==="offroad";
    return true;
  });
  const filteredSteering = STEERING.filter(s => s.id==="standard" || !s.models || s.models.includes(cfg.model));
  const filteredOptionals = OPTIONAL_ITEMS.filter(o => !o.always && (!o.models || o.models.includes(cfg.model)) && (o.id!=="rear-platform" || cfg.seats==="2+2" || cfg.seats==="4+2"));

  const goNext = () => setAStep(s=>s+1);
  const goBack = () => setAStep(s=>{
    let prev = s-1;
    if(prev===8 && filteredSteering.length<=1) prev = 7;
    return prev<0 ? 0 : prev;
  });

  // Salta automaticamente lo step Volante se Model A (solo Standard disponibile)
  useEffect(() => {
    if(aStep===8 && filteredSteering.length<=1) {
      upd("steering","standard");
      setAStep(9);
    }
  }, [aStep, cfg.model]);

  const finishToConfigurator = () => {
    setPage("configurator");
    setStep(8);
    setAStep(0);
    setAUsage(null);
    setAShowMoreOpts(false);
  };

  return (
    <div style={{...S.sec, maxWidth:680}}>
      <div style={{display:"flex",justifyContent:"center",marginBottom:16}}>
        <svg viewBox="0 -3 40 59" width="51" height="80" fill="none" stroke="#C9A84C" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{filter:"drop-shadow(0 4px 10px rgba(0,0,0,0.5))"}}>
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
      </div>
      {/* Intro SEO */}
      <div style={{color:C.gold,fontSize:10,letterSpacing:4,fontWeight:700,marginBottom:14,textTransform:"uppercase",textAlign:"center"}}>
        {t("Get Guided","Déjate Guiar","Fatti Guidare")}
      </div>
      {aStep===0 && (
        <>
          <h1 style={{...S.title,textAlign:"center"}}>{t("How to Choose Your Golf Cart","Cómo Elegir tu Golf Cart","Come Scegliere il Tuo Golf Cart")}</h1>
          <p style={{color:C.muted,fontSize:14,lineHeight:1.8,textAlign:"center",maxWidth:560,marginLeft:"auto",marginRight:"auto",marginBottom:32}}>
            {t(
              "Not sure where to start? Let our virtual assistant guide you step by step to your ideal golf cart — answering a few simple questions, just like our full configurator, but at a relaxed pace.",
              "¿No sabes por dónde empezar? Deja que nuestro asistente virtual te guíe paso a paso hacia tu golf cart ideal — respondiendo algunas preguntas simples, como nuestro configurador completo, pero con calma.",
              "Non sai da dove iniziare? Fatti guidare passo passo dal nostro assistente virtuale verso il tuo golf cart ideale — rispondendo a poche semplici domande, proprio come nel configuratore completo, ma con calma."
            )}
          </p>
        </>
      )}

      {aStep>0 && (
        <div style={{textAlign:"center",marginBottom:8}}>
          <button style={S.goldBtn} onClick={goBack}>
            ← {t("Back","Atrás","Indietro")}
          </button>
        </div>
      )}

      {/* STEP 0 — Benvenuto */}
      {aStep===0 && !showChoice && (
        <div style={bubble}>
          <div style={{fontSize:32,marginBottom:10,textAlign:"center"}}>🚗</div>
          <div style={{color:C.white,fontSize:20,lineHeight:1.6,textAlign:"center",marginBottom:20}}>
            {t(
              "Welcome! Thank you for visiting our site. We sell golf carts for every need — let's find the right one for you together.",
              "¡Bienvenido! Gracias por visitar nuestro sitio. Vendemos golf carts para cada necesidad — encontremos juntos el ideal para ti.",
              "Benvenuto! Grazie per aver visitato il nostro sito. Vendiamo golf cart per ogni esigenza — troviamo insieme quello giusto per te."
            )}
          </div>
          <div style={{textAlign:"center"}}>
            <button style={S.goldBtn} onClick={()=>setShowChoice(true)}>{t("Let's Start","Empecemos","Iniziamo")} →</button>
          </div>
        </div>
      )}

      {/* STEP 0 — Come vuoi procedere */}
      {aStep===0 && showChoice && (
        <>
          <h2 style={{...S.title,textAlign:"center",fontSize:22,marginBottom:16}}>{t("How would you like to proceed?","¿Cómo deseas continuar?","Come vuoi procedere?")}</h2>
          <div style={S.grid2}>
            <div style={{...S.card(false),textAlign:"center",padding:32}} onClick={goNext}>
              <div style={{fontSize:44,marginBottom:14}}>🛺🔧</div>
              <div style={{color:C.gold,fontWeight:800,fontSize:18,marginBottom:6}}>{t("Configure your own","Configura el tuyo","Configura il tuo")}</div>
              <div style={{color:C.muted,fontSize:13,lineHeight:1.6,marginBottom:16}}>{t6("Start with your model and personalize it your way.","Elige tu modelo y personalízalo a tu manera.","Parti dal tuo modello e personalizzalo a modo tuo.","Partez de votre modèle et personnalisez-le à votre façon.","Zacznij od wybranego modelu i spersonalizuj go po swojemu.","Начните с выбранной модели и настройте её по-своему.")}</div>
              <button style={{...S.goldBtn,marginTop:18,width:"100%"}}>{t("Start configuring","Empezar","Inizia")} →</button>
            </div>
            <div style={{...S.card(false),textAlign:"center",padding:32}} onClick={()=>setPage("readyModels")}>
              <div style={{fontSize:44,marginBottom:14}}>🛺</div>
              <div style={{color:C.gold,fontWeight:800,fontSize:18,marginBottom:6}}>{t("Pre-configured models","Modelos preconfigurados","Modelli già configurati")}</div>
              <div style={{color:C.muted,fontSize:13,lineHeight:1.6,marginBottom:16}}>{t("Browse ready-to-buy golf carts already set up and available now.","Ver golf carts listos para comprar.","Vedi golf cart già configurati pronti all'acquisto.")}</div>
              <button style={{...S.goldBtn,marginTop:18,width:"100%"}}>{t("Browse models","Ver modelos","Vedi modelli")} →</button>
            </div>
          </div>
        </>
      )}

      {/* STEP 1 — Nome */}
      {aStep===1 && (
        <div style={bubble}>
          <div style={{color:C.white,fontSize:20,lineHeight:1.6,marginBottom:16,textAlign:"center"}}>
            {t("First things first — what would you like to name your golf cart?","Primero lo primero — ¿cómo te gustaría llamar a tu golf cart?","Prima di tutto — come vorresti chiamare il tuo golf cart?")}
          </div>
          <input ref={aNameRef} type="text" defaultValue={cfg.cartName} placeholder="Golf Cart" maxLength={30}
            style={{width:"100%",maxWidth:320,display:"block",margin:"0 auto 20px",background:C.surface,border:"1.5px solid #333",borderRadius:12,padding:"14px 18px",fontSize:16,color:C.gold,textAlign:"center",fontWeight:700,outline:"none"}}/>
          <div style={{textAlign:"center"}}>
            <button style={S.goldBtn} onClick={()=>{upd("cartName",aNameRef.current.value);goNext();}}>{t("Next","Siguiente","Avanti")} →</button>
          </div>
        </div>
      )}

      {/* STEP 2 — Golf o Off-Road */}
      {aStep===2 && (
        <div style={bubble}>
          <div style={{color:C.white,fontSize:20,lineHeight:1.6,marginBottom:20,textAlign:"center"}}>
            {tName("Where will you go with {name}?","¿A dónde irás con {name}?","Dove andrai con {name}?","Où iras-tu avec {name} ?","Dokąd pojedziesz z {name}?","Куда ты поедешь на {name}?")}
          </div>
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:12}}>
            <div style={choiceBtn(aUsage==="golf")} onClick={()=>{setAUsage("golf");goNext();}}>
              <div style={{fontSize:32,marginBottom:8}}>⛳</div>
              <div style={{color:C.white,fontWeight:700,fontSize:14}}>{t("Golf Course","Campo de Golf","Campo da Golf")}</div>
            </div>
            <div style={choiceBtn(aUsage==="offroad")} onClick={()=>{setAUsage("offroad");goNext();}}>
              <div style={{fontSize:32,marginBottom:8}}>🏔️</div>
              <div style={{color:C.white,fontWeight:700,fontSize:14}}>{t("Off-Road","Todoterreno","Off-Road")}</div>
            </div>
          </div>
        </div>
      )}

      {/* STEP 3 — Modello */}
      {aStep===3 && (
        <div style={bubble}>
          <div style={{color:C.white,fontSize:20,lineHeight:1.6,marginBottom:20,textAlign:"center"}}>
            {tName("What shape will {name} take?","¿Qué forma tendrá {name}?","Che forme avrà {name}?","Quelle forme aura {name} ?","Jaki kształt będzie mieć {name}?","Какую форму примет {name}?")}
          </div>
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:12}}>
            {MODELS.map(m=>(
              <div key={m.id} style={choiceBtn(cfg.model===m.id)} onClick={()=>{
                upd("model",m.id);
                upd("motor",defaultMotorFor(m.id,cfg.seats||"2"));
                upd("battery",defaultBatteryFor(cfg.seats||"2"));
                upd("steering","standard");
                goNext();
              }}>
                <div style={{height:91,display:"flex",alignItems:"center",justifyContent:"center",marginBottom:6}}>
                  <Img k={m.imgKey} style={{maxHeight:"100%",maxWidth:"100%",objectFit:"contain"}}/>
                </div>
                <div style={{color:C.gold,fontWeight:700,fontSize:13}}>{t(m.name.split(" / ")[0],m.name.split(" / ")[1],m.name.split(" / ")[2])}</div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* STEP 4 — Colore */}
      {aStep===4 && (
        <div style={bubble}>
          <div style={{color:C.white,fontSize:20,lineHeight:1.6,marginBottom:20,textAlign:"center"}}>
            {tName("What color will {name} be?","¿De qué color será {name}?","Che colore avrà {name}?","De quelle couleur sera {name} ?","Jaki kolor będzie mieć {name}?","Какого цвета будет {name}?")}
          </div>
          <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(52px,1fr))",gap:10,marginBottom:20}}>
            {RAL_COLORS.map(c=>(
              <div key={c.code} onClick={()=>{upd("bodyColor",c);goNext();}} title={t(c.en,c.es,c.it)}
                style={{width:"100%",aspectRatio:"1",borderRadius:"50%",background:c.hex,border:cfg.bodyColor?.code===c.code?"3px solid #C9A84C":"2px solid #333",cursor:"pointer"}}/>
            ))}
          </div>
          {cfg.bodyColor && <div style={{textAlign:"center"}}><button style={S.goldBtn} onClick={goNext}>{t("Next","Siguiente","Avanti")} →</button></div>}
        </div>
      )}

      {/* STEP 5 — Posti */}
      {aStep===5 && (
        <div style={bubble}>
          <div style={{color:C.white,fontSize:20,lineHeight:1.6,marginBottom:20,textAlign:"center"}}>
            {tName("How many seats will {name} have?","¿Cuántos asientos tendrá {name}?","Quanti posti avrà {name}?","Combien de places aura {name} ?","Ile miejsc będzie mieć {name}?","Сколько мест будет у {name}?")}
          </div>
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:12}}>
            {[{id:"2",it:"2 Posti",es:"2 Plazas",en:"2 Seats"},{id:"2+2",it:"2+2 Posti",es:"2+2 Plazas",en:"2+2 Seats"},{id:"4",it:"4 Posti",es:"4 Plazas",en:"4 Seats"},{id:"4+2",it:"4+2 Posti",es:"4+2 Plazas",en:"4+2 Seats"}].map(s=>(
              <div key={s.id} style={choiceBtn(cfg.seats===s.id)} onClick={()=>{
                upd("seats",s.id);
                upd("motor",defaultMotorFor(cfg.model,s.id));
                upd("battery",defaultBatteryFor(s.id));
                if(s.id!=="2+2"&&s.id!=="4+2"){setCfg(p=>({...p,optionals:p.optionals.filter(id=>id!=="rear-platform")}));}
                goNext();
              }}>
                <div style={{color:C.white,fontWeight:700,fontSize:14}}>{t(s.en,s.es,s.it)}</div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* STEP 6 — Stile Sedili */}
      {aStep===6 && (
        <div style={bubble}>
          <div style={{color:C.white,fontSize:20,lineHeight:1.6,marginBottom:20,textAlign:"center"}}>
            {tName("What style will {name}'s seats have?","¿Qué estilo tendrán los asientos de {name}?","Che stile avranno i sedili di {name}?","Quel style auront les sièges de {name} ?","Jaki styl będą mieć siedzenia {name}?","В каком стиле будут сиденья {name}?")}
          </div>
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:12}}>
            {SEAT_TYPES.map(st=>(
              <div key={st.id} style={choiceBtn(cfg.seatType===st.id)} onClick={()=>{upd("seatType",st.id);goNext();}}>
                <div style={{height:78,display:"flex",alignItems:"center",justifyContent:"center",marginBottom:6}}>
                  <Img k={st.imgKey} style={{maxHeight:"100%",maxWidth:"100%",objectFit:"contain"}}/>
                </div>
                <div style={{color:C.white,fontWeight:700,fontSize:12}}>{t(st.en,st.es,st.it)}</div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* STEP 7 — Colore Sedili */}
      {aStep===7 && (
        <div style={bubble}>
          <div style={{color:C.white,fontSize:20,lineHeight:1.6,marginBottom:20,textAlign:"center"}}>
            {tName("What color will {name}'s seats be?","¿De qué color serán los asientos de {name}?","Che colore saranno i sedili di {name}?","De quelle couleur seront les sièges de {name} ?","Jakiego koloru będą siedzenia {name}?","Какого цвета будут сиденья {name}?")}
          </div>
          <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(52px,1fr))",gap:10,marginBottom:20}}>
            {SEAT_COLORS.map(c=>(
              <div key={c.id} onClick={()=>{upd("seatColor",c);goNext();}} title={t(c.en,c.es,c.it)}
                style={{width:"100%",aspectRatio:"1",borderRadius:"50%",background:c.hex,border:cfg.seatColor?.id===c.id?"3px solid #C9A84C":"2px solid #333",cursor:"pointer"}}/>
            ))}
          </div>
        </div>
      )}

      {/* STEP 8 — Volante (auto-skip per Model A via useEffect) */}
      {aStep===8 && filteredSteering.length>1 && (
        <div style={bubble}>
          <div style={{color:C.white,fontSize:20,lineHeight:1.6,marginBottom:20,textAlign:"center"}}>
            {tName("Now take control of {name}","Ahora toma el control de {name}","Ora prendi il controllo di {name}","Prends maintenant le contrôle de {name}","Teraz przejmij kontrolę nad {name}","Теперь возьми {name} под контроль")}
          </div>
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:12}}>
            {filteredSteering.map(sw=>(
              <div key={sw.id} style={choiceBtn(cfg.steering===sw.id)} onClick={()=>{upd("steering",sw.id);goNext();}}>
                <div style={{height:78,display:"flex",alignItems:"center",justifyContent:"center",marginBottom:6}}>
                  <Img k={sw.imgKey} style={{maxHeight:"100%",maxWidth:"100%",objectFit:"contain"}}/>
                </div>
                <div style={{color:C.white,fontWeight:700,fontSize:11}}>{t(sw.en,sw.es,sw.it)}</div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* STEP 9 — Pneumatici (filtrati) */}
      {aStep===9 && (
        <div style={bubble}>
          <div style={{color:C.white,fontSize:20,lineHeight:1.6,marginBottom:6,textAlign:"center"}}>
            {tName("What character will {name} have?","¿Qué carácter tendrá {name}?","Che carattere avrà {name}?","Quel caractère aura {name} ?","Jaki charakter będzie mieć {name}?","Какой характер будет у {name}?")}
          </div>
          <div style={{color:C.muted,fontSize:13,textAlign:"center",marginBottom:16}}>
            {aUsage==="golf"
              ? t("Showing grass tires, ideal for golf courses","Mostrando neumáticos de césped, ideales para campos de golf","Ti mostro i pneumatici da erba, ideali per campi da golf")
              : t("Showing off-road tires, ideal for rough terrain","Mostrando neumáticos todoterreno, ideales para terrenos difíciles","Ti mostro i pneumatici off-road, ideali per terreni difficili")}
          </div>
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:12}}>
            {availableTires.map(tr=>(
              <div key={tr.id} style={choiceBtn(cfg.tire===tr.id)} onClick={()=>{upd("tire",tr.id);goNext();}}>
                <div style={{height:78,display:"flex",alignItems:"center",justifyContent:"center",marginBottom:6}}>
                  <Img k={tr.imgKey} style={{maxHeight:"100%",maxWidth:"100%",objectFit:"contain"}}/>
                </div>
                <div style={{color:C.white,fontWeight:700,fontSize:12}}>{t(tr.en,tr.es,tr.it)}</div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* STEP 10 — Parabrezza */}
      {aStep===10 && (
        <div style={bubble}>
          <div style={{color:C.white,fontSize:20,lineHeight:1.6,marginBottom:20,textAlign:"center"}}>
            {tName("How do you want to experience the road with {name}?","¿Cómo quieres vivir la carretera con {name}?","Come vuoi vivere la strada con {name}?","Comment veux-tu vivre la route avec {name} ?","Jak chcesz przeżywać drogę z {name}?","Как ты хочешь ощущать дорогу с {name}?")}
          </div>
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:12}}>
            {WINDSHIELDS.map(ws=>(
              <div key={ws.id} style={choiceBtn(cfg.windshield===ws.id)} onClick={()=>{upd("windshield",ws.id);goNext();}}>
                <div style={{height:78,display:"flex",alignItems:"center",justifyContent:"center",marginBottom:6}}>
                  <Img k={ws.imgKey} style={{maxHeight:"100%",maxWidth:"100%",objectFit:"contain"}}/>
                </div>
                <div style={{color:C.white,fontWeight:700,fontSize:12}}>{t(ws.en,ws.es,ws.it)}</div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* STEP 11 — Batteria/Motore (informativo) */}
      {aStep===11 && (
        <div style={bubble}>
          <div style={{fontSize:28,marginBottom:10,textAlign:"center"}}>🔋⚡</div>
          <div style={{color:C.white,fontSize:20,lineHeight:1.6,marginBottom:8,textAlign:"center"}}>
            {tName("We've already chosen the ideal battery and motor for {name}.","Ya hemos elegido la batería y el motor ideales para {name}.","Abbiamo già scelto la batteria e il motore ideali per {name}.","Nous avons déjà choisi la batterie et le moteur idéaux pour {name}.","Już wybraliśmy idealną baterię i silnik dla {name}.","Мы уже выбрали идеальную батарею и мотор для {name}.")}
          </div>
          <div style={{color:C.muted,fontSize:13,textAlign:"center",marginBottom:20}}>
            {t("Our recommended balance between performance, efficiency and daily use.","Nuestro equilibrio recomendado entre rendimiento, eficiencia y uso diario.","Il nostro equilibrio consigliato tra prestazioni, efficienza e utilizzo quotidiano.")}
          </div>
          <div style={{textAlign:"center"}}>
            <button style={S.goldBtn} onClick={goNext}>{t("Next","Siguiente","Avanti")} →</button>
          </div>
        </div>
      )}

      {/* STEP 12 — Optional */}
      {aStep===12 && (
        <div style={bubble}>
          <div style={{color:C.white,fontSize:20,lineHeight:1.6,marginBottom:6,textAlign:"center"}}>
            {tName("{name} already has everything it needs.","{name} ya tiene todo lo que necesita.","{name} ha già tutto ciò che serve.","{name} a déjà tout ce qu'il faut.","{name} ma już wszystko, czego potrzebuje.","У {name} уже есть всё необходимое.")}
          </div>
          <div style={{color:C.muted,fontSize:13,textAlign:"center",marginBottom:20}}>
            {t("Here are a few accessories we recommend:","Aquí tienes algunos accesorios que recomendamos:","Ecco alcuni accessori che ti consigliamo:")}
          </div>
          <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(140px,1fr))",gap:10,marginBottom:16}}>
            {(aShowMoreOpts ? filteredOptionals : filteredOptionals.filter(o=>suggestedOptIds.includes(o.id))).map(o=>{
              const sel = cfg.optionals.includes(o.id);
              return (
                <div key={o.id} onClick={()=>toggleOpt(o.id)}
                  style={{background:sel?"#C9A84C0f":C.surface,border:sel?"1.5px solid #C9A84C":"1.5px solid #222",borderRadius:14,padding:12,cursor:"pointer"}}>
                  <div style={{background:"#070707",borderRadius:10,display:"flex",justifyContent:"center",alignItems:"center",minHeight:91,overflow:"hidden",marginBottom:6}}>
                    <Img k={o.imgKey} style={{width:"100%",maxHeight:90}}/>
                  </div>
                  <div style={{color:sel?C.gold:C.white,fontWeight:700,fontSize:11,marginBottom:2}}>{t(o.en,o.es,o.it)}</div>
                  <div style={{color:C.goldLight,fontSize:11,fontWeight:800}}>+${o.price}</div>
                </div>
              );
            })}
          </div>
          {!aShowMoreOpts && (
            <div style={{textAlign:"center",marginBottom:16}}>
              <button style={S.outBtn} onClick={()=>setAShowMoreOpts(true)}>
                {t("Show me other accessories","Muéstrame otros accesorios","Mostrami altri accessori")}
              </button>
            </div>
          )}
          <div style={{textAlign:"center"}}>
            <button style={S.goldBtn} onClick={goNext}>{t("Next","Siguiente","Avanti")} →</button>
          </div>
        </div>
      )}

      {/* STEP 13 — Fine */}
      {aStep===13 && (
        <div style={bubble}>
          <div style={{fontSize:32,marginBottom:10,textAlign:"center"}}>🎉</div>
          <div style={{color:C.white,fontSize:20,lineHeight:1.6,marginBottom:20,textAlign:"center"}}>
            {tName("That's it! {name} is ready. Let's take a look at your creation.","¡Listo! {name} está listo. Echemos un vistazo a tu creación.","Fatto! {name} è pronto. Diamo un'occhiata alla tua creazione.","Voilà ! {name} est prêt. Jetons un œil à ta création.","Gotowe! {name} jest gotowy. Spójrzmy na Twoje dzieło.","Готово! {name} готов. Давай взглянем на твоё творение.")}
          </div>
          <div style={{textAlign:"center"}}>
            <button style={S.goldBtn} onClick={finishToConfigurator}>🚗 {t("Configure","Configurar","Configura")} →</button>
          </div>
        </div>
      )}
    </div>
  );
}

GuidedAssistantPage.propTypes = {
  t: PropTypes.func.isRequired,
  t6: PropTypes.func.isRequired,
  tName: PropTypes.func.isRequired,
  S: PropTypes.object.isRequired,
  C: PropTypes.object.isRequired,
  setPage: PropTypes.func.isRequired,
  setStep: PropTypes.func.isRequired,
  cfg: PropTypes.object.isRequired,
  setCfg: PropTypes.func.isRequired,
  upd: PropTypes.func.isRequired,
  MODELS: PropTypes.array.isRequired,
  SEAT_TYPES: PropTypes.array.isRequired,
  TIRES: PropTypes.array.isRequired,
  STEERING: PropTypes.array.isRequired,
  WINDSHIELDS: PropTypes.array.isRequired,
  OPTIONAL_ITEMS: PropTypes.array.isRequired,
  RAL_COLORS: PropTypes.array.isRequired,
  SEAT_COLORS: PropTypes.array.isRequired,
  defaultMotorFor: PropTypes.func.isRequired,
  defaultBatteryFor: PropTypes.func.isRequired,
  Img: PropTypes.elementType.isRequired,
  aStep: PropTypes.number.isRequired,
  setAStep: PropTypes.func.isRequired,
  aUsage: PropTypes.string,
  setAUsage: PropTypes.func.isRequired,
  aShowMoreOpts: PropTypes.bool.isRequired,
  setAShowMoreOpts: PropTypes.func.isRequired,
  showRobotHint: PropTypes.bool.isRequired,
  toggleOpt: PropTypes.func.isRequired,
};

export default GuidedAssistantPage;
