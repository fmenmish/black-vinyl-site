// js/pages/genre.js
(function () {
  const category = new URLSearchParams(location.search).get('c');

  if (!CATEGORIES.includes(category)) {
    initHeaderFooter(null);
    const container = document.getElementById('genre-container');
    if (container) {
      container.innerHTML = `
        <div class="empty-state">
          ${ICONS.boxEmpty}
          <h3>Genre not found</h3>
          <p>We couldn't find that genre. <a href="index.html">Back to home</a></p>
        </div>`;
    }
    return;
  }

  initHeaderFooter(category);

  const albums = getAlbumsByCategory(category);

  renderHero(document.getElementById('hero-root'), {
    image: CATEGORY_HERO[category],
    sizeClass: 'hero-sm',
    eyebrow: 'Genre',
    title: CATEGORY_LABELS[category],
    subtitle: albums.length + ' albums'
  });

  document.getElementById('genre-title').textContent = CATEGORY_LABELS[category];
  document.getElementById('genre-subtitle').textContent = 'Sorted by newest release';
  document.title = CATEGORY_LABELS[category] + ' -- BlackVinyl';

  function renderGrid() {
    renderAlbumGrid(document.getElementById('genre-grid'), sortByReleaseDateDesc(getAlbumsByCategory(category)));
  }

  renderGrid();
  onAlbumCardsChanged(renderGrid);
})();
