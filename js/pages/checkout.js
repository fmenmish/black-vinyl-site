// js/pages/checkout.js
// Purchase-confirmation page. Requires login; requires a non-empty cart.

initHeaderFooter(null);
if (!requireLogin()) {
  // requireLogin already redirected to login.html?returnTo=...
} else {
  const details = getCartWithDetails();

  if (details.length === 0) {
    location.href = 'cart.html';
  } else {
    renderCheckoutPanel(details);
  }
}

function renderCheckoutPanel(details) {
  const panel = document.getElementById('checkout-panel');
  if (!panel) return;

  const total = details.reduce((sum, d) => sum + d.lineTotal, 0);

  // Generated once, shown to the user before they confirm, then handed to
  // createOrderFromCart() below so the order actually gets saved under this
  // exact same id rather than a different, freshly-generated one.
  const pendingOrderId = generateOrderId();

  // Every element below carries its own unique id (keyed by album id where
  // there's one row per item) rather than relying on its position among
  // siblings — so DevTools' "Copy JS path" for any of them resolves to a
  // plain #id selector instead of falling back to :nth-child, which would
  // silently break the moment an item is added, removed, or reordered.
  const itemsHTML = details.map(d => {
    const albumId = escapeHTML(d.album.id);
    return `
    <div class="checkout-item" id="checkout-item-${albumId}">
      <span id="checkout-item-details-${albumId}">
        <span id="checkout-item-name-${albumId}">${escapeHTML(d.album.name)} &mdash; ${escapeHTML(d.album.band)}</span>
        <br><span class="checkout-item-qty" id="checkout-item-qty-${albumId}"><span class="checkout-item-qty-label" id="checkout-item-qty-label-${albumId}">Qty:</span> <span class="checkout-item-qty-value" id="checkout-item-qty-value-${albumId}">${escapeHTML(String(d.qty))}</span></span>
        <br><span class="checkout-item-id" id="checkout-item-id-${albumId}"><span class="checkout-item-id-label" id="checkout-item-id-label-${albumId}">Album ID:</span> <span class="checkout-item-id-value" id="checkout-item-id-value-${albumId}">${albumId}</span></span>
      </span>
      <span id="checkout-item-price-${albumId}">${formatPrice(d.lineTotal)}</span>
    </div>`;
  }).join('');

  panel.innerHTML = `
    <div class="summary-row" id="checkout-order-id-row">
      <span id="checkout-order-id-label">Order ID</span>
      <span class="order-id" id="checkout-order-id-value">${escapeHTML(pendingOrderId)}</span>
    </div>
    ${itemsHTML}
    <div class="summary-row total" id="checkout-total-row">
      <span id="checkout-total-label">Total</span>
      <span id="checkout-total-value">${formatPrice(total)}</span>
    </div>
    <button type="button" class="btn btn-primary btn-block" id="confirm-purchase-btn" style="margin-top:8px">Confirm Purchase</button>
    <a href="cart.html" class="btn btn-outline btn-block" id="back-to-cart-link" style="margin-top:12px">Back to Cart</a>
  `;

  const confirmBtn = document.getElementById('confirm-purchase-btn');
  if (confirmBtn) {
    confirmBtn.addEventListener('click', () => {
      const res = createOrderFromCart(pendingOrderId);
      if (res.ok) {
        location.href = 'orders.html?confirmed=' + encodeURIComponent(res.order.id);
      } else {
        showToast(res.error || 'Could not complete purchase.');
      }
    });
  }
}
