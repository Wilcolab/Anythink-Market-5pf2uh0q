'use strict';

/**
 * Convert a string to kebab-case.
 * Handles camelCase, PascalCase, snake_case, spaces, punctuation and diacritics.
 *
 * Examples:
 *   toKebabCas('helloWorld') => 'hello-world'
 *   toKebabCas(' Hello_world! ') => 'hello-world'
 *   toKebabCas('Áccent Éxample') => 'accent-example'
 *
 * @param {string} input
 * @returns {string}
 */
function toKebabCas(input) {
    if (input == null) return '';
    const s = String(input);

    // Normalize and strip diacritics
    const normalized = s.normalize ? s.normalize('NFKD').replace(/[\u0300-\u036f]/g, '') : s;

    // Separate camelCase/PascalCase boundaries: "fooBar" -> "foo Bar"
    // Also handle transitions like "HTMLParser" -> "HTML Parser"
    const spaced = normalized
        .replace(/([a-z0-9])([A-Z])/g, '$1 $2')
        .replace(/([A-Z]+)([A-Z][a-z0-9]+)/g, '$1 $2');

    // Replace non-alphanumeric characters with spaces, split, lowercase and join with hyphens
    return spaced
        .replace(/[^A-Za-z0-9]+/g, ' ')
        .trim()
        .split(/\s+/)
        .filter(Boolean)
        .map(token => token.toLowerCase())
        .join('-');
}

/**
 * Reliable public API for kebab-casing.
 * Keeps backwards compatibility with the original `toKebabCas` implementation above.
 *
 * Usage:
 *   const toKebabCase = require('./chain_prompt');
 *   toKebabCase('HelloWorld') // => 'hello-world'
 *
 * Exports:
 *   - module.exports (default function)
 *   - module.exports.toKebabCase (named)
 *   - module.exports.toKebabCas (compat)
 *   - module.exports.default (ESM compat)
 */
function toKebabCase(input) {
    // Explicitly guard Symbols because String(Symbol()) throws.
    if (typeof input === 'symbol') {
        throw new TypeError('toKebabCase: Symbol cannot be converted to a string');
    }

    try {
        // Delegate to the core implementation defined above.
        return toKebabCas(input);
    } catch (err) {
        // Re-throw TypeErrors (e.g., from intentional checks). Log and swallow others.
        if (err instanceof TypeError) throw err;
        console.error('toKebabCase: unexpected error:', err && err.stack ? err.stack : err);
        return '';
    }
}

// Export default and named/compat bindings.
module.exports = toKebabCase;
module.exports.toKebabCase = toKebabCase;
module.exports.toKebabCas = toKebabCase; // keep compatibility with existing name
module.exports.default = toKebabCase;