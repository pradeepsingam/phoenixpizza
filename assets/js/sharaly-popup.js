// Sharaly online ordering popup
var SHARALY_URL = 'https://app.sharaly.com/phoenix-pizza-wings';

function closeSharalyPopup() {
  var overlay = document.getElementById('sharaly-overlay');
  if (overlay) {
    overlay.parentNode.removeChild(overlay);
    document.body.style.overflow = '';
  }
}

function openSharalyPopup() {
  if (document.getElementById('sharaly-overlay')) return;

  var isMobile = window.innerWidth < 768;

  var overlay = document.createElement('div');
  overlay.style.position = 'fixed';
  overlay.style.top = '0';
  overlay.style.left = '0';
  overlay.style.width = '100vw';
  overlay.style.height = '100vh';
  overlay.style.backgroundColor = 'rgba(0,0,0,0.6)';
  overlay.style.zIndex = '999999';
  overlay.style.display = 'flex';
  overlay.style.alignItems = 'center';
  overlay.style.justifyContent = 'center';
  overlay.id = 'sharaly-overlay';
  overlay.onclick = function (e) { if (e.target === overlay) closeSharalyPopup(); };

  var iframeContainer = document.createElement('div');
  iframeContainer.style.width = isMobile ? '95vw' : '80vw';
  iframeContainer.style.height = isMobile ? '92vh' : '90vh';
  iframeContainer.style.backgroundColor = '#fff';
  iframeContainer.style.borderRadius = '12px';
  iframeContainer.style.overflow = 'hidden';
  iframeContainer.style.position = 'relative';
  iframeContainer.style.boxShadow = '0 25px 50px -12px rgba(0, 0, 0, 0.25)';

  var closeBtn = document.createElement('button');
  closeBtn.type = 'button';
  closeBtn.setAttribute('aria-label', 'Close');
  closeBtn.innerHTML = '&times;';
  closeBtn.style.position = 'absolute';
  closeBtn.style.top = '10px';
  closeBtn.style.right = '15px';
  closeBtn.style.fontSize = '24px';
  closeBtn.style.background = 'none';
  closeBtn.style.border = 'none';
  closeBtn.style.cursor = 'pointer';
  closeBtn.style.color = '#333';
  closeBtn.style.zIndex = '10';
  closeBtn.onclick = closeSharalyPopup;

  var iframe = document.createElement('iframe');
  iframe.src = SHARALY_URL;
  iframe.title = 'Order Online';
  iframe.style.width = '100%';
  iframe.style.height = '100%';
  iframe.style.border = 'none';

  iframeContainer.appendChild(closeBtn);
  iframeContainer.appendChild(iframe);
  overlay.appendChild(iframeContainer);

  document.body.appendChild(overlay);
  document.body.style.overflow = 'hidden';
}

// Open any Sharaly order link in the popup (Ctrl/Cmd-click still opens a new tab)
document.addEventListener('click', function (e) {
  if (e.ctrlKey || e.metaKey || e.shiftKey || e.button !== 0) return;
  var link = e.target.closest && e.target.closest('a[href*="app.sharaly.com"]');
  if (!link) return;
  e.preventDefault();
  openSharalyPopup();
});

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape') closeSharalyPopup();
});
