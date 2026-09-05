import urllib.request
import json
import sys

sys.stdout.reconfigure(encoding='utf-8')

def get_repo_contents(path=''):
    url = f'https://api.github.com/repos/dsc-courses/dsc80-2026-su/contents/{path}'
    req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})
    with urllib.request.urlopen(req) as resp:
        return json.loads(resp.read().decode('utf-8'))

print("=== Root of dsc80-2026-su ===")
root = get_repo_contents('')
for item in root:
    print(f"  {item['name']} ({item['type']})")

print("\n=== Contents of projects/proj04 ===")
proj04 = get_repo_contents('projects/proj04')
for item in proj04:
    print(f"  {item['name']} ({item['type']}) -> {item.get('download_url')}")

print("\n=== Contents of lectures (if any) ===")
try:
    lectures = get_repo_contents('lectures')
    for item in lectures:
        print(f"  {item['name']} ({item['type']})")
except Exception as e:
    print("  Lectures path note:", e)
