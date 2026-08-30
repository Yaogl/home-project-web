export function routeToPageKey(path) {
  if (path === '/') return 'home';
  if (path.startsWith('/about')) return 'about';
  if (path.startsWith('/products')) return 'products';
  if (path.startsWith('/news')) return 'news';
  if (path.startsWith('/honors')) return 'honors';
  if (path.startsWith('/contact')) return 'contact';
  if (path.startsWith('/inquiry')) return 'inquiry';
  return 'home';
}

export function resolvePageStyle(styles, pageKey) {
  const defaults = {
    bgImageEnabled: false,
    bgImageUrl: '',
    bgColor: '#ffffff',
  };
  const global = { ...defaults, ...(styles.global || {}) };
  const page = styles[pageKey] ? { ...defaults, ...styles[pageKey] } : null;
  const s = page || global;
  const style = {
    minHeight: '100vh',
  };

  if (s.bgImageEnabled && s.bgImageUrl) {
    style.backgroundImage = `url(${s.bgImageUrl})`;
    style.backgroundSize = 'cover';
    style.backgroundPosition = 'center top';
    style.backgroundRepeat = 'no-repeat';
    style.backgroundAttachment = 'fixed';
    style.backgroundColor = s.bgColor || '#ffffff';
  } else {
    style.backgroundColor = s.bgColor || '#f0f4f8';
  }
  return style;
}
