<?php get_header(); ?>

<?php get_sidebar(); ?>

<!-- LOADING -->
<div class="spinner"></div>

<div id="single_campaign" class="page page_margin">

	<?php 
	global $post;
	$coll = $post->post_name;
	?>

	<!-- LINK TO CORRESPONDING STORE -->
	<p class="page_link">
		<a class="button" href="<?php bloginfo( 'url' ); ?>/collection/<?php echo $coll; ?>">
			<?php echo get_the_title() . " Store"; ?>
		</a>
	</p>

	<div id="single_campaign_left" class="news_left">
		<ul id="single_campaign_images" class="gallery">
		<!-- VIDEO -->
		<?php 
		if ( get_field("video") ) : ?>
		   	<li class="campaign_video">
				<?php 
				$video = get_field("video");
				// IF IT CONTAINS DELIMITER
				if ( strpos($video, 'video/') !== false ) {
					$video_str = explode('video/', $video)[1];
					$video_id = explode('" width', $video_str)[0];
				} else {
					$video_str = explode('vimeo.com/', $video)[1];
					$video_id = explode('"', $video_str)[0];
				}
				?>
				<div id="campaign_video" data-id="<?php echo $video_id; ?>"></div>
				<script src="https://player.vimeo.com/api/player.js"></script> 	
		   	</li>
		<!-- IMAGES -->
	   	<?php endif;  
	   	if ( have_rows("images") ) : 	   		
			while ( have_rows("images") ) : the_row("image"); ?>
			<?php $image = get_sub_field("image");
				if( !empty($image) ): ?>
					<li><?php cpr_image_object($image, ""); ?></li>
				<?php
				endif;
			endwhile;
		endif; ?>
		</ul>
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
