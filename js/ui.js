// js/ui.js
// Shared rendering helpers used by every page: header/footer, album cards,
// carousels, hero banners, toasts. Depends on data.js and store.js being
// loaded first. Plain globals on purpose — no build step, no modules.

function escapeHTML(str) {
  return String(str == null ? '' : str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

const ICONS = {
  search: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="7"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>',
  heart: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.67l-1-1.07a5.5 5.5 0 0 0-7.8 7.8l1 1.05L12 21.2l7.8-7.75 1-1.05a5.5 5.5 0 0 0 0-7.8z"/></svg>',
  cart: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/><path d="M1 1h4l2.7 13.4a2 2 0 0 0 2 1.6h9.7a2 2 0 0 0 2-1.6L23 6H6"/></svg>',
  user: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>',
  close: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>',
  chevronLeft: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="15 18 9 12 15 6"/></svg>',
  chevronRight: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"/></svg>',
  trash: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"/><path d="M10 11v6"/><path d="M14 11v6"/><path d="M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2"/></svg>',
  menu: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="18" x2="21" y2="18"/></svg>',
  disc: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="3"/></svg>',
  boxEmpty: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M21 8l-9-5-9 5 9 5 9-5z"/><path d="M3 8v8l9 5 9-5V8"/><path d="M12 13v8"/></svg>'
};

const NAV_LINKS = [
  { key: 'metal', label: 'Metal', href: 'genre.html?c=metal' },
  { key: 'metalcore', label: 'Metalcore', href: 'genre.html?c=metalcore' },
  { key: 'punk', label: 'Punk', href: 'genre.html?c=punk' },
  { key: 'rock', label: 'Rock', href: 'genre.html?c=rock' }
];

// ------------------------------ header / footer -----------------------------

function initHeaderFooter(activeKey) {
  document.body.dataset.activeNav = activeKey || '';
  renderHeader(activeKey);
  renderFooter();
  bindGlobalAlbumCardActions();
  initConsentBanner();
}

function renderHeader(activeKey) {
  const root = document.getElementById('navbar-root');
  if (!root) return;
  const user = getCurrentUser();
  const cartCount = getCartCount();

  const linksHTML = NAV_LINKS.map(l =>
    `<a href="${l.href}" class="${activeKey === l.key ? 'active' : ''}">${l.label}</a>`
  ).join('');

  const userMenuHTML = user
    ? `
      <div class="user-menu" id="user-menu">
        <button type="button" class="icon-btn" id="user-menu-toggle" aria-label="Account menu">${ICONS.user}</button>
        <div class="user-menu-panel" id="user-menu-panel">
          <div class="user-menu-email">Signed in as<br><strong>${escapeHTML(user.firstName)} ${escapeHTML(user.lastName)}</strong></div>
          <a href="account.html">My Account</a>
          <a href="orders.html">Purchase History</a>
          <a href="liked.html">Liked Albums</a>
          <div class="menu-divider"></div>
          <button type="button" id="logout-btn">Log Out</button>
        </div>
      </div>`
    : `<a href="login.html" class="btn btn-primary btn-sm">Log In</a>`;

  root.innerHTML = `
    <header class="site-header">
      <div class="container">
        <button type="button" class="nav-toggle" id="nav-toggle" aria-label="Toggle menu" aria-expanded="false">${ICONS.menu}</button>
        <a href="./" class="brand">${ICONS.disc}<span>Black</span>Vinyl</a>
        <ul class="nav-links" id="nav-links">${linksHTML}</ul>
        <div class="nav-search">
          <form id="nav-search-form" role="search">
            ${ICONS.search}
            <input type="search" name="q" placeholder="Search albums, bands, release dates..." aria-label="Search">
          </form>
        </div>
        <div class="nav-icons">
          ${user ? `<a href="liked.html" class="icon-btn" aria-label="Liked albums">${ICONS.heart}</a>` : ''}
          <a href="cart.html" class="icon-btn" aria-label="Cart">
            ${ICONS.cart}
            ${cartCount > 0 ? `<span class="badge-count">${cartCount}</span>` : ''}
          </a>
          ${userMenuHTML}
        </div>
      </div>
    </header>`;

  const form = document.getElementById('nav-search-form');
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const q = new FormData(form).get('q');
      if (q && q.trim()) location.href = 'search.html?q=' + encodeURIComponent(q.trim());
    });
  }

  const navToggle = document.getElementById('nav-toggle');
  const navLinksEl = document.getElementById('nav-links');
  if (navToggle && navLinksEl) {
    navToggle.addEventListener('click', (e) => {
      e.stopPropagation();
      const open = navLinksEl.classList.toggle('open');
      navToggle.setAttribute('aria-expanded', String(open));
    });
  }

  const menuToggle = document.getElementById('user-menu-toggle');
  const menuPanel = document.getElementById('user-menu-panel');
  if (menuToggle && menuPanel) {
    menuToggle.addEventListener('click', (e) => {
      e.stopPropagation();
      menuPanel.classList.toggle('open');
    });
    document.addEventListener('click', () => menuPanel.classList.remove('open'));
  }
  const logoutBtn = document.getElementById('logout-btn');
  if (logoutBtn) {
    logoutBtn.addEventListener('click', () => {
      logoutUser();
      location.href = 'index.html';
    });
  }
}

function updateCartBadge() {
  renderHeader(document.body.dataset.activeNav || null);
}

function renderFooter() {
  const root = document.getElementById('footer-root');
  if (!root) return;
  root.innerHTML = `
    <footer class="site-footer">
      <div class="container">
        <span>&copy; ${new Date().getFullYear()} BlackVinyl — a demo record store.</span>
        <span>Metal &middot; Metalcore &middot; Punk &middot; Rock &middot; <button type="button" id="privacy-link" class="link-btn">Privacy</button></span>
      </div>
    </footer>`;

  const privacyLink = document.getElementById('privacy-link');
  if (privacyLink) {
    privacyLink.addEventListener('click', () => showConsentBanner());
  }
}

// --------------------------- storage consent banner --------------------------
// Accept / opt-out decisions and the actual data wipe live in store.js
// (getConsentStatus / hasConsentDecision / setConsentAccepted /
// setConsentDeclined) since that's the site's persistence layer — this file
// only renders the banner and wires those functions to its buttons.

function initConsentBanner() {
  if (hasConsentDecision()) return;
  showConsentBanner();
}

function showConsentBanner() {
  if (document.querySelector('.consent-banner')) return; // already open
  const existing = getConsentStatus(); // null | 'accepted' | 'declined'

  const banner = document.createElement('div');
  banner.className = 'consent-banner';
  banner.innerHTML = `
    <div class="container">
      ${existing ? `<button type="button" class="consent-close" id="consent-close-btn" aria-label="Close">${ICONS.close}</button>` : ''}
      <p class="consent-text">
        <strong>BlackVinyl uses your browser's local storage</strong> to remember your account,
        cart, liked albums, and order history right on this device — nothing is sent to a server
        or shared with anyone. Opting out clears any of that already saved on this device and
        turns off accounts, cart, and likes.
        ${existing ? `<br>Current setting: <strong>${existing === 'accepted' ? 'Accepted' : 'Opted out'}</strong>.` : ''}
      </p>
      <div class="consent-actions">
        <button type="button" class="btn btn-outline" id="consent-optout-btn">Opt out</button>
        <button type="button" class="btn btn-primary" id="consent-accept-btn">Accept</button>
      </div>
    </div>`;
  document.body.appendChild(banner);

  document.getElementById('consent-accept-btn').addEventListener('click', () => {
    setConsentAccepted();
    hideConsentBanner();
    showToast('Storage accepted', 'success');
  });
  document.getElementById('consent-optout-btn').addEventListener('click', () => {
    setConsentDeclined();
    hideConsentBanner();
    // Declining logs you out and clears your cart/likes/orders — refresh the
    // header so it stops showing a now-erased signed-in state.
    renderHeader(document.body.dataset.activeNav || null);
    showToast('Opted out — any saved data on this device was cleared');
  });
  const closeBtn = document.getElementById('consent-close-btn');
  if (closeBtn) closeBtn.addEventListener('click', hideConsentBanner);
}

function hideConsentBanner() {
  const banner = document.querySelector('.consent-banner');
  if (!banner) return;
  banner.style.transition = 'transform .2s ease';
  banner.style.transform = 'translateY(100%)';
  setTimeout(() => banner.remove(), 200);
}

// -------------------------------- toasts ------------------------------------

function ensureToastContainer() {
  let el = document.querySelector('.toast-container');
  if (!el) {
    el = document.createElement('div');
    el.className = 'toast-container';
    document.body.appendChild(el);
  }
  return el;
}

function showToast(message, type) {
  const container = ensureToastContainer();
  const toast = document.createElement('div');
  toast.className = 'toast' + (type === 'success' ? ' success' : '');
  toast.textContent = message;
  container.appendChild(toast);
  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transition = 'opacity .2s ease';
    setTimeout(() => toast.remove(), 200);
  }, 2400);
}

// ------------------------------- album cards ---------------------------------

// opts: { showLike: true, showRemoveLiked: false }
function renderAlbumCardHTML(album, opts) {
  opts = opts || {};
  const showLike = opts.showLike !== false && !opts.showRemoveLiked;
  const liked = isLoggedIn() && isLiked(album.id);
  const inCartQty = isLoggedIn() ? getCartQty(album.id) : 0;

  const overlayBtn = opts.showRemoveLiked
    ? `<button type="button" class="remove-liked-btn" data-role="remove-liked" aria-label="Remove from liked albums">${ICONS.close}</button>`
    : (showLike
        ? `<button type="button" class="like-btn ${liked ? 'liked' : ''}" data-role="like" aria-label="${liked ? 'Remove from liked albums' : 'Add to liked albums'}">${ICONS.heart}</button>`
        : '');

  return `
    <div class="album-card" data-album-id="${escapeHTML(album.id)}">
      <div class="album-card-media">
        <a href="album.html?id=${encodeURIComponent(album.id)}"><img src="${escapeHTML(album.cover)}" alt="${escapeHTML(album.name)} cover art" loading="lazy"></a>
        ${overlayBtn}
      </div>
      <div class="album-card-body">
        <a href="album.html?id=${encodeURIComponent(album.id)}" class="album-card-title">${escapeHTML(album.name)}</a>
        <a href="band.html?b=${encodeURIComponent(album.band)}" class="album-card-band">${escapeHTML(album.band)}</a>
        <div class="album-card-meta">
          <a href="genre.html?c=${encodeURIComponent(album.category)}" class="genre-pill">${escapeHTML(CATEGORY_LABELS[album.category] || album.category)}</a>
          <span>${escapeHTML(formatReleaseDate(album.releaseDate))}</span>
        </div>
        <div class="album-card-price">${formatPrice(album.price)}</div>
        <div class="album-card-actions">
          <div class="add-to-cart-row">
            <input type="number" class="qty-input" data-role="qty" min="1" max="99" value="1" aria-label="Quantity to add">
            <button type="button" class="btn btn-primary btn-sm" data-role="add-to-cart">Add to Cart</button>
          </div>
          ${inCartQty > 0 ? `<div class="already-in-cart-note">Already in the cart (qty ${inCartQty})</div>` : ''}
        </div>
      </div>
    </div>`;
}

// Patches an existing .album-card's liked/cart-note state in place instead
// of re-rendering it. Callers with a static album list (home page carousels,
// where a like/cart change never adds or removes which albums are shown)
// should use this on change rather than regenerating innerHTML -- replacing
// the DOM nodes drops any click listeners bound to them, notably the ones
// the Salesforce Interactions sitemap script attaches to add-to-cart/like.
function syncAlbumCardState(cardEl) {
  const albumId = cardEl.dataset.albumId;
  const likeBtn = cardEl.querySelector('[data-role="like"]');
  if (likeBtn) {
    const liked = isLoggedIn() && isLiked(albumId);
    likeBtn.classList.toggle('liked', liked);
    likeBtn.setAttribute('aria-label', liked ? 'Remove from liked albums' : 'Add to liked albums');
  }
  const actions = cardEl.querySelector('.album-card-actions');
  if (actions) {
    const inCartQty = isLoggedIn() ? getCartQty(albumId) : 0;
    let note = actions.querySelector('.already-in-cart-note');
    if (inCartQty > 0) {
      if (!note) {
        note = document.createElement('div');
        note.className = 'already-in-cart-note';
        actions.appendChild(note);
      }
      note.textContent = `Already in the cart (qty ${inCartQty})`;
    } else if (note) {
      note.remove();
    }
  }
}

function syncAllAlbumCardStates(root) {
  (root || document).querySelectorAll('.album-card[data-album-id]').forEach(syncAlbumCardState);
}

function renderAlbumGrid(container, albums, opts) {
  if (!container) return;
  if (!albums.length) {
    container.innerHTML = `
      <div class="empty-state">
        ${ICONS.boxEmpty}
        <h3>No albums here yet</h3>
        <p>Try a different genre, band, or search.</p>
      </div>`;
    return;
  }
  container.innerHTML = albums.map(a => renderAlbumCardHTML(a, opts)).join('');
}

// opts: { id, title, albums, viewAllHref, cardOpts }
function renderCarousel(container, opts) {
  if (!container) return;
  const trackId = opts.id + '-track';
  container.innerHTML = `
    <div class="section-header">
      <h2 class="section-title">${escapeHTML(opts.title)}</h2>
      ${opts.viewAllHref ? `<a class="section-link" href="${opts.viewAllHref}">See all &rarr;</a>` : ''}
    </div>
    <div class="carousel-wrap">
      <button type="button" class="carousel-nav prev" aria-label="Scroll left">${ICONS.chevronLeft}</button>
      <div class="carousel-track" id="${trackId}">
        ${opts.albums.map(a => renderAlbumCardHTML(a, opts.cardOpts)).join('')}
      </div>
      <button type="button" class="carousel-nav next" aria-label="Scroll right">${ICONS.chevronRight}</button>
    </div>`;

  const track = container.querySelector('.carousel-track');
  const prev = container.querySelector('.carousel-nav.prev');
  const next = container.querySelector('.carousel-nav.next');
  const scrollAmount = 420;
  prev.addEventListener('click', () => track.scrollBy({ left: -scrollAmount, behavior: 'smooth' }));
  next.addEventListener('click', () => track.scrollBy({ left: scrollAmount, behavior: 'smooth' }));
}

// Delegated click handling for add-to-cart / like / remove-liked, bound once
// on document.body so it keeps working across re-renders.
let __cardActionsBound = false;
let __cardChangeListeners = [];

function onAlbumCardsChanged(fn) {
  __cardChangeListeners.push(fn);
}

function bindGlobalAlbumCardActions() {
  if (__cardActionsBound) return;
  __cardActionsBound = true;
  document.body.addEventListener('click', (e) => {
    const card = e.target.closest('.album-card');
    if (!card) return;
    const albumId = card.dataset.albumId;

    if (e.target.closest('[data-role="add-to-cart"]')) {
      if (!requireLogin()) return;
      const qtyInput = card.querySelector('[data-role="qty"]');
      const qty = qtyInput ? qtyInput.value : 1;
      const res = addToCart(albumId, qty);
      if (res.ok) {
        showToast('Added to cart', 'success');
        updateCartBadge();
        __cardChangeListeners.forEach(fn => fn());
      } else {
        showToast(res.error || 'Could not add to cart.');
      }
      return;
    }

    if (e.target.closest('[data-role="like"]')) {
      if (!requireLogin()) return;
      const res = toggleLike(albumId);
      if (res.ok) {
        showToast(res.liked ? 'Added to liked albums' : 'Removed from liked albums', 'success');
        __cardChangeListeners.forEach(fn => fn());
      } else {
        showToast(res.error || 'Could not update liked albums.');
      }
      return;
    }

    if (e.target.closest('[data-role="remove-liked"]')) {
      removeLike(albumId);
      showToast('Removed from liked albums', 'success');
      __cardChangeListeners.forEach(fn => fn());
      return;
    }
  });
}

// --------------------------------- hero ---------------------------------------

// opts: { image, eyebrow, title, subtitle, actionsHTML, sizeClass }
function renderHero(container, opts) {
  if (!container) return;
  container.innerHTML = `
    <section class="hero ${opts.sizeClass || ''}" style="background-image:url('${escapeHTML(opts.image)}')">
      <div class="hero-content">
        ${opts.eyebrow ? `<p class="hero-eyebrow">${escapeHTML(opts.eyebrow)}</p>` : ''}
        <h1 class="hero-title">${opts.title}</h1>
        ${opts.subtitle ? `<p class="hero-subtitle">${opts.subtitle}</p>` : ''}
        ${opts.actionsHTML ? `<div class="hero-actions">${opts.actionsHTML}</div>` : ''}
      </div>
    </section>`;
}

function formatDateTime(iso) {
  const d = new Date(iso);
  if (isNaN(d.getTime())) return iso;
  return d.toLocaleString(undefined, {
    year: 'numeric', month: 'short', day: 'numeric',
    hour: '2-digit', minute: '2-digit'
  });
}
