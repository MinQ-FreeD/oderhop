import { defineConfig } from 'vite';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  return {
    plugins: [
      {
        name: 'add-random-suffix',
        transformIndexHtml(html) {
          return html.replace(/src="(.*?)"/g, (match, p1) => {
            if (p1 === 'index.html') return match;
            const randomSuffix = Math.random().toString(36).substring(2, 8);
            return `src="${p1}?v=${randomSuffix}"`;
          });
        },
      },
    ],
  };
});
