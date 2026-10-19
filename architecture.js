'use strict';
(() => {
  const frame = document.querySelector('#architecture-graphic');
  const button = document.querySelector('#architecture-motion-toggle');
  if (!frame || !button) return;
  const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)');
  let wantsMotion = true;
  let frameVisible = false;
  const syncMotion = () => {
    const running = wantsMotion && !reducedMotion.matches && !document.hidden && frameVisible;
    frame.querySelectorAll('svg[data-layout]').forEach(svg => {
      svg.dataset.motion = running ? 'running' : 'paused';
    });
    button.disabled = reducedMotion.matches;
    button.textContent = reducedMotion.matches ? 'Reduced motion enabled' : wantsMotion ? 'Pause animation' : 'Play animation';
  };
  button.hidden = false;
  button.addEventListener('click', () => { wantsMotion = !wantsMotion; syncMotion(); });
  reducedMotion.addEventListener('change', syncMotion);
  document.addEventListener('visibilitychange', syncMotion);
  if ('IntersectionObserver' in window) {
    new IntersectionObserver(entries => {
      frameVisible = entries[0].isIntersecting;
      syncMotion();
    }, {rootMargin:'100px'}).observe(frame);
  } else frameVisible = true;
  syncMotion();
})();
