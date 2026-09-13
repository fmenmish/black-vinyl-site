// js/pages/account.js
(function () {
  initHeaderFooter(null);
  if (!requireLogin()) return;

  const emailEl = document.getElementById('account-email');
  const firstNameStatic = document.getElementById('account-first-name');
  const lastNameStatic = document.getElementById('account-last-name');
  const viewSection = document.getElementById('account-view');
  const form = document.getElementById('account-form');
  const firstNameInput = document.getElementById('firstName');
  const lastNameInput = document.getElementById('lastName');
  const errorEl = document.getElementById('account-error');
  const editBtn = document.getElementById('account-edit-btn');
  const cancelBtn = document.getElementById('account-cancel-btn');

  // Email/first/last name are always rendered as plain text in these static
  // divs (not just as input values) so their current values are readable
  // straight from the DOM — e.g. by test/automation resolvers that read
  // element text rather than an <input>'s value property.
  function renderStatic(u) {
    emailEl.textContent = u.email;
    firstNameStatic.textContent = u.firstName;
    lastNameStatic.textContent = u.lastName;
  }

  renderStatic(getCurrentUser());

  function showError(message) {
    errorEl.textContent = message;
    errorEl.classList.add('show');
  }

  function hideError() {
    errorEl.textContent = '';
    errorEl.classList.remove('show');
  }

  function enterEditMode() {
    const current = getCurrentUser();
    firstNameInput.value = current.firstName;
    lastNameInput.value = current.lastName;
    hideError();
    viewSection.hidden = true;
    form.hidden = false;
  }

  function exitEditMode() {
    form.hidden = true;
    viewSection.hidden = false;
  }

  editBtn.addEventListener('click', enterEditMode);
  cancelBtn.addEventListener('click', exitEditMode);

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    hideError();

    const firstName = firstNameInput.value.trim();
    const lastName = lastNameInput.value.trim();

    const res = updateCurrentUser({ firstName, lastName });
    if (!res.ok) {
      showError(res.error || 'Could not update your profile.');
      return;
    }

    renderStatic(res.user);
    exitEditMode();
    showToast('Profile updated', 'success');
    renderHeader(null);
  });
})();
