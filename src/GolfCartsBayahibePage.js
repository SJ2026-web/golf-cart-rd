function GolfCartsBayahibePage({ t, t6, S, C, navigateTo, MODELS, Img }) {
  const faqs = [
    {
      q: t6("Do you deliver golf carts in Bayahibe?","¿Entregan carritos de golf en Bayahibe?","Consegnate golf cart a Bayahibe?","Livrez-vous des voiturettes de golf à Bayahibe ?","Czy dostarczacie wózki golfowe do Bayahibe?","Вы доставляете гольф-кары в Bayahibe?"),
      a: t6("Yes. TAAAC Solutions delivers electric golf carts directly in Bayahibe.","Sí. TAAAC Solutions entrega carritos de golf eléctricos directamente en Bayahibe.","Sì. TAAAC Solutions consegna golf cart elettrici direttamente a Bayahibe.","Oui. TAAAC Solutions livre des voiturettes de golf électriques directement à Bayahibe.","Tak. TAAAC Solutions dostarcza elektryczne wózki golfowe bezpośrednio do Bayahibe.","Да. TAAAC Solutions доставляет электрические гольф-кары прямо в Bayahibe."),
    },
    {
      q: t6("Do you deliver golf carts in Dominicus?","¿Entregan carritos de golf en Dominicus?","Consegnate golf cart a Dominicus?","Livrez-vous des voiturettes de golf à Dominicus ?","Czy dostarczacie wózki golfowe do Dominicus?","Вы доставляете гольф-кары в Dominicus?"),
      a: t6("Yes, TAAAC Solutions also delivers to Dominicus.","Sí, TAAAC Solutions también entrega en Dominicus.","Sì, TAAAC Solutions consegna anche a Dominicus.","Oui, TAAAC Solutions livre également à Dominicus.","Tak, TAAAC Solutions dostarcza również do Dominicus.","Да, TAAAC Solutions также осуществляет доставку в Dominicus."),
    },
    {
      q: t6("Can I customize my golf cart online?","¿Puedo personalizar mi carrito de golf online?","Posso personalizzare il mio golf cart online?","Puis-je personnaliser ma voiturette de golf en ligne ?","Czy mogę spersonalizować swój wózek golfowy online?","Могу ли я настроить свой гольф-кар онлайн?"),
      a: t6("Yes. Our online configurator lets you choose colors, seats, wheels and accessories for your golf cart.","Sí. Nuestro configurador en línea te permite elegir colores, asientos, ruedas y accesorios para tu carrito de golf.","Sì. Il nostro configuratore online ti permette di scegliere colori, sedili, ruote e accessori per il tuo golf cart.","Oui. Notre configurateur en ligne vous permet de choisir les couleurs, les sièges, les roues et les accessoires de votre voiturette.","Tak. Nasz konfigurator online pozwala wybrać kolory, fotele, koła i akcesoria do Twojego wózka golfowego.","Да. Наш онлайн-конфигуратор позволяет выбрать цвета, сиденья, колёса и аксессуары для вашего гольф-кара."),
    },
    {
      q: t6("Which golf cart model is suitable for a villa, resort or family?","¿Qué modelo de carrito de golf es adecuado para una villa, resort o familia?","Quale modello di golf cart è adatto a una villa, un resort o una famiglia?","Quel modèle de voiturette convient à une villa, un resort ou une famille ?","Który model wózka golfowego sprawdzi się przy willi, resorcie lub dla rodziny?","Какая модель гольф-кара подойдёт для виллы, резорта или семьи?"),
      a: t6("It depends on your needs: Model A is classic and elegant, great for golf courses, resorts and hotels; Model D is designed for maximum family comfort. Our guided assistant can help you decide.","Depende de tus necesidades: el Model A es clásico y elegante, ideal para campos de golf, resorts y hoteles; el Model D está pensado para el máximo confort familiar. Nuestro asistente guiado puede ayudarte a decidir.","Dipende dalle tue esigenze: il Model A è classico ed elegante, perfetto per campi da golf, resort e hotel; il Model D è pensato per il massimo comfort in famiglia. Il nostro assistente guidato può aiutarti a scegliere.","Cela dépend de vos besoins : le Model A est classique et élégant, parfait pour les golfs, resorts et hôtels ; le Model D est conçu pour un confort familial maximal. Notre assistant guidé peut vous aider à choisir.","To zależy od Twoich potrzeb: Model A jest klasyczny i elegancki, idealny do pól golfowych, resortów i hoteli; Model D został zaprojektowany z myślą o maksymalnym komforcie rodzinnym. Nasz asystent może pomóc Ci wybrać.","Это зависит от ваших потребностей: модель A — классическая и элегантная, отлично подходит для гольф-полей, резортов и отелей; модель D создана для максимального семейного комфорта. Наш гид-помощник поможет вам определиться."),
    },
    {
      q: t6("Do you deliver outside Bayahibe?","¿Entregan fuera de Bayahibe?","Consegnate anche fuori Bayahibe?","Livrez-vous en dehors de Bayahibe ?","Czy dostarczacie poza Bayahibe?","Осуществляете ли вы доставку за пределы Bayahibe?"),
      a: t6("Yes. Besides Bayahibe and Dominicus, TAAAC Solutions can deliver golf carts across the rest of the Dominican Republic.","Sí. Además de Bayahibe y Dominicus, TAAAC Solutions puede entregar carritos de golf en el resto de República Dominicana.","Sì. Oltre a Bayahibe e Dominicus, TAAAC Solutions può consegnare golf cart nel resto della Repubblica Dominicana.","Oui. En plus de Bayahibe et Dominicus, TAAAC Solutions peut livrer des voiturettes de golf dans le reste de la République Dominicaine.","Tak. Oprócz Bayahibe i Dominicus, TAAAC Solutions może dostarczać wózki golfowe w pozostałej części Dominikany.","Да. Помимо Bayahibe и Dominicus, TAAAC Solutions может доставлять гольф-кары по всей остальной территории Доминиканской Республики."),
    },
  ];

  const linkStyle = {color:C.gold,textDecoration:"underline",cursor:"pointer",fontWeight:600};

  return (
    <div style={{...S.sec, maxWidth:820}}>
      <h1 style={{...S.title,textAlign:"center"}}>
        {t6("Golf Carts in Bayahibe & Dominicus","Carritos de Golf en Bayahibe y Dominicus","Golf Cart a Bayahibe e Dominicus","Voiturettes de Golf à Bayahibe et Dominicus","Wózki Golfowe w Bayahibe i Dominicus","Гольф-кары в Bayahibe и Dominicus")}
      </h1>

      {/* Introduzione locale */}
      <p style={{color:C.muted,fontSize:15,lineHeight:1.8,marginBottom:20,textAlign:"center"}}>
        {t6(
          "TAAAC Solutions offers customizable electric golf carts for customers in Bayahibe and Dominicus, with local support also available for La Romana and Casa de Campo. Choose your model, personalize it online and request assistance directly from our team.",
          "TAAAC Solutions ofrece carritos de golf eléctricos personalizables para clientes en Bayahibe y Dominicus, con asistencia local también disponible para La Romana y Casa de Campo. Elige tu modelo, personalízalo online y solicita asistencia directamente a nuestro equipo.",
          "TAAAC Solutions offre golf cart elettrici personalizzabili per clienti a Bayahibe e Dominicus, con assistenza locale disponibile anche per La Romana e Casa de Campo. Scegli il modello, personalizzalo online e richiedi assistenza direttamente al nostro team.",
          "TAAAC Solutions propose des voiturettes de golf électriques personnalisables aux clients de Bayahibe et Dominicus, avec une assistance locale également disponible pour La Romana et Casa de Campo. Choisissez votre modèle, personnalisez-le en ligne et contactez directement notre équipe.",
          "TAAAC Solutions oferuje personalizowane elektryczne wózki golfowe klientom w Bayahibe i Dominicus, a lokalne wsparcie jest dostępne również dla La Romana i Casa de Campo. Wybierz model, skonfiguruj go online i skontaktuj się bezpośrednio z naszym zespołem.",
          "TAAAC Solutions предлагает персонализируемые электрические гольф-кары клиентам в Bayahibe и Dominicus, а локальная поддержка также доступна для La Romana и Casa de Campo. Выберите модель, настройте её онлайн и свяжитесь напрямую с нашей командой."
        )}
      </p>

      {/* Local areas we serve */}
      <div style={{textAlign:"center",marginBottom:32}}>
        <div style={{color:C.gold,fontSize:10,letterSpacing:1.5,fontWeight:700,textTransform:"uppercase",marginBottom:10}}>
          {t6("Local areas we serve","Zonas locales que atendemos","Zone locali servite","Zones locales desservies","Obsługiwane lokalne obszary","Локальные зоны обслуживания")}
        </div>
        <div style={{display:"flex",flexWrap:"wrap",gap:8,justifyContent:"center"}}>
          {["Bayahibe","Dominicus","La Romana","Casa de Campo"].map(area=>(
            <span key={area} style={{background:"#C9A84C15",border:"1px solid #C9A84C44",color:C.gold,fontSize:12,fontWeight:600,padding:"6px 14px",borderRadius:20}}>{area}</span>
          ))}
        </div>
      </div>

      {/* Why a golf cart in Bayahibe */}
      <h2 style={S.title}>
        {t6("Why a Golf Cart in Bayahibe?","¿Por Qué un Carrito de Golf en Bayahibe?","Perché un Golf Cart a Bayahibe?","Pourquoi une Voiturette de Golf à Bayahibe ?","Dlaczego Wózek Golfowy w Bayahibe?","Почему Гольф-кар в Bayahibe?")}
      </h2>
      <p style={{color:C.muted,fontSize:15,lineHeight:1.8,marginBottom:32}}>
        {t6(
          "In Bayahibe and Dominicus, an electric golf cart is a natural fit for daily life — moving around residences, villas, resorts, hotels and private communities, or getting to the beach and back without the hassle of a car, where its use is permitted.",
          "En Bayahibe y Dominicus, un carrito de golf eléctrico se adapta de forma natural a la vida diaria — para moverte por residencias, villas, resorts, hoteles y comunidades privadas, o para ir y volver de la playa sin la complicación de un coche, donde su uso esté permitido.",
          "A Bayahibe e Dominicus, un golf cart elettrico si adatta naturalmente alla vita quotidiana — per spostarsi tra residenze, ville, resort, hotel e comunità private, o per andare e tornare dalla spiaggia senza la complicazione di un'auto, dove il suo utilizzo è consentito.",
          "À Bayahibe et Dominicus, une voiturette de golf électrique s'intègre naturellement au quotidien — pour se déplacer entre résidences, villas, resorts, hôtels et communautés privées, ou pour aller et venir de la plage sans la contrainte d'une voiture, là où son usage est autorisé.",
          "W Bayahibe i Dominicus elektryczny wózek golfowy naturalnie wpisuje się w codzienne życie — do poruszania się po rezydencjach, willach, resortach, hotelach i osiedlach zamkniętych, a także do dojazdów na plażę i z powrotem bez kłopotu z samochodem, tam gdzie jest to dozwolone.",
          "В Bayahibe и Dominicus электрический гольф-кар органично вписывается в повседневную жизнь — для передвижения между резиденциями, виллами, резортами, отелями и закрытыми посёлками, а также для поездок на пляж и обратно без необходимости в машине, там, где это разрешено."
        )}
      </p>

      {/* Choose Your Golf Cart */}
      <h2 style={S.title}>
        {t6("Choose Your Golf Cart","Elige tu Carrito de Golf","Scegli il tuo Golf Cart","Choisissez votre Voiturette de Golf","Wybierz swój Wózek Golfowy","Выберите свой Гольф-кар")}
      </h2>
      <p style={{color:C.muted,fontSize:14,lineHeight:1.7,marginBottom:16}}>
        {t6(
          "Four models, each with its own character — all fully customizable.",
          "Cuatro modelos, cada uno con su propio carácter — todos totalmente personalizables.",
          "Quattro modelli, ciascuno con il proprio carattere — tutti completamente personalizzabili.",
          "Quatre modèles, chacun avec son propre caractère — tous entièrement personnalisables.",
          "Cztery modele, każdy z własnym charakterem — wszystkie w pełni konfigurowalne.",
          "Четыре модели, у каждой свой характер — и все они полностью настраиваемые."
        )}
      </p>
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

      {/* Customize Every Detail Online */}
      <h2 style={S.title}>
        {t6("Customize Every Detail Online","Personaliza Cada Detalle Online","Personalizza Ogni Dettaglio Online","Personnalisez Chaque Détail en Ligne","Personalizuj Każdy Szczegół Online","Настройте Каждую Деталь Онлайн")}
      </h2>
      <p style={{color:C.muted,fontSize:15,lineHeight:1.8,marginBottom:16}}>
        {t6(
          "One of the things that sets TAAAC Solutions apart is the online configurator: choose your model, then personalize colors, seats, wheels and accessories to make it truly yours — from wherever you are.",
          "Una de las cosas que distingue a TAAAC Solutions es el configurador en línea: elige tu modelo de carrito de golf y luego personaliza colores, asientos, ruedas y accesorios para hacerlo verdaderamente tuyo — desde donde estés.",
          "Una delle cose che distingue TAAAC Solutions è il configuratore online: scegli il modello e poi personalizza colori, sedili, ruote e accessori per renderlo davvero tuo — da qualunque posto tu sia.",
          "Ce qui distingue TAAAC Solutions, c'est son configurateur en ligne : choisissez votre modèle, puis personnalisez les couleurs, les sièges, les roues et les accessoires pour en faire une voiturette vraiment unique — où que vous soyez.",
          "Tym, co wyróżnia TAAAC Solutions, jest konfigurator online: wybierz model, a następnie dostosuj kolory, fotele, koła i akcesoria, aby stał się naprawdę Twój — niezależnie od tego, gdzie jesteś.",
          "Одна из особенностей TAAAC Solutions — онлайн-конфигуратор: выберите модель, а затем настройте цвета, сиденья, колёса и аксессуары, чтобы гольф-кар стал по-настоящему вашим — где бы вы ни находились."
        )}
      </p>
      <p style={{marginBottom:32}}>
        <a href="/configurator" onClick={(e)=>navigateTo("/configurator", e)} style={linkStyle}>
          {t6("Start customizing your golf cart →","Empieza a personalizar tu carrito de golf →","Inizia a personalizzare il tuo golf cart →","Commencez à personnaliser votre voiturette →","Zacznij personalizować swój wózek golfowy →","Начните настройку своего гольф-кара →")}
        </a>
      </p>

      {/* Delivery in Bayahibe and Dominicus */}
      <h2 style={S.title}>
        {t6("Delivery in Bayahibe and Dominicus","Entrega en Bayahibe y Dominicus","Consegna a Bayahibe e Dominicus","Livraison à Bayahibe et Dominicus","Dostawa w Bayahibe i Dominicus","Доставка в Bayahibe и Dominicus")}
      </h2>
      <p style={{color:C.muted,fontSize:15,lineHeight:1.8,marginBottom:12}}>
        {t6(
          "TAAAC Solutions delivers your golf cart directly in Bayahibe and Dominicus, and can also serve customers across the rest of the Dominican Republic.",
          "TAAAC Solutions entrega tu carrito de golf directamente en Bayahibe y Dominicus, y también puede atender a clientes en el resto de República Dominicana.",
          "TAAAC Solutions consegna il tuo golf cart direttamente a Bayahibe e Dominicus, e può servire anche clienti nel resto della Repubblica Dominicana.",
          "TAAAC Solutions livre votre voiturette de golf directement à Bayahibe et Dominicus, et peut également servir des clients dans le reste de la République Dominicaine.",
          "TAAAC Solutions dostarcza Twój wózek golfowy bezpośrednio do Bayahibe i Dominicus, a także może obsługiwać klientów w pozostałej części Dominikany.",
          "TAAAC Solutions доставит ваш гольф-кар прямо в Bayahibe и Dominicus, а также может обслуживать клиентов по всей остальной территории Доминиканской Республики."
        )}
      </p>
      <p style={{marginBottom:32}}>
        <a href="/golf-carts-dominican-republic" onClick={(e)=>navigateTo("/golf-carts-dominican-republic", e)} style={linkStyle}>
          {t6("golf carts across the Dominican Republic →","carritos de golf en República Dominicana →","golf cart in Repubblica Dominicana →","voiturettes de golf en République Dominicaine →","wózki golfowe na Dominikanie →","гольф-кары в Доминиканской Республике →")}
        </a>
      </p>

      {/* Service & Support */}
      <h2 style={S.title}>
        {t6("Service & Support","Servicio y Asistencia","Assistenza e Supporto","Service et Assistance","Serwis i Wsparcie","Сервис и Поддержка")}
      </h2>
      <p style={{color:C.muted,fontSize:15,lineHeight:1.8,marginBottom:16}}>
        {t6(
          "TAAAC Solutions also offers maintenance, service and repairs for your golf cart, with local support in Bayahibe and La Romana.",
          "TAAAC Solutions también ofrece mantenimiento, servicio técnico y reparación para tu carrito de golf, con asistencia local en Bayahibe y La Romana.",
          "TAAAC Solutions offre anche manutenzione, assistenza e riparazione per il tuo golf cart, con supporto locale a Bayahibe e La Romana.",
          "TAAAC Solutions propose également l'entretien, le service et les réparations pour votre voiturette de golf, avec une assistance locale à Bayahibe et La Romana.",
          "TAAAC Solutions oferuje również konserwację, serwis i naprawy Twojego wózka golfowego, z lokalnym wsparciem w Bayahibe i La Romana.",
          "TAAAC Solutions также предлагает техническое обслуживание, сервис и ремонт вашего гольф-кара с локальной поддержкой в Bayahibe и La Romana."
        )}
      </p>
      <p style={{marginBottom:32}}>
        <a href="/service" onClick={(e)=>navigateTo("/service", e)} style={linkStyle}>
          {t6("Learn more about our service & repairs →","Conoce más sobre nuestro servicio y reparaciones →","Scopri di più su assistenza e riparazioni →","En savoir plus sur notre service et nos réparations →","Dowiedz się więcej o naszym serwisie i naprawach →","Узнать больше о нашем сервисе и ремонте →")}
        </a>
      </p>

      {/* FAQ */}
      <h2 style={S.title}>
        {t6("Frequently Asked Questions","Preguntas Frecuentes","Domande Frequenti","Foire Aux Questions","Najczęściej Zadawane Pytania","Часто Задаваемые Вопросы")}
      </h2>
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
          {t6("See all FAQs →","Ver todas las preguntas frecuentes →","Vedi tutte le domande frequenti →","Voir toutes les questions fréquentes →","Zobacz wszystkie najczęściej zadawane pytania →","Смотреть все часто задаваемые вопросы →")}
        </a>
      </p>

      {/* CTA finale */}
      <div style={{textAlign:"center",borderTop:"1px solid #222",paddingTop:32}}>
        <h2 style={{...S.title,fontSize:"clamp(1.4rem,4vw,1.9rem)"}}>
          {t6("Ready to Find Your Golf Cart in Bayahibe?","¿Listo para Encontrar tu Carrito de Golf en Bayahibe?","Pronto a Trovare il Tuo Golf Cart a Bayahibe?","Prêt à Trouver Votre Voiturette de Golf à Bayahibe ?","Gotowy, aby Znaleźć Swój Wózek Golfowy w Bayahibe?","Готовы найти свой гольф-кар в Bayahibe?")}
        </h2>
        <div style={{display:"flex",flexWrap:"wrap",gap:12,justifyContent:"center",marginTop:16}}>
          <a href="/choose-your-golf-cart" onClick={(e)=>navigateTo("/choose-your-golf-cart", e)} style={{...S.goldBtn,textDecoration:"none",display:"inline-block"}}>
            {t6("Get Guided","Déjate Guiar","Fatti Guidare","Se Faire Guider","Skorzystaj z Przewodnika","Пройти Опрос")}
          </a>
          <a href="/configurator" onClick={(e)=>navigateTo("/configurator", e)} style={{...S.outBtn,textDecoration:"none",display:"inline-block"}}>
            {t6("Configure Now","Configurar Ahora","Configura Ora","Configurer Maintenant","Konfiguruj Teraz","Настроить Сейчас")}
          </a>
          <a href="/contact" onClick={(e)=>navigateTo("/contact", e)} style={{...S.outBtn,textDecoration:"none",display:"inline-block"}}>
            {t6("Contact Us","Contáctanos","Contattaci","Nous Contacter","Skontaktuj się","Связаться с Нами")}
          </a>
        </div>
      </div>
    </div>
  );
}

export default GolfCartsBayahibePage;
