const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

document.querySelectorAll<HTMLElement>("[data-carousel]").forEach((el) => {
  if (el.dataset.carouselReady === "true") return;
  el.dataset.carouselReady = "true";

  const count = Number(el.dataset.count ?? 0);
  if (!count || count < 2) return;
  const interval = Number(el.dataset.interval ?? 2000);
  const slides = el.querySelectorAll<HTMLElement>(".ic-slide");
  let index = 0;
  let timer: number | undefined;
  let paused = false;

  function applyIndex(next: number, emit: boolean) {
    index = (next + count) % count;
    el.style.setProperty("--i", String(index));
    el.dataset.index = String(index);
    slides.forEach((slide, i) => slide.setAttribute("aria-hidden", String(i !== index)));
    if (emit) {
      el.dispatchEvent(
        new CustomEvent("carousel:index", {
          detail: { index },
          bubbles: true,
        })
      );
    }
  }

  function start() {
    stop();
    if (paused || reducedMotion.matches) return;
    timer = window.setInterval(() => applyIndex(index + 1, true), interval);
  }

  function stop() {
    if (timer !== undefined) {
      window.clearInterval(timer);
      timer = undefined;
    }
  }

  el.addEventListener("mouseenter", () => {
    paused = true;
    stop();
  });

  el.addEventListener("mouseleave", () => {
    paused = false;
    start();
  });

  el.addEventListener("carousel:jump", (event) => {
    const detail = (event as CustomEvent<{ index?: number }>).detail;
    if (typeof detail?.index === "number") {
      applyIndex(detail.index, true);
      start();
    }
  });

  el.addEventListener("carousel:pause", () => {
    paused = true;
    stop();
  });

  el.addEventListener("carousel:resume", () => {
    paused = false;
    start();
  });

  const observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) start();
        else stop();
      }
    },
    { threshold: 0.25 }
  );
  observer.observe(el);

  applyIndex(0, false);
});
