import { defineConfig } from 'vite';

export default defineConfig({
    root: 'src',
    server: {
        port: 5000,
    },
    build: {
        outDir: '../dist',
    }
});
