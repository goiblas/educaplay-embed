import { __ } from '@wordpress/i18n';
import { useBlockProps, BlockControls } from '@wordpress/block-editor';
import { View } from '@wordpress/primitives';
import {
	Button,
	Placeholder,
	FocusableIframe,
	__experimentalInputControl as InputControl
} from '@wordpress/components';
import { useState } from '@wordpress/element';
import './editor.scss';
import {
	ToolbarButton,
	ToolbarGroup,
} from '@wordpress/components';
import { edit } from '@wordpress/icons';
import EducaplayIcon from './icon';

function getEducaplayIframeUrl(inputUrl) {
	try {
		const url = new URL(inputUrl);
		url.search = "";
		url.hash = "";

		const domainRegex = /^([a-z-]+)\.educaplay\.com$/;
		const domainMatch = url.hostname.match(domainRegex);

		if (!domainMatch) {
			return null;
		}

		const regex = /^\/([a-z-]+)\/(\d+)-(.*)\.html$/;
		const match = url.pathname.match(regex);

		if (!match) {
			return null;
		}

		const path = match[1];
		const id = match[2];
		const slug = match[3];

		const pathMap = {
			"recursos-educativos": "juego",
			"learning-resources": "game",
			"ressources-pedagogiques": "jeu"
		};

		const gameIframePaths = Object.values(pathMap)
		if (gameIframePaths.includes(path)) {
			return url.toString();
		}

		if (!(path in pathMap)) {
			return null;
		}

		return `${url.origin}/${pathMap[path]}/${id}-${slug}.html`;
	} catch (error) {
		return null;
	}
}

export default function Edit({ attributes, setAttributes }) {
	const { url: attributesUrl } = attributes;
	const blockProps = useBlockProps();
	const [url, setURL] = useState(attributesUrl);
	const [isEditingURL, setIsEditingURL] = useState(!attributesUrl);
	const [error, setError] = useState(null);

	const handleSubmit = (event) => {
		event.preventDefault();

		const iframeIrl = getEducaplayIframeUrl(url);

		if (!iframeIrl) {
			setError(__('The URL is not valid.', 'educaplay'));
			return;
		}

		setURL(iframeIrl);
		setAttributes({ url: iframeIrl });
		setIsEditingURL(false);
	};

	if (!isEditingURL) {
		return (
			<View {...blockProps}>
				{url && (
					<>
						<BlockControls>
							<ToolbarGroup>
								<ToolbarButton
									label={__('Edit URL', 'educaplay')}
									icon={edit}
									onClick={() => setIsEditingURL(true)}
								/>
							</ToolbarGroup>
						</BlockControls>

						<FocusableIframe
							src={url}
							className="educaplay-embed__iframe"
							allowFullScreen
						/>
					</>
				)}
			</View>
		);
	}

	return (
		<View {...blockProps}>

			<Placeholder
				icon={EducaplayIcon}
				className="wp-block-embed"
				label={__('Educaplay embed URL', 'educaplay')}
				instructions={__('Paste a URL to embed content from Educaplay.', 'educaplay')}
			>
				<form onSubmit={handleSubmit} className='educaplay-embed__form'>
					<InputControl
						type="url"
						value={url}
						className="educaplay-embed__placeholder-input"
						label={__('Paste URL to embed content from Educaplay', 'educaplay')}
						hideLabelFromVision
						placeholder={__('Enter URL to embed here…', 'educaplay')}
						__next40pxDefaultSize
						onChange={(nextValue) => {
							setURL(nextValue ?? '');
							setError(null);
						}}
					/>
					<Button __next40pxDefaultSize variant="primary" type="submit">
						{__('Embed', 'educaplay')}
					</Button>
				</form>

				{error && (
					<div className="educaplay-embed__error" role="alert" aria-atomic="true">{error}</div>
				)}
			</Placeholder>
		</View>
	);
}
