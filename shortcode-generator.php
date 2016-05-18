<?php
/*
    Plugin Name: Shortcode generator tutorial
    Plugin URI: http://example.com
    Description: Shortcode generator tutorial
    Version: 1.0.0
    Author: Younes Rafie
*/

/**
 * Shortcode generator registration
 */
add_action( 'init', function() {
    add_filter("mce_external_plugins", function( $plugin_array ) {
        $plugin_array['youtube_embed_shortcode'] = plugins_url('/assets/js/shortcode-generator-button.js', __FILE__);

        return $plugin_array;
    });

    add_filter('mce_buttons', function( $buttons ) {
        array_push( $buttons, 'youtube_embed' );

        return $buttons;
    });
});

// add_action( 'admin_init', function() {
//     add_editor_style( plugins_url('assets/css/shortcode-generator-button.css', __FILE__) );
// });

/**
 * Add shortcode generator
 */
// add_action('admin_footer-post.php', 'youtube_embed_shortcode_generator');
// add_action('admin_footer-post-new.php', 'youtube_embed_shortcode_generator');
//
// function youtube_embed_shortcode_generator() {
//     echo include __DIR__.'/views/shortcode-generator-modal.php';
// }
