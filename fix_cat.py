import os
import re

cat_path = "components/home/category-nav.tsx"
if os.path.exists(cat_path):
    with open(cat_path, "r", encoding="utf-8") as f:
        text = f.read()
    
    text = text.replace("href: '/powerbanks'", "href: '/products/power-banks'")
    text = text.replace("href: '/cables'", "href: '/products/cables'")
    text = text.replace("href: '/adapters'", "href: '/products/chargers'")
    
    with open(cat_path, "w", encoding="utf-8") as f:
        f.write(text)
