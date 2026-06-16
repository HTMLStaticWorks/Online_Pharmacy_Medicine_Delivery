const fs = require('fs');

function replaceGrid(file, searchStr, replacementStr) {
  let content = fs.readFileSync(file, 'utf8');
  content = content.replace(searchStr, replacementStr);
  fs.writeFileSync(file, content, 'utf8');
}

// 4. pricing page mob view Our Patient-First Guarantee section one card per row
replaceGrid('pricing.html', /<div style="display:grid; grid-template-columns:repeat\(3,1fr\); gap:24px;">/, '<div class="info-grid-3">');

// 5. subscription page How Your Auto-Refill Works section
replaceGrid('subscriptions.html', /<div style="display:grid; grid-template-columns:repeat\(3,1fr\); gap:28px;">/, '<div class="info-grid-3" style="gap:28px;">');

// 6. shop page Why Patients Choose ApexPharma section
replaceGrid('shop.html', /<div style="display:grid; grid-template-columns:repeat\(4,1fr\); gap:24px; text-align:center;">/, '<div class="info-grid-4" style="text-align:center;">');

// 6. shop page ✅ Clinical Promise section
replaceGrid('shop.html', /<div style="display:grid; grid-template-columns:1\.2fr 1fr; gap:40px; align-items:center;">/, '<div class="story-grid">');

// 7. about page Our Core Values section
replaceGrid('about.html', /<div style="display:grid; grid-template-columns:repeat\(4,1fr\); gap:24px;">/, '<div class="info-grid-4">');

// 10. home1 Never Miss a Dose with Auto-Refills section
replaceGrid('index.html', /<div style="margin-top:40px; display:grid; grid-template-columns:1fr 1fr; gap:30px; text-align:left;">/, '<div class="info-grid-2" style="margin-top:40px; text-align:left;">');

console.log('Done grid updates.');
