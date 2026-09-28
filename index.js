// dev.uyammadu.com — minimal client-side behavior.
// 1. Mobile nav toggle on the new design (.uy-nav)
// 2. Year stamp in the footer (.uy-year)
// 3. Contact form feedback and About/CV controls
// 4. Legacy hamburger toggle (kept guarded for any archived pages)

(function () {
  // ---- New nav --------------------------------------------------------------
  var toggle = document.querySelector('.uy-nav__toggle');
  var mobile = document.querySelector('.uy-nav__mobile');

  if (toggle && mobile) {
    // Single source of truth: keep the panel class and aria-expanded in sync.
    function setMenu(open) {
      mobile.classList.toggle('uy-nav__mobile--open', open);
      toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
      toggle.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
    }

    function isMenuOpen() {
      return mobile.classList.contains('uy-nav__mobile--open');
    }

    toggle.addEventListener('click', function () {
      setMenu(!isMenuOpen());
    });

    // Close on link click (small screens)
    mobile.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        setMenu(false);
      });
    });

    // Escape closes the menu and returns focus to the toggle button.
    document.addEventListener('keydown', function (evt) {
      if (evt.key === 'Escape' && isMenuOpen()) {
        setMenu(false);
        toggle.focus();
      }
    });

    // If the viewport widens to where the desktop nav is shown, drop the open
    // state so the menu can't stay "open" while its toggle is hidden.
    var desktopNav = window.matchMedia('(min-width: 1101px)');
    function syncNavToViewport(mq) {
      if (mq.matches) {
        setMenu(false);
      }
    }
    if (desktopNav.addEventListener) {
      desktopNav.addEventListener('change', syncNavToViewport);
    } else if (desktopNav.addListener) {
      desktopNav.addListener(syncNavToViewport);
    }
  }

  // ---- Year stamp -----------------------------------------------------------
  document.querySelectorAll('.uy-year').forEach(function (el) {
    el.textContent = String(new Date().getFullYear());
  });

  // ---- Optional About page headshot -----------------------------------------
  document.querySelectorAll('[data-uy-headshot]').forEach(function (img) {
    function markMissing() {
      var media = img.closest('.uy-profile-media');
      if (media) {
        media.classList.add('uy-profile-media--missing');
      }
      img.hidden = true;
    }

    function markLoaded() {
      var media = img.closest('.uy-profile-media');
      if (media) {
        media.classList.remove('uy-profile-media--missing');
      }
      img.hidden = false;
    }

    img.addEventListener('error', markMissing);
    img.addEventListener('load', markLoaded);

    if (img.complete && img.naturalWidth === 0) {
      markMissing();
    }
  });

  // ---- About page expanded headshot ----------------------------------------
  var headshotTrigger = document.querySelector('[data-uy-headshot-open]');
  var headshotDialog = document.getElementById('uy-headshot-dialog');

  if (headshotTrigger && headshotDialog) {
    headshotTrigger.addEventListener('click', function () {
      if (typeof headshotDialog.showModal === 'function') {
        headshotDialog.showModal();
      } else {
        headshotDialog.setAttribute('open', '');
      }
    });
  }

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

  // ---- Print buttons (CV) ---------------------------------------------------
  // Replaces an inline onclick="window.print()" so a strict CSP (script-src
  // 'self', no 'unsafe-inline') does not block it.
  document.querySelectorAll('[data-uy-print]').forEach(function (btn) {
    btn.addEventListener('click', function () {
      window.print();
    });
  });

  // ---- Legacy guard ---------------------------------------------------------
  var legacyToggle = document.querySelector('.header__main-ham-menu-cont');
  var legacyMenu   = document.querySelector('.header__sm-menu');
  if (legacyToggle && legacyMenu) {
    legacyToggle.addEventListener('click', function () {
      legacyMenu.classList.toggle('header__sm-menu--active');
    });
  }
})();
