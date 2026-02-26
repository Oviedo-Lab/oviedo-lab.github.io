import { Sha256 } from '@aws-crypto/sha256-js';

function parseYMD(yyyymmdd: string) {
    // if any character is not a number, return null
    if (!yyyymmdd.match(/^\d+$/)) {
        return { yyyy: null, mm: null, dd: null };
    }
    // if exactly 4 characters, assume yyyy, return mm and dd as null
    if (yyyymmdd.length === 4) {
        return { yyyy: parseInt(yyyymmdd), mm: null, dd: null };
    }
    // if exactly 6 characters, assume yyyymm, return dd as null
    if (yyyymmdd.length === 6) {
        // Range check mm and dd
        let mm: number | null = parseInt(yyyymmdd.slice(4, 6));
        if (mm < 1 || mm > 12) {
            mm = null;
        }
        return { yyyy: yyyymmdd.slice(0, 4), mm, dd: null };
    }
    // if exactly 8 characters, parse as yyyymmdd
    if (yyyymmdd.length === 8) {
        // Range check mm and dd
        let mm: number | null = parseInt(yyyymmdd.slice(4, 6));
        let dd: number | null = parseInt(yyyymmdd.slice(6, 8));
        if (mm < 1 || mm > 12) {
            mm = null;
        }
        if (dd < 1 || dd > 31) {
            dd = null;
        }
        return { yyyy: yyyymmdd.slice(0, 4), mm, dd };
    }
    throw new Error(`Invalid yyyymmdd format: ${yyyymmdd}`);
}

function dateToYearMonth({ yyyy, mm, dd }: {
    yyyy: null;
    mm: null;
    dd: null;
} | {
    yyyy: number;
    mm: null;
    dd: null;
} | {
    yyyy: string;
    mm: number | null;
    dd: number | null;
}) {
    if (yyyy === null || mm === null || dd === null) {
        return null;
    }
    
    // Return as YYYY, Month (eg. 2024, September)
    const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    return `${yyyy}, ${monthNames[mm - 1]}`;
}


const images: any = import.meta.glob(
    ['$content/events/**/*.{avif,gif,heif,jpeg,jpg,png,tiff,webp}'],
    {
        eager: true,
        query: { enhanced: true, w:"2200;1800;1280;640;400" }
    }
);


const captions: any = import.meta.glob(
    ['$content/events/**/caption.txt'],
    {
        eager: true,
        query: '?raw'
    }
);



// group the images by its parent directory name
let eventsCollection: Record<string, string[]> = {};
for (const image in images) {
    // Split by / to get the parent directory name: the 2nd to last element
    const directoryName = image.split('/').slice(-2)[0];
    if (!eventsCollection[directoryName]) {
        eventsCollection[directoryName] = [];
    }
    eventsCollection[directoryName].push(image);
}
// group the captions by its parent directory name, format as key-value pairs (only 1 caption file per directory)
let eventsCaptions: Record<string, string> = {};
for (const caption in captions) {
    const directoryName = caption.split('/').slice(-2)[0];
    eventsCaptions[directoryName] = captions[caption].default.trim();

}


// sort the eventsCollection by the key descending
const sortedEventsCollection = Object.keys(eventsCollection).sort((a, b) => b.localeCompare(a));

eventsCollection = sortedEventsCollection.reduce((acc: any, key) => {
    acc[key] = eventsCollection[key];
    return acc;
}, {});

// Array of images keys in the sorted order
const imagesSrcSorted = Object.values(eventsCollection).flat();
// Array of images[key].default in the sorted order --> Use for the Gallery masonry view
let imagesSorted: any = imagesSrcSorted.map(imageSrc => images[imageSrc].default);


// Add an "alt" property to each image with `${parent directory name} ${index_src_in_event + 1}`
imagesSorted = imagesSrcSorted.map((imageSrc, index) => {
    const eventKey = imageSrc.split('/').slice(-2)[0];
    const imagePosition = eventsCollection[eventKey].indexOf(imageSrc) + 1;
    const image = images[imageSrc].default;
    image.alt = `${eventKey} ${imagePosition}`;
    return image;
});


// Add an "id" property to each image which is the SHA256 hash of the image as a string
imagesSorted = imagesSorted.map((image: any) => {
    const imageHash = new Sha256(JSON.stringify(image));
    imageHash.digest().then(digest => {
        // Format uint8array to hex string
        const digestHex = Array.from(digest).map(b => b.toString(16).padStart(2, '0')).join('');
        image.id = digestHex;
    });
    return image;
});


// Create a timeline array of objects with the following properties:
// { folderName, caption, images: imagesSorted }
interface TimelineItem {
    yearMonth: string;
    caption: string;
    images: any[]; // subset of imagesSorted with all its properties
}
let timeline: TimelineItem[] = [];
for (const folderName in eventsCollection) {
    // Find the images in the folder
    const imagesSrc: string[] = eventsCollection[folderName];
    // Find the caption in the folder
    const caption = eventsCaptions[folderName];

    // For the img src, find its corresponding image object in imagesSorted
    let eventImages: any[] = [];
    for (const imageSrc of imagesSrc) {
        eventImages.push(images[imageSrc].default);
    }

    // Parse the folder name to get the year and month
    const dateInfo = parseYMD(folderName.split('_')[0]);
    const yearMonth = dateToYearMonth(dateInfo) || "Once upon a time...";

    timeline.push({
        yearMonth,
        caption,
        images: eventImages
    });
}


export async function load() {
    await Promise.all(imagesSorted);

    return {
        // For the Gallery masonry view
        imagesSorted,

        // For Timeline view
        timeline,
    };
}