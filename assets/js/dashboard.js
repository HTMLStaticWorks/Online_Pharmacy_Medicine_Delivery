// Dashboard Interactive Logic Layer

document.addEventListener('DOMContentLoaded', () => {
  if (!document.getElementById('dashboard-wrapper')) return;
  
  initDashboardTabs();
  initPrescriptionUpload();
  initRefillToggles();
  initChatBot();
  initBillingFilters();
  initReportDownloads();
});

// 1. Tab switching without page reload
function initDashboardTabs() {
  const sidebarButtons = document.querySelectorAll('.sidebar-nav button');
  const sections = document.querySelectorAll('.dashboard-section');
  
  sidebarButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const targetSectionId = btn.getAttribute('data-target');
      if (!targetSectionId) return;
      
      // Update sidebar styling
      sidebarButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      
      // Update active section visibility
      sections.forEach(sec => {
        if (sec.id === targetSectionId) {
          sec.classList.add('active');
          sec.style.display = 'block';
        } else {
          sec.classList.remove('active');
          sec.style.display = 'none';
        }
      });
      
      // Trigger special animations or actions based on section
      if (targetSectionId === 'tracking') {
        animateTrackingWorkflow();
      }
    });
  });
}

// 2. Drag & Drop prescription handler
function initPrescriptionUpload() {
  const dropZone = document.getElementById('dash-drop-zone');
  const fileInput = document.getElementById('dash-file-input');
  const uploadsList = document.getElementById('uploaded-rx-list');
  
  if (!dropZone || !fileInput || !uploadsList) return;
  
  dropZone.addEventListener('click', () => fileInput.click());
  
  dropZone.addEventListener('dragover', (e) => {
    e.preventDefault();
    dropZone.style.borderColor = 'var(--accent-primary)';
    dropZone.style.backgroundColor = 'rgba(46, 125, 138, 0.05)';
  });
  
  dropZone.addEventListener('dragleave', () => {
    dropZone.style.borderColor = 'var(--border-color)';
    dropZone.style.backgroundColor = 'transparent';
  });
  
  dropZone.addEventListener('drop', (e) => {
    e.preventDefault();
    dropZone.style.borderColor = 'var(--border-color)';
    dropZone.style.backgroundColor = 'transparent';
    if (e.dataTransfer.files.length) {
      handleUploadedFile(e.dataTransfer.files[0]);
    }
  });
  
  fileInput.addEventListener('change', () => {
    if (fileInput.files.length) {
      handleUploadedFile(fileInput.files[0]);
    }
  });
  
  function handleUploadedFile(file) {
    // Simulated upload progress bar UI creation
    const item = document.createElement('div');
    item.className = 'rx-item-uploading';
    item.style.cssText = `
      background: var(--bg-primary);
      padding: 16px;
      border-radius: var(--radius);
      border: 1px solid var(--border-color);
      margin-top: 15px;
      display: flex;
      flex-direction: column;
      gap: 10px;
    `;
    
    item.innerHTML = `
      <div style="display:flex; justify-content:space-between; font-size:0.9rem;">
        <strong>${file.name}</strong>
        <span class="upload-percent">0%</span>
      </div>
      <div style="width:100%; height:6px; background:#e0e0e0; border-radius:3px; overflow:hidden;">
        <div class="progress-bar-fill" style="width: 0%; height: 100%; background: var(--accent-primary); transition: width 0.1s;"></div>
      </div>
    `;
    
    uploadsList.prepend(item);
    
    let percent = 0;
    const interval = setInterval(() => {
      percent += 10;
      item.querySelector('.upload-percent').innerText = `${percent}%`;
      item.querySelector('.progress-bar-fill').style.width = `${percent}%`;
      
      if (percent >= 100) {
        clearInterval(interval);
        
        // Transform uploading box into completed verification status
        const fileId = 'RX-' + Math.floor(1000 + Math.random() * 9000);
        item.style.backgroundColor = 'var(--bg-card)';
        item.innerHTML = `
          <div style="display:flex; justify-content:space-between; align-items:center;">
            <div>
              <h5 style="font-weight:540; font-size:0.95rem; color:var(--text-primary);">${file.name}</h5>
              <p style="font-size:0.8rem; color:var(--text-secondary); margin:0;">ID: ${fileId} • Uploaded just now</p>
            </div>
            <span class="status-badge badge-pending" style="
              background-color: rgba(240, 179, 76, 0.15);
              color: var(--color-warning);
              padding: 4px 10px;
              border-radius: 12px;
              font-size: 0.8rem;
              font-weight: 520;
            ">Pharmacist Reviewing</span>
          </div>
        `;
        
        if (window.showToast) {
          window.showToast("Prescription file uploaded successfully!");
        }
      }
    }, 150);
  }
}

// 3. Subscription Pause / Resume actions
function initRefillToggles() {
  const toggles = document.querySelectorAll('.refill-toggle');
  toggles.forEach(toggle => {
    toggle.addEventListener('change', () => {
      const parentCard = toggle.closest('.refill-card');
      const medName = parentCard ? parentCard.querySelector('.med-name').innerText : "Medication plan";
      const isChecked = toggle.checked;
      
      const statusBadge = parentCard ? parentCard.querySelector('.refill-status') : null;
      if (statusBadge) {
        if (isChecked) {
          statusBadge.innerText = 'Active';
          statusBadge.style.color = 'var(--color-success)';
          statusBadge.style.backgroundColor = 'rgba(87, 185, 122, 0.1)';
        } else {
          statusBadge.innerText = 'Paused';
          statusBadge.style.color = 'var(--color-danger)';
          statusBadge.style.backgroundColor = 'rgba(217, 108, 108, 0.1)';
        }
      }
      
      const text = isChecked ? `Refills resumed for ${medName}` : `Refills paused for ${medName}`;
      if (window.showToast) {
        window.showToast(text);
      }
    });
  });
}

// 4. Live Pharmacist Chat Emulator
function initChatBot() {
  const input = document.getElementById('chat-input-text');
  const btn = document.getElementById('chat-send-btn');
  const container = document.getElementById('chat-messages-container');
  
  if (!input || !btn || !container) return;
  
  function sendMsg() {
    const text = input.value.trim();
    if (!text) return;
    
    // User message bubble
    appendBubble(text, 'user');
    input.value = '';
    
    // Auto scroll
    container.scrollTop = container.scrollHeight;
    
    // Simulated Pharmacist response
    setTimeout(() => {
      const pharmaResponses = [
        "Hello! I am reviewing your order details. Do you have any specific concerns about side effects?",
        "Your uploaded prescription looks valid. We are processing it and will dispatch the medicine soon.",
        "Yes, Lipitor can be taken with or without food. However, we recommend avoiding grapefruit juice.",
        "Your family refill plan is updated. If you need any adjustments to the dosage, please have your physician send us a note."
      ];
      const randomResponse = pharmaResponses[Math.floor(Math.random() * pharmaResponses.length)];
      appendBubble(randomResponse, 'pharmacist');
      container.scrollTop = container.scrollHeight;
    }, 1200);
  }
  
  function appendBubble(content, sender) {
    const bubble = document.createElement('div');
    bubble.className = `chat-bubble bubble-${sender}`;
    bubble.style.cssText = `
      max-width: 75%;
      padding: 12px 16px;
      border-radius: var(--radius);
      margin-bottom: 15px;
      font-size: 0.95rem;
      line-height: 1.5;
      animation: float 0.3s ease;
      align-self: ${sender === 'user' ? 'flex-end' : 'flex-start'};
      background-color: ${sender === 'user' ? 'var(--accent-primary)' : 'var(--bg-secondary)'};
      color: ${sender === 'user' ? '#FFFFFF' : 'var(--text-primary)'};
      border-bottom-${sender === 'user' ? 'right' : 'left'}-radius: 2px;
    `;
    bubble.innerText = content;
    container.appendChild(bubble);
  }
  
  btn.addEventListener('click', sendMsg);
  input.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') sendMsg();
  });
}

// 5. Billing Filter Emulator
function initBillingFilters() {
  const select = document.getElementById('billing-year-select');
  const invoiceRows = document.querySelectorAll('.invoice-row');
  
  if (!select) return;
  
  select.addEventListener('change', () => {
    const year = select.value;
    invoiceRows.forEach(row => {
      const rowYear = row.getAttribute('data-year');
      if (year === 'all' || rowYear === year) {
        row.style.display = 'flex';
      } else {
        row.style.display = 'none';
      }
    });
  });
}

// 6. Reports Downloads trigger
function initReportDownloads() {
  const downloadButtons = document.querySelectorAll('.download-report-btn');
  downloadButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const reportName = btn.getAttribute('data-name') || "report";
      btn.innerText = "Downloading...";
      
      setTimeout(() => {
        btn.innerText = "Downloaded";
        btn.style.backgroundColor = 'var(--accent-support)';
        btn.style.color = '#FFFFFF';
        if (window.showToast) {
          window.showToast(`${reportName} PDF report downloaded successfully!`);
        }
      }, 1500);
    });
  });
}

// 7. Visual Tracking Timeline Animator
function animateTrackingWorkflow() {
  const items = document.querySelectorAll('.tracking-milestone');
  items.forEach((item, idx) => {
    item.style.opacity = '0';
    item.style.transform = 'translateY(15px)';
    
    setTimeout(() => {
      item.style.transition = 'all 0.5s ease';
      item.style.opacity = '1';
      item.style.transform = 'translateY(0)';
    }, idx * 200);
  });
}
