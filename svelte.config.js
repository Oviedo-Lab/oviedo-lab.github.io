import { mdsvex } from 'mdsvex';
import rehypeExternalLinks from 'rehype-external-links';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import rehypeSlug from 'rehype-slug';
import relativeImages from "mdsvex-relative-images";
/**
 * @import {ElementContent} from 'hast'
 */
import {fromHtmlIsomorphic} from 'hast-util-from-html-isomorphic';
import headings from './src/lib/components/markdown/headings.ts';
import firstParagraph from './src/lib/components/markdown/first-paragraph.ts';

import adapter from '@sveltejs/adapter-static';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';
import { join } from "path";
const dirname = import.meta.dirname;
const resolveRelPath = (relativePath) => join(dirname, relativePath);

const linkSvg = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-link-icon lucide-link"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg>`;

/** @type {import('@sveltejs/kit').Config} */
/** @type {Array<ElementContent>} */
const config = {
	preprocess: [
		mdsvex({
			smartypants: {
				quotes: true,
				ellipses: true,
				backticks: false,
				dashes: "oldschool",
			},
			layout: {
				"tech-n-tools": resolveRelPath("./src/lib/components/markdown/layouts/tech-n-tools/tech-n-tools.svelte"),
				"publications": resolveRelPath("./src/lib/components/markdown/layouts/publications/publications.svelte"),
				_: resolveRelPath("./src/lib/components/markdown/layouts/default/default.svelte"),
			},
			extensions: ['.svx', '.md'],
			remarkPlugins: [
				relativeImages,
				headings,
				firstParagraph,
			],
			rehypePlugins: [
				[rehypeExternalLinks, { rel: ['nofollow', 'noopener', 'noreferrer'], target: '_blank' }],
				rehypeSlug,
				[rehypeAutolinkHeadings, {
					behavior: 'append',
					content: fromHtmlIsomorphic(
						linkSvg,
						{fragment: true}
					).children 
				}],
			],
		}),
		
		vitePreprocess(),
	],
	kit: {
		adapter: adapter(
			{
				pages: 'build',
				assets: 'build',
				fallback: '404.html',
				precompress: false,
				strict: true,
			}
		),
		paths: {
			base: process.argv.includes('dev') ? '' : process.env.BASE_PATH
		},
		alias: {
			'$src': 'src',
			'$lib': 'src/lib',
			'$routes': 'src/routes',
			'$content': 'src/content',
		}
	},
	extensions: ['.svelte', '.svx', '.md'],
};

export default config;