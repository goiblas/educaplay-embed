<?php
/**
 * Plugin Name:       Educaplay Embed Block
 * Description:       Embed Educaplay activities in your WordPress site.
 * Version:           0.1.0
 * Requires at least: 6.7
 * Requires PHP:      7.4
 * Author:            Jesús Olazagoitia
 * License:           GPL-2.0-or-later
 * License URI:       https://www.gnu.org/licenses/gpl-2.0.html
 * Text Domain:       educaplay
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit; 
}

function educaplay_embed_block_init() {
	register_block_type( __DIR__ . '/build/embed');
}
add_action( 'init', 'educaplay_embed_block_init' );
