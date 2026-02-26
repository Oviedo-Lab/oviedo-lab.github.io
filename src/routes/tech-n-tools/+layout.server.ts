import { Sha256 } from '@aws-crypto/sha256-js';
import { compareYYYYMMDD } from "$lib/utils/date";
import type { Picture } from '@sveltejs/enhanced-img';

export type ContentMetadata = {
    // YAML Frontmatter fields
    title: string;
    description?: string;
    authors?: string[];
    yyyymmdd?: string;
    thumbnail?: string | Picture; // can be either a string path or an enhanced image object with sources and img properties
    thumbnailAlt?: string; // alt text for the thumbnail image, used for accessibility and SEO
    tags?: string[];
    
    // Website-specific fields
    slug: string; // html slug for the post, dynamically generated based on the files' dir path and file name's hash, as the post url
    src: string; // the original file path of the content, used for filtering the glob import of file content
    titleHtml?: string; // the HTML version of the title, used to preserve any formatting in the title, such as italics or bold
}

type ContentModule = {
    metadata?: Record<string, unknown>;
};

const contentModules = import.meta.glob(
    [
        "$content/tech-n-tools/**/*.{svx,md}",
        "!$content/tech-n-tools/**/README*", // ignore any README files
        "!$content/tech-n-tools/**/_template/**", // ignore any _template folder
    ],
    { eager: true },
) as Record<string, ContentModule>;

const images = import.meta.glob(
    ['$content/tech-n-tools/**/*.{avif,gif,heif,jpeg,jpg,png,tiff,webp}'],
    {
        eager: true,
        query: { enhanced: true, w:"1280;640;400" }
    }
) as Record<string, { default: any }>;

type Heading = {
    level: number;
    title: string;
    titleHtml: string;
}

function isUrl(str: string): boolean {
    try {
        new URL(str);
        return true;
    } catch (_) {
        return false;
    }
}

async function extractContentMetadata(): Promise<ContentMetadata[]> {
    const contentMetadata: ContentMetadata[] = []

    // slug = {parentdir} if there are single post within a parent directory, otherwise slug = {parentdir-filename's hash} to avoid slug conflicts
    // Get the frequency of posts within a direct parent directory to determine if we should include the filename hash
    const base = "/src/content/tech-n-tools/";
    const parentDirFrequency: Record<string, number> = {};
    for (const path in contentModules) {
        const parentDir = path.replace(base, '').split('/')[0];
        parentDirFrequency[parentDir] = (parentDirFrequency[parentDir] || 0) + 1;
    }

    for (const [path, module] of Object.entries(contentModules)) {
        const metadata = module.metadata;
        if (!metadata) {
            continue;
        }

        // If no title or title is empty, use the top level heading as the title
        if (metadata.headings) {
            const headings = metadata.headings as Heading[] | undefined;
            if (headings && headings.length > 0) {
                // Find the first heading with the lowest level
                const topLevelHeading = headings.reduce((prev, curr) => {
                    if (prev === null) {
                        return curr;
                    }
                    if (curr.level < prev.level) {
                        return curr;
                    }
                    return prev;
                });
                if (topLevelHeading && topLevelHeading.titleHtml) {
                    metadata.titleHtml = topLevelHeading.titleHtml; // use titleHtml to preserve any formatting in the heading, such as italics or bold
                    // Also set title field if it's currently unset
                    if (!metadata.title || metadata.title === "") {
                        metadata.title = topLevelHeading.title; // use the plain text title as the title field for screen readers and SEO hints
                    }
                }
            }
        }
        
        // If no title is found after this, skip this entry
        if (!metadata.title || metadata.title === "") {
            continue;
        }

        // If no description or description is empty, use the first paragraph as the description
        if ((!metadata.description || metadata.description === "") && metadata.firstParagraph) {
            const firstParagraph: {
                text: string;
                html: string;
            } = metadata.firstParagraph as { text: string; html: string };
            metadata.description = firstParagraph.html; // use html to preserve any formatting in the paragraph, such as italics or bold
        }

        // Get the image thumbnail 
        if (metadata.thumbnail && typeof metadata.thumbnail === "string") {
            const thumbnailPath = metadata.thumbnail;
            if (images[thumbnailPath]) {
                metadata.thumbnail = images[thumbnailPath].default; // replace the thumbnail path with the actual image content
            } 
            else if (isUrl(thumbnailPath)) {
                // If the thumbnail is an external URL, keep it as is
                metadata.thumbnail = thumbnailPath;
            }
            else {
                delete metadata.thumbnail;
            }
        }
        // Set the thumbnail alt text to the title if not provided, for accessibility and SEO purposes
        if (metadata.thumbnail && !metadata.thumbnailAlt) {
            metadata.thumbnailAlt = `Thumbnail image for ${metadata.title}`;
        }

        // Sort tags alphabetically if they exist, for better consistency in display and easier scanning of tags
        if (metadata.tags && Array.isArray(metadata.tags)) {
            metadata.tags = metadata.tags.map(String).sort((a, b) => a.localeCompare(b));
        }

        // Generate slug based on the file path. If there are multiple posts within the same parent directory, include the filename's hash to avoid slug conflicts
        const parentDir = path.replace(base, '').split('/')[0];
        const hash = new Sha256();
        hash.update(path);
        const filenameHash = hash.digest().then(digest => {
            // Get the first 8 characters of the hex digest as the filename hash
            // Unlikely to need more, but can increase if we find collisions in the future
            return Array.from(digest).map(b => b.toString(16).padStart(2, '0')).join('').slice(0, 8);
        });

        const slug = parentDirFrequency[parentDir] > 1 ? `${parentDir}-${await filenameHash}` : parentDir;

        contentMetadata.push({
            title: String(metadata.title),
            titleHtml: metadata.titleHtml ? String(metadata.titleHtml) : undefined,
            description: metadata.description ? String(metadata.description) : undefined,
            authors: metadata.authors ? (Array.isArray(metadata.authors) ? metadata.authors.map(String) : [String(metadata.authors)]) : undefined,
            yyyymmdd: metadata.yyyymmdd ? String(metadata.yyyymmdd) : undefined,
            thumbnail: metadata.thumbnail as Picture | string | undefined,
            thumbnailAlt: metadata.thumbnailAlt ? String(metadata.thumbnailAlt) : undefined,
            tags: metadata.tags ? (Array.isArray(metadata.tags) ? metadata.tags.map(String) : [String(metadata.tags)]) : undefined,

            slug: slug,
            src: path,
        });
    }

    // Sort the content by date descending
    // Entries without a valid date will be sorted to the end
    contentMetadata.sort((a, b) => {
        const aDate = a.yyyymmdd || "";
        const bDate = b.yyyymmdd || "";
        return compareYYYYMMDD(aDate, bDate, { ascending: false });
    });


    return contentMetadata;
}

export async function load(): Promise<{ content: ContentMetadata[]; }> {
    const content = await extractContentMetadata();
    return { content };
}