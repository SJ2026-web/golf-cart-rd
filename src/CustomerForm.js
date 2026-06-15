import { useState, useRef } from "react";
import emailjs from "@emailjs/browser";

export default function CustomerForm({onSubmit, totalPrice, model, cfg, BATTERIES, MOTORS, SEAT_TYPES, TIRES, STEERING, WINDSHIELDS, OPTIONAL_ITEMS}) {
  const [sent, setSent] = useState(false);
  const deposit = Math.round(totalPrice * 0.40);
  const nomeRef = useRef();
  const cognomeRef = useRef();
  const telefonoRef = useRef();
  const emailRef = useRef();
  const indirizzoRef = useRef();
  const consegnaRef = useRef();
  const noteRef = useRef();
  const inp = {width:"100%",background:"#111",border:"1px solid #333",borderRadius:10,padding:"11px 14px",color:"#F5F0E8",fontSize:14,outline:"none",boxSizing:"border-box",fontFamily:"inherit"};
  const gold = {background:"linear-gradient(135deg,#C9A84C,#E2C07A)",color:"#000",border:"none",padding:"13px 28px",borderRadius:12,fontSize:14,fontWeight:700,cursor:"pointer"};
  const out = {background:"transparent",color:"#C9A84C",border:"1.5px solid #C9A84C",padding:"11px 24px",borderRadius:12,fontSize:13,fontWeight:600,cursor:"pointer"};
  if(sent) return (
    <div style={{textAlign:"center",padding:"60px 20px"}}>
      <div style={{fontSize:56,marginBottom:18}}>SUCCESS</div>
      <h2 style={{color:"#C9A84C",fontSize:24,fontWeight:800,marginBottom:12}}>Richiesta Inviata!</h2>
      <p style={{color:"#888",fontSize:14,maxWidth:440,margin:"0 auto 24px",lineHeight:1.7}}>Il nostro team ti contatterà entro 24 ore.</p>
      <button style={gold} onClick={()=>onSubmit()}>Home</button>
    </div>
  );
  const handleSend = async () => {
    const nome = nomeRef.current?.value || "";
    const cognome = cognomeRef.current?.value || "";
    const telefono = telefonoRef.current?.value || "";
    const email = emailRef.current?.value || "";
    const indirizzo = indirizzoRef.current?.value || "";
    const consegna = consegnaRef.current?.value || "";
    const note = noteRef.current?.value || "";
    if(!nome || !email || !telefono) { alert("Compila Nome, Email e Telefono"); return; }
    const bat = BATTERIES.find(b=>b.id===cfg.battery);
    const mot = MOTORS.find(m=>m.id===cfg.motor);
    const st = SEAT_TYPES.find(s=>s.id===cfg.seatType);
    const ti = TIRES.find(t=>t.id===cfg.tire);
    const sw = STEERING.find(s=>s.id===cfg.steering);
    const ws = WINDSHIELDS.find(w=>w.id===cfg.windshield);
    const opts = cfg.optionals.map(id=>OPTIONAL_ITEMS.find(x=>x.id===id)).filter(Boolean);
    const msg = [
      "NUOVA RICHIESTA PREVENTIVO GOLF CART",
      "=====================================",
      "DATI CLIENTE:",
      "Nome: "+nome+" "+cognome,
      "Telefono: "+telefono,
      "Email: "+email,
      "Indirizzo: "+indirizzo,
      "Luogo consegna: "+consegna,
      "Note: "+note,
      "",
      "CONFIGURAZIONE:",
      "Modello: "+cfg.model,
      "Posti: "+cfg.seats,
      "Colore: "+cfg.bodyColor.code+" "+cfg.bodyColor.it,
      "Batteria: "+(bat?.it||""),
      "Motore: "+(mot?.it||""),
      "Sedile: "+(st?.it||""),
      "Colore sedile: "+cfg.seatColor.it,
      "Pneumatici: "+(ti?.it||""),
      "Volante: "+(sw?.it||""),
      "Parabrezza: "+(ws?.it||""),
      "",
      "OPTIONAL:",
      ...opts.map(o=>"- "+o.it+": "+(o.always?"Incluso":"$"+o.price)),
      "",
      "PREZZI:",
      "Prezzo base: $"+(model?.price?.toLocaleString()||""),
      "Totale: $"+totalPrice.toLocaleString(),
      "Anticipo 40%: $"+deposit.toLocaleString(),
    ].join("\n");
    try {
      await emailjs.send("service_r3isy5l","template_e36a3gp",{
        to_email:"golfcartrd@gmail.com",
        subject:"Preventivo Golf Cart - "+nome+" "+cognome,
        message:msg,
        name:nome+" "+cognome,
        from_name:nome+" "+cognome,
        from_email:email,
        email:email,
        phone:telefono,
      },"G_ndpmoIfpB6oi8pP");
      setSent(true);
    } catch(err) {
      console.error(err);
      alert("Errore: "+err.text);
    }
  };
  return (
    <div>
      <h2 style={{fontSize:"clamp(1.4rem,4vw,2rem)",fontWeight:800,color:"#F5F0E8",marginBottom:4}}>Conferma e Dati</h2>
      <div style={{background:"#161616",border:"1px solid #C9A84C",borderRadius:16,padding:20,marginBottom:20,display:"flex",gap:16,flexWrap:"wrap",justifyContent:"center",textAlign:"center"}}>
        <div style={{flex:1,minWidth:130}}>
          <div style={{color:"#888",fontSize:11,marginBottom:4}}>Totale / Total</div>
          <div style={{color:"#F5F0E8",fontWeight:900,fontSize:26}}>${totalPrice.toLocaleString()}</div>
        </div>
        <div style={{width:1,background:"#222"}}/>
        <div style={{flex:1,minWidth:130}}>
          <div style={{color:"#C9A84C",fontSize:11,fontWeight:700,marginBottom:4}}>Anticipo 40% / Deposit 40%</div>
          <div style={{color:"#E2C07A",fontWeight:900,fontSize:26}}>${deposit.toLocaleString()}</div>
          <div style={{color:"#888",fontSize:10,marginTop:4}}>Saldo alla consegna</div>
        </div>
      </div>
      <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(200px,1fr))",gap:16,marginBottom:20}}>
        <div><div style={{fontSize:11,color:"#888",marginBottom:4}}>Nome *</div><input ref={nomeRef} style={inp} placeholder="Mario"/></div>
        <div><div style={{fontSize:11,color:"#888",marginBottom:4}}>Cognome *</div><input ref={cognomeRef} style={inp} placeholder="Rossi"/></div>
        <div><div style={{fontSize:11,color:"#888",marginBottom:4}}>Telefono *</div><input ref={telefonoRef} style={inp} placeholder="+1 809 000 0000"/></div>
        <div><div style={{fontSize:11,color:"#888",marginBottom:4}}>Email *</div><input ref={emailRef} style={inp} placeholder="email@ejemplo.com"/></div>
        <div><div style={{fontSize:11,color:"#888",marginBottom:4}}>Indirizzo</div><input ref={indirizzoRef} style={inp} placeholder="Bayahibe, Dominicus"/></div>
        <div><div style={{fontSize:11,color:"#888",marginBottom:4}}>Luogo consegna</div><input ref={consegnaRef} style={inp} placeholder="Hotel, Villa..."/></div>
        <div style={{gridColumn:"1 / -1"}}><div style={{fontSize:11,color:"#888",marginBottom:4}}>Note</div><textarea ref={noteRef} style={{...inp,minHeight:80,resize:"vertical"}} placeholder="Note aggiuntive..."/></div>
      </div>
      <div style={{display:"flex",justifyContent:"space-between"}}>
        <button style={out} onClick={()=>onSubmit("back")}>Indietro</button>
        <button style={gold} onClick={handleSend}>Invia / Send</button>
      </div>
    </div>
  );
}