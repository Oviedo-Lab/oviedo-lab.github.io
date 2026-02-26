import tailwindcss from '@tailwindcss/vite';
import { sveltekit } from '@sveltejs/kit/vite';
import { enhancedImages } from '@sveltejs/enhanced-img';
import wasmPack from "vite-plugin-wasm-pack";
import { defineConfig } from 'vite';
import path from "path";

export default defineConfig({
	optimizeDeps: {
		exclude: ["@rollup/browser"]
	},
	plugins: [
		tailwindcss(),
		enhancedImages(), // must come before the SvelteKit plugin
		sveltekit(),
		wasmPack("./src/lib-wasm"),
	],
	resolve: {
        alias: {
            '$lib': path.resolve('./src/lib/'),
        },
    },
    server: {
        port: 5180 // This is the dev port, default is 5173
    },
    preview: {
        port: 4189 // This is the preview port, default is 4173
    },
	build: {
		minify: 'esbuild',
		cssMinify: true,
		rollupOptions: {
			output: {
				compact: true
			}
		}
	},
	esbuild: {
		legalComments: 'none',
		minifyIdentifiers: true,
		minifySyntax: true,
		minifyWhitespace: true
	}
});
