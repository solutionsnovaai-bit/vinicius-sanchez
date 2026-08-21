/* ═══════════════════════════════════════════
   RAFAEL FERRAZ · EMBRACON ANÁLIA FRANCO
   Nova AI Solutions
   ═══════════════════════════════════════════ */
(function () {
  'use strict';

  var $  = function (s, c) { return (c || document).querySelector(s); };
  var $$ = function (s, c) { return Array.prototype.slice.call((c || document).querySelectorAll(s)); };
  var reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ── WHATSAPP: troque o número em um lugar só ── */
  var WPP = '5511994948484';
  $$('a[href*="wa.me/"]').forEach(function (a) {
    a.href = a.href.replace(/wa\.me\/\d+/, 'wa.me/' + WPP);
  });

  /* ─────────── LOADER ─────────── */
  var loader = $('#loader');
  function hideLoader() {
    if (!loader || loader.classList.contains('gone')) return;
    loader.classList.add('gone');
    setTimeout(function () { loader.remove(); }, 700);
  }
  window.addEventListener('load', function () { setTimeout(hideLoader, reduced ? 100 : 1500); });
  setTimeout(hideLoader, 4000); // à prova de imagem travada

  /* ─────────── ANO ─────────── */
  var y = $('#year'); if (y) y.textContent = new Date().getFullYear();

  /* ─────────── NAV / SCROLL ─────────── */
  var nav = $('#nav'), bar = $('#scrollbar i'), float = $('.float-wpp');
  var ticking = false;
  function onScroll() {
    var sy = window.scrollY || 0;
    var h = document.documentElement.scrollHeight - window.innerHeight;
    if (nav) nav.classList.toggle('stuck', sy > 40);
    if (bar) bar.style.width = (h > 0 ? (sy / h) * 100 : 0) + '%';
    if (float) float.classList.toggle('show', sy > window.innerHeight * 0.7);
    ticking = false;
  }
  window.addEventListener('scroll', function () {
    if (!ticking) { ticking = true; requestAnimationFrame(onScroll); }
  }, { passive: true });
  onScroll();

  /* ─────────── DRAWER MOBILE ─────────── */
  var burger = $('#burger'), drawer = $('#drawer');
  function toggleDrawer(force) {
    var open = typeof force === 'boolean' ? force : !drawer.classList.contains('open');
    drawer.classList.toggle('open', open);
    burger.classList.toggle('on', open);
    burger.setAttribute('aria-expanded', String(open));
    document.body.classList.toggle('is-locked', open);
  }
  if (burger && drawer) {
    burger.addEventListener('click', function () { toggleDrawer(); });
    $$('a', drawer).forEach(function (a) {
      a.addEventListener('click', function () { toggleDrawer(false); });
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && drawer.classList.contains('open')) toggleDrawer(false);
    });
  }

  /* ─────────── REVEAL ─────────── */
  var io = new IntersectionObserver(function (entries) {
    entries.forEach(function (en) {
      if (!en.isIntersecting) return;
      en.target.classList.add('in');
      io.unobserve(en.target);
      if (en.target.hasAttribute('data-count')) countUp(en.target);
    });
  }, { threshold: 0.18, rootMargin: '0px 0px -60px' });

  $$('.reveal').forEach(function (el, i) {
    el.style.transitionDelay = (Math.min(i % 4, 3) * 70) + 'ms';
    io.observe(el);
  });
  $$('[data-count]').forEach(function (el) { io.observe(el); });
  var barsBlock = $('.bars'); if (barsBlock) io.observe(barsBlock);

  /* ─────────── CONTADORES ─────────── */
  function countUp(el) {
    var target = parseFloat(el.getAttribute('data-count')) || 0;
    if (reduced) { el.textContent = target; return; }
    var t0 = null, dur = 1400;
    function step(t) {
      if (!t0) t0 = t;
      var p = Math.min((t - t0) / dur, 1);
      var e = 1 - Math.pow(1 - p, 3);
      el.textContent = Math.round(target * e);
      if (p < 1) requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
  }

  /* ─────────── SPOTLIGHT ─────────── */
  var fine = window.matchMedia('(pointer: fine)').matches;
  if (fine && !reduced) {
    document.body.classList.add('pointer-fine');
    var spot = $('#spotlight'), sx = 0, sy2 = 0, tx = 0, ty = 0;
    document.addEventListener('mousemove', function (e) { tx = e.clientX; ty = e.clientY; });
    (function loop() {
      sx += (tx - sx) * 0.12; sy2 += (ty - sy2) * 0.12;
      if (spot) spot.style.transform = 'translate3d(' + (sx - 320) + 'px,' + (sy2 - 320) + 'px,0)';
      requestAnimationFrame(loop);
    })();
  }

  /* ─────────── BOTÃO MAGNÉTICO ─────────── */
  if (fine && !reduced) {
    $$('[data-magnetic]').forEach(function (el) {
      el.addEventListener('mousemove', function (e) {
        var r = el.getBoundingClientRect();
        var mx = e.clientX - r.left - r.width / 2;
        var my = e.clientY - r.top - r.height / 2;
        el.style.transform = 'translate(' + mx * 0.22 + 'px,' + my * 0.3 + 'px)';
      });
      el.addEventListener('mouseleave', function () { el.style.transform = ''; });
    });
  }

  /* ─────────── RIPPLE ─────────── */
  $$('[data-ripple]').forEach(function (el) {
    el.addEventListener('click', function (e) {
      var r = el.getBoundingClientRect();
      var d = Math.max(r.width, r.height) * 2;
      var s = document.createElement('span');
      s.className = 'rip';
      s.style.width = s.style.height = d + 'px';
      s.style.left = (e.clientX - r.left) + 'px';
      s.style.top = (e.clientY - r.top) + 'px';
      el.appendChild(s);
      setTimeout(function () { s.remove(); }, 700);
    });
  });

  /* ─────────── TILT NA FOTO DO HERO ─────────── */
  if (fine && !reduced) {
    $$('[data-tilt]').forEach(function (el) {
      var frame = $('.hero-photo-frame', el) || el;
      el.addEventListener('mousemove', function (e) {
        var r = el.getBoundingClientRect();
        var px = (e.clientX - r.left) / r.width - 0.5;
        var py = (e.clientY - r.top) / r.height - 0.5;
        frame.style.transform = 'perspective(1100px) rotateY(' + px * 7 + 'deg) rotateX(' + (-py * 7) + 'deg) translateZ(0)';
      });
      el.addEventListener('mouseleave', function () { frame.style.transform = ''; });
    });
  }

  /* ─────────── MODALIDADES ─────────── */
  var lab = $('#handlab');
  var mods = $$('.mod');
  function openMod(idx) {
    mods.forEach(function (m, i) {
      var on = i === idx;
      m.classList.toggle('is-open', on);
      $('.mod-btn', m).setAttribute('aria-expanded', String(on));
    });
    if (lab) {
      lab.className = 'hand-lab m' + idx;
    }
  }
  mods.forEach(function (m, i) {
    $('.mod-btn', m).addEventListener('click', function () {
      openMod(m.classList.contains('is-open') ? -1 : i);
    });
    m.addEventListener('mouseenter', function () { if (fine) openMod(i); });
  });
  openMod(0);

})();
