// js/pages/home.js
(function () {
  initHeaderFooter(null);

  const user = getCurrentUser();
  renderHero(document.getElementById('hero-root'), {
    image: user ? HERO_LOGGED_IN_IMG : HERO_LOGGED_OUT_IMG,
    eyebrow: 'BlackVinyl Records',
    title: user ? `Welcome back, ${escapeHTML(user.firstName)}.` : 'Metal. Metalcore. Punk. Rock.',
    subtitle: user
      ? 'Pick up where you left off — new pressings just landed across every genre.'
      : 'A record store for people who like their music loud. Create an account to start building your collection.',
    actionsHTML: user
      ? `<a href="genre.html?c=metal" class="btn btn-primary">Browse Metal</a><a href="liked.html" class="btn btn-outline">Your Liked Albums</a>`
      : `<a href="signup.html" class="btn btn-primary">Create an Account</a><a href="genre.html?c=metal" class="btn btn-outline">Browse Albums</a>`
  });

  document.getElementById('stat-albums').textContent = ALBUMS.length;
  document.getElementById('stat-bands').textContent = getAllBands().length;

  const sections = [
    { id: 'carousel-metal', category: 'metal' },
    { id: 'carousel-metalcore', category: 'metalcore' },
    { id: 'carousel-punk', category: 'punk' },
    { id: 'carousel-rock', category: 'rock' }
  ];

  function renderAllCarousels() {
    sections.forEach(s => {
      renderCarousel(document.getElementById(s.id), {
        id: s.id,
        title: CATEGORY_LABELS[s.category] + ' — Newest Releases',
        albums: getRecentByCategory(s.category, 12),
        viewAllHref: 'genre.html?c=' + s.category
      });
    });
  }

  renderAllCarousels();
  onAlbumCardsChanged(renderAllCarousels);
})();
