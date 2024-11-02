/**
 * Function to read a CSS variable.
 * @param {string} variableName - The name of the CSS variable (e.g., '--my-variable').
 * @returns {string} The value of the CSS variable, or an empty string if not found.
 */
export function getCSSVariable(variableName: string): string {
    const root = document.documentElement; // Get the root element
    const computedStyle = getComputedStyle(root); // Get computed styles of the root

    // Use getPropertyValue to read the CSS variable
    const value = computedStyle.getPropertyValue(variableName).trim();
    console.log({ value });

    return value || ''; // Return the value, or an empty string if not found
}