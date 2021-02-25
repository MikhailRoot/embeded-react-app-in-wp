<?php
/**
 * Plugin.
 *
 * @package embeded-react-app-in-wp
 * @wordpress-plugin
 *
 * Plugin Name:     Embedded React App in WP
 * Description:     React App Embedded into WordPress page
 * Author:          Mikhail Durnev
 * Author URL:      https://mikhailroot.ru
 * Version:         0.1
 * Domain Path:     /languages
 */

/**
 * Shortcode which renders Root element for your React App.
 *
 * @return string
 */
function md_react_app_shortcode() {

	/**
	 * You can pass in here some data which if you need to have some settings\localization etc for your App,
	 * so you'll be able for example generate initial state of your app for Redux, based on some settings provided by WordPress.
	 */
	$settings = array(
		'l18n'       => array(
			'main_title' => 'Hi this is your React app running in WordPress',
		),
		'some_items' => array( 'lorem ipsum', 'dolor sit amet' ),
	);

	return '<div id="md-react-app" data-default-settings="' . esc_attr( wp_json_encode( $settings ) ) . '"></div>';
}

add_shortcode(
	'md-react-app',
	'md_react_app_shortcode'
);

/**
 * Enqueues styles and js compiled for plugin.
 */
function md_react_app_enqueue_assets() {


	$ver         = (get_file_data( __FILE__, ["Version" => "Version"], false ))['Version'];
	$js_to_load  = plugin_dir_url( __FILE__ ) . 'app/build/static/js/main.js';
	$css_to_load = plugin_dir_url( __FILE__ ) . 'app/build/static/css/main.css';

	if ( defined( 'ENV_DEV' ) && ENV_DEV ) {
		// DEV React dynamic loading.
		$ver         = gmdate( 'Y-m-d-h-i-s' );
		$js_to_load  = 'http://localhost:3000/static/js/main.js';
		$css_to_load = 'http://localhost:3000/static/css/main.css';
	}

	/* `wp-element` as dependency will load React and ReactDom for our app from `wp-includes` */
	wp_enqueue_script( 'md-react-app', $js_to_load, array( 'wp-element' ), $ver, true );

	wp_enqueue_style( 'md-react-app', $css_to_load, array(), $ver );

}

add_action( 'wp_enqueue_scripts', 'md_react_app_enqueue_assets' );
