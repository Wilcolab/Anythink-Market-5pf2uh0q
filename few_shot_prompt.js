// few_shot_prompt.js

/**
 * Convert a string to camelCase.
 * Handles spaces, underscores, hyphens, mixedCase, ALL_CAPS, and numeric tokens.
 */
function toCamelCase(input) {
    const s = String(input || '').trim();
    if (!s) return '';

    // Separate camelCase boundaries (e.g. "fooBar" -> "foo Bar")
    // and break sequences like "XMLHttp" into "XML Http"
    const separated = s
        .replace(/([a-z0-9])([A-Z])/g, '$1 $2')
        .replace(/([A-Z]+)([A-Z][a-z0-9])/g, '$1 $2');

    // Split on any non-alphanumeric characters
    const parts = separated.split(/[^A-Za-z0-9]+/).filter(Boolean);
    if (parts.length === 0) return '';

    return parts
        .map((part, i) => {
            const lower = part.toLowerCase();
            if (i === 0) return lower;
            return lower.charAt(0).toUpperCase() + lower.slice(1);
        })
        .join('');
}

module.exports = toCamelCase;