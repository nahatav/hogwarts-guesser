import sys, os, subprocess, re

sys.path.insert(0, os.path.abspath('scratch/pages'))

import css_clean, page1_clean, page2_clean, page3_clean, page4_clean

full_html = css_clean.CSS + page1_clean.PAGE1 + page2_clean.PAGE2 + page3_clean.PAGE3 + page4_clean.PAGE4

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
    '--run-all-compositor-stages-before-draw',
    '--virtual-time-budget=2500',
    '--allow-file-access-from-files',
    '--print-to-pdf-no-header',
    f'--print-to-pdf={pdf_out}',
    html_out
]

print("Rendering PDF with KaTeX...")
subprocess.run(cmd, check=True)
print(f"Generated PDF: {pdf_out}")

if os.path.exists(pdf_out):
    size = os.path.getsize(pdf_out)
    print(f"File size: {size} bytes")
    with open(pdf_out, 'rb') as f:
        data = f.read()
    page_matches = re.findall(rb'/Type\s*/Page\b', data)
    print(f"=== VERIFIED PDF PAGE COUNT: {len(page_matches)} ===")

    # Render PNGs to verify visually
    import fitz
    doc = fitz.open(pdf_out)
    for i, page in enumerate(doc):
        pix = page.get_pixmap(dpi=150)
        pix.save(f'scratch/clean_page_{i+1}.png')
    print("Rendered all clean pages to scratch/clean_page_*.png")
