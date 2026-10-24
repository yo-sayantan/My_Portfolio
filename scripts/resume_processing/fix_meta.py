import sys
sys.stdout.reconfigure(encoding='utf-8')
from pypdf import PdfReader, PdfWriter

input_path = r"d:\GitHub\My-Portfolio\public\Sayantan_Resume.pdf"
output_path = r"d:\GitHub\My-Portfolio\public\Sayantan_Resume_fixed.pdf"

reader = PdfReader(input_path)
writer = PdfWriter()

for page in reader.pages:
    writer.add_page(page)

# Update metadata with clean title
writer.add_metadata({
    "/Title": "Sayantan_Resume",
    "/Author": "Sayantan Biswas",
})

with open(output_path, "wb") as f:
    writer.write(f)

# Replace original with fixed version
import os
os.replace(output_path, input_path)

# Verify
reader2 = PdfReader(input_path)
print("=== Updated Metadata ===")
for key, val in reader2.metadata.items():
    print(f"  {key}: {val}")
print("\nDone! PDF title metadata updated to 'Sayantan_Resume'")
