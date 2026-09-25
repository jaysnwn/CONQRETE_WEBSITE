import os

def fix_file(filepath):
    if not os.path.exists(filepath):
        return
    with open(filepath, "r", encoding="utf-8") as f:
        lines = f.readlines()
    
    use_client_idx = -1
    for i, line in enumerate(lines):
        if '"use client"' in line or "'use client'" in line:
            use_client_idx = i
            break
            
    if use_client_idx > 0:
        # Move it to the very top
        client_line = lines.pop(use_client_idx)
        lines.insert(0, client_line)
        
    with open(filepath, "w", encoding="utf-8") as f:
        f.writelines(lines)

fix_file("components/home/hero-carousel.tsx")
fix_file("app/(storefront)/orders/page.tsx")
