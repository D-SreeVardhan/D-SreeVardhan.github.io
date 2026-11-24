/* Progressive enhancement only. With JS disabled the page is still complete. */

(function () {
  "use strict";

  function initNav() {
    const links = Array.from(document.querySelectorAll("[data-nav]"));
    if (!links.length || !("IntersectionObserver" in window)) return;

    const bySection = new Map();
    links.forEach((link) => {
      const id = link.getAttribute("href").slice(1);
      const section = document.getElementById(id);
      if (section) bySection.set(section, link);
    });
    if (!bySection.size) return;

    const visible = new Set();

    const setCurrent = () => {
      // Topmost visible section wins, so the aside tracks reading position
      // rather than flickering between two sections in view at once.
      let best = null;
      visible.forEach((section) => {
        if (!best || section.offsetTop < best.offsetTop) best = section;
      });
      links.forEach((link) => link.removeAttribute("aria-current"));
      if (best) bySection.get(best).setAttribute("aria-current", "true");
    };

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) visible.add(entry.target);
          else visible.delete(entry.target);
        });
        setCurrent();
      },
      { rootMargin: "-20% 0px -55% 0px", threshold: 0 }
    );

    bySection.forEach((_link, section) => observer.observe(section));
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initNav, { once: true });
  } else {
    initNav();
  }
})();
