import type { CaseStudy } from '../data/projects';

const base = import.meta.env.BASE_URL;

/**
 * Build-time index of images per project, discovered from the static folder
 * /public/images/project/<slug>/. import.meta.glob resolves each asset URL at
 * build time — no runtime filesystem, no API.
 * ponytail: relies on Vite globbing files under public/ (they are copied
 * verbatim, not hashed). If a future Vite stops supporting public globs, swap
 * for a prebuild scan script that emits src/data/project-images.generated.ts.
 */
type GlobEntry = { default: { src: string } } | string;

const projectImageGlobs = import.meta.glob<{ default: { src: string } }>(
  '/public/images/project/*/*',
  { eager: true },
);

const IMAGE_EXTS = /\.(svg|webp|png|jpe?g|avif|gif)$/i;

function slugFromGlobKey(key: string): string | null {
  const m = key.match(/public\/images\/project\/([^/]+)\//);
  return m ? m[1] : null;
}

function urlFromEntry(entry: GlobEntry): string | null {
  if (typeof entry === 'string') return entry;
  if (entry && typeof entry === 'object' && entry.default && typeof entry.default.src === 'string') {
    return entry.default.src;
  }
  return null;
}

export const projectImagesBySlug: Record<string, string[]> = (() => {
  const out: Record<string, string[]> = {};
  for (const [key, entry] of Object.entries(projectImageGlobs)) {
    const slug = slugFromGlobKey(key);
    if (!slug || !IMAGE_EXTS.test(key)) continue;
    const url = urlFromEntry(entry);
    if (url) (out[slug] ||= []).push(url);
  }
  for (const slug of Object.keys(out)) out[slug].sort();
  return out;
})();

/**
 * Resolve the image list for a project.
 * Priority: images discovered from the static folder > explicit `images` > legacy single `image`.
 * Backward compatible: projects that only carry a legacy `image` (no folder) still render.
 */
export function resolveProjectImages(project: Pick<CaseStudy, 'slug' | 'images' | 'image'>): string[] {
  const fromFolder = project.slug ? projectImagesBySlug[project.slug] : null;
  if (fromFolder && fromFolder.length) return fromFolder;
  const explicit = project.images?.filter((img) => img && img.trim() !== '');
  if (explicit && explicit.length) return explicit;
  return project.image ? [project.image] : [];
}

/**
 * Resolve the preview videos for a project.
 * Videos are declared explicitly on the entry rather than globbed: only some
 * projects have them, and the order is intentional (first entry is the hover
 * preview on the card, then extra gallery clips).
 */
export function resolveProjectVideos(project: Pick<CaseStudy, 'slug' | 'videos'>): string[] {
  return (project.videos ?? []).filter((src) => src && src.trim() !== '');
}

/**
 * Build the URL of an image in a project's static folder by name.
 * /public/images/project/<slug>/<name> — static asset, works after build.
 */
export function projectImageUrl(slug: string, name = '1.svg'): string {
  return `${base}/images/project/${slug}/${name}`;
}

/**
 * Generate a URL-safe slug from a project title
 */
export function titleToSlug(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}
