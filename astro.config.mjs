// @ts-check
import { defineConfig } from 'astro/config';

import tailwindcss from '@tailwindcss/vite';
import icon from 'astro-icon'; // 1. Tambahkan import ini

// https://astro.build/config
const isVercel = process.env.VERCEL === '1';
const base = isVercel ? '/' : '/Portofolio';

export default defineConfig({
    site: 'https://rizkymaulana-dev.github.io',
    base,
    vite: {
        plugins: [tailwindcss()]
    },
    integrations: [
        icon()
    ],
});