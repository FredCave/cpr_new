<?php 
// SET BG COLOUR???
?>

<div id="menu_bottom" class="<?php if ( is_front_page() || is_singular( $post_types = 'product' ) ) { echo "hide"; } ?>">

	<div id="secondary_nav">
		
		<ul>
			<!-- FILTER -->
			<?php if ( is_product_category() || is_front_page() || is_singular( $post_types = 'product' ) ) { ?>
				<li id="secondary_filter">
					<span id="filter_toggle" class="">Filter</span>
					<img class="clear_filter" src="<?php bloginfo( 'template_url' ); ?>/img/filter_clear.svg" />
				</li>

				<?php echo product_filter(); ?>
			<?php } ?>

			<!-- ACCOUNT -->	
			<li id="secondary_account">
				<a href="<?php bloginfo( 'url' ); ?>/my-account/">Wholesale</a>
			</li>	

			<!-- CART -->
			<li id="secondary_cart">
				<div id="cart_container">
				    <a class="cart-contents" href="<?php echo WC()->cart->get_cart_url(); ?>" title="<?php _e( 'View your shopping cart' ); ?>">
				        <?php 
				        echo WC()->cart->cart_contents_count . " / " . WC()->cart->get_cart_total(); ?>
				    </a>
				</div>
			</li>
		</ul>

	</div>

</div>