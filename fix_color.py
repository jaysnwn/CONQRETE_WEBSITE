import os

path = "app/(storefront)/verify/verify-client.tsx"
with open(path, "r", encoding="utf-8") as f:
    text = f.read()

# Fix "Place the QR code" text color
old_str = "color: 'var(--acid)',"
new_str = "color: '#4b5563', fontWeight: 'bold',"

# We only want to replace it around the Place the QR code, let's find that block.
block_start = "Place the QR code inside the frame."
idx = text.find(block_start)
if idx != -1:
    # search backwards for color: 'var(--acid)'
    search_area_start = text.rfind("color: 'var(--acid)',", 0, idx)
    if search_area_start != -1:
        text = text[:search_area_start] + "color: '#4b5563', fontWeight: 'bold'," + text[search_area_start + len("color: 'var(--acid)',"):]

with open(path, "w", encoding="utf-8") as f:
    f.write(text)
