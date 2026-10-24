import sys
sys.stdout.reconfigure(encoding='utf-8')
from pypdf import PdfReader
r = PdfReader(r"d:\GitHub\My-Portfolio\public\Sayantan_Resume.pdf")
print("=== PDF Metadata ===")
meta = r.metadata
for key, val in meta.items() if meta else []:
    print(f"  {key}: {val}")
