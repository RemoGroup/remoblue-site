'use strict';
// A conceptual seven-second story. No live tasks, video, or network requests.
(async function () {
  const figure = document.querySelector('.morph-hero');
  if (!figure) return;
  const stage = figure.querySelector('.morph-stage');
  const robot = figure.querySelector('.morph-humanoid');
  const phone = figure.querySelector('.morph-phone');
  const conversation = figure.querySelector('.phone-interface');
  const dashboard = figure.querySelector('.phone-dashboard');
  const notch = figure.querySelector('.phone-notch');
  const controls = figure.querySelector('.morph-controls');
  const status = figure.querySelector('.morph-status');
  const pause = document.querySelector('#morph-pause');
  const replay = document.querySelector('#morph-replay');
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)');
  const still = new URLSearchParams(window.location.search).get('motion') === 'off';
  const duration = 7000;
  let animations = [], main, frame = 0, inView = false, userPaused = false;
  let started = false, ready = false, size = '';

  function clearAnimations() {
    cancelAnimationFrame(frame);
    animations.forEach(animation => { animation.onfinish = null; animation.cancel(); });
    animations = []; main = undefined;
  }
  function staticView() {
    clearAnimations();
    figure.classList.remove('is-animated');
    figure.dataset.playback = 'static';
    controls.hidden = true;
    status.textContent = 'Today on your phone · Future humanoid vision';
  }
  function updateStatus() {
    const time = Number(main?.currentTime || 0);
    const text = time < 2600 ? 'Today · Your general manager starts here.'
      : time < 5300 ? 'Your business knowledge goes with you.'
      : 'The vision · Your future physical teammate.';
    if (status.textContent !== text) status.textContent = text;
    if (main?.playState === 'running') frame = requestAnimationFrame(updateStatus);
  }
  function syncPlayback() {
    if (!main) return;
    cancelAnimationFrame(frame);
    if (Number(main.currentTime) >= duration) {
      figure.dataset.playback = 'complete';
      pause.disabled = true;
      pause.textContent = 'Complete';
      pause.setAttribute('aria-label', 'Animation complete');
      updateStatus();
      return;
    }
    pause.disabled = false;
    pause.textContent = userPaused ? 'Resume' : 'Pause';
    pause.setAttribute('aria-label', userPaused ? 'Resume animation' : 'Pause animation');
    if (userPaused || !inView || document.hidden) {
      animations.forEach(animation => animation.pause());
      figure.dataset.playback = userPaused ? 'paused' : 'waiting';
    } else {
      started = true;
      animations.forEach(animation => animation.play());
      figure.dataset.playback = 'playing';
    }
    updateStatus();
  }
  function build(time = 0) {
    clearAnimations();
    figure.classList.add('is-animated');
    const { width, height } = stage.getBoundingClientRect();
    size = `${width}:${height}`;
    // Match the chest bezel in the approved 1536 × 1024 artwork, including
    // the centered crop produced by object-fit: cover at every breakpoint.
    const scale = Math.max(width / 1536, height / 1024);
    const imageX = (width - 1536 * scale) / 2;
    const imageY = (height - 1024 * scale) / 2;
    const initialScale = Math.min(1, (height - 48) / 420, (width - 44) / 260);
    const initial = `translate(${(width - 260 * initialScale) / 2}px, ${(height - 420 * initialScale) / 2}px) scale(${initialScale})`;
    const target = `translate(${imageX + 552 * scale}px, ${imageY + 543 * scale}px) scale(${419 * scale / 260}, ${459 * scale / 420})`;
    function animate(element, keyframes) {
      const animation = element.animate(keyframes, { duration, fill: 'both', easing: 'linear' });
      animation.pause(); animation.currentTime = time;
      animations.push(animation);
      return animation;
    }
    main = animate(phone, [
      { offset: 0, transform: initial, opacity: 1, borderRadius: '34px' },
      { offset: .37, transform: initial, opacity: 1, borderRadius: '34px', easing: 'cubic-bezier(.4,0,.2,1)' },
      { offset: .69, transform: target, opacity: 1, borderRadius: '23px' },
      { offset: .83, transform: target, opacity: 0, borderRadius: '23px' },
      { offset: 1, transform: target, opacity: 0, borderRadius: '23px' }
    ]);
    animate(robot, [
      { offset: 0, opacity: 0 }, { offset: .37, opacity: 0 },
      { offset: .54, opacity: .3 }, { offset: .79, opacity: .94 },
      { offset: 1, opacity: .94 }
    ]);
    animate(conversation, [
      { offset: 0, opacity: 1 }, { offset: .38, opacity: 1 },
      { offset: .52, opacity: 0 }, { offset: 1, opacity: 0 }
    ]);
    animate(dashboard, [
      { offset: 0, opacity: 0 }, { offset: .43, opacity: 0 },
      { offset: .57, opacity: 1 }, { offset: 1, opacity: 1 }
    ]);
    animate(notch, [
      { offset: 0, opacity: 1 }, { offset: .38, opacity: 1 },
      { offset: .52, opacity: 0 }, { offset: 1, opacity: 0 }
    ]);
    main.onfinish = syncPlayback;
    controls.hidden = false;
    syncPlayback();
  }
  function configure() {
    if (!ready || reduced.matches || still || !phone.animate || !window.IntersectionObserver) {
      staticView(); return;
    }
    started = false; userPaused = false;
    build();
  }
  pause.addEventListener('click', () => { userPaused = !userPaused; syncPlayback(); });
  replay.addEventListener('click', () => {
    if (!main || reduced.matches || still) return;
    userPaused = false;
    animations.forEach(animation => { animation.pause(); animation.currentTime = 0; });
    syncPlayback();
  });
  document.addEventListener('visibilitychange', syncPlayback);
  reduced.addEventListener('change', configure);

  if (!robot.complete) await new Promise(resolve => {
    robot.addEventListener('load', resolve, { once: true });
    robot.addEventListener('error', resolve, { once: true });
  });
  if (!robot.naturalWidth) { staticView(); return; }
  ready = true;
  if (window.IntersectionObserver) {
    new IntersectionObserver(entries => {
      inView = entries[0].isIntersecting && entries[0].intersectionRatio >= .35;
      syncPlayback();
    }, { threshold: [0, .35] }).observe(stage);
  }
  if (window.ResizeObserver) {
    new ResizeObserver(() => {
      const { width, height } = stage.getBoundingClientRect();
      if (main && `${width}:${height}` !== size) build(started ? Number(main.currentTime || 0) : 0);
    }).observe(stage);
  }
  configure();
})();
