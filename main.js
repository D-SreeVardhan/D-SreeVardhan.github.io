/* Progressive enhancement only. Everything here is additive: with JavaScript
   disabled the page is a complete, readable document. */

(function () {
  "use strict";

  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* --- Reveal on scroll -------------------------------------------------- */
  /* The hiding class is applied from JS, never from the markup, so content
     cannot end up permanently invisible if this script fails to run. */
  function initReveal() {
    const targets = Array.from(document.querySelectorAll(".reveal"));
    if (!targets.length) return;

    if (prefersReducedMotion || !("IntersectionObserver" in window)) return;

    targets.forEach((el) => el.classList.add("reveal--armed"));

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        });
      },
      { rootMargin: "0px 0px -12% 0px", threshold: 0.05 }
    );

    targets.forEach((el) => observer.observe(el));
  }

  /* --- Active section in the rail ---------------------------------------- */
  function initRail() {
    const links = Array.from(document.querySelectorAll("[data-rail]"));
    if (!links.length || !("IntersectionObserver" in window)) return;

    const byId = new Map();
    links.forEach((link) => {
      const id = link.getAttribute("href").slice(1);
      const section = document.getElementById(id);
      if (section) byId.set(section, link);
    });
    if (!byId.size) return;

    const visible = new Set();

    const setCurrent = () => {
      // Topmost visible section wins, so the rail tracks reading position
      // rather than flickering between two sections in view at once.
      let best = null;
      visible.forEach((section) => {
        if (!best || section.offsetTop < best.offsetTop) best = section;
      });
      links.forEach((link) => link.removeAttribute("aria-current"));
      if (best) byId.get(best).setAttribute("aria-current", "true");
    };

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) visible.add(entry.target);
          else visible.delete(entry.target);
        });
        setCurrent();
      },
      { rootMargin: "-20% 0px -65% 0px", threshold: 0 }
    );

    byId.forEach((_link, section) => observer.observe(section));
  }

  /* --- Boot -------------------------------------------------------------- */
  function boot() {
    initReveal();
    initRail();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", boot, { once: true });
  } else {
    boot();
  }
})();
