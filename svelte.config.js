import adapterStatic from '@sveltejs/adapter-static';
import preprocess from 'svelte-preprocess';
import { vitePreprocess } from '@sveltejs/kit/vite';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	preprocess: vitePreprocess({ preprocess: [preprocess({ postcss: true })] }),

	kit: {
		adapter: adapterStatic(),
	},
};

export default config;
