import urllib.request
import re
import ssl
import sys
import os

sys.stdout.reconfigure(encoding='utf-8')

ctx = ssl.create_default_context()
ctx.check_hostname = False
ctx.verify_mode = ssl.CERT_NONE

def get_links(url):
    req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})
    with urllib.request.urlopen(req, context=ctx) as resp:
        html = resp.read().decode('utf-8', errors='ignore')
    return re.findall(r'href=[\'"]([^\'"]+)[\'"]', html)

print("Purdue Outages page links:")
for l in get_links('https://engineering.purdue.edu/LASCI/research-data/outages/outagerisks'):
    if any(k in l.lower() for k in ['xls', 'outage', 'data', 'download', 'purdue']):
        print("  ", l)
