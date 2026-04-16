(function () {
  const html = document.documentElement;
  const body = document.body;

  if ("scrollRestoration" in window.history) {
    window.history.scrollRestoration = "manual";
  }

  html.style.scrollBehavior = "auto";
  body.style.scrollBehavior = "auto";

  const scrollToTop = () => {
    window.scrollTo(0, 0);
    html.scrollTop = 0;
    body.scrollTop = 0;
  };

  scrollToTop();
  window.requestAnimationFrame(scrollToTop);
  window.setTimeout(scrollToTop, 80);
  window.setTimeout(scrollToTop, 240);
  window.setTimeout(() => {
    html.style.scrollBehavior = "";
    body.style.scrollBehavior = "";
  }, 400);

  window.addEventListener("pageshow", scrollToTop);
  window.addEventListener("load", scrollToTop);

  const headerShell = document.querySelector("[data-header-shell]");
  const menuToggle = document.querySelector("[data-menu-toggle]");
  const mobileNav = document.querySelector("[data-mobile-nav]");
  const mobileLinks = mobileNav ? mobileNav.querySelectorAll("a") : [];

  const onScroll = () => {
    if (headerShell) {
      headerShell.classList.toggle("scrolled", window.scrollY > 220);
    }
  };

  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });

  if (menuToggle && mobileNav) {
    menuToggle.addEventListener("click", () => {
      const isOpen = mobileNav.classList.toggle("is-open");
      menuToggle.classList.toggle("is-open", isOpen);
      menuToggle.setAttribute("aria-expanded", String(isOpen));
    });

    mobileLinks.forEach((link) => {
      link.addEventListener("click", () => {
        mobileNav.classList.remove("is-open");
        menuToggle.classList.remove("is-open");
        menuToggle.setAttribute("aria-expanded", "false");
      });
    });
  }

  const bindExclusiveAccordionGroup = (selector) => {
    const accordions = document.querySelectorAll(selector);

    accordions.forEach((accordion) => {
      const button = accordion.matches("button") ? accordion : accordion.querySelector("button");
      if (!button) {
        return;
      }

      button.addEventListener("click", () => {
        const willOpen = !accordion.classList.contains("is-open");

        accordions.forEach((item) => {
          const itemButton = item.matches("button") ? item : item.querySelector("button");
          item.classList.remove("is-open");
          if (itemButton) {
            itemButton.setAttribute("aria-expanded", "false");
          }
        });

        if (willOpen) {
          accordion.classList.add("is-open");
          button.setAttribute("aria-expanded", "true");
        }
      });
    });
  };

  bindExclusiveAccordionGroup(".services-grid [data-accordion]");
  bindExclusiveAccordionGroup(".faq-list [data-accordion]");

  const reveals = document.querySelectorAll(".reveal");
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.12,
      rootMargin: "0px 0px -80px 0px"
    }
  );

  reveals.forEach((element, index) => {
    element.style.transitionDelay = `${Math.min(index % 4, 3) * 0.05}s`;
    observer.observe(element);
  });
})();
