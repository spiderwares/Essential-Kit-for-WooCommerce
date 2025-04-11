<?php
/**
 * Plugin Name:       Essential Kit For Woocommerce
 * Description:       Add multi-currency support to your WooCommerce store. Automatically convert prices and allow customers to switch currencies with ease.
 * Version:           1.0.0
 * Requires at least: 5.2
 * Requires PHP:      7.4
 * Author:            jthemesstudio
 * Author URI:        https://jthemes.com/
 * License:           GPL v2 or later
 * License URI:       https://www.gnu.org/licenses/gpl-2.0.html
 * Requires Plugins:  woocommerce
 * Text Domain:       essential-kit-for-woocommerce
 *
 * @package Essential Kit For Woocommerce
 */

defined( 'ABSPATH' ) || exit;

if ( ! defined( 'EKWC_FILE' ) ) :
    define( 'EKWC_FILE', __FILE__ ); // Define the plugin file path.
endif;

if ( ! defined( 'EKWC_BASENAME' ) ) :
    define( 'EKWC_BASENAME', plugin_basename( EKWC_FILE ) ); // Define the plugin basename.
endif;

if ( ! defined( 'EKWC_VERSION' ) ) :
    define( 'EKWC_VERSION', '1.0.0' ); // Define the plugin version.
endif;

if ( ! defined( 'EKWC_PATH' ) ) :
    define( 'EKWC_PATH', plugin_dir_path( __FILE__ ) ); // Define the plugin directory path.
endif;

if ( ! defined( 'EKWC_TEMPLATE_PATH' ) ) :
	define( 'EKWC_TEMPLATE_PATH', plugin_dir_path( __FILE__ ) . '/templates/' ); // Define the plugin directory path.
endif;

if ( ! defined( 'EKWC_URL' ) ) :
    define( 'EKWC_URL', plugin_dir_url( __FILE__ ) ); // Define the plugin directory URL.
endif;

if ( ! defined( 'EKWC_REVIEWS' ) ) :
    define( 'EKWC_REVIEWS', 'https://jthemes.com/' ); // Define the plugin directory URL.
endif;

if ( ! defined( 'EKWC_CHANGELOG' ) ) :
    define( 'EKWC_CHANGELOG', 'https://jthemes.com/' ); // Define the plugin directory URL.
endif;

if ( ! defined( 'EKWC_DISCUSSION' ) ) :
    define( 'EKWC_DISCUSSION', 'https://jthemes.com/' ); // Define the plugin directory URL.
endif;

if ( ! defined( 'EKWC_UPGRADE_URL' ) ) :
    define( 'EKWC_UPGRADE_URL', 'https://jthemes.com/' ); // Define the upgrade URL.
endif;

if ( ! defined( 'EKWC_PRO_VERSION_URL' ) ) :
    define( 'EKWC_PRO_VERSION_URL', 'https://jthemes.com/' ); // Define the Pro Version URL.
endif;

if ( ! class_exists( 'EKWC', false ) ) :
    include_once EKWC_PATH . 'includes/class-ekwc.php';
endif;

$GLOBALS['ekwc'] = EKWC::instance();
