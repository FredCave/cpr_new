<?php get_header(); ?>

<?php get_sidebar(); ?>

<!-- LOADING -->
<div class="spinner"></div>

<div id="single_campaign" class="page page_margin">

	<div id="single_campaign_left" class="news_left">
		<!-- VIDEO -->
		<?php if ( get_field("video") ) { ?>
		   	<div class="campaign_video">
				<?php the_field("video"); ?>		
		   	</div>
		<!-- IMAGES -->
	   	<?php } else if ( have_rows("images") ) : ?>		   		
	   		<ul id="single_campaign_images" class="gallery">
		   		<?php if ( have_rows("images") ) {
					while ( have_rows("images") ) : the_row("image"); ?>
					<?php $image = get_sub_field("image");
						if( !empty($image) ): ?>
							<li><?php cpr_image_object($image); ?></li>
						<?php
						endif;
					endwhile;
				} ?>
		   	</ul>
		<?php endif; ?>

	</div>

	<div id="single_campaign_right" class="news_right">
		<div class="gallery_nav">
			<div class="gallery_left"><img src="<?php bloginfo('template_url'); ?>/img/gallery_arrow_large.svg" /></div>
			<div class="gallery_right"><img src="<?php bloginfo('template_url'); ?>/img/gallery_arrow_large.svg" /></div>
		</div>
		<h1><?php the_title(); ?></h1>
		<?php the_field("images_credit"); ?>
	</div>

</div>

</div><!-- END OF #CAMPAIGN -->

<?php get_footer(); ?>
