/* Portland, Connecticut — community site behaviour.
   Single responsibility: the mobile navigation disclosure toggle.
   With JavaScript disabled the full navigation remains visible via CSS
   (see styles.css §3 — the collapsed panel only applies under `.js`). */
(function () {
  'use strict';

  var toggle = document.querySelector('.nav-toggle');
  var nav = document.getElementById('site-nav');
  if (!toggle || !nav) return;

  function setOpen(open) {
    nav.classList.toggle('is-open', open);
    toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
  }

  toggle.addEventListener('click', function () {
    setOpen(!nav.classList.contains('is-open'));
  });

  /* Close on Escape and return focus to the toggle. */
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && nav.classList.contains('is-open')) {
      setOpen(false);
      toggle.focus();
    }
  });

  /* Close when focus leaves the panel entirely. */
  document.addEventListener('focusin', function (e) {
    if (!nav.classList.contains('is-open')) return;
    if (!nav.contains(e.target) && e.target !== toggle) setOpen(false);
  });

  /* Reset state if the viewport grows past the mobile breakpoint. */
  var mq = window.matchMedia('(min-width: 768px)');
  function sync(e) { if (e.matches) setOpen(false); }
  if (mq.addEventListener) mq.addEventListener('change', sync);
  else if (mq.addListener) mq.addListener(sync);
})();
