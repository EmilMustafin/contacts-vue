import path from 'node:path';
import vue from '@vitejs/plugin-vue';
import { defineConfig } from 'vite';
import { checker } from 'vite-plugin-checker';
import vueDevTools from 'vite-plugin-vue-devtools';

// https://vite.dev/config/
export default defineConfig({
    plugins: [
        vue(),
        checker({
            typescript: true,
            vueTsc: true,
        }),
        vueDevTools(),
    ],
    resolve: {
        alias: {
            '@': path.resolve(__dirname, 'src'),
        },
    },
});
