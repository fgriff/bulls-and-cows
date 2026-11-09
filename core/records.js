export function sortRecords(records) {
    return [...records].sort((a, b) => {
        if (a.attempts !== b.attempts) {
            return a.attempts - b.attempts;
        }
        return a.durationMs - b.durationMs;
    });
}
export function topN(records, n) {
    return sortRecords(records).slice(0, n);
}
export function addRecord(records, entry, maxSize = 10) {
    return topN([...records, entry], maxSize);
}
