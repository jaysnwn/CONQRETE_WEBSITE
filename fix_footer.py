import os
import re

footer_path = "components/layout/footer.tsx"
if os.path.exists(footer_path):
    with open(footer_path, "r", encoding="utf-8") as f:
        text = f.read()
    
    text = text.replace('href="/contact"', 'href="/support/contact"')
    text = text.replace('href="/faqs"', 'href="/support/faqs"')
    text = text.replace('href="/warranty-policy"', 'href="/support/warranty"')
    text = text.replace('href="/privacy-policy"', 'href="/legal/privacy-policy"')
    text = text.replace('href="/terms-of-use"', 'href="/legal/terms-of-use"')
    text = text.replace('href="/shipping-returns"', 'href="/support/shipping-returns"')
    
    with open(footer_path, "w", encoding="utf-8") as f:
        f.write(text)
