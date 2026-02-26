export function parseYYYYMMDD(yyyymmdd: string) {
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
        return { yyyy: parseInt(yyyymmdd.slice(0, 4)), mm, dd: null };
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
        return { yyyy: parseInt(yyyymmdd.slice(0, 4)), mm, dd };
    }
    throw new Error(`Invalid yyyymmdd format: ${yyyymmdd}`);
}

function toSortableDateParts(yyyymmdd: string) {
    const parsed = parseYYYYMMDD(yyyymmdd);
    return {
        yyyy: typeof parsed.yyyy === "number" ? parsed.yyyy : 0,
        mm: parsed.mm || 0,
        dd: parsed.dd || 0,
    };
}

export function compareYYYYMMDD(
    a: string,
    b: string,
    options: { ascending?: boolean } = {},
) {
    const { ascending = false } = options;
    const aDate = toSortableDateParts(a);
    const bDate = toSortableDateParts(b);

    const direction = ascending ? 1 : -1;

    if (aDate.yyyy !== bDate.yyyy) {
        return (aDate.yyyy - bDate.yyyy) * direction;
    }
    if (aDate.mm !== bDate.mm) {
        return (aDate.mm - bDate.mm) * direction;
    }
    return (aDate.dd - bDate.dd) * direction;
}