const fs = require('fs');
const path = require('path');

const dir = 'c:\\Users\\Divya Prabha\\Desktop\\Online_Pharmacy_Medicine_Delivery';
const files = fs.readdirSync(dir).filter(f => f.endsWith('.html'));

const drawerContent = `  <div class="nav-drawer">
    <button class="drawer-close" aria-label="Close Navigation">
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round">
        <line x1="18" y1="6" x2="6" y2="18" />
        <line x1="6" y1="6" x2="18" y2="18" />
      </svg>
    </button>
    <ul class="drawer-menu" style="text-align: center">
      <li><a href="index.html">Home 1</a></li>
      <li><a href="home-2.html">Home 2</a></li>
      <li><a href="about.html">About</a></li>
      <li><a href="shop.html">Shop</a></li>
      <li><a href="subscriptions.html">Subscriptions</a></li>
      <li><a href="pricing.html">Pricing</a></li>
      <li><a href="blog.html">Blog</a></li>
      <li><a href="contact.html">Contact</a></li>
    </ul>

    <div class="drawer-actions-bottom" style="display: flex; justify-content: center; gap: 12px; margin-top: auto; margin-bottom: 30px;">
      <a href="dashboard.html" class="btn-icon" aria-label="Dashboard" style="background-color: var(--bg-secondary); color: var(--text-primary);">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <rect width="7" height="9" x="3" y="3" rx="1" />
          <rect width="7" height="5" x="14" y="3" rx="1" />
          <rect width="7" height="9" x="14" y="12" rx="1" />
          <rect width="7" height="5" x="3" y="16" rx="1" />
        </svg>
      </a>
      <a href="checkout.html" class="btn-icon cart-badge-container" aria-label="Cart" style="background-color: var(--bg-secondary); color: var(--text-primary);">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <circle cx="8" cy="21" r="1" />
          <circle cx="19" cy="21" r="1" />
          <path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12" />
        </svg>
        <span class="cart-badge">3</span>
      </a>
      <button class="btn-icon theme-toggle" type="button" aria-label="Toggle Theme" style="background-color: var(--bg-secondary); color: var(--text-primary);">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M12 8a2.83 2.83 0 0 0 4 4 4 4 0 1 1-4-4" />
          <path d="M12 2v2" />
          <path d="M12 20v2" />
          <path d="m4.9 4.9 1.4 1.4" />
          <path d="m17.7 17.7 1.4 1.4" />
          <path d="M2 12h2" />
          <path d="M20 12h2" />
          <path d="m6.3 17.7-1.4 1.4" />
          <path d="m19.1 4.9-1.4 1.4" />
        </svg>
      </button>
      <button class="btn-icon rtl-toggle" type="button" style="background-color: var(--bg-secondary); font-size: 0.9rem; font-weight: 500; color: var(--text-primary);">RTL</button>
    </div>

    <a href="register.html" class="btn btn-primary" style="width: 100%; justify-content: center;">Sign Up</a>
  </div>`;

files.forEach(file => {
  let content = fs.readFileSync(path.join(dir, file), 'utf8');
  const drawerRegex = /<div class="nav-drawer">[\s\S]*?<\/div>\s*<div class="drawer-overlay"><\/div>/g;
  content = content.replace(drawerRegex, drawerContent + '\n  <div class="drawer-overlay"></div>');
  fs.writeFileSync(path.join(dir, file), content);
});
console.log('Fixed HTML files');
