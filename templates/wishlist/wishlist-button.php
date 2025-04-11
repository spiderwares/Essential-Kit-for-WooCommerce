<?php
/**
 * Wishlist Button Template
 */
if ( ! defined( 'ABSPATH' ) ) :
    exit;
endif;

$product_id          = $product_id ?? 0;
$wishlist_btn_text   = $wishlist_setting['add_to_wishlist_text'] ?? '';
$added_btn_text      = $wishlist_setting['added_to_wishlist_text'] ?? '';
$browse_text         = $wishlist_setting['browse_wishlist_text'] ?? '';
$remove_text         = $wishlist_setting['remove_from_wishlist_text'] ?? '';
$is_in_wishlist      = in_array( $product_id, $wishlist_ids );

$wishlist_button_classes = apply_filters(
    'ekwc_wishlist_button_classes',
    'etwc-wishlist-button etwc-add-button ' . ( $is_in_wishlist ? 'etwc-wishlist-hide' : '' ),
    $product_id
); ?>

<div class="etwc-wishlist-container">
    <button class="<?php echo esc_attr( $wishlist_button_classes ); ?>" data-action="add_to_wishlist" data-product-id="<?php echo esc_attr( $product_id ); ?>">
        <span class="etwc-wishlist-text"><?php echo esc_html( $wishlist_btn_text ); ?></span>
        <span class="etwc-loader"></span>
    </button>

    <div class="etwc-wishlist-actions <?php echo ! $is_in_wishlist ? 'etwc-wishlist-hide' : ''; ?>">
        <?php if ( ! empty( $wishlist_setting['after_add_to_wishlist_action'] ) ) : ?>
            <?php if ( $wishlist_setting['after_add_to_wishlist_action'] === 'added_to_wishlist_btn' ) : ?>
                <button class="etwc-wishlist-button etwc-added-button" data-action="remove_from_wishlist" data-product-id="<?php echo esc_attr( $product_id ); ?>">
                    <span class="etwc-wishlist-text"><?php echo esc_html( $added_btn_text ); ?></span>
                    <span class="etwc-loader"></span>
                </button>
            <?php endif; ?>

            <?php if ( $wishlist_setting['after_add_to_wishlist_action'] === 'view_wishlist_link' ) : ?>
                <a href="<?php echo esc_url( $wishlist_url ); ?>" class="etwc-view-wishlist"><?php echo esc_html( $browse_text ); ?></a>
            <?php endif; ?>

            <?php if ( $wishlist_setting['after_add_to_wishlist_action'] === 'remove_from_list' ) : ?>
                <a class="etwc-remove-wishlist" data-product-id="<?php echo esc_attr( $product_id ); ?>">× <span class="etwc-wishlist-text"><?php echo esc_html( $remove_text ); ?></span>
                <span class="etwc-loader"></span> <!-- Loader -->
                </a>
            <?php endif; ?>
        <?php endif; ?>
    </div>
</div>
