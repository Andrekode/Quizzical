export default function replaceString(string: string): string {
    return string
        .replace(/&quot;/g, '"')
        .replace(/&#039;/g, "'")
        .replace(/&amp;/g, '&')
        .replace(/&#039;/g, "'");
}
