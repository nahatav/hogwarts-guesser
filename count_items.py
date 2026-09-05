import re

with open('lab07_repo/labs/lab07/data/messy.txt', 'r', encoding='utf-8') as f:
    text = f.read()

# Let's count how many email, ssn, btc, addr are expected
# Emails:
emails = re.findall(r'([a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})', text)
print("Emails count:", len(emails))

# SSNs:
# Notice that SSNs in messy.txt look like 123-45-6789
# But wait: is 'ssn:' in all of them?
ssns_with_prefix = re.findall(r'ssn:(\d{3}-\d{2}-\d{4})', text)
ssns_all = re.findall(r'\b\d{3}-\d{2}-\d{4}\b', text)
print("SSNs with prefix:", len(ssns_with_prefix))
print("SSNs all:", len(ssns_all))

# In test_s:
# 'bitcoin:1BvBMSEYstWetqTFn5Au4m4GFg7xJaNVN2$jk%^3\t,test@test.com,lkj5r%ji|ssn:423-01-9575,530 High Street'
# Here 'ssn:423-01-9575' -> '423-01-9575'

# Bitcoin:
# bitcoin:([a-zA-Z0-9]+) or bitcoin:([13][a-km-zA-HJ-NP-Z1-9]{25,34})
# Or without bitcoin: prefix?
# Prompt: "Bitcoin Addresses: These are alphanumeric strings of long length."
# In messy.txt, all bitcoins are preceded by "bitcoin:"!
# In messy.test.txt, it is also preceded by "bitcoin:1BvBMSEYstWetqTFn5Au4m4GFg7xJaNVN2"
btcs = re.findall(r'bitcoin:([a-zA-Z0-9]{26,})', text)
print("BTCs count:", len(btcs))

# Addresses:
# How are addresses formatted?
# In test_s: '530 High Street'
# In messy.txt: e.g. '814 Monterey Court'
# Let's see: what if we match digits + space + words until delimiter?
# In messy.txt: delimiters are ,\t|*#\n
# Let's check what strings match r'(\d+\s+[A-Za-z\s]+?(?:Street|St|Court|Ct|Park|Parkway|Pkwy|Avenue|Ave|Drive|Dr|Road|Rd|Lane|Ln|Way|Blvd|Boulevard|Place|Pl|Circle|Cir|Terrace|Ter|Trail|Trl|Highway|Hwy|Alley|Aly|Center|Ctr|Pass|Point|Pt|Crossing|Plaza|Plz|Square|Sq|Loop|Hill|Ridge|Rdg|Cove|Cv|Trace|Trce|Landing|Lndg|Valley|Vly|View|Vw|Run|Pike|Way))\b'
