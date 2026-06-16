const fs = require('fs');
const path = require('path');

const files = fs.readdirSync('.').filter(f => f.endsWith('.html') && f !== 'dashboard.html');

for (const file of files) {
    let content = fs.readFileSync(file, 'utf8');

    // Remove 'Sign Up' and 'Dashboard' from .drawer-menu
    content = content.replace(/<li><a href="register\.html"[^>]*>Sign Up<\/a><\/li>\s*/g, '');
    content = content.replace(/<li><a href="dashboard\.html"[^>]*>Dashboard<\/a><\/li>\s*/g, '');

    // Add 'Sign Up' button to .drawer-actions if it doesn't already exist
    const actionsRegex = /(<div class="drawer-actions">)/;
    const actionsMatch = content.match(actionsRegex);
    if (actionsMatch) {
        const startIdx = actionsMatch.index;
        const slice = content.slice(startIdx, startIdx + 500);
        if (!slice.includes('register.html')) {
            content = content.replace(
                actionsRegex,
                `$1\n      <a href="register.html" class="drawer-action-btn" style="background:var(--accent-primary); color:#fff; border:none;">Sign Up</a>`
            );
        }
    }

    fs.writeFileSync(file, content, 'utf8');
}
console.log('Done modifying HTML files.');
