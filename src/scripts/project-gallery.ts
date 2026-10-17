/**
 * Gallery interactions for a project detail page: thumb sync, fullscreen
 * lightbox, and keyboard navigation.
 *
 * This lives in src/ (not an inline `define:vars` block) because Astro leaves
 * `define:vars` scripts unprocessed, so TypeScript syntax in them throws a
 * SyntaxError and the whole block silently dies.
 */
function initGallery(section: HTMLElement) {
  const carousel = section.querySelector<HTMLElement>(".gallery-main");
  const thumbs = Array.from(section.querySelectorAll<HTMLButtonElement>(".gallery-thumb"));
  const openBtn = section.querySelector<HTMLButtonElement>("#gallery-open");

  let images: string[] = [];
  try {
    images = JSON.parse(section.dataset.galleryImages ?? "[]") as string[];
  } catch {
    images = [];
  }
  const videoCount = Number(section.dataset.galleryVideoCount ?? 0);

  // Media order is videos first, then images, so a media index shifts by this.
  const toImageIndex = (mediaIndex: number) => mediaIndex - videoCount;

  const state = { index: 0 };

  function syncThumbs() {
    thumbs.forEach((thumb, i) => {
      const active = i === state.index;
      thumb.classList.toggle("border-blue-600", active);
      thumb.classList.toggle("border-transparent", !active);
      thumb.setAttribute("aria-selected", String(active));
    });
    // Nothing to enlarge while a video slide is showing.
    openBtn?.classList.toggle("hidden", toImageIndex(state.index) < 0);
  }

  document.addEventListener("carousel:index", (event) => {
    const detail = (event as CustomEvent<{ index?: number }>).detail;
    if (typeof detail?.index === "number") {
      state.index = detail.index;
      syncThumbs();
    }
  });

  thumbs.forEach((thumb) =>
    thumb.addEventListener("click", () => {
      const next = Number(thumb.dataset.index);
      if (Number.isNaN(next)) return;
      state.index = next;
      syncThumbs();
      carousel?.dispatchEvent(new CustomEvent("carousel:jump", { detail: { index: next } }));
    })
  );

  // ---- Lightbox (images only) ----
  const lightbox = document.getElementById("lightbox");
  const lightboxImg = document.getElementById("lightbox-img");
  let lightboxIndex = 0;

  function showLightbox(mediaIndex: number) {
    const imgIndex = toImageIndex(mediaIndex);
    if (imgIndex < 0 || !images.length) return;
    lightboxIndex = (imgIndex + images.length) % images.length;
    if (lightboxImg) lightboxImg.src = images[lightboxIndex];
    carousel?.dispatchEvent(new CustomEvent("carousel:pause"));
    lightbox?.classList.remove("hidden");
    lightbox?.classList.add("flex");
  }

  function hideLightbox() {
    lightbox?.classList.add("hidden");
    lightbox?.classList.remove("flex");
    carousel?.dispatchEvent(new CustomEvent("carousel:resume"));
  }

  /** Once open, the lightbox pages through images only — never video slides. */
  function stepLightbox(delta: number) {
    if (!images.length) return;
    lightboxIndex = (lightboxIndex + delta + images.length) % images.length;
    if (lightboxImg) lightboxImg.src = images[lightboxIndex];
  }

  openBtn?.addEventListener("click", () => showLightbox(state.index));
  document.getElementById("lightbox-close")?.addEventListener("click", hideLightbox);
  document.getElementById("lightbox-prev")?.addEventListener("click", () => stepLightbox(-1));
  document.getElementById("lightbox-next")?.addEventListener("click", () => stepLightbox(1));
  lightbox?.addEventListener("click", (e) => {
    if (e.target === lightbox) hideLightbox();
  });

  document.addEventListener("keydown", (e) => {
    if (!lightbox?.classList.contains("flex")) return;
    if (e.key === "Escape") hideLightbox();
    if (e.key === "ArrowLeft") stepLightbox(-1);
    if (e.key === "ArrowRight") stepLightbox(1);
  });

  syncThumbs();
}

document.querySelectorAll<HTMLElement>("[data-gallery]").forEach(initGallery);