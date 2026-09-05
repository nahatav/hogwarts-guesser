import urllib.request
import ssl
import sys

sys.stdout.reconfigure(encoding='utf-8')

ctx = ssl.create_default_context()
ctx.check_hostname = False
ctx.verify_mode = ssl.CERT_NONE

urls = {
    'power_outages_page': 'https://engineering.purdue.edu/LASCI/research-data/outages/outagerisks',
    'power_outages_xlsx': 'https://engineering.purdue.edu/LASCI/research-data/outages/outages.xlsx',
    'hawaii_review': 'https://mcauleylab.ucsd.edu/public_datasets/gdrive/googlelocal/review-Hawaii_10.json.gz',
    'hawaii_meta': 'https://mcauleylab.ucsd.edu/public_datasets/gdrive/googlelocal/meta-Hawaii.json.gz',
    'wearable': 'http://extrasensory.ucsd.edu/data/primary_data_files/ExtraSensory.per_uuid_features_labels.zip',
}

for name, url in urls.items():
    try:
        req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})
        with urllib.request.urlopen(req, context=ctx, timeout=15) as resp:
            print(f'{name}: Status {resp.status}, Content-Length {resp.headers.get("Content-Length")}, Type {resp.headers.get("Content-Type")}')
    except Exception as e:
        print(f'{name} ({url}): Error {e}')
