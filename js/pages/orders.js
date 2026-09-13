// js/pages/orders.js
(function () {
  initHeaderFooter(null);
  if (!requireLogin()) return;

  const listEl = document.getElementById('orders-list');

  function renderOrderItemRow(item) {
    return `
      <div class="order-item-row">
        <img src="${escapeHTML(item.cover)}" alt="${escapeHTML(item.name)} cover art">
        <div class="grow">${escapeHTML(item.name)} &mdash; ${escapeHTML(item.band)}</div>
        <span>x ${escapeHTML(String(item.qty))}</span>
        <span>${formatPrice(item.lineTotal)}</span>
      </div>`;
  }

  function renderOrderCard(order) {
    return `
      <div class="order-card">
        <div class="order-card-head">
          <span class="order-id">${escapeHTML(order.id)}</span>
          <div class="order-meta">
            <span><strong>${escapeHTML(formatDateTime(order.dateTime))}</strong></span>
            <span>Total: <strong>${formatPrice(order.totalAmount)}</strong></span>
            <span>Items: <strong>${escapeHTML(String(order.itemCount))}</strong></span>
          </div>
        </div>
        <div class="order-items-list">
          ${order.items.map(renderOrderItemRow).join('')}
        </div>
      </div>`;
  }

  function renderConfirmedBanner() {
    const confirmedId = new URLSearchParams(location.search).get('confirmed');
    if (!confirmedId) return '';
    return `<div class="form-success">Order ${escapeHTML(confirmedId)} confirmed &mdash; thanks for your purchase!</div>`;
  }

  function render() {
    const orders = getOrders();
    const banner = renderConfirmedBanner();

    if (orders.length === 0) {
      listEl.innerHTML = banner + `
        <div class="empty-state">
          ${ICONS.boxEmpty}
          <h3>No orders yet</h3>
          <p>Once you complete a purchase, it'll show up here. <a href="index.html">Start browsing albums &rarr;</a></p>
        </div>`;
      return;
    }

    listEl.innerHTML = banner + orders.map(renderOrderCard).join('');
  }

  render();
})();
