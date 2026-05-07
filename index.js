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

  // ---- Service-request form: client-side only. No backend wired yet. --------
  var form = document.querySelector('[data-uy-form]');
  if (form) {
    var status = form.querySelector('[data-uy-form-status]');
    form.addEventListener('submit', function (evt) {
      evt.preventDefault();
      if (status) {
        status.textContent =
          'The form backend is pending, so this message was not submitted. ' +
          'Please email chuk.uyammadu@gmail.com or call/text 254-258-7270 directly.';
        status.setAttribute('role', 'status');
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
