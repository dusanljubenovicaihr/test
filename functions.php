<?php

/**
 * Enqueue scripts and styles.
 */
function aihr_scripts() {

	$theme        = wp_get_theme();
	$theme_version = $theme['Version'];
	   
	
	wp_enqueue_style('aihr-style',get_stylesheet_directory_uri() . '/assets/css/custom.css',$theme_version,true);

	wp_enqueue_script('aihr-js-custom',get_stylesheet_directory_uri() . '/assets/js/custom.js',array('jquery'),$theme_version,true );


}
add_action( 'wp_enqueue_scripts', 'aihr_scripts' );

