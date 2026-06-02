export function createKey(category, query, offset, limit) {
  const safeCategory = category || '';
  const safeQuery = query || '';
  const safeOffset = typeof offset === 'number' ? offset : 0;
  const safeLimit = typeof limit === 'number' ? limit : 0;
  return [safeCategory, safeQuery, safeOffset, safeLimit].join('|');
}

export function isServerError(status) {
  return status >= 500 && status <= 599;
}

export function createElement(tag, options = {}) {
  const el = document.createElement(tag);
  if (options.className) {
    el.className = options.className;
  }
  if (options.text) {
    el.textContent = options.text;
  }
  if (options.attrs) {
    Object.entries(options.attrs).forEach(([key, value]) => {
      el.setAttribute(key, String(value));
    });
  }
  return el;
}

export function nowMs() {
  return Date.now();
}
