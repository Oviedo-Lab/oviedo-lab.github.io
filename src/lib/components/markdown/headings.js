export default function headings() {
    let visit;
    let tree_to_string;
    let to_hast;
    let to_html;

    return async function transformer(tree, vFile) {
        if (!visit || !tree_to_string || !to_hast || !to_html) {
            // To quote, "The dynamic imports are weird but necessary due to how some of the remark/ unist utils are packages."
            // From the maintainer of mdsvex
            // https://github.com/pngwn/MDsveX/discussions/268#discussioncomment-831882
            tree_to_string = (await import("mdast-util-to-string")).toString;
            visit = (await import("unist-util-visit")).visit;
            to_hast = (await import("mdast-util-to-hast")).toHast;
            to_html = (await import("hast-util-to-html")).toHtml;
        }

        const data = vFile.data;
        data.headings = [];

        const visitFn = visit;
        const toString = tree_to_string;
        const toHast = to_hast;
        const toHtml = to_html;

        if (!visitFn || !toString || !toHast || !toHtml) return;

        visitFn(tree, "heading", (node) => {
            const headingHast = toHast(node);
            const titleHtml = Array.isArray(headingHast.children)
                ? headingHast.children.map((child) => toHtml(child)).join("")
                : "";

            data.headings?.push({
                level: node.depth,
                title: toString(node),
                titleHtml,
            });
        });

        if (!data.fm) data.fm = {};
        data.fm.headings = data.headings;
    };
}
