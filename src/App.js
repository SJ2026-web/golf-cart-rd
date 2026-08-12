import { useState, useRef, useCallback, useEffect, lazy, Suspense } from "react";

const PrivacyPage = lazy(() => import("./PrivacyPage"));
const FAQPage = lazy(() => import("./FAQPage"));
const ContactPage = lazy(() => import("./ContactPage"));
const AboutPage = lazy(() => import("./AboutPage"));
const GuideChooseGolfCartPage = lazy(() => import("./GuideChooseGolfCartPage"));
const GuideLithiumVsLeadPage = lazy(() => import("./GuideLithiumVsLeadPage"));
const Guide48vVs72vPage = lazy(() => import("./Guide48vVs72vPage"));
const GuideSeatsPage = lazy(() => import("./GuideSeatsPage"));
const GuideBeforeBuyingPage = lazy(() => import("./GuideBeforeBuyingPage"));
const GuideSeaMaintenancePage = lazy(() => import("./GuideSeaMaintenancePage"));
const GolfCartsDRPage = lazy(() => import("./GolfCartsDRPage"));
const GolfCartsBayahibePage = lazy(() => import("./GolfCartsBayahibePage"));
const GuidedAssistantPage = lazy(() => import("./GuidedAssistantPage"));
const ConfiguratorPage = lazy(() => import("./ConfiguratorPage"));


const IMGS = {"modA": "/images/foto-modello-a1.jpg", "modB": "/images/foto-modello-b1.jpg", "homeImg": "/images/foto-home-page.png", "modC": "/images/foto-modello-c1.jpg", "modD": "/images/foto-modello-d1.jpg", "mod2p": "/images/foto-2-posti.jpg", "mod2p2": "/images/foto-2-2-posti.jpg", "mod4p2": "/images/foto-4-2-posti.jpg", "solar": "/images/Pannello%20Fotovoltaico.jpg", "opt_rain": "/images/Copertura%20Anti-Pioggia.jpg", "opt_cover": "/images/Cover%20di%20Protezione.jpg", "opt_sun": "/images/Tende%20Parasole.jpg", "opt_mirror": "/images/Specchietti%20con%20LED.jpg", "opt_spots": "/images/Faretti%20LED%20sul%20Tetto.jpg", "opt_led": "/images/Strisicia%20LED%20Sottotetto.jpg", "opt_emerg": "/images/Kit%20Luci%20Emergenza.jpg", "opt_disp": "/images/Display%20Touch%20Screen.jpg", "opt_stereo": "/images/Stereo%20Bluetooth.jpg", "opt_table": "/images/Tavolino%20Posteriore.jpg", "opt_frtlt": "/images/Faro%20LED%20Frontale.jpg", "opt_rearlt": "/images/Luci%20Targa%20%2B%20Stop%20LED.jpg", "opt_rseat": "/images/Sedile%20con%20Cintura.jpg", "opt_rplat": "/images/Pianale%20Ribaltabile.jpg", "opt_storecov": "/images/Vano%20Bagagli.jpg", "opt_ball": "/images/Porta%20Palline%20Golf.jpg", "opt_fbask": "/images/Cestello%20Frontale.jpg", "opt_trunk": "/images/Baule%20Posteriore.jpg", "opt_wiper": "/images/Tergicristallo.jpg", "opt_steps": "/images/Pedana%20in%20Alluminio.jpg", "opt_tow": "/images/Gancio%20Traino.jpg", "opt_water": "/images/Porta%20Bottiglie.jpg", "opt_pedals": "/images/Pedane%20Posteriori.jpg", "opt_cargo": "/images/Cassone%20da%20lavoro.jpg", "opt_ropen": "/images/Pianale%20con%20Corrimano.jpg", "opt_bull": "/images/Bull%20Bar%20Frontale.jpg", "opt_speak": "/images/Speaker%20Marino%20LED.jpg", "opt_cdash": "/images/Pannello%20Carbon%20Fiber.jpg", "opt_vdisp": "/images/Display%20Touch%20Verticale.jpg", "seat_std": "/images/Sedile%20Standard.jpg", "seat_sport": "/images/Sedile%20Sport.jpg", "seat_prem": "/images/Sedile%20Premium%20Imbottito.jpg", "seat_head": "/images/Premium%20con%20Poggiatesta.jpg", "tire_g10": "/images/PneumaticiDaErba10pollici.jpeg", "tire_g12": "/images/Da%20Erba%2012%27%27.jpg", "tire_g14": "/images/Da%20Erba%2014%27%27.jpg", "tire_or12": "/images/Off-Road%2012%27%27.jpg", "tire_or14": "/images/Off-Road%2014%27%27.jpg", "steer_std": "/images/Volante%20Standard.jpg", "steer_sp": "/images/Volante%20Sportivo.jpg", "steer_cf": "/images/Volante%20Carbon%20Fiber.jpg", "wind_std": "/images/Parabrezza%20Standard.jpg", "wind_ft": "/images/Pieghevole%20Trasparente.jpg", "wind_fb": "/images/Pieghevole%20Marrone.jpg", "wind_tmp": "/images/Parabrezza%20Temprato.jpg", "seat4p": "/images/foto-4-posti.jpg", };

const C = {
  bg:"#0a0a0a",surface:"#111111",card:"#161616",border:"#222222",
  gold:"#C9A84C",goldLight:"#E2C07A",goldDim:"#7a6230",
  green:"#3a7d44",white:"#F5F0E8",muted:"#a8a8a8",red:"#E53935",
};

// ── TRILINGUAL LABEL COMPONENT ────────────────────────────────
function T({it, es, en, style={}, size=14, mutedSize=11}) {
  return (
    <div style={style}>
      <span style={{fontSize:size, fontWeight:700, color:"inherit"}}>{it}</span>
      <span style={{fontSize:mutedSize, color:"#aaa", marginLeft:6}}>/ {es}</span>
      <span style={{fontSize:mutedSize, color:"#888", marginLeft:4}}>/ {en}</span>
    </div>
  );
}

function TDesc({it, es, en}) {
  return (
    <div>
      <div style={{fontSize:12, color:"#aaa", lineHeight:1.5}}>{it}</div>
      <div style={{fontSize:11, color:"#777", lineHeight:1.5}}>{es} / {en}</div>
    </div>
  );
}

// ── RUSSIAN TRANSLATION DICTIONARY (keyed by the English source string) ────
const RU_DICT = {
  "Add more options":"Добавить ещё опции",
  "Address":"Адрес",
  "Advice":"Советы",
  "All rights reserved":"Все права защищены",
  "Always Included":"Всегда включено",
  "Back":"Назад",
  "Back to Home":"Вернуться на главную",
  "Balance on delivery":"Остаток при доставке",
  "Battery":"Аккумулятор",
  "Body Color":"Цвет кузова",
  "Book":"Забронировать",
  "Book a Service":"Записаться на обслуживание",
  "Booking Sent!":"Заявка отправлена!",
  "Browse models":"Смотреть модели",
  "Browse ready-to-buy golf carts already set up and available now.":"Просмотрите уже готовые к покупке гольф-кары, доступные прямо сейчас.",
  "Choose the Model":"Выберите модель",
  "Choose your Golf Cart":"Выберите свой гольф-кар",
  "Choose your battery":"Выберите аккумулятор",
  "Choose your motor":"Выберите двигатель",
  "Choose your seat type":"Выберите тип сидений",
  "Choose your steering wheel":"Выберите руль",
  "Choose your style":"Выберите стиль",
  "Choose your windshield":"Выберите лобовое стекло",
  "Click to open":"Нажмите, чтобы открыть",
  "Close":"Закрыть",
  "Coming soon":"Скоро появится",
  "Configure your own":"Настроить свой",
  "Confirm & Details":"Подтверждение и данные",
  "Contact":"Контакты",
  "Contact Us":"Связаться с нами",
  "Continue":"Продолжить",
  "Customize your golf cart with accessories":"Настройте свой гольф-кар с помощью аксессуаров",
  "Default":"По умолчанию",
  "Delivery across Dominican Republic":"Доставка по всей Доминиканской Республике",
  "Delivery location":"Место доставки",
  "Deposit 40%":"Депозит 40%",
  "Describe what you need...":"Опишите, что вам нужно...",
  "Edit":"Изменить",
  "Estimated Delivery":"Ориентировочный срок доставки",
  "Everything you need to know about Golf Cart DR":"Всё, что нужно знать о Golf Cart DR",
  "Fill in your details to receive the official quote":"Заполните свои данные, чтобы получить официальное предложение",
  "For Sale":"В продаже",
  "Frequently Asked Questions":"Часто задаваемые вопросы",
  "Golf Cart DR declines all responsibility for use of the vehicle that does not comply with the laws, regulations, and requirements in force in the Dominican Republic or in any other country where the vehicle is used. It is the sole responsibility of the buyer to obtain any required insurance, licenses, or permits.":"Golf Cart DR снимает с себя всякую ответственность за использование транспортного средства, не соответствующее законам, нормам и требованиям, действующим в Доминиканской Республике или в любой другой стране использования транспортного средства. Покупатель несёт единоличную ответственность за получение необходимых страховок, лицензий или разрешений.",
  "Golf Cart for every need":"Гольф-кар на любые нужды",
  "Grass tires":"Шины для травы",
  "How would you like to proceed?":"Как вы хотите продолжить?",
  "Included":"Включено",
  "Join Our Team":"Присоединяйтесь к нашей команде",
  "Last updated: 2025":"Последнее обновление: 2025",
  "Legal Disclaimer":"Юридический отказ от ответственности",
  "Location":"Местоположение",
  "Model":"Модель",
  "Motor":"Двигатель",
  "Name *":"Имя *",
  "Next":"Далее",
  "Not available Model A":"Модель A недоступна",
  "Notes":"Примечания",
  "Number of Seats":"Количество мест",
  "On Request":"По запросу",
  "Options":"Опции",
  "Options & Accessories":"Опции и аксессуары",
  "Other":"Другое",
  "Other battery options":"Другие варианты аккумуляторов",
  "Other inches":"Другой размер (дюймы)",
  "Other motor options":"Другие варианты двигателя",
  "Other seat options":"Другие варианты сидений",
  "Other steering options":"Другие варианты руля",
  "Other windshield options":"Другие варианты лобового стекла",
  "Our categories":"Наши категории",
  "Our team will contact you within 24 hours.":"Наша команда свяжется с вами в течение 24 часов.",
  "Our team will contact you within 24 hours to schedule your interview.":"Наша команда свяжется с вами в течение 24 часов, чтобы назначить собеседование.",
  "Partner with us":"Станьте нашим партнёром",
  "Phone *":"Телефон *",
  "Please enter a valid email":"Пожалуйста, введите действительный email",
  "Please fill Name, Email and Phone":"Пожалуйста, заполните имя, email и телефон",
  "Please select at least one service":"Пожалуйста, выберите хотя бы одну услугу",
  "Pre-configured models":"Готовые конфигурации",
  "Premium Golf Cart":"Премиальный гольф-кар",
  "Privacy Policy":"Политика конфиденциальности",
  "Quick reply":"Быстрый ответ",
  "Read our advice":"Прочитать наши советы",
  "Ready to Buy":"Готовы к покупке",
  "Recommended":"Рекомендуется",
  "Repair Service":"Ремонтные услуги",
  "Repairs":"Ремонт",
  "Reply in 24h":"Ответ в течение 24 часов",
  "Request":"Запрос",
  "Request Sent!":"Запрос отправлен!",
  "Request a free interview":"Запросить бесплатное собеседование",
  "Review your configuration":"Проверьте свою конфигурацию",
  "Scheduled Maintenance":"Плановое обслуживание",
  "Seat":"Сиденье",
  "Seat Color":"Цвет сидений",
  "Select one or more services":"Выберите одну или несколько услуг",
  "Select the options you want to add":"Выберите опции, которые хотите добавить",
  "Selected":"Выбрано",
  "Send":"Отправить",
  "Service":"Сервис",
  "Standard only":"Только стандартный",
  "Start configuring":"Начать настройку",
  "Starting from":"Начиная от",
  "Steering Wheel":"Руль",
  "Step":"Шаг",
  "Still have questions? Contact us":"Остались вопросы? Свяжитесь с нами",
  "Summary":"Сводка",
  "Surname":"Фамилия",
  "Surname *":"Фамилия *",
  "The official quote will be calculated by our team, including any discounts.":"Официальное предложение будет рассчитано нашей командой с учётом всех скидок.",
  "Tires & Wheels":"Шины и диски",
  "Total":"Итого",
  "Trusted by Our Customers":"Нам доверяют клиенты",
  "Want to grow with us?":"Хотите расти вместе с нами?",
  "We are Golf Cart DR, a premium golf cart sales company based in Bayahibe and Dominicus, Dominican Republic. We are looking for motivated partners and collaborators across the entire country to help us grow and bring premium golf carts to more communities, resorts, and residences.":"Мы — Golf Cart DR, компания премиум-класса по продаже гольф-каров, базирующаяся в Байяибе и Доминикусе, Доминиканская Республика. Мы ищем мотивированных партнёров и сотрудников по всей стране, которые помогут нам расти и привозить премиальные гольф-кары в новые районы, курорты и жилые комплексы.",
  "We recommend a lithium battery because it lasts much longer, with over 3,000 charge cycles. It also charges faster, requires less maintenance, and lithium loses very little charge if the golf car sits idle for weeks. Ideal where heat and humidity are high.":"Мы рекомендуем литиевый аккумулятор, так как он служит намного дольше — более 3000 циклов зарядки. Он также заряжается быстрее, требует меньше обслуживания и почти не теряет заряд, если гольф-кар простаивает несколько недель. Идеален в условиях высокой жары и влажности.",
  "We'll get back to you to schedule your free interview":"Мы свяжемся с вами, чтобы назначить бесплатное собеседование",
  "We're preparing a selection of ready-to-buy golf carts. Check back soon, or configure your own right now.":"Мы готовим подборку гольф-каров, готовых к покупке. Загляните позже или настройте свой прямо сейчас.",
  "What they say about us":"Что говорят о нас наши клиенты",
  "Windshield":"Лобовое стекло",
  "Your Details":"Ваши данные",
  "days from deposit confirmation":"дней с момента подтверждения депозита",
  "from":"от",
  "of":"из",
  "seats":"мест",
  "Error sending. Please try WhatsApp.":"Ошибка отправки. Пожалуйста, попробуйте WhatsApp.",
  "Error sending request. Please try WhatsApp.":"Ошибка отправки запроса. Пожалуйста, попробуйте WhatsApp.",
  "Error sending request. Please try again.":"Ошибка отправки запроса. Пожалуйста, попробуйте снова.",
  "+2 models only":"Только для моделей +2",
  "1. Data Controller":"1. Ответственный за обработку данных",
  "Golf Cart DR, based in Bayahibe, Dominicus, República Dominicana. Contact: info@taaac.solutions":"Golf Cart DR находится в Байяибе, Доминикус, Доминиканская Республика. Контакт: info@taaac.solutions",
  "2. Data We Collect":"2. Какие данные мы собираем",
  "When you submit a quote request or collaboration request, we collect: first name, last name, phone number, email address, delivery address, and any notes you provide.":"Когда вы отправляете запрос на предложение цены или на сотрудничество, мы собираем: имя, фамилию, номер телефона, адрес электронной почты, адрес доставки и любые указанные вами примечания.",
  "3. How We Use Your Data":"3. Как мы используем ваши данные",
  "Your data is used exclusively to respond to your request, provide a quote, or schedule a meeting. We do not sell, rent, or share your data with third parties.":"Ваши данные используются исключительно для ответа на ваш запрос, предоставления коммерческого предложения или назначения встречи. Мы не продаём, не сдаём в аренду и не передаём ваши данные третьим лицам.",
  "4. Data Retention":"4. Хранение данных",
  "We retain your data only for as long as necessary to fulfill your request, and for a maximum of 12 months unless you request earlier deletion.":"Мы храним ваши данные только столько, сколько необходимо для выполнения вашего запроса, но не более 12 месяцев, если вы не запросите более раннее удаление.",
  "5. Your Rights":"5. Ваши права",
  "You have the right to: access your data, request correction or deletion, and withdraw consent at any time. To exercise these rights, contact us at info@taaac.solutions.":"Вы имеете право: получить доступ к своим данным, запросить их исправление или удаление, а также отозвать согласие в любое время. Чтобы воспользоваться этими правами, свяжитесь с нами по адресу info@taaac.solutions.",
  "6. Applicable Law":"6. Применимое законодательство",
  "This privacy policy is governed by Law 172-13 on the Protection of Personal Data of the Dominican Republic.":"Настоящая политика конфиденциальности регулируется Законом 172-13 о защите персональных данных Доминиканской Республики.",

  // Model descriptions
  "Classic and elegant. Perfect for golf courses, resorts and hotels.":"Классический и элегантный. Идеален для полей для гольфа, курортов и отелей.",
  "Powerful off-road. Conquers any terrain.":"Мощный внедорожный. Покоряет любую местность.",
  "Sporty and refined. Leather seats and premium wheels.":"Спортивный и утончённый. Кожаные сиденья и премиальные диски.",
  "Maximum family comfort. Extra space with golf bag holder.":"Максимальный комфорт для семьи. Дополнительное пространство с держателем для сумки для гольфа.",

  // Seats options
  "2 Seats":"2 места",
  "Compact and agile":"Компактный и манёвренный",
  "2+2 Seats":"2+2 места",
  "With rear seat":"С задним сиденьем",
  "4 Seats":"4 места",
  "Ideal for families":"Идеально для семей",
  "4+2 Seats":"4+2 места",
  "Extra rear space":"Дополнительное место сзади",
  "Other Seats":"Другое количество мест",
  "On request":"По запросу",

  // Seat types
  "Standard Seat":"Стандартное сиденье",
  "Ergonomic and comfortable. Default.":"Эргономичное и удобное. По умолчанию.",
  "Sport Seat":"Спортивное сиденье",
  "Black leather with red stitching.":"Чёрная кожа с красной прострочкой.",
  "Premium Padded Seat":"Премиальное мягкое сиденье",
  "Thickened with integrated seatbelt.":"Утолщённое, со встроенным ремнём безопасности.",
  "Premium with Headrest":"Премиум с подголовником",
  "Maximum comfort with headrests.":"Максимальный комфорт с подголовниками.",

  // Steering wheels
  "Standard Steering Wheel":"Стандартный руль",
  "Classic black, included in all models":"Классический чёрный, включён во все модели",
  "Sport Steering Wheel":"Спортивный руль",
  "Carbon fiber with display and red details":"Карбон с дисплеем и красными деталями",
  "Carbon Fiber Wheel":"Карбоновый руль",
  "Black leather with carbon fiber spokes":"Чёрная кожа со спицами из карбона",

  // Tires
  "Grass 10\"":"Для травы 10\"",
  "Standard for golf courses":"Стандарт для полей для гольфа",
  "Grass 12\"":"Для травы 12\"",
  "Greater stability":"Повышенная устойчивость",
  "Grass 14\"":"Для травы 14\"",
  "Maximum contact surface":"Максимальная площадь контакта",
  "Off-Road 12\"":"Внедорожные 12\"",
  "Knobby tire":"Шина с грунтозацепами",
  "Off-Road 14\"":"Внедорожные 14\"",
  "Premium aggressive knobby":"Премиальный агрессивный протектор",

  // Windshields
  "Standard Windshield":"Стандартное лобовое стекло",
  "Fixed transparent, classic":"Фиксированное прозрачное, классическое",
  "Folding Transparent":"Складное прозрачное",
  "Foldable transparent":"Складное прозрачное стекло",
  "Folding Brown":"Складное коричневое",
  "Smoked/bronze foldable":"Дымчатое/бронзовое складное",
  "Tempered Windshield":"Закалённое лобовое стекло",
  "Tempered glass, maximum resistance":"Закалённое стекло, максимальная прочность",

  // Batteries
  "48V 150A — Lead-acid battery":"48В 150А — свинцово-кислотный аккумулятор",
  "48V 150A — Lithium battery":"48В 150А — литиевый аккумулятор",
  "60V 100A / 72V 100A — Lead-acid":"60В 100А / 72В 100А — свинцово-кислотный",
  "60V 150A — Lithium battery":"60В 150А — литиевый аккумулятор",

  // Motors
  "Efficient and silent":"Эффективный и тихий",
  "Perfect balance":"Идеальный баланс",
  "Maximum power":"Максимальная мощность",

  // Optional items
  "500W Solar Panel":"Солнечная панель 500Вт",
  "Integrated solar charging. Always included.":"Встроенная солнечная зарядка. Включена всегда.",
  "Rain Cover":"Защита от дождя",
  "Full protection from rain and wind.":"Полная защита от дождя и ветра.",
  "Protective Cover":"Защитный чехол",
  "Full protective cover for parking.":"Полный защитный чехол для стоянки.",
  "Sun Shade Curtains":"Шторки от солнца",
  "Roll-up curtains against tropical sun.":"Рулонные шторки от тропического солнца.",
  "LED Mirrors":"Зеркала со светодиодами",
  "Mirrors with integrated LED indicators.":"Зеркала со встроенными светодиодными указателями поворота.",
  "Roof LED Spotlights":"Светодиодные фары на крыше",
  "4 high-brightness lights for nighttime.":"4 ярких фонаря для ночного времени.",
  "Under-Roof LED Strip":"Светодиодная лента под крышей",
  "Ambient LED blue lighting.":"Атмосферная синяя светодиодная подсветка.",
  "Emergency Light Kit":"Комплект аварийных огней",
  "Flashers + professional siren.":"Проблесковые маячки + профессиональная сирена.",
  "Touch Screen Display":"Сенсорный дисплей",
  "Digital screen with vehicle data.":"Цифровой экран с данными автомобиля.",
  "Bluetooth Stereo":"Bluetooth-стереосистема",
  "4-speaker audio system with LED.":"Аудиосистема с 4 динамиками и подсветкой.",
  "Rear Folding Table":"Складной задний столик",
  "Rear foldable table.":"Складной столик сзади.",
  "Front LED Light":"Передняя светодиодная фара",
  "Additional front LED bar.":"Дополнительная передняя светодиодная балка.",
  "License + LED Stop Lights":"Подсветка номера + светодиодные стоп-сигналы",
  "Rear LED lights kit.":"Комплект задних светодиодных фонарей.",
  "Seat with Seatbelt":"Сиденье с ремнём безопасности",
  "Rear seat with certified seatbelt.":"Заднее сиденье с сертифицированным ремнём безопасности.",
  "Folding Platform":"Откидная платформа",
  "+2 models only. Folding platform.":"Только для моделей +2. Откидная платформа.",
  "Luggage Compartment":"Багажное отделение",
  "Rear compartment with cover.":"Заднее отделение с крышкой.",
  "Golf Ball Holder":"Держатель для мячей для гольфа",
  "Specific container for golf balls.":"Специальный контейнер для мячей для гольфа.",
  "Front Basket":"Передняя корзина",
  "Net basket on front hood.":"Сетчатая корзина на переднем капоте.",
  "Rear Trunk":"Задний багажник",
  "Locked rear storage box.":"Запираемый задний багажный ящик.",
  "Windshield Wiper":"Стеклоочиститель",
  "Wiper for tempered windshield.":"Дворник для закалённого лобового стекла.",
  "Aluminum Steps":"Алюминиевые подножки",
  "Anti-slip side running boards.":"Противоскользящие боковые подножки.",
  "Tow Hook":"Буксировочный крюк",
  "Chrome rear ball hitch.":"Хромированное заднее буксировочное устройство.",
  "Bottle Holder":"Держатель для бутылок",
  "Integrated bottle dispenser.":"Встроенный держатель для бутылок.",
  "Rear Steps":"Задние подножки",
  "Rear anti-slip steps.":"Задние противоскользящие подножки.",
  "Cargo Bed":"Грузовая платформа",
  "Rear platform with high sides.":"Задняя платформа с высокими бортами.",
  "Platform with Railing":"Платформа с поручнем",
  "Load platform with tubular railing.":"Грузовая платформа с трубчатым поручнем.",
  "Front Bull Bar":"Передняя защитная дуга",
  "Reinforced front tubular bumper.":"Усиленный передний трубчатый бампер.",
  "Marine LED Speaker":"Морская колонка со светодиодами",
  "Waterproof speaker with blue LED.":"Водонепроницаемая колонка с синей подсветкой.",
  "Carbon Fiber Panel":"Панель из карбона",
  "Carbon fiber dashboard with Start/Stop.":"Карбоновая приборная панель с функцией Start/Stop.",
  "Vertical Touch Display":"Вертикальный сенсорный дисплей",
  "Vertical screen with speed and music.":"Вертикальный экран со скоростью и музыкой.",

  // Service page
  "Battery Check":"Проверка аккумулятора",
  "Brakes":"Тормоза",
  "Tires":"Шины",
  "Electrical System":"Электрическая система",
  "Professional Cleaning":"Профессиональная чистка",
  "General Inspection":"Общий осмотр",

  // Repair/Maintenance page
  "Batteries":"Аккумуляторы",
  "Electric Motor":"Электродвигатель",
  "Steering":"Рулевое управление",
  "Body":"Кузов",

  // Partner page
  "Nationwide opportunity":"Возможность по всей стране",
  "Attractive commissions":"Привлекательные комиссионные",
  "Growing market":"Растущий рынок",
  "Full support":"Полная поддержка",

  // Configurator step labels
  "Color":"Цвет",
  "Seats":"Места",
  "Exterior":"Экстерьер",
  "Engine":"Двигатель",
  "Confirm":"Подтверждение",

  // FAQ
  "What payment methods do you accept?":"Какие способы оплаты вы принимаете?",
  "We accept bank transfer, Visa, Mastercard, Revolut, and Wise. Payment can be made in US Dollars. We also accept Euros, Dominican Pesos, or other currencies upon request.":"Мы принимаем банковский перевод, Visa, Mastercard, Revolut и Wise. Оплата может быть произведена в долларах США. По запросу мы также принимаем евро, доминиканские песо или другие валюты.",
  "How long does delivery take?":"Сколько времени занимает доставка?",
  "Delivery takes approximately 90 days after payment of the 40% deposit. This is because each golf cart is custom-built according to your configuration.":"Доставка занимает примерно 90 дней после оплаты депозита в размере 40%. Это связано с тем, что каждый гольф-кар изготавливается индивидуально по вашей конфигурации.",
  "Do you deliver across the Dominican Republic?":"Вы осуществляете доставку по всей Доминиканской Республике?",
  "Yes, we deliver across the entire Dominican Republic. However, we reserve the right to adjust the price for deliveries to particularly difficult or remote locations.":"Да, мы доставляем по всей территории Доминиканской Республики. Однако мы оставляем за собой право корректировать стоимость доставки в особо труднодоступные или отдалённые места.",
  "Can I test a golf cart before buying?":"Могу ли я протестировать гольф-кар перед покупкой?",
  "Yes, you can request a test drive on a similar model. However, it is not possible to see the exact golf cart you ordered before delivery, as each configured cart is built to order. The only exception is for pre-configured models available in our showroom.":"Да, вы можете запросить тест-драйв на похожей модели. Однако увидеть именно тот гольф-кар, который вы заказали, до доставки невозможно, так как каждый сконфигурированный автомобиль изготавливается на заказ. Исключение составляют готовые модели, доступные в нашем шоуруме.",
  "What is the battery range?":"Какой запас хода у аккумулятора?",
  "The realistic range is approximately 70–80 km per charge. With the 500W solar panel included on every golf cart, in 2 hours of full sun you recover approximately 0.7–0.9 kWh, equivalent to about 7–12 extra km.":"Реальный запас хода составляет примерно 70–80 км на одном заряде. Благодаря солнечной панели мощностью 500Вт, установленной на каждом гольф-каре, за 2 часа полного солнца восстанавливается примерно 0,7–0,9 кВт·ч, что эквивалентно дополнительным 7–12 км.",
  "Can the solar panel fully charge the battery?":"Может ли солнечная панель полностью зарядить аккумулятор?",
  "The solar panel alone can fully recharge the battery in approximately 4 days of full sun without using the golf cart. It is designed to extend range and reduce consumption, not as the primary charging source.":"Одна только солнечная панель может полностью зарядить аккумулятор примерно за 4 дня полного солнца без использования гольф-кара. Она предназначена для увеличения запаса хода и снижения расхода энергии, а не как основной источник зарядки.",
  "How long does the battery last over time?":"Как долго служит аккумулятор?",
  "A lithium battery of this type lasts approximately 5–8 years, and even longer if you avoid fully discharging it regularly.":"Литиевый аккумулятор такого типа служит примерно 5–8 лет, а если избегать регулярной полной разрядки — ещё дольше.",
  "What is included in the base price?":"Что входит в базовую цену?",
  "The base price includes the golf cart with standard options and the 500W solar panel on the roof. Delivery across the Dominican Republic is also included.":"Базовая цена включает гольф-кар со стандартными опциями и солнечную панель 500Вт на крыше. Также включена доставка по всей Доминиканской Республике.",
  "What is the warranty?":"Какая предоставляется гарантия?",
  "The warranty period is 12 months. During this period, if any part fails due to non-artificial causes, the seller will replace it free of charge based on photos of the damaged parts provided by the buyer.":"Гарантийный период составляет 12 месяцев. В течение этого срока, если какая-либо деталь выйдет из строя по причинам, не связанным с неправильной эксплуатацией, продавец бесплатно заменит её на основании фотографий повреждённых деталей, предоставленных покупателем.",
  "Can I request maintenance for my golf cart?":"Могу ли я запросить техническое обслуживание своего гольф-кара?",
  "Yes, you can request maintenance through the website under the 'Service' section. We also offer repair services for golf carts not purchased from us, subject to prior assessment.":"Да, вы можете запросить обслуживание через сайт в разделе «Сервис». Мы также предлагаем ремонт гольф-каров, приобретённых не у нас, после предварительной оценки.",
  "Can I modify my configuration after ordering?":"Могу ли я изменить конфигурацию после оформления заказа?",
  "Yes, modifications can be requested up to 7 days after paying the deposit.":"Да, изменения можно запросить в течение 7 дней после оплаты депозита.",
  "Can I add options after delivery?":"Могу ли я добавить опции после доставки?",
  "Yes, you can add options after delivery. These will require a separate payment and a new quote.":"Да, вы можете добавить опции после доставки. Это потребует отдельной оплаты и нового расчёта стоимости.",
  "Is the quote binding?":"Является ли предложение цены обязывающим?",
  "No, the quote is not binding. To start building your custom golf cart, a 40% deposit of the total configured value is required.":"Нет, предложение цены не является обязывающим. Чтобы начать изготовление вашего индивидуального гольф-кара, требуется депозит в размере 40% от общей стоимости конфигурации.",
  "What happens if I cancel after paying the deposit?":"Что произойдёт, если я отменю заказ после оплаты депозита?",
  "If you cancel after paying the deposit, 50% of the deposit amount will be retained as a cancellation fee.":"Если вы отмените заказ после оплаты депозита, 50% суммы депозита будет удержано в качестве штрафа за отмену.",
  "Is financing available?":"Доступно ли финансирование?",
  "Yes, it is possible to finance the purchase through installment payments, to be agreed upon at the time of purchase.":"Да, возможна оплата покупки в рассрочку, условия которой согласовываются в момент покупки.",
  "What is the maximum speed and passenger capacity?":"Какова максимальная скорость и вместимость пассажиров?",
  "The maximum speed is 30 km/h. The passenger capacity depends on the number of seats chosen during configuration.":"Максимальная скорость составляет 30 км/ч. Вместимость пассажиров зависит от количества мест, выбранных при конфигурации.",
  "Can I use the golf cart in the rain?":"Могу ли я использовать гольф-кар под дождём?",
  "Yes, the golf cart can be used in the rain. For added protection, you can add rain covers from the optional accessories section.":"Да, гольф-кар можно использовать под дождём. Для дополнительной защиты вы можете добавить защиту от дождя из раздела дополнительных аксессуаров.",
  "Is the golf cart street legal? Do I need insurance?":"Разрешена ли эксплуатация гольф-кара на дорогах общего пользования? Нужна ли страховка?",
  "The golf cart is approved for road use. However, Golf Cart DR declines all responsibility for use that does not comply with the laws and regulations of the Dominican Republic. It is the buyer's responsibility to ensure compliance with local regulations regarding insurance, licensing, and road use.":"Гольф-кар допущен к эксплуатации на дорогах. Однако Golf Cart DR снимает с себя всякую ответственность за использование, не соответствующее законам и нормам Доминиканской Республики. Покупатель несёт ответственность за соблюдение местных норм в отношении страхования, получения прав и использования на дорогах.",

  // Home categories
  "For Golf":"Для гольфа",
  "Road Use":"Для дорожного использования",
  "Golf courses":"Поля для гольфа",
  "Resorts":"Курорты",
  "Hotels":"Отели",
  "Golfers":"Игроки в гольф",
  "Private residences":"Частные резиденции",
  "Gated communities":"Закрытые жилые комплексы",
  "Villas":"Виллы",
  "We use cookies to analyze site traffic and improve your experience. See our Privacy Policy for details.":"Мы используем файлы cookie для анализа посещаемости сайта и улучшения вашего опыта. Подробности смотрите в нашей Политике конфиденциальности.",
  "Reject":"Отклонить",
  "Accept":"Принять",
  "7. Cookies and Google Analytics":"7. Файлы cookie и Google Analytics",
  "With your consent, our website uses Google Analytics to collect anonymous statistics on site usage, such as the pages visited, time spent on the site, and the general geographic location of visitors (country/region). This data is collected exclusively to understand how our website is used and to improve it, and is not sold, rented, or shared with third parties for marketing purposes. You can accept or decline this data collection at any time via the cookie banner shown on the site.":"С вашего согласия наш сайт использует Google Analytics для сбора анонимной статистики об использовании сайта, такой как посещённые страницы, время, проведённое на сайте, и общее географическое местоположение посетителей (страна/регион). Эти данные собираются исключительно для понимания того, как используется наш сайт, и для его улучшения; они не продаются, не сдаются в аренду и не передаются третьим лицам в маркетинговых целях. Вы можете в любой момент принять или отклонить сбор этих данных через баннер cookie, отображаемый на сайте.",
  "60V 100A — Lead-acid":"60В 100А — свинцово-кислотный",
  "72V 100A — Lead-acid":"72В 100А — свинцово-кислотный",
  "Delivery takes approximately 90 days after the initial 35% payment. This is because each golf cart is custom-built according to your configuration.":"Доставка занимает примерно 90 дней после первого платежа в размере 35%. Это связано с тем, что каждый гольф-кар изготавливается индивидуально по вашей конфигурации.",
  "Yes, modifications can be requested up to 7 days after the initial 35% payment.":"Да, изменения можно запросить в течение 7 дней после первого платежа в размере 35%.",
  "No, the quote itself is not binding. After placing your order, you have a 14-day window before the initial 35% payment becomes binding, giving you time to confirm every detail of your custom golf cart.":"Нет, само предложение цены не является обязывающим. После оформления заказа у вас есть 14 дней, прежде чем первый платёж в размере 35% станет обязательным — это даёт время подтвердить все детали вашего индивидуального гольф-кара.",
  "What happens if I cancel my order?":"Что произойдёт, если я отменю заказ?",
  "If you cancel within 14 days of placing your order, no fee applies. After that period, once the initial 35% payment is binding, cancelling will retain 50% of that first payment as a cancellation fee.":"Если вы отмените заказ в течение 14 дней с момента оформления, штраф не взимается. По истечении этого срока, когда первый платёж в размере 35% становится обязательным, при отмене будет удержано 50% этого первого платежа в качестве штрафа за отмену.",
  "Price includes taxes and transport":"Цена включает налоги и доставку",
  "On Order":"При заказе",
  "On Completion":"При завершении",
  "On Delivery":"При доставке",
  "To start building your golf cart":"Чтобы начать изготовление вашего гольф-кара",
  "Verified by photo, video or video call":"Подтверждается фото, видео или видеозвонком",
  "Turnkey delivery":"Доставка «под ключ»",
  "Select your language":"Выберите язык",
  "I have read and accept the ":"Я прочитал(а) и принимаю ",
  "$500 OFF your purchase!":"Скидка $500 на вашу покупку!",
  "Offer valid until December 31, 2026":"Предложение действует до 31 декабря 2026 года",
  "Got it!":"Понятно!",
  "Discount":"Скидка",
  "Subtotal":"Подытог",
  "By continuing, you accept our ":"Продолжая, вы принимаете нашу ",
  "Designing":"Настройка",
  "TAAAC's Choice":"Выбор TAAAC",
  "Last Step":"Последний Шаг",
  "Your Creation":"Твоё Творение",
  "You've made every choice.":"Ты сделал каждый выбор.",
  "Every detail carries your signature.":"Каждая деталь несёт твою подпись.",
  "Recommended for daily use.":"Рекомендуется для повседневного использования.",
  "We've already chosen the ideal power for daily use. Want a bit more? The choice is yours.":"Мы уже выбрали идеальную мощность для повседневного использования. Хочешь больше? Выбор за тобой.",
  "Our recommended balance between performance, efficiency and daily use.":"Наш рекомендованный баланс между производительностью, эффективностью и повседневным использованием.",
  "Energy from the sun. Included.":"Энергия солнца. Включена.",
  "Every Golf Cart is born with a solar panel included. Because under the Caribbean sun, for us, it simply made sense.":"Каждый гольф-кар рождается со встроенной солнечной панелью. Потому что под карибским солнцем для нас это просто имело смысл.",
  "We've already selected the ideal battery. If you want more range, you can choose to go further.":"Мы уже выбрали идеальную батарею. Если хочешь больше автономности, можешь выбрать больше.",
  "comfortable":"комфортный",
  "sporty":"спортивный",
  "You have a configuration in progress for":"У тебя есть незавершённая конфигурация для",
  "Do you want to continue where you left off?":"Хочешь продолжить с того места, где остановился?",
  "Start Over":"Начать заново",
  "Create your TAAAC":"Создай свой TAAAC",
  "12-Month Warranty Included":"Гарантия 12 месяцев включена",
  "See details in the FAQ":"Подробности в FAQ",
  "No reviews yet — be the first to share your experience!":"Пока нет отзывов — стань первым, кто поделится своим опытом!",
  "We've received your request!":"Мы получили твой запрос!",
  "Follow us":"Подписывайся",
  "Can I guide you?":"Могу я тебя направить?",
  "Prefer to be guided step by step? Try our virtual assistant →":"Предпочитаешь пошаговое руководство? Попробуй нашего виртуального помощника →",
  "Configure":"Настроить",
  "First things first — what would you like to name your golf cart?":"Прежде всего — как бы ты хотел назвать свой гольф-кар?",
  "Get Guided":"С Гидом",
  "Golf Course":"Поле для гольфа",
  "Here are a few accessories we recommend:":"Вот несколько аксессуаров, которые мы рекомендуем:",
  "How to Choose Your Golf Cart":"Как выбрать свой гольф-кар",
  "Let's Start":"Начнём",
  "Off-Road":"Бездорожье",
  "Show me other accessories":"Покажи другие аксессуары",
  "Showing grass tires, ideal for golf courses":"Показываю шины для травы, идеальные для полей для гольфа",
  "Showing off-road tires, ideal for rough terrain":"Показываю внедорожные шины, идеальные для сложной местности",
  "Letters only":"Только буквы",
  "Must start with + and have at least 11 digits":"Должен начинаться с + и содержать не менее 11 цифр",
  "Must contain @":"Должен содержать @",
  "A gift for your review — TAAAC Solutions":"Подарок за твой отзыв — TAAAC Solutions",
  "Service & Repairs":"Сервис и Ремонт",
  "Maintenance & Repairs":"Обслуживание и Ремонт",
  "Electric Motor Repair":"Ремонт электродвигателя",
  "Steering Repair":"Ремонт рулевого управления",
  "Bodywork":"Кузовные работы",
  "What's included":"Что включено",
  "Solar panel included on every unit":"Солнечная панель включена в каждый экземпляр",
  "Fully customizable body color, seats and accessories":"Полностью настраиваемый цвет кузова, сиденья и аксессуары",
  "Seat configurations: 2, 2+2 or 4+2":"Конфигурации сидений: 2, 2+2 или 4+2",
  "Configure this Model":"Настроить эту модель",
  "12-month warranty included":"Гарантия 12 месяцев включена",
  "Estimated delivery: ~90 days from deposit":"Ориентировочный срок доставки: ~90 дней с момента депозита",
  "About Us":"О нас",
  "Our Models":"Наши модели",
  "Back to Home":"Вернуться на главную",
  "20 customers":"20 клиентов",
  "Cancel":"Отмена",
  "Error sending review. Please try again.":"Ошибка при отправке отзыва. Попробуйте снова.",
  "Location (optional)":"Местоположение (необязательно)",
  "Please fill in your name and review":"Пожалуйста, укажите имя и отзыв",
  "Sending...":"Отправка...",
  "Thank you for your review!":"Спасибо за твой отзыв!",
  "Write a Review":"Написать отзыв",
  "Your name":"Твоё имя",
  "Your review":"Твой отзыв",
  "Create your unique golf cart":"Создай свой уникальный гольф-кар",
  "and":"и",
  "get it delivered straight to your door":"получи его с доставкой на дом",
  "Custom golf carts, local support and":"Индивидуальные гольф-кары, местная поддержка и",
  "delivery throughout the Dominican Republic.":"доставка по всей Доминиканской Республике.",
  "Get Started":"Начать",
  "Create your personal golf cart and":"Создай свой личный гольф-кар и",
  "get it delivered straight to your door.":"получите его с доставкой на дом.",
  "Freedom is measured by the emotions you live along the way.":"Свобода измеряется эмоциями, которые ты переживаешь в пути.",
  "Golf Cart Guides":"Гиды по гольф-карам",
  "See All Guides →":"Все гиды →",
  "Choose Your Cart":"Выбери свой гольф-кар",
  "How to Choose a Golf Cart":"Как выбрать гольф-кар",
  "2, 4 or 6 Seats":"2, 4 или 6 мест",
  "Battery & Power":"Батарея и мощность",
  "Lithium vs Lead":"Литий против свинца",
  "48V vs 72V":"48В против 72В",
  "Buying & Maintenance":"Покупка и обслуживание",
  "What to Check Before Buying":"Что проверить перед покупкой",
  "Caring for It Near the Sea":"Уход за гольф-каром у моря",
};
function ru(en) { return RU_DICT[en] || en; }

// ── FRENCH TRANSLATION DICTIONARY (keyed by the English source string) ─────
const FR_DICT = {
  "Add more options":"Ajouter d'autres options",
  "Address":"Adresse",
  "Advice":"Conseils",
  "All rights reserved":"Tous droits réservés",
  "Always Included":"Toujours inclus",
  "Back":"Retour",
  "Back to Home":"Retour à l'accueil",
  "Balance on delivery":"Solde à la livraison",
  "Battery":"Batterie",
  "Body Color":"Couleur de carrosserie",
  "Book":"Réserver",
  "Book a Service":"Réserver un entretien",
  "Booking Sent!":"Réservation envoyée !",
  "Browse models":"Parcourir les modèles",
  "Browse ready-to-buy golf carts already set up and available now.":"Découvrez les voiturettes de golf prêtes à l'achat, déjà configurées et disponibles dès maintenant.",
  "Build your golf cart from scratch, choosing every detail yourself.":"Créez votre voiturette de golf de A à Z, en choisissant chaque détail vous-même.",
  "Choose the Model":"Choisissez le modèle",
  "Choose your Golf Cart":"Choisissez votre voiturette de golf",
  "Choose your battery":"Choisissez votre batterie",
  "Choose your motor":"Choisissez votre moteur",
  "Choose your seat type":"Choisissez votre type de siège",
  "Choose your steering wheel":"Choisissez votre volant",
  "Choose your style":"Choisissez votre style",
  "Choose your windshield":"Choisissez votre pare-brise",
  "Click to open":"Cliquez pour ouvrir",
  "Close":"Fermer",
  "Coming soon":"Bientôt disponible",
  "Configure your own":"Configurez la vôtre",
  "Confirm & Details":"Confirmation et coordonnées",
  "Contact":"Contact",
  "Contact Us":"Contactez-nous",
  "Continue":"Continuer",
  "Customize your golf cart with accessories":"Personnalisez votre voiturette de golf avec des accessoires",
  "Default":"Par défaut",
  "Delivery across Dominican Republic":"Livraison dans toute la République Dominicaine",
  "Delivery location":"Lieu de livraison",
  "Deposit 40%":"Acompte de 40 %",
  "Describe what you need...":"Décrivez ce dont vous avez besoin...",
  "Edit":"Modifier",
  "Estimated Delivery":"Délai de livraison estimé",
  "Everything you need to know about Golf Cart DR":"Tout ce que vous devez savoir sur Golf Cart DR",
  "Fill in your details to receive the official quote":"Renseignez vos coordonnées pour recevoir le devis officiel",
  "For Sale":"À vendre",
  "Frequently Asked Questions":"Foire aux questions",
  "Golf Cart DR declines all responsibility for use of the vehicle that does not comply with the laws, regulations, and requirements in force in the Dominican Republic or in any other country where the vehicle is used. It is the sole responsibility of the buyer to obtain any required insurance, licenses, or permits.":"Golf Cart DR décline toute responsabilité quant à l'utilisation du véhicule non conforme aux lois, règlements et exigences en vigueur en République Dominicaine ou dans tout autre pays où le véhicule est utilisé. Il incombe uniquement à l'acheteur d'obtenir toute assurance, licence ou permis requis.",
  "Golf Cart for every need":"Une voiturette de golf pour chaque besoin",
  "Grass tires":"Pneus pour gazon",
  "How would you like to proceed?":"Comment souhaitez-vous procéder ?",
  "Included":"Inclus",
  "Join Our Team":"Rejoignez notre équipe",
  "Last updated: 2025":"Dernière mise à jour : 2025",
  "Legal Disclaimer":"Avertissement légal",
  "Location":"Emplacement",
  "Model":"Modèle",
  "Motor":"Moteur",
  "Name *":"Prénom *",
  "Next":"Suivant",
  "Not available Model A":"Non disponible pour le Modèle A",
  "Notes":"Remarques",
  "Number of Seats":"Nombre de places",
  "On Request":"Sur demande",
  "Options":"Options",
  "Options & Accessories":"Options et accessoires",
  "Other":"Autre",
  "Other battery options":"Autres options de batterie",
  "Other inches":"Autre taille (pouces)",
  "Other motor options":"Autres options de moteur",
  "Other seat options":"Autres options de siège",
  "Other steering options":"Autres options de volant",
  "Other windshield options":"Autres options de pare-brise",
  "Our categories":"Nos catégories",
  "Our team will contact you within 24 hours.":"Notre équipe vous contactera sous 24 heures.",
  "Our team will contact you within 24 hours to schedule your interview.":"Notre équipe vous contactera sous 24 heures pour planifier votre entretien.",
  "Partner with us":"Devenez partenaire",
  "Phone *":"Téléphone *",
  "Please enter a valid email":"Veuillez saisir un email valide",
  "Please fill Name, Email and Phone":"Veuillez remplir le nom, l'email et le téléphone",
  "Please select at least one service":"Veuillez sélectionner au moins un service",
  "Pre-configured models":"Modèles préconfigurés",
  "Premium Golf Cart":"Voiturette de golf premium",
  "Privacy Policy":"Politique de confidentialité",
  "Quick reply":"Réponse rapide",
  "Read our advice":"Lire nos conseils",
  "Ready to Buy":"Prêt à l'achat",
  "Recommended":"Recommandé",
  "Repair Service":"Service de réparation",
  "Repairs":"Réparations",
  "Reply in 24h":"Réponse sous 24h",
  "Request":"Demande",
  "Request Sent!":"Demande envoyée !",
  "Request a free interview":"Demander un entretien gratuit",
  "Review your configuration":"Vérifiez votre configuration",
  "Scheduled Maintenance":"Entretien programmé",
  "Seat":"Siège",
  "Seat Color":"Couleur du siège",
  "Select one or more services":"Sélectionnez un ou plusieurs services",
  "Select the options you want to add":"Sélectionnez les options que vous souhaitez ajouter",
  "Selected":"Sélectionné",
  "Send":"Envoyer",
  "Service":"Service",
  "Standard only":"Standard uniquement",
  "Start configuring":"Commencer la configuration",
  "Starting from":"À partir de",
  "Steering Wheel":"Volant",
  "Step":"Étape",
  "Still have questions? Contact us":"Encore des questions ? Contactez-nous",
  "Summary":"Résumé",
  "Surname":"Nom de famille",
  "Surname *":"Nom de famille *",
  "The official quote will be calculated by our team, including any discounts.":"Le devis officiel sera calculé par notre équipe, remises éventuelles incluses.",
  "Tires & Wheels":"Pneus et roues",
  "Total":"Total",
  "Trusted by Our Customers":"La confiance de nos clients",
  "Want to grow with us?":"Envie de grandir avec nous ?",
  "We are Golf Cart DR, a premium golf cart sales company based in Bayahibe and Dominicus, Dominican Republic. We are looking for motivated partners and collaborators across the entire country to help us grow and bring premium golf carts to more communities, resorts, and residences.":"Nous sommes Golf Cart DR, une entreprise premium de vente de voiturettes de golf basée à Bayahibe et Dominicus, en République Dominicaine. Nous recherchons des partenaires et collaborateurs motivés dans tout le pays pour nous aider à grandir et à apporter des voiturettes de golf premium à davantage de communautés, resorts et résidences.",
  "We recommend a lithium battery because it lasts much longer, with over 3,000 charge cycles. It also charges faster, requires less maintenance, and lithium loses very little charge if the golf car sits idle for weeks. Ideal where heat and humidity are high.":"Nous recommandons une batterie au lithium, car elle dure beaucoup plus longtemps, avec plus de 3 000 cycles de charge. Elle se recharge aussi plus rapidement, nécessite moins d'entretien, et perd très peu de charge si la voiturette reste inutilisée pendant plusieurs semaines. Idéale dans les zones à forte chaleur et humidité.",
  "We'll get back to you to schedule your free interview":"Nous vous recontacterons pour planifier votre entretien gratuit",
  "We're preparing a selection of ready-to-buy golf carts. Check back soon, or configure your own right now.":"Nous préparons une sélection de voiturettes de golf prêtes à l'achat. Revenez bientôt, ou configurez la vôtre dès maintenant.",
  "What they say about us":"Ce que disent nos clients à propos de nous",
  "Windshield":"Pare-brise",
  "Your Details":"Vos coordonnées",
  "days from deposit confirmation":"jours à partir de la confirmation de l'acompte",
  "from":"à partir de",
  "of":"sur",
  "seats":"places",
  "Error sending. Please try WhatsApp.":"Erreur d'envoi. Veuillez essayer WhatsApp.",
  "Error sending request. Please try WhatsApp.":"Erreur lors de l'envoi de la demande. Veuillez essayer WhatsApp.",
  "Error sending request. Please try again.":"Erreur lors de l'envoi de la demande. Veuillez réessayer.",
  "+2 models only":"Modèles +2 uniquement",
  "1. Data Controller":"1. Responsable du traitement",
  "Golf Cart DR, based in Bayahibe, Dominicus, República Dominicana. Contact: info@taaac.solutions":"Golf Cart DR, basée à Bayahibe, Dominicus, République Dominicaine. Contact : info@taaac.solutions",
  "2. Data We Collect":"2. Données que nous collectons",
  "When you submit a quote request or collaboration request, we collect: first name, last name, phone number, email address, delivery address, and any notes you provide.":"Lorsque vous soumettez une demande de devis ou de collaboration, nous collectons : prénom, nom, numéro de téléphone, adresse email, adresse de livraison et toute remarque que vous fournissez.",
  "3. How We Use Your Data":"3. Comment nous utilisons vos données",
  "Your data is used exclusively to respond to your request, provide a quote, or schedule a meeting. We do not sell, rent, or share your data with third parties.":"Vos données sont utilisées exclusivement pour répondre à votre demande, fournir un devis ou planifier un rendez-vous. Nous ne vendons, ne louons ni ne partageons vos données avec des tiers.",
  "4. Data Retention":"4. Conservation des données",
  "We retain your data only for as long as necessary to fulfill your request, and for a maximum of 12 months unless you request earlier deletion.":"Nous conservons vos données uniquement le temps nécessaire pour traiter votre demande, et pour une durée maximale de 12 mois, sauf si vous demandez une suppression anticipée.",
  "5. Your Rights":"5. Vos droits",
  "You have the right to: access your data, request correction or deletion, and withdraw consent at any time. To exercise these rights, contact us at info@taaac.solutions.":"Vous avez le droit : d'accéder à vos données, d'en demander la correction ou la suppression, et de retirer votre consentement à tout moment. Pour exercer ces droits, contactez-nous à info@taaac.solutions.",
  "6. Applicable Law":"6. Loi applicable",
  "This privacy policy is governed by Law 172-13 on the Protection of Personal Data of the Dominican Republic.":"Cette politique de confidentialité est régie par la loi 172-13 relative à la protection des données personnelles de la République Dominicaine.",

  // Model descriptions
  "Classic and elegant. Perfect for golf courses, resorts and hotels.":"Classique et élégant. Parfait pour les golfs, les resorts et les hôtels.",
  "Powerful off-road. Conquers any terrain.":"Puissant tout-terrain. Conquiert tous les terrains.",
  "Sporty and refined. Leather seats and premium wheels.":"Sportif et raffiné. Sièges en cuir et jantes premium.",
  "Maximum family comfort. Extra space with golf bag holder.":"Confort familial maximal. Espace supplémentaire avec porte-sac de golf.",

  // Seats options
  "2 Seats":"2 places",
  "Compact and agile":"Compact et agile",
  "2+2 Seats":"2+2 places",
  "With rear seat":"Avec siège arrière",
  "4 Seats":"4 places",
  "Ideal for families":"Idéal pour les familles",
  "4+2 Seats":"4+2 places",
  "Extra rear space":"Espace supplémentaire à l'arrière",
  "Other Seats":"Autre nombre de places",
  "On request":"Sur demande",

  // Seat types
  "Standard Seat":"Siège standard",
  "Ergonomic and comfortable. Default.":"Ergonomique et confortable. Par défaut.",
  "Sport Seat":"Siège sport",
  "Black leather with red stitching.":"Cuir noir avec surpiqûres rouges.",
  "Premium Padded Seat":"Siège premium rembourré",
  "Thickened with integrated seatbelt.":"Rembourrage épaissi avec ceinture intégrée.",
  "Premium with Headrest":"Premium avec appuie-tête",
  "Maximum comfort with headrests.":"Confort maximal avec appuie-têtes.",

  // Steering wheels
  "Standard Steering Wheel":"Volant standard",
  "Classic black, included in all models":"Noir classique, inclus sur tous les modèles",
  "Sport Steering Wheel":"Volant sport",
  "Carbon fiber with display and red details":"Fibre de carbone avec écran et détails rouges",
  "Carbon Fiber Wheel":"Volant en fibre de carbone",
  "Black leather with carbon fiber spokes":"Cuir noir avec rayons en fibre de carbone",

  // Tires
  "Grass 10\"":"Gazon 10\"",
  "Standard for golf courses":"Standard pour les golfs",
  "Grass 12\"":"Gazon 12\"",
  "Greater stability":"Plus grande stabilité",
  "Grass 14\"":"Gazon 14\"",
  "Maximum contact surface":"Surface de contact maximale",
  "Off-Road 12\"":"Tout-terrain 12\"",
  "Knobby tire":"Pneu crampons",
  "Off-Road 14\"":"Tout-terrain 14\"",
  "Premium aggressive knobby":"Crampons agressifs premium",

  // Windshields
  "Standard Windshield":"Pare-brise standard",
  "Fixed transparent, classic":"Fixe transparent, classique",
  "Folding Transparent":"Pliable transparent",
  "Foldable transparent":"Pare-brise pliable transparent",
  "Folding Brown":"Pliable marron",
  "Smoked/bronze foldable":"Fumé/bronze pliable",
  "Tempered Windshield":"Pare-brise trempé",
  "Tempered glass, maximum resistance":"Verre trempé, résistance maximale",

  // Batteries
  "48V 150A — Lead-acid battery":"48V 150A — Batterie plomb-acide",
  "48V 150A — Lithium battery":"48V 150A — Batterie au lithium",
  "60V 100A / 72V 100A — Lead-acid":"60V 100A / 72V 100A — Plomb-acide",
  "60V 150A — Lithium battery":"60V 150A — Batterie au lithium",

  // Motors
  "Efficient and silent":"Efficace et silencieux",
  "Perfect balance":"Équilibre parfait",
  "Maximum power":"Puissance maximale",

  // Optional items
  "500W Solar Panel":"Panneau solaire 500W",
  "Integrated solar charging. Always included.":"Charge solaire intégrée. Toujours inclus.",
  "Rain Cover":"Housse anti-pluie",
  "Full protection from rain and wind.":"Protection complète contre la pluie et le vent.",
  "Protective Cover":"Housse de protection",
  "Full protective cover for parking.":"Housse de protection intégrale pour le stationnement.",
  "Sun Shade Curtains":"Rideaux pare-soleil",
  "Roll-up curtains against tropical sun.":"Rideaux enroulables contre le soleil tropical.",
  "LED Mirrors":"Rétroviseurs à LED",
  "Mirrors with integrated LED indicators.":"Rétroviseurs avec clignotants LED intégrés.",
  "Roof LED Spotlights":"Projecteurs LED de toit",
  "4 high-brightness lights for nighttime.":"4 phares haute luminosité pour la nuit.",
  "Under-Roof LED Strip":"Bandeau LED sous le toit",
  "Ambient LED blue lighting.":"Éclairage d'ambiance LED bleu.",
  "Emergency Light Kit":"Kit de feux d'urgence",
  "Flashers + professional siren.":"Gyrophares + sirène professionnelle.",
  "Touch Screen Display":"Écran tactile",
  "Digital screen with vehicle data.":"Écran numérique avec données du véhicule.",
  "Bluetooth Stereo":"Autoradio Bluetooth",
  "4-speaker audio system with LED.":"Système audio 4 haut-parleurs avec LED.",
  "Rear Folding Table":"Table pliante arrière",
  "Rear foldable table.":"Table pliante à l'arrière.",
  "Front LED Light":"Feu LED avant",
  "Additional front LED bar.":"Barre LED avant supplémentaire.",
  "License + LED Stop Lights":"Éclairage de plaque + feux stop LED",
  "Rear LED lights kit.":"Kit de feux arrière LED.",
  "Seat with Seatbelt":"Siège avec ceinture de sécurité",
  "Rear seat with certified seatbelt.":"Siège arrière avec ceinture de sécurité homologuée.",
  "Folding Platform":"Plateforme rabattable",
  "+2 models only. Folding platform.":"Modèles +2 uniquement. Plateforme rabattable.",
  "Luggage Compartment":"Coffre à bagages",
  "Rear compartment with cover.":"Compartiment arrière avec couvercle.",
  "Golf Ball Holder":"Porte-balles de golf",
  "Specific container for golf balls.":"Conteneur spécifique pour balles de golf.",
  "Front Basket":"Panier avant",
  "Net basket on front hood.":"Panier filet sur le capot avant.",
  "Rear Trunk":"Coffre arrière",
  "Locked rear storage box.":"Coffre de rangement arrière verrouillable.",
  "Windshield Wiper":"Essuie-glace",
  "Wiper for tempered windshield.":"Essuie-glace pour pare-brise trempé.",
  "Aluminum Steps":"Marchepieds en aluminium",
  "Anti-slip side running boards.":"Marchepieds latéraux antidérapants.",
  "Tow Hook":"Crochet de remorquage",
  "Chrome rear ball hitch.":"Attelage à boule chromé arrière.",
  "Bottle Holder":"Porte-bouteille",
  "Integrated bottle dispenser.":"Porte-bouteille intégré.",
  "Rear Steps":"Marchepieds arrière",
  "Rear anti-slip steps.":"Marchepieds antidérapants arrière.",
  "Cargo Bed":"Plateau de chargement",
  "Rear platform with high sides.":"Plateforme arrière à hauts rebords.",
  "Platform with Railing":"Plateforme avec rambarde",
  "Load platform with tubular railing.":"Plateforme de charge avec rambarde tubulaire.",
  "Front Bull Bar":"Pare-buffle avant",
  "Reinforced front tubular bumper.":"Pare-chocs tubulaire avant renforcé.",
  "Marine LED Speaker":"Haut-parleur marine LED",
  "Waterproof speaker with blue LED.":"Haut-parleur étanche avec LED bleue.",
  "Carbon Fiber Panel":"Panneau en fibre de carbone",
  "Carbon fiber dashboard with Start/Stop.":"Tableau de bord en fibre de carbone avec Start/Stop.",
  "Vertical Touch Display":"Écran tactile vertical",
  "Vertical screen with speed and music.":"Écran vertical avec vitesse et musique.",

  // Service page
  "Battery Check":"Contrôle de la batterie",
  "Brakes":"Freins",
  "Tires":"Pneus",
  "Electrical System":"Système électrique",
  "Professional Cleaning":"Nettoyage professionnel",
  "General Inspection":"Inspection générale",

  // Repair/Maintenance page
  "Batteries":"Batteries",
  "Electric Motor":"Moteur électrique",
  "Steering":"Direction",
  "Body":"Carrosserie",

  // Partner page
  "Nationwide opportunity":"Opportunité à l'échelle nationale",
  "Attractive commissions":"Commissions attractives",
  "Growing market":"Marché en croissance",
  "Full support":"Accompagnement complet",

  // Configurator step labels
  "Color":"Couleur",
  "Seats":"Places",
  "Exterior":"Extérieur",
  "Engine":"Moteur",
  "Confirm":"Confirmation",

  // FAQ
  "What payment methods do you accept?":"Quels moyens de paiement acceptez-vous ?",
  "We accept bank transfer, Visa, Mastercard, Revolut, and Wise. Payment can be made in US Dollars. We also accept Euros, Dominican Pesos, or other currencies upon request.":"Nous acceptons le virement bancaire, Visa, Mastercard, Revolut et Wise. Le paiement peut être effectué en dollars américains. Nous acceptons également les euros, les pesos dominicains ou d'autres devises sur demande.",
  "How long does delivery take?":"Combien de temps prend la livraison ?",
  "Delivery takes approximately 90 days after payment of the 40% deposit. This is because each golf cart is custom-built according to your configuration.":"La livraison prend environ 90 jours après le paiement de l'acompte de 40 %. Cela s'explique par le fait que chaque voiturette est fabriquée sur mesure selon votre configuration.",
  "Do you deliver across the Dominican Republic?":"Livrez-vous dans toute la République Dominicaine ?",
  "Yes, we deliver across the entire Dominican Republic. However, we reserve the right to adjust the price for deliveries to particularly difficult or remote locations.":"Oui, nous livrons dans toute la République Dominicaine. Nous nous réservons toutefois le droit d'ajuster le prix pour les livraisons vers des lieux particulièrement difficiles ou isolés.",
  "Can I test a golf cart before buying?":"Puis-je essayer une voiturette avant l'achat ?",
  "Yes, you can request a test drive on a similar model. However, it is not possible to see the exact golf cart you ordered before delivery, as each configured cart is built to order. The only exception is for pre-configured models available in our showroom.":"Oui, vous pouvez demander un essai sur un modèle similaire. Il n'est cependant pas possible de voir la voiturette exacte que vous avez commandée avant la livraison, car chaque voiturette configurée est fabriquée sur commande. La seule exception concerne les modèles préconfigurés disponibles dans notre showroom.",
  "What is the battery range?":"Quelle est l'autonomie de la batterie ?",
  "The realistic range is approximately 70–80 km per charge. With the 500W solar panel included on every golf cart, in 2 hours of full sun you recover approximately 0.7–0.9 kWh, equivalent to about 7–12 extra km.":"L'autonomie réaliste est d'environ 70 à 80 km par charge. Avec le panneau solaire de 500W inclus sur chaque voiturette, en 2 heures de plein soleil vous récupérez environ 0,7 à 0,9 kWh, soit environ 7 à 12 km supplémentaires.",
  "Can the solar panel fully charge the battery?":"Le panneau solaire peut-il recharger complètement la batterie ?",
  "The solar panel alone can fully recharge the battery in approximately 4 days of full sun without using the golf cart. It is designed to extend range and reduce consumption, not as the primary charging source.":"Le panneau solaire seul peut recharger complètement la batterie en environ 4 jours de plein soleil sans utiliser la voiturette. Il est conçu pour prolonger l'autonomie et réduire la consommation, et non comme source de charge principale.",
  "How long does the battery last over time?":"Quelle est la durée de vie de la batterie ?",
  "A lithium battery of this type lasts approximately 5–8 years, and even longer if you avoid fully discharging it regularly.":"Une batterie au lithium de ce type dure environ 5 à 8 ans, voire plus longtemps si vous évitez de la décharger complètement de façon régulière.",
  "What is included in the base price?":"Qu'est-ce qui est inclus dans le prix de base ?",
  "The base price includes the golf cart with standard options and the 500W solar panel on the roof. Delivery across the Dominican Republic is also included.":"Le prix de base comprend la voiturette avec les options standard et le panneau solaire de 500W sur le toit. La livraison dans toute la République Dominicaine est également incluse.",
  "What is the warranty?":"Quelle est la garantie ?",
  "The warranty period is 12 months. During this period, if any part fails due to non-artificial causes, the seller will replace it free of charge based on photos of the damaged parts provided by the buyer.":"La période de garantie est de 12 mois. Durant cette période, si une pièce tombe en panne pour des causes non artificielles, le vendeur la remplacera gratuitement sur la base de photos des pièces endommagées fournies par l'acheteur.",
  "Can I request maintenance for my golf cart?":"Puis-je demander un entretien pour ma voiturette ?",
  "Yes, you can request maintenance through the website under the 'Service' section. We also offer repair services for golf carts not purchased from us, subject to prior assessment.":"Oui, vous pouvez demander un entretien via le site dans la section « Service ». Nous proposons également des réparations pour les voiturettes non achetées chez nous, sous réserve d'une évaluation préalable.",
  "Can I modify my configuration after ordering?":"Puis-je modifier ma configuration après la commande ?",
  "Yes, modifications can be requested up to 7 days after paying the deposit.":"Oui, des modifications peuvent être demandées jusqu'à 7 jours après le paiement de l'acompte.",
  "Can I add options after delivery?":"Puis-je ajouter des options après la livraison ?",
  "Yes, you can add options after delivery. These will require a separate payment and a new quote.":"Oui, vous pouvez ajouter des options après la livraison. Cela nécessitera un paiement séparé et un nouveau devis.",
  "Is the quote binding?":"Le devis est-il contraignant ?",
  "No, the quote is not binding. To start building your custom golf cart, a 40% deposit of the total configured value is required.":"Non, le devis n'est pas contraignant. Pour démarrer la fabrication de votre voiturette personnalisée, un acompte de 40 % de la valeur totale configurée est requis.",
  "What happens if I cancel after paying the deposit?":"Que se passe-t-il si j'annule après avoir payé l'acompte ?",
  "If you cancel after paying the deposit, 50% of the deposit amount will be retained as a cancellation fee.":"Si vous annulez après avoir payé l'acompte, 50 % du montant de l'acompte sera retenu à titre de frais d'annulation.",
  "Is financing available?":"Un financement est-il disponible ?",
  "Yes, it is possible to finance the purchase through installment payments, to be agreed upon at the time of purchase.":"Oui, il est possible de financer l'achat par paiements échelonnés, à convenir au moment de l'achat.",
  "What is the maximum speed and passenger capacity?":"Quelle est la vitesse maximale et la capacité de passagers ?",
  "The maximum speed is 30 km/h. The passenger capacity depends on the number of seats chosen during configuration.":"La vitesse maximale est de 30 km/h. La capacité de passagers dépend du nombre de places choisi lors de la configuration.",
  "Can I use the golf cart in the rain?":"Puis-je utiliser la voiturette sous la pluie ?",
  "Yes, the golf cart can be used in the rain. For added protection, you can add rain covers from the optional accessories section.":"Oui, la voiturette peut être utilisée sous la pluie. Pour une protection supplémentaire, vous pouvez ajouter des housses anti-pluie depuis la section des accessoires en option.",
  "Is the golf cart street legal? Do I need insurance?":"La voiturette est-elle homologuée pour la route ? Ai-je besoin d'une assurance ?",
  "The golf cart is approved for road use. However, Golf Cart DR declines all responsibility for use that does not comply with the laws and regulations of the Dominican Republic. It is the buyer's responsibility to ensure compliance with local regulations regarding insurance, licensing, and road use.":"La voiturette est homologuée pour un usage routier. Toutefois, Golf Cart DR décline toute responsabilité quant à une utilisation non conforme aux lois et règlements de la République Dominicaine. Il incombe à l'acheteur de veiller au respect des réglementations locales en matière d'assurance, de permis et d'usage routier.",

  // Home categories
  "For Golf":"Pour le golf",
  "Road Use":"Usage routier",
  "Golf courses":"Golfs",
  "Resorts":"Resorts",
  "Hotels":"Hôtels",
  "Golfers":"Golfeurs",
  "Private residences":"Résidences privées",
  "Gated communities":"Résidences fermées",
  "Villas":"Villas",
  "We use cookies to analyze site traffic and improve your experience. See our Privacy Policy for details.":"Nous utilisons des cookies pour analyser le trafic du site et améliorer votre expérience. Consultez notre Politique de confidentialité pour plus de détails.",
  "Reject":"Refuser",
  "Accept":"Accepter",
  "7. Cookies and Google Analytics":"7. Cookies et Google Analytics",
  "With your consent, our website uses Google Analytics to collect anonymous statistics on site usage, such as the pages visited, time spent on the site, and the general geographic location of visitors (country/region). This data is collected exclusively to understand how our website is used and to improve it, and is not sold, rented, or shared with third parties for marketing purposes. You can accept or decline this data collection at any time via the cookie banner shown on the site.":"Avec votre consentement, notre site utilise Google Analytics pour collecter des statistiques anonymes sur l'utilisation du site, telles que les pages visitées, le temps passé sur le site et la localisation géographique générale des visiteurs (pays/région). Ces données sont collectées exclusivement pour comprendre comment notre site est utilisé et pour l'améliorer ; elles ne sont ni vendues, ni louées, ni partagées avec des tiers à des fins marketing. Vous pouvez accepter ou refuser cette collecte de données à tout moment via la bannière de cookies affichée sur le site.",
  "60V 100A — Lead-acid":"60V 100A — Plomb-acide",
  "72V 100A — Lead-acid":"72V 100A — Plomb-acide",
  "Delivery takes approximately 90 days after the initial 35% payment. This is because each golf cart is custom-built according to your configuration.":"La livraison prend environ 90 jours après le premier paiement de 35 %. Cela s'explique par le fait que chaque voiturette est fabriquée sur mesure selon votre configuration.",
  "Yes, modifications can be requested up to 7 days after the initial 35% payment.":"Oui, des modifications peuvent être demandées jusqu'à 7 jours après le premier paiement de 35 %.",
  "No, the quote itself is not binding. After placing your order, you have a 14-day window before the initial 35% payment becomes binding, giving you time to confirm every detail of your custom golf cart.":"Non, le devis en lui-même n'est pas contraignant. Après avoir passé votre commande, vous disposez de 14 jours avant que le premier paiement de 35 % ne devienne contraignant, ce qui vous laisse le temps de confirmer chaque détail de votre voiturette personnalisée.",
  "What happens if I cancel my order?":"Que se passe-t-il si j'annule ma commande ?",
  "If you cancel within 14 days of placing your order, no fee applies. After that period, once the initial 35% payment is binding, cancelling will retain 50% of that first payment as a cancellation fee.":"Si vous annulez dans les 14 jours suivant votre commande, aucuns frais ne s'appliquent. Passé ce délai, une fois le premier paiement de 35 % devenu contraignant, l'annulation entraînera la retenue de 50 % de ce premier paiement à titre de frais d'annulation.",
  "Price includes taxes and transport":"Le prix inclut les taxes et le transport",
  "On Order":"À la commande",
  "On Completion":"À la finalisation",
  "On Delivery":"À la livraison",
  "To start building your golf cart":"Pour démarrer la fabrication de votre voiturette",
  "Verified by photo, video or video call":"Vérifié par photo, vidéo ou appel vidéo",
  "Turnkey delivery":"Livraison clé en main",
  "Select your language":"Sélectionnez votre langue",
  "I have read and accept the ":"J'ai lu et j'accepte la ",
  "$500 OFF your purchase!":"500 $ de réduction sur votre achat !",
  "Offer valid until December 31, 2026":"Offre valable jusqu'au 31 décembre 2026",
  "Got it!":"Compris !",
  "Discount":"Remise",
  "Subtotal":"Sous-total",
  "By continuing, you accept our ":"En continuant, vous acceptez notre ",
  "Designing":"Configuration de",
  "TAAAC's Choice":"Choix TAAAC",
  "Last Step":"Dernière Étape",
  "Your Creation":"Ta Création",
  "You've made every choice.":"Tu as fait chaque choix.",
  "Every detail carries your signature.":"Chaque détail porte ta signature.",
  "Recommended for daily use.":"Recommandée pour un usage quotidien.",
  "We've already chosen the ideal power for daily use. Want a bit more? The choice is yours.":"Nous avons déjà choisi la puissance idéale pour un usage quotidien. Tu en veux plus ? Le choix t'appartient.",
  "Our recommended balance between performance, efficiency and daily use.":"Notre équilibre recommandé entre performance, efficacité et usage quotidien.",
  "Energy from the sun. Included.":"Énergie du soleil. Incluse.",
  "Every Golf Cart is born with a solar panel included. Because under the Caribbean sun, for us, it simply made sense.":"Chaque Golf Cart naît avec un panneau solaire inclus. Parce que sous le soleil des Caraïbes, pour nous, cela avait tout simplement du sens.",
  "We've already selected the ideal battery. If you want more range, you can choose to go further.":"Nous avons déjà sélectionné la batterie idéale. Si tu veux plus d'autonomie, tu peux choisir d'aller plus loin.",
  "comfortable":"confortable",
  "sporty":"sportif",
  "You have a configuration in progress for":"Tu as une configuration en cours pour",
  "Do you want to continue where you left off?":"Veux-tu continuer là où tu t'es arrêté ?",
  "Start Over":"Recommencer",
  "Create your TAAAC":"Crée ton TAAAC",
  "12-Month Warranty Included":"Garantie de 12 mois incluse",
  "See details in the FAQ":"Voir les détails dans la FAQ",
  "No reviews yet — be the first to share your experience!":"Pas encore d'avis — sois le premier à partager ton expérience !",
  "We've received your request!":"Nous avons bien reçu ta demande !",
  "Follow us":"Suis-nous",
  "Can I guide you?":"Je peux te guider ?",
  "Prefer to be guided step by step? Try our virtual assistant →":"Tu préfères être guidé pas à pas ? Essaie notre assistant virtuel →",
  "Configure":"Configurer",
  "First things first — what would you like to name your golf cart?":"Tout d'abord — comment aimerais-tu appeler ton golf cart ?",
  "Get Guided":"Sois Guidé",
  "Golf Course":"Terrain de Golf",
  "Here are a few accessories we recommend:":"Voici quelques accessoires que nous recommandons :",
  "How to Choose Your Golf Cart":"Comment Choisir ton Golf Cart",
  "Let's Start":"Commençons",
  "Off-Road":"Tout-Terrain",
  "Show me other accessories":"Montre-moi d'autres accessoires",
  "Showing grass tires, ideal for golf courses":"Affichage des pneus gazon, idéaux pour les terrains de golf",
  "Showing off-road tires, ideal for rough terrain":"Affichage des pneus tout-terrain, idéaux pour les terrains difficiles",
  "Letters only":"Lettres uniquement",
  "Must start with + and have at least 11 digits":"Doit commencer par + et contenir au moins 11 chiffres",
  "Must contain @":"Doit contenir @",
  "A gift for your review — TAAAC Solutions":"Un cadeau pour ton avis — TAAAC Solutions",
  "Service & Repairs":"Entretien et Réparations",
  "Maintenance & Repairs":"Maintenance et Réparations",
  "Electric Motor Repair":"Réparation du moteur électrique",
  "Steering Repair":"Réparation de la direction",
  "Bodywork":"Carrosserie",
  "What's included":"Ce qui est inclus",
  "Solar panel included on every unit":"Panneau solaire inclus sur chaque unité",
  "Fully customizable body color, seats and accessories":"Couleur de carrosserie, sièges et accessoires entièrement personnalisables",
  "Seat configurations: 2, 2+2 or 4+2":"Configurations de sièges : 2, 2+2 ou 4+2",
  "Configure this Model":"Configurer ce modèle",
  "12-month warranty included":"Garantie de 12 mois incluse",
  "Estimated delivery: ~90 days from deposit":"Livraison estimée : ~90 jours après l'acompte",
  "About Us":"À propos de nous",
  "Our Models":"Nos Modèles",
  "Back to Home":"Retour à l'accueil",
  "20 customers":"20 prochains clients",
  "Cancel":"Annuler",
  "Error sending review. Please try again.":"Erreur lors de l'envoi de l'avis. Veuillez réessayer.",
  "Location (optional)":"Lieu (facultatif)",
  "Please fill in your name and review":"Merci de renseigner ton nom et ton avis",
  "Sending...":"Envoi...",
  "Thank you for your review!":"Merci pour ton avis !",
  "Write a Review":"Écrire un Avis",
  "Your name":"Ton nom",
  "Your review":"Ton avis",
  "Create your unique golf cart":"Crée ton golf cart unique",
  "and":"et",
  "get it delivered straight to your door":"reçois-le directement chez toi",
  "Custom golf carts, local support and":"Voiturettes de golf personnalisées, assistance locale et",
  "delivery throughout the Dominican Republic.":"livraison dans toute la République Dominicaine.",
  "Get Started":"Commencer",
  "Create your personal golf cart and":"Crée ton golf cart personnel et",
  "get it delivered straight to your door.":"recevez-le directement chez vous.",
  "Freedom is measured by the emotions you live along the way.":"La liberté se mesure aux émotions vécues tout au long du chemin.",
  "Golf Cart Guides":"Guides sur les golf carts",
  "See All Guides →":"Voir tous les guides →",
  "Choose Your Cart":"Choisir ton golf cart",
  "How to Choose a Golf Cart":"Comment choisir un golf cart",
  "2, 4 or 6 Seats":"2, 4 ou 6 places",
  "Battery & Power":"Batterie et puissance",
  "Lithium vs Lead":"Lithium vs plomb",
  "48V vs 72V":"48V vs 72V",
  "Buying & Maintenance":"Achat et entretien",
  "What to Check Before Buying":"Que vérifier avant d'acheter",
  "Caring for It Near the Sea":"L'entretenir près de la mer",
};
function fr(en) { return FR_DICT[en] || en; }

// ── POLISH TRANSLATION DICTIONARY (keyed by the English source string) ─────
const PL_DICT = {
  "Add more options":"Dodaj więcej opcji",
  "Address":"Adres",
  "Advice":"Porady",
  "All rights reserved":"Wszelkie prawa zastrzeżone",
  "Always Included":"Zawsze w zestawie",
  "Back":"Wstecz",
  "Back to Home":"Powrót do strony głównej",
  "Balance on delivery":"Pozostała kwota przy dostawie",
  "Battery":"Akumulator",
  "Body Color":"Kolor nadwozia",
  "Book":"Zarezerwuj",
  "Book a Service":"Zarezerwuj serwis",
  "Booking Sent!":"Rezerwacja wysłana!",
  "Browse models":"Przeglądaj modele",
  "Browse ready-to-buy golf carts already set up and available now.":"Przeglądaj gotowe do zakupu wózki golfowe, już skonfigurowane i dostępne od ręki.",
  "Build your golf cart from scratch, choosing every detail yourself.":"Zbuduj swój wózek golfowy od podstaw, wybierając każdy szczegół samodzielnie.",
  "Choose the Model":"Wybierz model",
  "Choose your Golf Cart":"Wybierz swój wózek golfowy",
  "Choose your battery":"Wybierz akumulator",
  "Choose your motor":"Wybierz silnik",
  "Choose your seat type":"Wybierz typ siedzenia",
  "Choose your steering wheel":"Wybierz kierownicę",
  "Choose your style":"Wybierz styl",
  "Choose your windshield":"Wybierz szybę przednią",
  "Click to open":"Kliknij, aby otworzyć",
  "Close":"Zamknij",
  "Coming soon":"Wkrótce dostępne",
  "Configure your own":"Skonfiguruj swój",
  "Confirm & Details":"Potwierdzenie i dane",
  "Contact":"Kontakt",
  "Contact Us":"Skontaktuj się z nami",
  "Continue":"Kontynuuj",
  "Customize your golf cart with accessories":"Dostosuj swój wózek golfowy dodatkami",
  "Default":"Domyślny",
  "Delivery across Dominican Republic":"Dostawa na terenie całej Dominikany",
  "Delivery location":"Miejsce dostawy",
  "Deposit 40%":"Zaliczka 40%",
  "Describe what you need...":"Opisz, czego potrzebujesz...",
  "Edit":"Edytuj",
  "Estimated Delivery":"Szacowany czas dostawy",
  "Everything you need to know about Golf Cart DR":"Wszystko, co warto wiedzieć o Golf Cart DR",
  "Fill in your details to receive the official quote":"Wypełnij swoje dane, aby otrzymać oficjalną wycenę",
  "For Sale":"Na sprzedaż",
  "Frequently Asked Questions":"Najczęściej zadawane pytania",
  "Golf Cart DR declines all responsibility for use of the vehicle that does not comply with the laws, regulations, and requirements in force in the Dominican Republic or in any other country where the vehicle is used. It is the sole responsibility of the buyer to obtain any required insurance, licenses, or permits.":"Golf Cart DR nie ponosi żadnej odpowiedzialności za użytkowanie pojazdu niezgodne z przepisami, regulacjami i wymogami obowiązującymi w Dominikanie lub w jakimkolwiek innym kraju, w którym pojazd jest użytkowany. Wyłączną odpowiedzialnością kupującego jest uzyskanie wymaganych ubezpieczeń, licencji lub pozwoleń.",
  "Golf Cart for every need":"Wózek golfowy na każdą potrzebę",
  "Grass tires":"Opony do trawy",
  "How would you like to proceed?":"Jak chcesz kontynuować?",
  "Included":"Wliczone",
  "Join Our Team":"Dołącz do naszego zespołu",
  "Last updated: 2025":"Ostatnia aktualizacja: 2025",
  "Legal Disclaimer":"Zastrzeżenie prawne",
  "Location":"Lokalizacja",
  "Model":"Model",
  "Motor":"Silnik",
  "Name *":"Imię *",
  "Next":"Dalej",
  "Not available Model A":"Model A niedostępny",
  "Notes":"Uwagi",
  "Number of Seats":"Liczba miejsc",
  "On Request":"Na życzenie",
  "Options":"Opcje",
  "Options & Accessories":"Opcje i akcesoria",
  "Other":"Inne",
  "Other battery options":"Inne opcje akumulatora",
  "Other inches":"Inny rozmiar (cale)",
  "Other motor options":"Inne opcje silnika",
  "Other seat options":"Inne opcje siedzeń",
  "Other steering options":"Inne opcje kierownicy",
  "Other windshield options":"Inne opcje szyby przedniej",
  "Our categories":"Nasze kategorie",
  "Our team will contact you within 24 hours.":"Nasz zespół skontaktuje się z Tobą w ciągu 24 godzin.",
  "Our team will contact you within 24 hours to schedule your interview.":"Nasz zespół skontaktuje się z Tobą w ciągu 24 godzin, aby umówić rozmowę.",
  "Partner with us":"Zostań naszym partnerem",
  "Phone *":"Telefon *",
  "Please enter a valid email":"Proszę podać prawidłowy adres e-mail",
  "Please fill Name, Email and Phone":"Proszę uzupełnić imię, e-mail i telefon",
  "Please select at least one service":"Proszę wybrać co najmniej jedną usługę",
  "Pre-configured models":"Gotowe konfiguracje",
  "Premium Golf Cart":"Luksusowy wózek golfowy",
  "Privacy Policy":"Polityka prywatności",
  "Quick reply":"Szybka odpowiedź",
  "Read our advice":"Przeczytaj nasze porady",
  "Ready to Buy":"Gotowe do zakupu",
  "Recommended":"Polecane",
  "Repair Service":"Serwis naprawczy",
  "Repairs":"Naprawy",
  "Reply in 24h":"Odpowiedź w ciągu 24h",
  "Request":"Zapytanie",
  "Request Sent!":"Zapytanie wysłane!",
  "Request a free interview":"Poproś o bezpłatną rozmowę",
  "Review your configuration":"Sprawdź swoją konfigurację",
  "Scheduled Maintenance":"Planowa konserwacja",
  "Seat":"Siedzenie",
  "Seat Color":"Kolor siedzenia",
  "Select one or more services":"Wybierz jedną lub więcej usług",
  "Select the options you want to add":"Wybierz opcje, które chcesz dodać",
  "Selected":"Wybrano",
  "Send":"Wyślij",
  "Service":"Serwis",
  "Standard only":"Tylko standardowy",
  "Start configuring":"Rozpocznij konfigurację",
  "Starting from":"Od",
  "Steering Wheel":"Kierownica",
  "Step":"Krok",
  "Still have questions? Contact us":"Masz jeszcze pytania? Skontaktuj się z nami",
  "Summary":"Podsumowanie",
  "Surname":"Nazwisko",
  "Surname *":"Nazwisko *",
  "The official quote will be calculated by our team, including any discounts.":"Oficjalna wycena zostanie obliczona przez nasz zespół, z uwzględnieniem ewentualnych rabatów.",
  "Tires & Wheels":"Opony i koła",
  "Total":"Suma",
  "Trusted by Our Customers":"Zaufali nam nasi klienci",
  "Want to grow with us?":"Chcesz rozwijać się razem z nami?",
  "We are Golf Cart DR, a premium golf cart sales company based in Bayahibe and Dominicus, Dominican Republic. We are looking for motivated partners and collaborators across the entire country to help us grow and bring premium golf carts to more communities, resorts, and residences.":"Jesteśmy Golf Cart DR, firmą premium sprzedającą wózki golfowe z siedzibą w Bayahibe i Dominicus w Dominikanie. Szukamy zmotywowanych partnerów i współpracowników w całym kraju, którzy pomogą nam się rozwijać i dostarczać luksusowe wózki golfowe do kolejnych społeczności, ośrodków wypoczynkowych i rezydencji.",
  "We recommend a lithium battery because it lasts much longer, with over 3,000 charge cycles. It also charges faster, requires less maintenance, and lithium loses very little charge if the golf car sits idle for weeks. Ideal where heat and humidity are high.":"Zalecamy akumulator litowy, ponieważ wytrzymuje znacznie dłużej, ponad 3000 cykli ładowania. Ładuje się także szybciej, wymaga mniej konserwacji, a lit traci bardzo mało energii, jeśli wózek golfowy stoi nieużywany przez kilka tygodni. Idealny w miejscach o wysokiej temperaturze i wilgotności.",
  "We'll get back to you to schedule your free interview":"Skontaktujemy się z Tobą, aby umówić bezpłatną rozmowę",
  "We're preparing a selection of ready-to-buy golf carts. Check back soon, or configure your own right now.":"Przygotowujemy wybór wózków golfowych gotowych do zakupu. Zajrzyj ponownie wkrótce lub skonfiguruj swój już teraz.",
  "What they say about us":"Co mówią o nas nasi klienci",
  "Windshield":"Szyba przednia",
  "Your Details":"Twoje dane",
  "days from deposit confirmation":"dni od potwierdzenia zaliczki",
  "from":"od",
  "of":"z",
  "seats":"miejsc",
  "Error sending. Please try WhatsApp.":"Błąd wysyłania. Spróbuj przez WhatsApp.",
  "Error sending request. Please try WhatsApp.":"Błąd wysyłania zapytania. Spróbuj przez WhatsApp.",
  "Error sending request. Please try again.":"Błąd wysyłania zapytania. Spróbuj ponownie.",
  "+2 models only":"Tylko dla modeli +2",
  "1. Data Controller":"1. Administrator danych",
  "Golf Cart DR, based in Bayahibe, Dominicus, República Dominicana. Contact: info@taaac.solutions":"Golf Cart DR, z siedzibą w Bayahibe, Dominicus, Dominikana. Kontakt: info@taaac.solutions",
  "2. Data We Collect":"2. Dane, które zbieramy",
  "When you submit a quote request or collaboration request, we collect: first name, last name, phone number, email address, delivery address, and any notes you provide.":"Kiedy przesyłasz zapytanie o wycenę lub o współpracę, zbieramy: imię, nazwisko, numer telefonu, adres e-mail, adres dostawy oraz wszelkie podane przez Ciebie uwagi.",
  "3. How We Use Your Data":"3. Jak wykorzystujemy Twoje dane",
  "Your data is used exclusively to respond to your request, provide a quote, or schedule a meeting. We do not sell, rent, or share your data with third parties.":"Twoje dane są wykorzystywane wyłącznie w celu odpowiedzi na Twoje zapytanie, przygotowania wyceny lub umówienia spotkania. Nie sprzedajemy, nie wynajmujemy ani nie udostępniamy Twoich danych osobom trzecim.",
  "4. Data Retention":"4. Przechowywanie danych",
  "We retain your data only for as long as necessary to fulfill your request, and for a maximum of 12 months unless you request earlier deletion.":"Przechowujemy Twoje dane tylko tak długo, jak jest to konieczne do realizacji Twojego zapytania, maksymalnie przez 12 miesięcy, chyba że poprosisz o wcześniejsze usunięcie.",
  "5. Your Rights":"5. Twoje prawa",
  "You have the right to: access your data, request correction or deletion, and withdraw consent at any time. To exercise these rights, contact us at info@taaac.solutions.":"Masz prawo do: dostępu do swoich danych, żądania ich poprawienia lub usunięcia oraz wycofania zgody w dowolnym momencie. Aby skorzystać z tych praw, skontaktuj się z nami pod adresem info@taaac.solutions.",
  "6. Applicable Law":"6. Obowiązujące prawo",
  "This privacy policy is governed by Law 172-13 on the Protection of Personal Data of the Dominican Republic.":"Niniejsza polityka prywatności podlega Ustawie 172-13 o ochronie danych osobowych Dominikany.",
  "Classic and elegant. Perfect for golf courses, resorts and hotels.":"Klasyczny i elegancki. Idealny na pola golfowe, do ośrodków wypoczynkowych i hoteli.",
  "Powerful off-road. Conquers any terrain.":"Mocny w terenie. Pokonuje każdy teren.",
  "Sporty and refined. Leather seats and premium wheels.":"Sportowy i wyrafinowany. Skórzane siedzenia i felgi premium.",
  "Maximum family comfort. Extra space with golf bag holder.":"Maksymalny komfort dla rodziny. Dodatkowa przestrzeń z uchwytem na torbę golfową.",
  "2 Seats":"2 miejsca",
  "Compact and agile":"Kompaktowy i zwrotny",
  "2+2 Seats":"2+2 miejsca",
  "With rear seat":"Z tylnym siedzeniem",
  "4 Seats":"4 miejsca",
  "Ideal for families":"Idealny dla rodzin",
  "4+2 Seats":"4+2 miejsca",
  "Extra rear space":"Dodatkowa przestrzeń z tyłu",
  "Other Seats":"Inna liczba miejsc",
  "On request":"Na życzenie",
  "Standard Seat":"Siedzenie standardowe",
  "Ergonomic and comfortable. Default.":"Ergonomiczne i wygodne. Domyślne.",
  "Sport Seat":"Siedzenie sportowe",
  "Black leather with red stitching.":"Czarna skóra z czerwonymi przeszyciami.",
  "Premium Padded Seat":"Siedzenie premium z wyściełaniem",
  "Thickened with integrated seatbelt.":"Pogrubione, z wbudowanym pasem bezpieczeństwa.",
  "Premium with Headrest":"Premium z zagłówkiem",
  "Maximum comfort with headrests.":"Maksymalny komfort z zagłówkami.",
  "Standard Steering Wheel":"Kierownica standardowa",
  "Classic black, included in all models":"Klasyczna czarna, w zestawie we wszystkich modelach",
  "Sport Steering Wheel":"Kierownica sportowa",
  "Carbon fiber with display and red details":"Włókno węglowe z wyświetlaczem i czerwonymi akcentami",
  "Carbon Fiber Wheel":"Kierownica z włókna węglowego",
  "Black leather with carbon fiber spokes":"Czarna skóra ze szprychami z włókna węglowego",
  "Grass 10\"":"Trawiaste 10\"",
  "Standard for golf courses":"Standard na pola golfowe",
  "Grass 12\"":"Trawiaste 12\"",
  "Greater stability":"Większa stabilność",
  "Grass 14\"":"Trawiaste 14\"",
  "Maximum contact surface":"Maksymalna powierzchnia styku",
  "Off-Road 12\"":"Terenowe 12\"",
  "Knobby tire":"Opona z bieżnikiem terenowym",
  "Off-Road 14\"":"Terenowe 14\"",
  "Premium aggressive knobby":"Premium agresywny bieżnik",
  "Standard Windshield":"Szyba standardowa",
  "Fixed transparent, classic":"Stała przezroczysta, klasyczna",
  "Folding Transparent":"Składana przezroczysta",
  "Foldable transparent":"Składana przezroczysta szyba",
  "Folding Brown":"Składana brązowa",
  "Smoked/bronze foldable":"Przydymiona/brązowa składana",
  "Tempered Windshield":"Szyba hartowana",
  "Tempered glass, maximum resistance":"Szkło hartowane, maksymalna wytrzymałość",
  "48V 150A — Lead-acid battery":"48V 150A — akumulator kwasowo-ołowiowy",
  "48V 150A — Lithium battery":"48V 150A — akumulator litowy",
  "60V 100A / 72V 100A — Lead-acid":"60V 100A / 72V 100A — kwasowo-ołowiowy",
  "60V 150A — Lithium battery":"60V 150A — akumulator litowy",
  "Efficient and silent":"Wydajny i cichy",
  "Perfect balance":"Idealna równowaga",
  "Maximum power":"Maksymalna moc",
  "500W Solar Panel":"Panel słoneczny 500W",
  "Integrated solar charging. Always included.":"Zintegrowane ładowanie słoneczne. Zawsze w zestawie.",
  "Rain Cover":"Osłona przeciwdeszczowa",
  "Full protection from rain and wind.":"Pełna ochrona przed deszczem i wiatrem.",
  "Protective Cover":"Pokrowiec ochronny",
  "Full protective cover for parking.":"Pełny pokrowiec ochronny na postój.",
  "Sun Shade Curtains":"Zasłony przeciwsłoneczne",
  "Roll-up curtains against tropical sun.":"Zwijane zasłony chroniące przed tropikalnym słońcem.",
  "LED Mirrors":"Lusterka LED",
  "Mirrors with integrated LED indicators.":"Lusterka ze zintegrowanymi kierunkowskazami LED.",
  "Roof LED Spotlights":"Reflektory LED na dachu",
  "4 high-brightness lights for nighttime.":"4 mocne światła do jazdy nocnej.",
  "Under-Roof LED Strip":"Taśma LED pod dachem",
  "Ambient LED blue lighting.":"Niebieskie oświetlenie ambientowe LED.",
  "Emergency Light Kit":"Zestaw świateł awaryjnych",
  "Flashers + professional siren.":"Lampy błyskowe + profesjonalna syrena.",
  "Touch Screen Display":"Ekran dotykowy",
  "Digital screen with vehicle data.":"Cyfrowy ekran z danymi pojazdu.",
  "Bluetooth Stereo":"System audio Bluetooth",
  "4-speaker audio system with LED.":"System audio z 4 głośnikami i podświetleniem LED.",
  "Rear Folding Table":"Składany stolik z tyłu",
  "Rear foldable table.":"Składany stolik z tyłu.",
  "Front LED Light":"Przednie światło LED",
  "Additional front LED bar.":"Dodatkowy przedni pas LED.",
  "License + LED Stop Lights":"Oświetlenie tablicy rejestracyjnej + światła stopu LED",
  "Rear LED lights kit.":"Zestaw tylnych świateł LED.",
  "Seat with Seatbelt":"Siedzenie z pasem bezpieczeństwa",
  "Rear seat with certified seatbelt.":"Tylne siedzenie z certyfikowanym pasem bezpieczeństwa.",
  "Folding Platform":"Składana platforma",
  "+2 models only. Folding platform.":"Tylko dla modeli +2. Składana platforma.",
  "Luggage Compartment":"Schowek bagażowy",
  "Rear compartment with cover.":"Tylny schowek z pokrywą.",
  "Golf Ball Holder":"Uchwyt na piłki golfowe",
  "Specific container for golf balls.":"Specjalny pojemnik na piłki golfowe.",
  "Front Basket":"Przedni koszyk",
  "Net basket on front hood.":"Siatkowy koszyk na przedniej masce.",
  "Rear Trunk":"Tylny bagażnik",
  "Locked rear storage box.":"Zamykana tylna skrzynia magazynowa.",
  "Windshield Wiper":"Wycieraczka szyby przedniej",
  "Wiper for tempered windshield.":"Wycieraczka do hartowanej szyby przedniej.",
  "Aluminum Steps":"Aluminiowe stopnie",
  "Anti-slip side running boards.":"Antypoślizgowe boczne stopnie.",
  "Tow Hook":"Hak holowniczy",
  "Chrome rear ball hitch.":"Chromowany tylny hak kulowy.",
  "Bottle Holder":"Uchwyt na butelkę",
  "Integrated bottle dispenser.":"Zintegrowany uchwyt na butelkę.",
  "Rear Steps":"Tylne stopnie",
  "Rear anti-slip steps.":"Tylne antypoślizgowe stopnie.",
  "Cargo Bed":"Platforma ładunkowa",
  "Rear platform with high sides.":"Tylna platforma z wysokimi burtami.",
  "Platform with Railing":"Platforma z poręczą",
  "Load platform with tubular railing.":"Platforma ładunkowa z rurową poręczą.",
  "Front Bull Bar":"Przednie orurowanie ochronne",
  "Reinforced front tubular bumper.":"Wzmocniony przedni zderzak rurowy.",
  "Marine LED Speaker":"Morski głośnik LED",
  "Waterproof speaker with blue LED.":"Wodoodporny głośnik z niebieskim podświetleniem LED.",
  "Carbon Fiber Panel":"Panel z włókna węglowego",
  "Carbon fiber dashboard with Start/Stop.":"Deska rozdzielcza z włókna węglowego z funkcją Start/Stop.",
  "Vertical Touch Display":"Pionowy ekran dotykowy",
  "Vertical screen with speed and music.":"Pionowy ekran z prędkością i muzyką.",
  "Battery Check":"Kontrola akumulatora",
  "Brakes":"Hamulce",
  "Tires":"Opony",
  "Electrical System":"Instalacja elektryczna",
  "Professional Cleaning":"Profesjonalne czyszczenie",
  "General Inspection":"Przegląd ogólny",
  "Batteries":"Akumulatory",
  "Electric Motor":"Silnik elektryczny",
  "Steering":"Układ kierowniczy",
  "Body":"Nadwozie",
  "Nationwide opportunity":"Możliwość działania w całym kraju",
  "Attractive commissions":"Atrakcyjne prowizje",
  "Growing market":"Rozwijający się rynek",
  "Full support":"Pełne wsparcie",
  "Color":"Kolor",
  "Seats":"Miejsca",
  "Exterior":"Elementy zewnętrzne",
  "Engine":"Silnik",
  "Confirm":"Potwierdzenie",
  "What payment methods do you accept?":"Jakie metody płatności akceptujecie?",
  "We accept bank transfer, Visa, Mastercard, Revolut, and Wise. Payment can be made in US Dollars. We also accept Euros, Dominican Pesos, or other currencies upon request.":"Akceptujemy przelew bankowy, Visa, Mastercard, Revolut i Wise. Płatność można zrealizować w dolarach amerykańskich. Na życzenie akceptujemy również euro, peso dominikańskie lub inne waluty.",
  "How long does delivery take?":"Ile trwa dostawa?",
  "Delivery takes approximately 90 days after payment of the 40% deposit. This is because each golf cart is custom-built according to your configuration.":"Dostawa trwa około 90 dni od zapłaty zaliczki w wysokości 40%. Wynika to z faktu, że każdy wózek golfowy jest budowany na zamówienie zgodnie z Twoją konfiguracją.",
  "Do you deliver across the Dominican Republic?":"Czy dostarczacie na terenie całej Dominikany?",
  "Yes, we deliver across the entire Dominican Republic. However, we reserve the right to adjust the price for deliveries to particularly difficult or remote locations.":"Tak, dostarczamy na terenie całej Dominikany. Zastrzegamy sobie jednak prawo do korekty ceny dla dostaw do szczególnie trudno dostępnych lub odległych miejsc.",
  "Can I test a golf cart before buying?":"Czy mogę przetestować wózek golfowy przed zakupem?",
  "Yes, you can request a test drive on a similar model. However, it is not possible to see the exact golf cart you ordered before delivery, as each configured cart is built to order. The only exception is for pre-configured models available in our showroom.":"Tak, możesz poprosić o jazdę testową na podobnym modelu. Nie ma jednak możliwości zobaczenia dokładnie tego wózka golfowego, który zamówiłeś, przed dostawą, ponieważ każdy skonfigurowany wózek jest budowany na zamówienie. Jedynym wyjątkiem są gotowe modele dostępne w naszym salonie.",
  "What is the battery range?":"Jaki jest zasięg akumulatora?",
  "The realistic range is approximately 70–80 km per charge. With the 500W solar panel included on every golf cart, in 2 hours of full sun you recover approximately 0.7–0.9 kWh, equivalent to about 7–12 extra km.":"Realistyczny zasięg wynosi około 70–80 km na jednym ładowaniu. Dzięki panelowi słonecznemu 500W dołączonemu do każdego wózka golfowego, w ciągu 2 godzin pełnego słońca odzyskujesz około 0,7–0,9 kWh, co odpowiada dodatkowym 7–12 km.",
  "Can the solar panel fully charge the battery?":"Czy panel słoneczny może w pełni naładować akumulator?",
  "The solar panel alone can fully recharge the battery in approximately 4 days of full sun without using the golf cart. It is designed to extend range and reduce consumption, not as the primary charging source.":"Sam panel słoneczny może w pełni naładować akumulator w ciągu około 4 dni pełnego słońca bez użytkowania wózka golfowego. Został zaprojektowany, aby zwiększyć zasięg i zmniejszyć zużycie energii, a nie jako główne źródło ładowania.",
  "How long does the battery last over time?":"Jak długo wytrzymuje akumulator?",
  "A lithium battery of this type lasts approximately 5–8 years, and even longer if you avoid fully discharging it regularly.":"Akumulator litowy tego typu wytrzymuje około 5–8 lat, a nawet dłużej, jeśli unikasz regularnego całkowitego rozładowywania.",
  "What is included in the base price?":"Co jest wliczone w cenę podstawową?",
  "The base price includes the golf cart with standard options and the 500W solar panel on the roof. Delivery across the Dominican Republic is also included.":"Cena podstawowa obejmuje wózek golfowy ze standardowymi opcjami oraz panel słoneczny 500W na dachu. Wliczona jest również dostawa na terenie całej Dominikany.",
  "What is the warranty?":"Jaka jest gwarancja?",
  "The warranty period is 12 months. During this period, if any part fails due to non-artificial causes, the seller will replace it free of charge based on photos of the damaged parts provided by the buyer.":"Okres gwarancji wynosi 12 miesięcy. W tym czasie, jeśli jakaś część ulegnie awarii z przyczyn niewynikających z niewłaściwego użytkowania, sprzedawca wymieni ją bezpłatnie na podstawie zdjęć uszkodzonych części dostarczonych przez kupującego.",
  "Can I request maintenance for my golf cart?":"Czy mogę zamówić konserwację mojego wózka golfowego?",
  "Yes, you can request maintenance through the website under the 'Service' section. We also offer repair services for golf carts not purchased from us, subject to prior assessment.":"Tak, możesz zamówić konserwację przez stronę internetową w sekcji „Serwis”. Oferujemy również naprawy wózków golfowych zakupionych gdzie indziej, po wcześniejszej ocenie.",
  "Can I modify my configuration after ordering?":"Czy mogę zmienić konfigurację po złożeniu zamówienia?",
  "Yes, modifications can be requested up to 7 days after paying the deposit.":"Tak, zmiany można zgłaszać do 7 dni po zapłacie zaliczki.",
  "Can I add options after delivery?":"Czy mogę dodać opcje po dostawie?",
  "Yes, you can add options after delivery. These will require a separate payment and a new quote.":"Tak, możesz dodać opcje po dostawie. Będzie to wymagało oddzielnej płatności i nowej wyceny.",
  "Is the quote binding?":"Czy wycena jest wiążąca?",
  "No, the quote is not binding. To start building your custom golf cart, a 40% deposit of the total configured value is required.":"Nie, wycena nie jest wiążąca. Aby rozpocząć budowę Twojego spersonalizowanego wózka golfowego, wymagana jest zaliczka w wysokości 40% całkowitej wartości konfiguracji.",
  "What happens if I cancel after paying the deposit?":"Co się stanie, jeśli anuluję zamówienie po zapłaceniu zaliczki?",
  "If you cancel after paying the deposit, 50% of the deposit amount will be retained as a cancellation fee.":"Jeśli anulujesz zamówienie po zapłaceniu zaliczki, 50% kwoty zaliczki zostanie zatrzymane jako opłata za anulowanie.",
  "Is financing available?":"Czy dostępne jest finansowanie?",
  "Yes, it is possible to finance the purchase through installment payments, to be agreed upon at the time of purchase.":"Tak, możliwe jest sfinansowanie zakupu w ratach, do uzgodnienia w momencie zakupu.",
  "What is the maximum speed and passenger capacity?":"Jaka jest maksymalna prędkość i pojemność pasażerska?",
  "The maximum speed is 30 km/h. The passenger capacity depends on the number of seats chosen during configuration.":"Maksymalna prędkość wynosi 30 km/h. Pojemność pasażerska zależy od liczby miejsc wybranych podczas konfiguracji.",
  "Can I use the golf cart in the rain?":"Czy mogę używać wózka golfowego w deszczu?",
  "Yes, the golf cart can be used in the rain. For added protection, you can add rain covers from the optional accessories section.":"Tak, wózek golfowy można używać w deszczu. Dla dodatkowej ochrony możesz dodać osłony przeciwdeszczowe z sekcji akcesoriów dodatkowych.",
  "Is the golf cart street legal? Do I need insurance?":"Czy wózek golfowy jest dopuszczony do ruchu drogowego? Czy potrzebuję ubezpieczenia?",
  "The golf cart is approved for road use. However, Golf Cart DR declines all responsibility for use that does not comply with the laws and regulations of the Dominican Republic. It is the buyer's responsibility to ensure compliance with local regulations regarding insurance, licensing, and road use.":"Wózek golfowy jest dopuszczony do użytku drogowego. Jednak Golf Cart DR nie ponosi żadnej odpowiedzialności za użytkowanie niezgodne z przepisami i regulacjami Dominikany. Obowiązkiem kupującego jest zapewnienie zgodności z lokalnymi przepisami dotyczącymi ubezpieczenia, uprawnień i użytkowania na drogach.",
  "For Golf":"Do gry w golfa",
  "Road Use":"Do jazdy drogowej",
  "Golf courses":"Pola golfowe",
  "Resorts":"Ośrodki wypoczynkowe",
  "Hotels":"Hotele",
  "Golfers":"Golfiści",
  "Private residences":"Rezydencje prywatne",
  "Gated communities":"Zamknięte osiedla",
  "Villas":"Wille",
  "We use cookies to analyze site traffic and improve your experience. See our Privacy Policy for details.":"Używamy plików cookie do analizy ruchu na stronie i poprawy jakości korzystania z niej. Szczegóły znajdziesz w naszej Polityce prywatności.",
  "Reject":"Odrzuć",
  "Accept":"Akceptuj",
  "7. Cookies and Google Analytics":"7. Pliki cookie i Google Analytics",
  "With your consent, our website uses Google Analytics to collect anonymous statistics on site usage, such as the pages visited, time spent on the site, and the general geographic location of visitors (country/region). This data is collected exclusively to understand how our website is used and to improve it, and is not sold, rented, or shared with third parties for marketing purposes. You can accept or decline this data collection at any time via the cookie banner shown on the site.":"Za Twoją zgodą nasza strona korzysta z Google Analytics w celu zbierania anonimowych statystyk dotyczących korzystania ze strony, takich jak odwiedzone strony, czas spędzony na stronie oraz ogólna lokalizacja geograficzna odwiedzających (kraj/region). Dane te są zbierane wyłącznie w celu zrozumienia, jak korzysta się z naszej strony, i jej ulepszenia, i nie są sprzedawane, wynajmowane ani udostępniane osobom trzecim w celach marketingowych. Możesz zaakceptować lub odrzucić zbieranie tych danych w dowolnym momencie za pomocą banera cookie wyświetlanego na stronie.",
  "60V 100A — Lead-acid":"60V 100A — kwasowo-ołowiowy",
  "72V 100A — Lead-acid":"72V 100A — kwasowo-ołowiowy",
  "Delivery takes approximately 90 days after the initial 35% payment. This is because each golf cart is custom-built according to your configuration.":"Dostawa trwa około 90 dni od pierwszej wpłaty w wysokości 35%. Wynika to z faktu, że każdy wózek golfowy jest budowany na zamówienie zgodnie z Twoją konfiguracją.",
  "Yes, modifications can be requested up to 7 days after the initial 35% payment.":"Tak, zmiany można zgłaszać do 7 dni po pierwszej wpłacie w wysokości 35%.",
  "No, the quote itself is not binding. After placing your order, you have a 14-day window before the initial 35% payment becomes binding, giving you time to confirm every detail of your custom golf cart.":"Nie, sama wycena nie jest wiążąca. Po złożeniu zamówienia masz 14 dni, zanim pierwsza wpłata w wysokości 35% stanie się wiążąca, co daje czas na potwierdzenie każdego szczegółu Twojego spersonalizowanego wózka golfowego.",
  "What happens if I cancel my order?":"Co się stanie, jeśli anuluję zamówienie?",
  "If you cancel within 14 days of placing your order, no fee applies. After that period, once the initial 35% payment is binding, cancelling will retain 50% of that first payment as a cancellation fee.":"Jeśli anulujesz zamówienie w ciągu 14 dni od jego złożenia, nie zostanie naliczona żadna opłata. Po tym okresie, gdy pierwsza wpłata w wysokości 35% staje się wiążąca, anulowanie spowoduje zatrzymanie 50% tej pierwszej wpłaty jako opłaty za anulowanie.",
  "Price includes taxes and transport":"Cena obejmuje podatki i transport",
  "On Order":"Przy zamówieniu",
  "On Completion":"Po zakończeniu",
  "On Delivery":"Przy dostawie",
  "To start building your golf cart":"Aby rozpocząć budowę Twojego wózka golfowego",
  "Verified by photo, video or video call":"Potwierdzone zdjęciem, wideo lub rozmową wideo",
  "Turnkey delivery":"Dostawa pod klucz",
  "Select your language":"Wybierz swój język",
  "I have read and accept the ":"Przeczytałem/am i akceptuję ",
  "$500 OFF your purchase!":"500 USD zniżki na Twój zakup!",
  "Offer valid until December 31, 2026":"Oferta ważna do 31 grudnia 2026",
  "Got it!":"Rozumiem!",
  "Discount":"Zniżka",
  "Subtotal":"Suma częściowa",
  "By continuing, you accept our ":"Kontynuując, akceptujesz naszą ",
  "Designing":"Konfigurowanie",
  "TAAAC's Choice":"Wybór TAAAC",
  "Last Step":"Ostatni Krok",
  "Your Creation":"Twoje Dzieło",
  "You've made every choice.":"Dokonałeś każdego wyboru.",
  "Every detail carries your signature.":"Każdy szczegół niesie twój podpis.",
  "Recommended for daily use.":"Zalecana do codziennego użytku.",
  "We've already chosen the ideal power for daily use. Want a bit more? The choice is yours.":"Już wybraliśmy idealną moc do codziennego użytku. Chcesz więcej? Wybór należy do ciebie.",
  "Our recommended balance between performance, efficiency and daily use.":"Nasza zalecana równowaga między wydajnością, efektywnością a codziennym użytkiem.",
  "Energy from the sun. Included.":"Energia ze słońca. W cenie.",
  "Every Golf Cart is born with a solar panel included. Because under the Caribbean sun, for us, it simply made sense.":"Każdy Golf Cart rodzi się z panelem słonecznym w zestawie. Bo pod karaibskim słońcem, dla nas, to po prostu miało sens.",
  "We've already selected the ideal battery. If you want more range, you can choose to go further.":"Już wybraliśmy idealną baterię. Jeśli chcesz większego zasięgu, możesz wybrać coś więcej.",
  "comfortable":"komfortowy",
  "sporty":"sportowy",
  "You have a configuration in progress for":"Masz niedokończoną konfigurację dla",
  "Do you want to continue where you left off?":"Czy chcesz kontynuować od miejsca, w którym skończyłeś?",
  "Start Over":"Zacznij od Nowa",
  "Create your TAAAC":"Stwórz swój TAAAC",
  "12-Month Warranty Included":"Gwarancja 12 miesięcy w cenie",
  "See details in the FAQ":"Zobacz szczegóły w FAQ",
  "No reviews yet — be the first to share your experience!":"Jeszcze nie ma opinii — bądź pierwszy, który podzieli się swoim doświadczeniem!",
  "We've received your request!":"Otrzymaliśmy Twoje zapytanie!",
  "Follow us":"Obserwuj nas",
  "Can I guide you?":"Czy mogę cię poprowadzić?",
  "Prefer to be guided step by step? Try our virtual assistant →":"Wolisz być prowadzony krok po kroku? Wypróbuj naszego wirtualnego asystenta →",
  "Configure":"Skonfiguruj",
  "First things first — what would you like to name your golf cart?":"Najpierw najważniejsze — jak chciałbyś nazwać swój wózek golfowy?",
  "Get Guided":"Poprowadź Mnie",
  "Golf Course":"Pole Golfowe",
  "Here are a few accessories we recommend:":"Oto kilka akcesoriów, które polecamy:",
  "How to Choose Your Golf Cart":"Jak Wybrać Swój Wózek Golfowy",
  "Let's Start":"Zaczynajmy",
  "Off-Road":"Off-Road",
  "Show me other accessories":"Pokaż mi inne akcesoria",
  "Showing grass tires, ideal for golf courses":"Pokazuję opony trawiaste, idealne na pola golfowe",
  "Showing off-road tires, ideal for rough terrain":"Pokazuję opony terenowe, idealne na trudny teren",
  "Letters only":"Tylko litery",
  "Must start with + and have at least 11 digits":"Musi zaczynać się od + i zawierać co najmniej 11 cyfr",
  "Must contain @":"Musi zawierać @",
  "A gift for your review — TAAAC Solutions":"Prezent za Twoją opinię — TAAAC Solutions",
  "Service & Repairs":"Serwis i Naprawy",
  "Maintenance & Repairs":"Konserwacja i Naprawy",
  "Electric Motor Repair":"Naprawa silnika elektrycznego",
  "Steering Repair":"Naprawa układu kierowniczego",
  "Bodywork":"Naprawa nadwozia",
  "What's included":"Co jest wliczone",
  "Solar panel included on every unit":"Panel słoneczny w zestawie z każdym egzemplarzem",
  "Fully customizable body color, seats and accessories":"W pełni konfigurowalny kolor nadwozia, siedzenia i akcesoria",
  "Seat configurations: 2, 2+2 or 4+2":"Konfiguracje miejsc: 2, 2+2 lub 4+2",
  "Configure this Model":"Skonfiguruj ten model",
  "12-month warranty included":"Gwarancja 12 miesięcy w cenie",
  "Estimated delivery: ~90 days from deposit":"Szacowany czas dostawy: ~90 dni od zadatku",
  "About Us":"O Nas",
  "Our Models":"Nasze Modele",
  "Back to Home":"Powrót do strony głównej",
  "20 customers":"20 klientów",
  "Cancel":"Anuluj",
  "Error sending review. Please try again.":"Błąd podczas wysyłania opinii. Spróbuj ponownie.",
  "Location (optional)":"Lokalizacja (opcjonalnie)",
  "Please fill in your name and review":"Proszę podać imię i opinię",
  "Sending...":"Wysyłanie...",
  "Thank you for your review!":"Dziękujemy za Twoją opinię!",
  "Write a Review":"Napisz Opinię",
  "Your name":"Twoje imię",
  "Your review":"Twoja opinia",
  "Create your unique golf cart":"Stwórz swój unikalny wózek golfowy",
  "and":"i",
  "get it delivered straight to your door":"odbierz go prosto pod swoje drzwi",
  "Custom golf carts, local support and":"Personalizowane wózki golfowe, lokalne wsparcie i",
  "delivery throughout the Dominican Republic.":"dostawa na terenie całej Republiki Dominikańskiej.",
  "Get Started":"Zacznij Teraz",
  "Create your personal golf cart and":"Stwórz swój osobisty wózek golfowy i",
  "get it delivered straight to your door.":"odbierz go prosto pod swoje drzwi.",
  "Freedom is measured by the emotions you live along the way.":"Wolność mierzy się emocjami, które przeżywasz po drodze.",
  "Golf Cart Guides":"Poradniki o wózkach golfowych",
  "See All Guides →":"Zobacz wszystkie poradniki →",
  "Choose Your Cart":"Wybierz swój wózek",
  "How to Choose a Golf Cart":"Jak wybrać wózek golfowy",
  "2, 4 or 6 Seats":"2, 4 lub 6 miejsc",
  "Battery & Power":"Bateria i moc",
  "Lithium vs Lead":"Lit kontra ołów",
  "48V vs 72V":"48V vs 72V",
  "Buying & Maintenance":"Zakup i konserwacja",
  "What to Check Before Buying":"Co sprawdzić przed zakupem",
  "Caring for It Near the Sea":"Pielęgnacja wózka nad morzem",
};
function pl(en) { return PL_DICT[en] || en; }

const MODELS = [
  { id:"A", name:"Model A / Modelo A / Modello A", price:8990, tag:"Classic",imgKey:"modA",
    desc:{it:"Classico ed elegante. Perfetto per campi da golf, resort e hotel.",es:"Clásico y elegante. Perfecto para campos de golf, resorts y hoteles.",en:"Classic and elegant. Perfect for golf courses, resorts and hotels."},
    specs:{it:{"Velocità":"30 km/h","Autonomia":"80-100 km","Pendenza":"25%","Motore":"3.5kW AC"},es:{"Velocidad":"30 km/h","Autonomía":"80-100 km","Pendiente":"25%","Motor":"3.5kW AC"},en:{"Speed":"30 km/h","Range":"80-100 km","Slope":"25%","Motor":"3.5kW AC"}}},
  { id:"B", name:"Model B / Modelo B / Modello B", price:9506, tag:"Off-Road",imgKey:"modB",
    desc:{it:"Off-road potente. Conquista ogni terreno.",es:"Todoterreno potente. Conquista cualquier terreno.",en:"Powerful off-road. Conquers any terrain."},
    specs:{it:{"Velocità":"30 km/h","Autonomia":"80-100 km","Pendenza":"25%","Motore":"4kW AC"},es:{"Velocidad":"30 km/h","Autonomía":"80-100 km","Pendiente":"25%","Motor":"4kW AC"},en:{"Speed":"30 km/h","Range":"80-100 km","Slope":"25%","Motor":"4kW AC"}}},
  { id:"C", name:"Model C / Modelo C / Modello C", price:9588, tag:"Sport",imgKey:"modC",
    desc:{it:"Sportivo e raffinato. Sedili in pelle e cerchi premium.",es:"Deportivo y refinado. Asientos de cuero y llantas premium.",en:"Sporty and refined. Leather seats and premium wheels."},
    specs:{it:{"Velocità":"30 km/h","Autonomia":"80-100 km","Pendenza":"25%","Motore":"4kW AC"},es:{"Velocidad":"30 km/h","Autonomía":"80-100 km","Pendiente":"25%","Motor":"4kW AC"},en:{"Speed":"30 km/h","Range":"80-100 km","Slope":"25%","Motor":"4kW AC"}}},
  { id:"D", name:"Model D / Modelo D / Modello D", price:9672, tag:"Family",imgKey:"modD",
    desc:{it:"Massimo comfort per famiglie e gruppi.",es:"Máximo confort familiar. Espacio extra con portapalos de golf.",en:"Maximum family comfort. Extra space with golf bag holder."},
    specs:{it:{"Velocità":"30 km/h","Autonomia":"80-100 km","Pendenza":"25%","Motore":"4kW AC"},es:{"Velocidad":"30 km/h","Autonomía":"80-100 km","Pendiente":"25%","Motor":"4kW AC"},en:{"Speed":"30 km/h","Range":"80-100 km","Slope":"25%","Motor":"4kW AC"}}},
];

const SEATS_OPTIONS = [
  {id:"2",it:"2 Posti",es:"2 Plazas",en:"2 Seats",imgKey:"mod2p",descIt:"Compatto e agile",descEs:"Compacto y ágil",descEn:"Compact and agile"},
  {id:"2+2",it:"2+2 Posti",es:"2+2 Plazas",en:"2+2 Seats",imgKey:"mod2p2",descIt:"Con sedile posteriore",descEs:"Con asiento trasero",descEn:"With rear seat"},
  {id:"4",it:"4 Posti",es:"4 Plazas",en:"4 Seats",imgKey:"seat4p",descIt:"Ideale per famiglie",descEs:"Ideal para familias",descEn:"Ideal for families"},
  {id:"4+2",it:"4+2 Posti",es:"4+2 Plazas",en:"4+2 Seats",imgKey:"mod4p2",descIt:"Spazio extra posteriore",descEs:"Espacio extra trasero",descEn:"Extra rear space"},
  {id:"other",it:"Altre sedute",es:"Otras plazas",en:"Other Seats",imgKey:null,descIt:"Su richiesta",descEs:"Bajo pedido",descEn:"On request"},
];
const SEAT_PRICE_EXTRA = {
  A: {"2":0, "2+2":1169, "4":226, "4+2":610},
  B: {"2":0, "2+2":1265, "4":279, "4+2":782},
  C: {"2":0, "2+2":1250, "4":280, "4+2":783},
  D: {"2":0, "2+2":1249, "4":278, "4+2":699},
};

const TIRE_PRICE_EXTRA = {
  A: {"offroad-12":0, "offroad-14":205, "grass-10":0, "grass-12":130, "grass-14":210},
  B: {"offroad-12":0, "offroad-14":95, "grass-12":0, "grass-14":96},
  C: {"offroad-12":0, "offroad-14":95, "grass-12":0, "grass-14":96},
  D: {"offroad-12":0, "offroad-14":95, "grass-12":0, "grass-14":96},
};


const RAL_COLORS = [
  {code:"RAL 9010",hex:"#FFFFFF",it:"Bianco puro",es:"Blanco puro",en:"Pure white"},
  {code:"RAL 9001",hex:"#FDF4E3",it:"Bianco crema",es:"Blanco crema",en:"Cream white"},
  {code:"RAL 9002",hex:"#E7EBDA",it:"Bianco grigiastro",es:"Blanco grisáceo",en:"Grey white"},
  {code:"RAL 9003",hex:"#F4F4F4",it:"Bianco",es:"Blanco",en:"White"},
  {code:"RAL 9016",hex:"#F6F6F6",it:"Bianco",es:"Blanco",en:"White"},
  {code:"RAL 7035",hex:"#D7D7D7",it:"Grigio chiaro",es:"Gris claro",en:"Light grey"},
  {code:"RAL 7001",hex:"#8A9597",it:"Grigio argento",es:"Gris plata",en:"Silver grey"},
  {code:"RAL 7016",hex:"#293133",it:"Grigio antracite",es:"Gris antracita",en:"Anthracite grey"},
  {code:"RAL 7021",hex:"#23282B",it:"Grigio nero",es:"Gris negro",en:"Black grey"},
  {code:"RAL 9004",hex:"#282828",it:"Nero",es:"Negro",en:"Black"},
  {code:"RAL 9005",hex:"#0A0A0A",it:"Nero intenso",es:"Negro intenso",en:"Jet black"},
  {code:"RAL 9011",hex:"#1C1C1C",it:"Nero grafite",es:"Negro grafito",en:"Graphite black"},
  {code:"RAL 3000",hex:"#AF2B1E",it:"Rosso fiamma",es:"Rojo llama",en:"Flame red"},
  {code:"RAL 3002",hex:"#A52019",it:"Rosso carminio",es:"Rojo carmín",en:"Carmine red"},
  {code:"RAL 3020",hex:"#CC0500",it:"Rosso",es:"Rojo",en:"Red"},
  {code:"RAL 2000",hex:"#ED760E",it:"Arancio",es:"Naranja",en:"Orange"},
  {code:"RAL 2009",hex:"#F54021",it:"Arancio",es:"Naranja",en:"Orange"},
  {code:"RAL 1003",hex:"#F9A800",it:"Giallo",es:"Amarillo",en:"Yellow"},
  {code:"RAL 1018",hex:"#F3DA0B",it:"Giallo zinco",es:"Amarillo zinc",en:"Zinc yellow"},
  {code:"RAL 6001",hex:"#28713E",it:"Verde smeraldo",es:"Verde esmeralda",en:"Emerald green"},
  {code:"RAL 6010",hex:"#35682D",it:"Verde erba",es:"Verde hierba",en:"Grass green"},
  {code:"RAL 6018",hex:"#57A639",it:"Giallo-verde",es:"Amarillo-verde",en:"Yellow-green"},
  {code:"RAL 6024",hex:"#008754",it:"Verde",es:"Verde",en:"Green"},
  {code:"RAL 5002",hex:"#20214F",it:"Blu ultramarino",es:"Azul ultramarino",en:"Ultramarine blue"},
  {code:"RAL 5005",hex:"#1F3438",it:"Blu",es:"Azul",en:"Blue"},
  {code:"RAL 5015",hex:"#2271B3",it:"Blu cielo",es:"Azul cielo",en:"Sky blue"},
  {code:"RAL 5017",hex:"#065F8D",it:"Blu",es:"Azul",en:"Blue"},
  {code:"RAL 5024",hex:"#6A93B0",it:"Blu pastello",es:"Azul pastel",en:"Pastel blue"},
  {code:"RAL 4006",hex:"#A03472",it:"Viola",es:"Violeta",en:"Purple"},
  {code:"RAL 8001",hex:"#955F20",it:"Marrone ocra",es:"Marrón ocre",en:"Ochre brown"},
  {code:"RAL 8017",hex:"#45322E",it:"Marrone cioccolato",es:"Marrón chocolate",en:"Chocolate brown"},
];

const SEAT_COLORS = [
  {id:1,hex:"#C8B89A",it:"Beige sabbia",es:"Beige arena",en:"Sand beige"},
  {id:2,hex:"#8B7355",it:"Marrone cammello",es:"Marrón camello",en:"Camel brown"},
  {id:3,hex:"#5C4033",it:"Cioccolato",es:"Chocolate",en:"Chocolate"},
  {id:4,hex:"#1a1a1a",it:"Nero",es:"Negro",en:"Black"},
  {id:5,hex:"#2C3E50",it:"Blu notte",es:"Azul noche",en:"Night blue"},
  {id:6,hex:"#8B0000",it:"Bordeaux",es:"Burdeos",en:"Bordeaux"},
  {id:7,hex:"#808080",it:"Grigio",es:"Gris",en:"Grey"},
  {id:8,hex:"#D2691E",it:"Cognac",es:"Coñac",en:"Cognac"},
  {id:9,hex:"#F5F5DC",it:"Bianco crema",es:"Blanco crema",en:"Cream white"},
  {id:10,hex:"#228B22",it:"Verde bosco",es:"Verde bosque",en:"Forest green"},
  {id:11,hex:"#E74C3C",it:"Rosso sportivo",es:"Rojo deportivo",en:"Sport red"},
  {id:12,hex:"#F39C12",it:"Arancio",es:"Naranja",en:"Orange"},
];

const BATTERIES = [
  {id:"48v150a-piombo",it:"48V 150A — Batteria al piombo-acido",es:"48V 150A — Batería de plomo-ácido",en:"48V 150A — Lead-acid battery",recommended:false},
    {id:"48v150a-litio",it:"48V 150A — Batteria al litio",es:"48V 150A — Batería de litio",en:"48V 150A — Lithium battery",recommended:true},
  {id:"60v100a-piombo",it:"60V 100A — Piombo-acido",es:"60V 100A — Plomo-ácido",en:"60V 100A — Lead-acid",recommended:false},
  {id:"72v100a-piombo",it:"72V 100A — Piombo-acido",es:"72V 100A — Plomo-ácido",en:"72V 100A — Lead-acid",recommended:false},
  {id:"60v150a-litio",it:"60V 150A — Batteria al litio",es:"60V 150A — Batería de litio",en:"60V 150A — Lithium battery",recommended:false},
];

const MOTORS = [
  {id:"3.5kw",it:"3.5 kW",es:"3.5 kW",en:"3.5 kW",descIt:"Efficiente e silenzioso",descEs:"Eficiente y silencioso",descEn:"Efficient and silent"},
  {id:"4kw",it:"4 kW",es:"4 kW",en:"4 kW",descIt:"Equilibrio perfetto",descEs:"Equilibrio perfecto",descEn:"Perfect balance"},
  {id:"5kw",it:"5 kW",es:"5 kW",en:"5 kW",descIt:"Massima potenza",descEs:"Máxima potencia",descEn:"Maximum power"},
];

const SEAT_TYPES = [
  {id:"standard",it:"Sedile Standard",es:"Asiento Estándar",en:"Standard Seat",imgKey:"seat_std",descIt:"Ergonomico e confortevole. Default.",descEs:"Ergonómico y confortable. Por defecto.",descEn:"Ergonomic and comfortable. Default."},
  {id:"sport",it:"Sedile Sport",es:"Asiento Sport",en:"Sport Seat",imgKey:"seat_sport",price:68,descIt:"Pelle nera con cuciture rosse.",descEs:"Cuero negro con costuras rojas.",descEn:"Black leather with red stitching."},
  {id:"premium",it:"Sedile Premium Imbottito",es:"Asiento Premium Acolchado",en:"Premium Padded Seat",imgKey:"seat_prem",price:104,descIt:"Ispessito con cintura integrata.",descEs:"Reforzado con cinturón integrado.",descEn:"Thickened with integrated seatbelt."},
  {id:"premium-headrest",it:"Premium con Poggiatesta",es:"Premium con Reposacabezas",en:"Premium with Headrest",imgKey:"seat_head",price:117,descIt:"Massimo comfort con poggiatesta.",descEs:"Máximo confort con reposacabezas.",descEn:"Maximum comfort with headrests."},
];

const TIRES = [
  {id:"grass-10",it:"Da Erba 10\"",es:"Césped 10\"",en:"Grass 10\"",imgKey:"tire_g10",type:"grass",default:true,descIt:"Standard per campi da golf",descEs:"Estándar para campos de golf",descEn:"Standard for golf courses"},
  {id:"grass-12",it:"Da Erba 12\"",es:"Césped 12\"",en:"Grass 12\"",imgKey:"tire_g12",type:"grass",default:false,descIt:"Maggiore stabilità",descEs:"Mayor estabilidad",descEn:"Greater stability"},
  {id:"grass-14",it:"Da Erba 14\"",es:"Césped 14\"",en:"Grass 14\"",imgKey:"tire_g14",type:"grass",default:false,descIt:"Massima superficie di contatto",descEs:"Máxima superficie de contacto",descEn:"Maximum contact surface"},
  {id:"offroad-12",it:"Off-Road 12\"",es:"Todoterreno 12\"",en:"Off-Road 12\"",imgKey:"tire_or12",type:"offroad",default:false,descIt:"Pneumatico tassellato",descEs:"Neumático con tacos",descEn:"Knobby tire"},
  {id:"offroad-14",it:"Off-Road 14\"",es:"Todoterreno 14\"",en:"Off-Road 14\"",imgKey:"tire_or14",type:"offroad",default:false,descIt:"Tassellato aggressivo premium",descEs:"Taco agresivo premium",descEn:"Premium aggressive knobby"},
];

const STEERING = [
  {id:"standard",it:"Volante Standard",es:"Volante Estándar",en:"Standard Steering Wheel",imgKey:"steer_std",descIt:"Nero classico, incluso in tutti i modelli",descEs:"Negro clásico, incluido en todos los modelos",descEn:"Classic black, included in all models"},
  {id:"sport",it:"Volante Sportivo",es:"Volante Deportivo",en:"Sport Steering Wheel",imgKey:"steer_sp",price:50,descIt:"Carbon fiber con display e dettagli rossi",descEs:"Fibra de carbono con pantalla y detalles rojos",descEn:"Carbon fiber with display and red details",models:["B","C","D"]},
  {id:"carbon",it:"Volante Carbon Fiber",es:"Volante Fibra de Carbono",en:"Carbon Fiber Wheel",imgKey:"steer_cf",price:50,descIt:"Pelle nera con raggi in carbon fiber",descEs:"Cuero negro con radios de fibra de carbono",descEn:"Black leather with carbon fiber spokes",models:["B","C","D"]},
];

const WINDSHIELDS = [
  {id:"standard",it:"Parabrezza Standard",es:"Parabrisas Estándar",en:"Standard Windshield",imgKey:"wind_std",descIt:"Trasparente fisso, classico",descEs:"Transparente fijo, clásico",descEn:"Fixed transparent, classic"},
  {id:"fold-transparent",it:"Pieghevole Trasparente",es:"Plegable Transparente",en:"Folding Transparent",imgKey:"wind_ft",price:15,descIt:"Trasparente apribile",descEs:"Transparente plegable",descEn:"Foldable transparent"},
  {id:"fold-brown",it:"Pieghevole Marrone",es:"Plegable Marrón",en:"Folding Brown",imgKey:"wind_fb",price:68,descIt:"Fumé/bronzo apribile",descEs:"Ahumado/bronce plegable",descEn:"Smoked/bronze foldable"},
  {id:"tempered",it:"Parabrezza Temperato",es:"Parabrisas Templado",en:"Tempered Windshield",imgKey:"wind_tmp",price:68,descIt:"Vetro temperato, massima resistenza",descEs:"Vidrio templado, máxima resistencia",descEn:"Tempered glass, maximum resistance"},
];

const OPTIONAL_ITEMS = [
  {id:"solar",it:"Pannello Solare 500W",es:"Panel Solar 500W",en:"500W Solar Panel",imgKey:"solar",always:true,price:0,descIt:"Ricarica solare integrata. Sempre incluso.",descEs:"Carga solar integrada. Siempre incluido.",descEn:"Integrated solar charging. Always included."},
  {id:"rain-cover",it:"Copertura Anti-Pioggia",es:"Cubierta Antiluvia",en:"Rain Cover",imgKey:"opt_rain",price:180,descIt:"Protezione completa da pioggia e vento.",descEs:"Protección completa contra lluvia y viento.",descEn:"Full protection from rain and wind."},
  {id:"car-cover",it:"Cover di Protezione",es:"Funda de Protección",en:"Protective Cover",imgKey:"opt_cover",price:50,descIt:"Telo protettivo integrale per la sosta.",descEs:"Cubierta protectora integral para estacionar.",descEn:"Full protective cover for parking."},
  {id:"sunshade",it:"Tende Parasole",es:"Cortinas Parasol",en:"Sun Shade Curtains",imgKey:"opt_sun",price:40,descIt:"Tende avvolgibili contro il sole tropicale.",descEs:"Cortinas enrollables contra el sol tropical.",descEn:"Roll-up curtains against tropical sun."},
  {id:"mirror-led",it:"Specchietti con LED",es:"Espejos con LED",en:"LED Mirrors",imgKey:"opt_mirror",price:60,descIt:"Specchietti con indicatori LED integrati.",descEs:"Espejos con indicadores LED integrados.",descEn:"Mirrors with integrated LED indicators."},
  {id:"roof-spots",it:"Faretti LED sul Tetto",es:"Focos LED en Techo",en:"Roof LED Spotlights",imgKey:"opt_spots",price:100,descIt:"4 fari ad alta luminosità per la notte.",descEs:"4 focos de alta luminosidad para la noche.",descEn:"4 high-brightness lights for nighttime."},
  {id:"led-strip",it:"Striscia LED Sottotetto",es:"Tira LED Bajo Techo",en:"Under-Roof LED Strip",imgKey:"opt_led",price:120,descIt:"Illuminazione ambientale in LED blu.",descEs:"Iluminación ambiental en LED azul.",descEn:"Ambient LED blue lighting."},
  {id:"emergency-kit",it:"Kit Luci Emergenza",es:"Kit Luces Emergencia",en:"Emergency Light Kit",imgKey:"opt_emerg",price:140,descIt:"Lampeggianti + sirena professionale.",descEs:"Destelladores + sirena profesional.",descEn:"Flashers + professional siren."},
  {id:"display",it:"Display Touch Screen",es:"Pantalla Táctil",en:"Touch Screen Display",imgKey:"opt_disp",price:150,descIt:"Schermo digitale con dati veicolo.",descEs:"Pantalla digital con datos del vehículo.",descEn:"Digital screen with vehicle data."},
  {id:"stereo",it:"Stereo Bluetooth",es:"Estéreo Bluetooth",en:"Bluetooth Stereo",imgKey:"opt_stereo",price:220,descIt:"Sistema audio 4 altoparlanti con LED.",descEs:"Sistema de audio 4 altavoces con LED.",descEn:"4-speaker audio system with LED."},
  {id:"rear-table",it:"Tavolino Posteriore",es:"Mesa Trasera",en:"Rear Folding Table",imgKey:"opt_table",price:100,descIt:"Tavolino pieghevole posteriore.",descEs:"Mesa plegable trasera.",descEn:"Rear foldable table."},
  {id:"front-light",it:"Faro LED Frontale",es:"Faro LED Frontal",en:"Front LED Light",imgKey:"opt_frtlt",price:60,descIt:"Barra LED frontale aggiuntiva.",descEs:"Barra LED frontal adicional.",descEn:"Additional front LED bar."},
  {id:"rear-lights",it:"Luci Targa + Stop LED",es:"Luces Placa + Stop LED",en:"License + LED Stop Lights",imgKey:"opt_rearlt",price:60,descIt:"Kit luci posteriori LED.",descEs:"Kit de luces traseras LED.",descEn:"Rear LED lights kit."},
  {id:"rear-seat-belt",it:"Sedile con Cintura",es:"Asiento con Cinturón",en:"Seat with Seatbelt",imgKey:"opt_rseat",price:50,descIt:"Sedile posteriore con cintura omologata.",descEs:"Asiento trasero con cinturón homologado.",descEn:"Rear seat with certified seatbelt."},
  {id:"rear-platform",it:"Pianale Ribaltabile",es:"Plataforma Abatible",en:"Folding Platform",imgKey:"opt_rplat",price:110,descIt:"Solo modelli +2. Piattaforma ribaltabile.",descEs:"Solo modelos +2. Plataforma abatible.",descEn:"+2 models only. Folding platform.",noteEn:"+2 models only",noteEs:"Solo modelos +2",noteIt:"Solo modelli +2"},
  {id:"storage-cover",it:"Vano Bagagli",es:"Compartimento Equipaje",en:"Luggage Compartment",imgKey:"opt_storecov",price:160,descIt:"Vano posteriore con copertura.",descEs:"Compartimento trasero con cubierta.",descEn:"Rear compartment with cover."},
  {id:"ball-box",it:"Porta Palline Golf",es:"Portapelotas Golf",en:"Golf Ball Holder",imgKey:"opt_ball",price:120,descIt:"Contenitore specifico per palline golf.",descEs:"Contenedor específico para pelotas de golf.",descEn:"Specific container for golf balls."},
  {id:"front-basket",it:"Cestello Frontale",es:"Cesta Frontal",en:"Front Basket",imgKey:"opt_fbask",price:70,descIt:"Cestello in rete sul cofano anteriore.",descEs:"Cesta de red en el capó delantero.",descEn:"Net basket on front hood."},
  {id:"rear-trunk",it:"Baule Posteriore",es:"Maletero Trasero",en:"Rear Trunk",imgKey:"opt_trunk",price:160,descIt:"Vano chiuso con serratura.",descEs:"Compartimento cerrado con cerradura.",descEn:"Locked rear storage box."},
  {id:"windshield-wiper",it:"Tergicristallo",es:"Limpiaparabrisas",en:"Windshield Wiper",imgKey:"opt_wiper",price:60,descIt:"Tergicristallo per parabrezza temperato.",descEs:"Limpiaparabrisas para parabrisas templado.",descEn:"Wiper for tempered windshield."},
  {id:"side-steps",it:"Pedane in Alluminio",es:"Estribos de Aluminio",en:"Aluminum Steps",imgKey:"opt_steps",price:70,descIt:"Pedane antiscivolo laterali.",descEs:"Estribos antideslizantes laterales.",descEn:"Anti-slip side running boards."},
  {id:"tow-hook",it:"Gancio Traino",es:"Gancho Remolque",en:"Tow Hook",imgKey:"opt_tow",price:170,descIt:"Aggancio a sfera cromato posteriore.",descEs:"Enganche de bola cromado trasero.",descEn:"Chrome rear ball hitch."},
  {id:"water-dispenser",it:"Porta Bottiglie",es:"Portabotella",en:"Bottle Holder",imgKey:"opt_water",price:70,descIt:"Dispenser integrato per bottiglie.",descEs:"Dispensador integrado para botellas.",descEn:"Integrated bottle dispenser."},
  {id:"rear-pedals",it:"Pedane Posteriori",es:"Estribos Traseros",en:"Rear Steps",imgKey:"opt_pedals",price:50,descIt:"Pedane antiscivolo posteriori.",descEs:"Estribos antideslizantes traseros.",descEn:"Rear anti-slip steps."},
  {id:"cargo-bed",it:"Cassone da Lavoro",es:"Caja de Carga",en:"Cargo Bed",imgKey:"opt_cargo",price:110,descIt:"Pianale posteriore con sponde alte.",descEs:"Plataforma trasera con paredes altas.",descEn:"Rear platform with high sides."},
  {id:"rear-platform-open",it:"Pianale con Corrimano",es:"Plataforma con Baranda",en:"Platform with Railing",imgKey:"opt_ropen",price:110,descIt:"Piano carico con corrimano tubolare.",descEs:"Plataforma de carga con barandilla.",descEn:"Load platform with tubular railing."},
  {id:"bull-bar",it:"Bull Bar Frontale",es:"Bull Bar Frontal",en:"Front Bull Bar",imgKey:"opt_bull",price:80,descIt:"Paraurti tubolare rinforzato anteriore.",descEs:"Parachoques tubular reforzado delantero.",descEn:"Reinforced front tubular bumper."},
  {id:"marine-speaker",it:"Speaker Marino LED",es:"Altavoz Marino LED",en:"Marine LED Speaker",imgKey:"opt_speak",price:160,descIt:"Altoparlante impermeabile con LED blu.",descEs:"Altavoz impermeable con LED azul.",descEn:"Waterproof speaker with blue LED."},
  {id:"carbon-dash",it:"Pannello Carbon Fiber",es:"Panel Fibra de Carbono",en:"Carbon Fiber Panel",imgKey:"opt_cdash",price:150,descIt:"Cruscotto carbon fiber con Start/Stop.",descEs:"Salpicadero de fibra de carbono con Start/Stop.",descEn:"Carbon fiber dashboard with Start/Stop.",models:["B","C","D"]},
  {id:"vertical-display",it:"Display Touch Verticale",es:"Pantalla Táctil Vertical",en:"Vertical Touch Display",imgKey:"opt_vdisp",price:300,descIt:"Schermo verticale con velocità e musica.",descEs:"Pantalla vertical con velocidad y música.",descEn:"Vertical screen with speed and music.",models:["B","C","D"]},
];

const STEPS = [
  {it:"Nome",es:"Nombre",en:"Name"},
  {it:"Modello",es:"Modelo",en:"Model"},
  {it:"Colore",es:"Color",en:"Color"},
  {it:"Numero di posti",es:"Plazas",en:"Seats"},
  {it:"Sedile",es:"Asiento",en:"Seat"},
  {it:"Esterni",es:"Externos",en:"Exterior"},
  {it:"Motore",es:"Motor",en:"Engine"},
  {it:"Optional",es:"Opcionales",en:"Options"},
  {it:"Creazione",es:"Creación",en:"Creation"},
  {it:"Riepilogo",es:"Resumen",en:"Summary"},
  {it:"Conferma",es:"Confirmar",en:"Confirm"},
];

function Img({k, style={}, eager=false}) {
  if (!IMGS[k]) return null;
  return (
    <img
      src={IMGS[k]}
      alt=""
      loading={eager ? "eager" : "lazy"}
      decoding="async"
      style={{objectFit:"contain", ...style}}
    />
  );
}

function GolfCartPreview({bodyColor="#ffffff", seatColor="#C8B89A"}) {
  return (
    <svg viewBox="0 0 320 200" style={{width:"100%",maxWidth:320,filter:"drop-shadow(0 8px 24px rgba(0,0,0,0.6))"}}>
      <ellipse cx="160" cy="52" rx="110" ry="18" fill={bodyColor} opacity="0.9"/>
      <rect x="50" y="52" width="220" height="8" fill={bodyColor} opacity="0.85"/>
      <rect x="62" y="56" width="8" height="60" fill="#333" rx="2"/>
      <rect x="250" y="56" width="8" height="60" fill="#333" rx="2"/>
      <rect x="50" y="105" width="220" height="55" rx="14" fill={bodyColor}/>
      <ellipse cx="80" cy="132" rx="35" ry="22" fill={bodyColor}/>
      <rect x="45" y="118" width="40" height="30" rx="6" fill={bodyColor}/>
      <rect x="42" y="122" width="14" height="8" rx="3" fill="#ffe082"/>
      <rect x="100" y="108" width="40" height="28" rx="6" fill={seatColor}/>
      <rect x="148" y="108" width="40" height="28" rx="6" fill={seatColor}/>
      <rect x="100" y="100" width="38" height="14" rx="4" fill={seatColor} opacity="0.8"/>
      <rect x="148" y="100" width="38" height="14" rx="4" fill={seatColor} opacity="0.8"/>
      <rect x="90" y="72" width="140" height="38" rx="4" fill="rgba(180,220,255,0.18)" stroke="rgba(255,255,255,0.18)" strokeWidth="1.5"/>
      <circle cx="90" cy="163" r="22" fill="#222"/><circle cx="90" cy="163" r="14" fill="#555"/><circle cx="90" cy="163" r="6" fill="#888"/>
      <circle cx="230" cy="163" r="22" fill="#222"/><circle cx="230" cy="163" r="14" fill="#555"/><circle cx="230" cy="163" r="6" fill="#888"/>
      <rect x="260" y="118" width="18" height="30" rx="4" fill={bodyColor} opacity="0.85"/>
      <rect x="262" y="128" width="10" height="6" rx="2" fill="#ff1744" opacity="0.9"/>
      <rect x="68" y="152" width="184" height="12" rx="4" fill={bodyColor} opacity="0.6"/>
    </svg>
  );
}




// ── SERVICE CONFIRM v2 — reuses CustomerForm style ──
function ServiceConfirm({serviceNote, goBack, goHome, lang="en"}) {
  const t = (en,es,it) => lang==="ru"?ru(en):lang==="fr"?fr(en):lang==="pl"?pl(en):lang==="es"?es:lang==="it"?it:en;
  const [sent, setSent] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const [fieldErrors, setFieldErrors] = useState({});
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
      <h2 style={{color:"#C9A84C",fontSize:24,fontWeight:800,marginBottom:12}}>{t("Booking Sent!","¡Reserva Enviada!","Prenotazione Inviata!")}</h2>
      <p style={{color:"#888",fontSize:14,maxWidth:440,margin:"0 auto 24px",lineHeight:1.7}}>
        {t("Our team will contact you within 24 hours.","Le contactaremos en 24 horas.","Ti contatteremo entro 24 ore.")}
      </p>
      <button style={gold} onClick={goHome}>🏠 Home</button>
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
    if(!nome || !email || !telefono) { alert(t("Please fill Name, Email and Phone","Por favor completa Nombre, Email y Teléfono","Per favore compila Nome, Email e Telefono")); return; }
    const errs = validateFields(nome, telefono, email);
    setFieldErrors(errs);
    if(Object.keys(errs).length > 0) return;

    const msg = [
      "NEW SERVICE BOOKING",
      "=====================================",
      serviceNote,
      "",
      "CUSTOMER INFO:",
      "Name: "+nome+" "+cognome,
      "Phone: "+telefono,
      "Email: "+email,
      "Address: "+indirizzo,
      "Location: "+consegna,
      "Notes: "+note,
    ].join("\n");

    setIsSending(true);
    try {
      await window.emailjs.send("service_f1ysovn","template_e36a3gp",{
        to_email:"info@taaac.solutions",
        subject:"Golf Cart SERVICE - "+nome+" "+cognome,
        message:msg,
        name:nome+" "+cognome,
        from_name:nome+" "+cognome,
        from_email:email,
        email:email,
        phone:telefono,
      },"G_ndpmoIfpB6oi8pP");

      try {
        const confirmTemplates = {
          en: "Hi {name},\n\nWe've received your service request! Our team will contact you within 24 hours.\n\nThank you for choosing TAAAC Solutions.",
          es: "Hola {name},\n\n¡Hemos recibido tu solicitud de asistencia! Nuestro equipo te contactará dentro de 24 horas.\n\nGracias por elegir TAAAC Solutions.",
          it: "Ciao {name},\n\nAbbiamo ricevuto la tua richiesta di assistenza! Il nostro team ti contatterà entro 24 ore.\n\nGrazie per aver scelto TAAAC Solutions.",
          fr: "Bonjour {name},\n\nNous avons bien reçu ta demande d'assistance ! Notre équipe te contactera sous 24 heures.\n\nMerci d'avoir choisi TAAAC Solutions.",
          pl: "Cześć {name},\n\nOtrzymaliśmy Twoje zgłoszenie serwisowe! Nasz zespół skontaktuje się z Tobą w ciągu 24 godzin.\n\nDziękujemy za wybór TAAAC Solutions.",
          ru: "Привет, {name}!\n\nМы получили твой запрос на обслуживание! Наша команда свяжется с тобой в течение 24 часов.\n\nСпасибо, что выбрал TAAAC Solutions.",
        };
        const confirmMsg = (confirmTemplates[lang] || confirmTemplates.en).split("{name}").join(nome);
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
      }

      setSent(true);
    } catch(err) {
      console.error(err);
      alert(t("Error sending. Please try WhatsApp.","Error al enviar. Prueba WhatsApp.","Errore nell'invio. Prova WhatsApp."));
    } finally {
      setIsSending(false);
    }
  };

  return (
    <div>
      <h2 style={{fontSize:"clamp(1.4rem,4vw,2rem)",fontWeight:800,color:"#F5F0E8",marginBottom:4}}>
        {t("Book a Service","Reservar un Servicio","Prenota un Servizio")}
      </h2>
      <div style={{color:"#888",fontSize:12,marginBottom:16}}>Compila i dati per la prenotazione</div>

      <div style={{background:"#161616",border:"1px solid #C9A84C22",borderRadius:12,padding:14,marginBottom:20}}>
        {serviceNote.split("\n").filter(l=>l.startsWith("-")).map((l,i)=>(
          <div key={i} style={{color:gold,fontSize:13,padding:"4px 0"}}>{l}</div>
        ))}
      </div>

      <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(200px,1fr))",gap:16,marginBottom:20}}>
        <div><div style={{fontSize:11,color:"#888",marginBottom:4}}>{t("Name *","Nombre *","Nome *")}</div><input ref={nomeRef} style={fieldErrors.nome?inpErr:inp} placeholder="Mario"/>{fieldErrors.nome&&<div style={errText}>{fieldErrors.nome}</div>}</div>
        <div><div style={{fontSize:11,color:"#888",marginBottom:4}}>{t("Surname","Apellido","Cognome")}</div><input ref={cognomeRef} style={inp} placeholder="Rossi"/></div>
        <div><div style={{fontSize:11,color:"#888",marginBottom:4}}>{t("Phone *","Teléfono *","Telefono *")}</div><input ref={telefonoRef} defaultValue="+" style={fieldErrors.telefono?inpErr:inp} placeholder="+1 809 000 0000"/>{fieldErrors.telefono&&<div style={errText}>{fieldErrors.telefono}</div>}</div>
        <div><div style={{fontSize:11,color:"#888",marginBottom:4}}>Email *</div><input ref={emailRef} style={fieldErrors.email?inpErr:inp} placeholder="email@example.com"/>{fieldErrors.email&&<div style={errText}>{fieldErrors.email}</div>}</div>
        <div><div style={{fontSize:11,color:"#888",marginBottom:4}}>{t("Address","Dirección","Indirizzo")}</div><input ref={indirizzoRef} style={inp} placeholder="Bayahibe, Dominicus"/></div>
        <div><div style={{fontSize:11,color:"#888",marginBottom:4}}>{t("Delivery location","Lugar de entrega","Luogo consegna")}</div><input ref={consegnaRef} style={inp} placeholder="Hotel, Villa..."/></div>
        <div style={{gridColumn:"1 / -1"}}><div style={{fontSize:11,color:"#888",marginBottom:4}}>{t("Notes","Notas","Note")}</div><textarea ref={noteRef} style={{...inp,minHeight:70,resize:"vertical"}} placeholder="Additional notes..."/></div>
      </div>
      <div style={{display:"flex",justifyContent:"space-between",gap:12,flexWrap:"wrap"}}>
        <button style={out} onClick={goBack}>← {t("Back","Atrás","Indietro")}</button>
        <button style={{...gold, opacity:isSending?0.6:1, cursor:isSending?"not-allowed":"pointer"}} onClick={handleSend} disabled={isSending}>
          {isSending ? "…" : "📩"} {isSending ? t("Sending...","Enviando...","Invio...") : t("Send","Enviar","Invia")}
        </button>
      </div>
    </div>
  );
}

// ── CUSTOMER FORM COMPONENT (inline) ──
export default function App() {
  const VALID_PAGES = ["home","about","configurator","service","contact","faq","privacy","model-a","model-b","model-c","model-d","choose-your-golf-cart","golf-carts-dominican-republic","golf-carts-bayahibe","guias","como-elegir-carrito-de-golf-republica-dominicana","bateria-litio-vs-plomo-carrito-de-golf","48v-vs-72v-carrito-de-golf","carrito-de-golf-2-4-o-6-plazas","que-revisar-antes-de-comprar-carrito-de-golf","mantenimiento-carrito-de-golf-cerca-del-mar"];
  const pathToPage = (pathname) => {
    const clean = pathname.replace(/^\/+|\/+$/g, "");
    if (!clean) return "home";
    return VALID_PAGES.includes(clean) ? clean : "home";
  };
  const pageToPath = (p) => p === "home" ? "/" : "/" + p;

  // Helper riutilizzabile per link interni realmente crawlable (<a href> vero + navigazione SPA)
  // Mantiene: href reale (crawling, copia link, apertura in nuova scheda), click normale = navigazione SPA senza reload,
  // Ctrl/Cmd/Shift/Alt+click o click centrale = comportamento nativo del browser (mai intercettato).
  const navigateTo = (path, e) => {
    if (e && ((typeof e.button === "number" && e.button !== 0) || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey)) return;
    if (e) e.preventDefault();
    setPage(pathToPage(path));
  };

  const [page, setPage] = useState(()=>{
    try {
      const params = new URLSearchParams(window.location.search);
      if (params.has("configura")) return "configurator";
      return pathToPage(window.location.pathname);
    } catch(e) {}
    return "home";
  });
  const [step, setStep] = useState(0);
  const [aStep, setAStep] = useState(0);
  const [aUsage, setAUsage] = useState(null);
  const [aShowMoreOpts, setAShowMoreOpts] = useState(false);
  const [showRobotHint, setShowRobotHint] = useState(true);
  const [lang, setLang] = useState(() => {
    try {
      const supported = ["en","es","it","fr","pl","ru"];
      const browserLangs = (navigator.languages && navigator.languages.length) ? navigator.languages : [navigator.language || "en"];
      for (const bl of browserLangs) {
        const code = String(bl).slice(0,2).toLowerCase();
        if (supported.includes(code)) return code;
      }
    } catch(e) {}
    return "en";
  });
  const [langMenuOpen, setLangMenuOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [guidesOpen, setGuidesOpen] = useState(false);
  const selectLang = (code) => {
    setLang(code);
    setLangMenuOpen(false);
    try {
      if(typeof window.gtag === "function") {
        window.gtag("event", "language_selected", { language: code });
      }
    } catch(e) {}
  };
  const [cookieConsent, setCookieConsent] = useState(()=>{
    try { return localStorage.getItem("cookie_consent"); } catch(e) { return "accepted"; }
  });
  const [showOptionals, setShowOptionals] = useState(false);
  const [showSeatOpts, setShowSeatOpts] = useState(false);
  const [showSteerOpts, setShowSteerOpts] = useState(false);
  const [showWheelOpts, setShowWheelOpts] = useState(false);
  const [showWindOpts, setShowWindOpts] = useState(false);
  const [showBattOpts, setShowBattOpts] = useState(false);
  const [showMotorOpts, setShowMotorOpts] = useState(false);
  const [showOtherInch, setShowOtherInch] = useState(false);
  const [showGrass, setShowGrass] = useState(false);
  const [serviceNote, setServiceNote] = useState("");
  const [prevPage, setPrevPage] = useState("home");
  const t = (en, es, it) => lang==="ru" ? ru(en) : lang==="fr" ? fr(en) : lang==="pl" ? pl(en) : lang==="es" ? es : lang==="it" ? it : en;
  // Estensione a 6 argomenti dello stesso identico pattern di t() sopra — usata solo per contenuto originale
  // (pagine SEO locali) dove servono traduzioni FR/PL/RU dedicate invece del fallback sui dizionari RU/FR/PL_DICT.
  const t6 = (en, es, it, fr, pl, ru) => lang==="ru" ? ru : lang==="fr" ? fr : lang==="pl" ? pl : lang==="es" ? es : lang==="it" ? it : en;
  const scrollTop = () => window.scrollTo({top:0, behavior:"smooth"});

  useEffect(() => {
    window.scrollTo({top:0, behavior:"instant"});
  }, [page, step]);

  useEffect(() => {
    const hintTimer = setTimeout(() => setShowRobotHint(false), 10000);
    return () => { clearTimeout(hintTimer); };
  }, []);

  useEffect(() => {
    if (cookieConsent === "accepted" && window.gtag) {
      window.gtag('consent', 'update', { analytics_storage: 'granted' });
    }
  }, [cookieConsent]);

  const acceptCookies = () => {
    try { localStorage.setItem("cookie_consent", "accepted"); } catch(e) {}
    setCookieConsent("accepted");
  };
  const rejectCookies = () => {
    try { localStorage.setItem("cookie_consent", "rejected"); } catch(e) {}
    setCookieConsent("rejected");
  };

  const [showTip, setShowTip] = useState(false);
  const [sent, setSent] = useState(false);
  const [cfg, setCfg] = useState({
    model:null,seats:null,cartName:"",
    bodyColor:{code:"RAL 9010",hex:"#FFFFFF",it:"Bianco puro",es:"Blanco puro",en:"Pure white"},
    seatColor:{id:9,hex:"#F5F5DC",it:"Bianco crema",es:"Blanco crema",en:"Cream white"},
    battery:"48v150a-litio",motor:null,
    seatType:"standard",tire:"offroad-12",
    steering:"standard",windshield:"standard",
    optionals:["solar"],
    data:{nome:"",cognome:"",telefono:"",email:"",indirizzo:"",consegna:"",note:""},
  });

  const upd = (k,v) => setCfg(p=>({...p,[k]:v}));
  const cartDisplayName = (cfg.cartName && cfg.cartName.trim()) ? cfg.cartName.trim() : "Golf Cart";
  const tName = (en,es,it,fr,pl,ru) => {
    const templates = {en,es,it,fr,pl,ru};
    const template = templates[lang] || templates.en;
    return template.split("{name}").join(cartDisplayName);
  };
  const tNamePrefix = (en,es,it,fr,pl,ru) => {
    const templates = {en,es,it,fr,pl,ru};
    return templates[lang] || templates.en;
  };

  // Funzione SEO centralizzata: aggiorna title, meta description, canonical, og:*, twitter:*
  // Crea i tag se mancanti, li aggiorna se già presenti — mai duplicati.
  const setSEO = (title, description, path) => {
    try {
      document.title = title;
      const url = "https://www.taaac.solutions" + (path === "/" ? "/" : path);
      const setMetaByName = (name, content) => {
        let el = document.querySelector(`meta[name="${name}"]`);
        if(!el) { el = document.createElement("meta"); el.setAttribute("name", name); document.head.appendChild(el); }
        el.setAttribute("content", content);
      };
      const setMetaByProp = (prop, content) => {
        let el = document.querySelector(`meta[property="${prop}"]`);
        if(!el) { el = document.createElement("meta"); el.setAttribute("property", prop); document.head.appendChild(el); }
        el.setAttribute("content", content);
      };
      setMetaByName("description", description);
      setMetaByProp("og:title", title);
      setMetaByProp("og:description", description);
      setMetaByProp("og:url", url);
      setMetaByName("twitter:title", title);
      setMetaByName("twitter:description", description);
      let canonical = document.querySelector('link[rel="canonical"]');
      if(!canonical) { canonical = document.createElement("link"); canonical.setAttribute("rel", "canonical"); document.head.appendChild(canonical); }
      canonical.setAttribute("href", url);
    } catch(e) {}
  };

  // Structured data (Article + BreadcrumbList) per le sole pagine Guida — solo dati realmente disponibili
  // (nessuna data/autore/rating inventati). Rimuove lo script quando si esce da una pagina Guida.
  const GUIDE_HOME_LABEL = { en:"Home", es:"Inicio", it:"Home", fr:"Accueil", pl:"Strona główna", ru:"Главная" };
  const setGuideStructuredData = (headline, description, path, guidesTitle) => {
    try {
      const url = "https://www.taaac.solutions" + path;
      const homeLabel = GUIDE_HOME_LABEL[lang] || GUIDE_HOME_LABEL.en;
      const data = {
        "@context": "https://schema.org",
        "@graph": [
          {
            "@type": "Article",
            "headline": headline,
            "description": description,
            "url": url,
            "inLanguage": lang,
            "publisher": { "@type": "Organization", "name": "TAAAC Solutions" }
          },
          {
            "@type": "BreadcrumbList",
            "itemListElement": [
              { "@type": "ListItem", "position": 1, "name": homeLabel, "item": "https://www.taaac.solutions/" },
              { "@type": "ListItem", "position": 2, "name": guidesTitle, "item": "https://www.taaac.solutions/guias" },
              { "@type": "ListItem", "position": 3, "name": headline, "item": url }
            ]
          }
        ]
      };
      let el = document.getElementById("guide-structured-data");
      if(!el) { el = document.createElement("script"); el.id = "guide-structured-data"; el.type = "application/ld+json"; document.head.appendChild(el); }
      el.textContent = JSON.stringify(data);
    } catch(e) {}
  };
  const removeGuideStructuredData = () => {
    try {
      const el = document.getElementById("guide-structured-data");
      if(el) el.remove();
    } catch(e) {}
  };

  useEffect(() => {
    // Contenuti SEO localizzati EN/ES/IT per ogni pagina pubblica.
    // FR/PL/RU non hanno traduzioni SEO dedicate: t() ricade automaticamente sull'inglese quando la chiave manca nei dizionari RU/FR/PL.
    const seoContent = {
      home: {
        title: t("Custom Electric Golf Carts in Bayahibe | TAAAC Solutions","Golf Carts Eléctricos Personalizados en Bayahibe | TAAAC Solutions","Golf Cart Elettrici Personalizzati a Bayahibe | TAAAC Solutions"),
        description: t("Discover custom electric golf carts in Bayahibe, La Romana, Dominican Republic. Choose your model, personalize your golf cart and contact TAAAC Solutions.","Golf carts eléctricos personalizados en Bayahibe y La Romana, República Dominicana. Elige tu modelo, personalízalo y contáctanos hoy mismo.","Golf cart elettrici su misura a Bayahibe e La Romana, Repubblica Dominicana. Scegli il modello, personalizzalo e contattaci per un preventivo."),
      },
      about: {
        title: t("About TAAAC Solutions | Electric Golf Carts Bayahibe","Sobre TAAAC Solutions | Golf Carts Eléctricos en Bayahibe","Chi Siamo | TAAAC Solutions Golf Cart Elettrici Bayahibe"),
        description: t("Learn about TAAAC Solutions, specializing in custom electric golf carts in Bayahibe and La Romana, Dominican Republic.","Conoce a TAAAC Solutions, especialistas en golf carts eléctricos personalizados en Bayahibe y La Romana, República Dominicana.","Scopri TAAAC Solutions, specialisti in golf cart elettrici personalizzati a Bayahibe e La Romana, Repubblica Dominicana."),
      },
      service: {
        title: t("Golf Cart Service & Repairs in Bayahibe | TAAAC Solutions","Servicio y Reparación de Golf Carts en Bayahibe | TAAAC Solutions","Assistenza e Riparazione Golf Cart a Bayahibe | TAAAC Solutions"),
        description: t("Golf cart maintenance, service and repairs in Bayahibe and La Romana, Dominican Republic. Contact TAAAC Solutions for assistance.","Mantenimiento, servicio técnico y reparación de golf carts en Bayahibe y La Romana, República Dominicana. Contáctanos para recibir asistencia.","Manutenzione, assistenza e riparazione golf cart a Bayahibe e La Romana, Repubblica Dominicana. Contattaci per richiedere assistenza tecnica."),
      },
      contact: {
        title: t("Contact TAAAC Solutions | Golf Carts in Bayahibe","Contacta a TAAAC Solutions | Golf Carts en Bayahibe","Contatta TAAAC Solutions | Golf Cart a Bayahibe"),
        description: t("Contact TAAAC Solutions for electric golf carts, customization, sales and assistance in Bayahibe and La Romana, Dominican Republic.","Contáctanos para conocer nuestros golf carts eléctricos, personalización, ventas y asistencia en Bayahibe y La Romana, República Dominicana.","Contattaci per i nostri golf cart elettrici, personalizzazione, vendita e assistenza a Bayahibe e La Romana, Repubblica Dominicana."),
      },
      faq: {
        title: t("Golf Cart FAQ | TAAAC Solutions Dominican Republic","Preguntas Frecuentes sobre Golf Carts | TAAAC Solutions","Domande Frequenti sui Golf Cart | TAAAC Solutions"),
        description: t("Answers to common questions about electric golf carts, batteries, maintenance, customization and delivery in the Dominican Republic.","Respuestas a las preguntas más frecuentes sobre golf carts eléctricos, baterías, mantenimiento, personalización y entrega en República Dominicana.","Risposte alle domande più frequenti su golf cart elettrici, batterie, manutenzione, personalizzazione e consegna in Repubblica Dominicana."),
      },
      privacy: {
        title: t("Privacy Policy | TAAAC Solutions","Política de Privacidad | TAAAC Solutions","Informativa Privacy | TAAAC Solutions"),
        description: t("Read the TAAAC Solutions privacy policy and learn how personal data is handled and protected.","Consulta la política de privacidad de TAAAC Solutions y descubre cómo protegemos y gestionamos tus datos personales.","Consulta l'informativa privacy di TAAAC Solutions e scopri come trattiamo e proteggiamo i tuoi dati personali."),
      },
      "model-a": {
        title: t("Model A Electric Golf Cart | TAAAC Solutions Dominican Republic","Golf Cart Eléctrico Modelo A | TAAAC Solutions República Dominicana","Golf Cart Elettrico Modello A | TAAAC Solutions Repubblica Dominicana"),
        description: t("Discover the TAAAC Solutions Model A electric golf cart. Custom configurations and accessories available in Bayahibe, La Romana, Dominican Republic.","Descubre el golf cart eléctrico Modelo A de TAAAC Solutions. Configuraciones y accesorios personalizados disponibles en Bayahibe, República Dominicana.","Scopri il golf cart elettrico Modello A di TAAAC Solutions. Configurazioni e accessori personalizzabili disponibili a Bayahibe, Repubblica Dominicana."),
      },
      "model-b": {
        title: t("Model B Off-Road Golf Cart | TAAAC Solutions Dominican Republic","Golf Cart Todoterreno Modelo B | TAAAC Solutions República Dominicana","Golf Cart Off-Road Modello B | TAAAC Solutions Repubblica Dominicana"),
        description: t("Discover the TAAAC Solutions Model B off-road electric golf cart, designed for versatility and customizable in Bayahibe, Dominican Republic.","Conoce el golf cart eléctrico todoterreno Modelo B de TAAAC Solutions, versátil y totalmente personalizable en Bayahibe, República Dominicana.","Scopri il golf cart elettrico off-road Modello B di TAAAC Solutions, versatile e personalizzabile, disponibile a Bayahibe, Repubblica Dominicana."),
      },
      "model-c": {
        title: t("Model C Sport Golf Cart | TAAAC Solutions Dominican Republic","Golf Cart Deportivo Modelo C | TAAAC Solutions República Dominicana","Golf Cart Sportivo Modello C | TAAAC Solutions Repubblica Dominicana"),
        description: t("Discover the sporty TAAAC Solutions Model C electric golf cart with customizable colors, seats and accessories in the Dominican Republic.","Descubre el golf cart eléctrico deportivo Modelo C de TAAAC Solutions, con colores, asientos y accesorios personalizables en República Dominicana.","Scopri il golf cart elettrico sportivo Modello C di TAAAC Solutions, con colori, sedili e accessori personalizzabili in Repubblica Dominicana."),
      },
      "model-d": {
        title: t("Model D Family Golf Cart | TAAAC Solutions Dominican Republic","Golf Cart Familiar Modelo D | TAAAC Solutions República Dominicana","Golf Cart Familiare Modello D | TAAAC Solutions Repubblica Dominicana"),
        description: t("Discover the TAAAC Solutions Model D family electric golf cart, designed for comfort and customizable in Bayahibe, Dominican Republic.","Descubre el golf cart eléctrico familiar Modelo D de TAAAC Solutions, pensado para el confort y personalizable en Bayahibe, República Dominicana.","Scopri il golf cart elettrico familiare Modello D di TAAAC Solutions, pensato per il comfort e personalizzabile a Bayahibe, Repubblica Dominicana."),
      },
      configurator: {
        title: t("Customize Your Electric Golf Cart | TAAAC Solutions Bayahibe","Personaliza tu Golf Cart Eléctrico | TAAAC Solutions Bayahibe","Personalizza il Tuo Golf Cart Elettrico | TAAAC Solutions Bayahibe"),
        description: t("Configure your electric golf cart online. Choose your model, colors, seats, wheels and accessories with TAAAC Solutions in Bayahibe.","Configura tu golf cart eléctrico en línea. Elige modelo, colores, asientos, ruedas y accesorios con TAAAC Solutions en Bayahibe, República Dominicana.","Configura online il tuo golf cart elettrico. Scegli modello, colori, sedili, ruote e accessori con TAAAC Solutions a Bayahibe, Repubblica Dominicana."),
      },
      "choose-your-golf-cart": {
        title: t("How to Choose Your Golf Cart | TAAAC Solutions Bayahibe","Cómo Elegir tu Golf Cart | TAAAC Solutions Bayahibe","Come Scegliere il Tuo Golf Cart | TAAAC Solutions Bayahibe"),
        description: t("Find the right electric golf cart for your needs with the TAAAC Solutions guided assistant in Bayahibe, Dominican Republic.","Encuentra el golf cart eléctrico ideal para ti con el asistente guiado de TAAAC Solutions en Bayahibe, República Dominicana.","Trova il golf cart elettrico più adatto a te con l'assistente guidato di TAAAC Solutions a Bayahibe, Repubblica Dominicana."),
      },
      "golf-carts-dominican-republic": {
        title: t6(
          "Golf Carts for Sale in Dominican Republic | TAAAC Solutions",
          "Carritos de Golf en República Dominicana | TAAAC Solutions",
          "Golf Cart in Repubblica Dominicana | TAAAC Solutions",
          "Voiturettes de Golf en République Dominicaine | TAAAC Solutions",
          "Wózki Golfowe na Dominikanie | TAAAC Solutions",
          "Гольф-кары в Доминиканской Республике | TAAAC Solutions"
        ),
        description: t6(
          "Custom electric golf carts available across the Dominican Republic, including Bayahibe, La Romana, Punta Cana and Cap Cana. Configure your TAAAC online.",
          "Carritos de golf eléctricos personalizables disponibles en República Dominicana, incluyendo Bayahibe, La Romana, Punta Cana y Cap Cana. Configura tu TAAAC online.",
          "Golf cart elettrici personalizzabili disponibili in Repubblica Dominicana, inclusi Bayahibe, La Romana, Punta Cana e Cap Cana. Configura il tuo TAAAC online.",
          "Voiturettes de golf électriques personnalisables disponibles en République Dominicaine, notamment à Bayahibe, La Romana, Punta Cana et Cap Cana. Configurez votre TAAAC en ligne.",
          "Personalizowane elektryczne wózki golfowe dostępne na Dominikanie, m.in. w Bayahibe, La Romana, Punta Cana i Cap Cana. Skonfiguruj swój TAAAC online.",
          "Персонализируемые электрические гольф-кары доступны по всей Доминиканской Республике, включая Bayahibe, La Romana, Punta Cana и Cap Cana. Настройте свой TAAAC онлайн."
        ),
      },
      "golf-carts-bayahibe": {
        title: t6(
          "Golf Carts for Sale in Bayahibe & Dominicus | TAAAC Solutions",
          "Carritos de Golf en Bayahibe y Dominicus | TAAAC Solutions",
          "Golf Cart a Bayahibe e Dominicus | TAAAC Solutions",
          "Voiturettes de Golf à Bayahibe et Dominicus | TAAAC Solutions",
          "Wózki Golfowe w Bayahibe i Dominicus | TAAAC Solutions",
          "Гольф-кары в Bayahibe и Dominicus | TAAAC Solutions"
        ),
        description: t6(
          "Electric golf carts for sale in Bayahibe and Dominicus, with customizable models, online configurator and local support for La Romana and Casa de Campo.",
          "Carritos de golf eléctricos en Bayahibe y Dominicus, con modelos personalizables, configurador online y asistencia local para La Romana y Casa de Campo.",
          "Golf cart elettrici a Bayahibe e Dominicus, con modelli personalizzabili, configuratore online e assistenza locale per La Romana e Casa de Campo.",
          "Voiturettes de golf électriques à Bayahibe et Dominicus, avec modèles personnalisables, configurateur en ligne et assistance locale pour La Romana et Casa de Campo.",
          "Elektryczne wózki golfowe w Bayahibe i Dominicus, z personalizacją, konfiguracją online oraz lokalnym wsparciem dla La Romana i Casa de Campo.",
          "Электрические гольф-кары в Bayahibe и Dominicus, с персонализацией, онлайн-конфигуратором и локальной поддержкой для La Romana и Casa de Campo."
        ),
      },
      "guias": {
        title: t6(
          "Golf Cart Guides | TAAAC Solutions",
          "Guías de Golf Cart | TAAAC Solutions",
          "Guide Golf Cart | TAAAC Solutions",
          "Guides Golf Cart | TAAAC Solutions",
          "Poradniki Golf Cart | TAAAC Solutions",
          "Гайды по гольф-карам | TAAAC Solutions"
        ),
        description: t6(
          "Practical golf cart guides to help you choose, configure and understand electric golf carts in the Dominican Republic.",
          "Guías prácticas para ayudarte a elegir, configurar y conocer mejor los carritos de golf eléctricos en República Dominicana.",
          "Guide pratiche per aiutarti a scegliere, configurare e conoscere meglio i golf cart elettrici in Repubblica Dominicana.",
          "Des guides pratiques pour vous aider à choisir, configurer et mieux comprendre les voiturettes de golf électriques en République Dominicaine.",
          "Praktyczne poradniki, które pomogą Ci wybrać, skonfigurować i lepiej poznać elektryczne wózki golfowe na Dominikanie.",
          "Практические гайды, которые помогут выбрать, настроить и лучше понять электрические гольф-кары в Доминиканской Республике."
        ),
      },
      "como-elegir-carrito-de-golf-republica-dominicana": {
        title: t6(
          "How to Choose a Golf Cart in the Dominican Republic | TAAAC",
          "Cómo Elegir un Carrito de Golf en República Dominicana | TAAAC",
          "Come Scegliere un Golf Cart nella Repubblica Dominicana | TAAAC",
          "Comment Choisir un Golf Cart en République Dominicaine | TAAAC",
          "Jak Wybrać Wózek Golfowy w Dominikanie | TAAAC",
          "Как Выбрать Гольф-кар в Доминиканской Республике | TAAAC"
        ),
        description: t6(
          "What golf cart should you choose in the Dominican Republic? Learn to evaluate battery, power, range, seats, terrain, maintenance and support before buying.",
          "¿Qué carrito de golf elegir en República Dominicana? Aprende a evaluar batería, potencia, autonomía, asientos, terreno, mantenimiento y asistencia antes de comprar.",
          "Quale golf cart scegliere in Repubblica Dominicana? Impara a valutare batteria, potenza, autonomia, posti, terreno, manutenzione e assistenza prima di comprare.",
          "Quel golf cart choisir en République Dominicaine ? Apprenez à évaluer la batterie, la puissance, l'autonomie, les places, le terrain, l'entretien et l'assistance avant d'acheter.",
          "Jaki wózek golfowy wybrać w Dominikanie? Naucz się oceniać baterię, moc, zasięg, liczbę miejsc, teren, konserwację i wsparcie przed zakupem.",
          "Какой гольф-кар выбрать в Доминиканской Республике? Узнайте, как оценить батарею, мощность, запас хода, количество мест, местность, обслуживание и поддержку перед покупкой."
        ),
      },
      "bateria-litio-vs-plomo-carrito-de-golf": {
        title: t6(
          "Lithium vs Lead Battery for a Golf Cart | TAAAC",
          "Batería de Litio vs Plomo para Carrito de Golf | TAAAC",
          "Batteria al Litio vs Piombo per un Golf Cart | TAAAC",
          "Batterie Lithium vs Plomb pour un Golf Cart | TAAAC",
          "Bateria Litowa czy Ołowiowa do Wózka Golfowego | TAAAC",
          "Литиевая или Свинцовая Батарея для Гольф-кара | TAAAC"
        ),
        description: t6(
          "Lithium or lead for a golf cart? Compare maintenance, weight, range, charging, BMS, cost and behavior in the Dominican Republic's climate.",
          "¿Litio o plomo para un carrito de golf? Compara mantenimiento, peso, autonomía, carga, BMS, coste y comportamiento en el clima de República Dominicana.",
          "Litio o piombo per un golf cart? Confronta manutenzione, peso, autonomia, ricarica, BMS, costo e comportamento nel clima della Repubblica Dominicana.",
          "Lithium ou plomb pour un golf cart ? Comparez entretien, poids, autonomie, charge, BMS, coût et comportement dans le climat de la République Dominicaine.",
          "Lit czy ołów do wózka golfowego? Porównaj konserwację, wagę, zasięg, ładowanie, BMS, koszt i zachowanie w klimacie Dominikany.",
          "Литий или свинец для гольф-кара? Сравните обслуживание, вес, запас хода, зарядку, BMS, стоимость и поведение в климате Доминиканской Республики."
        ),
      },
      "48v-vs-72v-carrito-de-golf": {
        title: t6(
          "48V vs 72V for a Golf Cart: Which Should You Choose? | TAAAC",
          "48V vs 72V para Carrito de Golf: ¿Cuál Elegir? | TAAAC",
          "48V vs 72V per un Golf Cart: Quale Scegliere? | TAAAC",
          "48V ou 72V pour un Golf Cart : Lequel Choisir ? | TAAAC",
          "48V vs 72V do Wózka Golfowego: Który Wybrać? | TAAAC",
          "48В против 72В для Гольф-кара: Что Выбрать? | TAAAC"
        ),
        description: t6(
          "48V or 72V for a golf cart? Discover the real differences in power, range, speed, slopes, battery, motor and use in the Dominican Republic.",
          "¿48V o 72V para un carrito de golf? Descubre diferencias en potencia, autonomía, velocidad, pendientes, batería, motor y uso en República Dominicana.",
          "48V o 72V per un golf cart? Scopri le differenze reali in potenza, autonomia, velocità, pendenze, batteria, motore e uso in Repubblica Dominicana.",
          "48V ou 72V pour un golf cart ? Découvrez les vraies différences en puissance, autonomie, vitesse, pentes, batterie, moteur et usage en République Dominicaine.",
          "48V czy 72V do wózka golfowego? Poznaj rzeczywiste różnice w mocy, zasięgu, prędkości, nachyleniach, baterii, silniku i zastosowaniu w Dominikanie.",
          "48В или 72В для гольф-кара? Узнайте реальные различия в мощности, запасе хода, скорости, уклонах, батарее, двигателе и использовании в Доминиканской Республике."
        ),
      },
      "carrito-de-golf-2-4-o-6-plazas": {
        title: t6(
          "2, 4, or 6-Seat Golf Cart: Which Should You Choose? | TAAAC",
          "Carrito de Golf de 2, 4 o 6 Plazas: ¿Cuál Elegir? | TAAAC",
          "Golf Cart da 2, 4 o 6 Posti: Quale Scegliere? | TAAAC",
          "Golf Cart 2, 4 ou 6 Places : Lequel Choisir ? | TAAAC",
          "Wózek Golfowy na 2, 4 czy 6 Miejsc: Który Wybrać? | TAAAC",
          "Гольф-кар на 2, 4 или 6 Мест: Что Выбрать? | TAAAC"
        ),
        description: t6(
          "2, 4, or 6-seat golf cart? Discover which configuration to choose based on passengers, space, weight, range, terrain and real use in the Dominican Republic.",
          "¿Carrito de golf de 2, 4 o 6 plazas? Descubre qué configuración elegir según pasajeros, espacio, peso, autonomía, terreno y uso en República Dominicana.",
          "Golf cart da 2, 4 o 6 posti? Scopri quale configurazione scegliere in base a passeggeri, spazio, peso, autonomia, terreno e uso reale in Repubblica Dominicana.",
          "Golf cart 2, 4 ou 6 places ? Découvrez quelle configuration choisir selon les passagers, l'espace, le poids, l'autonomie, le terrain et l'usage réel en République Dominicaine.",
          "Wózek golfowy na 2, 4 czy 6 miejsc? Dowiedz się, którą konfigurację wybrać w zależności od pasażerów, przestrzeni, wagi, zasięgu, terenu i rzeczywistego użytkowania w Dominikanie.",
          "Гольф-кар на 2, 4 или 6 мест? Узнайте, какую конфигурацию выбрать в зависимости от пассажиров, пространства, веса, запаса хода, местности и реального использования в Доминиканской Республике."
        ),
      },
      "que-revisar-antes-de-comprar-carrito-de-golf": {
        title: t6(
          "What to Check Before Buying a Golf Cart | Checklist TAAAC",
          "Qué Revisar Antes de Comprar un Carrito de Golf | Checklist TAAAC",
          "Cosa Controllare Prima di Comprare un Golf Cart | Checklist TAAAC",
          "Que Vérifier Avant d'Acheter un Golf Cart | Checklist TAAAC",
          "Co Sprawdzić Przed Zakupem Wózka Golfowego | Checklist TAAAC",
          "Что Проверить Перед Покупкой Гольф-кара | Чек-лист TAAAC"
        ),
        description: t6(
          "Buying a golf cart? Check battery, BMS, motor, controller, brakes, chassis, warranty, spare parts, service and real cost before deciding.",
          "¿Vas a comprar un carrito de golf? Revisa batería, BMS, motor, controlador, frenos, chasis, garantía, repuestos, servicio y coste real antes de decidir.",
          "Stai per comprare un golf cart? Controlla batteria, BMS, motore, controller, freni, telaio, garanzia, ricambi, assistenza e costo reale prima di decidere.",
          "Vous allez acheter un golf cart ? Vérifiez la batterie, le BMS, le moteur, le contrôleur, les freins, le châssis, la garantie, les pièces de rechange, le service et le coût réel avant de décider.",
          "Zamierzasz kupić wózek golfowy? Sprawdź baterię, BMS, silnik, kontroler, hamulce, podwozie, gwarancję, części zamienne, serwis i rzeczywisty koszt przed podjęciem decyzji.",
          "Собираетесь купить гольф-кар? Проверьте батарею, BMS, двигатель, контроллер, тормоза, шасси, гарантию, запчасти, сервис и реальную стоимость перед принятием решения."
        ),
      },
      "mantenimiento-carrito-de-golf-cerca-del-mar": {
        title: t6(
          "Golf Cart Maintenance Near the Sea | TAAAC Guide",
          "Mantenimiento de Carrito de Golf Cerca del Mar | Guía TAAAC",
          "Manutenzione Golf Cart Vicino al Mare | Guida TAAAC",
          "Entretien Golf Cart Près de la Mer | Guide TAAAC",
          "Konserwacja Wózka Golfowego nad Morzem | Poradnik TAAAC",
          "Обслуживание Гольф-кара у Моря | Гид TAAAC"
        ),
        description: t6(
          "Learn how to protect a golf cart from sea salt, humidity, sand and corrosion in the Dominican Republic. Chassis, battery, connectors, brakes, washing and maintenance.",
          "Aprende cómo proteger un carrito de golf del salitre, humedad, arena y corrosión en República Dominicana. Chasis, batería, conectores, frenos, lavado y mantenimiento.",
          "Impara a proteggere un golf cart da salsedine, umidità, sabbia e corrosione in Repubblica Dominicana. Telaio, batteria, connettori, freni, lavaggio e manutenzione.",
          "Apprenez à protéger un golf cart du sel marin, de l'humidité, du sable et de la corrosion en République Dominicaine. Châssis, batterie, connecteurs, freins, lavage et entretien.",
          "Dowiedz się, jak chronić wózek golfowy przed solą, wilgocią, piaskiem i korozją w Dominikanie. Podwozie, bateria, złącza, hamulce, mycie i konserwacja.",
          "Узнайте, как защитить гольф-кар от морской соли, влажности, песка и коррозии в Доминиканской Республике. Шасси, батарея, разъёмы, тормоза, мойка и обслуживание."
        ),
      },
    };

    const path = pageToPath(page);
    let title, description;
    if(page==="configurator") {
      title = `${t("Designing","Diseñando","Configurando")} ${cartDisplayName} 🚗`;
      description = seoContent.configurator.description;
    } else {
      const entry = seoContent[page] || seoContent.home;
      title = entry.title;
      description = entry.description;
    }
    setSEO(title, description, path);

    const GUIDE_SLUGS = ["como-elegir-carrito-de-golf-republica-dominicana","bateria-litio-vs-plomo-carrito-de-golf","48v-vs-72v-carrito-de-golf","carrito-de-golf-2-4-o-6-plazas","que-revisar-antes-de-comprar-carrito-de-golf","mantenimiento-carrito-de-golf-cerca-del-mar"];
    if(GUIDE_SLUGS.includes(page)) {
      setGuideStructuredData(title, description, path, seoContent.guias.title);
    } else {
      removeGuideStructuredData();
    }
  }, [page, cartDisplayName, lang]);

  // Sincronizza l'indirizzo del browser con la pagina corrente
  useEffect(() => {
    try {
      const targetPath = pageToPath(page);
      if(window.location.pathname !== targetPath) {
        window.history.pushState({page}, "", targetPath);
      }
    } catch(e) {}
  }, [page]);

  // Segnala a Google Analytics ogni cambio di pagina (necessario perché il sito è una SPA)
  useEffect(() => {
    try {
      if(typeof window.gtag === "function") {
        window.gtag("event", "page_view", {
          page_path: pageToPath(page),
          page_title: document.title,
        });
      }
    } catch(e) {}
  }, [page]);

  // Gestisce i tasti Avanti/Indietro del browser
  useEffect(() => {
    const onPopState = (e) => {
      const p = (e.state && e.state.page) || pathToPage(window.location.pathname);
      setPage(p);
    };
    window.addEventListener("popstate", onPopState);
    return () => window.removeEventListener("popstate", onPopState);
  }, []);

  const DRAFT_KEY = "golfcart_draft";
  const DRAFT_MAX_AGE = 5 * 24 * 60 * 60 * 1000; // 5 giorni

  const [resumeDraft, setResumeDraft] = useState(null);

  // Controlla, una sola volta all'avvio, se esiste una configurazione salvata valida
  useEffect(() => {
    try {
      const raw = localStorage.getItem(DRAFT_KEY);
      if(raw) {
        const parsed = JSON.parse(raw);
        const isFresh = parsed.savedAt && (Date.now() - parsed.savedAt) < DRAFT_MAX_AGE;
        const hasProgress = parsed.cfg && (parsed.cfg.model || (parsed.cfg.cartName && parsed.cfg.cartName.trim()));
        if(isFresh && hasProgress) {
          setResumeDraft(parsed);
        } else {
          localStorage.removeItem(DRAFT_KEY);
        }
      }
    } catch(e) {}
  }, []);

  // Salva automaticamente la configurazione mentre l'utente naviga nel configuratore
  useEffect(() => {
    if(page !== "configurator") return;
    const hasProgress = cfg.model || (cfg.cartName && cfg.cartName.trim()) || step > -1;
    if(!hasProgress) return;
    try {
      localStorage.setItem(DRAFT_KEY, JSON.stringify({cfg, step, savedAt: Date.now()}));
    } catch(e) {}
  }, [cfg, step, page]);

  const clearDraft = () => {
    try { localStorage.removeItem(DRAFT_KEY); } catch(e) {}
  };

  const defaultMotorFor = (mdl, seatsId) => {
    if(seatsId === "other") return "5kw";
    if(seatsId === "4" || seatsId === "4+2") return "4kw";
    if(seatsId === "2") return mdl==="A" ? "3.5kw" : "4kw";
    return "4kw";
  };
  const motorPrice = (mdl, seatsId, motorId) => {
    if(motorId === "3.5kw") return 0;
    if(motorId === "4kw") return (mdl==="A" && seatsId==="2") ? 60 : 0;
    if(motorId === "5kw") return seatsId==="other" ? 0 : 270;
    return 0;
  };
  const defaultBatteryFor = (seatsId) => seatsId==="other" ? "72v100a-piombo" : "48v150a-litio";
  // returns a number (extra $) or the string "onrequest"
  const batteryPrice = (seatsId, batteryId) => {
    if(batteryId === "60v150a-litio") return 661;
    if(batteryId === "72v100a-piombo") return seatsId==="other" ? 0 : "onrequest";
    return 0; // 48v150a-piombo, 48v150a-litio, 60v100a-piombo always free
  };
  const model = MODELS.find(m=>m.id===cfg.model);
  const totalPrice = () => {
    if(!model) return 0;
    let total = model.price;
    if(cfg.model && cfg.seats && SEAT_PRICE_EXTRA[cfg.model] && SEAT_PRICE_EXTRA[cfg.model][cfg.seats] !== undefined) {
      total += SEAT_PRICE_EXTRA[cfg.model][cfg.seats];
    }
    cfg.optionals.forEach(id => {
      const o = OPTIONAL_ITEMS.find(x => x.id === id);
      if(o && o.price) total += o.price;
    });
    const seatT = SEAT_TYPES.find(s => s.id === cfg.seatType);
    if(seatT && seatT.price) total += seatT.price;
    const steerT = STEERING.find(s => s.id === cfg.steering);
    if(steerT && steerT.price) total += steerT.price;
    const windT = WINDSHIELDS.find(w => w.id === cfg.windshield);
    if(windT && windT.price) total += windT.price;
    if(cfg.model && cfg.tire && TIRE_PRICE_EXTRA[cfg.model] && TIRE_PRICE_EXTRA[cfg.model][cfg.tire] !== undefined) {
      total += TIRE_PRICE_EXTRA[cfg.model][cfg.tire];
    }
    if(cfg.model && cfg.seats && cfg.motor) {
      total += motorPrice(cfg.model, cfg.seats, cfg.motor);
    }
    if(cfg.seats && cfg.battery) {
      const bp = batteryPrice(cfg.seats, cfg.battery);
      if(typeof bp === "number") total += bp;
    }
    return total;
  };
  const toggleOpt = id => {
    if(id==="solar") return;
    setCfg(p=>({...p,optionals:p.optionals.includes(id)?p.optionals.filter(x=>x!==id):[...p.optionals,id]}));
  };

  const S = {
    app:{minHeight:"100vh",background:C.bg,color:C.white,fontFamily:"'Segoe UI',system-ui,sans-serif"},
    nav:{background:"transparent",padding:"10px 20px",display:"flex",alignItems:"center",justifyContent:"space-between",minHeight:60,flexWrap:"wrap",gap:8,position:"relative",zIndex:50},
    logo:{color:C.gold,fontWeight:900,fontSize:16,letterSpacing:2,cursor:"pointer",whiteSpace:"nowrap"},
    navLinks:{display:"flex",gap:4,flexWrap:"wrap"},
    navBtn:a=>({background:a?`${C.gold}22`:"transparent",color:a?C.gold:C.muted,border:a?`1px solid ${C.goldDim}`:"1px solid transparent",padding:"6px 10px",borderRadius:8,cursor:"pointer",fontSize:12,fontWeight:a?700:400}),
    goldBtn:{background:"linear-gradient(135deg,#C9A84C,#E2C07A)",color:"#000",border:"none",padding:"13px 28px",borderRadius:12,fontSize:14,fontWeight:700,cursor:"pointer"},
    outBtn:{background:"transparent",color:C.gold,border:"1.5px solid #C9A84C",padding:"11px 24px",borderRadius:12,fontSize:13,fontWeight:600,cursor:"pointer"},
    card:sel=>({background:sel?`${C.gold}11`:C.card,border:sel?"1.5px solid #C9A84C":"1.5px solid #222",borderRadius:16,padding:18,cursor:"pointer",transition:"all .2s"}),
    sec:{padding:"60px 20px",maxWidth:1100,margin:"0 auto"},
    title:{fontSize:"clamp(1.5rem,4vw,2.2rem)",fontWeight:800,color:C.white,marginBottom:4},
    grid2:{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(240px,1fr))",gap:18},
    grid3:{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(180px,1fr))",gap:14},
    input:{width:"100%",background:C.surface,border:"1px solid #222",borderRadius:10,padding:"10px 13px",color:C.white,fontSize:13,outline:"none",boxSizing:"border-box"},
    stepDot:(a,d)=>({flex:"0 0 auto",padding:"4px 10px",borderRadius:20,fontSize:10,fontWeight:700,background:d?`${C.gold}33`:a?C.gold:C.surface,color:d?C.goldLight:a?"#000":C.muted,border:(d||a)?"1px solid #C9A84C":"1px solid #222",marginRight:4,whiteSpace:"nowrap"}),
    goldLine:{width:50,height:3,background:"linear-gradient(90deg,#C9A84C,transparent)",borderRadius:2,marginBottom:28},
  };

  function SummaryBar() {
    if(!cfg.model) return null;
    return (
      <div style={{background:"linear-gradient(135deg,#C9A84C18,#C9A84C08)",border:"1.5px solid #C9A84C66",borderRadius:11,padding:"11px 14px",marginBottom:18,display:"flex",flexWrap:"wrap",gap:10,alignItems:"center",justifyContent:"space-between"}}>
        <div style={{display:"flex",flexWrap:"wrap",gap:8,alignItems:"center"}}>
          <span style={{color:C.white,fontWeight:800,fontSize:11}}>🚗 {cartDisplayName}</span>
          <span style={{color:"#555"}}>|</span>
          <span style={{color:C.gold,fontWeight:700,fontSize:10}}>{t("Model","Modelo","Modello")} {cfg.model}</span>
          {cfg.seats&&<span style={{color:C.muted,fontSize:11}}>· {cfg.seats}</span>}
          {cfg.bodyColor&&<span style={{display:"flex",alignItems:"center",gap:4}}><span style={{width:9,height:9,borderRadius:"50%",background:cfg.bodyColor.hex,border:"1px solid #555",display:"inline-block"}}/><span style={{color:C.muted,fontSize:10}}>{cfg.bodyColor.code}</span></span>}
        </div>
        <div style={{textAlign:"right"}}>
          <div style={{color:"#888",fontSize:8,fontWeight:600,letterSpacing:1,textTransform:"uppercase"}}>{t("Total","Total","Totale")}</div>
          <div style={{color:C.goldLight,fontWeight:900,fontSize:22,lineHeight:1.1}}>${totalPrice().toLocaleString()} <span style={{fontSize:10,fontWeight:700}}>USD</span></div>
        </div>
      </div>
    );
  }

  const navItems = [
    {id:"home",it:"Home",es:"Inicio",en:"Home"},
    {id:"about",it:"Chi Siamo",es:"Quiénes Somos",en:"About Us"},
    {id:"choose-your-golf-cart",it:"Fatti Guidare",es:"Déjate Guiar",en:"Get Guided"},
    {id:"service",it:"Assistenza",es:"Asistencia",en:"Service"},
    {id:"contact",it:"Contatti",es:"Contacto",en:"Contact"},
  ];

  // Struttura del sotto-menu "Guías de Golf Cart" nel menu principale.
  // Le 3 categorie sono esclusivamente raggruppamenti visivi (non pagine, non route).
  const GUIDE_MENU_SECTIONS = [
    {
      cat: {en:"Choose Your Cart", es:"Elegir Tu Carrito", it:"Scegli il Tuo Carrito"},
      items: [
        {slug:"como-elegir-carrito-de-golf-republica-dominicana", en:"How to Choose a Golf Cart", es:"Cómo Elegir un Carrito de Golf", it:"Come Scegliere un Golf Cart"},
        {slug:"carrito-de-golf-2-4-o-6-plazas", en:"2, 4 or 6 Seats", es:"2, 4 o 6 Plazas", it:"2, 4 o 6 Posti"},
      ],
    },
    {
      cat: {en:"Battery & Power", es:"Batería y Potencia", it:"Batteria e Potenza"},
      items: [
        {slug:"bateria-litio-vs-plomo-carrito-de-golf", en:"Lithium vs Lead", es:"Litio vs Plomo", it:"Litio vs Piombo"},
        {slug:"48v-vs-72v-carrito-de-golf", en:"48V vs 72V", es:"48V vs 72V", it:"48V vs 72V"},
      ],
    },
    {
      cat: {en:"Buying & Maintenance", es:"Compra y Mantenimiento", it:"Acquisto e Manutenzione"},
      items: [
        {slug:"que-revisar-antes-de-comprar-carrito-de-golf", en:"What to Check Before Buying", es:"Qué Revisar Antes de Comprar", it:"Cosa Controllare Prima di Comprare"},
        {slug:"mantenimiento-carrito-de-golf-cerca-del-mar", en:"Caring for It Near the Sea", es:"Cómo Cuidarlo Cerca del Mar", it:"Come Curarlo Vicino al Mare"},
      ],
    },
  ];

  function Home() {
    const [showReviewForm, setShowReviewForm] = useState(false);
    const [reviewStars, setReviewStars] = useState(5);
    const [reviewSent, setReviewSent] = useState(false);
    const [reviewSending, setReviewSending] = useState(false);
    const reviewNameRef = useRef();
    const reviewLocRef = useRef();
    const reviewEmailRef = useRef();
    const reviewTextRef = useRef();

    const handleReviewSend = async () => {
      if(reviewSending) return;
      const name = reviewNameRef.current?.value || "";
      const loc = reviewLocRef.current?.value || "";
      const reviewEmail = reviewEmailRef.current?.value || "";
      const text = reviewTextRef.current?.value || "";
      if(!name || !text) { alert(t("Please fill in your name and review","Por favor completa tu nombre y reseña","Per favore compila nome e recensione")); return; }
      if(!reviewEmail.includes("@")) { alert(t("Please enter a valid email","Por favor ingresa un email válido","Per favore inserisci un'email valida")); return; }
      const voucherCode = "TAAAC-REV-" + Math.random().toString(36).substring(2,7).toUpperCase();
      const msg = [
        "NEW CUSTOMER REVIEW",
        "=====================================",
        "Name: "+name,
        "Location: "+loc,
        "Email: "+reviewEmail,
        "Stars: "+reviewStars+"/5",
        "Review: "+text,
        "",
        "Voucher code issued: "+voucherCode,
      ].join("\n");
      setReviewSending(true);
      try {
        await window.emailjs.send("service_f1ysovn","template_e36a3gp",{
          to_email:"info@taaac.solutions",
          subject:"New Review from "+name+" ("+reviewStars+"★)",
          message:msg,
          name:name,
          from_name:name,
          from_email:"noreply@taaac.solutions",
          email:"noreply@taaac.solutions",
          phone:"",
        },"G_ndpmoIfpB6oi8pP");

        try {
          const thankYouTemplates = {
            en: "Hi {name},\n\nThank you so much for sharing your experience with us — reviews like yours help us grow and show what it really means to be part of the TAAAC Family.\n\nAs a small thank you, here's a free maintenance service for your golf cart, on us:\n\nVoucher code: {code}\n(No expiration date. Valid for one use only. Just mention this code when booking your service from the Service section of the site.)\n\nThank you again,\nThe TAAAC Solutions team",
            es: "Hola {name},\n\nMuchas gracias por compartir tu experiencia con nosotros — reseñas como la tuya nos ayudan a crecer y muestran mejor que nadie lo que significa ser parte de la TAAAC Family.\n\nComo pequeño agradecimiento, aquí tienes un servicio de mantenimiento gratuito para tu golf cart, de nuestra parte:\n\nCódigo del bono: {code}\n(Sin fecha de caducidad. Válido para un solo uso. Solo menciona este código al reservar tu servicio en la sección Asistencia del sitio.)\n\nGracias de nuevo,\nEl equipo de TAAAC Solutions",
            it: "Ciao {name},\n\nGrazie di cuore per aver condiviso la tua esperienza con noi — recensioni come la tua ci aiutano a crescere e raccontano meglio di chiunque altro cosa significa far parte della TAAAC Family.\n\nCome piccolo ringraziamento, ecco in regalo una manutenzione gratuita per il tuo golf cart:\n\nCodice buono: {code}\n(Senza scadenza. Valido per un solo utilizzo. Ti basta citare questo codice quando prenoti il servizio dalla sezione Assistenza del sito.)\n\nGrazie ancora,\nIl team TAAAC Solutions",
            fr: "Bonjour {name},\n\nMerci infiniment d'avoir partagé ton expérience avec nous — des avis comme le tien nous aident à grandir et montrent mieux que quiconque ce que signifie faire partie de la TAAAC Family.\n\nEn guise de petit remerciement, voici un entretien gratuit pour ton golf cart, offert par nous :\n\nCode du bon : {code}\n(Sans date d'expiration. Valable pour une seule utilisation. Il te suffit de mentionner ce code lors de la réservation de ton service dans la section Assistance du site.)\n\nMerci encore,\nL'équipe TAAAC Solutions",
            pl: "Cześć {name},\n\nBardzo dziękujemy za podzielenie się z nami swoją opinią — takie recenzje jak Twoja pomagają nam się rozwijać i najlepiej pokazują, co znaczy być częścią TAAAC Family.\n\nW ramach małego podziękowania, otrzymujesz od nas bezpłatny serwis konserwacyjny dla swojego wózka golfowego:\n\nKod vouchera: {code}\n(Bez terminu ważności. Ważny tylko na jedno użycie. Wystarczy podać ten kod podczas rezerwacji serwisu w sekcji Serwis na stronie.)\n\nJeszcze raz dziękujemy,\nZespół TAAAC Solutions",
            ru: "Привет, {name}!\n\nОгромное спасибо, что поделился своим опытом с нами — такие отзывы, как твой, помогают нам расти и лучше всего показывают, что значит быть частью TAAAC Family.\n\nВ знак благодарности дарим тебе бесплатное техобслуживание твоего гольф-кара:\n\nКод ваучера: {code}\n(Без срока действия. Действителен для одного использования. Просто укажи этот код при бронировании сервиса в разделе Сервис на сайте.)\n\nЕщё раз спасибо,\nКоманда TAAAC Solutions",
          };
          const thankYouMsg = (thankYouTemplates[lang] || thankYouTemplates.en)
            .split("{name}").join(name)
            .split("{code}").join(voucherCode);
          await window.emailjs.send("service_f1ysovn","template_e36a3gp",{
            to_email:reviewEmail,
            subject:t("A gift for your review — TAAAC Solutions","Un regalo por tu reseña — TAAAC Solutions","Un regalo per la tua recensione — TAAAC Solutions"),
            message:thankYouMsg,
            name:"TAAAC Solutions",
            from_name:"TAAAC Solutions",
            from_email:"info@taaac.solutions",
            email:"info@taaac.solutions",
            phone:"",
          },"G_ndpmoIfpB6oi8pP");
        } catch(confirmErr) {
          console.error("Errore invio email di ringraziamento recensione:", confirmErr);
        }

        setReviewSent(true);
      } catch(err) {
        console.error(err);
        alert(t("Error sending review. Please try again.","Error al enviar la reseña. Inténtalo de nuevo.","Errore nell'invio della recensione. Riprova."));
      } finally {
        setReviewSending(false);
      }
    };

    return (
      <div>
        <div style={{background:"linear-gradient(135deg,#080808 0%,#0f0f0f 60%,#0a0d0a 100%)",display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",textAlign:"center",padding:"8px 20px 60px",position:"relative",overflow:"visible"}}>
          <div style={{position:"absolute",inset:0,background:"radial-gradient(ellipse at 60% 40%,#C9A84C0a 0%,transparent 70%)",pointerEvents:"none"}}/>
          <img src="/images/logo-taaac.jpg" alt="TAAAC Solutions" style={{width:"clamp(283px, 53vw, 636px)",maxWidth:"92%",marginTop:0,marginBottom:0,position:"relative"}}/>
          <h1 style={{fontSize:"clamp(2rem,6vw,4.5rem)",fontWeight:900,lineHeight:1.05,marginBottom:16,background:"linear-gradient(135deg,#F5F0E8 0%,#C9A84C 100%)",WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent",position:"relative"}}>{t("Premium Golf Cart","Premium Golf Cart","Premium Golf Cart")}</h1>
          <div style={{marginBottom:24,textAlign:"center"}}>
            <div style={{color:C.muted,fontSize:17,marginBottom:4}}>{t("Freedom is measured by the emotions you live along the way.","La libertad se mide por las emociones que vives en el camino.","La libertà si misura nelle emozioni che vivi lungo il percorso.")}</div>
          </div>
          <div style={{color:C.goldLight,fontWeight:800,marginBottom:10}}>
            <span style={{fontSize:17}}>{t("Starting from","Desde","A partire da")} </span>
            <span style={{fontSize:28}}>$8,990 USD</span>
          </div>
          <div style={{color:C.muted,fontSize:13.5,fontWeight:500,letterSpacing:0.2,marginBottom:24}}>
            {t6("Configure it your way. Clear pricing from the start.","Configúralo a tu manera. Precio claro desde el principio.","Configuralo a modo tuo. Prezzo chiaro fin dall'inizio.","Configurez-le à votre façon. Un prix clair dès le départ.","Skonfiguruj go po swojemu. Jasna cena od samego początku.","Настройте его по-своему. Понятная цена с самого начала.")}
          </div>
          <div style={{display:"flex",flexWrap:"wrap",gap:16,justifyContent:"center",width:"100%",maxWidth:700,marginBottom:20}}>
            <div onClick={()=>{upd("model",null);setPage("configurator");setStep(-1);}}
              style={{
                flex:"1 1 260px", minWidth:220, maxWidth:320,
                borderRadius:20, overflow:"hidden", cursor:"pointer", background:C.card,
                boxShadow:"0 12px 40px rgba(0,0,0,0.5)"
              }}>
              <img src={IMGS.modC} alt="" style={{width:"100%",display:"block"}}/>
              <div style={{padding:"14px 16px"}}>
                <div style={{...S.goldBtn,textAlign:"center"}}>{t("Configure your own","Configura el tuyo","Configura il tuo")}</div>
              </div>
            </div>
            <div onClick={()=>setPage("readyModels")}
              style={{
                flex:"1 1 260px", minWidth:220, maxWidth:320,
                borderRadius:20, overflow:"hidden", cursor:"pointer", background:C.card,
                boxShadow:"0 12px 40px rgba(0,0,0,0.5)"
              }}>
              <img src={IMGS.homeImg} alt="" style={{width:"100%",display:"block"}}/>
              <div style={{padding:"14px 16px"}}>
                <div style={{...S.goldBtn,textAlign:"center"}}>{t("Pre-configured models","Modelos preconfigurados","Modelli configurati")}</div>
              </div>
            </div>
          </div>
          <button
            style={{
              background:"transparent",
              color:C.gold,
              border:"1.5px solid #C9A84C",
              padding:"14px 40px",
              borderRadius:24,
              fontSize:15,
              fontWeight:700,
              cursor:"pointer",
              letterSpacing:1,
              width:"100%",
              maxWidth:340,
            }}
            onClick={()=>setPage("service")}>
            🔧 {t("Service","Asistencia","Assistenza")}
          </button>
        </div>

        <div style={{...S.sec,borderTop:"1px solid #222",paddingTop:40,paddingBottom:40,textAlign:"center"}}>
          <h2 style={{...S.title,marginBottom:8}}>
            {t6("Included from the start.","Incluido desde el inicio.","Incluso fin dall'inizio.","Inclus dès le départ.","W cenie od samego początku.","Включено с самого начала.")}
          </h2>
          <div style={{color:C.goldLight,fontSize:13,fontWeight:600,marginBottom:28}}>
            {t6("Every TAAAC comes with solar power included.","Cada TAAAC nace con energía solar incluida.","Ogni TAAAC nasce con l'energia solare inclusa.","Chaque TAAAC est livré avec l'énergie solaire incluse.","Każdy TAAAC ma energię słoneczną w cenie.","Каждый TAAAC поставляется с солнечной энергией в комплекте.")}
          </div>
          <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(130px,1fr))",gap:12,maxWidth:720,margin:"0 auto"}}>
            {[
              {icon:"☀️",
                title:t6("500 W Solar","Solar 500 W","Solare 500 W","Solaire 500 W","Solar 500 W","Солнечная панель 500 Вт"),
                sub:t6("Included","Incluido","Incluso","Inclus","W cenie","Включено")},
              {icon:"🚚",
                title:t6("Standard Delivery","Entrega estándar","Consegna standard","Livraison standard","Standardowa dostawa","Стандартная доставка"),
                sub:t6("Dominican Republic","República Dominicana","Repubblica Dominicana","République dominicaine","Dominikana","Доминиканская Республика")},
              {icon:"🛡️",
                title:t6("12-Month Warranty","Garantía 12 meses","Garanzia 12 mesi","Garantie 12 mois","12 miesięcy gwarancji","Гарантия 12 месяцев"),
                sub:t6("Included","Incluida","Inclusa","Incluse","W cenie","Включена")},
              {icon:"🎨",
                title:t6("Customizable","Personalizable","Personalizzabile","Personnalisable","Personalizowany","Настраиваемый"),
                sub:t6("Your choices","Tú eliges","Scegli tu","À vous de choisir","Ty wybierasz","Вы выбираете")},
            ].map((card,i)=>(
              <div key={i} style={{background:C.card,border:"1px solid #222",borderRadius:14,padding:"16px 12px"}}>
                <div style={{fontSize:24,marginBottom:6}}>{card.icon}</div>
                <div style={{color:C.gold,fontWeight:700,fontSize:13,marginBottom:2}}>{card.title}</div>
                <div style={{color:C.muted,fontSize:12.5}}>{card.sub}</div>
              </div>
            ))}
          </div>
          <div style={{color:C.muted,fontSize:13.5,fontStyle:"italic",marginTop:24,maxWidth:560,marginLeft:"auto",marginRight:"auto"}}>
            {t6("The starting price already includes the essentials. Customize only what you want to change or add.","El precio inicial ya incluye lo esencial. Personaliza solo lo que quieras cambiar o añadir.","Il prezzo iniziale include già l'essenziale. Personalizza solo ciò che vuoi cambiare o aggiungere.","Le prix de départ inclut déjà l'essentiel. Personnalisez uniquement ce que vous souhaitez modifier ou ajouter.","Cena początkowa obejmuje już najważniejsze elementy. Personalizuj tylko to, co chcesz zmienić lub dodać.","Начальная цена уже включает всё необходимое. Настраивайте только то, что хотите изменить или добавить.")}
          </div>
        </div>

        <div style={{...S.sec,borderTop:"1px solid #222"}}>
          <div style={{color:C.gold,fontSize:10,letterSpacing:4,fontWeight:700,marginBottom:14,textTransform:"uppercase"}}>
            {t("Our categories","Nuestras categorías","Le nostre categorie")}
          </div>
          <h2 style={S.title}>{t("Golf Cart for every need","Golf Cart para cada necesidad","Golf Cart per ogni esigenza")}</h2>
          <div style={{color:"#666",fontSize:13,marginBottom:24,lineHeight:1.7}}>
            {t(
              "We deliver electric golf carts across the whole country — see our ",
              "Entregamos golf carts eléctricos en todo el país — consulta nuestros ",
              "Consegniamo golf cart elettrici in tutto il paese — scopri i nostri "
            )}
            <a href="/golf-carts-dominican-republic" onClick={(e)=>navigateTo("/golf-carts-dominican-republic", e)} style={{color:C.gold,textDecoration:"underline",fontWeight:600}}>
              {t("golf carts available across the Dominican Republic","golf carts disponibles en toda República Dominicana","golf cart disponibili in tutta la Repubblica Dominicana")}
            </a>.{" "}
            {t6(
              "Based in Bayahibe? Discover our ",
              "¿Estás en Bayahibe? Descubre nuestros ",
              "Sei a Bayahibe? Scopri i nostri ",
              "Vous êtes à Bayahibe ? Découvrez nos ",
              "Jesteś w Bayahibe? Odkryj nasze ",
              "Находитесь в Bayahibe? Ознакомьтесь с нашими "
            )}
            <a href="/golf-carts-bayahibe" onClick={(e)=>navigateTo("/golf-carts-bayahibe", e)} style={{color:C.gold,textDecoration:"underline",fontWeight:600}}>
              {t6("golf carts in Bayahibe","golf carts en Bayahibe","golf cart a Bayahibe","voiturettes de golf à Bayahibe","wózki golfowe w Bayahibe","гольф-кары в Bayahibe")}
            </a>.
          </div>
          <div style={S.goldLine}/>
          <div style={S.grid2}>
            {[
              {icon:"⛳",en:"For Golf",es:"Para el Golf",it:"Per il Golf",items:[{en:"Golf courses",es:"Campos de golf",it:"Campi da golf"},{en:"Resorts",es:"Resorts",it:"Resort"},{en:"Hotels",es:"Hoteles",it:"Hotel"},{en:"Golfers",es:"Golfistas",it:"Golfisti"}]},
              {icon:"🏡",en:"Road Use",es:"Uso Vial",it:"Uso Stradale",items:[{en:"Private residences",es:"Residencias privadas",it:"Residence private"},{en:"Gated communities",es:"Comunidades cerradas",it:"Comunità chiuse"},{en:"Bayahibe",es:"Bayahibe",it:"Bayahibe"},{en:"Casa de Campo",es:"Casa de Campo",it:"Casa de Campo"},{en:"Villas",es:"Villas",it:"Ville"}]},
            ].map(cat=>(
              <div key={cat.it} style={{background:C.card,border:"1px solid #222",borderRadius:20,padding:24}}>
                <div style={{fontSize:32,marginBottom:10}}>{cat.icon}</div>
                <div style={{color:C.gold,fontWeight:700,fontSize:18,marginBottom:12}}>{t(cat.en, cat.es, cat.it)}</div>
                <ul style={{listStyle:"none",padding:0,margin:0}}>
                  {cat.items.map(item=>(
                    <li key={item.it} style={{color:C.muted,padding:"6px 0",borderBottom:"1px solid #222",fontSize:13}}>
                      <span style={{color:C.gold}}>✦</span> {t(item.en, item.es, item.it)}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div style={{marginTop:48}}>
            <div style={{color:C.gold,fontSize:10,letterSpacing:4,fontWeight:700,marginBottom:14,textTransform:"uppercase",textAlign:"center"}}>
              {t("Our Models","Nuestros Modelos","I Nostri Modelli")}
            </div>
            <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(140px,1fr))",gap:12}}>
              {MODELS.map(m=>(
                <div key={m.id} onClick={()=>setPage("model-"+m.id.toLowerCase())} style={{background:C.card,border:"1px solid #222",borderRadius:16,padding:16,textAlign:"center",cursor:"pointer"}}>
                  <div style={{height:80,display:"flex",alignItems:"center",justifyContent:"center",marginBottom:8}}>
                    <Img k={m.imgKey} style={{maxHeight:"100%",maxWidth:"100%",objectFit:"contain"}}/>
                  </div>
                  <div style={{color:C.gold,fontWeight:700,fontSize:13}}>{t(m.name.split(" / ")[0], m.name.split(" / ")[1], m.name.split(" / ")[2])}</div>
                  <div style={{color:C.muted,fontSize:12,marginTop:2}}>{t("from","desde","da")} ${m.price.toLocaleString()}</div>
                </div>
              ))}
            </div>
          </div>

          <div style={{marginTop:48,background:"linear-gradient(160deg,#151515,#0d0d0d)",border:"1.5px solid #C9A84C44",borderRadius:20,padding:"36px 28px",textAlign:"center"}}>
            <div style={{color:C.gold,fontSize:10,letterSpacing:4,fontWeight:700,marginBottom:14,textTransform:"uppercase"}}>
              {t6("The TAAAC Way","Modo TAAAC","Modo TAAAC","Mode TAAAC","Styl TAAAC","Стиль TAAAC")}
            </div>
            <h2 style={{...S.title,marginBottom:14}}>
              {t6("Your golf cart, made around you.","Tu golf cart, hecho a tu medida.","Il tuo golf cart, fatto su misura per te.","Votre golf cart, conçu sur mesure pour vous.","Twój golf cart, dopasowany do Ciebie.","Ваш гольф-кар, созданный под вас.")}
            </h2>
            <p style={{color:C.muted,fontSize:14.5,lineHeight:1.8,maxWidth:560,margin:"0 auto 16px"}}>
              {t6(
                "Start with a complete configuration and personalize it to suit your style and needs. You choose the details; we take care of making it a reality and delivering it in the Dominican Republic.",
                "Empieza con una configuración completa y personalízala según tu estilo y tus necesidades. Tú eliges los detalles; nosotros nos encargamos de hacerlo realidad y entregártelo en República Dominicana.",
                "Parti da una configurazione completa e personalizzala in base al tuo stile e alle tue esigenze. Tu scegli i dettagli; noi ci occupiamo di realizzarla e consegnartela in Repubblica Dominicana.",
                "Partez d'une configuration complète et personnalisez-la selon votre style et vos besoins. Vous choisissez les détails ; nous nous chargeons de la réaliser et de vous la livrer en République dominicaine.",
                "Zacznij od kompletnej konfiguracji i dopasuj ją do swojego stylu oraz potrzeb. Ty wybierasz szczegóły, a my zajmujemy się realizacją i dostawą na terenie Dominikany.",
                "Начните с полной комплектации и настройте её под свой стиль и потребности. Вы выбираете детали, а мы воплощаем конфигурацию в жизнь и доставляем гольф-кар по Доминиканской Республике."
              )}
            </p>
            <div style={{color:C.goldLight,fontSize:13,fontWeight:600,fontStyle:"italic",maxWidth:520,margin:"0 auto 24px"}}>
              {t6(
                "A direct process, a clear configuration and a price based on what you actually choose.",
                "Un proceso directo, una configuración clara y un precio basado en lo que realmente eliges.",
                "Un processo diretto, una configurazione chiara e un prezzo basato su ciò che scegli davvero.",
                "Un processus direct, une configuration claire et un prix basé sur ce que vous choisissez réellement.",
                "Prosty proces, przejrzysta konfiguracja i cena oparta na tym, co naprawdę wybierasz.",
                "Простой процесс, понятная конфигурация и цена, основанная на том, что вы действительно выбираете."
              )}
            </div>
            <button style={S.goldBtn} onClick={()=>{upd("model",null);setPage("configurator");setStep(-1);}}>
              {t6("Configure your Golf Cart","Configura tu Golf Cart","Configura il tuo Golf Cart","Configurez votre Golf Cart","Skonfiguruj swój Golf Cart","Настройте свой Golf Cart")}
            </button>
          </div>

          <div style={{marginTop:48,background:"linear-gradient(160deg,#171410,#0d0d0d)",border:"1.5px solid #C9A84C",borderRadius:22,padding:"40px 28px",textAlign:"center",boxShadow:"0 16px 44px rgba(201,168,76,0.12)"}}>
            <h2 style={{...S.title,marginBottom:10}}>
              {t6("Create your TAAAC.","Crea tu TAAAC.","Crea il tuo TAAAC.","Créez votre TAAAC.","Stwórz swojego TAAAC.","Создайте свой TAAAC.")}
            </h2>
            <p style={{color:C.muted,fontSize:14.5,lineHeight:1.7,maxWidth:520,margin:"0 auto 12px"}}>
              {t6("Choose your model and personalize it around your style and needs.","Elige tu modelo y personalízalo según tu estilo y tus necesidades.","Scegli il tuo modello e personalizzalo in base al tuo stile e alle tue esigenze.","Choisissez votre modèle et personnalisez-le selon votre style et vos besoins.","Wybierz model i spersonalizuj go zgodnie ze swoim stylem i potrzebami.","Выберите модель и настройте её под свой стиль и потребности.")}
            </p>
            <div style={{color:C.goldLight,fontSize:13,fontWeight:600,fontStyle:"italic",maxWidth:480,margin:"0 auto 32px"}}>
              {t6("See your configuration and price as you build.","Ve tu configuración y el precio mientras personalizas.","Vedi la tua configurazione e il prezzo mentre personalizzi.","Visualisez votre configuration et son prix pendant que vous la personnalisez.","Zobacz swoją konfigurację i cenę podczas personalizacji.","Смотрите свою конфигурацию и цену по мере настройки.")}
            </div>

            <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(130px,1fr))",gap:14,maxWidth:680,margin:"0 auto 32px"}}>
              {[
                t6("Choose your model","Elige tu modelo","Scegli il tuo modello","Choisissez votre modèle","Wybierz model","Выберите модель"),
                t6("Personalize it","Personalízalo","Personalizzalo","Personnalisez-le","Spersonalizuj go","Настройте его"),
                t6("Review your configuration","Revisa tu configuración","Controlla la tua configurazione","Vérifiez votre configuration","Sprawdź swoją konfigurację","Проверьте конфигурацию"),
                t6("Send your request","Envía tu solicitud","Invia la tua richiesta","Envoyez votre demande","Wyślij zapytanie","Отправьте запрос"),
              ].map((label,i)=>(
                <div key={i} style={{background:"#0000002a",border:"1px solid #C9A84C33",borderRadius:14,padding:"16px 10px"}}>
                  <div style={{width:26,height:26,borderRadius:"50%",background:"linear-gradient(135deg,#C9A84C,#E2C07A)",color:"#000",fontWeight:800,fontSize:13,display:"flex",alignItems:"center",justifyContent:"center",margin:"0 auto 8px"}}>{i+1}</div>
                  <div style={{color:C.white,fontWeight:600,fontSize:12.5,lineHeight:1.4}}>{label}</div>
                </div>
              ))}
            </div>

            <button style={S.goldBtn} onClick={()=>{upd("model",null);setPage("configurator");setStep(-1);}}>
              {t6("Configure your Golf Cart","Configura tu Golf Cart","Configura il tuo Golf Cart","Configurez votre Golf Cart","Skonfiguruj swój Golf Cart","Настройте свой Golf Cart")}
            </button>
            <div style={{marginTop:14}}>
              <span onClick={()=>setPage("readyModels")} style={{color:C.muted,fontSize:13.5,textDecoration:"underline",cursor:"pointer"}}>
                {t6("Prefer one already configured? View available models.","¿Prefieres uno ya configurado? Ver modelos disponibles.","Preferisci un modello già configurato? Vedi i modelli disponibili.","Vous préférez un modèle déjà configuré ? Voir les modèles disponibles.","Wolisz gotową konfigurację? Zobacz dostępne modele.","Предпочитаете готовую конфигурацию? Посмотрите доступные модели.")}
              </span>
            </div>
          </div>

          <div style={{marginTop:48,background:C.card,border:"1px solid #222",borderRadius:20,padding:"36px 28px",textAlign:"center"}}>
            <h2 style={{...S.title,marginBottom:10}}>
              {t6("Support you can count on.","Un soporte en el que puedes confiar.","Un supporto su cui puoi contare.","Un accompagnement sur lequel vous pouvez compter.","Wsparcie, na którym możesz polegać.","Поддержка, на которую можно рассчитывать.")}
            </h2>
            <p style={{color:C.muted,fontSize:14,lineHeight:1.7,maxWidth:540,margin:"0 auto 28px"}}>
              {t6("Direct assistance from your first configuration through delivery and beyond.","Atención directa desde tu primera configuración hasta la entrega y después.","Assistenza diretta dalla prima configurazione fino alla consegna e anche dopo.","Un accompagnement direct dès votre première configuration, jusqu'à la livraison et au-delà.","Bezpośrednie wsparcie od pierwszej konfiguracji, przez dostawę i również później.","Прямая поддержка от первой конфигурации до доставки и после неё.")}
            </p>
            <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(180px,1fr))",gap:16,maxWidth:760,margin:"0 auto"}}>
              {[
                {icon:"🛡️",
                  title:t6("12-Month Warranty","Garantía de 12 meses","Garanzia di 12 mesi","Garantie de 12 mois","12-miesięczna gwarancja","Гарантия 12 месяцев"),
                  desc:t6("Clear coverage from delivery.","Cobertura clara desde la entrega.","Copertura chiara dalla consegna.","Une couverture claire dès la livraison.","Jasne warunki ochrony od momentu dostawy.","Понятные условия гарантии с момента доставки.")},
                {icon:"🚚",
                  title:t6("Standard Delivery","Entrega estándar","Consegna standard","Livraison standard","Standardowa dostawa","Стандартная доставка"),
                  desc:t6("Standard delivery in the Dominican Republic included.","Entrega estándar en República Dominicana incluida.","Consegna standard in Repubblica Dominicana inclusa.","Livraison standard en République dominicaine incluse.","Standardowa dostawa na terenie Dominikany w cenie.","Стандартная доставка по Доминиканской Республике включена.")},
                {icon:"🤝",
                  title:t6("Direct Support","Atención directa","Assistenza diretta","Assistance directe","Bezpośrednie wsparcie","Прямая поддержка"),
                  desc:t6("One direct point of contact from configuration to delivery.","Un contacto directo desde la configuración hasta la entrega.","Un contatto diretto dalla configurazione fino alla consegna.","Un contact direct de la configuration jusqu'à la livraison.","Jeden bezpośredni kontakt od konfiguracji aż po dostawę.","Один прямой контакт от конфигурации до доставки.")},
              ].map((pillar,i)=>(
                <div key={i} style={{background:"#0000002a",border:"1px solid #C9A84C33",borderRadius:14,padding:"20px 14px"}}>
                  <div style={{fontSize:26,marginBottom:8}}>{pillar.icon}</div>
                  <div style={{color:C.gold,fontWeight:700,fontSize:14,marginBottom:6}}>{pillar.title}</div>
                  <div style={{color:C.muted,fontSize:13.5,lineHeight:1.5}}>{pillar.desc}</div>
                </div>
              ))}
            </div>
          </div>

          <div style={{marginTop:48}}>
            <h2 style={{...S.title,textAlign:"center",marginBottom:8}}>
              {t6("Golf Cart Guides","Guías de Golf Cart","Guide Golf Cart","Guides Golf Cart","Poradniki Golf Cart","Гайды по гольф-карам")}
            </h2>
            <p style={{color:C.muted,fontSize:14,lineHeight:1.7,textAlign:"center",maxWidth:560,margin:"0 auto 24px"}}>
              {t6("Practical advice to help you choose, configure and understand your golf cart.","Consejos prácticos para ayudarte a elegir, configurar y conocer mejor tu golf cart.","Consigli pratici per aiutarti a scegliere, configurare e conoscere meglio il tuo golf cart.","Des conseils pratiques pour vous aider à choisir, configurer et mieux comprendre votre golf cart.","Praktyczne porady, które pomogą Ci wybrać, skonfigurować i lepiej poznać swój golf cart.","Практические советы, которые помогут выбрать, настроить и лучше понять ваш гольф-кар.")}
            </p>
            <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(200px,1fr))",gap:14,marginBottom:20}}>
              {[
                {slug:"como-elegir-carrito-de-golf-republica-dominicana",
                  title:t6("How to Choose a Golf Cart in the Dominican Republic","Cómo Elegir un Carrito de Golf en República Dominicana","Come Scegliere un Golf Cart nella Repubblica Dominicana","Comment Choisir un Golf Cart en République Dominicaine","Jak Wybrać Wózek Golfowy w Dominikanie","Как Выбрать Гольф-кар в Доминиканской Республике")},
                {slug:"bateria-litio-vs-plomo-carrito-de-golf",
                  title:t6("Lithium vs Lead Battery for a Golf Cart","Batería de Litio vs Plomo para Carrito de Golf","Batteria al Litio vs Piombo per un Golf Cart","Batterie Lithium vs Plomb pour un Golf Cart","Bateria Litowa czy Ołowiowa do Wózka Golfowego","Литиевая или Свинцовая Батарея для Гольф-кара")},
                {slug:"carrito-de-golf-2-4-o-6-plazas",
                  title:t6("2, 4, or 6-Seat Golf Cart: Which Should You Choose?","Carrito de Golf de 2, 4 o 6 Plazas: ¿Cuál Elegir?","Golf Cart da 2, 4 o 6 Posti: Quale Scegliere?","Golf Cart 2, 4 ou 6 Places : Lequel Choisir ?","Wózek Golfowy na 2, 4 czy 6 Miejsc: Który Wybrać?","Гольф-кар на 2, 4 или 6 Мест: Что Выбрать?")},
              ].map(guide=>(
                <a key={guide.slug} href={`/${guide.slug}`} onClick={(e)=>navigateTo(`/${guide.slug}`, e)} style={{...S.card(false),textDecoration:"none",color:"inherit",display:"block"}}>
                  <div style={{color:C.gold,fontWeight:700,fontSize:14,lineHeight:1.4,marginBottom:10}}>{guide.title}</div>
                  <div style={{color:C.gold,fontWeight:600,fontSize:12.5}}>{t6("Read the guide →","Leer la guía →","Leggi la guida →","Lire le guide →","Przeczytaj poradnik →","Читать гайд →")}</div>
                </a>
              ))}
            </div>
            <div style={{textAlign:"center"}}>
              <a href="/guias" onClick={(e)=>navigateTo("/guias", e)} style={{color:C.gold,textDecoration:"underline",cursor:"pointer",fontWeight:600,fontSize:13}}>
                {t6("View all guides","Ver todas las guías","Vedi tutte le guide","Voir tous les guides","Zobacz wszystkie poradniki","Смотреть все гайды")}
              </a>
            </div>
          </div>

          <div style={{marginTop:48,background:"linear-gradient(135deg,#C9A84C12,#C9A84C04)",border:"1.5px solid #C9A84C44",borderRadius:20,padding:"32px 24px",textAlign:"center"}}>
            <div style={{fontSize:32,marginBottom:10}}>🤝</div>
            <div style={{color:C.white,fontWeight:800,fontSize:18,marginBottom:20}}>{t("Want to grow with us?","¿Quieres crecer con nosotros?","Vuoi crescere con noi?")}</div>
            <button style={S.goldBtn} onClick={()=>setPage("partner")}>
              {t("Partner with us","Colabora con nosotros","Collabora con noi")}
            </button>
          </div>

          <div style={{marginTop:56}}>
            <div style={{color:C.gold,fontSize:20,fontWeight:800,marginBottom:14,textAlign:"center"}}>{t("What they say about us","Lo que dicen de nosotros","Cosa dicono di noi")}</div>
            <h2 style={{...S.title,textAlign:"center"}}>{t6("Customer experiences","Experiencias de nuestros clientes","Esperienze dei nostri clienti","Expériences de nos clients","Doświadczenia naszych klientów","Опыт наших клиентов")}</h2>

            <div style={{marginTop:16,marginBottom:32,textAlign:"center"}}>
              {!showReviewForm && !reviewSent && (
                <button style={S.outBtn} onClick={()=>setShowReviewForm(true)}>
                  ✍️ {t("Write a Review","Escribir una Reseña","Scrivi una Recensione")}
                </button>
              )}

              {showReviewForm && !reviewSent && (
                <div style={{...S.card(false),textAlign:"left",maxWidth:440,margin:"0 auto"}}>
                  <h3 style={{color:C.gold,fontSize:16,marginBottom:16,textAlign:"center"}}>{t("Write a Review","Escribir una Reseña","Scrivi una Recensione")}</h3>
                  <input ref={reviewNameRef} type="text" placeholder={t("Your name","Tu nombre","Il tuo nome")} style={{width:"100%",background:C.card,border:"1.5px solid #333",borderRadius:10,padding:"12px 14px",fontSize:14,color:C.white,marginBottom:10,outline:"none"}}/>
                  <input ref={reviewLocRef} type="text" placeholder={t("Location (optional)","Ubicación (opcional)","Località (opzionale)")} style={{width:"100%",background:C.card,border:"1.5px solid #333",borderRadius:10,padding:"12px 14px",fontSize:14,color:C.white,marginBottom:10,outline:"none"}}/>
                  <input ref={reviewEmailRef} type="email" placeholder="Email *" style={{width:"100%",background:C.card,border:"1.5px solid #333",borderRadius:10,padding:"12px 14px",fontSize:14,color:C.white,marginBottom:10,outline:"none"}}/>
                  <div style={{textAlign:"center",marginBottom:10}}>
                    {[1,2,3,4,5].map(n=>(
                      <span key={n} onClick={()=>setReviewStars(n)} style={{cursor:"pointer",fontSize:24,color:n<=reviewStars?C.gold:"#444"}}>★</span>
                    ))}
                  </div>
                  <textarea ref={reviewTextRef} rows={4} placeholder={t("Your review","Tu reseña","La tua recensione")} style={{width:"100%",background:C.card,border:"1.5px solid #333",borderRadius:10,padding:"12px 14px",fontSize:14,color:C.white,marginBottom:14,outline:"none",resize:"vertical",fontFamily:"inherit"}}/>
                  <div style={{display:"flex",gap:10,justifyContent:"center"}}>
                    <button style={S.outBtn} onClick={()=>setShowReviewForm(false)}>{t("Cancel","Cancelar","Annulla")}</button>
                    <button style={{...S.goldBtn,opacity:reviewSending?0.6:1,cursor:reviewSending?"not-allowed":"pointer"}} onClick={handleReviewSend} disabled={reviewSending}>
                      {reviewSending ? t("Sending...","Enviando...","Invio...") : "📩 "+t("Send","Enviar","Invia")}
                    </button>
                  </div>
                </div>
              )}

              {reviewSent && (
                <div style={{color:C.goldLight,fontSize:14,fontWeight:600}}>
                  ✅ {t("Thank you for your review!","¡Gracias por tu reseña!","Grazie per la tua recensione!")}
                </div>
              )}
            </div>

            <div style={{textAlign:"center",color:C.muted,fontSize:13,padding:"20px 0"}}>
              {t("No reviews yet — be the first to share your experience!","Aún no hay reseñas — ¡sé el primero en compartir tu experiencia!","Nessuna recensione ancora — sii il primo a condividere la tua esperienza!")}
            </div>
          </div>
        </div>

      </div>
    );
  }

  function Service() {
    const [selServices, setSelServices] = useState([]);
    const [altroText, setAltroText] = useState("");
    const services = [
      {icon:"🔋",en:"Battery Check",es:"Control de Baterías",it:"Controllo Batterie"},
      {icon:"🛑",en:"Brakes",es:"Frenos",it:"Freni"},
      {icon:"🛞",en:"Tires",es:"Neumáticos",it:"Pneumatici"},
      {icon:"⚡",en:"Electrical System",es:"Sistema Eléctrico",it:"Impianto Elettrico"},
      {icon:"🧹",en:"Professional Cleaning",es:"Limpieza Profesional",it:"Pulizia Professionale"},
      {icon:"🔧",en:"General Inspection",es:"Inspección General",it:"Ispezione Generale"},
      {icon:"⚙️",en:"Electric Motor Repair",es:"Reparación Motor Eléctrico",it:"Riparazione Motore Elettrico"},
      {icon:"🔄",en:"Steering Repair",es:"Reparación de Dirección",it:"Riparazione Sterzo"},
      {icon:"🎨",en:"Bodywork",es:"Carrocería",it:"Carrozzeria"},
    ];
    const toggleSvc = (id) => setSelServices(prev=>prev.includes(id)?prev.filter(x=>x!==id):[...prev,id]);
    const altroSel = selServices.includes("altro");

    const handleBook = () => {
      const svcList = selServices.filter(x=>x!=="altro").map(id=>{
        const s = services.find(x=>x.en===id);
        return s ? t(s.en,s.es,s.it) : id;
      });
      if(altroSel && altroText.trim()) svcList.push(altroText.trim());
      if(svcList.length===0){ alert(t("Please select at least one service","Selecciona al menos un servicio","Seleziona almeno un servizio")); return; }
      setServiceNote("SERVICE BOOKING:\n" + svcList.map(s=>"- "+s).join("\n"));
      setPage("serviceConfirm");
    };

    return (
      <div style={S.sec}>
        <div style={{color:C.gold,fontSize:10,letterSpacing:4,fontWeight:700,marginBottom:14,textTransform:"uppercase"}}>{t("Service & Repairs","Asistencia y Reparaciones","Assistenza & Riparazioni")}</div>
        <h1 style={S.title}>{t("Maintenance & Repairs","Mantenimiento y Reparaciones","Manutenzione & Riparazioni")}</h1>
        <div style={S.goldLine}/>

        <div style={{marginBottom:40}}>
          <h2 style={{...S.title,fontSize:"clamp(1.3rem,3.4vw,1.8rem)",marginBottom:10}}>
            {t6("Support continues after delivery.","El soporte continúa después de la entrega.","Il supporto continua anche dopo la consegna.","L'assistance continue après la livraison.","Wsparcie trwa również po dostawie.","Поддержка продолжается и после доставки.")}
          </h2>
          <p style={{color:C.muted,fontSize:14,lineHeight:1.7,maxWidth:640,marginBottom:28}}>
            {t6("From warranty support to maintenance, diagnostics and replacement parts, we stay available to help keep your TAAAC running.","Desde la garantía hasta el mantenimiento, el diagnóstico y los repuestos, seguimos disponibles para ayudarte a mantener tu TAAAC en marcha.","Dalla garanzia alla manutenzione, alla diagnosi e ai ricambi, restiamo a disposizione per aiutarti a mantenere operativo il tuo TAAAC.","De la garantie à l'entretien, au diagnostic et aux pièces de rechange, nous restons disponibles pour vous aider à maintenir votre TAAAC opérationnel.","Od obsługi gwarancyjnej po konserwację, diagnostykę i części zamienne — pozostajemy do dyspozycji, aby pomóc utrzymać Twój TAAAC w sprawności.","От гарантийной поддержки до обслуживания, диагностики и запасных частей — мы остаёмся на связи, чтобы помочь вашему TAAAC оставаться в рабочем состоянии.")}
          </p>

          <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(200px,1fr))",gap:14,marginBottom:32}}>
            {[
              {icon:"🛡️",
                title:t6("Warranty Support","Soporte de garantía","Assistenza in garanzia","Assistance sous garantie","Wsparcie gwarancyjne","Гарантийная поддержка"),
                desc:t6("Direct assistance for issues covered by your TAAAC warranty.","Atención directa para los problemas cubiertos por la garantía de tu TAAAC.","Assistenza diretta per i problemi coperti dalla garanzia del tuo TAAAC.","Assistance directe pour les problèmes couverts par la garantie de votre TAAAC.","Bezpośrednia pomoc w przypadku problemów objętych gwarancją Twojego TAAAC.","Прямая помощь по вопросам, покрываемым гарантией вашего TAAAC.")},
              {icon:"🔍",
                title:t6("Maintenance & Diagnostics","Mantenimiento y diagnóstico","Manutenzione e diagnosi","Entretien et diagnostic","Konserwacja i diagnostyka","Обслуживание и диагностика"),
                desc:t6("We help identify problems, plan maintenance and determine the right solution before unnecessary parts are replaced.","Te ayudamos a identificar problemas, planificar el mantenimiento y encontrar la solución adecuada antes de sustituir piezas innecesariamente.","Ti aiutiamo a identificare i problemi, pianificare la manutenzione e individuare la soluzione corretta prima di sostituire componenti inutilmente.","Nous vous aidons à identifier les problèmes, planifier l'entretien et trouver la bonne solution avant de remplacer inutilement des pièces.","Pomagamy zidentyfikować problem, zaplanować konserwację i dobrać właściwe rozwiązanie przed niepotrzebną wymianą części.","Мы помогаем определить проблему, спланировать обслуживание и подобрать правильное решение до ненужной замены деталей.")},
              {icon:"🧰",
                title:t6("Parts & Repairs","Repuestos y reparaciones","Ricambi e riparazioni","Pièces et réparations","Części i naprawy","Запчасти и ремонт"),
                desc:t6("Support for replacement parts, compatible components and repairs when your golf cart needs attention.","Soporte para repuestos, componentes compatibles y reparaciones cuando tu golf cart necesita atención.","Supporto per ricambi, componenti compatibili e riparazioni quando il tuo golf cart necessita di un intervento.","Assistance pour les pièces de rechange, les composants compatibles et les réparations lorsque votre golf cart nécessite une intervention.","Pomoc w zakresie części zamiennych, kompatybilnych komponentów i napraw, gdy Twój golf cart wymaga interwencji.","Помощь с запасными частями, совместимыми компонентами и ремонтом, когда вашему гольф-кару требуется обслуживание.")},
            ].map((area,i)=>(
              <div key={i} style={{...S.card(false)}}>
                <div style={{fontSize:24,marginBottom:8}}>{area.icon}</div>
                <div style={{color:C.gold,fontWeight:700,fontSize:14,marginBottom:6}}>{area.title}</div>
                <div style={{color:C.muted,fontSize:13.5,lineHeight:1.6}}>{area.desc}</div>
              </div>
            ))}
          </div>

          <div style={{background:C.card,border:"1px solid #222",borderRadius:16,padding:24,marginBottom:20}}>
            <div style={{color:C.gold,fontWeight:700,fontSize:15,marginBottom:8}}>
              📦 {t6("Critical parts, closer when you need them.","Repuestos esenciales, más cerca cuando los necesitas.","Ricambi essenziali, più vicini quando servono.","Les pièces essentielles, plus proches lorsque vous en avez besoin.","Najważniejsze części bliżej, gdy ich potrzebujesz.","Ключевые запчасти ближе, когда они вам нужны.")}
            </div>
            <p style={{color:C.muted,fontSize:13,lineHeight:1.7,marginBottom:12}}>
              {t6("We keep a selected stock of frequently needed and critical components for TAAAC models. When a part is used, we can replenish the stock through our supply channel.","Mantenemos una selección de componentes críticos y de uso frecuente para los modelos TAAAC. Cuando utilizamos una pieza, podemos reponer el stock a través de nuestro canal de suministro.","Manteniamo una selezione di componenti critici e più frequentemente necessari per i modelli TAAAC. Quando utilizziamo un ricambio, possiamo reintegrare la scorta attraverso il nostro canale di fornitura.","Nous conservons une sélection de composants critiques et fréquemment nécessaires pour les modèles TAAAC. Lorsqu'une pièce est utilisée, nous pouvons réapprovisionner le stock par notre canal d'approvisionnement.","Utrzymujemy wybrany zapas najważniejszych i częściej potrzebnych komponentów do modeli TAAAC. Po wykorzystaniu części możemy uzupełnić zapas poprzez nasz kanał dostaw.","Мы поддерживаем выбранный запас наиболее важных и часто необходимых компонентов для моделей TAAAC. После использования детали запас может быть пополнен через наш канал поставок.")}
            </p>
            <p style={{color:C.muted,fontSize:13.5,lineHeight:1.6,fontStyle:"italic",margin:0}}>
              {t6("If a specific component is not in local stock, we help identify and source the correct part for your TAAAC.","Si un componente específico no está disponible en nuestro stock local, te ayudamos a identificar y conseguir la pieza correcta para tu TAAAC.","Se un componente specifico non è disponibile nella nostra scorta locale, ti aiutiamo a identificare e reperire il ricambio corretto per il tuo TAAAC.","Si un composant spécifique n'est pas disponible dans notre stock local, nous vous aidons à identifier et obtenir la pièce adaptée à votre TAAAC.","Jeśli konkretnego komponentu nie ma w lokalnym zapasie, pomagamy zidentyfikować i pozyskać właściwą część do Twojego TAAAC.","Если нужного компонента нет в локальном запасе, мы поможем определить и заказать подходящую деталь для вашего TAAAC.")}
            </p>
          </div>

          <div style={{marginBottom:28}}>
            <div style={{color:C.gold,fontWeight:700,fontSize:13,letterSpacing:1,textTransform:"uppercase",marginBottom:14}}>
              {t6("How assistance works","Cómo funciona la asistencia","Come funziona l'assistenza","Comment fonctionne l'assistance","Jak działa wsparcie","Как работает поддержка")}
            </div>
            <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(180px,1fr))",gap:14}}>
              {[
                {step:t6("Contact us","Contáctanos","Contattaci","Contactez-nous","Skontaktuj się z nami","Свяжитесь с нами"),
                  desc:t6("Tell us what is happening and, when useful, send photos or a short video.","Explícanos qué ocurre y, cuando sea útil, envíanos fotos o un breve vídeo.","Spiegaci cosa sta succedendo e, quando utile, inviaci foto o un breve video.","Expliquez-nous le problème et, si utile, envoyez-nous des photos ou une courte vidéo.","Opisz problem i, jeśli to pomocne, prześlij zdjęcia lub krótki film.","Опишите проблему и, при необходимости, отправьте фотографии или короткое видео.")},
                {step:t6("We assess it","Lo evaluamos","Valutiamo il problema","Nous l'évaluons","Oceniamy problem","Мы оцениваем проблему"),
                  desc:t6("We identify the likely issue and the most appropriate next step.","Identificamos la causa probable y el siguiente paso más adecuado.","Identifichiamo la possibile causa e il passo successivo più appropriato.","Nous identifions la cause probable et l'étape suivante la plus appropriée.","Określamy prawdopodobną przyczynę i odpowiedni kolejny krok.","Мы определяем вероятную причину и наиболее подходящий следующий шаг.")},
                {step:t6("We coordinate the solution","Coordinamos la solución","Coordiniamo la soluzione","Nous coordonnons la solution","Koordynujemy rozwiązanie","Мы координируем решение"),
                  desc:t6("Maintenance, repair or replacement part — depending on what your golf cart actually needs.","Mantenimiento, reparación o repuesto, según lo que realmente necesite tu golf cart.","Manutenzione, riparazione o ricambio, in base a ciò di cui il tuo golf cart ha realmente bisogno.","Entretien, réparation ou pièce de rechange, selon les besoins réels de votre golf cart.","Konserwacja, naprawa lub część zamienna — zależnie od rzeczywistych potrzeb Twojego golf carta.","Обслуживание, ремонт или запасная часть — в зависимости от того, что действительно требуется вашему гольф-кару.")},
              ].map((s,i)=>(
                <div key={i} style={{background:"#0000002a",border:"1px solid #C9A84C33",borderRadius:14,padding:"18px 14px"}}>
                  <div style={{width:26,height:26,borderRadius:"50%",background:"linear-gradient(135deg,#C9A84C,#E2C07A)",color:"#000",fontWeight:800,fontSize:13,display:"flex",alignItems:"center",justifyContent:"center",marginBottom:10}}>{i+1}</div>
                  <div style={{color:C.white,fontWeight:700,fontSize:13,marginBottom:5}}>{s.step}</div>
                  <div style={{color:C.muted,fontSize:13,lineHeight:1.5}}>{s.desc}</div>
                </div>
              ))}
            </div>
          </div>

          <div style={{marginBottom:40}}>
            <h2 style={{...S.title,fontSize:"clamp(1.3rem,3.4vw,1.8rem)",marginBottom:10}}>
              {t6("Care for your TAAAC. Keep it ready for every journey.","Cuida tu TAAAC. Mantenlo listo para cada recorrido.","Prenditi cura del tuo TAAAC. Mantienilo pronto per ogni viaggio.","Prenez soin de votre TAAAC. Gardez-le prêt pour chaque trajet.","Dbaj o swojego TAAAC. Utrzymuj go w gotowości do każdej podróży.","Заботьтесь о своём TAAAC. Поддерживайте его готовым к каждой поездке.")}
            </h2>
            <p style={{color:C.muted,fontSize:14,lineHeight:1.7,maxWidth:640,marginBottom:24}}>
              {t6("Two preventive inspections per year, direct support and a maintenance plan designed around the systems that matter most.","Dos revisiones preventivas al año, atención directa y un plan de mantenimiento centrado en los sistemas que más importan.","Due controlli preventivi all'anno, assistenza diretta e un piano di manutenzione dedicato ai sistemi più importanti.","Deux contrôles préventifs par an, une assistance directe et un programme d'entretien axé sur les systèmes les plus importants.","Dwa przeglądy prewencyjne rocznie, bezpośrednie wsparcie i plan konserwacji skoncentrowany na najważniejszych systemach.","Два профилактических осмотра в год, прямая поддержка и план обслуживания, ориентированный на наиболее важные системы.")}
            </p>

            <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(280px,1fr))",gap:18,marginBottom:20}}>

              {/* TAAAC Care */}
              <div style={{...S.card(false),padding:24}}>
                <div style={{color:C.gold,fontWeight:800,fontSize:18,marginBottom:4}}>TAAAC Care</div>
                <div style={{marginBottom:14}}>
                  <span style={{color:C.white,fontWeight:900,fontSize:28}}>$199</span>{" "}
                  <span style={{color:C.muted,fontSize:13}}>{t6("per year","al año","all'anno","par an","rocznie","в год")}</span>
                </div>
                <p style={{color:C.muted,fontSize:13,lineHeight:1.6,marginBottom:16}}>
                  {t6("Preventive maintenance and direct support for your TAAAC.","Mantenimiento preventivo y atención directa para tu TAAAC.","Manutenzione preventiva e assistenza diretta per il tuo TAAAC.","Entretien préventif et assistance directe pour votre TAAAC.","Konserwacja prewencyjna i bezpośrednie wsparcie dla Twojego TAAAC.","Профилактическое обслуживание и прямая поддержка вашего TAAAC.")}
                </p>

                <div style={{color:C.muted,fontSize:13.5,lineHeight:1.8,marginBottom:14}}>
                  ✓ {t6("Two preventive inspections per year, usually scheduled about six months apart.","Dos revisiones preventivas al año, normalmente programadas con unos seis meses de diferencia.","Due controlli preventivi all'anno, normalmente programmati a circa sei mesi di distanza.","Deux contrôles préventifs par an, généralement programmés à environ six mois d'intervalle.","Dwa przeglądy prewencyjne rocznie, zwykle planowane w odstępie około sześciu miesięcy.","Два профилактических осмотра в год, обычно с интервалом около шести месяцев.")}<br/>
                  ✓ {t6("Labor for the two scheduled inspections is included.","La mano de obra de las dos revisiones programadas está incluida.","La manodopera dei due controlli programmati è inclusa.","La main-d'œuvre des deux contrôles programmés est incluse.","Robocizna podczas dwóch zaplanowanych przeglądów jest wliczona w cenę.","Работа по двум плановым осмотрам включена в стоимость.")}<br/>
                  ✓ {t6("We keep track of your maintenance schedule and contact you when it's time to plan your next inspection.","Seguimos tu calendario de mantenimiento y te contactamos cuando llega el momento de programar la próxima revisión.","Teniamo sotto controllo il calendario di manutenzione e ti contattiamo quando è il momento di programmare il controllo successivo.","Nous suivons votre calendrier d'entretien et vous contactons lorsqu'il est temps de planifier votre prochain contrôle.","Monitorujemy harmonogram serwisowy i kontaktujemy się z Tobą, gdy nadejdzie czas na zaplanowanie kolejnego przeglądu.","Мы отслеживаем график обслуживания и связываемся с вами, когда приходит время запланировать следующий осмотр.")}
                </div>

                <div style={{color:C.muted,fontSize:13.5,lineHeight:2,marginBottom:14}}>
                  🛑 {t6("Brakes","Frenos","Freni","Freins","Hamulce","Тормоза")} ·{" "}
                  🔧 {t6("Suspension & shock absorbers","Suspensión y amortiguadores","Sospensioni e ammortizzatori","Suspension et amortisseurs","Zawieszenie i amortyzatory","Подвеска и амортизаторы")}<br/>
                  🔋 {t6("Lithium battery & BMS","Batería de litio y BMS","Batteria al litio e BMS","Batterie au lithium et BMS","Bateria litowa i BMS","Литиевая батарея и BMS")}<br/>
                  ☀️ {t6("Solar panel & charging system","Panel solar y sistema de carga","Pannello solare e sistema di ricarica","Panneau solaire et système de charge","Panel słoneczny i system ładowania","Солнечная панель и система зарядки")}<br/>
                  ⚡ {t6("Electrical components","Componentes eléctricos","Componenti elettrici","Composants électriques","Podzespoły elektryczne","Электрические компоненты")} ·{" "}
                  💡 {t6("Lighting","Iluminación","Illuminazione","Éclairage","Oświetlenie","Освещение")}<br/>
                  🧰 {t6("Support identifying and sourcing parts","Apoyo para identificar y conseguir repuestos","Supporto per identificare e reperire ricambi","Aide pour identifier et obtenir les pièces","Pomoc w identyfikacji i pozyskiwaniu części","Помощь в определении и поиске запчастей")}<br/>
                  📞 {t6("Direct post-sale support","Atención posventa directa","Assistenza post-vendita diretta","Assistance après-vente directe","Bezpośrednie wsparcie posprzedażowe","Прямая послепродажная поддержка")}
                </div>

                <p style={{color:C.muted,fontSize:12.5,lineHeight:1.6,fontStyle:"italic",marginBottom:12}}>
                  {t6("Replacement parts and repairs outside warranty coverage are not included and are quoted separately when required.","Los repuestos y las reparaciones fuera de la cobertura de garantía no están incluidos y se cotizan por separado cuando sea necesario.","I ricambi e le riparazioni fuori dalla copertura della garanzia non sono inclusi e vengono quotati separatamente quando necessario.","Les pièces de rechange et les réparations hors garantie ne sont pas incluses et font l'objet d'un devis séparé si nécessaire.","Części zamienne i naprawy poza zakresem gwarancji nie są wliczone i w razie potrzeby są wyceniane osobno.","Запасные части и ремонт вне гарантийного покрытия не включены и при необходимости рассчитываются отдельно.")}
                </p>
                <p style={{color:C.muted,fontSize:12.5,lineHeight:1.6,fontStyle:"italic",marginBottom:18}}>
                  {t6("TAAAC Care members may request a Courtesy Golf Cart at an additional cost when available.","Los miembros de TAAAC Care pueden solicitar un Golf Cart de Cortesía con un coste adicional cuando esté disponible.","I clienti TAAAC Care possono richiedere un Golf Cart di Cortesia a pagamento, quando disponibile.","Les membres TAAAC Care peuvent demander un Golf Cart de Courtoisie moyennant un coût supplémentaire, selon disponibilité.","Członkowie TAAAC Care mogą odpłatnie poprosić o zastępczy Golf Cart, jeśli jest dostępny.","Участники TAAAC Care могут запросить подменный гольф-кар за дополнительную плату при его наличии.")}
                </p>

                <a href={"https://wa.me/41764372290?text="+encodeURIComponent(t6("Hi, I'm interested in TAAAC Care.","Hola, me interesa TAAAC Care.","Ciao, sono interessato a TAAAC Care.","Bonjour, je suis intéressé par TAAAC Care.","Cześć, jestem zainteresowany/a TAAAC Care.","Здравствуйте, меня интересует TAAAC Care."))} target="_blank" rel="noopener noreferrer" style={{...S.outBtn,display:"block",textAlign:"center",textDecoration:"none",width:"100%",boxSizing:"border-box"}}>
                  {t6("Choose TAAAC Care","Elige TAAAC Care","Scegli TAAAC Care","Choisissez TAAAC Care","Wybierz TAAAC Care","Выберите TAAAC Care")}
                </a>
              </div>

              {/* TAAAC Care+ */}
              <div style={{...S.card(false),padding:24,border:"1.5px solid #C9A84C"}}>
                <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:4}}>
                  <div style={{color:C.gold,fontWeight:800,fontSize:18}}>TAAAC Care+</div>
                  <span style={{background:"#C9A84C22",color:C.gold,fontSize:10,fontWeight:700,padding:"3px 8px",borderRadius:8,textTransform:"uppercase",letterSpacing:0.5}}>
                    {t6("Enhanced Care","Protección ampliada","Assistenza avanzata","Assistance renforcée","Rozszerzona opieka","Расширенная поддержка")}
                  </span>
                </div>
                <div style={{marginBottom:14}}>
                  <span style={{color:C.white,fontWeight:900,fontSize:28}}>$399</span>{" "}
                  <span style={{color:C.muted,fontSize:13}}>{t6("per year","al año","all'anno","par an","rocznie","в год")}</span>
                </div>
                <p style={{color:C.muted,fontSize:13,lineHeight:1.6,marginBottom:16}}>
                  {t6("Everything in TAAAC Care, plus priority assistance and access to a Courtesy Golf Cart.","Todo lo incluido en TAAAC Care, más asistencia prioritaria y acceso a un Golf Cart de Cortesía.","Tutto ciò che è incluso in TAAAC Care, più assistenza prioritaria e accesso a un Golf Cart di Cortesia.","Tout ce qui est inclus dans TAAAC Care, plus une assistance prioritaire et l'accès à un Golf Cart de Courtoisie.","Wszystko, co obejmuje TAAAC Care, plus priorytetowa obsługa i dostęp do zastępczego Golf Carta.","Всё, что входит в TAAAC Care, плюс приоритетное обслуживание и доступ к подменному гольф-кару.")}
                </p>

                <div style={{color:C.muted,fontSize:13.5,lineHeight:1.8,marginBottom:14}}>
                  ⭐ {t6("Priority assistance when your TAAAC requires service.","Atención prioritaria cuando tu TAAAC necesita asistencia.","Assistenza prioritaria quando il tuo TAAAC necessita di un intervento.","Assistance prioritaire lorsque votre TAAAC nécessite une intervention.","Priorytetowa obsługa, gdy Twój TAAAC wymaga serwisu.","Приоритетное обслуживание, когда вашему TAAAC требуется сервис.")}
                </div>

                <div style={{background:"#0000002a",border:"1px solid #C9A84C33",borderRadius:12,padding:14,marginBottom:16}}>
                  <div style={{color:C.gold,fontWeight:700,fontSize:12.5,marginBottom:8}}>
                    🚗 {t6("Courtesy Golf Cart","Golf Cart de Cortesía","Golf Cart di Cortesia","Golf Cart de Courtoisie","Zastępczy Golf Cart","Подменный гольф-кар")}
                  </div>
                  <div style={{color:C.muted,fontSize:12.5,lineHeight:1.7}}>
                    {t6("If TAAAC determines that an eligible repair is expected to require 24 hours or more, Care+ members can access a Courtesy Golf Cart, subject to availability and service area.","Si TAAAC determina que una reparación requiere previsiblemente 24 horas o más, los miembros Care+ pueden acceder a un Golf Cart de Cortesía, sujeto a disponibilidad y zona de servicio.","Se TAAAC determina che una riparazione richiede prevedibilmente almeno 24 ore, i clienti Care+ possono accedere a un Golf Cart di Cortesia, soggetto a disponibilità e area di servizio.","Si TAAAC estime qu'une réparation devrait nécessiter au moins 24 heures, les membres Care+ peuvent accéder à un Golf Cart de Courtoisie, sous réserve de disponibilité et de la zone de service.","Jeśli TAAAC oceni, że naprawa będzie wymagała co najmniej 24 godzin, członkowie Care+ mogą skorzystać z zastępczego Golf Carta, zależnie od dostępności i obszaru serwisu.","Если TAAAC определит, что ремонт предположительно займёт не менее 24 часов, участники Care+ могут получить подменный гольф-кар при наличии и в пределах зоны обслуживания.")}
                    <br/><br/>
                    {t6("Up to 2 days included per eligible repair. Additional days may be available depending on availability and applicable conditions.","Hasta 2 días incluidos por reparación elegible. Los días adicionales pueden estar disponibles según disponibilidad y condiciones aplicables.","Fino a 2 giorni inclusi per ogni riparazione idonea. Eventuali giorni aggiuntivi possono essere disponibili in base alla disponibilità e alle condizioni applicabili.","Jusqu'à 2 jours inclus par réparation éligible. Des jours supplémentaires peuvent être disponibles selon la disponibilité et les conditions applicables.","Do 2 dni w cenie na każdą kwalifikującą się naprawę. Dodatkowe dni mogą być dostępne zależnie od dostępności i obowiązujących warunków.","До 2 дней включено для каждого подходящего случая ремонта. Дополнительные дни могут быть доступны при наличии и на применимых условиях.")}
                    <br/><br/>
                    {t6("Courtesy Golf Cart service is currently available in Bayahibe, Dominicus and Casa de Campo.","El servicio de Golf Cart de Cortesía está disponible actualmente en Bayahibe, Dominicus y Casa de Campo.","Il servizio Golf Cart di Cortesia è attualmente disponibile a Bayahibe, Dominicus e Casa de Campo.","Le service Golf Cart de Courtoisie est actuellement disponible à Bayahibe, Dominicus et Casa de Campo.","Usługa zastępczego Golf Carta jest obecnie dostępna w Bayahibe, Dominicus i Casa de Campo.","Услуга подменного гольф-кара в настоящее время доступна в Байяибе, Доминикус и Casa de Campo.")}
                    <br/><br/>
                    {t6("Normal charging during use is the customer's responsibility. Damage caused by improper use may be charged to the customer.","La recarga normal durante el uso es responsabilidad del cliente. Los daños causados por un uso inadecuado pueden ser cargados al cliente.","La normale ricarica durante l'utilizzo è a carico del cliente. Eventuali danni causati da un uso improprio possono essere addebitati al cliente.","La recharge normale pendant l'utilisation est à la charge du client. Les dommages causés par une utilisation inappropriée peuvent être facturés au client.","Standardowe ładowanie podczas użytkowania leży po stronie klienta. Koszty szkód spowodowanych niewłaściwym użytkowaniem mogą zostać obciążone klientowi.","Обычная зарядка во время использования осуществляется за счёт клиента. Ущерб, вызванный неправильным использованием, может быть возложен на клиента.")}
                    <br/><br/>
                    {t6("The Courtesy Golf Cart is checked together with the customer at handover and return.","El Golf Cart de Cortesía se revisa junto con el cliente en la entrega y en la devolución.","Il Golf Cart di Cortesia viene controllato insieme al cliente alla consegna e alla restituzione.","Le Golf Cart de Courtoisie est contrôlé avec le client lors de la remise et du retour.","Stan zastępczego Golf Carta jest sprawdzany wspólnie z klientem przy wydaniu i zwrocie.","Состояние подменного гольф-кара проверяется вместе с клиентом при выдаче и возврате.")}
                    <br/><br/>
                    {t6("Courtesy Golf Cart access is linked to the Care+ plan and repair duration, not to warranty coverage.","El acceso al Golf Cart de Cortesía depende del plan Care+ y de la duración de la reparación, no de la cobertura de garantía.","L'accesso al Golf Cart di Cortesia dipende dal piano Care+ e dalla durata della riparazione, non dalla copertura della garanzia.","L'accès au Golf Cart de Courtoisie dépend du plan Care+ et de la durée de la réparation, et non de la couverture de garantie.","Dostęp do zastępczego Golf Carta zależy od planu Care+ i czasu naprawy, a nie od zakresu gwarancji.","Доступ к подменному гольф-кару зависит от плана Care+ и продолжительности ремонта, а не от гарантийного покрытия.")}
                  </div>
                </div>

                <a href={"https://wa.me/41764372290?text="+encodeURIComponent(t6("Hi, I'm interested in TAAAC Care+.","Hola, me interesa TAAAC Care+.","Ciao, sono interessato a TAAAC Care+.","Bonjour, je suis intéressé par TAAAC Care+.","Cześć, jestem zainteresowany/a TAAAC Care+.","Здравствуйте, меня интересует TAAAC Care+."))} target="_blank" rel="noopener noreferrer" style={{...S.goldBtn,display:"block",textAlign:"center",textDecoration:"none",width:"100%",boxSizing:"border-box"}}>
                  {t6("Choose TAAAC Care+","Elige TAAAC Care+","Scegli TAAAC Care+","Choisissez TAAAC Care+","Wybierz TAAAC Care+","Выберите TAAAC Care+")}
                </a>
              </div>
            </div>

            <div style={{background:C.card,border:"1px solid #222",borderRadius:14,padding:"18px 20px"}}>
              <div style={{color:C.gold,fontWeight:700,fontSize:11,letterSpacing:1,textTransform:"uppercase",marginBottom:10}}>
                {t6("Plan terms","Condiciones del plan","Condizioni del piano","Conditions du programme","Warunki planu","Условия плана")}
              </div>
              <div style={{color:C.muted,fontSize:12.5,lineHeight:1.9}}>
                • {t6("Scheduled home service visits included in Bayahibe, Dominicus and Casa de Campo.","Las visitas programadas a domicilio están incluidas en Bayahibe, Dominicus y Casa de Campo.","Le visite programmate a domicilio sono incluse a Bayahibe, Dominicus e Casa de Campo.","Les visites d'entretien programmées à domicile sont incluses à Bayahibe, Dominicus et Casa de Campo.","Zaplanowane wizyty serwisowe u klienta są wliczone w cenę w Bayahibe, Dominicus i Casa de Campo.","Плановые выездные сервисные визиты включены в Байяибе, Доминикус и Casa de Campo.")}<br/>
                • {t6("Service conditions for other locations are evaluated according to distance and location.","Las condiciones del servicio para otras localidades se evalúan según la distancia y la ubicación.","Le condizioni del servizio per le altre località vengono valutate in base alla distanza e alla zona.","Les conditions de service pour les autres localités sont évaluées selon la distance et la zone.","Warunki serwisu w innych lokalizacjach są ustalane w zależności od odległości i miejsca.","Условия обслуживания в других регионах определяются в зависимости от расстояния и местоположения.")}<br/>
                • {t6("12-month plan from activation date.","Plan de 12 meses desde la fecha de activación.","Piano di 12 mesi dalla data di attivazione.","Programme de 12 mois à compter de la date d'activation.","Plan na 12 miesięcy od daty aktywacji.","План на 12 месяцев с даты активации.")}<br/>
                • {t6("TAAAC Care is designed for TAAAC golf carts. Other golf carts may be accepted after an individual assessment.","TAAAC Care está diseñado para golf carts TAAAC. Otros golf carts pueden ser aceptados después de una evaluación individual.","TAAAC Care è pensato per i golf cart TAAAC. Altri golf cart possono essere accettati previa valutazione individuale.","TAAAC Care est conçu pour les golf carts TAAAC. D'autres golf carts peuvent être acceptés après une évaluation individuelle.","TAAAC Care został stworzony dla golf cartów TAAAC. Inne pojazdy mogą zostać przyjęte po indywidualnej ocenie.","TAAAC Care предназначен для гольф-каров TAAAC. Другие гольф-кары могут быть приняты после индивидуальной оценки.")}<br/>
                • {t6("Annual payment in advance.","Pago anual por adelantado.","Pagamento annuale anticipato.","Paiement annuel à l'avance.","Roczna płatność z góry.","Ежегодная предоплата.")}<br/>
                • {t6("Pay 3 years in advance and receive 5% off each year.","Paga 3 años por adelantado y recibe un 5% de descuento cada año.","Paga 3 anni in anticipo e ricevi il 5% di sconto su ogni anno.","Payez 3 ans à l'avance et bénéficiez de 5 % de réduction chaque année.","Zapłać z góry za 3 lata i otrzymaj 5% zniżki na każdy rok.","Оплатите 3 года заранее и получите скидку 5% на каждый год.")}<br/>
                • {t6("Unused annual inspections do not carry over to the next plan year. Renewal conditions may be evaluated individually.","Las revisiones anuales no utilizadas no se acumulan para el año siguiente. Las condiciones de renovación pueden evaluarse individualmente.","I controlli annuali non utilizzati non si accumulano nell'anno successivo. Eventuali condizioni di rinnovo possono essere valutate individualmente.","Les contrôles annuels non utilisés ne sont pas reportés sur l'année suivante. Les conditions de renouvellement peuvent être évaluées individuellement.","Niewykorzystane przeglądy roczne nie przechodzą na kolejny rok. Warunki odnowienia mogą być oceniane indywidualnie.","Неиспользованные ежегодные осмотры не переносятся на следующий год. Условия продления могут рассматриваться индивидуально.")}
              </div>
            </div>
          </div>

          <a href="https://wa.me/41764372290" target="_blank" rel="noopener noreferrer" style={{display:"flex",alignItems:"center",justifyContent:"center",gap:8,background:"transparent",color:"#25D366",border:"1.5px solid #25D366",borderRadius:14,padding:"14px 20px",fontSize:14,fontWeight:700,textDecoration:"none",marginBottom:12}}>
            <svg viewBox="0 0 32 32" width="18" height="18" fill="#25D366"><path d="M16.001 3C9.373 3 4 8.373 4 15c0 2.625.86 5.055 2.312 7.031L4 29l7.157-2.281A11.94 11.94 0 0 0 16.001 27C22.628 27 28 21.627 28 15S22.628 3 16.001 3zm0 2c5.523 0 10 4.477 10 10s-4.477 10-10 10a9.96 9.96 0 0 1-5.086-1.398l-.365-.217-3.789 1.207 1.229-3.693-.239-.38A9.96 9.96 0 0 1 6 15c0-5.523 4.478-10 10.001-10zm-3.61 5.06c-.198 0-.52.074-.792.372-.271.297-1.04 1.016-1.04 2.479 0 1.463 1.065 2.876 1.213 3.075.148.198 2.057 3.278 5.076 4.462 2.516.988 3.028.792 3.575.743.546-.05 1.762-.72 2.01-1.414.247-.694.247-1.29.173-1.414-.074-.124-.271-.198-.568-.347-.297-.148-1.762-.87-2.036-.968-.273-.099-.472-.148-.67.148-.198.297-.767.968-.94 1.166-.173.198-.347.223-.644.074-.297-.148-1.253-.462-2.387-1.472-.883-.788-1.48-1.762-1.653-2.06-.173-.297-.019-.457.13-.605.134-.133.297-.347.446-.52.148-.174.198-.298.297-.496.099-.198.05-.372-.025-.52-.074-.148-.67-1.613-.918-2.208-.242-.583-.487-.504-.67-.513-.173-.008-.371-.01-.57-.01z"/></svg>
            {t6("Need assistance? Contact us on WhatsApp","¿Necesitas asistencia? Contáctanos por WhatsApp","Hai bisogno di assistenza? Contattaci su WhatsApp","Besoin d'assistance ? Contactez-nous sur WhatsApp","Potrzebujesz pomocy? Skontaktuj się z nami przez WhatsApp","Нужна помощь? Свяжитесь с нами в WhatsApp")}
          </a>
          <div style={{color:C.muted,fontSize:13,textAlign:"center",opacity:0.8}}>
            {t6("Support remains available after the warranty period.","El soporte sigue disponible después del período de garantía.","Il supporto resta disponibile anche dopo il periodo di garanzia.","L'assistance reste disponible après la période de garantie.","Wsparcie pozostaje dostępne również po okresie gwarancyjnym.","Поддержка остаётся доступной и после окончания гарантийного периода.")}
          </div>
        </div>

        <p style={{color:C.muted,fontSize:13,marginBottom:20}}>{t("Select one or more services","Selecciona uno o más servicios","Seleziona uno o più servizi")}</p>
        <div style={S.grid2}>
          {services.map(svc=>{
            const sel = selServices.includes(svc.en);
            return (
              <div key={svc.en}
                onClick={()=>toggleSvc(svc.en)}
                style={{...S.card(sel),display:"flex",alignItems:"center",gap:14,cursor:"pointer",transition:"all .15s"}}>
                <span style={{fontSize:24}}>{svc.icon}</span>
                <div style={{flex:1}}>
                  <div style={{color:sel?C.gold:C.white,fontWeight:700,fontSize:14}}>{t(svc.en,svc.es,svc.it)}</div>
                </div>
                {sel && <span style={{color:C.gold,fontSize:18}}>✓</span>}
              </div>
            );
          })}

          {/* Casella ALTRO */}
          <div
            onClick={()=>toggleSvc("altro")}
            style={{...S.card(altroSel),display:"flex",alignItems:"center",gap:14,cursor:"pointer",transition:"all .15s"}}>
            <span style={{fontSize:24}}>✏️</span>
            <div style={{flex:1}}>
              <div style={{color:altroSel?C.gold:C.white,fontWeight:700,fontSize:14}}>{t("Other","Otro","Altro")}</div>
            </div>
            {altroSel && <span style={{color:C.gold,fontSize:18}}>✓</span>}
          </div>
        </div>

        {/* Campo testo se ALTRO selezionato */}
        {altroSel && (
          <div style={{marginTop:16}}>
            <textarea
              placeholder={t("Describe what you need...","Describe lo que necesitas...","Descrivi cosa ti serve...")}
              value={altroText}
              onChange={e=>setAltroText(e.target.value)}
              style={{width:"100%",background:"#111",border:"1.5px solid #C9A84C",borderRadius:10,padding:"12px 14px",color:"#F5F0E8",fontSize:13,outline:"none",boxSizing:"border-box",minHeight:80,resize:"vertical",fontFamily:"inherit"}}
            />
          </div>
        )}

        <div style={{marginTop:28,display:"flex",gap:12,flexWrap:"wrap"}}>
          <button
            onClick={handleBook}
            style={{flex:1,minWidth:160,background:"linear-gradient(135deg,#C9A84C,#E2C07A)",color:"#000",border:"none",borderRadius:14,padding:"14px 20px",fontSize:14,fontWeight:800,cursor:"pointer",letterSpacing:.5}}>
            📅 {t("Book","Reservar","Prenota")}
          </button>
          <button
            onClick={()=>{setPrevPage("service");setPage("contact");}}
            style={{flex:1,minWidth:160,background:"transparent",color:"#C9A84C",border:"1.5px solid #C9A84C",borderRadius:14,padding:"14px 20px",fontSize:14,fontWeight:700,cursor:"pointer"}}>
            📞 {t("Contact Us","Contáctanos","Contattaci")}
          </button>
        </div>
        <div style={{marginTop:12}}>
          <button style={S.outBtn} onClick={()=>setPage(prevPage)}>← {t("Back","Atrás","Indietro")}</button>
        </div>
      </div>
    );
  }

  function ModelPage() {
    const modelId = page.replace("model-","").toUpperCase();
    const model = MODELS.find(m=>m.id===modelId);
    if(!model) return null;

    const intros = {
      A: {
        en: "The elegant choice for golf courses, resorts and hotels in the Dominican Republic. Timeless design, a smooth 3.5kW motor, and an 80-100 km range built for effortless everyday use. Fully customizable — from body color to seats — and ready to become uniquely yours.",
        es: "La elección elegante para campos de golf, resorts y hoteles en República Dominicana. Diseño atemporal, motor suave de 3.5kW y una autonomía de 80-100 km pensada para el uso diario sin esfuerzo. Totalmente personalizable — desde el color hasta los asientos — y listo para ser único, tuyo.",
        it: "La scelta elegante per campi da golf, resort e hotel in Repubblica Dominicana. Design senza tempo, motore fluido da 3.5kW e un'autonomia di 80-100 km pensata per l'uso quotidiano senza pensieri. Completamente personalizzabile — dal colore della carrozzeria ai sedili — pronto per diventare unico, tuo.",
      },
      B: {
        en: "Built for terrain that says no to ordinary carts. With a powerful 4kW motor and 25% slope capability, Model B conquers unpaved roads, hillside properties and rugged Caribbean landscapes without compromise. Rugged outside, fully personalizable inside.",
        es: "Construido para terrenos que dicen no a los carritos comunes. Con un potente motor de 4kW y capacidad de pendiente del 25%, el Model B conquista caminos sin asfaltar, propiedades en cuestas y paisajes caribeños difíciles sin comprometer nada. Robusto por fuera, totalmente personalizable por dentro.",
        it: "Costruito per terreni che dicono no ai carrelli comuni. Con un potente motore da 4kW e una pendenza superabile del 25%, il Model B conquista strade sterrate, proprietà in collina e paesaggi caraibici impegnativi senza compromessi. Robusto fuori, completamente personalizzabile dentro.",
      },
      C: {
        en: "Refined performance meets bold style. Leather seating, premium wheels, and the same dependable 4kW motor as our Off-Road line — Model C is built to turn heads on the roads of your residence, resort or private community.",
        es: "Rendimiento refinado con estilo audaz. Asientos de cuero, llantas premium y el mismo motor confiable de 4kW de nuestra línea Off-Road — el Model C está hecho para destacar en las calles de tu residencia, resort o comunidad privada.",
        it: "Prestazioni raffinate incontrano uno stile audace. Sedili in pelle, cerchi premium e lo stesso affidabile motore da 4kW della nostra linea Off-Road — il Model C è pensato per farsi notare sulle strade della tua residenza, resort o community privata.",
      },
      D: {
        en: "Maximum comfort for families and groups. Extra seating configurations, a spacious layout, and room for golf bags make Model D the go-to choice for larger households and properties that host guests often.",
        es: "Máximo confort para familias y grupos. Configuraciones de asientos adicionales, un diseño espacioso y espacio para bolsas de golf hacen del Model D la opción ideal para hogares numerosos y propiedades que reciben huéspedes con frecuencia.",
        it: "Massimo comfort per famiglie e gruppi. Configurazioni sedili extra, un layout spazioso e spazio per le sacche da golf rendono il Model D la scelta ideale per famiglie numerose e proprietà che ospitano spesso.",
      },
    };
    const intro = intros[modelId];
    const specs = model.specs[lang] || model.specs.en;

    const handleConfigureThis = () => {
      upd("model", modelId);
      upd("motor", defaultMotorFor(modelId, "2"));
      upd("battery", defaultBatteryFor("2"));
      upd("seats", "2");
      upd("bodyColor", {code:"RAL 9010",hex:"#FFFFFF",it:"Bianco puro",es:"Blanco puro",en:"Pure white"});
      upd("seatType", "standard");
      upd("steering", "standard");
      upd("tire", "offroad-12");
      setPage("configurator");
      setStep(-1);
    };

    return (
      <div style={S.sec}>
        <div style={{color:C.gold,fontSize:10,letterSpacing:4,fontWeight:700,marginBottom:14,textTransform:"uppercase"}}>{model.tag}</div>
        <h1 style={S.title}>{t(model.name.split(" / ")[0], model.name.split(" / ")[1], model.name.split(" / ")[2])}</h1>
        <div style={S.goldLine}/>

        <div style={{display:"flex",justifyContent:"center",marginBottom:20}}>
          <Img k={model.imgKey} eager={true} style={{maxHeight:260,maxWidth:"100%",objectFit:"contain"}}/>
        </div>

        <div style={{color:C.goldLight,fontWeight:800,fontSize:22,textAlign:"center",marginBottom:6}}>
          {t("Starting from","Desde","A partire da")} ${model.price.toLocaleString()} USD
        </div>
        <div style={{color:C.muted,fontSize:13.5,fontWeight:500,textAlign:"center",marginBottom:20}}>
          {t6("Configure it your way. Clear pricing from the start.","Configúralo a tu manera. Precio claro desde el principio.","Configuralo a modo tuo. Prezzo chiaro fin dall'inizio.","Configurez-le à votre façon. Un prix clair dès le départ.","Skonfiguruj go po swojemu. Jasna cena od samego początku.","Настройте его по-своему. Понятная цена с самого начала.")}
        </div>

        <p style={{color:C.muted,fontSize:15,lineHeight:1.8,marginBottom:28,textAlign:"center",maxWidth:640,marginLeft:"auto",marginRight:"auto"}}>
          {intro[lang] || intro.en}
        </p>

        <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(140px,1fr))",gap:10,marginBottom:28}}>
          {Object.entries(specs).map(([k,v])=>(
            <div key={k} style={{background:C.surface,borderRadius:10,padding:12,textAlign:"center"}}>
              <div style={{color:C.muted,fontSize:11,marginBottom:3}}>{k}</div>
              <div style={{color:C.white,fontWeight:700,fontSize:13}}>{v}</div>
            </div>
          ))}
        </div>

        <div style={{background:C.card,borderRadius:14,padding:20,marginBottom:20,border:"1px solid #C9A84C33"}}>
          <div style={{color:C.gold,fontWeight:700,fontSize:13,marginBottom:4}}>{t("What's included","Qué incluye","Cosa include")}</div>
          <div style={{color:C.goldLight,fontSize:12,fontWeight:600,fontStyle:"italic",marginBottom:14}}>
            {t6("Complete from the start. Personalized by you.","Completo desde el inicio. Personalizado por ti.","Completo fin dall'inizio. Personalizzato da te.","Complet dès le départ. Personnalisé par vous.","Kompletny od samego początku. Spersonalizowany przez Ciebie.","Полностью укомплектован с самого начала. Персонализирован вами.")}
          </div>

          <div style={{color:C.gold,fontSize:10,letterSpacing:1.5,fontWeight:700,textTransform:"uppercase",marginBottom:6}}>
            {t6("Included in the price","Incluido en el precio","Incluso nel prezzo","Inclus dans le prix","W cenie","Включено в цену")}
          </div>
          <div style={{color:C.muted,fontSize:13,lineHeight:1.9,marginBottom:14}}>
            ⚙️ {t6("Standard model configuration included.","Configuración estándar del modelo incluida.","Configurazione standard del modello inclusa.","Configuration standard du modèle incluse.","Standardowa konfiguracja modelu w cenie.","Стандартная комплектация модели включена.")}<br/>
            ☀️ {t("Solar panel included on every unit","Panel solar incluido en cada unidad","Pannello solare incluso su ogni unità")}<br/>
            🛡️ {t("12-month warranty included","Garantía de 12 meses incluida","Garanzia 12 mesi inclusa")}<br/>
            🚚 {t6("Standard delivery in the Dominican Republic included.","Entrega estándar en República Dominicana incluida.","Consegna standard in Repubblica Dominicana inclusa.","Livraison standard en République dominicaine incluse.","Standardowa dostawa na terenie Dominikany w cenie.","Стандартная доставка по Доминиканской Республике включена.")}
          </div>

          <div style={{color:C.gold,fontSize:10,letterSpacing:1.5,fontWeight:700,textTransform:"uppercase",marginBottom:6}}>
            {t6("Customizable","Personalizable","Personalizzabile","Personnalisable","Personalizowany","Настраиваемый")}
          </div>
          <div style={{color:C.muted,fontSize:13,lineHeight:1.9,marginBottom:14}}>
            🎨 {t("Fully customizable body color, seats and accessories","Color, asientos y accesorios totalmente personalizables","Colore carrozzeria, sedili e accessori completamente personalizzabili")}<br/>
            🪑 {t("Seat configurations: 2, 2+2 or 4+2","Configuraciones de asientos: 2, 2+2 o 4+2","Configurazioni sedili: 2, 2+2 o 4+2")}
          </div>

          <div style={{borderTop:"1px solid #222",paddingTop:10}}>
            <span style={{color:C.muted,fontSize:13,opacity:0.75}}>🕒 {t("Estimated delivery: ~90 days from deposit","Entrega estimada: ~90 días desde el depósito","Consegna stimata: ~90 giorni dal deposito")}</span>
          </div>
        </div>

        <div style={{display:"flex",gap:12,flexWrap:"wrap",marginBottom:12}}>
          <button onClick={handleConfigureThis} style={{flex:1,minWidth:200,background:"linear-gradient(135deg,#C9A84C,#E2C07A)",color:"#000",border:"none",borderRadius:14,padding:"16px 20px",fontSize:15,fontWeight:800,cursor:"pointer"}}>
            🚗 {t("Configure this Model","Configurar este Modelo","Configura questo Modello")}
          </button>
          <a href="https://wa.me/41764372290" target="_blank" rel="noopener noreferrer" style={{flex:1,minWidth:200,background:"transparent",color:"#25D366",border:"1.5px solid #25D366",borderRadius:14,padding:"16px 20px",fontSize:15,fontWeight:700,cursor:"pointer",textDecoration:"none",display:"flex",alignItems:"center",justifyContent:"center",gap:8}}>
            <svg viewBox="0 0 32 32" width="18" height="18" fill="#25D366"><path d="M16.001 3C9.373 3 4 8.373 4 15c0 2.625.86 5.055 2.312 7.031L4 29l7.157-2.281A11.94 11.94 0 0 0 16.001 27C22.628 27 28 21.627 28 15S22.628 3 16.001 3zm0 2c5.523 0 10 4.477 10 10s-4.477 10-10 10a9.96 9.96 0 0 1-5.086-1.398l-.365-.217-3.789 1.207 1.229-3.693-.239-.38A9.96 9.96 0 0 1 6 15c0-5.523 4.478-10 10.001-10zm-3.61 5.06c-.198 0-.52.074-.792.372-.271.297-1.04 1.016-1.04 2.479 0 1.463 1.065 2.876 1.213 3.075.148.198 2.057 3.278 5.076 4.462 2.516.988 3.028.792 3.575.743.546-.05 1.762-.72 2.01-1.414.247-.694.247-1.29.173-1.414-.074-.124-.271-.198-.568-.347-.297-.148-1.762-.87-2.036-.968-.273-.099-.472-.148-.67.148-.198.297-.767.968-.94 1.166-.173.198-.347.223-.644.074-.297-.148-1.253-.462-2.387-1.472-.883-.788-1.48-1.762-1.653-2.06-.173-.297-.019-.457.13-.605.134-.133.297-.347.446-.52.148-.174.198-.298.297-.496.099-.198.05-.372-.025-.52-.074-.148-.67-1.613-.918-2.208-.242-.583-.487-.504-.67-.513-.173-.008-.371-.01-.57-.01z"/></svg>
            WhatsApp
          </a>
        </div>
        <button style={S.outBtn} onClick={()=>setPage("home")}>← {t("Back to Home","Volver al Inicio","Torna alla Home")}</button>
      </div>
    );
  }

  // Registro delle guide pubblicate — aggiungere qui le prossime guide per farle comparire automaticamente su /guias.
  const GUIDES_REGISTRY = [
    {
      slug: "como-elegir-carrito-de-golf-republica-dominicana",
      title: {en:"How to Choose a Golf Cart in the Dominican Republic",es:"Cómo Elegir un Carrito de Golf en República Dominicana",it:"Come Scegliere un Golf Cart nella Repubblica Dominicana",fr:"Comment Choisir un Golf Cart en République Dominicaine",pl:"Jak Wybrać Wózek Golfowy w Dominikanie",ru:"Как Выбрать Гольф-кар в Доминиканской Республике"},
      excerpt: {en:"Discover what to consider before buying: battery, power, range, number of seats, terrain, maintenance and support.",es:"Descubre qué debes tener en cuenta antes de comprar: batería, potencia, autonomía, número de plazas, terreno, mantenimiento y asistencia.",it:"Scopri cosa considerare prima di comprare: batteria, potenza, autonomia, numero di posti, terreno, manutenzione e assistenza.",fr:"Découvrez ce qu'il faut prendre en compte avant d'acheter : batterie, puissance, autonomie, nombre de places, terrain, entretien et assistance.",pl:"Dowiedz się, co wziąć pod uwagę przed zakupem: baterię, moc, zasięg, liczbę miejsc, teren, konserwację i wsparcie.",ru:"Узнайте, что учитывать перед покупкой: батарею, мощность, запас хода, количество мест, местность, обслуживание и поддержку."},
    },
    {
      slug: "bateria-litio-vs-plomo-carrito-de-golf",
      title: {en:"Lithium vs Lead Battery for a Golf Cart",es:"Batería de Litio vs Plomo para Carrito de Golf",it:"Batteria al Litio vs Piombo per un Golf Cart",fr:"Batterie Lithium vs Plomb pour un Golf Cart",pl:"Bateria Litowa czy Ołowiowa do Wózka Golfowego",ru:"Литиевая или Свинцовая Батарея для Гольф-кара"},
      excerpt: {en:"Discover the differences between LiFePO4, flooded lead-acid and AGM: maintenance, weight, range, charging, BMS, cost and what to consider in the Dominican Republic.",es:"Descubre las diferencias entre LiFePO4, plomo-ácido flooded y AGM: mantenimiento, peso, autonomía, carga, BMS, coste y qué conviene valorar en República Dominicana.",it:"Scopri le differenze tra LiFePO4, piombo-acido flooded e AGM: manutenzione, peso, autonomia, ricarica, BMS, costo e cosa valutare in Repubblica Dominicana.",fr:"Découvrez les différences entre LiFePO4, plomb-acide flooded et AGM : entretien, poids, autonomie, charge, BMS, coût et ce qu'il convient d'évaluer en République Dominicaine.",pl:"Poznaj różnice między LiFePO4, zalewowym ołowiem kwasowym i AGM: konserwacja, waga, zasięg, ładowanie, BMS, koszt i co warto ocenić w Dominikanie.",ru:"Узнайте различия между LiFePO4, заливными свинцово-кислотными и AGM батареями: обслуживание, вес, запас хода, зарядка, BMS, стоимость и что учитывать в Доминиканской Республике."},
    },
    {
      slug: "48v-vs-72v-carrito-de-golf",
      title: {en:"48V vs 72V: Which Voltage Should You Choose for Your Golf Cart?",es:"48V vs 72V: ¿Qué Voltaje Elegir para tu Carrito de Golf?",it:"48V vs 72V: Quale Voltaggio Scegliere per il Tuo Golf Cart?",fr:"48V ou 72V : Quelle Tension Choisir pour Votre Golf Cart ?",pl:"48V czy 72V: Jakie Napięcie Wybrać do Wózka Golfowego?",ru:"48В или 72В: Какое Напряжение Выбрать для Гольф-кара?"},
      excerpt: {en:"Discover what really changes between 48V and 72V: power, range, speed, slopes, battery, motor, controller and which configuration to choose based on your use.",es:"Descubre qué cambia realmente entre 48V y 72V: potencia, autonomía, velocidad, pendientes, batería, motor, controlador y qué configuración elegir según tu uso.",it:"Scopri cosa cambia realmente tra 48V e 72V: potenza, autonomia, velocità, pendenze, batteria, motore, controller e quale configurazione scegliere in base al tuo utilizzo.",fr:"Découvrez ce qui change vraiment entre 48V et 72V : puissance, autonomie, vitesse, pentes, batterie, moteur, contrôleur et quelle configuration choisir selon votre usage.",pl:"Dowiedz się, co naprawdę zmienia się między 48V a 72V: moc, zasięg, prędkość, nachylenia, bateria, silnik, kontroler i którą konfigurację wybrać w zależności od zastosowania.",ru:"Узнайте, что на самом деле меняется между 48В и 72В: мощность, запас хода, скорость, уклоны, батарея, двигатель, контроллер и какую конфигурацию выбрать в зависимости от использования."},
    },
    {
      slug: "carrito-de-golf-2-4-o-6-plazas",
      title: {en:"2, 4, or 6-Seat Golf Cart: Which Should You Choose?",es:"Carrito de Golf de 2, 4 o 6 Plazas: ¿Cuál Elegir?",it:"Golf Cart da 2, 4 o 6 Posti: Quale Scegliere?",fr:"Golf Cart 2, 4 ou 6 Places : Lequel Choisir ?",pl:"Wózek Golfowy na 2, 4 czy 6 Miejsc: Który Wybrać?",ru:"Гольф-кар на 2, 4 или 6 Мест: Что Выбрать?"},
      excerpt: {en:"Discover which configuration to choose based on passengers, space, weight, range, maneuverability and real use in the Dominican Republic.",es:"Descubre qué configuración elegir según pasajeros, espacio, peso, autonomía, maniobrabilidad y uso real en República Dominicana.",it:"Scopri quale configurazione scegliere in base a passeggeri, spazio, peso, autonomia, maneggevolezza e uso reale in Repubblica Dominicana.",fr:"Découvrez quelle configuration choisir selon les passagers, l'espace, le poids, l'autonomie, la maniabilité et l'usage réel en République Dominicaine.",pl:"Dowiedz się, którą konfigurację wybrać w zależności od pasażerów, przestrzeni, wagi, zasięgu, zwrotności i rzeczywistego użytkowania w Dominikanie.",ru:"Узнайте, какую конфигурацию выбрать в зависимости от пассажиров, пространства, веса, запаса хода, манёвренности и реального использования в Доминиканской Республике."},
    },
    {
      slug: "que-revisar-antes-de-comprar-carrito-de-golf",
      title: {en:"What to Check Before Buying a Golf Cart",es:"Qué Revisar Antes de Comprar un Carrito de Golf",it:"Cosa Controllare Prima di Comprare un Golf Cart",fr:"Que Vérifier Avant d'Acheter un Golf Cart",pl:"Co Sprawdzić Przed Zakupem Wózka Golfowego",ru:"Что Проверить Перед Покупкой Гольф-кара"},
      excerpt: {en:"A complete checklist to check battery, BMS, motor, brakes, chassis, warranty, spare parts, service and real cost before buying.",es:"Una checklist completa para revisar batería, BMS, motor, frenos, chasis, garantía, repuestos, servicio y coste real antes de comprar.",it:"Una checklist completa per controllare batteria, BMS, motore, freni, telaio, garanzia, ricambi, assistenza e costo reale prima di comprare.",fr:"Une checklist complète pour vérifier la batterie, le BMS, le moteur, les freins, le châssis, la garantie, les pièces de rechange, le service et le coût réel avant d'acheter.",pl:"Pełna lista kontrolna do sprawdzenia baterii, BMS, silnika, hamulców, podwozia, gwarancji, części zamiennych, serwisu i rzeczywistego kosztu przed zakupem.",ru:"Полный чек-лист для проверки батареи, BMS, двигателя, тормозов, шасси, гарантии, запчастей, сервиса и реальной стоимости перед покупкой."},
    },
    {
      slug: "mantenimiento-carrito-de-golf-cerca-del-mar",
      title: {en:"How to Care for a Golf Cart Near the Sea",es:"Cómo Cuidar un Carrito de Golf Cerca del Mar",it:"Come Curare un Golf Cart Vicino al Mare",fr:"Comment Entretenir un Golf Cart Près de la Mer",pl:"Jak Dbać o Wózek Golfowy nad Morzem",ru:"Как Ухаживать за Гольф-каром у Моря"},
      excerpt: {en:"A practical guide to protecting your cart from sea salt, humidity, sand, corrosion and tropical exposure in the Dominican Republic.",es:"Guía práctica para proteger tu carrito del salitre, humedad, arena, corrosión y exposición tropical en República Dominicana.",it:"Una guida pratica per proteggere il tuo golf cart da salsedine, umidità, sabbia, corrosione ed esposizione tropicale in Repubblica Dominicana.",fr:"Un guide pratique pour protéger votre golf cart du sel marin, de l'humidité, du sable, de la corrosion et de l'exposition tropicale en République Dominicaine.",pl:"Praktyczny poradnik ochrony wózka golfowego przed solą, wilgocią, piaskiem, korozją i tropikalną ekspozycją w Dominikanie.",ru:"Практическое руководство по защите гольф-кара от морской соли, влажности, песка, коррозии и тропического воздействия в Доминиканской Республике."},
    },
  ];

  function GuidesPage() {
    return (
      <div style={{...S.sec, maxWidth:820}}>
        <h1 style={{...S.title,textAlign:"center"}}>{t6("Golf Cart Guides","Guías de Golf Cart","Guide Golf Cart","Guides Golf Cart","Poradniki Golf Cart","Гайды по гольф-карам")}</h1>
        <p style={{color:C.muted,fontSize:15,lineHeight:1.8,marginBottom:32,textAlign:"center"}}>
          {t6("Practical information to help you choose, use and maintain your golf cart in the Dominican Republic.","Información práctica para ayudarte a elegir, utilizar y mantener tu carrito de golf en República Dominicana.","Informazioni pratiche per aiutarti a scegliere, utilizzare e mantenere il tuo golf cart in Repubblica Dominicana.","Des informations pratiques pour vous aider à choisir, utiliser et entretenir votre golf cart en République Dominicaine.","Praktyczne informacje, które pomogą Ci wybrać, użytkować i konserwować wózek golfowy na Dominikanie.","Практическая информация, которая поможет выбрать, использовать и обслуживать ваш гольф-кар в Доминиканской Республике.")}
        </p>
        <div style={S.grid2}>
          {GUIDES_REGISTRY.map(g => (
            <a key={g.slug} href={`/${g.slug}`} onClick={(e)=>navigateTo(`/${g.slug}`, e)} style={{...S.card(false), textDecoration:"none", color:"inherit", display:"block"}}>
              <div style={{color:C.gold,fontWeight:800,fontSize:16,marginBottom:8}}>{t6(g.title.en,g.title.es,g.title.it,g.title.fr,g.title.pl,g.title.ru)}</div>
              <div style={{color:C.muted,fontSize:13,lineHeight:1.7,marginBottom:14}}>{t6(g.excerpt.en,g.excerpt.es,g.excerpt.it,g.excerpt.fr,g.excerpt.pl,g.excerpt.ru)}</div>
              <div style={{color:C.gold,fontWeight:600,fontSize:13}}>{t6("Read the guide →","Leer la guía →","Leggi la guida →","Lire le guide →","Przeczytaj poradnik →","Читать гайд →")}</div>
            </a>
          ))}
        </div>
      </div>
    );
  }

  function Partner() {
    return (
      <div style={S.sec}>
        <div style={{color:C.gold,fontSize:10,letterSpacing:4,fontWeight:700,marginBottom:14,textTransform:"uppercase"}}>{t("Partner with us","Colabora con nosotros","Collabora con noi")}</div>
        <h2 style={S.title}>{t("Join Our Team","Únete a nuestro equipo","Unisciti al nostro team")}</h2>
        <div style={S.goldLine}/>

        <div style={{background:C.card,border:"1px solid #222",borderRadius:20,padding:28,marginBottom:24}}>
          <div style={{fontSize:36,marginBottom:16,textAlign:"center"}}>🏌️⛳🤝</div>
          <p style={{color:C.white,lineHeight:1.85,fontSize:14,textAlign:"center"}}>
            {t(
              "We are Golf Cart DR, a premium golf cart sales company based in Bayahibe and Dominicus, Dominican Republic. We are looking for motivated partners and collaborators across the entire country to help us grow and bring premium golf carts to more communities, resorts, and residences.",
              "Somos Golf Cart DR, una empresa de venta de golf carts premium con sede en Bayahibe y Dominicus, República Dominicana. Buscamos colaboradores motivados en todo el país para ayudarnos a crecer y llevar golf carts premium a más comunidades, resorts y residencias.",
              "Siamo Golf Cart DR, un'azienda di vendita di golf cart premium con sede a Bayahibe e Dominicus, Repubblica Dominicana. Cerchiamo collaboratori motivati in tutto il paese per aiutarci a crescere e portare golf cart premium in più comunità, resort e residenze."
            )}
          </p>
        </div>

        <div style={S.grid2}>
          {[
            {icon:"🌴",en:"Nationwide opportunity",es:"Oportunidad a nivel nacional",it:"Opportunità in tutto il paese"},
            {icon:"💰",en:"Attractive commissions",es:"Comisiones atractivas",it:"Commissioni interessanti"},
            {icon:"📈",en:"Growing market",es:"Mercado en crecimiento",it:"Mercato in crescita"},
            {icon:"🤝",en:"Full support",es:"Apoyo completo",it:"Supporto completo"},
          ].map((item,i)=>(
            <div key={i} style={{...S.card(false),textAlign:"center"}}>
              <div style={{fontSize:28,marginBottom:8}}>{item.icon}</div>
              <div style={{color:C.gold,fontWeight:700,fontSize:14}}>{t(item.en,item.es,item.it)}</div>
            </div>
          ))}
        </div>

        <div style={{marginTop:36,textAlign:"center",display:"flex",gap:12,justifyContent:"center",flexWrap:"wrap"}}>
          <button style={S.outBtn} onClick={()=>setPage("home")}>← {t("Back","Atrás","Indietro")}</button>
          <button style={S.goldBtn} onClick={()=>setPage("partnerForm")}>
            📞 {t("Request a free interview","Solicita una entrevista gratis","Richiedi gratuitamente un colloquio")}
          </button>
        </div>
      </div>
    );
  }

  function ChooseMode() {
    return (
      <div style={{...S.sec, paddingTop:30}}>
        <div style={{color:C.gold,fontSize:10,letterSpacing:4,fontWeight:700,marginBottom:14,textTransform:"uppercase"}}>{t("Choose your Golf Cart","Elige tu Golf Cart","Scegli il tuo Golf Cart")}</div>
        <h2 style={S.title}>{t("How would you like to proceed?","¿Cómo deseas continuar?","Come vuoi procedere?")}</h2>
        <div style={S.goldLine}/>
        <div style={S.grid2}>
          <div style={{...S.card(false),textAlign:"center",padding:32,border:"1.5px solid #C9A84C"}} onClick={()=>{upd("model",null);setPage("configurator");setStep(-1);}}>
            <div style={{fontSize:44,marginBottom:14}}>🛺🔧</div>
            <div style={{color:C.gold,fontWeight:800,fontSize:18,marginBottom:6}}>{t("Configure your own","Configura el tuyo","Configura il tuo")}</div>
            <div style={{color:C.muted,fontSize:13,lineHeight:1.6,marginBottom:16}}>{t6("Start with your model and personalize it your way.","Elige tu modelo y personalízalo a tu manera.","Parti dal tuo modello e personalizzalo a modo tuo.","Partez de votre modèle et personnalisez-le à votre façon.","Zacznij od wybranego modelu i spersonalizuj go po swojemu.","Начните с выбранной модели и настройте её по-своему.")}</div>
            <button style={{...S.goldBtn,marginTop:18,width:"100%"}}>{t("Start configuring","Empezar","Inizia")} →</button>
          </div>
          <div style={{...S.card(false),textAlign:"center",padding:32}} onClick={()=>setPage("readyModels")}>
            <div style={{fontSize:44,marginBottom:14}}>🛺</div>
            <div style={{color:C.gold,fontWeight:800,fontSize:18,marginBottom:6}}>{t("Pre-configured models","Modelos preconfigurados","Modelli già configurati")}</div>
            <div style={{color:C.muted,fontSize:13,lineHeight:1.6,marginBottom:16}}>{t("Browse ready-to-buy golf carts already set up and available now.","Ver golf carts listos para comprar.","Vedi golf cart già configurati pronti all'acquisto.")}</div>
            <button style={{...S.outBtn,marginTop:18,width:"100%"}}>{t("Browse models","Ver modelos","Vedi modelli")} →</button>
          </div>
        </div>
        <div style={{marginTop:28,textAlign:"center"}}>
          <button style={S.outBtn} onClick={()=>setPage(prevPage)}>← {t("Back","Atrás","Indietro")}</button>
        </div>
      </div>
    );
  }

  function ReadyModels() {
    return (
      <div style={S.sec}>
        <div style={{color:C.gold,fontSize:10,letterSpacing:4,fontWeight:700,marginBottom:14,textTransform:"uppercase"}}>{t("Pre-configured models","Modelos preconfigurados","Modelli già configurati")}</div>
        <h2 style={S.title}>{t("Ready to Buy","Listos para comprar","Pronti all'acquisto")}</h2>
        <div style={S.goldLine}/>

        <div style={{background:C.card,border:"1px solid #222",borderRadius:18,padding:40,textAlign:"center"}}>
          <div style={{fontSize:44,marginBottom:14}}>🏌️</div>
          <div style={{color:C.white,fontWeight:700,fontSize:16,marginBottom:12}}>{t("Coming soon","Próximamente","Prossimamente")}</div>
          <div style={{color:C.muted,fontSize:13,lineHeight:1.7,maxWidth:480,margin:"0 auto"}}>
            {t("We're preparing a selection of ready-to-buy golf carts. Check back soon, or configure your own right now.",
               "Estamos preparando una selección de golf carts listos para comprar. Vuelve pronto, o configura el tuyo ahora.",
               "Stiamo preparando una selezione di golf cart pronti all'acquisto. Torna presto, o configura il tuo adesso.")}
          </div>
        </div>

        <div style={{marginTop:24,textAlign:"center"}}>
          <button style={S.outBtn} onClick={()=>setPage("chooseMode")}>← {t("Back","Atrás","Indietro")}</button>
        </div>
      </div>
    );
  }

  function PartnerForm() {
    const [partnerSent, setPartnerSent] = useState(false);
    const [isSending, setIsSending] = useState(false);
    const [fieldErrors, setFieldErrors] = useState({});
    const pNomeRef = useRef();
    const pCognomeRef = useRef();
    const pTelefonoRef = useRef();
    const pEmailRef = useRef();
    const pIndirizzoRef = useRef();
    const pNoteRef = useRef();
    const inpErr = {...S.input, border:"1px solid #e05555"};
    const errText = {color:"#e05555",fontSize:11,marginTop:4};
    const validateFields = (nome, telefono, email) => {
      const errs = {};
      if(!nome.trim() || !/^[A-Za-zÀ-ÿ\s]+$/.test(nome.trim())) errs.nome = t("Letters only","Solo letras","Solo lettere");
      const digitCount = (telefono.match(/\d/g)||[]).length;
      if(!telefono.trim().startsWith("+") || digitCount < 11) errs.telefono = t("Must start with + and have at least 11 digits","Debe empezar con + y tener al menos 11 dígitos","Deve iniziare con + e avere almeno 11 cifre");
      if(!email.includes("@")) errs.email = t("Must contain @","Debe contener @","Deve contenere @");
      return errs;
    };

    if(partnerSent) return (
      <div style={S.sec}>
        <div style={{textAlign:"center",padding:"60px 20px"}}>
          <div style={{fontSize:56,marginBottom:18}}>✅</div>
          <h2 style={{color:C.gold,fontSize:24,fontWeight:800,marginBottom:12}}>{t("Request Sent!","¡Solicitud Enviada!","Richiesta Inviata!")}</h2>
          <p style={{color:C.muted,fontSize:14,maxWidth:440,margin:"0 auto 24px",lineHeight:1.7}}>
            {t("Our team will contact you within 24 hours to schedule your interview.","Le contactaremos en 24 horas para programar su entrevista.","Ti contatteremo entro 24 ore per programmare il colloquio.")}
          </p>
          <button style={S.goldBtn} onClick={()=>setPage("home")}>🏠 Home</button>
        </div>
      </div>
    );

    const handlePartnerSend = async () => {
      if(isSending) return;
      const nome = pNomeRef.current?.value || "";
      const cognome = pCognomeRef.current?.value || "";
      const telefono = pTelefonoRef.current?.value || "";
      const email = pEmailRef.current?.value || "";
      const indirizzo = pIndirizzoRef.current?.value || "";
      const note = pNoteRef.current?.value || "";
      if(!nome || !email || !telefono) { alert(t("Please fill Name, Email and Phone","Completa Nombre, Email y Teléfono","Compila Nome, Email e Telefono")); return; }
      const errs = validateFields(nome, telefono, email);
      setFieldErrors(errs);
      if(Object.keys(errs).length > 0) return;

      const msg = [
        "NEW PARTNER / COLLABORATION REQUEST",
        "=====================================",
        "CONTACT INFO:",
        "Name: "+nome+" "+cognome,
        "Phone: "+telefono,
        "Email: "+email,
        "Location/Address: "+indirizzo,
        "Notes: "+note,
      ].join("\n");

      setIsSending(true);
      try {
        const emailjs = await import("@emailjs/browser");
        await emailjs.send("service_f1ysovn","template_e36a3gp",{
          to_email:"info@taaac.solutions",
          subject:"Partner Request - "+nome+" "+cognome,
          message:msg,
          name:nome+" "+cognome,
          from_name:nome+" "+cognome,
          from_email:email,
          email:email,
          phone:telefono,
        },"G_ndpmoIfpB6oi8pP");

        try {
          const confirmTemplates = {
            en: "Hi {name},\n\nWe've received your collaboration request! Our team will contact you within 48 hours to discuss the details.\n\nThank you for your interest in TAAAC Solutions.",
            es: "Hola {name},\n\n¡Hemos recibido tu solicitud de colaboración! Nuestro equipo te contactará dentro de 48 horas para hablar de los detalles.\n\nGracias por tu interés en TAAAC Solutions.",
            it: "Ciao {name},\n\nAbbiamo ricevuto la tua richiesta di collaborazione! Il nostro team ti contatterà entro 48 ore per discutere i dettagli.\n\nGrazie per l'interesse verso TAAAC Solutions.",
            fr: "Bonjour {name},\n\nNous avons bien reçu ta demande de collaboration ! Notre équipe te contactera sous 48 heures pour discuter des détails.\n\nMerci de l'intérêt porté à TAAAC Solutions.",
            pl: "Cześć {name},\n\nOtrzymaliśmy Twoje zgłoszenie współpracy! Nasz zespół skontaktuje się z Tobą w ciągu 48 godzin, aby omówić szczegóły.\n\nDziękujemy za zainteresowanie TAAAC Solutions.",
            ru: "Привет, {name}!\n\nМы получили твой запрос на сотрудничество! Наша команда свяжется с тобой в течение 48 часов, чтобы обсудить детали.\n\nСпасибо за интерес к TAAAC Solutions.",
          };
          const confirmMsg = (confirmTemplates[lang] || confirmTemplates.en).split("{name}").join(nome);
          await emailjs.send("service_f1ysovn","template_e36a3gp",{
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
        }

        setPartnerSent(true);
      } catch(err) {
        console.error(err);
        alert(t("Error sending request. Please try again.","Error al enviar la solicitud. Inténtalo de nuevo.","Errore nell'invio della richiesta. Riprova."));
      } finally {
        setIsSending(false);
      }
    };

    return (
      <div style={S.sec}>
        <div style={{color:C.gold,fontSize:10,letterSpacing:4,fontWeight:700,marginBottom:14,textTransform:"uppercase"}}>{t("Partner with us","Colabora con nosotros","Collabora con noi")}</div>
        <h2 style={S.title}>{t("Your Details","Tus Datos","I Tuoi Dati")}</h2>
        <div style={S.goldLine}/>

        <div style={{background:C.card,border:"1px solid #C9A84C",borderRadius:16,padding:20,marginBottom:24,textAlign:"center"}}>
          <div style={{fontSize:28,marginBottom:8}}>🤝</div>
          <div style={{color:C.white,fontSize:14,fontWeight:600}}>{t("We'll get back to you to schedule your free interview","Te contactaremos para programar tu entrevista gratuita","Ti ricontatteremo per programmare il colloquio gratuito")}</div>
        </div>

        <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(200px,1fr))",gap:16,marginBottom:24}}>
          <div>
            <div style={{fontSize:12,color:C.muted,marginBottom:4,fontWeight:600}}>{t("Name *","Nombre *","Nome *")}</div>
            <input ref={pNomeRef} style={fieldErrors.nome?inpErr:S.input} placeholder="Mario"/>
            {fieldErrors.nome&&<div style={errText}>{fieldErrors.nome}</div>}
          </div>
          <div>
            <div style={{fontSize:12,color:C.muted,marginBottom:4,fontWeight:600}}>{t("Surname *","Apellido *","Cognome *")}</div>
            <input ref={pCognomeRef} style={S.input} placeholder="Rossi"/>
          </div>
          <div>
            <div style={{fontSize:12,color:C.muted,marginBottom:4,fontWeight:600}}>{t("Phone *","Teléfono *","Telefono *")}</div>
            <input ref={pTelefonoRef} defaultValue="+" style={fieldErrors.telefono?inpErr:S.input} placeholder="+1 809 000 0000"/>
            {fieldErrors.telefono&&<div style={errText}>{fieldErrors.telefono}</div>}
          </div>
          <div>
            <div style={{fontSize:12,color:C.muted,marginBottom:4,fontWeight:600}}>Email *</div>
            <input ref={pEmailRef} style={fieldErrors.email?inpErr:S.input} placeholder="email@example.com"/>
            {fieldErrors.email&&<div style={errText}>{fieldErrors.email}</div>}
          </div>
          <div>
            <div style={{fontSize:12,color:C.muted,marginBottom:4,fontWeight:600}}>{t("Address","Dirección","Indirizzo")}</div>
            <input ref={pIndirizzoRef} style={S.input} placeholder="Bayahibe, Dominicus"/>
          </div>
          <div style={{gridColumn:"1 / -1"}}>
            <div style={{fontSize:12,color:C.muted,marginBottom:4,fontWeight:600}}>{t("Notes","Notas","Note")}</div>
            <textarea ref={pNoteRef} style={{...S.input,minHeight:80,resize:"vertical"}} placeholder="Additional notes..."/>
          </div>
        </div>

        <div style={{display:"flex",justifyContent:"space-between"}}>
          <button style={S.outBtn} onClick={()=>setPage("partner")}>← {t("Back","Atrás","Indietro")}</button>
          <button style={{...S.goldBtn, opacity:isSending?0.6:1, cursor:isSending?"not-allowed":"pointer"}} onClick={handlePartnerSend} disabled={isSending}>
            {isSending ? "…" : "📩"} {isSending ? t("Sending...","Enviando...","Invio...") : t("Send","Enviar","Invia")}
          </button>
        </div>
      </div>
    );
  }

  return (
    <div style={S.app}>
      <nav style={S.nav}>
        <div style={{display:"flex",alignItems:"center",gap:10,background:"#080808",borderRadius:16,padding:6}}>
          <div style={{position:"relative"}}>
            <button onClick={()=>setMenuOpen(v=>!v)} style={{background:"transparent",border:"1px solid #555",color:"#aaa",borderRadius:9,padding:"7px 16px",cursor:"pointer",fontSize:15,fontWeight:600,lineHeight:1,display:"flex",alignItems:"center",gap:8}}>
              <span style={{fontSize:18}}>☰</span>
              <span>{lang==="ru"?"Меню":lang==="es"?"Menú":"Menu"}</span>
            </button>
            {menuOpen && (
              <>
                <div onClick={()=>{setMenuOpen(false);setGuidesOpen(false);}} style={{position:"fixed",inset:0,zIndex:590}}/>
                <div style={{position:"absolute",top:"calc(100% + 6px)",left:0,background:"#111",border:"1px solid #333",borderRadius:10,padding:6,zIndex:600,display:"flex",flexDirection:"column",gap:4,minWidth:190,maxWidth:260,maxHeight:"78vh",overflowY:"auto",boxShadow:"0 8px 24px rgba(0,0,0,0.5)"}}>
                  {navItems.map(n=>(
                    <button key={n.id}
                      style={{background:page===n.id?"linear-gradient(135deg,#C9A84C,#E2C07A)":"transparent",color:page===n.id?"#000":"#aaa",border:"none",borderRadius:7,padding:"9px 14px",cursor:"pointer",fontSize:14,fontWeight:page===n.id?800:500,textAlign:"left"}}
                      onClick={()=>{setPage(n.id);if(n.id==="configurator")setStep(-1);setMenuOpen(false);setGuidesOpen(false);}}>
                      {t(n.en, n.es, n.it)}
                    </button>
                  ))}

                  <div style={{height:1,background:"#2a2a2a",margin:"4px 2px"}}/>

                  <button onClick={()=>setGuidesOpen(v=>!v)} style={{background:"transparent",color:"#aaa",border:"none",borderRadius:7,padding:"9px 14px",cursor:"pointer",fontSize:14,fontWeight:600,textAlign:"left",display:"flex",alignItems:"center",justifyContent:"space-between",gap:8}}>
                    <span>{t("Golf Cart Guides","Guías de Golf Cart","Guide sui Golf Cart")}</span>
                    <span style={{fontSize:10,transform:guidesOpen?"rotate(180deg)":"none",transition:"transform 0.2s"}}>▾</span>
                  </button>

                  {guidesOpen && (
                    <div style={{display:"flex",flexDirection:"column",gap:2,paddingLeft:4}}>
                      <a href="/guias" onClick={(e)=>{navigateTo("/guias", e);setMenuOpen(false);setGuidesOpen(false);}}
                        style={{color:C.gold,textDecoration:"none",fontWeight:700,fontSize:13,padding:"8px 14px",borderRadius:7,cursor:"pointer"}}>
                        {t("See All Guides →","Ver Todas las Guías →","Vedi Tutte le Guide →")}
                      </a>
                      {GUIDE_MENU_SECTIONS.map((section,si)=>(
                        <div key={si} style={{marginTop:4}}>
                          <div style={{color:"#777",fontSize:10,fontWeight:700,textTransform:"uppercase",letterSpacing:0.5,padding:"6px 14px 2px"}}>
                            {t(section.cat.en, section.cat.es, section.cat.it)}
                          </div>
                          {section.items.map(item=>(
                            <a key={item.slug} href={"/"+item.slug} onClick={(e)=>{navigateTo("/"+item.slug, e);setMenuOpen(false);setGuidesOpen(false);}}
                              style={{display:"block",color:page===item.slug?"#000":"#aaa",background:page===item.slug?"linear-gradient(135deg,#C9A84C,#E2C07A)":"transparent",textDecoration:"none",fontSize:13,fontWeight:page===item.slug?800:500,padding:"8px 14px",borderRadius:7,cursor:"pointer"}}>
                              {t(item.en, item.es, item.it)}
                            </a>
                          ))}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </>
            )}
          </div>
          <div style={{position:"relative"}}>
            <button onClick={()=>setLangMenuOpen(v=>!v)} style={{background:"transparent",color:"#aaa",border:"1px solid #555",borderRadius:9,padding:"7px 14px",cursor:"pointer",fontSize:14,fontWeight:600,display:"flex",alignItems:"center",gap:8}}>
              <span style={{fontSize:16,lineHeight:1}}>🌐</span>
              <span>{t("Select your language","Selecciona tu idioma","Scegli la tua lingua")}</span>
              <span style={{fontSize:10,transform:langMenuOpen?"rotate(180deg)":"none",transition:"transform 0.2s"}}>▾</span>
            </button>
            {langMenuOpen && (
              <>
                <div onClick={()=>setLangMenuOpen(false)} style={{position:"fixed",inset:0,zIndex:590}}/>
                <div style={{position:"absolute",top:"calc(100% + 6px)",left:0,background:"#111",border:"1px solid #333",borderRadius:10,padding:6,zIndex:600,display:"flex",flexDirection:"column",gap:4,minWidth:120,boxShadow:"0 8px 24px rgba(0,0,0,0.5)"}}>
                  {[
                    {code:"en", cc:"gb"},
                    {code:"es", cc:"es"},
                    {code:"it", cc:"it"},
                    {code:"fr", cc:"fr"},
                    {code:"pl", cc:"pl"},
                    {code:"ru", cc:"ru"},
                  ].map(l=>(
                    <button key={l.code} onClick={()=>selectLang(l.code)} style={{background:lang===l.code?"#C9A84C":"transparent",color:lang===l.code?"#000":"#aaa",border:"none",borderRadius:7,padding:"7px 12px",cursor:"pointer",fontSize:14,fontWeight:lang===l.code?700:500,textTransform:"uppercase",display:"flex",alignItems:"center",gap:8,textAlign:"left"}}>
                      <img src={`https://flagcdn.com/24x18/${l.cc}.png`} alt="" style={{width:22,height:16,objectFit:"cover",borderRadius:2}}/> {l.code.toUpperCase()}
                    </button>
                  ))}
                </div>
              </>
            )}
          </div>
        </div>
      </nav>
      {page==="home"&&<Home/>}
      {page==="about"&&(
        <Suspense fallback={
          <div style={{minHeight:"40vh",display:"flex",alignItems:"center",justifyContent:"center",color:"#888"}}>
            Loading...
          </div>
        }>
          <AboutPage t={t} S={S} C={C} setPage={setPage} lang={lang} />
        </Suspense>
      )}
      {page==="service"&&<Service/>}
      {page==="contact"&&(
        <Suspense fallback={
          <div style={{minHeight:"40vh",display:"flex",alignItems:"center",justifyContent:"center",color:"#888"}}>
            Loading...
          </div>
        }>
          <ContactPage t={t} S={S} C={C} setPage={setPage} prevPage={prevPage} />
        </Suspense>
      )}
      {page==="partner"&&<Partner/>}
      {page==="partnerForm"&&<PartnerForm/>}
      {page==="chooseMode"&&<ChooseMode/>}
      {page==="readyModels"&&<ReadyModels/>}
      {page==="privacy"&&(
        <Suspense fallback={
          <div style={{minHeight:"40vh",display:"flex",alignItems:"center",justifyContent:"center",color:"#888"}}>
            Loading...
          </div>
        }>
          <PrivacyPage t={t} S={S} C={C} setPage={setPage} />
        </Suspense>
      )}
      {(page==="model-a"||page==="model-b"||page==="model-c"||page==="model-d")&&<ModelPage/>}
      {page==="choose-your-golf-cart"&&(
        <Suspense fallback={
          <div style={{minHeight:"40vh",display:"flex",alignItems:"center",justifyContent:"center",color:"#888"}}>
            Loading...
          </div>
        }>
          <GuidedAssistantPage t={t} t6={t6} tName={tName} S={S} C={C} setPage={setPage} setStep={setStep} cfg={cfg} setCfg={setCfg} upd={upd} MODELS={MODELS} SEAT_TYPES={SEAT_TYPES} TIRES={TIRES} STEERING={STEERING} WINDSHIELDS={WINDSHIELDS} OPTIONAL_ITEMS={OPTIONAL_ITEMS} RAL_COLORS={RAL_COLORS} SEAT_COLORS={SEAT_COLORS} defaultMotorFor={defaultMotorFor} defaultBatteryFor={defaultBatteryFor} Img={Img} aStep={aStep} setAStep={setAStep} aUsage={aUsage} setAUsage={setAUsage} aShowMoreOpts={aShowMoreOpts} setAShowMoreOpts={setAShowMoreOpts} showRobotHint={showRobotHint} toggleOpt={toggleOpt} />
        </Suspense>
      )}
      {page==="faq"&&(
        <Suspense fallback={
          <div style={{minHeight:"40vh",display:"flex",alignItems:"center",justifyContent:"center",color:"#888"}}>
            Loading...
          </div>
        }>
          <FAQPage t={t} S={S} C={C} setPage={setPage} />
        </Suspense>
      )}
      {page==="golf-carts-dominican-republic"&&(
        <Suspense fallback={
          <div style={{minHeight:"40vh",display:"flex",alignItems:"center",justifyContent:"center",color:"#888"}}>
            Loading...
          </div>
        }>
          <GolfCartsDRPage t={t} t6={t6} S={S} C={C} navigateTo={navigateTo} MODELS={MODELS} Img={Img} />
        </Suspense>
      )}
      {page==="golf-carts-bayahibe"&&(
        <Suspense fallback={
          <div style={{minHeight:"40vh",display:"flex",alignItems:"center",justifyContent:"center",color:"#888"}}>
            Loading...
          </div>
        }>
          <GolfCartsBayahibePage t={t} t6={t6} S={S} C={C} navigateTo={navigateTo} MODELS={MODELS} Img={Img} />
        </Suspense>
      )}
      {page==="guias"&&<GuidesPage/>}
      {page==="como-elegir-carrito-de-golf-republica-dominicana"&&(
        <Suspense fallback={
          <div style={{minHeight:"40vh",display:"flex",alignItems:"center",justifyContent:"center",color:"#888"}}>
            Loading...
          </div>
        }>
          <GuideChooseGolfCartPage t6={t6} S={S} C={C} navigateTo={navigateTo} />
        </Suspense>
      )}
      {page==="bateria-litio-vs-plomo-carrito-de-golf"&&(
        <Suspense fallback={
          <div style={{minHeight:"40vh",display:"flex",alignItems:"center",justifyContent:"center",color:"#888"}}>
            Loading...
          </div>
        }>
          <GuideLithiumVsLeadPage t6={t6} S={S} C={C} navigateTo={navigateTo} />
        </Suspense>
      )}
      {page==="48v-vs-72v-carrito-de-golf"&&(
        <Suspense fallback={
          <div style={{minHeight:"40vh",display:"flex",alignItems:"center",justifyContent:"center",color:"#888"}}>
            Loading...
          </div>
        }>
          <Guide48vVs72vPage t6={t6} S={S} C={C} navigateTo={navigateTo} />
        </Suspense>
      )}
      {page==="carrito-de-golf-2-4-o-6-plazas"&&(
        <Suspense fallback={
          <div style={{minHeight:"40vh",display:"flex",alignItems:"center",justifyContent:"center",color:"#888"}}>
            Loading...
          </div>
        }>
          <GuideSeatsPage t6={t6} S={S} C={C} navigateTo={navigateTo} />
        </Suspense>
      )}
      {page==="que-revisar-antes-de-comprar-carrito-de-golf"&&(
        <Suspense fallback={
          <div style={{minHeight:"40vh",display:"flex",alignItems:"center",justifyContent:"center",color:"#888"}}>
            Loading...
          </div>
        }>
          <GuideBeforeBuyingPage t6={t6} S={S} C={C} navigateTo={navigateTo} />
        </Suspense>
      )}
      {page==="mantenimiento-carrito-de-golf-cerca-del-mar"&&(
        <Suspense fallback={
          <div style={{minHeight:"40vh",display:"flex",alignItems:"center",justifyContent:"center",color:"#888"}}>
            Loading...
          </div>
        }>
          <GuideSeaMaintenancePage t6={t6} S={S} C={C} navigateTo={navigateTo} />
        </Suspense>
      )}
      {page==="serviceConfirm"&&<ServiceConfirm serviceNote={serviceNote} goBack={()=>setPage("service")} goHome={()=>setPage("home")} lang={lang}/>}
      {page==="configurator"&&(
        <div style={{maxWidth:1000,margin:"0 auto",padding:"32px 20px 80px"}}>
          {resumeDraft && (
            <div style={{position:"fixed",inset:0,background:"rgba(0,0,0,0.85)",zIndex:300,display:"flex",alignItems:"center",justifyContent:"center",padding:20}}>
              <div style={{background:C.card,border:"1.5px solid #C9A84C",borderRadius:20,padding:28,maxWidth:420,textAlign:"center"}}>
                <div style={{fontSize:32,marginBottom:12}}>🚗</div>
                <div style={{color:C.white,fontWeight:700,fontSize:16,lineHeight:1.6,marginBottom:8}}>
                  {t("You have a configuration in progress for","Tienes una configuración en curso para","Hai una configurazione in corso per")}
                </div>
                <div style={{color:C.gold,fontWeight:900,fontSize:22,marginBottom:20}}>
                  🚗 {(resumeDraft.cfg.cartName && resumeDraft.cfg.cartName.trim()) ? resumeDraft.cfg.cartName.trim() : "Golf Cart"}
                </div>
                <div style={{color:C.muted,fontSize:13,marginBottom:24}}>
                  {t("Do you want to continue where you left off?","¿Quieres continuar donde lo dejaste?","Vuoi continuare da dove avevi lasciato?")}
                </div>
                <div style={{display:"flex",gap:10,justifyContent:"center",flexWrap:"wrap"}}>
                  <button style={S.outBtn} onClick={()=>{clearDraft();setResumeDraft(null);setStep(-1);}}>
                    {t("Start Over","Empezar de Nuevo","Ricomincia")}
                  </button>
                  <button style={S.goldBtn} onClick={()=>{setCfg(resumeDraft.cfg);setStep(resumeDraft.step);setResumeDraft(null);window.scrollTo({top:0,behavior:"smooth"});}}>
                    {t("Continue","Continuar","Continua")}
                  </button>
                </div>
              </div>
            </div>
          )}
          <div style={{textAlign:"center",marginBottom:10}}>
            <span style={{color:C.gold,fontWeight:700,fontSize:13}}>{t("Step","Paso","Passo")} {step+2} {t("of","de","di")} {STEPS.length}</span>
            <span style={{color:"#666",fontSize:11}}> </span>
          </div>
          {/* Barra progresso */}
          <div style={{marginBottom:16,background:"#1a1a1a",borderRadius:50,height:6,overflow:"hidden"}}>
            <div style={{height:"100%",borderRadius:50,background:"linear-gradient(90deg,#C9A84C,#E2C07A)",width:((step+2)/STEPS.length*100)+"%",transition:"width .4s ease"}}/>
          </div>
          <div style={{display:"flex",gap:0,marginBottom:28,overflowX:"auto",paddingBottom:4}}>
            {STEPS.map((s,i)=>(
              <div key={i} style={S.stepDot(i-1===step,i-1<step)}>
                {i-1<step?"✓ ":""}{t(s.en, s.es, s.it)}
              </div>
            ))}
          </div>
          <div key={step} style={{animation:"stepFadeIn 0.35s ease"}}>
            <Suspense fallback={
              <div style={{minHeight:"40vh",display:"flex",alignItems:"center",justifyContent:"center",color:"#888"}}>
                Loading...
              </div>
            }>
              <ConfiguratorPage t={t} tName={tName} S={S} C={C} setPage={setPage} step={step} setStep={setStep} cfg={cfg} setCfg={setCfg} upd={upd} lang={lang} totalPrice={totalPrice} showOptionals={showOptionals} setShowOptionals={setShowOptionals} MODELS={MODELS} SEATS_OPTIONS={SEATS_OPTIONS} SEAT_PRICE_EXTRA={SEAT_PRICE_EXTRA} TIRE_PRICE_EXTRA={TIRE_PRICE_EXTRA} BATTERIES={BATTERIES} MOTORS={MOTORS} SEAT_TYPES={SEAT_TYPES} TIRES={TIRES} STEERING={STEERING} WINDSHIELDS={WINDSHIELDS} OPTIONAL_ITEMS={OPTIONAL_ITEMS} RAL_COLORS={RAL_COLORS} SEAT_COLORS={SEAT_COLORS} Img={Img} GolfCartPreview={GolfCartPreview} defaultMotorFor={defaultMotorFor} defaultBatteryFor={defaultBatteryFor} motorPrice={motorPrice} batteryPrice={batteryPrice} toggleOpt={toggleOpt} ru={ru} fr={fr} pl={pl} tNamePrefix={tNamePrefix} cartDisplayName={cartDisplayName} showRobotHint={showRobotHint} SummaryBar={SummaryBar} showSeatOpts={showSeatOpts} setShowSeatOpts={setShowSeatOpts} showSteerOpts={showSteerOpts} setShowSteerOpts={setShowSteerOpts} showOtherInch={showOtherInch} setShowOtherInch={setShowOtherInch} showGrass={showGrass} setShowGrass={setShowGrass} showWindOpts={showWindOpts} setShowWindOpts={setShowWindOpts} showTip={showTip} setShowTip={setShowTip} showBattOpts={showBattOpts} setShowBattOpts={setShowBattOpts} showMotorOpts={showMotorOpts} setShowMotorOpts={setShowMotorOpts} />
            </Suspense>
          </div>
        </div>
      )}
      <footer style={{borderTop:"1px solid #222",padding:"24px 20px",textAlign:"center"}}>
        <div style={{color:C.muted,fontSize:13}}>Premium Golf Cart · Bayahibe & Dominicus · República Dominicana</div>
        <div style={{color:"#555",fontSize:11,marginTop:4}}>© 2025 Golf Cart DR. {t("All rights reserved","Todos los derechos reservados","Tutti i diritti riservati")}.</div>
        <div style={{marginTop:8,display:"flex",gap:16,justifyContent:"center",alignItems:"center"}}>
          <span style={{color:"#555",fontSize:10,cursor:"pointer",textDecoration:"underline"}} onClick={()=>setPage("faq")}>
            FAQ
          </span>
          <span style={{color:"#555",fontSize:10,cursor:"pointer",textDecoration:"underline"}} onClick={()=>setPage("privacy")}>
            {t("Privacy Policy","Política de Privacidad","Informativa Privacy")}
          </span>
          <a href="https://www.instagram.com/taaac.solutions" target="_blank" rel="noopener noreferrer" style={{display:"flex",alignItems:"center",color:"#555"}} title="Instagram">
            <svg viewBox="0 0 24 24" width="14" height="14" fill="#555"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zm0 10.162a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z"/></svg>
          </a>
        </div>
        </footer>
      {(page==="home" || page==="configurator") && (
        <>
          {showRobotHint && (
            <div onClick={()=>setPage("choose-your-golf-cart")}
              style={{position:"fixed",bottom:105,left:20,zIndex:300,background:C.card,border:"1.5px solid #C9A84C",borderRadius:20,padding:"14px 23px",boxShadow:"0 4px 16px rgba(0,0,0,0.4)",cursor:"pointer",display:"flex",alignItems:"center",gap:12,maxWidth:288}}>
              <span style={{color:C.gold,fontWeight:700,fontSize:19,whiteSpace:"nowrap"}}>{t("Can I guide you?","¿Puedo guiarte?","Posso guidarti?")}</span>
              <span onClick={(e)=>{e.stopPropagation();setShowRobotHint(false);}} style={{color:"#666",fontSize:23,lineHeight:1,cursor:"pointer",flexShrink:0}}>×</span>
              <div style={{position:"absolute",bottom:-12,left:20,width:0,height:0,borderLeft:"12px solid transparent",borderRight:"12px solid transparent",borderTop:"12px solid #C9A84C"}}/>
            </div>
          )}
          <div onClick={()=>setPage("choose-your-golf-cart")} title={t("Get Guided","Déjate Guiar","Fatti Guidare")}
            style={{position:"fixed",bottom:20,left:20,zIndex:300,cursor:"pointer",filter:"drop-shadow(0 4px 10px rgba(0,0,0,0.5))"}}>
            <svg viewBox="0 -3 40 59" width="49" height="77" fill="none" stroke="#C9A84C" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
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
        </>
      )}
      <a href="https://wa.me/41764372290" target="_blank" rel="noopener noreferrer"
        style={{position:"fixed",bottom:20,right:20,zIndex:300,width:56,height:56,borderRadius:"50%",background:"#25D366",display:"flex",alignItems:"center",justifyContent:"center",boxShadow:"0 4px 16px rgba(0,0,0,0.4)",textDecoration:"none"}}
        title="WhatsApp">
        <svg viewBox="0 0 32 32" width="28" height="28" fill="#fff"><path d="M16.001 3C9.373 3 4 8.373 4 15c0 2.625.86 5.055 2.312 7.031L4 29l7.157-2.281A11.94 11.94 0 0 0 16.001 27C22.628 27 28 21.627 28 15S22.628 3 16.001 3zm0 2c5.523 0 10 4.477 10 10s-4.477 10-10 10a9.96 9.96 0 0 1-5.086-1.398l-.365-.217-3.789 1.207 1.229-3.693-.239-.38A9.96 9.96 0 0 1 6 15c0-5.523 4.478-10 10.001-10zm-3.61 5.06c-.198 0-.52.074-.792.372-.271.297-1.04 1.016-1.04 2.479 0 1.463 1.065 2.876 1.213 3.075.148.198 2.057 3.278 5.076 4.462 2.516.988 3.028.792 3.575.743.546-.05 1.762-.72 2.01-1.414.247-.694.247-1.29.173-1.414-.074-.124-.271-.198-.568-.347-.297-.148-1.762-.87-2.036-.968-.273-.099-.472-.148-.67.148-.198.297-.767.968-.94 1.166-.173.198-.347.223-.644.074-.297-.148-1.253-.462-2.387-1.472-.883-.788-1.48-1.762-1.653-2.06-.173-.297-.019-.457.13-.605.134-.133.297-.347.446-.52.148-.174.198-.298.297-.496.099-.198.05-.372-.025-.52-.074-.148-.67-1.613-.918-2.208-.242-.583-.487-.504-.67-.513-.173-.008-.371-.01-.57-.01z"/></svg>
      </a>
      {page==="home" && (
        <a href="https://www.instagram.com/taaac.solutions" target="_blank" rel="noopener noreferrer"
          style={{position:"fixed",bottom:86,right:20,zIndex:300,width:56,height:56,borderRadius:"50%",background:"radial-gradient(circle at 30% 107%,#fdf497 0%,#fdf497 5%,#fd5949 45%,#d6249f 60%,#285AEB 90%)",display:"flex",alignItems:"center",justifyContent:"center",boxShadow:"0 4px 16px rgba(0,0,0,0.4)",textDecoration:"none"}}
          title="Instagram">
          <svg viewBox="0 0 24 24" width="26" height="26" fill="#fff"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zm0 10.162a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z"/></svg>
        </a>
      )}
      {!cookieConsent && (
        <div style={{position:"fixed",bottom:0,left:0,right:0,zIndex:400,background:"#111",borderTop:"1px solid #333",padding:"16px 20px",display:"flex",flexWrap:"wrap",gap:16,alignItems:"center",justifyContent:"center",boxShadow:"0 -4px 20px rgba(0,0,0,0.4)"}}>
          <div style={{color:C.muted,fontSize:13,maxWidth:560,textAlign:"center"}}>
            {t(
              "We use cookies to analyze site traffic and improve your experience. See our Privacy Policy for details.",
              "Utilizamos cookies para analizar el tráfico del sitio y mejorar tu experiencia. Consulta nuestra Política de Privacidad para más información.",
              "Utilizziamo cookie per analizzare il traffico del sito e migliorare la tua esperienza. Consulta la nostra Informativa Privacy per maggiori dettagli."
            )}
            {" "}
            <span style={{color:"#C9A84C",textDecoration:"underline",cursor:"pointer"}} onClick={()=>setPage("privacy")}>
              {t("Privacy Policy","Política de Privacidad","Informativa Privacy")}
            </span>
          </div>
          <div style={{display:"flex",gap:10}}>
            <button onClick={rejectCookies} style={{background:"transparent",color:C.muted,border:"1px solid #555",borderRadius:8,padding:"8px 18px",cursor:"pointer",fontSize:13,fontWeight:600}}>
              {t("Reject","Rechazar","Rifiuta")}
            </button>
            <button onClick={acceptCookies} style={{background:"linear-gradient(135deg,#C9A84C,#E2C07A)",color:"#000",border:"none",borderRadius:8,padding:"8px 18px",cursor:"pointer",fontSize:13,fontWeight:700}}>
              {t("Accept","Aceptar","Accetta")}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
