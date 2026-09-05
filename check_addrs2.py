import re

with open('lab07_repo/labs/lab07/data/messy.txt', 'r', encoding='utf-8') as f:
    text = f.read()

# Let's check how many records are there.
# Look for ID lines: e.g. "^[0-9]+\t" or similar
id_lines = re.findall(r'(?:^|\n)(\d+)[,\t|*]', text)
print("Total records approx:", len(id_lines))

# Let's inspect the end of each record
# In messy.txt, each record typically ends with:
# delimiter + (optional \d{2}-\d{7}) + delimiter + (Street Address)
# Let's check lines that contain \d{2}-\d{7}
eins = re.findall(r'\d{2}-\d{7}[,*|\t]([^\n\r]+)', text)
print("Entries after \d{2}-\d{7}:", len(eins))
print("Sample entries after EIN:", eins[:10])
for e in eins[:10]:
    print("  ->", repr(e))

# Check if there are any other addresses
