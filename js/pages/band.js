// js/pages/band.js
(function () {
  initHeaderFooter(null);

  const bandName = new URLSearchParams(location.search).get('b');
  const heroRoot = document.getElementById('hero-root');
  const pageHeader = document.getElementById('band-page-header');
  const grid = document.getElementById('band-grid');

  if (!bandName || !getAllBands().includes(bandName)) {
    pageHeader.innerHTML = `
      <div class="empty-state">
        ${ICONS.boxEmpty}
        <h3>Band not found</h3>
        <p>We couldn't find a band matching that name. <a href="index.html">Back to home</a></p>
      </div>`;
    return;
  }

  const albums = getAlbumsByBand(bandName);

  renderHero(heroRoot, {
    image: HERO_BANDS_IMG,
    sizeClass: 'hero-sm',
    eyebrow: 'Band',
    title: escapeHTML(bandName),
    subtitle: albums.length + ' albums'
  });

  function renderGrid() {
    renderAlbumGrid(grid, sortByReleaseDateDesc(getAlbumsByBand(bandName)));
  }

  renderGrid();
  onAlbumCardsChanged(renderGrid);
})();
