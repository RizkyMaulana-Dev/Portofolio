// @ts-check
import { defineConfig } from 'astro/config';

import tailwindcss from '@tailwindcss/vite';
import icon from 'astro-icon'; // 1. Tambahkan import ini

// https://astro.build/config
export default defineConfig({
    site: 'https://github.com/RizkyMaulana-Dev.github.io',
    base: '/Portofolio',
    vite: {
        plugins: [tailwindcss()]
    },
    integrations: [
        icon()
    ],
});