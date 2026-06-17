// Main Global JS Core Code for Online Pharmacy Platform

document.addEventListener('DOMContentLoaded', () => {
  initNavbarScroll();
  initMobileMenu();
  initThemeAndRtl();
  initCartCounter();
  initScrollReveal();
  initScrollTopButton();
  initNavDropdowns();
  initActiveMenu();
});

// 1. Scroll-related Navbar changes
function initNavbarScroll() {
  const wrapper = document.querySelector('.navbar-wrapper');
  if (!wrapper) return;
  
  let ticking = false;
  window.addEventListener('scroll', () => {
    if (!ticking) {
      window.requestAnimationFrame(() => {
        if (window.scrollY > 40) {
          wrapper.classList.add('scrolled');
        } else {
          wrapper.classList.remove('scrolled');
        }
        ticking = false;
      });
      ticking = true;
    }
  });
}

// 2. Mobile Menu / Drawer logic
function initMobileMenu() {
  const hamburger = document.querySelector('.hamburger');
  const drawer = document.querySelector('.nav-drawer');
  const overlay = document.querySelector('.drawer-overlay');
  const closeButton = document.querySelector('.drawer-close');
  
  if (!hamburger || !drawer || !overlay) return;
  
  function openDrawer() {
    drawer.classList.add('open');
    overlay.classList.add('active');
    // document.body.style.overflow = 'hidden';
  }
  
  function closeDrawer() {
    drawer.classList.remove('open');
    overlay.classList.remove('active');
    // document.body.style.overflow = '';
  }
  
  hamburger.addEventListener('click', () => {
    if (drawer.classList.contains('open')) {
      closeDrawer();
    } else {
      openDrawer();
    }
  });
  
  overlay.addEventListener('click', closeDrawer);
  if (closeButton) {
    closeButton.addEventListener('click', closeDrawer);
  }
  
  // Close on Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && drawer.classList.contains('open')) {
      closeDrawer();
    }
  });
}

// 3. Theme & RTL management
function initThemeAndRtl() {
  const htmlElement = document.documentElement;
  
  // Theme toggle selectors
  const themeToggles = document.querySelectorAll('.theme-toggle');
  const savedTheme = localStorage.getItem('theme') || 'light';
  htmlElement.setAttribute('data-theme', savedTheme);
  
  themeToggles.forEach(toggle => {
    toggle.addEventListener('click', () => {
      const currentTheme = htmlElement.getAttribute('data-theme');
      const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
      htmlElement.setAttribute('data-theme', newTheme);
      localStorage.setItem('theme', newTheme);
      updateToggleIcons(newTheme);
    });
  });
  
  // RTL toggle selectors
  const rtlToggles = document.querySelectorAll('.rtl-toggle');
  const savedRtl = localStorage.getItem('rtl') === 'true';
  setRtlState(savedRtl);
  
  rtlToggles.forEach(toggle => {
    toggle.addEventListener('click', () => {
      const isRtl = htmlElement.getAttribute('dir') === 'rtl';
      setRtlState(!isRtl);
    });
  });
  
  function setRtlState(isRtl) {
    if (isRtl) {
      htmlElement.setAttribute('dir', 'rtl');
      localStorage.setItem('rtl', 'true');
      // Update text helper or buttons if necessary
    } else {
      htmlElement.setAttribute('dir', 'ltr');
      localStorage.setItem('rtl', 'false');
    }
    updateRtlButtonLabels(isRtl);
  }
  
  function updateToggleIcons(theme) {
    // If we have custom icons inside theme toggles, we adjust their layout here
  }
  
  function updateRtlButtonLabels(isRtl) {
    rtlToggles.forEach(toggle => {
      toggle.innerText = isRtl ? 'LTR' : 'RTL';
    });
  }
}

// 4. Cart Simulation
function initCartCounter() {
  const cartBadges = document.querySelectorAll('.cart-badge');
  let currentCount = parseInt(localStorage.getItem('cartCount')) || 3;
  
  function updateCartUI() {
    cartBadges.forEach(badge => {
      badge.innerText = currentCount;
      badge.style.display = currentCount > 0 ? 'flex' : 'none';
    });
  }
  
  window.addToCart = function(amount = 1) {
    currentCount += amount;
    localStorage.setItem('cartCount', currentCount);
    updateCartUI();
    
    // Quick notification prompt toast
    showToast("Product successfully added to cart!");
  };
  
  window.clearCart = function() {
    currentCount = 0;
    localStorage.setItem('cartCount', 0);
    updateCartUI();
  };
  
  updateCartUI();
}

// 5. Scroll Reveal Effect
function initScrollReveal() {
  const elements = document.querySelectorAll('.reveal-on-scroll');
  if (elements.length === 0) return;
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.1
  });
  
  elements.forEach(element => {
    observer.observe(element);
  });
}

// 6. Interactive Toast
function showToast(message) {
  const existing = document.querySelector('.pharma-toast');
  if (existing) existing.remove();
  
  const toast = document.createElement('div');
  toast.className = 'pharma-toast';
  toast.innerText = message;
  
  // Style toast inline or append to CSS, let's inject style details dynamically
  Object.assign(toast.style, {
    position: 'fixed',
    bottom: '24px',
    right: '24px',
    backgroundColor: '#2E7D8A',
    color: '#FFFFFF',
    padding: '12px 24px',
    borderRadius: '8px',
    boxShadow: '0 4px 15px rgba(0,0,0,0.15)',
    zIndex: '2000',
    fontSize: '0.95rem',
    fontWeight: '520',
    opacity: '0',
    transform: 'translateY(10px)',
    transition: 'all 0.3s ease'
  });
  
  document.body.appendChild(toast);
  
  // Make visible
  setTimeout(() => {
    toast.style.opacity = '1';
    toast.style.transform = 'translateY(0)';
  }, 100);
  
  // Fade out
  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateY(10px)';
    setTimeout(() => toast.remove(), 300);
  }, 3000);
}

// 7. Scroll to Top Button Action
function initScrollTopButton() {
  const btn = document.createElement('button');
  btn.id = 'scroll-to-top';
  btn.setAttribute('aria-label', 'Scroll to top');
  btn.innerHTML = `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="18 15 12 9 6 15"/></svg>`;
  document.body.appendChild(btn);

  let ticking = false;
  window.addEventListener('scroll', () => {
    if (!ticking) {
      window.requestAnimationFrame(() => {
        if (window.scrollY > 300) {
          btn.classList.add('visible');
        } else {
          btn.classList.remove('visible');
        }
        ticking = false;
      });
      ticking = true;
    }
  });

  btn.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
}

// 8. Nav Dropdown Actions
function initNavDropdowns() {
  const dropdownTrigger = document.querySelector('.nav-item-dropdown');
  if (!dropdownTrigger) return;

  // Toggle active class on click for mobile/touch systems
  const link = dropdownTrigger.querySelector('a');
  link.addEventListener('click', (e) => {
    if (window.innerWidth <= 1024) {
      e.preventDefault();
      dropdownTrigger.classList.toggle('active');
    }
  });

  // Close dropdown when clicking outside
  document.addEventListener('click', (e) => {
    if (!dropdownTrigger.contains(e.target)) {
      dropdownTrigger.classList.remove('active');
    }
  });
}

// 9. Highlight Active Menu State
function initActiveMenu() {
  const currentPath = window.location.pathname.split('/').pop() || 'index.html';
  
  // Clean up all active states first
  document.querySelectorAll('.nav-menu a, .drawer-menu a').forEach(link => {
    link.classList.remove('active');
  });

  // Highlight top nav
  const navLinks = document.querySelectorAll('.nav-menu a');
  navLinks.forEach(link => {
    if (link.getAttribute('href') === currentPath) {
      link.classList.add('active');
      // If it's inside a dropdown, highlight the parent too
      const dropdown = link.closest('.nav-item-dropdown');
      if (dropdown) {
        const parentLink = dropdown.querySelector('.nav-home');
        if (parentLink) parentLink.classList.add('active');
      }
    }
  });

  // Highlight drawer nav
  const drawerLinks = document.querySelectorAll('.drawer-menu a');
  drawerLinks.forEach(link => {
    if (link.getAttribute('href') === currentPath) {
      link.classList.add('active');
    }
  });
}
