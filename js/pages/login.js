// js/pages/login.js
(function () {
  initHeaderFooter(null);

  const returnTo = new URLSearchParams(location.search).get('returnTo') || 'index.html';

  // Already logged in? Nothing to do here.
  if (isLoggedIn()) {
    location.href = returnTo;
    return;
  }

  // Carry returnTo across to the signup page too, so "Create one" from here
  // still lands back wherever requireLogin() originally sent them.
  const signupLink = document.getElementById('signup-link');
  if (signupLink && new URLSearchParams(location.search).get('returnTo')) {
    signupLink.href = 'signup.html?returnTo=' + encodeURIComponent(returnTo);
  }

  function showError(el, message) {
    el.textContent = message;
    el.classList.add('show');
  }

  function hideError(el) {
    el.textContent = '';
    el.classList.remove('show');
  }

  // Mirror email (not password) into a plain-text sibling div as the user
  // types, same idea as the static fields on the account page — some
  // resolvers read an element's text content rather than an <input>'s value
  // property. Visually hidden; the real <input> is still what the user sees
  // and types into.
  //
  // Synced three ways so it stays correct no matter how the value gets set:
  // 'input'/'change' catch real typing and most form-filling tools that
  // dispatch proper events, and the interval fallback catches anything that
  // sets .value directly with no event at all.
  function mirrorInto(inputId, staticId) {
    const input = document.getElementById(inputId);
    const staticEl = document.getElementById(staticId);
    if (!input || !staticEl) return;
    const sync = () => {
      if (staticEl.textContent !== input.value) staticEl.textContent = input.value;
    };
    input.addEventListener('input', sync);
    input.addEventListener('change', sync);
    setInterval(sync, 250);
    sync();
  }

  mirrorInto('login-email', 'login-email-static');

  const loginForm = document.getElementById('form-login');
  const loginError = document.getElementById('login-error');
  loginForm.addEventListener('submit', (e) => {
    e.preventDefault();
    hideError(loginError);
    const email = document.getElementById('login-email').value;
    const password = document.getElementById('login-password').value;
    const res = loginUser(email, password);
    if (res.ok) {
      location.href = returnTo;
    } else {
      showError(loginError, res.error);
    }
  });
})();
