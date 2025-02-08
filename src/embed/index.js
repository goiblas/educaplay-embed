import { registerBlockType } from '@wordpress/blocks';
import './style.scss';
import Edit from './edit';
import metadata from './block.json';
import Icon from './icon';
import Save from './save';

registerBlockType(metadata.name, {
	edit: Edit,
	icon: Icon,
	save: Save,
});
