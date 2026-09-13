// js/pages/liked.js
(function () {
  initHeaderFooter(null);
  if (!requireLogin()) return;

  const grid = document.getElementById('liked-grid');

  function renderLikedGrid() {
    renderAlbumGrid(grid, getLikedAlbums(), { showLike: false, showRemoveLiked: true });
  }

  renderLikedGrid();
  onAlbumCardsChanged(renderLikedGrid);
})();
