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

  const itemsHTML = details.map(d => `
    <div class="checkout-item">
      <span>${escapeHTML(d.album.name)} &mdash; ${escapeHTML(d.album.band)} (x ${escapeHTML(String(d.qty))})</span>
      <span>${formatPrice(d.lineTotal)}</span>
    </div>`).join('');

  panel.innerHTML = `
    ${itemsHTML}
    <div class="summary-row total">
      <span>Total</span>
      <span>${formatPrice(total)}</span>
    </div>
    <button type="button" class="btn btn-primary btn-block" id="confirm-purchase-btn" style="margin-top:8px">Confirm Purchase</button>
    <a href="cart.html" class="btn btn-outline btn-block" id="back-to-cart-link" style="margin-top:12px">Back to Cart</a>
  `;

  const confirmBtn = document.getElementById('confirm-purchase-btn');
  if (confirmBtn) {
    confirmBtn.addEventListener('click', () => {
      const res = createOrderFromCart();
      if (res.ok) {
        location.href = 'orders.html?confirmed=' + encodeURIComponent(res.order.id);
      } else {
        showToast(res.error || 'Could not complete purchase.');
      }
    });
  }
}
