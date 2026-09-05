import https from 'https';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const mapsDir = path.join(__dirname, '..', 'public', 'maps');
if (!fs.existsSync(mapsDir)) {
  fs.mkdirSync(mapsDir, { recursive: true });
}

const mapUrls = {
  'marauders-map-full': 'https://static.wikia.nocookie.net/harrypotter/images/1/1d/Marauder%27s_Map_OOTPG.jpg/revision/latest',
  'marauders-map-header': 'https://static.wikia.nocookie.net/harrypotter/images/c/c3/Harry_Map_Header.jpg/revision/latest',
  'marauders-map-movie': 'https://static.wikia.nocookie.net/harrypotter/images/d/d8/Harry-potter3_map_pettigrew.jpg/revision/latest'
};

function downloadUrl(url, dest) {
  return new Promise((resolve, reject) => {
    https.get(url, { headers: { 'User-Agent': 'Mozilla/5.0' } }, (res) => {
      if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        return downloadUrl(res.headers.location, dest).then(resolve).catch(reject);
      }
      if (res.statusCode !== 200) {
        return reject(new Error(`HTTP ${res.statusCode}`));
      }
      const stream = fs.createWriteStream(dest);
      res.pipe(stream);
      stream.on('finish', () => {
        stream.close();
        resolve();
      });
    }).on('error', reject);
  });
}

async function run() {
  console.log("Downloading authentic online Marauder's Map scans...");
  for (const [key, url] of Object.entries(mapUrls)) {
    const dest = path.join(mapsDir, `${key}.jpg`);
    console.log(`Downloading ${key}...`);
    try {
      await downloadUrl(url, dest);
      const sz = fs.statSync(dest).size;
      console.log(`✓ Saved ${key}.jpg (${(sz / 1024).toFixed(0)} KB)`);
    } catch (e) {
      console.error(`✗ Error on ${key}: ${e.message}`);
    }
  }
}

run();
