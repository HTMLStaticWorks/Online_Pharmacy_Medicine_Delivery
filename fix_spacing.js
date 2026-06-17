const fs = require('fs');
const path = require('path');

const dir = 'c:\\Users\\Divya Prabha\\Desktop\\Online_Pharmacy_Medicine_Delivery';
const files = fs.readdirSync(dir).filter(f => f.endsWith('.html'));

files.forEach(file => {
  let content = fs.readFileSync(path.join(dir, file), 'utf8');
  
  // We want to replace:
  // style="display: flex; justify-content: center; gap: 12px; margin-top: auto; margin-bottom: 30px;"
  // with:
  // style="display: flex; justify-content: center; gap: 12px; margin-top: 40px; margin-bottom: auto;"
  
  content = content.replace(
    /margin-top:\s*auto;\s*margin-bottom:\s*30px;/g,
    'margin-top: 40px; margin-bottom: auto;'
  );

  fs.writeFileSync(path.join(dir, file), content);
});
console.log('Fixed HTML files spacing');
