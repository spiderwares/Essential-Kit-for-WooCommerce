jQuery( function($){


    class EKWC_Frontend {
        
        constructor( DIV_TopBar, Giftbox ){
            this.__this;
            this.init_delay         = ekwc_shipping.initdelay;
            this.enable_disappear   = ekwc_shipping.is_time_to_disappear;
            this.time_to_disappear  = ekwc_shipping.time_to_disappear;
            this.timeout_display    = 0;
            this.timeout_init       = 0;
            this.DIV_TopBar         = DIV_TopBar;
            this.Giftbox            = Giftbox;

            this.eventHandlers();
        }

        eventHandlers(){
            $( document.body ).ready( this.initialize_Top_Bar() );
            $( document.body ).on( "click", "div#ekwc-shipping-bar-gift-box-icon, .ekwc-shipping-bar-bg_overlay, #ekwc-shipping-bar-close", this.toggle_gift_box_popup.bind(this) );
            $( document.body ).on( "click", "div.closebar", this.close_Top_Bar.bind(this) );
            $( document.body ).on( "click", "a#ekwc_continue_shopping", this.increment_Report.bind(this) );
        }

        initialize_Top_Bar() {
            var _this = this;
            this.timeout_init = setTimeout(function(){
                _this.bar_show();
            }, this.init_delay * 1000);
        }

        toggle_gift_box_popup(e){
            e.preventDefault();
            this.bar_hide();
            this.Giftbox.toggleClass( 'model-open' );
        }

        close_Top_Bar(e){
            e.preventDefault();
            this.bar_hide();
        }

        bar_show(){
            var _this = this;
            this.DIV_TopBar.fadeIn(500);
            if( this.enable_disappear ) {
                this.timeout_display = setTimeout(function () {
                    _this.bar_hide();
                }, this.time_to_disappear * 1000);
            }
        }

        bar_hide(){
            this.DIV_TopBar.fadeOut(500);
        }

        gift_box_hide(){
            jQuery('.wfspb-gift-box').addClass('wfsb-hidden');
        }

        gift_box_show(){
            jQuery('.wfspb-gift-box').removeClass('wfsb-hidden');
        }

        increment_Report(e){
            e.preventDefault();
            $.ajax({
                type : "POST",
                dataType : "json",
                url : ekwc_shipping.ajax_url,
                data : {
                    action: 'increment_report_continue_shopping',
                    nonce: ekwc_shipping.nonce,
                },
                success: function(response) {
                    window.location.href = response.url
                }
            });
        }
    }
    new EKWC_Frontend( $( "#ekwc-shipping-bar-topbar" ), $( "#ekwc-shipping-bar-giftbox_model") );
}); 