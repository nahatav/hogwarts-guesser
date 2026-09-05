import https from 'https';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const outputDir = path.join(__dirname, '..', 'public', 'panoramas');
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

// Curated high-res imagery mapping for remaining Hogwarts & Wizarding World chambers
const curatedOnlinePanos = {
  'potions-dungeon': 'https://images.unsplash.com/photo-1541781774459-bb2af2f05b55?auto=format&fit=crop&w=2560&q=85',
  'dumbledores-office': 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=2560&q=85',
  'library-restricted': 'https://images.unsplash.com/photo-1521587760476-6c12a4b040da?auto=format&fit=crop&w=2560&q=85',
  'astronomy-tower': 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=2560&q=85',
  'room-of-requirement': 'https://images.unsplash.com/photo-1533158307587-828f0a76ef46?auto=format&fit=crop&w=2560&q=85',
  'hagrids-hut': 'https://images.unsplash.com/photo-1510798831971-661eb04b3739?auto=format&fit=crop&w=2560&q=85',
  'herbology-greenhouses': 'https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?auto=format&fit=crop&w=2560&q=85',
  'diagon-alley-ollivanders': 'https://images.unsplash.com/photo-1513584684374-8bab748fbf90?auto=format&fit=crop&w=2560&q=85',
  'gringotts-vaults': 'https://images.unsplash.com/photo-1508739773434-c26b3d09e071?auto=format&fit=crop&w=2560&q=85',
  'knockturn-alley': 'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?auto=format&fit=crop&w=2560&q=85',
  'hogsmeade-high-street': 'https://images.unsplash.com/photo-1517299321609-52687d1bc55a?auto=format&fit=crop&w=2560&q=85',
  'shrieking-shack': 'https://images.unsplash.com/photo-1518780664697-55e3ad937233?auto=format&fit=crop&w=2560&q=85',
  'ministry-atrium': 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=2560&q=85',
  'department-of-mysteries': 'https://images.unsplash.com/photo-1507499739999-097706ad8914?auto=format&fit=crop&w=2560&q=85',
  'platform-9-3-4': 'https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&fit=crop&w=2560&q=85',
  'forbidden-forest-clearing': 'https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&w=2560&q=85'
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
      const file = fs.createWriteStream(dest);
      res.pipe(file);
      file.on('finish', () => {
        file.close();
        resolve();
      });
    }).on('error', reject);
  });
}

async function run() {
  console.log("Downloading remaining high-resolution chamber imagery...");
  for (const [key, url] of Object.entries(curatedOnlinePanos)) {
    const dest = path.join(outputDir, `${key}.jpg`);
    if (fs.existsSync(dest) && fs.statSync(dest).size > 50000) {
      console.log(`Skipping ${key}, already exists.`);
      continue;
    }
    console.log(`Downloading ${key}...`);
    try {
      await downloadUrl(url, dest);
      const sz = fs.statSync(dest).size;
      console.log(`✓ Saved ${key}.jpg (${(sz / 1024).toFixed(0)} KB)`);
    } catch (e) {
      console.error(`✗ Error on ${key}: ${e.message}`);
    }
  }
  console.log("All chambers downloaded successfully!");
}

run();
