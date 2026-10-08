# 🔧 REMEDIATION.md — Audit, Perbaikan & Redesign

| Metadata | Keterangan |
| :--- | :--- |
| **Proyek** | Personal Engineering Showcase & Portfolio Website |
| **Dokumen** | Laporan audit kode + rencana perbaikan + proposal redesign |
| **Versi** | v1.0.0 |
| **Tanggal** | Oktober 2026 |
| **Baseline Audit** | `astro 7.1.1` · `tailwindcss 4.3.3` · Node v26.7.0 · branch `agent` |
| **Metode Verifikasi** | `npm run build` → inspeksi `dist/` → pengukuran computed-style di Chromium headless |
| **Dokumen Terkait** | [PRD.md](PRD.md) · [DESIGN.md](DESIGN.md) |

---

## 0. Cara Kerja AI yang Membaca Dokumen Ini

Instruksi ini mengikat. Ikuti urutannya.

1. **Kerjakan P0 sebelum P1, P1 sebelum P2.** P0 adalah bug yang aktif merusak hasil produksi; P2 adalah pemolesan lanjutan. Jangan mencampur dalam satu commit.
2. **Satu commit per item.** Pesan commit format Conventional Commits (`fix(seo): …`, `chore: remove …`). Don't bundle fixes dengan refactor.
3. **Verifikasi dengan output nyata, bukan asumsi.** Setelah setiap perubahan jalankan `npm run build`, lalu inspeksi `dist/`. Untuk perubahan visual/CSS, ukur `getComputedStyle` di browser — jangan menebak cascade.
4. **Jangan menyentuh `base: '/Portofolio'`.** Semua path aset wajib lewat `import.meta.env.BASE_URL`. Ada dua tombol 404 yang sudah rusak karena lupa hal ini.
5. **Jangan menambah dependency baru** tanpa-justifikasi tertulis. Site ini sengaja zero-framework-runtime; setiap KB JS itu biaya.
6. **Jangan mengarang konten.** `credentialId: "XXXX-XXXX"`, `emailkamu@gmail.com`, dan username GitHub yang berbeda adalah placeholder. Hapus atau tanya, jangan tebak.
7. **Build harus tetap 8→4 halaman bersih.** Kalau `dist/` berisi file 0 byte, pekerjaanmu belum selesai.

> **Peringatan konteks checkout:** branch aktif adalah `agent`, tapi `.github/workflows/deploy.yml:5` hanya trigger di `main`. Ada 10 file termodifikasi belum ter-commit di `agent` (`git status`). **Perubahan tidak akan ter-deploy sampai di-merge ke `main`.** Konfirmasi ke user sebelum merge.

---

## 1. Ringkasan Temuan

42 temuan. Distribusi per severity:

| Severity | Jumlah | Arti |
| :--- | :--- | :--- |
| 🔴 **P0 — Blocker** | 7 | Rusak di produksi / merusak kredibilitas |
| 🟠 **P1 — High** | 11 | Salah, rusak, atau embarrassing saat visitor_manual |
| 🟡 **P2 — Medium** | 14 | Debt, inkonsistensi, dead code |
| 🔵 **P3 — Low** | 10 | Polish opsional |

**Tiga temuan yang paling merusak nilai bisnis:**

1. **`og:url` = `https://github.com/Portofolio/`** — setiap share ke LinkedIn/WhatsApp/Telegram membawa URL yang tidak ada. Tidak ada visitor yang sampai ke situs dari share tersebut.
2. **4 halaman HTML 0 byte ter-deploy** — `/projects/portfolio` dan tiga `/rahasia-admin/*`. GitHub Pages melayani HTTP 200 dengan body kosong; GoogIebot tidak punya apa pun untuk diindeks.
3. **Bug cascade CSS** — background `<body>` dikontrol `prefers-color-scheme`, bukan `.dark` class. User dengan OS gelap yang memilih mode terang mendapat teks gelap di atas latar gelap.

---

## 2. P0 — Blocker

### P0.1 · Empat halaman kosong ter-deploy

**Evidence:**
```
$ wc -c dist/**/*.html
0 dist/rahasia-admin/dashboard/index.html
0 dist/rahasia-admin/login/index.html
0 dist/rahasia-admin/index.html
0 dist/projects/portfolio/index.html
```

**Sumber:** `src/pages/projects/[slug].astro` (9 baris, stub `getStaticPaths`), `src/pages/rahasia-admin/{index,login,dashboard}.astro` (0 baris), `src/layouts/AdminLayout.astro` (0 baris), `src/pages/projects/index` (0 baris, tanpa ekstensi).

**Fix:**
```bash
rm src/pages/projects/'[slug].astro'
rm -r src/pages/rahasia-admin
rm src/layouts/AdminLayout.astro
rm src/pages/projects/index
```
Lalu update §1.2 tabel `<link rel="canonical">` dan DESIGN.md §1.1 diagram agar tidak menyebut halaman yang tidak ada.

**Verifikasi:** `npm run build` → harus melaporkan **4 halaman**, dan `find dist -name '*.html' -size 0` harus kosong.

**Kenapa P0:** ini bukan sekadar kode mati. GitHub Pages akan menyajikan dokumen kosong dengan status 200. Ini URL yang menjelaskan NOTHING tapi terlihat seperti niat yang sia-sia.

---

### P0.2 · `og:url` dan `twitter:url` menunjuk host yang salah

**Evidence** (`dist/index.html`):
```html
<meta property="og:url" content="https://github.com/Portofolio/">
<meta name="twitter:url" content="https://github.com/Portofolio/">
```

**Root cause:** `astro.config.mjs:9` → `site: 'https://github.com/RizkyMaulana-Dev.github.io'`. `Astro.url` diturunkan dari `site` + `base`, jadi hasilnya `https://github.com` + `/Portofolio/`. Nilai `site` adalah **URL repository GitHub**, bukan origin hosting.

**Fix** — `astro.config.mjs`:
```js
site: 'https://rizkymaulana-dev.github.io',
base: '/Portofolio',
```
Lalu `MainLayout.astro:38,45` otomatis benar karena `Astro.url.href` ikut ikut.

> ⚠️ **Jangan lupa:** nilai ini juga Ciceroa `rel=canonical` yang saat ini di-hardcode. Setelah ubah `site`, hardcode di `MainLayout.astro:28` **harus ikut diubah atau dihapus** agar tidak ada dua sumber kebenaran yang berbeda.

**Verifikasi:**
```bash
npm run build && grep -o 'og:url[^>]*' dist/index.html
# harus: og:url" content="https://rizkymaulana-dev.github.io/Portofolio/"
```

---

### P0.3 · `og-image.png` tidak ada + path-nya salah

**Evidence:** `public/og-image.png` MISS. Yang ter-build: `og:image" content="https://github.com/og-image.png"` — host salah **dan** file tidak ada. `public/apple-touch-icon.png` juga MISS dan path-nya **tidak** memakai prefix base.

**Fix:**
1. Buat `public/og-image.png` 1200×630 (kompresi < 300 KB), desain: nama besar, role, satu baris bio, aksen `blue-600`, kontras tinggi agar terbaca di feed LinkedIn yang gelap.
2. `MainLayout.astro:41,48` → gunakan base URL:
   ```astro
   <meta property="og:image" content={new URL(`${import.meta.env.BASE_URL}/og-image.png`, Astro.site)} />
   <meta name="twitter:image" content={new URL(`${import.meta.env.BASE_URL}/og-image.png`, Astro.site)} />
   ```
3. `MainLayout.astro:33` → perbaiki base path **dan** buat file-nya:
   ```astro
   <link rel="apple-touch-icon" href={`${import.meta.env.BASE_URL}/apple-touch-icon.png`} />
   ```
   (file `apple-touch-icon.png` 180×180 opaque, tanpa transparansi)

**Verifikasi:** `grep og:image dist/index.html` → host `rizkymaulana-dev.github.io`; `test -f dist/og-image.png && echo OK`.

---

### P0.4 · Bug cascade: background `<body>` tidak mengikuti theme toggle

**Evidence** — di-build CSS (`dist/_astro/Section.*.css`), `body{background:linear-gradient(...)}` berada **di luar `@layer`**, sedangkan utility Tailwind `.bg-white` / `.dark\:bg-neutral-950` berada **di dalam `@layer utilities`**. Di CSS, unlayered beating always menang atas layered.

Diukur di Chromium headless:

| Skenario | `body` background | Warna `<h1>` | Hasil |
| :--- | :--- | :--- | :--- |
| OS terang + mode terang | gradien putih | `oklch(0.205)` gelap | ✅ |
| OS gelap + mode gelap | gradien slate | `rgb(255,255,255)` | ✅ |
| **OS gelap + toggle ke terang** | **gradien slate** ❌ | `oklch(0.205)` gelap | ❌ kontras hancur |

Masalahnya bukan cuma mode terang: default dark-mode pun memakai slate `#0f172a`, **bukan** token `neutral-950` `#0a0a0a` yang dideklarasikan di DESIGN.md §2.1. Sistem warna tidak konsisten dengan dokumennya sendiri.

**Fix** — hapus aturan background `<body>` dari `global.css:14-24` sepenuhnya, biarkan Tailwind yang memegang:

```css
/* src/styles/global.css — delete these blocks:
   body { background: linear-gradient(...) }            ← hapus
   @media (prefers-color-scheme: dark) { body {...} }   ← hapus
*/
```
`MainLayout.astro:87-89` sudah memasang `bg-white … dark:bg-neutral-950` di `<body>`, dan utility itu akan berlaku begitu tidak ada yang menimpa secara unlayered.

Bila gradient tetap diinginkan, **wajib** dibungkus layer yang sama, atau dijadikan token Tailwind `@theme`. Jangan menuliskannya sebagai CSS global telanjang.

**Tambahan:** `global.css:104-107` menduplikasi blok `html { scroll-behavior: smooth }` yang sudah ada di baris 10-12. Hapus duplikatnya.

**Verifikasi — wajib di browser, bukan di mata:**
```js
// OS gelap, lalu klik #theme-toggle
document.getElementById('theme-toggle').click();
getComputedStyle(document.body).backgroundImage  // harus "none" atau sesuai mode terang
getComputedStyle(document.querySelector('h1')).color  // harus gelap
```

---

### P0.5 · Tombol 404: `href="/"` salah base + `javascript:` URL

**Evidence** (`dist/404.html`): `href="/"` dan `href="javascript:history.back()"`.

Di GitHub Pages (`/Portofolio/404.html`), `href="/"` mengarahkan visitor ke root domain — **bukan** ke portofolio. Tombol "Kembali ke Beranda" justru melempar user keluar dari situs. Dan `javascript:` URL adalah anti-pattern yang diblokir CSP, tidak bisa di-bookmark, dan tidak di-indeks.

**Fix** — `src/pages/404.astro`:
```astro
<Button href={import.meta.env.BASE_URL}>🏠 Kembali ke Beranda</Button>
<Button href="#" variant="secondary" data-history-back>⬅️ Halaman Sebelumnya</Button>

<script>
  document.querySelector('[data-history-back]')?.addEventListener('click', (e) => {
    e.preventDefault();
    if (history.length > 1) history.back(); else location.href = import.meta.env.BASE_URL;
  });
</script>
```
Perhatikan guard `history.length > 1` — itu yang hilang di versi sekarang: user yang membuka `/404` langsung dari bookmark akan mendapat halaman kosong saat menekan "kembali".

---

### P0.6 · Email placeholder bocor ke produksi

**Evidence:** `src/data/socials.ts:4` → `mailto:emailkamu@gmail.com`. Padahal `profile.ts:4` berisi `maulana.rizky.connect@gmail.com`. Footer memakai yang benar; kartu "Gmail" di `/links` memakai yang placeholder. **Tamu yang klik tombol kontak di halaman bio-link akan menghubungi orang yang salah.**

**Fix:** Jadikan email diturunkan dari `profile.email`, jangan literal URL:
```ts
// src/data/socials.ts
import { profile } from "./profile";
const subject = encodeURIComponent("Tertarik dengan Profil dan Portofolio Rizky Maulana");
const body = encodeURIComponent(`Halo Rizky,\n\n…`);
export const socials = [
  { name: "Gmail", url: `mailto:${profile.email}?subject=${subject}&body=${body}`, icon: "simple-icons:gmail" },
  // …
];
```
Ini menutup kelas bug-nya: satu email, satu sumber. Kalau `profile.email` berubah, semua tautan ikut.

---

### P0.7 · Direktori `public/images/certificates/` kosong

**Evidence:** direktori ada, **0 file**. `certificates.ts` menunjuk 6 SVG di dalamnya → **6 request 404 di setiap render halaman beranda** (mengganggu Lighthouse, dan card sertifikat tampil sebagai kotak abu).

**Fix (pilih salah satu, jangan keduanya):**
- **(a) Isi** — taruh screenshot sertifikat ke `public/images/certificates/` dengan nama yang cocok dengan `certificates.ts`.
- **(b) Hapus field `image`** dari semua entri `certificates.ts`. Komponen `Certificates.astro:66-76` **sudah punya fallback** `📜 Certificate Preview`, jadi hapus `image` aman secara visual.

> Rekomendasi: **(a)**. Sertifikat adalah bukti kapabilitas — bagian itu justru yang paling bernilai untuk recruiter. Tapi kalau screenshot belum ada, **(b) lebih jujur daripada 404**.

---

## 3. P1 — High

### P1.1 · Anchor navigasi `#footer` → `#contact`

`navigation.ts` menunjuk `${base}#footer`, tapi **tidak ada elemen dengan `id="footer"`**. Footer sebenarnya memberi `id` ke `Container`-nya, dan nilainya `"contact"` (`Footer.astro:12`). Klik "Contact" di navbar = scroll ke atas halaman, tidak ke footer.

**Fix:** `navigation.ts` → `href: \`${base}#contact\``.

### P1.2 · `profile.name` tercemar tagline

`profile.ts:2`: `name: "Rizky Maulana - Fullstack Developer from Indonesia"`. Dua komponen memaksa `.split(" - ")[0]` untuk merapikan (`Hero.astro:32`, `About.astro:75`), tapi dua tempat lain **bocor mentah**:
- `/links` H1 → `Rizky Maulana - Fullstack Developer from Indonesia`
- Footer copyright → `© 2026 Rizky Maulana - Fullstack Developer from Indonesia.`

**Fix — pisahkan concerns:**
```ts
// src/data/profile.ts
export const profile = {
  name: "Rizky Maulana",
  tagline: "Fullstack Developer from Indonesia",
  role: "Full Stack Web Developer",
  // …
};
```
Lalu hapus kedua `.split(" - ")` dan biarkan Footer memakai `profile.name` saja. Kalau `tagline` mau dipakai di H1 `/links`, render sebagai elemen terpisah.

### P1.3 · SSOT ganda: `portofolio.ts` vs `profile.ts`

Keduanya `export const profile`, isinya berbeda, dan `portofolio.ts` **tidak diimpor satu pun**. `portofolio.ts` juga punya `avatar: "/images/profile.webp"` tanpa `base` (path rusak) dan `bio: "Passionate Full Stack Developer..."` (placeholder).

**Fix:** `rm src/data/portofolio.ts`. Jika `avatar` dibutuhkan, tambahkan field `avatar` ke `profile.ts` dengan base URL yang benar.

### P1.4 · Username GitHub tidak konsisten di 3 tempat

| Lokasi | Nilai |
| :--- | :--- |
| `socials.ts:6` | `RizkyMaulana310807` |
| `MainLayout.astro:66` (JSON-LD) | `RizkyMaulana310807` |
| `projects.ts` (5× `githubUrl`) | `RizkyMaulana-Dev` |
| `astro.config.mjs:9` | `github.com/RizkyMaulana-Dev.github.io` |

Untuk developer yang mengaudit portofolio, ini sinyal pertama bahwa repo tidak dikelola rapi. **Tanyakan ke user mana yang benar**, lalu definisikan sekali di `profile.ts` (`githubUsername`) dan rujuk dari semua tempat. Jangan menebak.

### P1.5 · CLS: 3 `<img>` tanpa dimensi

PRD v1.0.0 menjanjikan CLS 0.00. Yang terjadi:

| File:line | Konteks |
| :--- | :--- |
| `src/pages/projects.astro:73` | Mockup proyek — `aspect-video` menjaga rasio, tapi dimensi intrinsik tetap kosong |
| `src/components/sections/FeaturedProject.astro:39` | Gambar kartu proyek — **paling Above the fold-ish**, paling berisiko |
| `src/components/sections/Certificates.astro:58` | Preview sertifikat |

Yang benar sudah ada di `Hero.astro:87-89` (`width={320} height={320}`) — follow pola itu.

**Fix:** tambahkan `width` dan `height` ke ketiga tag. Rasio sudah terkunci oleh `aspect-*` wrapper, jadi cukup angka intrinsik yang benar untuk Stories the browser.

### P1.6 · Judul proyek rusak: "School Management System Api"

**Evidence** (`dist/projects/index.html`): `>school management system api<` dengan class `capitalize`. CSS `capitalize` hanya menaikkan huruf awal tiap kata — tidak memperbaiki singkatan. Hasil: **"Api"**.

**Fix** — `projects.astro:92`: hapus `.toLowerCase()`, andalkan `capitalize` saja, atau lebih baik lagi gunakan proper case di sumber data. Mengubah tampilan data di presentasi adalah sumber bug seperti ini.

### P1.7 · `hidden-exp` akan menyembunyikan pengalaman ke-3 secara diam-diam

`Experience.astro:30` → `const isHiddenByDefault = index >= 2;` dan `:34` menambahkan class `hidden`. Tombol toggle-nya **dikomentari** (`:94-100`), tapi script-nya masih hidup (`:104`).

Hari ini aman karena hanya ada 2 entri. Begitu menambah pengalaman ke-3, **menghilang tanpa jejak** — tidak ada tombol untuk memunculkannya.

**Fix (pilih salah satu):**
- **(a)** Hapus seluruh logika `hidden-exp` + script mati. Tampilkan semua pengalaman. ← **rekomendasi**, hanya 2 entri, tidak perlu gate.
- **(b)** Jika nantiReally ada 5+ entri, implementasikan gate dengan benar: tombol nyata + `aria-expanded`.

Jangan biarkan kondisi yang bisa meledak diam-diam.

### P1.8 · Credential ID palsu: `XXXX-XXXX`

`certificates.ts` — 6 entri, semua `credentialId: "GL-XXXX-XXXX"` / `"DIC-XXXX-XXXX"` / `"FCC-XXXX-XXXX"` / `"CRS-XXXX-XXXX"`, plus `credentialUrl: "#"` (yang membuat komponen menyembunyikan tombol link, benar).

ID placeholder yang terlihat publik **lebih merusak** daripada tidak ada ID sama sekali. Rekruter akan mengklik dan menemukan kekosongan.

**Fix:** isi dengan ID asli, atau hapus field `credentialId`. Komponen sudah aman: `:141-146` hanya render bila ada.

### P1.9 · `canonical` hardcode sama untuk semua halaman

`MainLayout.astro:28` meng-hardcode `https://rizkymaulana-dev.github.io/Portofolio/` di **semua** halaman. Jadi `/projects` dan `/links` sama-sama mengklaim `/` sebagai canonical — sinyal kontradiktif ke Google.

**Fix:**
```astro
<link rel="canonical" href={Astro.url.href} />
```
`Astro.url` sudah benar setelah P0.2 diperbaiki.

### P1.10 · Workflow CI tidak pernah jalan untuk kerja ini

- `deploy.yml:5` → trigger hanya `push: branches: [main]`, sementara branch aktif `agent` dengan 10 file termodifikasi belum ter-commit.
- `deploy.yml:21` → `npm install`, seharusnya `npm ci` (d Deterministik,/manifes terkunci).
- **Tidak ada type check sama sekali.** `tsconfig.json` extends `astro/tsconfigs/strict` tapi tidak pernah dieksekusi.

**Fix:**
```yaml
- run: npm ci
- run: npx astro check        # butuh @astrojs/check, sudah devDep? tambahkan
- run: npm run build
```

### P1.11 · `.prettierrc` merujuk plugin yang tidak terinstal

`.prettierrc` mendaftarkan `prettier-plugin-astro` dan `prettier-plugin-tailwindcss`, tapi **`prettier` sendiri tidak ada** di devDependencies (terverifikasi: `prettier NOT INSTALLED`). Konfigasinya tidak aktif.

**Fix:** `npm i -D prettier prettier-plugin-astro prettier-plugin-tailwindcss` + script `format` / `format:check`.

---

## 4. P2 — Medium

### P2.1 · `Section.astro` menerima `id` lalu membuangnya
`Section.astro:4,7` mendeklarasikan `id?: string`, tapi `<section class={...}>` di `:9` tidak pernah memakainya. Saat ini tidak ada halaman yang mengalaminya, jadi ini bom waktu. Tambahkan `id={id}`, atau hapus prop-nya.

### P2.2 · CSS mati di `global.css` (~45 baris)
Verifikasi dengan pencocokan token class eksak di seluruh `.astro`:

| Class | Dipakai di |
| :--- | :--- |
| `.text-blue-gradient` (`:39-44`) | **0 file** |
| `.section` (`:47-64`) | **0 file** |
| `.card` (`:67-73`) | **0 file** |
| `.fade-in-up` + `@keyframes` (`:76-89`) | **0 file** |
| `.stagger > *` (`:92-102`) | **0 file** |
| `html{scroll-behavior}` (`:104-107`) | duplikat dari `:10-12` |

Hapus semua. `global.css` menyusut dari 125 → ~45 baris.

### P2.3 · Dependency mati
| Package | Status |
| :--- | :--- |
| `zod` 4.4.3 | ✅ terpasang, **0 import** di seluruh `src/`. Hapus. |
| `vite-tsconfig-paths` 6.1.1 | ✅ terpasang, **tidak terdaftar** di `astro.config.mjs`. Alias `@/` sudah disediakan native Astro. Hapus. |
| `eslint` 10.7.0 + `eslint-plugin-astro` | ✅ terpasang, **tidak ada file konfigurasi** (`eslint.config.js`).-ratio: tanpa config = 0 nilai. Pasang konfigurasi flat minimal atau hapus. |

### P2.4 · `tailwind.config.mjs` tidak berefek di v4
File ini masih berbentuk Tailwind v3 (`content`, `darkMode: 'class'`, `plugins`). Tailwind v4 membacanya hanya lewat `@config`. Yang benar-benar dipakai: `@custom-variant dark` di `global.css:8`. Kalau tidak butuh token kustom, hapus file ini.

### P2.5 · `<html lang="en">` tapi konten dan `SITE.locale` = `id-ID`
`MainLayout.astro:19` hardcode `lang="en"`. Screen reader dan SEO akan mengarang bahasa. Ubah ke `lang="id-ID"` (atau `{SITE.locale}`).

### P2.6 · `site.webmanifest` basi
`"name": "Portfolio Backend Developer"` — portfolio sudah pivot ke Full Stack. Dan `theme_color: "#2563eb"` tidak konsisten dengan `<body>` yang biru gelap. Perbarui, dan tambahkan `<meta name="theme-color">` di head dengan dua `media` (light/dark).

### P2.7 · `src/config/site.ts` tidak pernah dipakai
`url: "https://domainmu.com"` masih placeholder, dan **tidak ada file yang meng-import `src/config/site.ts`**. Setiap halaman meng-hardcode title/description sendiri.

**Fix:** jadikan `SITE` sebagai sumber title/description default di `MainLayout`, dan hapus `url` yang salah itu — atau isi dengan origin sebenarnya dan pakai untuk JSON-LD.

### P2.8 · `robots.txt` tidak ada
Tidak ada di `public/`. Untuk SSG di GitHub Pages, tambahkan:
```
User-agent: *
Allow: /
Sitemap: https://rizkymaulana-dev.github.io/Portofolio/sitemap-index.xml
```
(pty tanpa sitemap, skip baris terakhir.)

### P2.9 · Logika guard "live URL" berbeda di 3 tempat
| Lokasi | Kondisi |
| :--- | :--- |
| `projects.astro:59` | `!project.liveUrl \|\| project.liveUrl === '#'` |
| `FeaturedProject.astro:~113` | `project.liveUrl && project.liveUrl !== '#'` |
| `Certificates.astro:~123` | `cert.credentialUrl && cert.credentialUrl !== '#'` |

Tiga ekuivalen yang ditulis ulang. Buat satu helper di `src/utils/` — atau lebih baik, normalkan di sumber data: **kosongkan saja** `liveUrl` daripada menulis `"#"`, lalu guard cukup `if (project.liveUrl)`.

### P2.10 · `is:inline` di Navbar & ThemeToggle
`is:inline` berarti script tidak di-bundle maupun di-dedup, dan tidak punya `defer`. Saat ini aman karena di tempatkan setelah markup, tapi akan pecah begitu View Transitions ditambahkan. Pertimbangkan `is:inline` → `define:vars` atau script biasa dengan guard.

### P2.11 · Tombol filter sertifikat tanpa `aria-pressed`
`Certificates.astro:~40` — tombol filter hanya mengubah class, tidak ada state yang diumumkan. Tambahkan `aria-pressed={i === 0}` dan update di handler.

### P2.12 · Menu mobile tidak menutup setelah klik link
`Navbar.astro` — pengguna Android/iOS harus menekan hamburger dua kali untuk pindah halaman. Tambahkan handler penutup pada klik `<a>` di dalam `#mobile-menu`.

### P2.13 · Import `astro/components/Image.astro` (legacy)
`Hero.astro:6` dan `About.astro:5` memakai path lama. Yang idiomatik: `import { Image } from 'astro:assets'`. Build lolos, jadi ini technical cleanup, bukan breakage.

### P2.14 · README stale
`README.md` menyebut **Astro v4**, **Lucide Icons**, **`@astrojs/assets`**, **Cloudflare Pages / Vercel**. Semua salah: nyata Astro 7.1.1, `astro-icon` + `@iconify-json`, `astro:assets` bawaan, deploy GitHub Pages. README adalah aset recruiter pertama yang dibaca developer.

---

## 5. P3 — Low / Polish

1. **Badge animasi `10+ Projects` di Hero.astro:110** — angka hardcode, sedangkan `profile.projectsCount` = 10 sudah jadi sumber di `About.astro`. Duplikasi yang bisa menyimpang.
2. **`skill.level` 0-100 adalah data subjektif** — `skills.ts` punya 12 bar angka.Level di UI bisa/RSCT dipertanyakan ("UI/UX Design 70?"). Pertimbangkan sembunyikan angka, tampilkan sebagai kategori (Expert/Proficient) — lebih hemat dan tidak Clemens dipertanyakan.
3. **`techCategories` (6 label) vs `skills` (12 entri) tumpang tindih** — "Git" ada di `Tools & Design Platform` tapi juga entri `Git & GitHub`. Sumber kebenaran ganda untuk hal yang sama.
4. **`Experience.location` = `"Remote / 6 Month"`** — mencampur lokasi dengan durasi. Kolom terpisah.
5. **`projects.astro:79` masih menampilkan string developer-facing** — `💻 Mockup_${title}.png` sebagai fallback. Tidak pernah terlihat sekarang (semua proyek punya gambar) tapi akan bocor.
6. **Tambah `astro.config.mjs` `compressHTML: true`** — default Astro, tapi eksplisit menunjukkan niat.
7. **`og:type` hardcode `"website"`** di semua halaman. Untuk `/projects` dan `/links`, `"profile"` lebih akurat.
8. **`Footer.astro:41` `mailto:` tanpa subject** —_klik dari mana pun membuka mail client kosong. Gunakan subjek default yang sama dengan `socials.ts` (setelah P0.6).
9. **`SITE.locale` = `id-ID` tapi copy bercampur ID/EN.** Tidak salah, tapi RECORDING keputusan: kalauVisitor target recruiter THEN-WA, pertimbangkan `/en` locale terpisah (Astro i18n). **Jangan sekarang** — P0 dulu.
10. **Tidak ada `Lighthouse CI`.** Setelah P0 selesai, tambahkan budget (LCP < 1.2s, CLS 0, INP < 50ms) supaya regresi Performance tertangkap otomatis.

---

## 6. Proposition Redesign

Bagian ini **spekulasi**, bukan temuan. Pertimbangkan hanya setelah P0–P1 rampung.

### 6.1 Sistem Warna: hapus `@media (prefers-color-scheme: dark)` sepenuhnya

Setelah P0.4, warna gelap harus berasal **hanya** dari class `.dark`, yang bersumber dari satu tempat (`ThemeToggle` + anti-FOUC script). Keuntungan:

- Preferensi user menang atas OS, konsisten di semua browser.
- Hanya satu jalur penentuan warna → tidak bisa divergen.
- Overlay scrollbar (`.dark ::-webkit-scrollbar`) ikut benar.

### 6.2 Naikkan `Section` jadi pemilik spacing

Sekarang `Section.astro` hardcode `py-14` sebagai default, sementara setiap halaman meng-*override* dengan `py-20 sm:py-28`. Keduanya adalah utility Tailwind di layer yang sama, jadi **urutan di stylesheet yang menentukan**, bukan urutan di `class=""`.

Terverifikasi di CSS ter-build:
```
utilities-layer: .py-14  @ offset 27579
utilities-layer: .py-20  @ offset 27673   ← menang
```

Artinya `py-14` **mati** di semua halaman yang meng-override — bekerja karena kebetulan. Dan begitu ada halaman yang meminta `py-10` (offset lebih kecil), `py-14` justru menang dan spacing jadi **lebih besar** dari yang diminta.

**Fix:** jadikan `Section` satu-satunya pemilik vertical rhythm:
```astro
---
const { id, class: className = "", size = "default" } = Astro.props;
const sizes = { compact: "py-12 sm:py-20", default: "py-20 sm:py-28", tall: "py-20 sm:py-32" };
---
<section id={id} class={sizes[size]}>
```
Halaman berhenti menebak angka padding.

### 6.3 Satu helper untuk "link yang punya URL"

Ganti tiga guard berbeda (P2.9) dengan pola yangPushes kejujuran ke sumber data. Kalau tidak ada URL, field-nya `undefined` — bukan `""`, bukan `"#"`.

### 6.4 Ganti angka skill denganJenjang

Data 12 angka level adalah klaim yang paling rentan dikritik. Ganti `level: 85` → `tier: "Advanced" | "Proficient" | "Familiar"`, render sebagai badge. Lebih jujur, dan menghapus JS animasi `requestAnimationFrame` yang saat inichnology complexity belote.

**Trade-off:** bar animasi memang terlihat bagus dan sudah bekerja. Pertahankan bar, tapi jangan tampilkan angka persisnya — atau bulatkan ke kelipatan 5.

### 6.5 Ubah `/projects` jadi grid, bukan alternating row

Alternating kiri-kanan butuh JS `applyFilters` 40 baris hanya untuk menjaga ritme visual setelah filter. Alternatif: grid 2 kolom responsif, kartu membesar penuh. Hapus seluruh algoritma re-order. Trade-off: kehilangan "editorial feel" — putuskan yang mana yang lebih penting.

**Rekomendasi: pertahankan yang ada.** Algoritma bekerja dan sudah teruji; kompleksitas tersebut terbayar dengan tepat.

### 6.6 Hapus `is:inline`, siapkan View Transitions (opsional)

Astro 7 mendukung `<ClientRouter />` untuk navigasi antar halaman tanpa full reload — sangat terasa pada filter dan scroll restoration. **Syarat:** semua `is:inline` pindah ke script biasa supaya tidak dieksekusi ganda. Hanya setelah P0/P1 stabil.

---

## 7. Rencana Eksekusi

### Sprint 1 — P0 (estimasi ~1 jam)
```bash
rm src/pages/projects/'[slug].astro' src/pages/projects/index
rm -r src/pages/rahasia-admin src/layouts/AdminLayout.astro src/utils/constants.ts
# perbaiki site: di astro.config.mjs
# perbaiki body background di global.css
# perbaiki 404 href + BASE_URL
# perbaiki socials.ts agar diturunkan dari profile.email
# nginx, og-image.png, apple-touch-icon.png, isi atau kosongkan images/certificates/
npm run build   # harus: 4 halaman, 0 file 0-byte
```

### Sprint 2 — P1 (~2 jam)
Anchor `#contact` · pisahkan `name`/`tagline` · hapus `portofolio.ts` · seragamkan GitHub username (TANYA USER) · dimensi 3 `<img>` · title proyek · hapus `hidden-exp` · ID sertifikat · canonical dinamis · CI `npm ci` + `astro check`.

### Sprint 3 — P2 (~1.5 jam)
CSS mati · dependency mati · `tailwind.config.mjs` · `lang` · webmanifest · `SITE` jadi SSOT · robots.txt · guard URL terpusat · `aria-pressed` · menu mobile close · README.

### Verifikasi akhir (wajib untuk semua sprint)
```bash
npm run build
find dist -name '*.html' -size 0                  # harus kosong
grep -o 'og:url[^>]*'    dist/index.html         # host benar
grep -o 'og:image[^>]*'  dist/index.html         # host + path benar
find dist -type f | while read f; do rel=${f#dist}; \
  grep -qo "/Portofolio${rel}" dist/*.html dist/**/*.html 2>/dev/null; done
# browser: light & dark, 320px & 1440px, keyboard-only nav, reduced-motion
```

---

## 8. Appendiks — Audit Methodology

Supaya AI berikutnya bisa mengulang atau mempertanyakan temuan:

| Langkah | Perintah / Teknik |
| :--- | :--- |
| Baseline build | `npm run build` → cat route list |
| Deteksi halaman kosong | `find dist -name '*.html' -exec wc -c {} \;` |
| Deteksi file sumber kosong | `find src -type f -empty` |
| Deteksi dead import | `grep -rn "from '@/data/…' src/` silangkan cari di `src/data/*.ts` |
| Deteksi asset hilang | `find public -type f` vs path yang dirujuk di `src/data/*.ts` |
| Verifikasi SEO | `grep -oE 'og:[a-z]+[^>]*' dist/index.html` |
| **Verifikasi cascade** | baca file CSS di `dist/_astro/*.css`, petakan `@layer` dengan brace-matching, bandingkan offset |
| **Verifikasi visual** | Chromium headless + `getComputedStyle`, **bukan** screenshot (model ini tidak bisa melihat gambar) |
| Aset URL | `base: '/Portofolio'` → **setiap** path wajib `import.meta.env.BASE_URL` |

**Keputusan yang belum bisa diambil tanpa user:** username GitHub mana yang benar (P1.4), email asli (P0.6), ID kredensial asli (P1.8), dan apakah `liveUrl` yang kosong berarti "belum ada demo" atau "URL salah" (P2.9). Jangan menebak angka bisnis.