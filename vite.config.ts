import { defineConfig } from 'vite';
import path from 'path';
import { sveltekit } from '@sveltejs/kit/vite';

export default defineConfig({
	plugins: [sveltekit()],
	resolve: {
		alias: {
			'@': path.resolve(__dirname, 'src'),
		},
	},
});
