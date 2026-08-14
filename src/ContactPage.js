function ContactPage({ t, S, C, setPage, prevPage }) {
  return (
    <div style={S.sec}>
      <div style={{color:C.gold,fontSize:10,letterSpacing:4,fontWeight:700,marginBottom:14,textTransform:"uppercase"}}>{t("Contact","Contacto","Contatti")}</div>
      <h1 style={S.title}>{t("Contact Us","Contáctanos","Contattaci")}</h1>
      <div style={S.goldLine}/>
      <div style={S.grid2}>
        {[
          {icon:<svg viewBox="0 0 32 32" width="28" height="28" fill="#25D366"><path d="M16.001 3C9.373 3 4 8.373 4 15c0 2.625.86 5.055 2.312 7.031L4 29l7.157-2.281A11.94 11.94 0 0 0 16.001 27C22.628 27 28 21.627 28 15S22.628 3 16.001 3zm0 2c5.523 0 10 4.477 10 10s-4.477 10-10 10a9.96 9.96 0 0 1-5.086-1.398l-.365-.217-3.789 1.207 1.229-3.693-.239-.38A9.96 9.96 0 0 1 6 15c0-5.523 4.478-10 10.001-10zm-3.61 5.06c-.198 0-.52.074-.792.372-.271.297-1.04 1.016-1.04 2.479 0 1.463 1.065 2.876 1.213 3.075.148.198 2.057 3.278 5.076 4.462 2.516.988 3.028.792 3.575.743.546-.05 1.762-.72 2.01-1.414.247-.694.247-1.29.173-1.414-.074-.124-.271-.198-.568-.347-.297-.148-1.762-.87-2.036-.968-.273-.099-.472-.148-.67.148-.198.297-.767.968-.94 1.166-.173.198-.347.223-.644.074-.297-.148-1.253-.462-2.387-1.472-.883-.788-1.48-1.762-1.653-2.06-.173-.297-.019-.457.13-.605.134-.133.297-.347.446-.52.148-.174.198-.298.297-.496.099-.198.05-.372-.025-.52-.074-.148-.67-1.613-.918-2.208-.242-.583-.487-.504-.67-.513-.173-.008-.371-.01-.57-.01z"/></svg>,label:"WhatsApp",link:"https://wa.me/41764372290",s:()=>t("Quick reply","Respuesta rápida","Risposta rapida")},
          {icon:"📧",label:"Email",link:"mailto:info@taaac.solutions",v:"info@taaac.solutions",s:()=>t("Reply in 24h","Respuesta en 24h","Risposta in 24h")},
          {icon:"📍",label:t("Location","Ubicación","Sede"),v:"Bayahibe, Dominicus",s:()=>"República Dominicana"},
        ].map((c,i)=>(
          <div key={i} onClick={()=>c.link&&window.open(c.link,"_blank")} style={{background:C.card,border:"1px solid #222",borderRadius:16,padding:22,cursor:c.link?"pointer":"default"}}>
            <div style={{fontSize:28,marginBottom:10}}>{c.icon}</div>
            <div style={{color:C.gold,fontWeight:700,marginBottom:2,fontSize:14}}>{c.label}</div>
            {c.v && <div style={{color:C.white,fontWeight:600,fontSize:15,marginBottom:4}}>{c.v}</div>}
            <div style={{color:C.muted,fontSize:12}}>{c.s()}</div>
            {c.link && <div style={{color:C.gold,fontSize:11,marginTop:6,fontWeight:600}}>→ {t("Click to open","Clic para abrir","Clicca per aprire")}</div>}
          </div>
        ))}
      </div>

      <div style={{marginTop:24,textAlign:"center"}}>
        <button style={S.outBtn} onClick={()=>setPage(prevPage)}>← {t("Back","Atrás","Indietro")}</button>
      </div>
    </div>
  );
}

export default ContactPage;
