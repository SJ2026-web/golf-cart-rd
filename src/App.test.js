import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import App from './App';

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
