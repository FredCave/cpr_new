<?php

// FUNCTIONS
function cpr_get_colls () {
	$args = array(
        'taxonomy'			=> 'product_cat',
        'orderby'			=> 'id',
		'order'				=> 'desc',
		"hide_empty" 		=> 0
    );
	$all_cats = get_categories( $args );
	foreach ( $all_cats as $cat ) { 
		if ( get_field( "cat__visible", "product_cat_" . $cat->term_taxonomy_id ) || is_user_logged_in() ) { 
			$slug = $cat->slug; ?>
			<li>
				<p><?php echo $cat->name; ?></p>
				<p><a href="<?php bloginfo('url'); ?>/collection/<?php echo $slug; ?>">Store</a></p>
				<p><a href="<?php bloginfo('url'); ?>/campaign/<?php echo $slug; ?>">Campaign</a></p>
			</li>
		<?php
		}	
	}
}

// HTML 
?>

<div id="menu_top">

	<div id="menu_top_visible">

		<div id="menu_logo">
			<a href="<?php bloginfo('url'); ?>"><img src="<?php bloginfo('template_url'); ?>/img/main_logo.svg" /></a>
		</div>

		<div id="menu_toggle">
			<a href="">
				<img src="<?php bloginfo('template_url'); ?>/img/menu.svg" /> 
			</a>
		</div>

	</div>

	<div id="menu_top_hidden">

		<div id="menu_content_wrapper">
			<ul id="menu_collections">
				<!-- LOOP THROUGH COLLECTIONS -->
				<?php cpr_get_colls(); ?>
			</ul>

			<p class="menu_link">
				<a href="<?php bloginfo( 'url' ); ?>/culture">Culture</a>
			</p>

			<p class="menu_link">
				<a href="<?php bloginfo( 'url' ); ?>/information">About</a>
			</p>

			<!-- SOCIAL MEDIA -->
			<ul id="menu_social_media">
				<li>
					<a target="_blank" href="https://www.facebook.com/canpeprey/">
						<img class="" src="<?php bloginfo('template_url'); ?>/img/facebook_icon.svg" />
					</a>
				</li>
				<li>
					<a target="_blank" href="https://www.instagram.com/canpeprey/">
						<img class="" src="<?php bloginfo( 'template_url' ); ?>/img/instagram_icon.svg" />
					</a>
				</li>
			</ul>

			<!-- NEWSLETTER -->
			<p id="newsletter_wrapper">
				<?php 
				// POPUP WINDOW ON CLICK
				// mailchimp_form(); ?>
			</p>

			<!-- TERMS AND CONDITIONS -->
			<p class="menu_link">
				<a href="<?php bloginfo(); ?>/_information">Terms and Conditions</a>
			</p>
		</div>	

	</div>

</div>