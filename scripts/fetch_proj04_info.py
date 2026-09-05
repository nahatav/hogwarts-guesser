import urllib.request
import re
import os

def fetch(url):
    req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})
    with urllib.request.urlopen(req) as resp:
        return resp.read().decode('utf-8', errors='ignore')

os.makedirs('proj04_docs', exist_ok=True)

# 1. Fetch main proj04 page
html = fetch('https://dsc80.com/proj04/')
with open('proj04_docs/proj04_main.html', 'w', encoding='utf-8') as f:
    f.write(html)

# Extract dataset links
links = re.findall(r'href=[\'"]([^\'"]+)[\'"]', html)
dataset_links = []
for l in sorted(set(links)):
    if not l.startswith('http') and not l.startswith('#') and not l.startswith('/assets') and not l.startswith('/syllabus') and not l.startswith('/calendar') and not l.startswith('/tech_support') and not l.startswith('/resources') and not l.startswith('/staff') and not l == '/' and not l == '/proj04/':
        dataset_links.append(l)

print("Dataset links found:", dataset_links)

for dl in dataset_links:
    full_url = f"https://dsc80.com/proj04/{dl.lstrip('/')}"
    try:
        content = fetch(full_url)
        clean_name = dl.strip('/').replace('/', '_')
        with open(f'proj04_docs/{clean_name}.html', 'w', encoding='utf-8') as f:
            f.write(content)
        print(f"Downloaded {full_url} -> proj04_docs/{clean_name}.html")
    except Exception as e:
        print(f"Failed to fetch {full_url}: {e}")

# Also download github files
for f in ['README.md', 'dsc80_utils.py', 'template.ipynb']:
    gurl = f'https://raw.githubusercontent.com/dsc-courses/dsc80-2026-su/main/projects/proj04/{f}'
    try:
        gcontent = fetch(gurl)
        with open(f'proj04_docs/{f}', 'w', encoding='utf-8') as out:
            out.write(gcontent)
        print(f"Downloaded {gurl} -> proj04_docs/{f}")
    except Exception as e:
        print(f"Failed to fetch {gurl}: {e}")
