import { useBlockProps } from '@wordpress/block-editor';

export default function Save({ attributes }) {
    const { url } = attributes;

    if (!url) {
        return null;
    }

    return (
        <div {...useBlockProps.save()}>
            <iframe
                src={url}
                className="educaplay-embed__iframe"
            />
        </div>
    );
}