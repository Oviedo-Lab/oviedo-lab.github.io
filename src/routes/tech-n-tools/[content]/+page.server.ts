import type { ContentMetadata } from '../+layout.server.js';
import { error } from '@sveltejs/kit';

export const load = async ({ params, parent }) => {
    const parentData = await parent();
    const content: ContentMetadata | undefined = parentData.content.filter((entry: ContentMetadata) => entry.slug === params.content)[0]; // should only be one entry with the matching slug, so we can just take the first one
    
    if (!content) {
        throw error(404, `Post <strong>${params.content}</strong> not found.<br/><br/><a href="/tech-n-tools/" class="text-primary underline">Go back to the <strong>Tech & Tools</strong> page?</a>`);
    }

    return {
        content
    };
};