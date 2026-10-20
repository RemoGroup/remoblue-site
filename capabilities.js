'use strict';
// Presentation only. No connected accounts, business actions, or live customer data.
const roleNavigation = document.querySelector('.role-navigation');
const roleLinks = [...document.querySelectorAll('[data-role-link]')];
const rolePanels = [...document.querySelectorAll('[data-role]')];

if (roleNavigation && roleLinks.length && rolePanels.length) {
  function showRole(key, {focusPanel = false} = {}) {
    const selected = rolePanels.find(panel => panel.dataset.role === key);
    if (!selected) return;
    rolePanels.forEach(panel => { panel.hidden = panel !== selected; });
    roleLinks.forEach(link => {
      if (link.dataset.roleLink === key) link.setAttribute('aria-current', 'true');
      else link.removeAttribute('aria-current');
    });
    if (focusPanel) selected.focus({preventScroll: true});
  }
  function roleFromHash() {
    return rolePanels.find(panel => `#${panel.id}` === window.location.hash)?.dataset.role;
  }
  document.documentElement.classList.add('roles-enhanced');
  const initialRole = roleFromHash();
  showRole(initialRole || 'executive');
  // A browser may resolve an initial fragment while its panel is still hidden.
  // Settle the fonts/layout, then honor the visitor's original destination.
  if (initialRole) {
    const restoreInitialDestination = async () => {
      if (document.fonts) await document.fonts.ready;
      if (roleFromHash() !== initialRole) return;
      rolePanels.find(panel => panel.dataset.role === initialRole).scrollIntoView({behavior: 'instant', block: 'start'});
    };
    if (document.readyState === 'complete') restoreInitialDestination();
    else window.addEventListener('load', restoreInitialDestination, {once: true});
  }
  // Real links preserve deep links, keyboard activation, browser history, and no-JS access.
  roleLinks.forEach(link => {
    link.addEventListener('click', () => showRole(link.dataset.roleLink, {focusPanel: true}));
  });
  // The hero brief can link directly into a role that is currently hidden.
  document.querySelectorAll('a[href^="#role-"]').forEach(link => {
    if (link.hasAttribute('data-role-link')) return;
    link.addEventListener('click', () => {
      const selected = rolePanels.find(panel => `#${panel.id}` === link.getAttribute('href'));
      if (selected) showRole(selected.dataset.role, {focusPanel: true});
    });
  });
  window.addEventListener('hashchange', () => {
    const key = roleFromHash();
    if (key) {
      const selected = rolePanels.find(panel => panel.dataset.role === key);
      const wasHidden = selected.hidden;
      showRole(key);
      if (wasHidden) selected.scrollIntoView({behavior: 'instant', block: 'start'});
    }
  });
}

const integrationFilters = document.querySelector('.integration-filters');
const integrationButtons = [...document.querySelectorAll('[data-integration-filter]')];
const integrationTiles = [...document.querySelectorAll('[data-integration-family]')];
const integrationCount = document.querySelector('.integration-count');
if (integrationFilters && integrationButtons.length && integrationTiles.length) {
  function filterIntegrations(key) {
    let count = 0;
    integrationTiles.forEach(tile => {
      const visible = key === 'all' || tile.dataset.integrationFamily.split(' ').includes(key);
      tile.hidden = !visible;
      if (visible) count++;
    });
    integrationButtons.forEach(button => button.setAttribute('aria-pressed', String(button.dataset.integrationFilter === key)));
    if (integrationCount) integrationCount.textContent = `${count} ${count === 1 ? 'connection' : 'connections'}${key === 'all' ? ' across your business' : ' in this category'}`;
  }
  integrationFilters.hidden = false;
  integrationButtons.forEach(button => button.addEventListener('click', () => filterIntegrations(button.dataset.integrationFilter)));
  filterIntegrations('all');
}
