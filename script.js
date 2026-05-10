  // toggle dark/light mode 
const btn = document.getElementById('toggle');

// apply saved theme on load
if (localStorage.getItem("theme") === "dark") {
    document.body.classList.add("dark");
    btn.classList.replace("fa-moon", "fa-sun");
}

btn.onclick = () => {
    // spin animation
    btn.classList.add("spin");
    setTimeout(() => btn.classList.remove("spin"), 100);

    document.body.classList.toggle("dark");

    if (document.body.classList.contains("dark")) {
        btn.classList.replace("fa-moon", "fa-sun");
        localStorage.setItem("theme", "dark");
    } else {
        btn.classList.replace("fa-sun", "fa-moon");
        localStorage.setItem("theme", "light");
    }
};

// Mobile menu toggle 
const menu = document.getElementById('menu');
const mobileMenu = document.getElementById('mobileMenu');

menu.addEventListener('click', ()=> {
  menu.classList.toggle('open');
  mobileMenu.classList.toggle('open');
});

document.addEventListener('click', (e) => {
  if (!menu.contains(e.target) && !mobileMenu.contains(e.target)) {
    menu.classList.remove('open');
    mobileMenu.classList.remove('open');
  }
});

// Active link switching on scroll
const navLinks = document.querySelectorAll('.nav-links li a, .mobile-menu li a');
const sections = document.querySelectorAll('section[id]');

function activateNavLink() {
    const scrollY = window.scrollY;

    sections.forEach(section => {
        const sectionTop = section.offsetTop - 100; // offset for navbar height
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute('id');

        if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${sectionId}`) {
                    link.classList.add('active');
                }
            });
        }
    });
}
window.addEventListener('scroll', activateNavLink);

// Animate count-up numbers
function animateCountUp(el) {
  const target = +el.dataset.target;
  const suffix = el.dataset.suffix || '';
  const duration = 3000; // ms
  const start = performance.now();

  function update(now) {
    const elapsed = now - start;
    const progress = Math.min(elapsed / duration, 1);

    // Ease-out cubic
    const eased = 1 - Math.pow(1 - progress, 3);
    const current = Math.floor(eased * target);

    el.textContent = current + suffix;

    if (progress < 1) requestAnimationFrame(update);
    else el.textContent = target + suffix; // ensure exact final value
  }

  requestAnimationFrame(update);
}

// Trigger when elements scroll into view
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      animateCountUp(entry.target);
      observer.unobserve(entry.target); // animate only once
    }
  });
}, { threshold: 0.5 });

document.querySelectorAll('.count-up').forEach(el => observer.observe(el));

// Techstack scroll animation 
// ── Duplicate each track's content for seamless infinite scroll ──
  document.querySelectorAll('.marquee-track').forEach(track => {
    const clone = track.innerHTML;
    track.innerHTML += clone;
  });

  // ── Filter tabs → show/hide badges in both originals + clones ──
  const tabs = document.querySelectorAll('.tab');

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      tabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');

      const filter = tab.dataset.filter;

      document.querySelectorAll('.marquee-track').forEach(track => {
        // Reset: rebuild track from original data-badges
        const allBadges = track.querySelectorAll('.badge');
        allBadges.forEach(b => {
          if (filter === 'all' || b.dataset.cat === filter) {
            b.style.display = 'flex';
          } else {
            b.style.display = 'none';
          }
        });
      });
    });
  });

  // Services 
let items = document.querySelectorAll(".item");

items.forEach(item => {
  item.addEventListener("click", ()=> {
    item.classList.toggle("active");
  })
})
// Send email using Email
const form = document.getElementById('contactForm');

form.addEventListener('submit', async function (e) {
    e.preventDefault();

    const submitBtn = form.querySelector('input[type="submit"]');
    submitBtn.value = 'Sending...';
    submitBtn.disabled = true;

    const formData = new FormData(form);

    try {
        await fetch('/', {
            method: 'POST',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            body: new URLSearchParams(formData).toString(),
        });

        // Success
        submitBtn.value = 'Message Sent';
        submitBtn.style.background = 'green';
        form.reset();

        setTimeout(() => {
            submitBtn.value = 'Send Message';
            submitBtn.style.background = '';
            submitBtn.disabled = false;
        }, 3000);

    } catch (error) {
        console.error('Error:', error);
        submitBtn.value = 'Failed. Try Again';
        submitBtn.style.background = 'red';
        submitBtn.disabled = false;
    }
});

// Scroll reveal
ScrollReveal({
  reset: true,
  distance: '80px',
  duration: 2000,
  delay: 200
});

// Navbar
ScrollReveal().reveal('.navbar', {origin: 'top'});
// home
ScrollReveal().reveal('.home-content', {origin: 'bottom'});
ScrollReveal().reveal('.img-right', {origin: 'bottom'});

// about
ScrollReveal().reveal('.img-left', {origin: 'bottom'});
ScrollReveal().reveal('.about-content', {origin: 'bottom'});
ScrollReveal().reveal('.experience', {origin: 'bottom'});
ScrollReveal().reveal('.work-exp', {origin: 'bottom'});
ScrollReveal().reveal('.experience-card', {origin: 'bottom'});
ScrollReveal().reveal('.educ-bg', {origin: 'bottom'});
ScrollReveal().reveal('.educ-card', {origin: 'bottom'});

// projects
ScrollReveal().reveal('.projects', {origin: 'bottom'});
ScrollReveal().reveal('.card-container', {origin: 'bottom'});

// services
ScrollReveal().reveal('.services', {origin: 'bottom'});
ScrollReveal().reveal('.tech-section', {origin: 'bottom'});
ScrollReveal().reveal('.filter-tabs', {origin: 'bottom'});
ScrollReveal().reveal('.marquee-outer', {origin: 'bottom'});

// contact
ScrollReveal().reveal('.contact', {origin: 'bottom'});
ScrollReveal().reveal('.contact-info', {origin: 'bottom'});
ScrollReveal().reveal('.form-container', {origin: 'bottom'});