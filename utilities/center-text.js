/**
 * Centers the given text within a specified width by padding it with a specified character.
 *
 * @param text - The text to be centered.
 * @param width - The total width of the resulting string. Defaults to 80.
 *                If the width is less than or equal to the text length, the text is returned as-is.
 * @param fillChar - The character used for padding on both sides of the text. Defaults to a space (' ').
 *                   If multiple characters are provided, only the first character is used.
 * @returns The centered text padded with the specified character.
 */
export default function centerText(text, width = 80, fillChar = " ") {
    if (width <= text.length) {
        return text;
    }
    const totalPadding = width - text.length;
    const paddingStart = Math.floor(totalPadding / 2);
    const paddingEnd = totalPadding - paddingStart;
    return fillChar.repeat(paddingStart) + text + fillChar.repeat(paddingEnd);
}
