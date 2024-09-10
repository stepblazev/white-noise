import { defineConfig } from 'vite';

export default defineConfig({
    root: 'src',
    server: {
      port: 5000,
      open: './index.ru.html'
    },
    build: {
        outDir: '../dist',
        rollupOptions: {
            input: {
                main: './src/index.ru.html',
            }
        }
    }
});
