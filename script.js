// ─────────────────────────────────────────
//  THEME TOGGLE
//  FIX: original used btn.onclick where btn = the <i> icon element.
//       Clicking the small icon area was unreliable. Now the full
//       .toggle-mode div is the click target via themeToggleBtn.
// ─────────────────────────────────────────
const themeToggleBtn = document.getElementById('themeToggleBtn');
const btn = document.getElementById('toggle'); // the <i> icon

// Apply saved theme on load
if (localStorage.getItem('theme') === 'dark') {
    document.body.classList.add('dark');
    btn.classList.replace('fa-moon', 'fa-sun');
}

themeToggleBtn.addEventListener('click', () => {
    // Spin animation
    btn.classList.add('spin');
    setTimeout(() => btn.classList.remove('spin'), 300);

    document.body.classList.toggle('dark');

    if (document.body.classList.contains('dark')) {
        btn.classList.replace('fa-moon', 'fa-sun');
        localStorage.setItem('theme', 'dark');
    } else {
        btn.classList.replace('fa-sun', 'fa-moon');
        localStorage.setItem('theme', 'light');
    }
});


// ─────────────────────────────────────────
//  HAMBURGER — MOBILE MENU TOGGLE
// ─────────────────────────────────────────
const hamburger  = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobileMenu');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('open');
    mobileMenu.classList.toggle('open');
});

// Close menu when clicking outside
document.addEventListener('click', (e) => {
    if (!hamburger.contains(e.target) && !mobileMenu.contains(e.target)) {
        hamburger.classList.remove('open');
        mobileMenu.classList.remove('open');
    }
});


// ─────────────────────────────────────────
//  SMOOTH SCROLL — all anchor links
//  (CSS scroll-behavior: smooth + scroll-padding-top: 70px
//   handles the actual scrolling; this closes the mobile menu)
// ─────────────────────────────────────────
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', () => {
        hamburger.classList.remove('open');
        mobileMenu.classList.remove('open');
    });
});


// ─────────────────────────────────────────
//  ACTIVE NAV LINK ON SCROLL
// ─────────────────────────────────────────
const sections   = document.querySelectorAll('section');
const navLinks   = document.querySelectorAll('.nav-links a');
const mobileLinks = document.querySelectorAll('.mobile-menu a');

window.addEventListener('scroll', () => {
    let current = '';

    sections.forEach(section => {
        if (window.scrollY >= section.offsetTop - 80) {
            current = section.getAttribute('id');
        }
    });

    [...navLinks, ...mobileLinks].forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === '#' + current) {
            link.classList.add('active');
        }
    });
});


// ─────────────────────────────────────────
//  TECH STACK — Marquee & Filter Tabs
//  FIX 1: innerHTML was duplicated on each filter click, causing
//          exponential growth. Now original HTML is saved once to
//          dataset.original and rebuilt cleanly on each filter.
//  FIX 2: Filter hid badges but left gaps because display:none
//          on flex children still reserves space in some browsers.
//          Rebuilt from original each time to avoid stale clones.
// ─────────────────────────────────────────

// Save originals BEFORE duplicating, then duplicate once
document.querySelectorAll('.marquee-track').forEach(track => {
    track.dataset.original = track.innerHTML;
    track.innerHTML += track.dataset.original; // seamless infinite scroll
});

const tabs = document.querySelectorAll('.tab');

tabs.forEach(tab => {
    tab.addEventListener('click', () => {
        tabs.forEach(t => t.classList.remove('active'));
        tab.classList.add('active');

        const filter = tab.dataset.filter;

        document.querySelectorAll('.marquee-track').forEach(track => {
            // Rebuild cleanly from original (avoids operating on stale clones)
            track.innerHTML = track.dataset.original + track.dataset.original;

            // Apply filter visibility
            track.querySelectorAll('.badge').forEach(badge => {
                badge.style.display = (filter === 'all' || badge.dataset.cat === filter)
                    ? 'flex'
                    : 'none';
            });
        });
    });
});

// Scroll reveal 
ScrollReveal({
  reset: true,
  distance: '80px',
  duration: 2000,
  delay: 200
});

// ScrollReveal().reveal('.navbar', {origin: 'top'});
ScrollReveal().reveal('.home-content', {origin: 'left'});
ScrollReveal().reveal('.img-right', {origin: 'right'});
ScrollReveal().reveal('img-left', '.about-content', {origin: 'top'});
ScrollReveal().reveal('', {origin: 'top'});
ScrollReveal().reveal('', {origin: 'top'});