import urllib.request
import json
import os
import ssl

ctx = ssl.create_default_context()
ctx.check_hostname = False
ctx.verify_mode = ssl.CERT_NONE

headers = {
    'User-Agent': 'MaraudersGuessr/1.0 (https://github.com/marauders-guessr; contact@example.com)'
}

output_dir = os.path.join(os.path.dirname(__file__), '..', 'public', 'panoramas')
os.makedirs(output_dir, exist_ok=True)

# Wikimedia queries for real Hogwarts locations
queries = {
    'great-hall': 'Christ Church Hall Oxford interior panorama',
    'potions-dungeon': 'Lacock Abbey cloisters panorama',
    'corridors': 'Gloucester Cathedral Cloister panorama',
    'hospital-wing': 'Divinity School Oxford interior panorama',
    'library': 'Duke Humfrey Library Oxford panorama',
    'quidditch-pitch': 'Alnwick Castle courtyard panorama',
    'platform-9-3-4': 'Glenfinnan Viaduct railway steam train panorama',
    'diagon-alley': 'Leadenhall Market London interior panorama',
    'transfiguration': 'Durham Cathedral Chapter House interior panorama',
    'hogsmeade': 'Goathland railway station panorama'
}

def search_wikimedia(query):
    url = f"https://commons.wikimedia.org/w/api.php?action=query&generator=search&gsrsearch={urllib.parse.quote(query)}&gsrnamespace=6&gsrlimit=3&prop=imageinfo&iiprop=url|mime|size&format=json"
    req = urllib.request.Request(url, headers=headers)
    try:
        with urllib.request.urlopen(req, context=ctx, timeout=10) as resp:
            data = json.loads(resp.read().decode('utf-8'))
            pages = data.get('query', {}).get('pages', {})
            for page_id, page in pages.items():
                imageinfo = page.get('imageinfo', [])
                if imageinfo:
                    img_url = imageinfo[0].get('url')
                    mime = imageinfo[0].get('mime')
                    if img_url and ('image/jpeg' in mime or 'image/png' in mime or 'image/webp' in mime):
                        return img_url
    except Exception as e:
        print(f"Error searching for {query}: {e}")
    return None

results = {}
for key, query in queries.items():
    print(f"Searching for {key} ({query})...")
    img_url = search_wikimedia(query)
    if img_url:
        print(f"Found: {img_url}")
        target_file = os.path.join(output_dir, f"{key}.jpg")
        try:
            req = urllib.request.Request(img_url, headers=headers)
            with urllib.request.urlopen(req, context=ctx, timeout=20) as resp, open(target_file, 'wb') as f:
                f.write(resp.read())
            print(f"Saved {key}.jpg ({os.path.getsize(target_file)} bytes)")
            results[key] = f"/panoramas/{key}.jpg"
        except Exception as e:
            print(f"Failed to download {img_url}: {e}")
    else:
        print(f"No image found for {query}")

print("Download summary:", results)
