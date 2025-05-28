// utils/copyToClipboard.js

export async function copyToClipboard(content) {
    try {
        let textToCopy;

        if (Array.isArray(content) && content.every(item => typeof item === 'string')) {
            // Join array of strings into newline-separated string
            textToCopy = content.join('\n');
        } else if (typeof content === 'string' || typeof content === 'number') {
            textToCopy = content.toString();
        } else {
            textToCopy = JSON.stringify(content, null, 2);
        }

        await navigator.clipboard.writeText(textToCopy);
        return true;
    } catch (error) {
        // console.error('Failed to copy to clipboard:', error);
        return false;
    }
}
