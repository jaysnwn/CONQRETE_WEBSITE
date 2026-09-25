import os
import re

hero_path = "components/home/hero-carousel.tsx"
if os.path.exists(hero_path):
    with open(hero_path, "r", encoding="utf-8") as f:
        text = f.read()
    if '<a href="/products"' in text:
        text = text.replace('<a href="/products"', '<Link href="/products"')
        text = re.sub(r'Shop Now\s*</a>', 'Shop Now</Link>', text)
        if "import Link" not in text:
            text = "import Link from 'next/link';\n" + text
        with open(hero_path, "w", encoding="utf-8") as f:
            f.write(text)

orders_path = "app/(storefront)/orders/page.tsx"
if os.path.exists(orders_path):
    with open(orders_path, "r", encoding="utf-8") as f:
        text = f.read()
    if '<a href="/products"' in text:
        text = text.replace('<a href="/products"', '<Link href="/products"')
        text = re.sub(r'\+\s*NEW ACQUISITION\s*</a>', '+ NEW ACQUISITION</Link>', text)
        if "import Link" not in text:
            text = "import Link from 'next/link';\n" + text
        with open(orders_path, "w", encoding="utf-8") as f:
            f.write(text)
