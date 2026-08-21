import PropTypes from "prop-types";

function PrivacyPage({ t, S, C, setPage }) {
  const sections = [
    {
      en: "1. Data Controller",
      es: "1. Responsable del Tratamiento",
      it: "1. Titolare del Trattamento",
      body_en: "TAAAC Solutions is the commercial name used by Samuele Maggio for the activity. Samuele Maggio is the Data Controller responsible for the processing of personal data collected through taaac.solutions and TAAAC Solutions contact forms. Contact: info@taaac.solutions",
      body_es: "TAAAC Solutions es el nombre comercial utilizado por Samuele Maggio para la actividad. Samuele Maggio es el Responsable del Tratamiento de los datos personales recopilados a través de taaac.solutions y de los formularios de contacto de TAAAC Solutions. Contacto: info@taaac.solutions",
      body_it: "TAAAC Solutions è il nome commerciale utilizzato da Samuele Maggio per l'attività. Samuele Maggio è il Titolare del Trattamento dei dati personali raccolti tramite taaac.solutions e i moduli di contatto di TAAAC Solutions. Contatto: info@taaac.solutions",
    },
    {
      en: "2. Data We Collect",
      es: "2. Datos que Recopilamos",
      it: "2. Dati che Raccogliamo",
      body_en: "When you submit a quote request or collaboration request, we collect: first name, last name, phone number, email address, delivery address, and any notes you provide. Data may also be collected through Facebook and Instagram lead forms, and may include your name, email address, phone or WhatsApp number, and any information you voluntarily provide.",
      body_es: "Cuando envía una solicitud de presupuesto o de colaboración, recopilamos: nombre, apellido, número de teléfono, correo electrónico, dirección de entrega y cualquier nota que proporcione. Los datos también pueden recopilarse a través de formularios de clientes potenciales de Facebook e Instagram, y pueden incluir su nombre, correo electrónico, número de teléfono o WhatsApp, y cualquier información que proporcione voluntariamente.",
      body_it: "Quando invii una richiesta di preventivo o di collaborazione, raccogliamo: nome, cognome, numero di telefono, indirizzo email, indirizzo di consegna e qualsiasi nota fornita. I dati possono essere raccolti anche tramite moduli per potenziali clienti di Facebook e Instagram, e possono includere nome, indirizzo email, numero di telefono o WhatsApp, e qualsiasi informazione fornita volontariamente.",
    },
    {
      en: "3. How We Use Your Data",
      es: "3. Cómo Usamos sus Datos",
      it: "3. Come Utilizziamo i Tuoi Dati",
      body_en: "Your data is used to: respond to your request; contact you by email, phone, or WhatsApp when needed; prepare a quote; verify payments; and organize the delivery of your golf cart. We do not sell or rent your personal data. We only share it with third parties when necessary to provide the requested service, process payments or organize delivery, or when required by law.",
      body_es: "Sus datos se utilizan para: responder a su solicitud; contactarlo por correo electrónico, teléfono o WhatsApp cuando sea necesario; preparar un presupuesto; verificar los pagos; y organizar la entrega de su golf cart. No vendemos ni alquilamos sus datos personales. Solo los compartimos con terceros cuando sea necesario para prestar el servicio solicitado, procesar pagos u organizar la entrega, o cuando lo exija la ley.",
      body_it: "I tuoi dati vengono utilizzati per: rispondere alla tua richiesta; contattarti via email, telefono o WhatsApp quando necessario; preparare un preventivo; verificare i pagamenti; e organizzare la consegna del tuo golf cart. Non vendiamo né cediamo in affitto i tuoi dati personali. Li condividiamo con terzi solo quando necessario per fornire il servizio richiesto, gestire i pagamenti o organizzare la consegna, oppure quando richiesto dalla legge.",
    },
    {
      en: "4. Data Retention",
      es: "4. Conservación de Datos",
      it: "4. Conservazione dei Dati",
      body_en: "We retain your data only for as long as necessary to fulfill your request, and for a maximum of 12 months unless you request earlier deletion.",
      body_es: "Conservamos sus datos solo durante el tiempo necesario para atender su solicitud, y por un máximo de 12 meses, salvo que solicite su eliminación antes.",
      body_it: "Conserviamo i tuoi dati solo per il tempo necessario a soddisfare la tua richiesta, e per un massimo di 12 mesi, salvo richiesta di cancellazione anticipata.",
    },
    {
      en: "5. Your Rights",
      es: "5. Sus Derechos",
      it: "5. I Tuoi Diritti",
      body_en: "You have the right to: access your data, request correction or deletion, and withdraw consent at any time. To exercise these rights, contact us at info@taaac.solutions.",
      body_es: "Usted tiene derecho a: acceder a sus datos, solicitar su corrección o eliminación y retirar su consentimiento en cualquier momento. Para ejercer estos derechos, contáctenos en info@taaac.solutions.",
      body_it: "Hai il diritto di: accedere ai tuoi dati, richiederne la correzione o la cancellazione e revocare il consenso in qualsiasi momento. Per esercitare questi diritti, contattaci a info@taaac.solutions.",
    },
    {
      en: "6. Applicable Law",
      es: "6. Ley Aplicable",
      it: "6. Legge Applicabile",
      body_en: "This privacy policy is governed by Law 172-13 on the Protection of Personal Data of the Dominican Republic.",
      body_es: "Esta política de privacidad se rige por la Ley 172-13 sobre Protección de Datos de Carácter Personal de la República Dominicana.",
      body_it: "La presente informativa sulla privacy è disciplinata dalla Legge 172-13 sulla Protezione dei Dati Personali della Repubblica Dominicana.",
    },
    {
      en: "7. Cookies and Google Analytics",
      es: "7. Cookies y Google Analytics",
      it: "7. Cookie e Google Analytics",
      body_en: "With your consent, our website uses Google Analytics to collect anonymous statistics on site usage, such as the pages visited, time spent on the site, and the general geographic location of visitors (country/region). This data is collected exclusively to understand how our website is used and to improve it, and is not sold, rented, or shared with third parties for marketing purposes. You can accept or decline this data collection at any time via the cookie banner shown on the site.",
      body_es: "Con su consentimiento, nuestro sitio web utiliza Google Analytics para recopilar estadísticas anónimas sobre el uso del sitio, como las páginas visitadas, el tiempo de permanencia y la ubicación geográfica general de los visitantes (país/región). Estos datos se recopilan exclusivamente para comprender cómo se utiliza nuestro sitio web y mejorarlo, y no se venden, alquilan ni comparten con terceros con fines de marketing. Puede aceptar o rechazar esta recopilación de datos en cualquier momento a través del banner de cookies que se muestra en el sitio.",
      body_it: "Con il tuo consenso, il nostro sito web utilizza Google Analytics per raccogliere statistiche anonime sull'utilizzo del sito, come le pagine visitate, il tempo trascorso sul sito e la posizione geografica generale dei visitatori (paese/regione). Questi dati vengono raccolti esclusivamente per capire come viene utilizzato il nostro sito e per migliorarlo, e non vengono venduti, affittati o condivisi con terze parti a scopo di marketing. Puoi accettare o rifiutare questa raccolta dati in qualsiasi momento tramite il banner sui cookie mostrato sul sito.",
    },
  ];

  return (
    <div style={S.sec}>
      <div style={{color:C.gold,fontSize:10,letterSpacing:4,fontWeight:700,marginBottom:14,textTransform:"uppercase"}}>{t("Privacy Policy","Política de Privacidad","Informativa Privacy")}</div>
      <h1 style={S.title}>{t("Privacy Policy","Política de Privacidad","Informativa Privacy")}</h1>
      <div style={{color:C.muted,fontSize:13,marginBottom:8}}>{t("Last updated: 2026","Última actualización: 2026","Ultimo aggiornamento: 2026")}</div>
      <div style={S.goldLine}/>
      <div style={{display:"flex",flexDirection:"column",gap:20,marginBottom:32}}>
        {sections.map((s,i)=>(
          <div key={i} style={{background:C.card,border:"1px solid #222",borderRadius:14,padding:20}}>
            <div style={{color:C.gold,fontWeight:700,fontSize:14,marginBottom:8}}>
              {t(s.en, s.es, s.it)}
            </div>
            <div style={{color:C.muted,fontSize:13,lineHeight:1.8}}>
              {t(s.body_en, s.body_es, s.body_it)}
            </div>
          </div>
        ))}
      </div>
      <div style={{textAlign:"center"}}>
        <button style={S.outBtn} onClick={()=>setPage("home")}>← {t("Back to Home","Volver al Inicio","Torna alla Home")}</button>
      </div>
    </div>
  );
}

PrivacyPage.propTypes = {
  t: PropTypes.func.isRequired,
  S: PropTypes.object.isRequired,
  C: PropTypes.object.isRequired,
  setPage: PropTypes.func.isRequired,
};

export default PrivacyPage;
