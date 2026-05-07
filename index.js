// dev.uyammadu.com — minimal client-side behavior.
// 1. Mobile nav toggle on the new design (.uy-nav)
// 2. Year stamp in the footer (.uy-year)
// 3. Legacy hamburger toggle (kept guarded for any archived pages)

(function () {
  // ---- New nav --------------------------------------------------------------
  var toggle = document.querySelector('.uy-nav__toggle');
  var mobile = document.querySelector('.uy-nav__mobile');

  if (toggle && mobile) {
    toggle.addEventListener('click', function () {
      var open = mobile.classList.toggle('uy-nav__mobile--open');
      toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
    // Close on link click (small screens)
    mobile.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        mobile.classList.remove('uy-nav__mobile--open');
        toggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  // ---- Year stamp -----------------------------------------------------------
  document.querySelectorAll('.uy-year').forEach(function (el) {
    el.textContent = String(new Date().getFullYear());
  });

  // ---- Service-request form -------------------------------------------------
  var form = document.querySelector('[data-uy-form]');
  if (form) {
    var status = form.querySelector('[data-uy-form-status]');
    var submit = form.querySelector('button[type="submit"]');
    var fallback =
      'The form could not send right now. Please email chuk.uyammadu@gmail.com ' +
      'or call/text 254-258-7270.';

    form.addEventListener('submit', async function (evt) {
      evt.preventDefault();

      if (status) {
        status.textContent = 'Sending your request...';
        status.setAttribute('role', 'status');
      }

      if (submit) {
        submit.disabled = true;
        submit.textContent = 'Sending...';
      }

      var data = {};
      new FormData(form).forEach(function (value, key) {
        data[key] = value;
      });

      try {
        var response = await fetch(form.getAttribute('action') || '/api/contact', {
          method: 'POST',
          headers: { 'content-type': 'application/json' },
          body: JSON.stringify(data),
        });
        var result = await response.json().catch(function () {
          return {};
        });

        if (!response.ok || !result.ok) {
          throw new Error(result.error || fallback);
        }

        if (status) {
          status.textContent =
            result.message ||
            'Request sent. For urgent needs, you can also email or call/text directly.';
        }
        form.reset();
      } catch (error) {
        if (status) {
          status.textContent = error && error.message ? error.message : fallback;
        }
      } finally {
        if (submit) {
          submit.disabled = false;
          submit.textContent = 'Send request';
        }
      }
    });
  }

  // ---- Legacy guard ---------------------------------------------------------
  var legacyToggle = document.querySelector('.header__main-ham-menu-cont');
  var legacyMenu   = document.querySelector('.header__sm-menu');
  if (legacyToggle && legacyMenu) {
    legacyToggle.addEventListener('click', function () {
      legacyMenu.classList.toggle('header__sm-menu--active');
    });
  }
})();
