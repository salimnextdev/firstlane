import * as React from 'react';
import PropTypes from 'prop-types';

const FileInput = ({
    label,
    name,
    className,
    onChange,
    value,
    ...rest
}) => {
    const { useEffect, useMemo, useState } = React;
    // `value` can be:
    // - { file: File } (our form state shape)
    // - a string URL (pre-existing upload)
    // - null/undefined
    // Never render raw objects in JSX (React will throw).
    const fileName =
        value?.file instanceof File
            ? value.file.name
            : typeof value === 'string'
                ? value
                : '';

    const previewMeta = useMemo(() => {
        // Preview images + PDFs. For other docs we just show the filename.
        if (value?.file instanceof File) {
            const type = value.file.type || '';
            if (type.startsWith('image/')) {
                return { url: URL.createObjectURL(value.file), kind: 'image' };
            }
            if (type === 'application/pdf') {
                return { url: URL.createObjectURL(value.file), kind: 'pdf' };
            }
            return { url: '', kind: '' };
        }

        if (typeof value === 'string' && value) {
            const lower = value.toLowerCase();
            const isImageUrl =
                lower.startsWith('http') &&
                (lower.endsWith('.png') ||
                    lower.endsWith('.jpg') ||
                    lower.endsWith('.jpeg') ||
                    lower.endsWith('.gif') ||
                    lower.endsWith('.webp') ||
                    lower.includes('cloudinary') ||
                    lower.includes('s3'));
            if (isImageUrl) return { url: value, kind: 'image' };

            const isPdfUrl =
                lower.startsWith('http') &&
                (lower.endsWith('.pdf') || lower.includes('.pdf?') || lower.includes('cloudinary'));
            if (isPdfUrl) return { url: value, kind: 'pdf' };

            return { url: '', kind: '' };
        }

        return { url: '', kind: '' };
    }, [value]);

    const [showDocPreview, setShowDocPreview] = useState(false);

    useEffect(() => {
        // Cleanup object URLs to avoid memory leaks when user re-selects files.
        if (previewMeta.url && value?.file instanceof File) {
            return () => URL.revokeObjectURL(previewMeta.url);
        }
    }, [previewMeta.url, value]);

    // If the user changes the selected file/url, collapse the preview panel.
    useEffect(() => {
        setShowDocPreview(false);
    }, [previewMeta.url]);
    return (
        <div className="w-full">
            {label && (
                <label
                    htmlFor={name}
                    className="block text-sm mb-1"
                >
                    {label}
                </label>
            )}
            <div className="relative w-full h-12">
                <input
                    type="file"
                    id={name}
                    name={name}
                    onChange={onChange}
                    className="absolute top-0 left-0 w-full h-full opacity-0 cursor-pointer z-10"
                    // Important: Do NOT set 'value' directly on type="file" inputs.
                    // It's a controlled component anti-pattern for files.
                    // The 'value' prop here is just for this custom component's logic.
                    {...rest}
                />
                <div
                    className={`w-full h-full px-5 flex items-center justify-center gap-2 border border-gray-200 rounded text-sm text-gray-500 pointer-events-none ${className}`}
                >
                    {/* Use the derived fileName */}
                    {fileName ?
                        <svg width="16" height="20" viewBox="0 0 16 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M0.916504 8.33334C0.916504 5.19064 0.916504 3.61929 1.95383 2.64298C2.99116 1.66667 4.66072 1.66667 7.99984 1.66667H8.64378C11.3614 1.66667 12.7203 1.66667 13.6639 2.33153C13.9343 2.52203 14.1744 2.74794 14.3768 3.00241C15.0832 3.89057 15.0832 5.16947 15.0832 7.72728V9.84849C15.0832 12.3178 15.0832 13.5525 14.6924 14.5385C14.0642 16.1238 12.7356 17.3743 11.0512 17.9655C10.0035 18.3333 8.69166 18.3333 6.06802 18.3333C4.5688 18.3333 3.81918 18.3333 3.22048 18.1232C2.258 17.7853 1.4988 17.0708 1.13981 16.1649C0.916504 15.6014 0.916504 14.8959 0.916504 13.4849V8.33334Z" stroke="#667185" strokeWidth="1.5" strokeLinejoin="round" />
                            <path d="M15.0833 10C15.0833 11.5341 13.8397 12.7778 12.3056 12.7778C11.7507 12.7778 11.0966 12.6806 10.5572 12.8251C10.0779 12.9535 9.70353 13.3279 9.5751 13.8072C9.43056 14.3466 9.52778 15.0007 9.52778 15.5556C9.52778 17.0897 8.28412 18.3333 6.75 18.3333" stroke="#667185" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                            <path d="M4.6665 5.83334H10.4998" stroke="#667185" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                            <path d="M4.6665 9.16667H7.1665" stroke="#667185" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                        :
                        <svg width="16" height="14" viewBox="0 0 16 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M8.00033 0.75001L8.00033 9.08334M8.00033 0.75001C7.4168 0.75001 6.3266 2.41193 5.91699 2.83334M8.00033 0.75001C8.58385 0.75001 9.67405 2.41193 10.0837 2.83334" stroke="#667185" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                            <path d="M14.6668 10.75C14.6668 12.8183 14.2352 13.25 12.1668 13.25H3.8335C1.76516 13.25 1.3335 12.8183 1.3335 10.75" stroke="#667185" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    }
                    <span className='w-10/12 font-light truncate'>{fileName || 'Upload document'}</span>
                </div>
            </div>

            {previewMeta.url && previewMeta.kind === 'image' && (
                <a
                    href={previewMeta.url}
                    target="_blank"
                    rel="noreferrer"
                    className="mt-2 inline-flex items-center gap-3"
                >
                    <div className="w-14 h-14 border border-gray-200 rounded-md overflow-hidden bg-currency">
                        <img
                            src={previewMeta.url}
                            alt="Selected image preview"
                            className="w-full h-full object-cover"
                        />
                    </div>
                    <span className="text-xs text-secondary font-light">
                        Preview selected image
                    </span>
                </a>
            )}

            {previewMeta.url && previewMeta.kind === 'pdf' && (
                <div className="mt-2 space-y-2">
                    <div className="flex items-center gap-3">
                        <a
                            href={previewMeta.url}
                            target="_blank"
                            rel="noreferrer"
                            className="text-xs text-primary font-medium underline"
                        >
                            Open PDF in new tab
                        </a>
                        <button
                            type="button"
                            onClick={() => setShowDocPreview((v) => !v)}
                            className="text-xs text-secondary font-light underline"
                        >
                            {showDocPreview ? 'Hide preview' : 'Preview PDF here'}
                        </button>
                    </div>

                    {showDocPreview && (
                        <div className="w-full h-64 border border-gray-200 rounded-md overflow-hidden bg-white">
                            <iframe
                                title="PDF preview"
                                src={previewMeta.url}
                                className="w-full h-full"
                            />
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default FileInput;

FileInput.propTypes = {
    label: PropTypes.string,
    name: PropTypes.string.isRequired,
    className: PropTypes.string,
    onChange: PropTypes.func,
    // Either a pre-existing URL string, or our { file: File } wrapper.
    value: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.shape({
            file: PropTypes.instanceOf(File),
        }),
    ]),
};