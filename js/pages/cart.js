// js/pages/cart.js
(function () {
  initHeaderFooter(null);
  if (!requireLogin()) return;

  const listEl = document.getElementById('cart-list');
  const summaryEl = document.getElementById('cart-summary');

  function renderList() {
    const details = getCartWithDetails();
    if (!details.length) {
      renderAlbumGrid(listEl, [], {});
      return;
    }
    listEl.innerHTML = details.map(({ album, qty, lineTotal }) => `
      <div class="cart-line" data-album-id="${escapeHTML(album.id)}">
        <a href="album.html?id=${encodeURIComponent(album.id)}">
          <img src="${escapeHTML(album.cover)}" alt="${escapeHTML(album.name)} cover art">
        </a>
        <div class="cart-line-info">
          <a href="album.html?id=${encodeURIComponent(album.id)}" class="cart-line-title">${escapeHTML(album.name)}</a>
          <a href="band.html?b=${encodeURIComponent(album.band)}" class="cart-line-band">${escapeHTML(album.band)}</a>
          <div class="cart-line-price">${formatPrice(album.price)} each</div>
        </div>
        <div class="cart-line-controls">
          <div class="qty-stepper">
            <button type="button" data-action="dec" aria-label="Decrease quantity">&minus;</button>
            <input type="number" data-role="cart-qty" min="1" max="99" value="${qty}" aria-label="Quantity">
            <button type="button" data-action="inc" aria-label="Increase quantity">+</button>
          </div>
          <div class="cart-line-total">${formatPrice(lineTotal)}</div>
          <button type="button" class="btn-icon btn-danger-text" data-action="remove" aria-label="Remove from cart">${ICONS.trash}</button>
        </div>
      </div>`).join('');
  }

  function renderSummary() {
    const details = getCartWithDetails();
    const count = getCartCount();
    const total = getCartTotal();
    const empty = details.length === 0;
    summaryEl.innerHTML = `
      <div class="summary-row"><span>Items</span><span>${count}</span></div>
      <div class="summary-row total"><span>Total</span><span>${formatPrice(total)}</span></div>
      <button type="button" class="btn btn-primary btn-block" id="checkout-btn" ${empty ? 'disabled' : ''}>Proceed to Purchase</button>`;
    if (!empty) {
      const btn = document.getElementById('checkout-btn');
      btn.addEventListener('click', () => { location.href = 'checkout.html'; });
    }
  }

  function renderAll() {
    renderList();
    renderSummary();
  }

  listEl.addEventListener('click', (e) => {
    const line = e.target.closest('.cart-line');
    if (!line) return;
    const albumId = line.dataset.albumId;

    if (e.target.closest('[data-action="inc"]')) {
      setCartQty(albumId, getCartQty(albumId) + 1);
      renderAll();
      updateCartBadge();
      return;
    }
    if (e.target.closest('[data-action="dec"]')) {
      const current = getCartQty(albumId);
      if (current <= 1) {
        removeFromCart(albumId);
      } else {
        setCartQty(albumId, current - 1);
      }
      renderAll();
      updateCartBadge();
      return;
    }
    if (e.target.closest('[data-action="remove"]')) {
      removeFromCart(albumId);
      showToast('Removed from cart', 'success');
      renderAll();
      updateCartBadge();
      return;
    }
  });

  listEl.addEventListener('change', (e) => {
    const input = e.target.closest('[data-role="cart-qty"]');
    if (!input) return;
    const line = e.target.closest('.cart-line');
    if (!line) return;
    const albumId = line.dataset.albumId;
    setCartQty(albumId, Number(input.value) || 1);
    renderAll();
    updateCartBadge();
  });

  renderAll();
})();
