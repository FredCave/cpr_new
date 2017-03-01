<?php get_header(); ?>

<?php get_sidebar(); ?>

<!-- LOADING -->
<div class="spinner"></div>

<div id="news" class="page page_margin">

	<!-- NEWS LIST -->
	<ul id="news_list">
		<?php $the_query = new WP_Query("post_type=news");
		if ( $the_query -> have_posts() ) :
	        while ( $the_query -> have_posts() ) : $the_query-> the_post(); ?>

	    		<li class="news_post">
	    			
	    			<div class="news_content">
	    				<!-- LEFT COLUMN -->
	    				<div class="news_left" class="">
							<?php 
							// GET FIRST IMAGE OR EMBEDDED MEDIA
							if ( get_field("embedded_media") ) {
	    						// VIDEO
	    						the_field("embedded_media");
	    					} else if ( get_field("news_images") ) {
								// IMAGE
								$images = get_field("news_images");
								$image = $images[0]["news_image"];
								cpr_image_object($image);
	    					} ?>
	    				</div>
	    				<!-- RIGHT COLUMN -->
	    				<div class="news_right">
	    					<h5 class="news_title">
	    						<p><?php the_title(); ?></p>
	    					</h5>
		    					
		    				<?php 
		    				the_field("news_extract"); 
		    				// CHECK IF MAIN TEXT OR IF MORE THAN ONE IMAGE
		    				if ( get_field("news_main_text") || count($images) > 1 ) { ?>
		    					<a class="read_more" href="<?php the_permalink(); ?>">[See More...]</a>
		    				<?php } ?>							
		    				
		    				<?php /*
							<div class="sub_col">
								<h5 class="news_date">
									<?php 
									$news_date = get_the_date('F d Y');
									$lines = explode( " ", $news_date );
									foreach ( $lines as $line ) { ?>
										<span class="wrap"><?php echo $line; ?></span>
									<?php } ?>
								</h5>
							</div>
							<div class="sub_col">
								
							</div>
	
	    					<?php if ( get_field("news_images") ) { 
	    						// IF MORE THAN ONE IMAGE
	    						if ( count( get_field( "news_images" ) ) > 1 ) { ?>
		    						<!-- GALLERY ARROW -->
		    						<div class="gallery_arrow">
										<img src="<?php bloginfo('template_url'); ?>/img/gallery_arrow_large.svg" />
									</div>		    							
	    						<?php } ?>
	    						<!-- IMAGE SLIDESHOW -->
	    						<ul class="news_images gallery">
		    						<?php while ( have_rows("news_images") ) : the_row();
										$image = get_sub_field("news_image");
										if( !empty($image) ): 
								            $thumb = $image["sizes"][ "thumbnail" ]; // 300
								            $medium = $image["sizes"][ "medium" ]; // 600
								            $large = $image["sizes"][ "large" ]; // 800
								            $extralarge = $image["sizes"][ "extra-large" ]; // 1024
								            $full = $image["url"];
								            $width = $image["sizes"]["medium-width"];
								            $height = $image["sizes"]["medium-height"];
								        endif; 
								        if ( $width < $height ) {
								        	$class = "portrait";
								        } else {
											$class = "landscape";
								        }
								        ?>
									    <li class="news_image">
											<img width="<?php echo $width; ?>" 
												 height="<?php echo $height; ?>" 
												 sizes="(min-width: 40em) 95vw, 47vw"
												 srcset="<?php echo $thumb; ?> 300w,
														<?php echo $medium; ?> 600w,
														<?php echo $large; ?> 800w,
														<?php echo $large; ?> 2x" 
												class="<?php echo $class; ?>"
											/>
										</li>
		    						<?php endwhile; ?>	
	    						</ul>	    						
	    					<?php } else if ( get_field("embedded_media") ) {
	    						// VIDEO
	    						the_field("embedded_media");
	    					} ?>
							*/ ?> 

	    				</div>	    			
	    			</div><!-- END OF .NEWS_CONTENT -->
	    		
	    		</li><!-- END OF .NEWS_POST -->

		    <?php endwhile;
		    endif; ?>
    	</ul>

</div><!-- end of #news -->

<?php get_footer(); ?>