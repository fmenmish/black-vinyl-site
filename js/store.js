// js/store.js
// All persistence for this demo storefront lives in localStorage — there is no
// backend (this is a static site for GitHub Pages). That means the "login"
// system below is for demo/UX purposes only: passwords are lightly obscured,
// not securely hashed, and nothing here should be treated as a real auth
// system. Don't reuse a real password when trying this site out.

const LS_KEYS = {
  users: 'ecom_users',
  session: 'ecom_session',
  consent: 'ecom_consent_status'
};

function cartKey(email) { return 'ecom_cart_' + email; }
function likesKey(email) { return 'ecom_likes_' + email; }
function ordersKey(email) { return 'ecom_orders_' + email; }

function readJSON(key, fallback) {
  try {
    const raw = localStorage.getItem(key);
    if (!raw) return fallback;
    const parsed = JSON.parse(raw);
    return parsed == null ? fallback : parsed;
  } catch (e) {
    console.warn('Failed to read localStorage key', key, e);
    return fallback;
  }
}

function writeJSON(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (e) {
    console.error('Failed to write localStorage key', key, e);
  }
}

// Like readJSON, but guarantees an array back even if someone has hand-edited
// localStorage into something malformed — every list in this file (users,
// cart lines, liked ids, orders) goes through this so a corrupted value can't
// crash the site with a "find is not a function" error.
function readArray(key) {
  const value = readJSON(key, []);
  return Array.isArray(value) ? value : [];
}

// ---- very light password obscuring (NOT real security, see file header) ----
function obscurePassword(password) {
  let hash = 0;
  const str = 'ecom::' + password;
  for (let i = 0; i < str.length; i++) {
    hash = (Math.imul(31, hash) + str.charCodeAt(i)) | 0;
  }
  return 'h' + Math.abs(hash).toString(36) + str.length;
}

// ============================== CONSENT =====================================
//
// Whether the visitor has accepted or opted out of the local-storage-backed
// database below. null = no decision yet (the banner in ui.js is still
// showing). Opting out wipes every ecom_* key this site has ever written in
// this browser (except the consent flag itself) and, from then on, every
// function below that would create or change stored data refuses to run.

function getConsentStatus() {
  try {
    const v = localStorage.getItem(LS_KEYS.consent);
    return v === 'accepted' || v === 'declined' ? v : null;
  } catch (e) {
    return null;
  }
}

function hasConsentDecision() {
  return getConsentStatus() !== null;
}

function isStorageDeclined() {
  return getConsentStatus() === 'declined';
}

// Removes every key this site has written to localStorage, except the
// consent flag itself (that one's set right after calling this).
function wipeAllSiteData() {
  try {
    const toRemove = [];
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key && key.startsWith('ecom_') && key !== LS_KEYS.consent) toRemove.push(key);
    }
    toRemove.forEach(key => localStorage.removeItem(key));
  } catch (e) {
    console.warn('Failed to clear local data', e);
  }
}

function setConsentAccepted() {
  try {
    localStorage.setItem(LS_KEYS.consent, 'accepted');
  } catch (e) {
    console.warn('Failed to save consent choice', e);
  }
}

function setConsentDeclined() {
  wipeAllSiteData();
  try {
    localStorage.setItem(LS_KEYS.consent, 'declined');
  } catch (e) {
    console.warn('Failed to save consent choice', e);
  }
}

const STORAGE_DECLINED_ERROR =
  "You've opted out of local storage, so accounts, carts, and liked albums are turned off. " +
  'Use the "Privacy" link in the footer to switch back to "Accept" if you\'d like to use them.';

// ============================== AUTH ========================================
//
// The site's "user database": every signed-up account is one row in the
// array stored under the ecom_users localStorage key, keyed by (lowercased,
// trimmed) email. getUsers()/saveUsers() are the only two functions that
// touch that key directly — everything else in this section (register,
// login, look up, update) goes through them, so this pair is the whole
// read/write surface of the database.
//
// It's a *simple* database on purpose, matching the site's constraints: this
// is a static GitHub Pages site with no server to talk to, so "shared across
// devices" isn't possible without standing up a real backend. What's here
// still behaves like a real user table for everything the site does within
// one browser — unique-by-email accounts, persisted across reloads and tabs,
// looked up by email at login. See the file-header note above for the one
// real limitation: password storage here is not cryptographically secure,
// because there is no server-side secret to hash against.

function getUsers() {
  return readArray(LS_KEYS.users);
}

function saveUsers(users) {
  writeJSON(LS_KEYS.users, users);
}

function normalizeEmail(email) {
  return String(email || '').trim().toLowerCase();
}

function findUserByEmail(email) {
  const norm = normalizeEmail(email);
  return getUsers().find(u => u.email === norm) || null;
}

function registerUser({ email, firstName, lastName, password }) {
  if (isStorageDeclined()) return { ok: false, error: STORAGE_DECLINED_ERROR };
  const norm = normalizeEmail(email);
  firstName = String(firstName || '').trim();
  lastName = String(lastName || '').trim();
  password = String(password || '');
  if (!norm || !firstName || !lastName || !password) {
    return { ok: false, error: 'Please fill in every field.' };
  }
  if (!/^\S+@\S+\.\S+$/.test(norm)) {
    return { ok: false, error: 'Please enter a valid email address.' };
  }
  if (password.length < 4) {
    return { ok: false, error: 'Password must be at least 4 characters.' };
  }
  if (findUserByEmail(norm)) {
    return { ok: false, error: 'An account with that email already exists.' };
  }
  const users = getUsers();
  users.push({
    email: norm,
    firstName,
    lastName,
    passwordHash: obscurePassword(password)
  });
  saveUsers(users);
  setSession(norm);
  return { ok: true, user: findUserByEmail(norm) };
}

function loginUser(email, password) {
  if (isStorageDeclined()) return { ok: false, error: STORAGE_DECLINED_ERROR };
  const user = findUserByEmail(email);
  if (!user || user.passwordHash !== obscurePassword(password)) {
    return { ok: false, error: 'Incorrect email or password.' };
  }
  setSession(user.email);
  return { ok: true, user };
}

function setSession(email) {
  localStorage.setItem(LS_KEYS.session, email);
}

function logoutUser() {
  localStorage.removeItem(LS_KEYS.session);
}

function getCurrentUser() {
  const email = localStorage.getItem(LS_KEYS.session);
  if (!email) return null;
  return findUserByEmail(email);
}

function isLoggedIn() {
  return !!getCurrentUser();
}

function updateCurrentUser({ firstName, lastName }) {
  if (isStorageDeclined()) return { ok: false, error: STORAGE_DECLINED_ERROR };
  const current = getCurrentUser();
  if (!current) return { ok: false, error: 'Not logged in.' };
  firstName = String(firstName || '').trim();
  lastName = String(lastName || '').trim();
  if (!firstName || !lastName) {
    return { ok: false, error: 'First and last name cannot be empty.' };
  }
  const users = getUsers();
  const idx = users.findIndex(u => u.email === current.email);
  if (idx === -1) return { ok: false, error: 'User not found.' };
  users[idx] = { ...users[idx], firstName, lastName };
  saveUsers(users);
  return { ok: true, user: users[idx] };
}

// Redirect to login, remembering where to return to. Returns true if already
// logged in (caller can proceed), false if it just redirected away.
function requireLogin(returnToUrl) {
  if (isLoggedIn()) return true;
  const target = returnToUrl || (location.pathname.split('/').pop() + location.search);
  location.href = 'login.html?returnTo=' + encodeURIComponent(target);
  return false;
}

// ============================== CART ========================================

function getCartRaw() {
  const user = getCurrentUser();
  if (!user) return [];
  return readArray(cartKey(user.email));
}

function saveCartRaw(lines) {
  const user = getCurrentUser();
  if (!user) return;
  writeJSON(cartKey(user.email), lines);
}

function getCart() {
  return getCartRaw();
}

// Cart lines enriched with the matching album's current details.
function getCartWithDetails() {
  return getCartRaw()
    .map(line => {
      const album = getAlbumById(line.albumId);
      if (!album) return null;
      const lineTotal = Number(album.price) * line.qty;
      return { album, qty: line.qty, lineTotal };
    })
    .filter(Boolean);
}

function getCartCount() {
  return getCartRaw().reduce((sum, l) => sum + l.qty, 0);
}

function getCartTotal() {
  return getCartWithDetails().reduce((sum, l) => sum + l.lineTotal, 0);
}

function getCartQty(albumId) {
  const line = getCartRaw().find(l => l.albumId === String(albumId));
  return line ? line.qty : 0;
}

function isInCart(albumId) {
  return getCartQty(albumId) > 0;
}

function addToCart(albumId, qty) {
  if (isStorageDeclined()) return { ok: false, error: STORAGE_DECLINED_ERROR };
  const user = getCurrentUser();
  if (!user) return { ok: false, error: 'Log in to add albums to your cart.' };
  const addQty = Math.max(1, Math.floor(Number(qty)) || 1);
  const lines = getCartRaw();
  const existing = lines.find(l => l.albumId === String(albumId));
  if (existing) {
    existing.qty += addQty;
  } else {
    lines.push({ albumId: String(albumId), qty: addQty });
  }
  saveCartRaw(lines);
  return { ok: true, qty: existing ? existing.qty : addQty };
}

function setCartQty(albumId, qty) {
  if (isStorageDeclined()) return;
  const n = Math.floor(Number(qty)) || 0;
  let lines = getCartRaw();
  if (n <= 0) {
    lines = lines.filter(l => l.albumId !== String(albumId));
  } else {
    const existing = lines.find(l => l.albumId === String(albumId));
    if (existing) existing.qty = n;
    else lines.push({ albumId: String(albumId), qty: n });
  }
  saveCartRaw(lines);
}

function removeFromCart(albumId) {
  if (isStorageDeclined()) return;
  const lines = getCartRaw().filter(l => l.albumId !== String(albumId));
  saveCartRaw(lines);
}

function clearCart() {
  saveCartRaw([]);
}

// ============================== LIKES =======================================

function getLikedIdsRaw() {
  const user = getCurrentUser();
  if (!user) return [];
  return readArray(likesKey(user.email));
}

function saveLikedIds(ids) {
  const user = getCurrentUser();
  if (!user) return;
  writeJSON(likesKey(user.email), ids);
}

function getLikedIds() {
  return getLikedIdsRaw();
}

function getLikedAlbums() {
  return getLikedIdsRaw().map(getAlbumById).filter(Boolean);
}

function isLiked(albumId) {
  return getLikedIdsRaw().includes(String(albumId));
}

// Returns the new liked state (true = now liked).
function toggleLike(albumId) {
  if (isStorageDeclined()) return { ok: false, error: STORAGE_DECLINED_ERROR };
  const user = getCurrentUser();
  if (!user) return { ok: false, error: 'Log in to like albums.' };
  const id = String(albumId);
  let ids = getLikedIdsRaw();
  let liked;
  if (ids.includes(id)) {
    ids = ids.filter(x => x !== id);
    liked = false;
  } else {
    ids = [...ids, id];
    liked = true;
  }
  saveLikedIds(ids);
  return { ok: true, liked };
}

function removeLike(albumId) {
  if (isStorageDeclined()) return;
  saveLikedIds(getLikedIdsRaw().filter(x => x !== String(albumId)));
}

// ============================== ORDERS ======================================

function generateOrderId() {
  const stamp = Date.now().toString(36).toUpperCase();
  const rand = Math.random().toString(36).slice(2, 6).toUpperCase();
  return 'ORD-' + stamp + '-' + rand;
}

function getOrdersRaw() {
  const user = getCurrentUser();
  if (!user) return [];
  return readArray(ordersKey(user.email));
}

function saveOrdersRaw(orders) {
  const user = getCurrentUser();
  if (!user) return;
  writeJSON(ordersKey(user.email), orders);
}

// Newest first.
function getOrders() {
  return [...getOrdersRaw()].sort((a, b) => new Date(b.dateTime) - new Date(a.dateTime));
}

function getOrderById(orderId) {
  return getOrdersRaw().find(o => o.id === orderId) || null;
}

// Snapshots the current cart into a new order record, saves it, and empties
// the cart. Returns { ok:false, error } if the cart is empty or nobody's
// logged in.
function createOrderFromCart() {
  if (isStorageDeclined()) return { ok: false, error: STORAGE_DECLINED_ERROR };
  const user = getCurrentUser();
  if (!user) return { ok: false, error: 'Log in to complete a purchase.' };
  const details = getCartWithDetails();
  if (details.length === 0) return { ok: false, error: 'Your cart is empty.' };

  const items = details.map(d => ({
    albumId: d.album.id,
    name: d.album.name,
    band: d.album.band,
    cover: d.album.cover,
    price: d.album.price,
    qty: d.qty,
    lineTotal: Number((Number(d.album.price) * d.qty).toFixed(2))
  }));
  const totalAmount = Number(items.reduce((s, i) => s + i.lineTotal, 0).toFixed(2));
  const itemCount = items.reduce((s, i) => s + i.qty, 0);

  const order = {
    id: generateOrderId(),
    dateTime: new Date().toISOString(),
    items,
    totalAmount,
    itemCount
  };

  const orders = getOrdersRaw();
  orders.push(order);
  saveOrdersRaw(orders);
  clearCart();
  return { ok: true, order };
}
