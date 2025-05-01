import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';

export default defineConfig({
  plugins: [sveltekit()],
  optimizeDeps: {
    exclude: [
      'svelte',        // Exclude Svelte to avoid conflicts
      'tailwindcss',   // Exclude Tailwind CSS (in case it's causing issues)
      'postcss',       // Exclude PostCSS
      'autoprefixer'   // Exclude Autoprefixer
    ]
  }
});
