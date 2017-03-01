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
						// DEFAULT
						$link = get_bloginfo('url');
						// LINK TO ARCHIVE PAGE
						if ( get_sub_field('landing_link') ) {
							$link_id = get_sub_field('landing_link');
							$link = get_term_link( $link_id, 'product_cat');
						// LINK TO NORMAL PAGE
						} else if ( get_sub_field('landing_internal_link') ) {
							$link_id = get_sub_field('landing_internal_link')[0];
							$link = get_bloginfo('url') . "?p=" . $link_id;			
						// EXTERNAL LINK
						} else if ( get_sub_field('landing_external_link') ) {
							$link = get_sub_field('landing_external_link');
						}
						$image = get_sub_field('landing_image');
						if( !empty($image) ): 
				        	$width = $image['width']; 
				        	$height = $image['height']; 
				            $thumb = $image['sizes'][ "thumbnail" ]; // 300
				            $medium = $image['sizes'][ "medium" ]; // 600
				            $large = $image['sizes'][ "large" ]; // 800
				            $extralarge = $image['sizes'][ "extra-large" ]; // 1024
				            $landing_page = $image['sizes'][ "landing-page" ]; // 2048
				            ?>
					        <li class="">						        
						        <?php
						        // LO-DEF IMAGE
						        if ( $i === 0 ) { ?>
							        <div class="holding_image blurred" 
									    style="background-image:url(<?php echo $thumb; ?>)" 
									    >
									</div>
						        <?php } ?>
						        <div class="bg_image blurred" 
									data-width="<?php echo $width; ?>" 
									data-height="<?php echo $height; ?>" 
								    data-thm="<?php echo $thumb; ?>" 
								    data-med="<?php echo $medium; ?>" 
								    data-lrg="<?php echo $large; ?>" 
								    data-xlg="<?php echo $extralarge; ?>" 
								    data-lnd="<?php echo $landing_page; ?>" >
								</div>	
								<a class="landing_link" href="<?php echo $link; ?>">
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
	<?php /*
	<div id="video_wrapper">
		<video id="video" width="872" height="480" autoplay loop muted>
			<source src="<?php bloginfo( 'template_url' ); ?>/img/video.mp4" type="video/mp4">
		</video>
	</div>
	*/ ?>

	<ul>
		<?php get_landing_page(); ?>
	</ul>

	<!-- LANDING PAGE SCROLL DOWN -->
	<div id="landing_page_access">
		<a href="">Store</a>
	</div>

</div>




