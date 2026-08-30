/** 轻量 Toast 提示（替代 alert） */

let seed = 0;

function mountToast(message, type) {
  const id = `app-toast-${++seed}`;
  const el = document.createElement('div');
  el.id = id;
  el.className = `app-toast app-toast-${type}`;
  el.textContent = message;
  document.body.appendChild(el);
  requestAnimationFrame(() => el.classList.add('is-show'));
  window.setTimeout(() => {
    el.classList.remove('is-show');
    window.setTimeout(() => el.remove(), 280);
  }, 2600);
}

export function toast(message, type = 'info') {
  if (!message) return;
  mountToast(message, type);
}

export function toastSuccess(message) {
  toast(message, 'success');
}

export function toastWarning(message) {
  toast(message, 'warning');
}

export function toastError(message) {
  toast(message, 'error');
}
