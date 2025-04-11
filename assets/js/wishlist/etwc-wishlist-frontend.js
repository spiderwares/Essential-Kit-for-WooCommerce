jQuery(function ($) {

    class EKWCWishlistFrontend {

        constructor() {
            this.eventHandlers();
        }

        eventHandlers() {
            $(document.body).on('click', '.etwc-wishlist-button', this.wishlistProductHandler.bind(this));
            $(document.body).on('click', '.etwc-remove-wishlist', this.removeWishlistProductHandler.bind(this));
            $(document.body).on('click', '.etwc-add-to-cart.ajax_add_to_cart', this.addToCartHandler.bind(this));
            $(document.body).on('click', '.ekwc-delete-wishlist', this.deleteWishlistHandler.bind(this));
        }

        // Handles adding a product to the wishlist
        wishlistProductHandler(e) {
            e.preventDefault();
            var __this          = $(e.currentTarget),
                productId       = __this.data('product-id'),
                parentContainer = __this.closest('.etwc-wishlist-container'),
                wishlistIcon    = $(".ekwc-wishlist-loop-icon[data-product-id='" + productId + "']");

            if (!productId) {
                console.log('Product ID missing');
                return;
            }
            
            // Send AJAX request to add product to the wishlist
            $.ajax({
                type: 'POST',
                url: etwc_vars.ajax_url,
                data: {
                    action: 'etwc_add_to_wishlist',
                    product_id: productId,
                    nonce: etwc_vars.wishlist_nonce,
                },
                beforeSend: () => {
                    __this.prop('disabled', true).addClass('etwc-loading');
                },
                success: (response) => {
                    if (response.success) {
                        if (!etwc_vars.is_user_logged_in) {
                            let guestWishlist = localStorage.getItem( 'etwc_wishlist' ) 
                                ? JSON.parse( localStorage.getItem( 'etwc_wishlist' ) ) 
                                : [];
                            
                            if (!guestWishlist.includes( productId )) {
                                guestWishlist.push( productId );
                                localStorage.setItem( 'etwc_wishlist', JSON.stringify( guestWishlist ) );
                            }
                        }

                        if ( etwc_vars.wishlist_setting.wishlist_icon_on_product_loop == 'yes' ) {
                            if (wishlistIcon.length) {
                                var img = wishlistIcon.find('.etwc-loop-img');
                                if (img.length) {
                                    img.attr( 'src', etwc_vars.wishlist_setting.added_to_wishlist_icon );
                                }
                                wishlistIcon.removeClass("etwc-wishlist-button").addClass("etwc-remove-wishlist");
                            }
                        }
                        
                        parentContainer.find('.etwc-add-button').hide();
                        parentContainer.find('.etwc-wishlist-actions').show();

                    } else {
                        console.log('Wishlist error:', response.data.message);
                    }
                },
                error: (xhr, status, error) => {
                    console.log('AJAX Error:', error);
                },
                complete: () => {
                    __this.prop('disabled', false).removeClass('etwc-loading');
                },
            });
        }

        removeWishlistProductHandler(e){
            e.preventDefault();
            var __this          = $(e.currentTarget),
                productId       = __this.data('product-id'),
                wishlist_token  = __this.data('wishlist-token'),
                parentContainer = __this.closest('.etwc-wishlist-actions').length ? __this.closest('.etwc-wishlist-actions').parent() : __this.parent(),
                wishlistIcon    = $('.ekwc-wishlist-loop-icon[data-product-id="' + productId + '"]');
        
            $.ajax({
                type: 'POST',
                url: etwc_vars.ajax_url,
                data: {
                    action: 'etwc_remove_from_wishlist',
                    product_id: productId,
                    wishlist_token: wishlist_token,
                    nonce: etwc_vars.wishlist_nonce,
                },
                success: function (response) {
                    if (response.success) {
                        __this.closest('tr.etwc-wishlist-row').remove();
                        if(parentContainer){
                            parentContainer.find('.etwc-add-button').show();
                            parentContainer.find('.etwc-wishlist-actions').hide();
                        }
                        if ( etwc_vars.wishlist_setting.wishlist_icon_on_product_loop == 'yes' ) {
                            if(wishlistIcon.length){
                                var img = wishlistIcon.find('.etwc-loop-img');
                                if (img.length) {
                                    img.attr( 'src', etwc_vars.wishlist_setting.add_to_wishlist_icon );
                                }
                                wishlistIcon.removeClass( 'etwc-remove-wishlist' ).addClass( 'etwc-wishlist-button' );
                            }
                        }
                    } else {
                        console.log('Wishlist error:', response.data.message);
                    }
                },
                error: function (xhr, status, error) {
                    console.log('AJAX Error:', error);
                },
                complete: () => {
                    __this.prop('disabled', false).removeClass('etwc-loading');
                },
            });
        }

        addToCartHandler(e) {
            e.preventDefault();

            var __this      =  $(e.currentTarget),
                productId   = __this.data('product_id');
    
            if (!productId) return;
    
            $.ajax({
                type: 'POST',
                url: wc_add_to_cart_params.wc_ajax_url.toString().replace('%%endpoint%%', 'add_to_cart'),
                data: { product_id: productId, quantity: 1 },
                beforeSend: () => {
                    __this.addClass('loading');
                },
                success: (response) => {
                    if ( etwc_vars.wishlist_setting.etwc_remove_on_add_to_cart == 'yes' ) {
                        $.ajax({
                            type: 'POST',
                            url: etwc_vars.ajax_url,
                            data: {
                                action: 'etwc_remove_from_wishlist',
                                product_id: productId,
                                nonce: etwc_vars.wishlist_nonce,
                            },
                            success: function (response) {
                                if (response.success) {
                                    __this.closest('tr.etwc-wishlist-row').remove();
                                    if ( etwc_vars.wishlist_setting.etwc_redirect_to_cart == 'yes' ) {
                                        window.location.href = wc_add_to_cart_params.cart_url; 
                                    }    
                                } else {
                                    console.log('comething went wrong');
                                }
                            }
                        });
                    }else{
                        if ( etwc_vars.wishlist_setting.etwc_redirect_to_cart == 'yes' ) {
                            window.location.href = wc_add_to_cart_params.cart_url; 
                        } 
                    }

                },
                error: (xhr, status, error) => {
                    console.log('Error adding to cart.');
                },
                complete: () => {
                    __this.removeClass('loading').addClass('added');
                }
            });
        }

        deleteWishlistHandler(e) {
            e.preventDefault();

            var __this      = $(e.currentTarget),
                wishlistId  = __this.data('wishlist-id'),
                wishlistRow = __this.closest('tr.etwc-wishlist-row');

            if (!wishlistId) return;

            if (confirm('Are you sure you want to delete this wishlist?')) {
                $.ajax({
                    url: etwc_vars.ajax_url,
                    type: 'POST',
                    data: {
                        action: 'etwc_delete_wishlist',
                        wishlist_id: wishlistId,
                        nonce: etwc_vars.wishlist_nonce,
                    },
                    beforeSend: function () {
                        wishlistRow.css('opacity', '0.5');
                    },
                    success: function (response) {
                        if (response.success) {
                            wishlistRow.remove();
                        } else {
                            console.log('Error: ' + response.data);
                            wishlistRow.css('opacity', '1');
                        }
                    },
                    error: function () {
                        console.log('An error occurred. Please try again.');
                        wishlistRow.css('opacity', '1');
                    },
                });
            }
        }

    }

    new EKWCWishlistFrontend();
    
});