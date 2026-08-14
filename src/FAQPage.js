import PropTypes from "prop-types";
import { useState } from "react";

function FAQPage({ t, S, C, setPage }) {
  const [openIdx, setOpenIdx] = useState(null);

  const faqs = [
    {
      q: {en:"What payment methods do you accept?", es:"¿Qué métodos de pago aceptan?", it:"Quali metodi di pagamento accettate?"},
      a: {
        en:"We accept bank transfer, Visa, Mastercard, Revolut, and Wise. Payment can be made in US Dollars. We also accept Euros, Dominican Pesos, or other currencies upon request.",
        es:"Aceptamos transferencia bancaria, Visa, Mastercard, Revolut y Wise. El pago puede realizarse en dólares estadounidenses. También aceptamos euros, pesos dominicanos u otras monedas bajo petición.",
        it:"Accettiamo bonifico bancario, Visa, Mastercard, Revolut e Wise. Il pagamento può essere effettuato in dollari americani. Accettiamo anche euro, pesos dominicani o altre valute su richiesta."
      }
    },
    {
      q: {en:"How long does delivery take?", es:"¿Cuánto tiempo tarda la entrega?", it:"Quanto tempo richiede la consegna?"},
      a: {
        en:"Delivery takes approximately 90 days after the initial 35% payment. This is because each golf cart is custom-built according to your configuration.",
        es:"La entrega tarda aproximadamente 90 días tras el primer pago del 35%. Esto se debe a que cada golf cart se construye según su configuración personalizada.",
        it:"La consegna richiede circa 90 giorni dal primo pagamento del 35%. Questo perché ogni golf cart viene costruito su misura in base alla tua configurazione."
      }
    },
    {
      q: {en:"Do you deliver across the Dominican Republic?", es:"¿Entregan en toda la República Dominicana?", it:"Consegnate in tutta la Repubblica Dominicana?"},
      a: {
        en:"Yes, we deliver across the entire Dominican Republic. However, we reserve the right to adjust the price for deliveries to particularly difficult or remote locations.",
        es:"Sí, entregamos en toda la República Dominicana. Sin embargo, nos reservamos el derecho de ajustar el precio para entregas en lugares especialmente difíciles o remotos.",
        it:"Sì, consegniamo in tutta la Repubblica Dominicana. Ci riserviamo tuttavia il diritto di adeguare il prezzo in caso di consegne in luoghi particolarmente difficili o remoti."
      }
    },
    {
      q: {en:"Can I test a golf cart before buying?", es:"¿Puedo probar un golf cart antes de comprar?", it:"Posso provare un golf cart prima di acquistare?"},
      a: {
        en:"Yes, you can request a test drive on a similar model. However, it is not possible to see the exact golf cart you ordered before delivery, as each configured cart is built to order. The only exception is for pre-configured models available in our showroom.",
        es:"Sí, puede solicitar una prueba de manejo en un modelo similar. Sin embargo, no es posible ver el golf cart exacto que ordenó antes de la entrega, ya que cada carrito configurado se construye bajo pedido. La única excepción son los modelos preconfigurados disponibles en nuestro showroom.",
        it:"Sì, puoi richiedere un giro di prova su un modello simile. Non è però possibile vedere il golf cart esatto ordinato prima della consegna, poiché ogni cart configurato viene costruito su ordinazione. L'unica eccezione è per i modelli già configurati disponibili in vetrina."
      }
    },
    {
      q: {en:"What is the battery range?", es:"¿Cuál es la autonomía de la batería?", it:"Qual è l'autonomia della batteria?"},
      a: {
        en:"The realistic range is approximately 70–80 km per charge. With the 500W solar panel included on every golf cart, in 2 hours of full sun you recover approximately 0.7–0.9 kWh, equivalent to about 7–12 extra km.",
        es:"La autonomía realista es de aproximadamente 70–80 km por carga. Con el panel solar de 500W incluido en cada golf cart, en 2 horas de sol pleno se recuperan aproximadamente 0,7–0,9 kWh, equivalentes a unos 7–12 km adicionales.",
        it:"L'autonomia realistica è di circa 70–80 km per carica. Con il pannello solare da 500W incluso su ogni golf cart, in 2 ore di sole pieno si recuperano circa 0,7–0,9 kWh, equivalenti a circa 7–12 km aggiuntivi."
      }
    },
    {
      q: {en:"Can the solar panel fully charge the battery?", es:"¿El panel solar puede cargar completamente la batería?", it:"Il pannello solare può caricare completamente la batteria?"},
      a: {
        en:"The solar panel alone can fully recharge the battery in approximately 4 days of full sun without using the golf cart. It is designed to extend range and reduce consumption, not as the primary charging source.",
        es:"El panel solar por sí solo puede recargar completamente la batería en aproximadamente 4 días de sol pleno sin usar el golf cart. Está diseñado para extender la autonomía y reducir el consumo, no como fuente principal de carga.",
        it:"Il pannello solare da solo può ricaricare completamente la batteria in circa 4 giorni di sole pieno senza utilizzare il golf cart. È progettato per estendere l'autonomia e ridurre i consumi, non come fonte primaria di ricarica."
      }
    },
    {
      q: {en:"How long does the battery last over time?", es:"¿Cuánto dura la batería con el tiempo?", it:"Quanto dura la batteria nel tempo?"},
      a: {
        en:"A lithium battery of this type lasts approximately 5–8 years, and even longer if you avoid fully discharging it regularly.",
        es:"Una batería de litio de este tipo dura aproximadamente 5–8 años, e incluso más si evita descargarla por completo con regularidad.",
        it:"Una batteria al litio di questo tipo dura circa 5–8 anni, anche di più se si evita di scaricarla completamente in modo regolare."
      }
    },
    {
      q: {en:"What is included in the base price?", es:"¿Qué incluye el precio base?", it:"Cosa è incluso nel prezzo base?"},
      a: {
        en:"The base price includes the golf cart with standard options and the 500W solar panel on the roof. Delivery across the Dominican Republic is also included.",
        es:"El precio base incluye el golf cart con las opciones estándar y el panel solar de 500W en el techo. La entrega en toda la República Dominicana también está incluida.",
        it:"Il prezzo base include il golf cart con le opzioni standard e il pannello solare da 500W sul tetto. È inclusa anche la consegna in tutta la Repubblica Dominicana."
      }
    },
    {
      q: {en:"What is the warranty?", es:"¿Cuál es la garantía?", it:"Qual è la garanzia?"},
      a: {
        en:"The warranty period is 12 months. During this period, if any spare part breaks due to causes not attributable to damage caused by the user, the seller will replace the part free of charge, based on photos of the damaged components provided by the buyer.",
        es:"El período de garantía es de 12 meses. Durante este período, si alguna pieza de repuesto se rompe por causas no imputables a daños provocados por el usuario, el vendedor sustituirá la pieza de forma gratuita, según las fotos de los componentes dañados proporcionadas por el comprador.",
        it:"Il periodo di garanzia è di 12 mesi. Durante questo periodo, se un qualsiasi pezzo di ricambio si rompe per cause non imputabili a danni provocati dall'utente, il venditore sostituirà gratuitamente il pezzo, sulla base delle foto dei componenti danneggiati fornite dall'acquirente."
      }
    },
    {
      q: {en:"Can I request maintenance for my golf cart?", es:"¿Puedo solicitar mantenimiento para mi golf cart?", it:"Posso richiedere manutenzione per il mio golf cart?"},
      a: {
        en:"Yes, you can request maintenance through the website under the 'Service' section. We also offer repair services for golf carts not purchased from us, subject to prior assessment.",
        es:"Sí, puede solicitar mantenimiento a través del sitio web en la sección 'Servicio'. También ofrecemos servicios de reparación para golf carts no adquiridos con nosotros, previa evaluación.",
        it:"Sì, puoi richiedere manutenzione tramite il sito nella sezione 'Assistenza'. Offriamo anche riparazioni per golf cart non acquistati da noi, previa valutazione."
      }
    },
    {
      q: {en:"Can I modify my configuration after ordering?", es:"¿Puedo modificar mi configuración tras el pedido?", it:"Posso modificare la configurazione dopo l'ordine?"},
      a: {
        en:"Yes, modifications can be requested up to 7 days after the initial 35% payment.",
        es:"Sí, se pueden solicitar modificaciones hasta 7 días después del primer pago del 35%.",
        it:"Sì, è possibile richiedere modifiche fino a 7 giorni dopo il primo pagamento del 35%."
      }
    },
    {
      q: {en:"Can I add options after delivery?", es:"¿Puedo añadir opciones después de la entrega?", it:"Posso aggiungere optional dopo la consegna?"},
      a: {
        en:"Yes, you can add options after delivery. These will require a separate payment and a new quote.",
        es:"Sí, puede añadir opciones después de la entrega. Esto requerirá un pago adicional y un nuevo presupuesto.",
        it:"Sì, è possibile aggiungere optional dopo la consegna. Sarà necessario un pagamento separato e un nuovo preventivo."
      }
    },
    {
      q: {en:"Is the quote binding?", es:"¿El presupuesto es vinculante?", it:"Il preventivo è vincolante?"},
      a: {
        en:"No, the quote itself is not binding. After placing your order, you have a 14-day window before the initial 35% payment becomes binding, giving you time to confirm every detail of your custom golf cart.",
        es:"No, el presupuesto en sí no es vinculante. Tras realizar el pedido, dispone de 14 días antes de que el primer pago del 35% se vuelva vinculante, lo que le da tiempo para confirmar cada detalle de su golf cart personalizado.",
        it:"No, il preventivo in sé non è vincolante. Dopo aver effettuato l'ordine, hai 14 giorni prima che il primo pagamento del 35% diventi vincolante, così hai il tempo di confermare ogni dettaglio del tuo golf cart personalizzato."
      }
    },
    {
      q: {en:"What happens if I cancel my order?", es:"¿Qué pasa si cancelo mi pedido?", it:"Cosa succede se annullo il mio ordine?"},
      a: {
        en:"If you cancel within 14 days of placing your order, no fee applies. After that period, once the initial 35% payment is binding, cancelling will retain 50% of that first payment as a cancellation fee.",
        es:"Si cancela dentro de los 14 días posteriores al pedido, no se aplica ningún cargo. Pasado ese período, una vez que el primer pago del 35% es vinculante, la cancelación retendrá el 50% de ese primer pago como penalización.",
        it:"Se annulli entro 14 giorni dall'ordine, non viene applicata alcuna penale. Trascorso questo periodo, una volta che il primo pagamento del 35% è vincolante, l'annullamento comporterà la trattenuta del 50% di quel primo pagamento come penale di cancellazione."
      }
    },
    {
      q: {en:"Is financing available?", es:"¿Hay posibilidad de financiación?", it:"È possibile un finanziamento?"},
      a: {
        en:"Yes, it is possible to finance the purchase through installment payments, to be agreed upon at the time of purchase.",
        es:"Sí, es posible financiar la compra mediante pagos a plazos, a acordar en el momento de la compra.",
        it:"Sì, è possibile finanziare l'acquisto tramite rate di pagamento, da concordare al momento dell'acquisto."
      }
    },
    {
      q: {en:"What is the maximum speed and passenger capacity?", es:"¿Cuál es la velocidad máxima y capacidad de pasajeros?", it:"Qual è la velocità massima e la capacità passeggeri?"},
      a: {
        en:"The maximum speed is 30 km/h. The passenger capacity depends on the number of seats chosen during configuration.",
        es:"La velocidad máxima es de 30 km/h. La capacidad de pasajeros depende del número de asientos elegidos durante la configuración.",
        it:"La velocità massima è di 30 km/h. La capacità passeggeri dipende dal numero di posti scelti durante la configurazione."
      }
    },
    {
      q: {en:"Can I use the golf cart in the rain?", es:"¿Puedo usar el golf cart bajo la lluvia?", it:"Posso usare il golf cart sotto la pioggia?"},
      a: {
        en:"Yes, the golf cart can be used in the rain. For added protection, you can add rain covers from the optional accessories section.",
        es:"Sí, el golf cart se puede usar bajo la lluvia. Para mayor protección, puede añadir cubiertas antiluvia desde la sección de opcionales.",
        it:"Sì, il golf cart può essere utilizzato sotto la pioggia. Per una protezione maggiore, è possibile aggiungere coperture anti-pioggia dalla sezione optional."
      }
    },
    {
      q: {en:"Is the golf cart street legal? Do I need insurance?", es:"¿El golf cart es legal en la vía pública? ¿Necesito seguro?", it:"Il golf cart è omologato per la strada? Serve l'assicurazione?"},
      a: {
        en:"The golf cart is approved for road use. However, Golf Cart DR declines all responsibility for use that does not comply with the laws and regulations of the Dominican Republic. It is the buyer's responsibility to ensure compliance with local regulations regarding insurance, licensing, and road use.",
        es:"El golf cart está homologado para circular por la vía pública. Sin embargo, Golf Cart DR declina toda responsabilidad por un uso que no cumpla con las leyes y reglamentos de la República Dominicana. Es responsabilidad del comprador asegurarse del cumplimiento de la normativa local en materia de seguro, licencias y uso vial.",
        it:"Il golf cart è omologato per la circolazione su strada. Tuttavia, Golf Cart DR declina ogni responsabilità per un utilizzo non conforme alle leggi e ai regolamenti della Repubblica Dominicana. È responsabilità dell'acquirente garantire il rispetto delle normative locali in materia di assicurazione, patente e circolazione."
      }
    },
  ];

  return (
    <div style={S.sec}>
      <div style={{color:C.gold,fontSize:10,letterSpacing:4,fontWeight:700,marginBottom:14,textTransform:"uppercase"}}>FAQ</div>
      <h1 style={S.title}>{t("Frequently Asked Questions","Preguntas Frecuentes","Domande Frequenti")}</h1>
      <div style={{color:C.muted,fontSize:13,marginBottom:24}}>{t("Everything you need to know about Golf Cart DR","Todo lo que necesita saber sobre Golf Cart DR","Tutto quello che devi sapere su Golf Cart DR")}</div>
      <div style={S.goldLine}/>
      <div style={{display:"flex",flexDirection:"column",gap:10,marginBottom:32}}>
        {faqs.map((faq,i)=>(
          <div key={i} style={{background:C.card,border:"1px solid "+(openIdx===i?"#C9A84C":"#222"),borderRadius:14,overflow:"hidden",transition:"border .2s"}}>
            <div style={{padding:"16px 20px",cursor:"pointer",display:"flex",justifyContent:"space-between",alignItems:"center"}} onClick={()=>setOpenIdx(openIdx===i?null:i)}>
              <div style={{color:openIdx===i?C.gold:C.white,fontWeight:600,fontSize:14,flex:1,paddingRight:12}}>{t(faq.q.en, faq.q.es, faq.q.it)}</div>
              <div style={{color:C.gold,fontSize:20,fontWeight:700,flexShrink:0}}>{openIdx===i?"−":"+"}</div>
            </div>
            {openIdx===i&&(
              <div style={{padding:"0 20px 16px",color:C.muted,fontSize:13,lineHeight:1.8,borderTop:"1px solid #222"}}>
                <div style={{paddingTop:12}}>{t(faq.a.en, faq.a.es, faq.a.it)}</div>
              </div>
            )}
          </div>
        ))}
      </div>
      <div style={{background:"#C9A84C11",border:"1px solid #7a6230",borderRadius:14,padding:18,marginBottom:24}}>
        <div style={{color:C.gold,fontWeight:700,fontSize:13,marginBottom:6}}>⚖️ {t("Legal Disclaimer","Aviso Legal","Disclaimer Legale")}</div>
        <div style={{color:C.muted,fontSize:13,lineHeight:1.8}}>
          {t(
            "Golf Cart DR declines all responsibility for use of the vehicle that does not comply with the laws, regulations, and requirements in force in the Dominican Republic or in any other country where the vehicle is used. It is the sole responsibility of the buyer to obtain any required insurance, licenses, or permits.",
            "Golf Cart DR declina toda responsabilidad por el uso del vehículo que no cumpla con las leyes, reglamentos y requisitos vigentes en la República Dominicana o en cualquier otro país donde se utilice el vehículo. Es responsabilidad exclusiva del comprador obtener cualquier seguro, licencia o permiso requerido.",
            "Golf Cart DR declina ogni responsabilità per l'utilizzo del veicolo non conforme alle leggi, ai regolamenti e ai requisiti vigenti nella Repubblica Dominicana o in qualsiasi altro paese in cui il veicolo viene utilizzato. È responsabilità esclusiva dell'acquirente ottenere qualsiasi assicurazione, licenza o permesso richiesto."
          )}
        </div>
      </div>
      <div style={{textAlign:"center",display:"flex",gap:12,justifyContent:"center",flexWrap:"wrap"}}>
        <button style={S.outBtn} onClick={()=>setPage("home")}>← {t("Back","Atrás","Indietro")}</button>
        <button style={S.goldBtn} onClick={()=>setPage("contact")}>📞 {t("Still have questions? Contact us","¿Tienes más preguntas? Contáctanos","Hai altre domande? Contattaci")}</button>
      </div>
    </div>
  );
}

FAQPage.propTypes = {
  t: PropTypes.func.isRequired,
  S: PropTypes.object.isRequired,
  C: PropTypes.object.isRequired,
  setPage: PropTypes.func.isRequired,
};

export default FAQPage;
