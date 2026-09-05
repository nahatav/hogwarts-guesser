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

// Queries for exact Harry Potter film scenes & official movie stills
const movieSceneQueries = {
  'great-hall': 'Great Hall in films.jpg',
  'potions-dungeon': 'Professor Snape in the Potions Classroom.jpg',
  'slytherin-common-room': 'Salazar Slytherin statue in the Chamber of Secrets.jpg',
  'gryffindor-common-room': 'Gryffindor Common Room film.jpg',
  'dumbledores-office': "Harry Potter DH using Dumbledore's Pensieve.jpg",
  'quidditch-pitch': 'Hogwarts Quidditch pitch film.jpg',
  'diagon-alley-ollivanders': 'Ollivanders film.jpg',
  'platform-9-3-4': 'Hogwarts Express Platform 9 3/4 film.jpg',
  'forbidden-forest-clearing': 'Forbidden Forest film.jpg',
  'astronomy-tower': 'Astronomy Tower film.jpg',
  'room-of-requirement': 'Room of Requirement film.jpg',
  'department-of-mysteries': 'Hall of Prophecy film.jpg',
  'ministry-atrium': 'Ministry of Magic Atrium film.jpg',
  'shrieking-shack': 'Shrieking Shack film.jpg',
  'hogsmeade-high-street': 'Hogsmeade village film.jpg',
  'hagrids-hut': "Hagrid's Hut film.jpg",
  'herbology-greenhouses': 'Herbology Greenhouse film.jpg',
  'library-restricted': 'Restricted Section film.jpg',
  'ravenclaw-tower': 'Ravenclaw Tower film.jpg',
  'hufflepuff-basement': 'Hufflepuff Common Room film.jpg',
  'gringotts-vaults': 'Gringotts Vaults film.jpg',
  'knockturn-alley': 'Borgin and Burkes film.jpg'
};

function searchFandom(query) {
  const url = `https://harrypotter.fandom.com/api.php?action=query&generator=search&gsrsearch=${encodeURIComponent(query)}&gsrnamespace=6&gsrlimit=1&prop=imageinfo&iiprop=url|size&format=json`;
  return new Promise((resolve) => {
    https.get(url, { headers: { 'User-Agent': 'Mozilla/5.0' } }, (res) => {
      let data = '';
      res.on('data', c => data += c);
      res.on('end', () => {
        try {
          const json = JSON.parse(data);
          const pages = json.query?.pages || {};
          for (const [id, p] of Object.entries(pages)) {
            const u = p.imageinfo?.[0]?.url;
            if (u) return resolve({ title: p.title, url: u });
          }
        } catch (e) {}
        resolve(null);
      });
    }).on('error', () => resolve(null));
  });
}

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
  console.log("Searching and downloading authentic Harry Potter movie scene stills...");
  let count = 0;
  for (const [key, q] of Object.entries(movieSceneQueries)) {
    console.log(`[${++count}/${Object.keys(movieSceneQueries).length}] Searching for ${key} (${q})...`);
    const found = await searchFandom(q);
    if (found) {
      console.log(`  Found: ${found.title}`);
      const dest = path.join(outputDir, `${key}.jpg`);
      try {
        await downloadUrl(found.url, dest);
        const sz = fs.statSync(dest).size;
        console.log(`  ✓ Saved ${key}.jpg (${(sz / 1024).toFixed(0)} KB)`);
      } catch (e) {
        console.error(`  ✗ Error downloading ${key}: ${e.message}`);
      }
    } else {
      console.warn(`  ✗ No image found for ${q}`);
    }
  }
  console.log("Movie scenes download complete!");
}

run();
