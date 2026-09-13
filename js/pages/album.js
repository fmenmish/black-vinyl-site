// js/pages/album.js
(function () {
  initHeaderFooter(null);

  const root = document.getElementById('album-root');
  const id = new URLSearchParams(location.search).get('id');
  const album = getAlbumById(id);

  if (!album) {
    root.innerHTML = `
      <div class="empty-state">
        ${ICONS.boxEmpty}
        <h3>Album not found</h3>
        <p>We couldn't find that album. <a href="index.html">Back to home</a></p>
      </div>`;
    return;
  }

  const categoryLabel = escapeHTML(CATEGORY_LABELS[album.category] || album.category);
  const liked = isLoggedIn() && isLiked(album.id);

  root.innerHTML = `
    <div class="breadcrumb">
      <a href="index.html">Home</a> /
      <a href="genre.html?c=${encodeURIComponent(album.category)}">${categoryLabel}</a> /
      ${escapeHTML(album.name)}
    </div>
    <div class="album-card album-detail-card" data-album-id="${escapeHTML(album.id)}">
      <div class="album-detail-cover">
        <img src="${escapeHTML(album.cover)}" alt="${escapeHTML(album.name)} cover art">
      </div>
      <div class="album-detail-info">
        <h1 class="album-detail-title">${escapeHTML(album.name)}</h1>
        <a class="album-detail-band" href="band.html?b=${encodeURIComponent(album.band)}">${escapeHTML(album.band)}</a>
        <div class="album-detail-meta">
          <a href="genre.html?c=${encodeURIComponent(album.category)}" class="genre-pill">${categoryLabel}</a>
          <span>${escapeHTML(formatReleaseDate(album.releaseDate))}</span>
        </div>
        <div class="album-detail-price">${formatPrice(album.price)}</div>
        <div class="album-detail-actions">
          <input type="number" class="qty-input" data-role="qty" min="1" max="99" value="1" aria-label="Quantity to add">
          <button type="button" class="btn btn-primary" data-role="add-to-cart">Add to Cart</button>
          <button type="button" class="album-detail-like ${liked ? 'liked' : ''}" data-role="like" aria-label="${liked ? 'Remove from liked albums' : 'Add to liked albums'}">${ICONS.heart}</button>
        </div>
        <div id="album-cart-note"></div>
      </div>
    </div>`;

  function renderCartNote() {
    const note = document.getElementById('album-cart-note');
    if (!note) return;
    const qty = getCartQty(album.id);
    note.innerHTML = isInCart(album.id)
      ? `<div class="already-in-cart-note">Already in the cart (qty ${qty})</div>`
      : '';
  }

  function syncLikeButton() {
    const likeBtn = root.querySelector('[data-role="like"]');
    if (!likeBtn) return;
    const nowLiked = isLoggedIn() && isLiked(album.id);
    likeBtn.classList.toggle('liked', nowLiked);
    likeBtn.setAttribute('aria-label', nowLiked ? 'Remove from liked albums' : 'Add to liked albums');
  }

  renderCartNote();

  onAlbumCardsChanged(() => {
    renderCartNote();
    syncLikeButton();
  });
})();
