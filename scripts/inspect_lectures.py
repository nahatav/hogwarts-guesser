import urllib.request
import json
import sys

sys.stdout.reconfigure(encoding='utf-8')

def get_repo_contents(path=''):
    url = f'https://api.github.com/repos/dsc-courses/dsc80-2026-su/contents/{path}'
    req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})
    with urllib.request.urlopen(req) as resp:
        return json.loads(resp.read().decode('utf-8'))

# List files in lectures
for i in range(1, 20):
    lec_dir = f'lectures/lec{i:02d}'
    try:
        files = get_repo_contents(lec_dir)
        names = [f['name'] for f in files]
        print(f"{lec_dir}: {', '.join(names)}")
    except Exception:
        pass
