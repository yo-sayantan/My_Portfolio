import sys
sys.stdout.reconfigure(encoding='utf-8')
from pypdf import PdfReader
r = PdfReader(r"d:\GitHub\My-Portfolio\public\Sayantan_Resume_v24b.1.pdf")
text = ""
for p in r.pages:
    text += p.extract_text() + "\n"

# Write to file to avoid truncation
with open(r"d:\GitHub\My-Portfolio\resume_text.txt", "w", encoding="utf-8") as f:
    f.write(text)
print("Done - saved to resume_text.txt")
