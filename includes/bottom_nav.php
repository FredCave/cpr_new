<div id="menu_bottom">

	<!-- PRIMARY NAV CLOSE NAV -->
	<div id="nav_close">
		<img src="<?php bloginfo( 'template_url' ); ?>/img/filter_clear.png" />
	</div>

	<!-- SECONDARY NAV -->
	<div id="secondary_nav" class="<?php if ( is_front_page() ) { echo "hide"; } ?>">
		<ul>
			<!-- FILTER -->
			<?php if ( is_product_category() || is_front_page() ) { ?>
				<li id="secondary_filter">
					<span id="filter_toggle">Filter</span>
					<img class="clear_filter" src="<?php bloginfo( 'template_url' ); ?>/img/filter_clear.png" />
				</li>	
			<?php } else { ?>
				<li id="secondary_filter">
					<span id="filter_toggle" class="hide_filter">Filter</span>
					<img class="clear_filter" src="<?php bloginfo( 'template_url' ); ?>/img/filter_clear.png" />
				</li>
			<?php } ?>

			<!-- ACCOUNT -->	
			<li id="secondary_account"><a href="<?php bloginfo( 'url' ); ?>/my-account/">Wholesale</a></li>	

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