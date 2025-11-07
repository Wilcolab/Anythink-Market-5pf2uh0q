/**
 * toCamelCase(value)
 *
 * Convert an input value to lower camel case (also known as "camelCase").
 *
 * Behavior:
 * - Coerces the input to a string via String(value) and trims surrounding whitespace.
 * - Treats any maximal contiguous sequence of letters or digits as a "word".
 * - Uses Unicode-aware word detection when the runtime supports Unicode property escapes (\p{L} and \p{N});
 *   falls back to ASCII alphanumerics ([A-Za-z0-9]) if not supported.
 * - Joins words so that the first word is entirely lowercased and each subsequent word is capitalized
 *   (first character uppercased, remaining characters lowercased).
 * - Non-alphanumeric characters (spaces, punctuation, separators, diacritics boundary characters, etc.)
 *   act as word separators and are not preserved.
 * - Numeric words are preserved and may appear at the start of the result (e.g. "123UserId").
 * - For null or undefined input the function returns an empty string. For an input that coerces to an
 *   empty string (after trimming) the function returns an empty string.
 *
 * Notes and limitations:
 * - Uses String.prototype.toLowerCase and character-level operations (charAt / slice) for casing and
 *   capitalization; this may not handle every locale-specific or grapheme-cluster edge case (e.g. certain
 *   multi-code-unit characters or complex casing rules).
 * - The Unicode-aware regex improves word detection for letters and numbers across scripts, but the code
 *   still performs simple ASCII-style capitalization; be cautious with scripts that do not follow
 *   Latin-style uppercase/lowercase semantics.
 *
 * @function
 * @param {any} value - Value to convert. Will be coerced to a string. If value is null or undefined,
 *                      the function returns an empty string.
 * @returns {string} A camelCase representation of the input. Always returns a string (possibly empty).
 *
 * @example
 * toCamelCase('hello world');      // 'helloWorld'
 * @example
 * toCamelCase('  Foo_BAR-baz ');  // 'fooBarBaz'
 * @example
 * toCamelCase('123 user id');     // '123UserId'
 * @example
 * toCamelCase(null);              // ''
 *
 * @see toDotCase
 */
 
/**
 * toKebabCase(value)
 *
 * Convert an input value to kebab-case (lowercase words separated by hyphens).
 *
 * Behavior:
 * - Coerces the input to a string via String(value) and trims surrounding whitespace.
 * - Treats any maximal contiguous sequence of letters or digits as a "word".
 * - Uses Unicode-aware word detection when the runtime supports Unicode property escapes (\p{L} and \p{N});
 *   falls back to ASCII alphanumerics ([A-Za-z0-9]) if not supported.
 * - Produces a lowercase string where words are joined with '-' characters.
 * - Non-alphanumeric characters act as word separators and are not preserved.
 * - Numeric words are preserved and appear in-place (e.g. "123-user-id" for input "123 user id").
 * - For null or undefined input the function returns an empty string. For an input that coerces to an
 *   empty string (after trimming) the function returns an empty string.
 *
 * Reliability improvements:
 * - Uses String.prototype.normalize('NFC') when available to avoid splitting grapheme/diacritic sequences.
 * - Wraps core logic in try/catch to fail safely and log a concise error message.
 *
 * Notes and limitations:
 * - Lowercasing uses toLowerCase(); locale-specific casing rules may affect certain scripts.
 * - The Unicode-aware regex improves word detection for letters and numbers across scripts, but the
 *   normalization/casing approach is straightforward and may not cover every language-specific edge case.
 *
 * @param {any} value
 * @returns {string}
 */
function toKebabCase(value) {
    try {
        if (value == null) return '';

        // Coerce and trim
        let str = String(value).trim();
        if (str === '') return '';

        // Normalize to NFC when available to keep combining marks attached to base characters
        if (typeof str.normalize === 'function') {
            try {
                str = str.normalize('NFC');
            } catch {
                // ignore normalization errors and continue with original string
            }
        }

        // Choose Unicode-aware word regex when supported, otherwise fall back to ASCII alphanumerics
        const wordRegex = (() => {
            try {
                new RegExp('\\p{L}', 'u');
                return /[\p{L}\p{N}]+/gu;
            } catch {
                return /[A-Za-z0-9]+/g;
            }
        })();

        const words = str.match(wordRegex);
        if (!words || words.length === 0) return '';

        return words.map((w) => {
            const part = (typeof w.normalize === 'function') ? w.normalize('NFC') : w;
            return part.toLowerCase();
        }).join('-');
    } catch (err) {
        if (typeof console !== 'undefined' && typeof console.error === 'function') {
            console.error('toKebabCase error:', err && err.message ? err.message : err);
        }
        return '';
    }
}
function toKebabCase(value) {
    try {
        if (value == null) return '';

        const str = String(value).trim();
        if (str === '') return '';

        const wordRegex = (() => {
            try {
                // test support for Unicode property escapes
                new RegExp('\\p{L}', 'u');
                return /[\p{L}\p{N}]+/gu;
            } catch {
                return /[A-Za-z0-9]+/g;
            }
        })();

        const words = str.match(wordRegex);
        if (!words || words.length === 0) return '';

        return words.map((w) => w.toLowerCase()).join('-');
    } catch (err) {
        if (typeof console !== 'undefined' && typeof console.error === 'function') {
            console.error('toKebabCase error:', err && err.message ? err.message : err);
        }
        return '';
    }
}
function toKebabCase(value) {
    if (value == null) return '';

    const str = String(value).trim();
    if (str === '') return '';

    const wordRegex = (() => {
        try {
            new RegExp('\\p{L}', 'u');
            return /[\p{L}\p{N}]+/gu;
        } catch {
            return /[A-Za-z0-9]+/g;
        }
    })();

    const words = str.match(wordRegex);
    if (!words || words.length === 0) return '';

    return words.map((w) => w.toLowerCase()).join('-');
}
function toCamelCase(value) {
    if (value == null) return '';

    const str = String(value).trim();
    if (str === '') return '';

    // Use Unicode-aware regex when available; fall back to ASCII alnum otherwise.
    const wordRegex = (() => {
        try {
            // test support for Unicode property escapes
            new RegExp('\\p{L}', 'u');
            return /[\p{L}\p{N}]+/gu;
        } catch {
            return /[A-Za-z0-9]+/g;
        }
    })();

    const words = str.match(wordRegex);
    if (!words || words.length === 0) return '';

    const [first, ...rest] = words;
    const firstPart = first.toLowerCase();

    const restParts = rest.map((w) => {
        const lower = w.toLowerCase();
        return lower.charAt(0).toUpperCase() + lower.slice(1);
    });

    return firstPart + restParts.join('');
}

/**
 * Convert a string to dot.case (lowercase words separated by dots).
 * - Treats any sequence of letters or digits as a "word".
 * - Handles multiple separators, punctuation, accents and numbers.
 * - Returns an empty string for null/undefined/empty input.
 *
 * Examples:
 *   toDotCase('Hello World')     // 'hello.world'
 *   toDotCase('  Foo_BAR-baz ') // 'foo.bar.baz'
 *   toDotCase('123 user id')    // '123.user.id'
 *
 * @param {any} value - value to convert (will be coerced to string)
 * @returns {string}
 */
function toDotCase(value) {
    if (value == null) return '';

    const str = String(value).trim();
    if (str === '') return '';

    const wordRegex = (() => {
        try {
            new RegExp('\\p{L}', 'u');
            return /[\p{L}\p{N}]+/gu;
        } catch {
            return /[A-Za-z0-9]+/g;
        }
    })();

    const words = str.match(wordRegex);
    if (!words || words.length === 0) return '';

    return words.map((w) => w.toLowerCase()).join('.');
}

module.exports = { toCamelCase, toDotCase };