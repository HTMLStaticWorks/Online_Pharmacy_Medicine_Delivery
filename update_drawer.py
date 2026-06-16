import os
import re

html_files = [f for f in os.listdir('.') if f.endswith('.html') and f != 'dashboard.html']

for f in html_files:
    with open(f, 'r', encoding='utf-8') as file:
        content = file.read()
    
    # Remove 'Sign Up' and 'Dashboard' from .drawer-menu
    content = re.sub(r'<li><a href="register.html"[^>]*>Sign Up</a></li>\n?', '', content)
    content = re.sub(r'<li><a href="dashboard.html"[^>]*>Dashboard</a></li>\n?', '', content)
    
    # Add 'Sign Up' button to .drawer-actions
    if 'Sign Up' not in content[content.find('<div class="drawer-actions">'):content.find('<div class="drawer-actions">') + 500]:
        content = re.sub(
            r'(<div class="drawer-actions">)',
            r'\1\n      <a href="register.html" class="drawer-action-btn" style="background:var(--accent-primary); color:#fff; border:none;">Sign Up</a>',
            content
        )

    with open(f, 'w', encoding='utf-8') as file:
        file.write(content)
