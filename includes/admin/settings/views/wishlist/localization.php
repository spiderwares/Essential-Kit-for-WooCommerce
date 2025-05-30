<?php
// Prevent direct access to the file.
defined( 'ABSPATH' ) || exit;

/**
 * Retrieve the localization settings fields for the Wishlist feature 
 * from the EKWC_Wishlist_Admin_Settings class.
 *
 * @var array $fields Array of settings fields related to Wishlist localization.
 */
$fields = EKWC_Wishlist_Admin_Settings::localization_field();

/**
 * Get the saved Wishlist settings from the WordPress options table.
 *
 * @var array|bool $options Retrieved settings array or false if not set.
 */
$options = get_option( 'ekwc_wishlist_setting', true );

/**
 * Load the settings form template for the Wishlist localization settings.
 *
 * This template allows users to configure label-related settings for 
 * the Wishlist functionality.
 */
wc_get_template(
    'fields/setting-forms.php',
    array(
        'title'   => 'Labels',
        'metaKey' => 'ekwc_wishlist_setting',
        'fields'  => $fields,
        'options' => $options,
    ),
    'essential-tool-for-woocommerce/fields/',
    EKWC_TEMPLATE_PATH
);