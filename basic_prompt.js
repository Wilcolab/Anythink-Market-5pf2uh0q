// basic_prompt.js
// Prompt describing a function that converts strings to camelCase.

module.exports = `
Write a JavaScript function named "toCamelCase(input)" that converts an input string into lower camelCase.

Requirements:
- Lowercase the first word, capitalize the first letter of each subsequent word.
- Treat spaces, hyphens (-), underscores (_), dots (.), and other non-alphanumeric separators as word boundaries.
- Remove any characters that are not letters or digits (except digits are kept).
- Preserve digits and their order (e.g., "version 2 number" -> "version2Number").
- Collapse multiple adjacent separators and trim leading/trailing separators.
- For null, undefined, or empty input, return an empty string.
- The function must return a string.

Examples:
- toCamelCase("hello world") -> "helloWorld"
- toCamelCase("This-is_a.test") -> "thisIsATest"
- toCamelCase("  user_ID 42 ") -> "userId42"
`;