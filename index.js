// dev.uyammadu.com — minimal client-side behavior.
// 1. Mobile nav toggle on the new design (.uy-nav)
// 2. Year stamp in the footer (.uy-year)
// 3. Lightweight canvas network background
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
    var desktopNav = window.matchMedia('(min-width: 56.3125em)');
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

  // ---- Technical network background ----------------------------------------
  var networkCanvas = document.getElementById('uy-network-bg');
  if (networkCanvas && networkCanvas.getContext) {
    var ctx = networkCanvas.getContext('2d');
    var reduceMotionQuery = window.matchMedia
      ? window.matchMedia('(prefers-reduced-motion: reduce)')
      : null;
    var points = [];
    var animationFrame = null;
    var width = 0;
    var height = 0;
    var dpr = 1;

    function getNetworkConfig() {
      var mobile = window.innerWidth < 680;

      return {
        count: mobile ? 20 : 44,
        maxDistance: mobile ? 112 : 164,
        speed: mobile ? 0.045 : 0.07,
        dotRadius: mobile ? 1.25 : 1.45,
        dotAlpha: mobile ? 0.32 : 0.42,
        lineAlpha: mobile ? 0.08 : 0.12,
      };
    }

    function makePoint(config) {
      var angle = Math.random() * Math.PI * 2;
      var speed = config.speed * (0.45 + Math.random() * 0.8);

      return {
        x: Math.random() * width,
        y: Math.random() * height,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        pulse: Math.random() * Math.PI * 2,
      };
    }

    function resizeNetwork() {
      var nextWidth = window.innerWidth;
      var nextHeight = window.innerHeight;

      if (nextWidth === width && nextHeight === height) {
        return;
      }

      width = nextWidth;
      height = nextHeight;
      dpr = Math.min(window.devicePixelRatio || 1, 2);

      networkCanvas.width = Math.max(1, Math.floor(width * dpr));
      networkCanvas.height = Math.max(1, Math.floor(height * dpr));
      networkCanvas.style.width = width + 'px';
      networkCanvas.style.height = height + 'px';
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      var config = getNetworkConfig();
      points = Array.from({ length: config.count }, function () {
        return makePoint(config);
      });
    }

    function drawNetwork(config) {
      ctx.clearRect(0, 0, width, height);

      for (var i = 0; i < points.length; i += 1) {
        var point = points[i];

        for (var j = i + 1; j < points.length; j += 1) {
          var other = points[j];
          var dx = point.x - other.x;
          var dy = point.y - other.y;
          var distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < config.maxDistance) {
            var alpha = (1 - distance / config.maxDistance) * config.lineAlpha;
            ctx.beginPath();
            ctx.moveTo(point.x, point.y);
            ctx.lineTo(other.x, other.y);
            ctx.strokeStyle = 'rgba(0, 180, 216, ' + alpha.toFixed(3) + ')';
            ctx.lineWidth = 1;
            ctx.stroke();
          }
        }
      }

      for (var k = 0; k < points.length; k += 1) {
        var dot = points[k];
        var pulse = 0.55 + Math.sin(dot.pulse) * 0.2;

        ctx.beginPath();
        ctx.arc(dot.x, dot.y, config.dotRadius, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(118, 220, 255, ' + (config.dotAlpha * pulse).toFixed(3) + ')';
        ctx.fill();
      }
    }

    function moveNetwork() {
      for (var i = 0; i < points.length; i += 1) {
        var point = points[i];
        point.x += point.vx;
        point.y += point.vy;
        point.pulse += 0.012;

        if (point.x < -20) point.x = width + 20;
        if (point.x > width + 20) point.x = -20;
        if (point.y < -20) point.y = height + 20;
        if (point.y > height + 20) point.y = -20;
      }
    }

    function renderNetwork() {
      var config = getNetworkConfig();
      resizeNetwork();
      drawNetwork(config);

      if (reduceMotionQuery && reduceMotionQuery.matches) {
        animationFrame = null;
        return;
      }

      moveNetwork();
      animationFrame = window.requestAnimationFrame(renderNetwork);
    }

    function startNetwork() {
      if (!animationFrame && !document.hidden) {
        renderNetwork();
      }
    }

    function stopNetwork() {
      if (animationFrame) {
        window.cancelAnimationFrame(animationFrame);
        animationFrame = null;
      }
    }

    window.addEventListener('resize', function () {
      width = 0;
      resizeNetwork();
      drawNetwork(getNetworkConfig());
    });

    document.addEventListener('visibilitychange', function () {
      if (document.hidden) {
        stopNetwork();
      } else {
        startNetwork();
      }
    });

    if (reduceMotionQuery) {
      var handleMotionChange = function () {
        stopNetwork();
        networkCanvas.hidden = reduceMotionQuery.matches;
        if (!reduceMotionQuery.matches) {
          startNetwork();
        }
      };

      if (reduceMotionQuery.addEventListener) {
        reduceMotionQuery.addEventListener('change', handleMotionChange);
      } else if (reduceMotionQuery.addListener) {
        reduceMotionQuery.addListener(handleMotionChange);
      }
    }

    if (reduceMotionQuery && reduceMotionQuery.matches) {
      networkCanvas.hidden = true;
    } else {
      resizeNetwork();
      drawNetwork(getNetworkConfig());
      startNetwork();
    }
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

  // ---- Legacy guard ---------------------------------------------------------
  var legacyToggle = document.querySelector('.header__main-ham-menu-cont');
  var legacyMenu   = document.querySelector('.header__sm-menu');
  if (legacyToggle && legacyMenu) {
    legacyToggle.addEventListener('click', function () {
      legacyMenu.classList.toggle('header__sm-menu--active');
    });
  }
})();
