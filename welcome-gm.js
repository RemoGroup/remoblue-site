"use strict";
(() => {
  const channel = "remogm-public-gm";
  const loopback = ["localhost", "127.0.0.1"].includes(location.hostname);
  const origin = loopback
    ? "http://127.0.0.1:4174"
    : "https://remoblue-platform.onrender.com";
  const storageKey = "remogm.gm-welcome.dismissed-at.v1";
  const sevenDays = 7 * 24 * 60 * 60 * 1000;
  let available = false;
  let ready = false;
  let active = false;
  let returnFocus = null;
  let dismissedInMemory = false;
  const dialog = document.createElement("dialog");
  dialog.className = "gm-welcome-dialog";
  dialog.setAttribute("aria-label", "Meet one of our GMs");
  const close = document.createElement("button");
  close.type = "button";
  close.className = "gm-welcome-close";
  close.setAttribute(
    "aria-label",
    "Close GM conversation and explore the site",
  );
  close.textContent = "×";
  const frame = document.createElement("iframe");
  frame.src = `${origin}/meet-gm.html`;
  frame.title = "Meet a RemoGM — interactive AI general manager";
  frame.allow = "microphone; autoplay";
  frame.referrerPolicy = "strict-origin-when-cross-origin";
  const launcher = document.createElement("button");
  launcher.type = "button";
  launcher.className = "gm-welcome-launcher";
  launcher.hidden = true;
  launcher.setAttribute("aria-haspopup", "dialog");
  const emblem = document.createElement("img");
  emblem.src = "/remoblue-emblem.svg?v=20261020-gold";
  emblem.alt = "";
  launcher.append(emblem, document.createTextNode("Talk with a GM"));
  dialog.append(close, frame);
  document.body.append(dialog, launcher);
  const send = (type) =>
    frame.contentWindow?.postMessage({ channel, type }, origin);
  function rememberDismissal() {
    dismissedInMemory = true;
    try {
      localStorage.setItem(storageKey, String(Date.now()));
    } catch {
      /* Browsing remains available with storage disabled. */
    }
  }
  function recentlyDismissed() {
    if (dismissedInMemory) return true;
    try {
      const value = Number(localStorage.getItem(storageKey));
      return (
        Number.isFinite(value) && value > 0 && Date.now() - value < sevenDays
      );
    } catch {
      return false;
    }
  }
  function open(trigger) {
    if (dialog.open) return;
    returnFocus = trigger || document.activeElement;
    // Close the existing mobile menu before opening the native focus-trapping dialog.
    const menu = document.querySelector(".menu-toggle");
    const mobile = document.querySelector("#mobile-nav");
    if (mobile) mobile.hidden = true;
    if (menu) {
      menu.setAttribute("aria-expanded", "false");
      menu.setAttribute("aria-label", "Open navigation");
    }
    dialog.showModal();
    document.documentElement.classList.add("gm-welcome-scroll-lock");
    launcher.hidden = true;
    close.focus();
    if (ready) send("host-open");
  }
  function dismiss() {
    if (!dialog.open) return;
    rememberDismissal();
    send("host-close");
    dialog.close();
  }
  close.addEventListener("click", dismiss);
  launcher.addEventListener("click", () => open(launcher));
  dialog.addEventListener("cancel", (event) => {
    event.preventDefault();
    dismiss();
  });
  dialog.addEventListener("close", () => {
    send("host-close");
    document.documentElement.classList.remove("gm-welcome-scroll-lock");
    active = false;
    launcher.hidden = !available;
    if (returnFocus?.isConnected) returnFocus.focus({ preventScroll: true });
  });
  document.addEventListener("click", (event) => {
    const trigger = event.target.closest("[data-meet-gm]");
    if (
      !trigger ||
      event.defaultPrevented ||
      event.button !== 0 ||
      event.metaKey ||
      event.ctrlKey ||
      event.shiftKey ||
      event.altKey
    )
      return;
    event.preventDefault();
    open(trigger);
  });
  window.addEventListener("message", (event) => {
    if (
      event.origin !== origin ||
      event.source !== frame.contentWindow ||
      event.data?.channel !== channel
    )
      return;
    if (event.data.type === "ready") {
      ready = true;
      if (dialog.open) send("host-open");
    } else if (event.data.type === "config") {
      available = event.data.available === true;
      launcher.hidden = !available || dialog.open;
      if (
        available &&
        location.pathname === "/" &&
        !recentlyDismissed() &&
        !dialog.open
      )
        open(null);
    } else if (event.data.type === "close") dismiss();
    else if (event.data.type === "status") active = event.data.active === true;
  });
  // Closing, navigating, or hiding the host always releases a paid session in the child.
  window.addEventListener("pagehide", () => send("host-close"));
  document.addEventListener("visibilitychange", () => {
    if (document.hidden && active) send("host-close");
  });
})();
