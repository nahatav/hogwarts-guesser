import sys, os, subprocess, re

sys.path.insert(0, os.path.abspath('scratch/pages'))

import p0_css, p1, p2, p3, p4

full_html = p0_css.CSS + p1.PAGE1 + p2.PAGE2 + p3.PAGE3 + p4.PAGE4

html_out = os.path.abspath('DSC80_Review_Cheatsheet.html')
pdf_out = os.path.abspath('DSC80_Review_Cheatsheet_Lectures_13_to_16.pdf')

with open(html_out, 'w', encoding='utf-8') as f:
    f.write(full_html)
print(f"Wrote HTML ({len(full_html)} chars) to {html_out}")

edge_path = r'C:\Program Files (x86)\Microsoft\Edge\Application\msedge.exe'
cmd = [
    edge_path,
    '--headless',
    '--disable-gpu',
    '--allow-file-access-from-files',
    '--print-to-pdf-no-header',
    f'--print-to-pdf={pdf_out}',
    html_out
]

print("Rendering PDF...")
subprocess.run(cmd, check=True)
print(f"Generated PDF: {pdf_out}")

if os.path.exists(pdf_out):
    size = os.path.getsize(pdf_out)
    print(f"File size: {size} bytes")
    with open(pdf_out, 'rb') as f:
        data = f.read()
    page_matches = re.findall(b'/Type\s*/Page\b', data)
    print(f"=== VERIFIED PDF PAGE COUNT: {len(page_matches)} ===")
