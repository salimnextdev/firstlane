import { toast } from "sonner";

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
        toast.success("Copied successfully!");
        return true;
    } catch (error) {
        toast.error("Failed to copy content. Please try again.");
        return false;
    }
}
