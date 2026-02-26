import publicationsConfig from "$content/publications/publications.json";
import { compareYYYYMMDD, parseYYYYMMDD } from "$lib/utils/date";

type Publication = {
    title: string;
    authors: string[];
    contentPath: string;
    yyyymmdd: string;
    doi?: string;
    journal?: string;
    url?: string;
    isPreprint?: boolean;
    isReviewArticle?: boolean;
    isSciComms?: boolean;
    thumbnail?: string;
    thumbnailSummary?: string;
};

type PublicationModule = {
    metadata?: Record<string, unknown>;
};

const publicationModules = import.meta.glob(
    [
        "$content/publications/**/*.{svx,md}",
        "!$content/publications/**/README*", // ignore any README files
        "!$content/publications/**/_template/**", // ignore any _template folder
    ],
    { eager: true },
) as Record<string, PublicationModule>;

function toStringArray(value: unknown): string[] {
    if (Array.isArray(value)) {
        return value.map((item) => String(item)).filter(Boolean);
    }
    if (typeof value === "string" && value.trim()) {
        return [value.trim()];
    }
    return [];
}

function toBoolean(value: unknown): boolean {
    if (typeof value === "boolean") {
        return value;
    }
    if (typeof value === "string") {
        return value.toLowerCase() === "true";
    }
    return false;
}

function buildPublicationsFromFrontmatter(): Publication[] {
    const publications: Publication[] = [];

    for (const [path, module] of Object.entries(publicationModules)) {
        const metadata = module.metadata;
        if (!metadata) {
            continue;
        }

        if (!metadata.title || !metadata.yyyymmdd) {
            console.warn(
                `Skipping publication with missing required metadata in ${path}`,
            );
            continue;
        }

        publications.push({
            title: String(metadata.title),
            authors: toStringArray(metadata.authors),
            contentPath: path,
            yyyymmdd: String(metadata.yyyymmdd),
            doi: metadata.doi ? String(metadata.doi) : undefined,
            journal: metadata.journal ? String(metadata.journal) : undefined,
            url: metadata.url ? String(metadata.url) : undefined,
            isPreprint: toBoolean(metadata.isPreprint),
            isReviewArticle: toBoolean(metadata.isReviewArticle),
            isSciComms: toBoolean(metadata.isSciComms),
            thumbnail: metadata.thumbnail
                ? String(metadata.thumbnail)
                : undefined,
            thumbnailSummary: metadata.thumbnailSummary
                ? String(metadata.thumbnailSummary)
                : undefined,
        });
    }

    return publications;
}

export function load() {
    const publications = buildPublicationsFromFrontmatter();

    // Check thumbnails exist on disk
    for (const publication of publications) {
        if (!publication.thumbnail) {
            console.warn(
                `Missing thumbnail for publication ${publication.title}`,
            );
        }
    }

    // Reformat the publications into a dictionary of arrays of publications, grouped by year. Values are array of publications sorted by month and day.

    const publicationsByYear: { [year: number | string]: Publication[] } = {};
    const groupPapersOlderThanYear = publicationsConfig.groupPapersOlderThanYear;
    for (const publication of publications) {
        const { yyyy } = parseYYYYMMDD(publication.yyyymmdd);
        let yearKey: number | string = yyyy ?? "Other";

        // If the publication is older than the groupPapersOlderThanYear, relabel to cutoff year + "and Earlier"
        // Check and compare only if yyyy is number
        if (
            typeof yearKey === "number" &&
            yearKey <= groupPapersOlderThanYear
        ) {
            yearKey = groupPapersOlderThanYear + " and Earlier";
        }

        if (!publication.thumbnailSummary) {
            publication.thumbnailSummary = "Figure from paper";
        }

        // If the year is not in the dictionary, add it
        if (!(yearKey in publicationsByYear)) {
            publicationsByYear[yearKey] = [];
        }

        // Add the publication to the array of publications for that year
        publicationsByYear[yearKey].push(publication);
    }

    // Init a new object to store the sorted publications with the years sorted decending
    const publicationsByYearSorted: { [year: number | string]: Publication[] } = {};

    // Sort the publications by year descending
    for (const [year, publications] of Object.entries(publicationsByYear)) {
        publications.sort((a, b) => compareYYYYMMDD(a.yyyymmdd, b.yyyymmdd, { ascending: false }));
        publicationsByYearSorted[year] = publications;
    }

    // Sort the keys of the object by year descending: If can parse as number, sort by number, otherwise sort by string and put at the end
    const years = Object.keys(publicationsByYearSorted);
    const realYears: Array<number> = [];
    const stringYears: Array<string> = [];

    for (const year of years) {
        if (typeof year === "string" && year.match(/^\d+$/)) {
            realYears.push(parseInt(year));
        } else {
            stringYears.push(year);
        }
    }

    realYears.sort((a, b) => (b || 0) - (a || 0));
    stringYears.sort((b, a) => b.localeCompare(a));

    // Merge the sorted realYears and stringYears into one array
    let yearsSorted = [...realYears, ...stringYears];

    return {
        publications: publicationsByYearSorted,
        yearsSorted,
    };
}
