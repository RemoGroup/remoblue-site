'use strict';
// A conceptual twenty-second loop, with ten seconds resting on the humanoid.
// No live tasks, video, or network requests.
(async function () {
  const figure = document.querySelector('.morph-hero');
  if (!figure) return;
  const stage = figure.querySelector('.morph-stage');
  const robot = figure.querySelector('.morph-humanoid');
  const glow = figure.querySelector('.morph-glow');
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
  const duration = 20000;
  const at = milliseconds => milliseconds / duration;
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
    const time = Number(main?.currentTime || 0) % duration;
    const text = time < 3000 || time >= 18000 ? 'Today · Your general manager starts here.'
      : time < 5500 ? 'Your business knowledge goes with you.'
      : time < 15500 ? 'The vision · Your future physical teammate.'
      : 'The same Remo. Back in your hands.';
    if (status.textContent !== text) status.textContent = text;
    if (main?.playState === 'running') frame = requestAnimationFrame(updateStatus);
  }
  function syncPlayback() {
    if (!main) return;
    cancelAnimationFrame(frame);
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
      const animation = element.animate(keyframes, { duration, iterations: Infinity, fill: 'both', easing: 'linear' });
      animation.pause(); animation.currentTime = time;
      animations.push(animation);
      return animation;
    }
    main = animate(phone, [
      { offset: at(0), transform: initial, opacity: 1, borderRadius: '34px' },
      { offset: at(3000), transform: initial, opacity: 1, borderRadius: '34px', easing: 'cubic-bezier(.4,0,.2,1)' },
      { offset: at(5000), transform: target, opacity: 1, borderRadius: '23px' },
      { offset: at(5500), transform: target, opacity: 0, borderRadius: '23px' },
      { offset: at(15500), transform: target, opacity: 0, borderRadius: '23px' },
      { offset: at(16000), transform: target, opacity: 1, borderRadius: '23px', easing: 'cubic-bezier(.4,0,.2,1)' },
      { offset: at(18000), transform: initial, opacity: 1, borderRadius: '34px' },
      { offset: at(20000), transform: initial, opacity: 1, borderRadius: '34px' }
    ]);
    const robotFrames = [
      { offset: at(0), opacity: 0 }, { offset: at(3000), opacity: 0 },
      { offset: at(4500), opacity: .35 }, { offset: at(5500), opacity: .94 },
      { offset: at(15500), opacity: .94 }, { offset: at(17000), opacity: .35 },
      { offset: at(18000), opacity: 0 }, { offset: at(20000), opacity: 0 }
    ];
    animate(robot, robotFrames);
    if (glow) animate(glow, robotFrames);
    const conversationFrames = [
      { offset: at(0), opacity: 1 }, { offset: at(3000), opacity: 1 },
      { offset: at(4200), opacity: 0 }, { offset: at(16600), opacity: 0 },
      { offset: at(18000), opacity: 1 }, { offset: at(20000), opacity: 1 }
    ];
    animate(conversation, conversationFrames);
    animate(dashboard, [
      { offset: at(0), opacity: 0 }, { offset: at(3300), opacity: 0 },
      { offset: at(4500), opacity: 1 }, { offset: at(16200), opacity: 1 },
      { offset: at(17700), opacity: 0 }, { offset: at(20000), opacity: 0 }
    ]);
    animate(notch, conversationFrames);
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
