(() => {
  'use strict';

  const root = document.documentElement;
  const themeButton = document.querySelector('[data-theme-toggle]');
  const themeIcon = document.querySelector('[data-theme-icon]');
  const navToggle = document.querySelector('[data-nav-toggle]');
  const nav = document.querySelector('[data-nav]');
  const header = document.querySelector('[data-header]');
  const year = document.querySelector('[data-year]');

  const setTheme = (theme) => {
    root.dataset.theme = theme;
    root.style.colorScheme = theme;
    if (themeIcon) themeIcon.textContent = theme === 'dark' ? '☀' : '◐';
    if (themeButton) themeButton.setAttribute('aria-label', `Switch to ${theme === 'dark' ? 'light' : 'dark'} theme`);
  };

  const savedTheme = localStorage.getItem('wz-theme');
  const systemPrefersLight = window.matchMedia('(prefers-color-scheme: light)').matches;
  setTheme(savedTheme || (systemPrefersLight ? 'light' : 'dark'));

  themeButton?.addEventListener('click', () => {
    const nextTheme = root.dataset.theme === 'dark' ? 'light' : 'dark';
    localStorage.setItem('wz-theme', nextTheme);
    setTheme(nextTheme);
  });

  navToggle?.addEventListener('click', () => {
    const isOpen = nav?.classList.toggle('is-open') || false;
    navToggle.setAttribute('aria-expanded', String(isOpen));
  });

  nav?.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      nav.classList.remove('is-open');
      navToggle?.setAttribute('aria-expanded', 'false');
    });
  });

  document.addEventListener('click', (event) => {
    if (!nav?.classList.contains('is-open')) return;
    if (nav.contains(event.target) || navToggle?.contains(event.target)) return;
    nav.classList.remove('is-open');
    navToggle?.setAttribute('aria-expanded', 'false');
  });

  const updateHeader = () => header?.classList.toggle('is-scrolled', window.scrollY > 12);
  updateHeader();
  window.addEventListener('scroll', updateHeader, { passive: true });

  if (year) year.textContent = String(new Date().getFullYear());

  const revealItems = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries, currentObserver) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('is-visible');
        currentObserver.unobserve(entry.target);
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px' });

    revealItems.forEach((item) => observer.observe(item));
  } else {
    revealItems.forEach((item) => item.classList.add('is-visible'));
  }

  const repoCards = [...document.querySelectorAll('[data-repo]')];
  const formatter = new Intl.DateTimeFormat('en-US', { month: 'short', year: 'numeric' });

  const updateRepoMetadata = async (card) => {
    const repo = card.dataset.repo;
    const meta = card.querySelector('[data-repo-meta]');
    if (!repo || !meta) return;

    try {
      const response = await fetch(`https://api.github.com/repos/sactowilly/${encodeURIComponent(repo)}`, {
        headers: { Accept: 'application/vnd.github+json' }
      });
      if (!response.ok) throw new Error(`GitHub API returned ${response.status}`);

      const data = await response.json();
      const updated = data.pushed_at ? formatter.format(new Date(data.pushed_at)) : null;
      const stars = Number.isFinite(data.stargazers_count) && data.stargazers_count > 0
        ? ` · ${data.stargazers_count} star${data.stargazers_count === 1 ? '' : 's'}`
        : '';

      meta.textContent = updated ? `Updated ${updated}${stars}` : `Public GitHub repo${stars}`;
    } catch (error) {
      meta.textContent = 'Public GitHub repo';
    }
  };

  repoCards.forEach(updateRepoMetadata);
})();
