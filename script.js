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
    setTimeout(() => btn.classList.remove("spin"), 300);

    document.body.classList.toggle("dark");

    if (document.body.classList.contains("dark")) {
        btn.classList.replace("fa-moon", "fa-sun");
        localStorage.setItem("theme", "dark");
    } else {
        btn.classList.replace("fa-sun", "fa-moon");
        localStorage.setItem("theme", "light");
    }
}

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