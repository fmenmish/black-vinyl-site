// js/pages/signup.js
(function () {
  initHeaderFooter(null);

  const returnTo = new URLSearchParams(location.search).get('returnTo') || 'index.html';

  // Already logged in? Nothing to do here.
  if (isLoggedIn()) {
    location.href = returnTo;
    return;
  }

  // Carry returnTo across to the login page too, so "Log in" from here
  // (e.g. someone who actually already has an account) still lands back
  // wherever requireLogin() originally sent them.
  const loginLink = document.getElementById('login-link');
  if (loginLink && new URLSearchParams(location.search).get('returnTo')) {
    loginLink.href = 'login.html?returnTo=' + encodeURIComponent(returnTo);
  }

  function showError(el, message) {
    el.textContent = message;
    el.classList.add('show');
  }

  function hideError(el) {
    el.textContent = '';
    el.classList.remove('show');
  }

  // Mirror first/last name/email (not password) into a plain-text sibling
  // div as the user types, same idea as the static fields on the account
  // page — some resolvers read an element's text content rather than an
  // <input>'s value property. Visually hidden; the real <input> is still
  // what the user sees and types into.
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

  mirrorInto('signup-first-name', 'signup-first-name-static');
  mirrorInto('signup-last-name', 'signup-last-name-static');
  mirrorInto('signup-email', 'signup-email-static');

  const signupForm = document.getElementById('form-signup');
  const signupError = document.getElementById('signup-error');
  signupForm.addEventListener('submit', (e) => {
    e.preventDefault();
    hideError(signupError);
    const firstName = document.getElementById('signup-first-name').value;
    const lastName = document.getElementById('signup-last-name').value;
    const email = document.getElementById('signup-email').value;
    const password = document.getElementById('signup-password').value;
    const res = registerUser({ email, firstName, lastName, password });
    if (res.ok) {
      location.href = returnTo;
    } else {
      showError(signupError, res.error);
    }
  });
})();
