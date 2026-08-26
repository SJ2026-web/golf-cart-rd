import { render, screen, fireEvent, waitFor, within } from '@testing-library/react';
import App from './App';

// Il timeout di default di Jest per un intero test è 5000ms. Diversi test in
// questo file eseguono più `waitFor` in sequenza (ognuno con timeout fino a
// 15000ms per gestire il lazy-loading e i controlli PropTypes attivi in
// sviluppo/test) e la loro somma può superare i 5000ms di default, causando
// un'interruzione forzata del test a metà esecuzione — che a sua volta può
// lasciare in sospeso operazioni asincrone e "sporcare" i test successivi
// nello stesso file. Alziamo quindi il timeout complessivo per test a 30s.
jest.setTimeout(30000);

// ============================================================================
// HELPER DI NAVIGAZIONE — solo per i test, nessuna modifica al codice applicativo.
// Riflettono la sequenza di step del configuratore così come esiste oggi in
// ConfiguratorPage.js (step -1 -> 0 -> 1 -> ... -> 9). Se in futuro la sequenza
// cambiasse, andranno aggiornati solo questi helper, non i singoli test.
// ============================================================================

// Estrae la sola parte numerica da un testo, utile perché toLocaleString()
// inserisce separatori delle migliaia diversi a seconda dell'ambiente in cui
// gira Jest (virgola, punto, spazio o nessuno).
const digitsOf = (text) => (text || '').replace(/[^0-9]/g, '');

// Clicca un elemento (bottone o card) individuato tramite testo/regex, dopo
// essersi assicurati che sia presente nel DOM.
async function clickText(matcher) {
  await waitFor(() => {
    expect(screen.getByText(matcher)).toBeInTheDocument();
  }, { timeout: 15000 });
  fireEvent.click(screen.getByText(matcher));
}

// Apre il configuratore dalla Home e arriva allo step -1 ("Name your Golf Cart").
async function openConfigurator() {
  render(<App />);
  fireEvent.click(screen.getByText(/Configure your own/i));
  await waitFor(() => {
    expect(screen.getByText(/Name your Golf Cart/i)).toBeInTheDocument();
  }, { timeout: 15000 });
}

// Dallo step -1, avanza allo step 0 e seleziona il modello indicato (A/B/C/D).
// Selezionare un modello imposta anche automaticamente: seats="2", pneumatici
// "offroad-12", colore carrozzeria bianco, sedile standard, sterzo standard
// (comportamento esistente di ConfiguratorPage.js, non modificato qui).
async function selectModel(letter) {
  await clickText(/Next/i); // step -1 -> step 0
  const modelMatcher = new RegExp(`Model ${letter}\\b`, 'i');
  await clickText(modelMatcher); // seleziona il modello sulla card
}

// Sequenza esatta delle etichette dei pulsanti "avanti" da step 0 a step 9.
const FORWARD_LABELS = [/Next/i, /Next/i, /Next/i, /Next/i, /Next/i, /Next/i, /Continue/i, /Next/i, /Last Step/i];

// Avanza dallo step "fromStep" (incluso) allo step "toStep" (escluso),
// cliccando in sequenza i pulsanti corretti. FORWARD_LABELS è indicizzato
// per step di partenza (es. FORWARD_LABELS[2] = pulsante che porta da
// step 2 a step 3), quindi è sicuro chiamare questa funzione più volte
// nello stesso test partendo da step intermedi diversi da 0.
async function advanceFromStep(fromStep, toStep) {
  for (let s = fromStep; s < toStep; s++) {
    await clickText(FORWARD_LABELS[s]);
  }
}

// Legge il totale live mostrato dalla SummaryBar (presente sugli step 1-6)
// cercando un elemento il cui testo contenga sia le cifre attese sia "USD".
async function expectLiveTotal(expectedAmount) {
  await waitFor(() => {
    const matches = screen.getAllByText((_, element) => {
      if (!element || !element.textContent) return false;
      return digitsOf(element.textContent).includes(String(expectedAmount)) && element.textContent.includes('USD');
    });
    expect(matches.length).toBeGreaterThan(0);
  }, { timeout: 15000 });
}

// jsdom non implementa window.scrollTo: lo mockiamo per evitare rumore in console
// (non ha alcun impatto sulla logica testata).
beforeAll(() => {
  window.scrollTo = jest.fn();
});

// Il sito salva automaticamente in localStorage la configurazione in corso (funzione "riprendi bozza"),
// e aggiorna l'URL del browser ad ogni cambio pagina (per URL condivisibili). Entrambi questi elementi
// (localStorage e window.location) restano condivisi tra un test e l'altro nello stesso file, perche'
// l'ambiente di test riusa la stessa finestra simulata. Senza pulirli, un test successivo troverebbe
// l'app gia' aperta sulla pagina/configurazione lasciata dal test precedente invece di ripartire dalla
// Home, come farebbe correttamente un visitatore che ha davvero una sessione precedente. Resettiamo
// entrambi prima di ogni test per isolarli.
beforeEach(() => {
  localStorage.clear();
  window.history.pushState({}, '', '/');
});

test('1. il sito si carica senza errori (smoke test base)', () => {
  render(<App />);
  // Il logo TAAAC e' presente su ogni pagina: se compare, l'app ha renderizzato correttamente.
  expect(screen.getByAltText('TAAAC Solutions')).toBeInTheDocument();
});

test('2. il configuratore si apre dalla Home e mostra "Name your Golf Cart"', async () => {
  render(<App />);
  fireEvent.click(screen.getByText(/Configure your own/i));

  // ConfiguratorPage e' lazy-loaded: aspettiamo che il chunk venga caricato.
  // Timeout esteso a 3s: con PropTypes attivo (solo in sviluppo/test), i controlli aggiuntivi
  // ad ogni render possono rallentare leggermente il primo caricamento del componente lazy.
  await waitFor(() => {
    expect(screen.getByText(/Name your Golf Cart/i)).toBeInTheDocument();
  }, { timeout: 15000 });
});

test('3. il bottone Indietro dal configuratore riporta alla Home (fix bug prevPage)', async () => {
  render(<App />);
  fireEvent.click(screen.getByText(/Configure your own/i));

  await waitFor(() => {
    expect(screen.getByText(/Name your Golf Cart/i)).toBeInTheDocument();
  }, { timeout: 15000 });

  fireEvent.click(screen.getByText(/← Back/i));

  // Dopo "Indietro" dobbiamo essere tornati sulla Home, non su "chooseMode".
  // Verifichiamo che la card "Configure your own" della Home sia di nuovo visibile.
  await waitFor(() => {
    expect(screen.getByText(/Configure your own/i)).toBeInTheDocument();
  }, { timeout: 15000 });
  // E che la schermata del configuratore non sia piu' presente.
  expect(screen.queryByText(/Name your Golf Cart/i)).not.toBeInTheDocument();
});

test('4. il prezzo base del Modello A ($8,990) viene mostrato correttamente nel configuratore', async () => {
  render(<App />);
  fireEvent.click(screen.getByText(/Configure your own/i));

  await waitFor(() => {
    expect(screen.getByText(/Name your Golf Cart/i)).toBeInTheDocument();
  }, { timeout: 15000 });

  // Avanziamo dallo step -1 (nome) allo step 0 (scelta modello), senza inserire un nome.
  fireEvent.click(screen.getByText(/Next/i));

  // Il formato del separatore delle migliaia (virgola, punto, spazio o nessuno) dipende
  // dall'ambiente in cui gira il test (m.price.toLocaleString() non specifica una lingua fissa).
  // Cerchiamo la sequenza di cifre "8990" ignorando qualsiasi carattere di separazione,
  // e verifichiamo che compaia accanto a "USD" per evitare falsi positivi.
  await waitFor(() => {
    const matches = screen.getAllByText((_, element) => {
      if (!element || !element.textContent) return false;
      const digitsOnly = element.textContent.replace(/[^0-9]/g, '');
      return digitsOnly.includes('8990') && element.textContent.includes('USD');
    });
    expect(matches.length).toBeGreaterThan(0);
  }, { timeout: 15000 });
});

// Cleanup dedicato per il mock di EmailJS (impostato solo nel test 14),
// per non lasciare stato residuo che possa influenzare altri test.
afterEach(() => {
  delete window.emailjs;
});

test('5. i prezzi base dei 4 modelli (A/B/C/D) sono mostrati correttamente', async () => {
  render(<App />);
  fireEvent.click(screen.getByText(/Configure your own/i));
  await waitFor(() => {
    expect(screen.getByText(/Name your Golf Cart/i)).toBeInTheDocument();
  }, { timeout: 15000 });
  fireEvent.click(screen.getByText(/Next/i));

  // Verifichiamo, per ciascun modello, che il prezzo "from $X USD" mostrato
  // sia quello corretto e che sia effettivamente DENTRO la card di quel
  // modello (non solo presente da qualche parte nella pagina). La card è il
  // div contenitore diretto del nome modello ("Model A" ecc.): nome e prezzo
  // sono figli diretti dello stesso div, quindi risalendo di un livello dal
  // nome si ottiene esattamente la card corretta da cui scopare la ricerca.
  const expectedPrices = { A: '8990', B: '9506', C: '9588', D: '9672' };
  await waitFor(() => {
    for (const [letter, price] of Object.entries(expectedPrices)) {
      const modelNameEl = screen.getByText(new RegExp(`^Model ${letter}$`, 'i'));
      const card = modelNameEl.parentElement;
      expect(card).toBeTruthy();
      const priceMatches = within(card).getAllByText((_, element) => {
        if (!element || !element.textContent) return false;
        return digitsOf(element.textContent).includes(price) && element.textContent.includes('USD');
      });
      expect(priceMatches.length).toBeGreaterThan(0);
    }
  }, { timeout: 15000 });
});

test('6. il supplemento posti (2+2) viene sommato correttamente al totale', async () => {
  await openConfigurator();
  await selectModel('A');
  await advanceFromStep(0, 2); // step 0 -> step 1 (colore) -> step 2 (posti)

  await waitFor(() => {
    expect(screen.getByText(/2\+2 Seats/i)).toBeInTheDocument();
  }, { timeout: 15000 });
  fireEvent.click(screen.getByText(/2\+2 Seats/i));

  // Modello A (8990) + supplemento 2+2 posti (1169) = 10159
  await expectLiveTotal('10159');
});

test('7. il supplemento pneumatici (Off-Road 14") viene sommato correttamente al totale', async () => {
  await openConfigurator();
  await selectModel('A');
  await advanceFromStep(0, 4); // step 0 -> ... -> step 4 (sterzo/pneumatici/parabrezza)

  await clickText(/Other inches/i);
  // NB: dopo l'apertura del pannello sono presenti due elementi contenenti
  // "Off-Road 14": l'etichetta informativa del pannello (con emoji 🏔️) e la
  // card cliccabile. Usiamo un match esatto (con ancore) per selezionare
  // solo la card, che contiene unicamente il testo `Off-Road 14"`.
  const tireCard = /^Off-Road 14"$/i;
  await waitFor(() => {
    expect(screen.getByText(tireCard)).toBeInTheDocument();
  }, { timeout: 15000 });
  fireEvent.click(screen.getByText(tireCard));

  // Modello A (8990) + supplemento pneumatici Off-Road 14" (205) = 9195
  await expectLiveTotal('9195');
});

test('8. i supplementi di batteria e motore vengono sommati correttamente al totale', async () => {
  await openConfigurator();
  await selectModel('A');
  await advanceFromStep(0, 5); // step 0 -> ... -> step 5 (batteria/motore)

  // Batteria: 60V 150A Litio (+661)
  await clickText(/Other battery options/i);
  await waitFor(() => {
    expect(screen.getByText(/60V 150A/i)).toBeInTheDocument();
  }, { timeout: 15000 });
  fireEvent.click(screen.getByText(/60V 150A/i));
  await expectLiveTotal('9651'); // 8990 + 661

  // Motore: 5 kW (+270 per Modello A con 2 posti)
  await clickText(/Other motor options/i);
  await waitFor(() => {
    expect(screen.getByText(/^5 kW$/i)).toBeInTheDocument();
  }, { timeout: 15000 });
  fireEvent.click(screen.getByText(/^5 kW$/i));
  await expectLiveTotal('9921'); // 8990 + 661 + 270

  // Batteria "On Request": 72V 100A — Lead-acid, con seats !== "other" (qui "2"),
  // batteryPrice() restituisce la stringa "onrequest" invece di un numero:
  // deve comparire l'etichetta "On Request", NON un supplemento "+$", e il
  // totale non deve includere alcun contributo numerico da questa batteria
  // (il pannello batteria è ancora aperto da sopra, non serve riaprirlo).
  fireEvent.click(screen.getByText(/72V 100A/i));
  await waitFor(() => {
    const batteryNameEl = screen.getByText(/72V 100A/i);
    const batteryRow = batteryNameEl.parentElement;
    expect(within(batteryRow).getByText(/On Request/i)).toBeInTheDocument();
    expect(within(batteryRow).queryByText(/\+\$/)).not.toBeInTheDocument();
  }, { timeout: 15000 });
  // Totale: 8990 (base) + 270 (motore 5kW ancora selezionato) + 0 (batteria on request) = 9260
  await expectLiveTotal('9260');
});

test('9. il pannello solare è sempre incluso a $0 e non è disattivabile', async () => {
  await openConfigurator();
  await selectModel('A');
  await advanceFromStep(0, 6); // step 0 -> ... -> step 6 (optional)

  // Il pannello solare è mostrato nel banner "Always Included", non come
  // opzione selezionabile/deselezionabile nella lista degli optional.
  await waitFor(() => {
    expect(screen.getByText(/Always Included/i)).toBeInTheDocument();
  }, { timeout: 15000 });

  await clickText(/Add more options/i);
  await waitFor(() => {
    expect(screen.getByText(/Select the options you want to add/i)).toBeInTheDocument();
  }, { timeout: 15000 });
  // Il pannello solare non deve comparire tra le opzioni selezionabili/deselezionabili.
  expect(screen.queryByText(/500W Solar Panel/i)).not.toBeInTheDocument();

  // Senza alcun supplemento selezionato, il totale resta esattamente il prezzo
  // base del modello: conferma che il pannello solare contribuisce $0.
  await expectLiveTotal('8990');
});

test('10. lo schema di pagamento 35%-35%-30% somma esattamente al totale configurato', async () => {
  await openConfigurator();
  await selectModel('A');
  await advanceFromStep(0, 2); // step 0 -> step 1 -> step 2 (posti)
  await waitFor(() => {
    expect(screen.getByText(/2\+2 Seats/i)).toBeInTheDocument();
  }, { timeout: 15000 });
  fireEvent.click(screen.getByText(/2\+2 Seats/i)); // totale atteso: 8990 + 1169 = 10159
  await advanceFromStep(2, 9); // step 2 -> ... -> step 9 (Confirm & Details)

  await waitFor(() => {
    expect(screen.getByText(/Confirm & Details/i)).toBeInTheDocument();
  }, { timeout: 15000 });

  // Verifica indipendente che il totale mostrato sia esattamente 10159
  // (8990 di base + 1169 di supplemento posti), senza cifre estranee.
  await waitFor(() => {
    const matches = screen.getAllByText((_, element) => {
      if (!element || !element.textContent) return false;
      return digitsOf(element.textContent) === '10159' && element.textContent.includes('USD');
    });
    expect(matches.length).toBeGreaterThan(0);
  }, { timeout: 15000 });
  const total = 10159;

  // Leggiamo i tre importi (35% On Order, 35% On Completion, 30% On Delivery)
  // e verifichiamo che sommino esattamente al totale mostrato, senza scarti
  // di arrotondamento (payment3 in ConfiguratorPage.js è calcolato come
  // resto, non come totale*0.30, proprio per garantire questa proprietà).
  const onOrderLabel = screen.getByText(/On Order/i);
  const onCompletionLabel = screen.getByText(/On Completion/i);
  const onDeliveryLabel = screen.getByText(/On Delivery/i);

  const readAmountNear = (labelEl) => {
    // labelEl è il div "35% On Order" (o simile); il suo genitore diretto
    // contiene come fratelli anche il div con l'importo in USD.
    const container = labelEl.parentElement;
    const amountEl = Array.from(container.querySelectorAll('div')).find(d => d.textContent.includes('USD') && /\$[\d.,\s]+/.test(d.textContent));
    expect(amountEl).toBeTruthy();
    return parseInt(digitsOf(amountEl.textContent), 10);
  };

  const payment1 = readAmountNear(onOrderLabel);
  const payment2 = readAmountNear(onCompletionLabel);
  const payment3 = readAmountNear(onDeliveryLabel);

  expect(payment1 + payment2 + payment3).toBe(total);
  expect(total).toBe(10159);
});

test('11. la navigazione base del configuratore rispetta le regole di step (Next disabilitato senza modello, stato preservato col Back)', async () => {
  await openConfigurator();
  await clickText(/Next/i); // step -1 -> step 0

  // Senza selezionare alcun modello, il bottone "Next" è disabilitato:
  // il click non deve far avanzare lo step (restiamo sulla schermata modelli).
  await waitFor(() => {
    expect(screen.getByText(/Model A/i)).toBeInTheDocument();
  }, { timeout: 15000 });
  const nextBtn = screen.getByText(/Next/i).closest('button');
  expect(nextBtn).toBeDisabled();
  fireEvent.click(nextBtn);
  expect(screen.getByText(/Model A/i)).toBeInTheDocument(); // ancora sullo step 0

  // Selezioniamo il modello: ora Next funziona e ci porta allo step 1.
  fireEvent.click(screen.getByText(/Model A/i));
  await clickText(/Next/i); // step 0 -> step 1
  // NB: "Model A" resta legittimamente visibile anche allo step 1, perché la
  // SummaryBar (presente sugli step 1-6) mostra sempre un riepilogo live con
  // "Model {cfg.model}". Usiamo quindi l'assenza di "Model B" come prova che
  // la griglia di selezione modelli dello step 0 non è più a schermo: la
  // SummaryBar mostra sempre e solo il modello selezionato, mai gli altri.
  await waitFor(() => {
    expect(screen.queryByText(/Model B/i)).not.toBeInTheDocument();
  }, { timeout: 15000 });

  // Torniamo indietro: il modello scelto deve essere rimasto memorizzato,
  // quindi Next deve funzionare immediatamente senza dover riselezionare nulla.
  await clickText(/← Back/i); // step 1 -> step 0
  await waitFor(() => {
    expect(screen.getByText(/Model A/i)).toBeInTheDocument();
  }, { timeout: 15000 });
  const nextBtnAfterBack = screen.getByText(/Next/i).closest('button');
  expect(nextBtnAfterBack).not.toBeDisabled();
});

test('12. la configurazione in corso viene salvata e proposta per la ripresa (localStorage)', async () => {
  const { unmount } = render(<App />);
  fireEvent.click(screen.getByText(/Configure your own/i));
  await waitFor(() => {
    expect(screen.getByText(/Name your Golf Cart/i)).toBeInTheDocument();
  }, { timeout: 15000 });
  fireEvent.click(screen.getByText(/Next/i)); // step -1 -> step 0 (qui scatta il salvataggio automatico)
  await waitFor(() => {
    expect(screen.getByText(/Model A/i)).toBeInTheDocument();
  }, { timeout: 15000 });
  fireEvent.click(screen.getByText(/Model A/i));

  // Attendiamo che l'effetto di salvataggio automatico scriva la bozza.
  await waitFor(() => {
    const raw = localStorage.getItem('golfcart_draft');
    expect(raw).not.toBeNull();
    expect(JSON.parse(raw).cfg.model).toBe('A');
  }, { timeout: 15000 });

  // Simuliamo una nuova visita: smontiamo l'app e ripristiniamo l'URL alla
  // Home prima di rimontare. Senza questo reset, il secondo mount di App
  // leggerebbe l'URL lasciato dalla navigazione precedente (il sito aggiorna
  // l'URL ad ogni cambio pagina per link condivisibili) e inizializzerebbe
  // direttamente sulla pagina del configuratore anziché sulla Home.
  unmount();
  window.history.pushState({}, '', '/');
  render(<App />);
  fireEvent.click(screen.getByText(/Configure your own/i));

  // Il banner di ripresa bozza deve comparire con il testo atteso.
  await waitFor(() => {
    expect(screen.getByText(/You have a configuration in progress for/i)).toBeInTheDocument();
  }, { timeout: 15000 });
  fireEvent.click(screen.getByText(/^Continue$/i));

  // Dopo aver ripreso, non dobbiamo essere sullo step -1 (nome), perché la
  // bozza salvata era già allo step 0 con il modello A selezionato.
  await waitFor(() => {
    expect(screen.queryByText(/Name your Golf Cart/i)).not.toBeInTheDocument();
  }, { timeout: 15000 });
});

test('13. il cambio lingua (EN -> FR) aggiorna il testo dell\'interfaccia', async () => {
  render(<App />);
  expect(screen.getByText(/Configure your own/i)).toBeInTheDocument();

  fireEvent.click(screen.getByText(/Select your language/i));
  const frButton = screen.getByText((content, element) =>
    element?.tagName === 'BUTTON' && element.textContent.trim() === 'FR'
  );
  fireEvent.click(frButton);

  await waitFor(() => {
    expect(screen.getByText(/Configurez la vôtre/i)).toBeInTheDocument();
  }, { timeout: 15000 });
  expect(screen.queryByText(/Configure your own/i)).not.toBeInTheDocument();
});

test('14. l\'invio del form finale chiama EmailJS (mockato) due volte e il messaggio interno riporta correttamente totale e schema di pagamento 35/35/30', async () => {
  const sendMock = jest.fn().mockResolvedValue({ status: 200, text: 'OK' });
  window.emailjs = { send: sendMock };

  await openConfigurator();
  await selectModel('A'); // nessun extra: totale atteso 8990
  await advanceFromStep(0, 9); // step 0 -> ... -> step 9 (Confirm & Details)

  await waitFor(() => {
    expect(screen.getByText(/Confirm & Details/i)).toBeInTheDocument();
  }, { timeout: 15000 });

  // Prima dell'invio: la bozza deve esistere in localStorage (salvata
  // automaticamente durante la navigazione nel configuratore, come da test 12).
  await waitFor(() => {
    expect(localStorage.getItem('golfcart_draft')).not.toBeNull();
  }, { timeout: 15000 });

  fireEvent.change(screen.getByPlaceholderText('Mario'), { target: { value: 'Mario' } });
  fireEvent.change(screen.getByPlaceholderText('Rossi'), { target: { value: 'Rossi' } });
  fireEvent.change(screen.getByPlaceholderText('+1 809 000 0000'), { target: { value: '+18095551234' } });
  fireEvent.change(screen.getByPlaceholderText('email@example.com'), { target: { value: 'mario.rossi@example.com' } });

  // NB: il bottone contiene "📩 Send" (l'emoji è testo nello stesso elemento,
  // non in un elemento separato): un match esatto su "Send" da solo fallirebbe.
  // Il confine di parola \b esclude "Sending..." (stato transitorio di invio)
  // senza richiedere il match sull'intero testo del bottone.
  fireEvent.click(screen.getByText(/\bSend\b/i));

  await waitFor(() => {
    expect(screen.getByText(/Request Sent!/i)).toBeInTheDocument();
  }, { timeout: 15000 });

  // Dopo un invio riuscito, la bozza salvata deve essere stata rimossa
  // (comportamento esistente in ConfiguratorPage.js dopo la conferma).
  await waitFor(() => {
    expect(localStorage.getItem('golfcart_draft')).toBeNull();
  }, { timeout: 15000 });

  // EmailJS deve essere stato chiamato esattamente 2 volte: notifica interna
  // a TAAAC Solutions + email di conferma automatica al cliente.
  expect(sendMock).toHaveBeenCalledTimes(2);

  // Nessuna vera richiesta di rete: verifichiamo che sia stato chiamato solo il mock.
  const firstCallArgs = sendMock.mock.calls[0];
  const firstPayload = firstCallArgs[2];
  expect(firstPayload.to_email).toBe('info@taaac.solutions'); // conferma: prima chiamata = notifica interna a TAAAC

  const msg = firstPayload.message;

  // Totale e prezzo base: Modello A senza extra = 8990.
  expect(msg).toMatch(/Total: \$[\d.,\s]*8[.,\s]?990/);
  // Schema di pagamento presente ed etichettato correttamente.
  expect(msg).toContain('35% on order:');
  expect(msg).toContain('35% on completion:');
  expect(msg).toContain('30% on delivery:');
  // Importi coerenti: 35% di 8990 = 3146.5 -> arrotondato a 3147 (x2);
  // il restante (30%) è per differenza: 8990 - 3147 - 3147 = 2696.
  expect(msg).toMatch(/35% on order: \$[\d.,\s]*3[.,\s]?147/);
  expect(msg).toMatch(/35% on completion: \$[\d.,\s]*3[.,\s]?147/);
  expect(msg).toMatch(/30% on delivery: \$[\d.,\s]*2[.,\s]?696/);
});

test('15. una bozza salvata più vecchia di 5 giorni non viene proposta per la ripresa', async () => {
  // Scriviamo manualmente una bozza con savedAt di 6 giorni fa (oltre il
  // limite DRAFT_MAX_AGE di 5 giorni esistente in App.js, qui non modificato).
  const staleDraft = {
    cfg: { model: 'A', cartName: 'Vecchia Bozza' },
    step: 0,
    savedAt: Date.now() - (6 * 24 * 60 * 60 * 1000),
  };
  localStorage.setItem('golfcart_draft', JSON.stringify(staleDraft));

  render(<App />);
  fireEvent.click(screen.getByText(/Configure your own/i));

  // Il banner di ripresa bozza non deve comparire: la bozza è scaduta.
  await waitFor(() => {
    expect(screen.getByText(/Name your Golf Cart/i)).toBeInTheDocument();
  }, { timeout: 15000 });
  expect(screen.queryByText(/You have a configuration in progress for/i)).not.toBeInTheDocument();

  // La bozza scaduta viene anche ripulita da localStorage (comportamento
  // esistente nell'effetto di controllo bozza all'avvio, qui non modificato).
  await waitFor(() => {
    expect(localStorage.getItem('golfcart_draft')).toBeNull();
  }, { timeout: 15000 });
});
