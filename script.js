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