// js/pages/search.js
(function () {
  initHeaderFooter(null);

  const q = new URLSearchParams(location.search).get('q') || '';
  const titleEl = document.getElementById('search-title');
  const subtitleEl = document.getElementById('search-subtitle');
  const grid = document.getElementById('search-grid');

  titleEl.textContent = q ? `Search results for "${q}"` : 'Search';

  function renderResults() {
    const results = searchAlbums(q);
    subtitleEl.textContent = q
      ? `${results.length} ${results.length === 1 ? 'result' : 'results'} found`
      : 'Enter a search term to find albums, bands, or release dates.';
    renderAlbumGrid(grid, results);
  }

  renderResults();
  onAlbumCardsChanged(renderResults);
})();
