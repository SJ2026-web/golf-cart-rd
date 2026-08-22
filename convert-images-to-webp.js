// Converte tutte le immagini JPG/JPEG/PNG in public/images/ in formato WebP.
// Gli originali NON vengono toccati ne' eliminati: il file .webp viene creato accanto.
//
// A DIFFERENZA della versione precedente, questa prova PIU' livelli di qualita'
// (dal piu' alto al piu' basso) e tiene sempre il risultato piu' leggero.
// Questo evita il problema riscontrato: alcune immagini gia' molto compresse in JPEG
// diventavano PIU' PESANTI se convertite a un livello di qualita' WebP troppo alto.
//
// USO:
//   node convert-images-to-webp.js
//
// Richiede il pacchetto "sharp" (gia' installato nello step precedente).

const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const IMAGES_DIR = path.join(__dirname, 'public', 'images');
const VALID_EXT = ['.jpg', '.jpeg', '.png'];

// Livelli di qualita' da provare, in ordine. Ci si ferma al primo che produce
// un file piu' leggero dell'originale; se nessuno ci riesce, si tiene comunque
// il piu' leggero tra quelli provati (mai un file mancante).
const QUALITY_LEVELS = [78, 65, 50, 35];

async function convertOne(inputPath, originalSize) {
  let best = null;

  for (const quality of QUALITY_LEVELS) {
    const buffer = await sharp(inputPath).webp({ quality, effort: 6 }).toBuffer();
    if (!best || buffer.length < best.size) {
      best = { buffer, size: buffer.length, quality };
    }
    if (buffer.length < originalSize) {
      // Trovato un risultato piu' leggero dell'originale: ci fermiamo qui.
      break;
    }
  }

  return best;
}

async function convertAll() {
  if (!fs.existsSync(IMAGES_DIR)) {
    console.error(`Cartella non trovata: ${IMAGES_DIR}`);
    process.exit(1);
  }

  const files = fs.readdirSync(IMAGES_DIR);
  let converted = 0;
  let stillBigger = 0;
  let skipped = 0;
  let errors = 0;
  let totalOriginal = 0;
  let totalNew = 0;
  const biggerFiles = [];

  for (const file of files) {
    const ext = path.extname(file).toLowerCase();
    if (!VALID_EXT.includes(ext)) continue;

    const inputPath = path.join(IMAGES_DIR, file);
    const outputName = file.slice(0, -ext.length) + '.webp';
    const outputPath = path.join(IMAGES_DIR, outputName);
    const originalSize = fs.statSync(inputPath).size;

    try {
      const result = await convertOne(inputPath, originalSize);
      fs.writeFileSync(outputPath, result.buffer);

      totalOriginal += originalSize;
      totalNew += result.size;

      const savings = ((1 - result.size / originalSize) * 100).toFixed(1);
      const sign = result.size < originalSize ? '-' : '+';
      const label = result.size < originalSize ? 'OK' : 'ATTENZIONE (comunque piu leggero possibile)';

      console.log(
        `${label}: ${file} -> ${outputName}  ` +
        `(${(originalSize / 1024).toFixed(1)} KB -> ${(result.size / 1024).toFixed(1)} KB, ` +
        `${sign}${Math.abs(savings)}%, qualita' usata: ${result.quality})`
      );

      if (result.size < originalSize) {
        converted++;
      } else {
        stillBigger++;
        biggerFiles.push(file);
      }
    } catch (err) {
      console.error(`ERRORE su ${file}: ${err.message}`);
      errors++;
    }
  }

  console.log('\n--- Riepilogo ---');
  console.log(`Migliorate: ${converted}`);
  console.log(`Ancora piu pesanti nonostante i tentativi: ${stillBigger}`);
  console.log(`Errori: ${errors}`);
  if (totalOriginal > 0) {
    const totalSavings = ((1 - totalNew / totalOriginal) * 100).toFixed(1);
    console.log(
      `Peso totale: ${(totalOriginal / 1024).toFixed(0)} KB -> ${(totalNew / 1024).toFixed(0)} KB ` +
      `(-${totalSavings}%)`
    );
  }
  if (biggerFiles.length > 0) {
    console.log('\nFile che restano leggermente piu pesanti anche al livello di qualita piu basso:');
    biggerFiles.forEach(f => console.log(`  - ${f}`));
    console.log('(Sono comunque presenti e funzionanti, solo non piu leggeri dell\'originale.)');
  }
  console.log('\nGli originali JPG/PNG NON sono stati modificati o eliminati.');
}

convertAll();
