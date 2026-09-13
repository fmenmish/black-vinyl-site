// js/pages/login.js
(function () {
  initHeaderFooter(null);

  const returnTo = new URLSearchParams(location.search).get('returnTo') || 'index.html';

  // Already logged in? Nothing to do here.
  if (isLoggedIn()) {
    location.href = returnTo;
    return;
  }

  const tabs = [
    { tab: document.getElementById('tab-login'), form: document.getElementById('form-login') },
    { tab: document.getElementById('tab-signup'), form: document.getElementById('form-signup') }
  ];

  function activateTab(target) {
    tabs.forEach(({ tab, form }) => {
      const isActive = form.id === target;
      tab.classList.toggle('active', isActive);
      form.classList.toggle('active', isActive);
    });
  }

  tabs.forEach(({ tab }) => {
    tab.addEventListener('click', () => activateTab(tab.dataset.target));
  });

  // Default to the Log In tab.
  activateTab('form-login');

  function showError(el, message) {
    el.textContent = message;
    el.classList.add('show');
  }

  function hideError(el) {
    el.textContent = '';
    el.classList.remove('show');
  }

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
