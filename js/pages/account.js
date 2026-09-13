// js/pages/account.js
(function () {
  initHeaderFooter(null);
  if (!requireLogin()) return;

  const user = getCurrentUser();

  document.getElementById('account-email').textContent = user.email;
  document.getElementById('firstName').value = user.firstName;
  document.getElementById('lastName').value = user.lastName;

  const form = document.getElementById('account-form');
  const errorEl = document.getElementById('account-error');

  function showError(message) {
    errorEl.textContent = message;
    errorEl.classList.add('show');
  }

  function hideError() {
    errorEl.textContent = '';
    errorEl.classList.remove('show');
  }

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    hideError();

    const firstName = document.getElementById('firstName').value.trim();
    const lastName = document.getElementById('lastName').value.trim();

    const res = updateCurrentUser({ firstName, lastName });
    if (!res.ok) {
      showError(res.error || 'Could not update your profile.');
      return;
    }

    showToast('Profile updated', 'success');
    renderHeader(null);
  });
})();
