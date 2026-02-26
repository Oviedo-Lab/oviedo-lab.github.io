import type { Paragraph, Root } from "mdast";
import type { VFile } from "vfile";

type FirstParagraph = {
	text: string;
	html: string;
};

type FrontmatterData = Record<string, unknown> & {
	firstParagraph?: FirstParagraph;
};

type FirstParagraphVFileData = Record<string, unknown> & {
	firstParagraph?: FirstParagraph;
	fm?: FrontmatterData;
};

export default function firstParagraph() {
	let visit: typeof import("unist-util-visit").visit | undefined;
	let tree_to_string: typeof import("mdast-util-to-string").toString | undefined;
	let to_hast: typeof import("mdast-util-to-hast").toHast | undefined;
	let to_html: typeof import("hast-util-to-html").toHtml | undefined;

	return async function transformer(tree: Root, vFile: VFile) {
		if (!visit || !tree_to_string || !to_hast || !to_html) {
			// To quote, "The dynamic imports are weird but necessary due to how some of the remark/ unist utils are packages."
			// From the maintainer of mdsvex
			// https://github.com/pngwn/MDsveX/discussions/268#discussioncomment-831882
			tree_to_string = (await import("mdast-util-to-string")).toString;
			visit = (await import("unist-util-visit")).visit;
			to_hast = (await import("mdast-util-to-hast")).toHast;
			to_html = (await import("hast-util-to-html")).toHtml;
		}

		const data = vFile.data as FirstParagraphVFileData;
		data.firstParagraph = undefined;

		const visitFn = visit;
		const toString = tree_to_string;
		const toHast = to_hast;
		const toHtml = to_html;

		if (!visitFn || !toString || !toHast || !toHtml) return;

		visitFn(tree, "paragraph", (node: Paragraph) => {
			if (!data.firstParagraph) {
				const paragraphHast = toHast(node) as { children?: unknown[] };
				const html = Array.isArray(paragraphHast.children)
					? paragraphHast.children.map((child) => toHtml(child as Parameters<typeof toHtml>[0])).join("")
					: "";

				data.firstParagraph = {
					text: toString(node).trim(),
					html,
				};
			}
		});

		if (!data.fm) data.fm = {};
		data.fm.firstParagraph = data.firstParagraph;
	};
}
