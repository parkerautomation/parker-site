/*!
 * Project: Parker Automation site JS
 * Purpose: integrate Jotform lightbox events and drive UI feedback
 * License: MIT
 */

// scripts.js - updated for Jotform lightbox

(function () {
  document.addEventListener('DOMContentLoaded', function () {
    const formToast = document.getElementById('formToast');
    const whatNextPanel = document.getElementById('whatNextPanel');

    // Helper: show Bootstrap toast if present
    function showToast(el) {
      try {
        if (!el) return;
        const t = new bootstrap.Toast(el);
        t.show();
      } catch (_) {
        // Bootstrap not available or element missing
      }
    }

    // Helper: reveal the next-steps panel with a simple fade-in class
    function revealNextPanel() {
      if (!whatNextPanel) return;
      whatNextPanel.classList.remove('d-none');
      // allow CSS transition to kick in
      requestAnimationFrame(() => whatNextPanel.classList.add('showing'));
    }

    // Detect Jotform postMessage events from the embedded lightbox iframe
    function isFromJotform(origin) {
      return /\.jotform\.com$/.test(new URL(origin).hostname) || /\.jotfor\.ms$/.test(new URL(origin).hostname);
    }

    function looksLikeSubmissionComplete(data) {
      // Jotform messages can be strings or objects depending on embed script
      if (!data) return false;
      if (typeof data === 'string') {
        return /submission|submit/i.test(data) && /complete|success/i.test(data);
      }
      if (typeof data === 'object') {
        const v = (data.event || data.type || data.message || '').toString();
        return /submission|submit/i.test(v) && /complete|success/i.test(v);
      }
      return false;
    }

    window.addEventListener('message', function (e) {
      try {
        if (!isFromJotform(e.origin)) return;
        if (looksLikeSubmissionComplete(e.data)) {
          showToast(formToast);
          revealNextPanel();
        }
      } catch (_) {
        // ignore parsing errors
      }
    }, false);

    // Optional: also reveal next-steps panel when user clicks any lightbox trigger,
    // in case submission callback does not fire in some browsers.
    const triggers = document.querySelectorAll('.lightbox-252668097426064');
    triggers.forEach(btn => {
      btn.addEventListener('click', function () {
        // pre-warm the panel for visibility after user interaction
        // do not show toast here; only after real submission
        // delay makes it feel responsive without being jumpy
        setTimeout(() => {
          if (whatNextPanel && whatNextPanel.classList.contains('d-none')) {
            revealNextPanel();
          }
        }, 1200);
      });
    });
  });
})();
