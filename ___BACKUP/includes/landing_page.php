<?php
	function get_landing_page () {
		$args = array(
	        'name' => 'landing-page'
	    );
	    $the_query = new WP_Query( $args );
	    if ( $the_query->have_posts() ) :
	        while ( $the_query->have_posts() ) : $the_query->the_post();
				if ( have_rows("landing_row") ) : 
					$i = 0;
					while ( have_rows("landing_row") ) : the_row();					
						$link = get_bloginfo('url');
						if ( get_sub_field('landing_link') ) {
							$link_id = get_sub_field('landing_link');
							$link = get_term_link( $link_id, 'product_cat');
						} else if ( get_sub_field('landing_internal_link') ) {
							$link_id = get_sub_field('landing_internal_link')[0];
							$link = get_bloginfo('url') . "?p=" . $link_id;			
						} else if ( get_sub_field('landing_external_link') ) {
							$link = get_sub_field('landing_external_link');
						}

						$image = get_sub_field('landing_image');
						if( !empty($image) ): 
				            $thumb = $image['sizes'][ "thumbnail" ]; // 300
				            $medium = $image['sizes'][ "medium" ]; // 600
				            $large = $image['sizes'][ "large" ]; // 800
				            $extralarge = $image['sizes'][ "extra-large" ]; // 1024
				            $landing_page = $image['sizes'][ "landing-page" ]; // 2048
				            ?>
					        <li class="">
						        <a class="landing_link" href="<?php echo $link; ?>">
							        <div class="picturefill-background">
									    <span data-src="<?php echo $large; ?>"></span>
									    <span data-src="<?php echo $extralarge; ?>" data-media="(min-width: 800px)"></span>
									    <span data-src="<?php echo $landing_page; ?>" data-media="(min-width: 1024px)"></span>
									</div>	
									<div class="landing_page_title">
										<?php the_sub_field('landing_title'); ?>
									</div>	
								</a>
							</li>	
						<?php
						endif;
						$i++;	 			   
					endwhile;
				endif; 
			endwhile;
		endif;
	}
?>

<div id="landing_page">

	<!-- LANDING PAGE CONTENT -->
	<ul>
		<?php get_landing_page(); ?>
	</ul>

</div>

<!-- LANDING PAGE SCROLL DOWN -->
<div id="landing_page_access">
	<a href="">Store</a>
</div>