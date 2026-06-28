/* AgentForge — shared site behaviour */
(function () {
  'use strict';

  /* ---- theme + accent (persisted) ---- */
  var root = document.documentElement;
  try {
    var t = localStorage.getItem('af-theme');
    var a = localStorage.getItem('af-accent');
    if (t) root.setAttribute('data-theme', t);
    if (a) root.setAttribute('data-accent', a);
  } catch (e) {}

  function setTheme(mode) {
    root.setAttribute('data-theme', mode);
    try { localStorage.setItem('af-theme', mode); } catch (e) {}
  }

  document.addEventListener('DOMContentLoaded', function () {
    /* theme toggle button */
    var tb = document.querySelector('[data-theme-toggle]');
    if (tb) {
      tb.addEventListener('click', function () {
        var cur = root.getAttribute('data-theme') === 'dark' ? 'dark' : 'light';
        setTheme(cur === 'dark' ? 'light' : 'dark');
      });
    }

    /* accent cycle (optional control) */
    var accents = ['', 'green', 'oxblood'];
    document.querySelectorAll('[data-accent-set]').forEach(function (el) {
      el.addEventListener('click', function () {
        var val = el.getAttribute('data-accent-set');
        if (val) root.setAttribute('data-accent', val); else root.removeAttribute('data-accent');
        try { localStorage.setItem('af-accent', val); } catch (e) {}
        document.querySelectorAll('[data-accent-set]').forEach(function (b) {
          b.setAttribute('aria-pressed', b === el ? 'true' : 'false');
        });
      });
    });

    /* mobile nav */
    var navToggle = document.querySelector('.nav-toggle');
    var navLinks = document.querySelector('.nav-links');
    if (navToggle && navLinks) {
      navToggle.addEventListener('click', function () {
        navLinks.classList.toggle('open');
      });
      navLinks.querySelectorAll('a').forEach(function (a) {
        a.addEventListener('click', function () { navLinks.classList.remove('open'); });
      });
    }

    /* scroll reveal */
    var revealEls = document.querySelectorAll('.reveal');
    if ('IntersectionObserver' in window && revealEls.length) {
      var io = new IntersectionObserver(function (entries) {
        entries.forEach(function (en) {
          if (en.isIntersecting) {
            var d = en.target.getAttribute('data-delay');
            if (d) en.target.style.transitionDelay = d + 'ms';
            en.target.classList.add('in');
            io.unobserve(en.target);
          }
        });
      }, { threshold: 0.12, rootMargin: '0px 0px -8% 0px' });
      revealEls.forEach(function (el) { io.observe(el); });
    } else {
      revealEls.forEach(function (el) { el.classList.add('in'); });
    }

    /* day tabs (program page) */
    var tabs = document.querySelectorAll('[data-day-tab]');
    if (tabs.length) {
      tabs.forEach(function (tab) {
        tab.addEventListener('click', function () {
          var day = tab.getAttribute('data-day-tab');
          tabs.forEach(function (t) { t.classList.toggle('active', t === tab); });
          document.querySelectorAll('[data-day-panel]').forEach(function (p) {
            p.classList.toggle('show', p.getAttribute('data-day-panel') === day);
          });
        });
      });
    }

    /* faq accordion */
    document.querySelectorAll('.faq-item').forEach(function (item) {
      var q = item.querySelector('.faq-q');
      if (q) q.addEventListener('click', function () { item.classList.toggle('open'); });
    });
  });
})();
