/*!
* Start Bootstrap - Business Frontpage v5.0.9 (https://startbootstrap.com/template/business-frontpage)
* Copyright 2013-2023 Start Bootstrap
* Licensed under MIT (https://github.com/StartBootstrap/startbootstrap-business-frontpage/blob/master/LICENSE)
*/
// This file is intentionally blank
// Use this file to add JavaScript to your project


// scripts.js — enhanced with success panel animation

document.addEventListener('DOMContentLoaded', function () {
  const form = document.getElementById('consultForm');
  const successToast = document.getElementById('successToast');
  const whatNextPanel = document.getElementById('whatNextPanel');

  if (form) {
    form.addEventListener('submit', async function (e) {
      e.preventDefault();

      const data = Object.fromEntries(new FormData(form).entries());

      try {
        const res = await fetch(form.action, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(data)
        });

        if (res.ok) {
          // Show toast if available
          if (successToast) {
            const toast = new bootstrap.Toast(successToast);
            toast.show();
          }
          // Show the "What happens next" panel with animation
          if (whatNextPanel) {
            whatNextPanel.classList.remove('d-none');
            setTimeout(() => whatNextPanel.classList.add('showing'), 50);
          }
          form.reset();
        } else {
          alert('Something went wrong. Please try again.');
        }
      } catch (err) {
        console.error(err);
        alert('Error connecting to server.');
      }
    });
  }
});