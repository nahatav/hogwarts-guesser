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

const searchTerms = {
  'great-hall': 'Christ Church Hall Oxford',
  'potions-dungeon': 'Lacock Abbey Cloisters',
  'gryffindor-common-room': 'Divinity School Bodleian Library Oxford',
  'slytherin-common-room': 'Wieliczka Chapel',
  'ravenclaw-tower': 'Christ Church Cathedral Choir Oxford',
  'hufflepuff-basement': 'Gloucester Cathedral Cloisters',
  'dumbledores-office': 'Durham Cathedral interior',
  'library-restricted': 'Duke Humfrey Library Oxford',
  'astronomy-tower': 'Alnwick Castle',
  'room-of-requirement': 'Lloyds Building Interior',
  'quidditch-pitch': 'Alnwick Castle Inner Bailey',
  'hagrids-hut': 'Wistmans Wood Dartmoor',
  'herbology-greenhouses': 'Palm House Kew Gardens',
  'diagon-alley-ollivanders': 'Leadenhall Market London',
  'gringotts-vaults': 'Salina Turda mine',
  'knockturn-alley': 'The Shambles York',
  'hogsmeade-high-street': 'Goathland railway station',
  'shrieking-shack': 'Old wooden abandoned house forest',
  'ministry-atrium': 'Grand Central Terminal Inside',
  'department-of-mysteries': 'CERN LHC Tunnel',
  'platform-9-3-4': 'Glenfinnan Viaduct Jacobite',
  'forbidden-forest-clearing': 'Moss covered trees rainforest temperate'
};

function searchWiki(term) {
  const url = `https://commons.wikimedia.org/w/api.php?action=query&generator=search&gsrsearch=${encodeURIComponent(term)}&gsrnamespace=6&gsrlimit=1&prop=imageinfo&iiprop=url&iiurlwidth=2048&format=json`;
  return new Promise((resolve, reject) => {
    https.get(url, { headers: { 'User-Agent': 'MaraudersGuessr/1.0 (academic research test)' } }, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        try {
          const json = JSON.parse(data);
          const pages = json.query?.pages || {};
          for (const [id, page] of Object.entries(pages)) {
            const thumb = page.imageinfo?.[0]?.thumburl || page.imageinfo?.[0]?.url;
            if (thumb) return resolve(thumb);
          }
          resolve(null);
        } catch (e) {
          reject(e);
        }
      });
    }).on('error', reject);
  });
}

function downloadFile(url, dest) {
  return new Promise((resolve, reject) => {
    https.get(url, { headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36' } }, (res) => {
      if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        return downloadFile(res.headers.location, dest).then(resolve).catch(reject);
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

function sleep(ms) {
  return new Promise(r => setTimeout(r, ms));
}

async function run() {
  console.log("Searching and downloading real photographs/panoramas for all Hogwarts chambers...");
  let idx = 0;
  for (const [key, term] of Object.entries(searchTerms)) {
    console.log(`[${++idx}/22] Searching for ${key} ("${term}")...`);
    try {
      const url = await searchWiki(term);
      if (url) {
        console.log(`  Found: ${url.slice(0, 60)}...`);
        const dest = path.join(outputDir, `${key}.jpg`);
        await downloadFile(url, dest);
        const sz = fs.statSync(dest).size;
        console.log(`  ✓ Saved ${key}.jpg (${(sz / 1024).toFixed(0)} KB)`);
      } else {
        console.warn(`  ✗ No result for ${term}`);
      }
    } catch (e) {
      console.error(`  ✗ Error: ${e.message}`);
    }
    await sleep(400);
  }
  console.log("Download process finished!");
}

run();
