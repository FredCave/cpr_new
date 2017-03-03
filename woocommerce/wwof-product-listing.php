<?php
/**
 * @author 		Rymera Web Co
 * @package 	WooCommerceWholeSaleOrderForm/Templates
 * @version     1.3.0
*/

if ( !defined( 'ABSPATH' ) ) exit; // Exit if accessed directly
global $wc_wholesale_order_form;

// IF NOT LOGGED IN: REDIRECT
if ( !is_user_logged_in() ) {
    ?>
    <p class="return-to-shop">
        <a class="button wc-backward" href="<?php bloginfo( 'url' ); ?>">
            <?php _e( 'Return To Shop', 'woocommerce' ) ?>
        </a>
    </p>
    <?php
    exit;
}
?>

<div id="wwof_product_listing_table_container" class="wholesale_page" style="position: relative;">

    <table id="wwof_product_listing_table">

        <tbody>

            <?php 
            $_REQUEST[ 'tab_index_counter' ] = 1;
            $thumbnailSize = $wc_wholesale_order_form->getProductThumbnailDimension();

            if ( $product_loop->have_posts() ) {

                while ( $product_loop->have_posts() ) {

                    $product_loop->the_post();
                    $product = wc_get_product( get_the_ID() ); 
                    $product_id = $product->id;

                    $tags = get_the_terms( get_the_ID(), 'product_tag' );
                    $cat = get_the_terms( get_the_ID(), 'product_cat' );
                    ?>

                    <tr id="<?php echo get_the_ID(); ?>" class="<?php echo $tags[0]->slug . " " . $cat[0]->slug; ?>">
                        
                        <td class="product_meta_col" style="display: none !important;">
                            <?php echo $wc_wholesale_order_form->getProductMeta( $product ); ?>
                        </td>

                        <td class="product_title_col">

                            <div class="wholesale_product_image">
                                <!-- GET GALLERY -->
                                <ul class="gallery">
                                    <?php 
                                        $images = get_field( "product_images", $product->id ); 
                                        $i = 1;
                                        foreach ( $images as $image ) { 
                                            if ( !empty($image["product_image"]) ): ?>
                                            <li class="<?php if ( $i === 1 ) { echo "visible"; } ?>">
                                                <?php cpr_image_object ( $image["product_image"], "wholesale_image" ); ?>
                                            </li>                              
                                            <?php 
                                            endif;
                                        $i++;
                                    } ?>
                                </ul>

                                <div class="gallery_nav">
                                    <div class="gallery_left"><img src="<?php bloginfo('template_url'); ?>/img/gallery_arrow_large.svg" /></div>
                                    <div class="gallery_right"><img src="<?php bloginfo('template_url'); ?>/img/gallery_arrow_large.svg" /></div>
                                </div>

                            </div><!-- END OF .WHOLESALE_PRODUCT_IMAGE -->

                            <div class="wholesale_product_title">
                                <p class="wsale_product_title"><?php echo $wc_wholesale_order_form->getProductTitle( $product , get_the_permalink() ); ?></p>
                                <p><?php echo $this_sku = $product->get_sku(); ?></p>
                           
                                <p><?php echo $wc_wholesale_order_form->getProductVariationField( $product ); ?></p>

                                <span class="product_price_col wholesale_prices">
                                    <?php echo $wc_wholesale_order_form->getProductPrice( $product ); ?>
                                </span>
                            
                                <!-- VIGNETTES OF RELATED ITEMS -->
                                <?php other_colours( $product_id, true ); ?>

                                <!-- PLACEHOLDER FOR TITLES -->
                                <p class="wholesale_other_colours_title"></p>
                             
                                <!-- DESCRIPTION -->
                                <div class="wholesale_desc wholesale_desc_left">
                                    <p>
                                        <?php if ( get_field( "product_info", $product_id ) ) {
                                            echo get_field( "product_info", $product_id );
                                        } ?>
                                    </p>
                                    <p>
                                        <?php if ( get_field( "product_description", $product_id ) ) {
                                            echo get_field( "product_description", $product_id );
                                        } ?>
                                    </p>
                                </div>
                            </div><!-- END OF .WHOLESALE_PRODUCT_TITLE -->

                        </td>

                        <td class="product_sku_col <?php echo $wc_wholesale_order_form->getProductSkuVisibilityClass(); ?>"></td>
                        
                        <td class="product_price_col"></td>
                        
                        <td class="product_stock_quantity_col <?php echo $wc_wholesale_order_form->getProductStockQuantityVisibilityClass(); ?>">
                            <!-- DESCRIPTION -->
                            <div class="wholesale_desc wholesale_desc_right">
                                <p>
                                    <?php if ( get_field( "product_info", $product_id ) ) {
                                        echo get_field( "product_info", $product_id );
                                    } ?>
                                </p>
                                <p>
                                    <?php if ( get_field( "product_description", $product_id ) ) {
                                        echo get_field( "product_description", $product_id );
                                    } ?>
                                </p>
                            </div>
                        </td>

                        <td class="product_quantity_col">

                            <?php // echo $wc_wholesale_order_form->getProductQuantityField( $product ); ?>

                            <?php // echo $wc_wholesale_order_form->getProductRowActionFields( $product ); ?>

                            <?php 
                            $product_variations = $product->get_available_variations();
                            // LOOP THROUGH VARIATIONS
                            foreach ( array_reverse($product_variations) as $variation ) { 
                                // echo "x";
                                // echo $wc_wholesale_order_form->getProductRowActionFields( $variation );
                                $variation_id = $variation['variation_id'];
                                ?>
                                <div class="variation_wrapper" data-variation="<?php echo $variation_id; ?>">
                                        <!-- VARIATION TITLE -->   
                                        <p class="variation_size">
                                            <?php echo $variation["attributes"]["attribute_pa_size"]; ?>
                                        </p>
                                        <!-- QUANTITIES -->   
                                        <?php 
                                            foreach( WC()->cart->get_cart() as $cart_item_key => $values ) {
                                                $cart_id = $values['data']->variation_id;
                                                // echo $cart_id . "," . $variation_id . "<br>";
                                                if ( $variation_id === $cart_id ) { ?>
                                                    <div class="in_cart">
                                                        <span class="quantity_in_cart">
                                                            <?php echo $values["quantity"]; ?>
                                                        </span> in cart
                                                    </div>
                                                <?php
                                                }
                                            }
                                        ?>
                                    <?php echo $wc_wholesale_order_form->getProductQuantityField( $product ); 
                                    /* ?>
                                    <input type="submit" class="update_cart button" name="update_cart" value="<?phpesc_attr_e( 'Update Cart', 'woocommerce' ); ?>" /> 
                                    */ ?>
                                    <input data-id="<?php echo $product_id; ?>" data-variation="<?php echo $variation_id; ?>" data-size="<?php echo $variation["attributes"]["attribute_pa_size"]; ?>" type="button" class="custom_add_to_cart btn btn-primary button alt" value="Add to Cart"/>
                                    <?php /* <span class="spinner"></span> */ ?>

                                </div>
                            <?php 
                            } 
                            ?>

                        </td>
                        
                        <td class="product_row_action"></td>

                    </tr>
                    
                    <?php $_REQUEST[ 'tab_index_counter' ] += 1;

                } // END WHILE LOOP

            } else {

                ?>
                <tr class="no-products">
                    <td colspan="4">
                        <span><?php _e( 'No Products Found' , 'woocommerce-wholesale-order-form' ); ?></span>
                    </td>
                </tr>
                <?php

            }
        ?>
        </tbody>
    </table><!--#wwof_product_listing_table-->
</div><!--#wwof_product_listing_table_container-->

<?php // echo $wc_wholesale_order_form->getCartSubtotal(); ?>

<div id="wwof_product_listing_pagination">

    <div class="total_products_container">
        <span class="total_products"><?php
            echo sprintf( __( '%1$s Product/s Found' , 'woocommerce-wholesale-order-form' ) , $product_loop->found_posts ); ?>
        </span>
    </div>

    <?php echo $wc_wholesale_order_form->getGalleryListingPagination( $paged , $product_loop->max_num_pages , $search , $cat_filter ); ?>

    <!-- VIEW CART BUTTON -->
    <div class="wholesale_go_to_cart">
        <a href="<?php bloginfo( 'url' ); ?>/cart/" class="button">View Cart</a>
    </div>

</div><!--#wwof_product_listing_pagination-->

<script>
    Wholesale.init();
</script>

