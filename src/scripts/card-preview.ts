/**
 * Hover preview for project cards: play a muted looping video over the still
 * carousel while the pointer is on the card.
 *
 * Visibility is toggled from JS (not a `group-hover:` utility) on purpose.
 * Tailwind gates `hover:` variants behind `@media (hover: hover)`, so a
 * CSS-only fade-in can desync from the JS play/pause on hybrid or headless
 * environments — leaving a video that plays invisibly. Driving both from the
 * same listener keeps them in lockstep on every device.
 */
const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

const HIDDEN = "opacity-0";
const VISIBLE = "opacity-100";

function show(video: HTMLVideoElement) {
  video.classList.remove(HIDDEN);
  video.classList.add(VISIBLE);
}

function hide(video: HTMLVideoElement) {
  video.classList.remove(VISIBLE);
  video.classList.add(HIDDEN);
}

document.querySelectorAll<HTMLVideoElement>("[data-card-preview]").forEach((video) => {
  // The hover container is an <article> on the homepage but a div.project-row
  // on /projects, so bind by explicit marker rather than by tag name.
  const card = video.closest<HTMLElement>("[data-card]");
  if (!card) return;

  card.addEventListener("mouseenter", () => {
    if (reducedMotion.matches) return;
    show(video);
    video.play().catch(() => {});
  });

  card.addEventListener("mouseleave", () => {
    video.pause();
    if (video.currentTime) video.currentTime = 0;
    hide(video);
  });

  // Touch/keyboard: no hover, so the video never leaves its paused first frame.
  video.addEventListener("focus", () => {
    video.pause();
    hide(video);
  });
});