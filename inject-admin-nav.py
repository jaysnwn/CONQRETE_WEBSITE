import os

path = "app/admin/admin-shell.tsx"
with open(path, "r", encoding="utf-8") as f:
    text = f.read()

nav_item = "  { href: '/admin/warranty', label: 'Warranty', icon: 'shield', requiredPermission: 'dashboard.view' },\n"

if "/admin/warranty" not in text:
    target = "const navItems = ["
    if target in text:
        text = text.replace(target, target + "\n" + nav_item)
        with open(path, "w", encoding="utf-8") as f:
            f.write(text)
        print("Injected nav link successfully")
    else:
        print("Could not find navItems array definition")
else:
    print("Link already exists")
