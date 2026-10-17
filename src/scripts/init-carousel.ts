const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

/** A slide counts as "tall" when its natural ratio beats the frame by this much. */
const PAN_TOLERANCE = 1.15;
/** Keep pan speed roughly constant (~70px/s) but never faster or slower than this. */
const PAN_PX_PER_SEC = 70;
const PAN_MIN_MS = 6000;
const PAN_MAX_MS = 14000;

document.querySelectorAll<HTMLElement>("[data-carousel]").forEach((el) => {
  if (el.dataset.carouselReady === "true") return;
  el.dataset.carouselReady = "true";

  const count = Number(el.dataset.count ?? 0);
  if (!count || count < 2) return;
  const interval = Number(el.dataset.interval ?? 2000);
  const videoDwell = Number(el.dataset.videoDwell ?? 12000);
  const slides = Array.from(el.querySelectorAll<HTMLElement>(".ic-slide"));
  let index = 0;
  let timer: number | undefined;
  let paused = false;

  const pans = new Map<HTMLElement, Animation | null>();

  /**
   * Mark a slide as tall and return the vertical travel available, or 0.
   * Measured at runtime: files under /public/ are served verbatim, so the glob
   * carries no width/height metadata.
   */
  function measurePan(slide: HTMLElement): number {
    const img = slide.querySelector<HTMLImageElement>("img");
    if (!img || !img.naturalWidth || !img.naturalHeight) return 0;

    const frameW = slide.clientWidth;
    const frameH = slide.clientHeight;
    if (!frameW || !frameH) return 0;

    const naturalRatio = img.naturalHeight / img.naturalWidth;
    const frameRatio = frameH / frameW;
    if (naturalRatio <= frameRatio * PAN_TOLERANCE) return 0;

    slide.classList.add("is-pan");
    // height:auto from CSS; the overflow is what we travel through.
    return Math.max(0, img.offsetHeight - frameH);
  }

  function startPan(slide: HTMLElement) {
    stopPan(slide);
    if (reducedMotion.matches) return;

    let travel = measurePan(slide);
    if (!travel) return;

    const img = slide.querySelector<HTMLImageElement>("img");
    if (!img) return;

    const duration = Math.min(
      PAN_MAX_MS,
      Math.max(PAN_MIN_MS, (travel / PAN_PX_PER_SEC) * 1000)
    );
    // alternate: scroll up, then back down, so there is no snap-back jump
    const animation = img.animate(
      [{ transform: "translateY(0px)" }, { transform: `translateY(${-travel}px)` }],
      { duration, direction: "alternate", iterations: Infinity, easing: "ease-in-out" }
    );
    pans.set(slide, animation);
  }

  function stopPan(slide: HTMLElement) {
    const animation = pans.get(slide);
    if (animation) animation.cancel();
    pans.delete(slide);
  }

  /** Hold a video slide no longer than its cap so the carousel never stalls. */
  function dwellFor(i: number): number {
    const hasVideo = Boolean(slides[i]?.querySelector("video"));
    return hasVideo ? videoDwell : interval;
  }

  function schedule() {
    stop();
    if (paused || reducedMotion.matches) return;
    timer = window.setTimeout(() => {
      applyIndex(index + 1, true);
    }, dwellFor(index));
  }

  function applyIndex(next: number, emit: boolean) {
    index = (next + count) % count;

    slides.forEach((slide, i) => {
      const active = i === index;
      slide.setAttribute("aria-hidden", String(!active));

      const video = slide.querySelector<HTMLVideoElement>("video");
      if (video) {
        if (active && !paused) {
          void video.play().catch(() => {});
        } else {
          video.pause();
        }
        return;
      }

      if (active) startPan(slide);
      else stopPan(slide);
    });

    el.style.setProperty("--i", String(index));
    el.dataset.index = String(index);

    if (emit) {
      el.dispatchEvent(
        new CustomEvent("carousel:index", {
          detail: { index },
          bubbles: true,
        })
      );
    }
    schedule();
  }

  function stop() {
    if (timer !== undefined) {
      window.clearTimeout(timer);
      timer = undefined;
    }
  }

  function pauseAll() {
    stop();
    slides.forEach((slide) => {
      slide.querySelector<HTMLVideoElement>("video")?.pause();
      stopPan(slide);
    });
  }

  function resumeAll() {
    if (paused) return;
    const video = slides[index]?.querySelector<HTMLVideoElement>("video");
    if (video) void video.play().catch(() => {});
    startPan(slides[index]);
    schedule();
  }

  el.addEventListener("mouseenter", () => {
    paused = true;
    pauseAll();
  });

  el.addEventListener("mouseleave", () => {
    paused = false;
    resumeAll();
  });

  el.addEventListener("carousel:jump", (event) => {
    const detail = (event as CustomEvent<{ index?: number }>).detail;
    if (typeof detail?.index === "number") {
      applyIndex(detail.index, true);
    }
  });

  el.addEventListener("carousel:pause", () => {
    paused = true;
    pauseAll();
  });

  el.addEventListener("carousel:resume", () => {
    paused = false;
    resumeAll();
  });

  const observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        // Off-screen: hold the timer without latching `paused`, so a later
        // hover/resume still works when it scrolls back into view.
        if (entry.isIntersecting) resumeAll();
        else {
          stop();
          slides.forEach((slide) => {
            slide.querySelector<HTMLVideoElement>("video")?.pause();
            stopPan(slide);
          });
        }
      }
    },
    { threshold: 0.25 }
  );
  observer.observe(el);

  // Re-measure when the frame changes size (column reflow, breakpoint switch).
  let resizeFrame = 0;
  const onResize = () => {
    window.cancelAnimationFrame(resizeFrame);
    resizeFrame = window.requestAnimationFrame(() => {
      if (!paused) startPan(slides[index]);
    });
  };
  window.addEventListener("resize", onResize, { passive: true });

  // Cached images are already complete before this script runs.
  slides.forEach((slide) => {
    const img = slide.querySelector<HTMLImageElement>("img");
    if (img?.complete) measurePan(slide);
    else img?.addEventListener("load", () => measurePan(slide), { once: true });
  });

  applyIndex(0, false);
});