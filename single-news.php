<?php get_header(); ?>

<?php get_sidebar(); ?>

<!-- LOADING -->
<div class="spinner"></div>

<div id="single_news" class="page page_margin">

	<p class="page_link">
		<a class="button" href="<?php bloginfo( 'url' ); ?>/culture/">
			Back to Culture
		</a>
	</p>

	<div id="single_news_left" class="news_left">
			
		<h1><?php the_title(); ?></h1>
		<?php the_field("news_extract"); ?>

		<ul id="single_news_images" class="">
			<?php if ( have_rows("news_images") ) {
				while ( have_rows("news_images") ) : the_row("news_image"); ?>
					<li>
						<?php $image = get_sub_field("news_image");
						cpr_image_object($image); ?>
					</li>
				<?php
				endwhile;
			} ?>
		</ul>

		<?php the_field("news_main_text"); ?>	

	</div>	

	<div id="single_news_right" class="news_right">

		<?php /*
		<div class="gallery_nav">
            <div class="gallery_left"><img src="<?php bloginfo('template_url'); ?>/img/gallery_arrow_large.svg" /></div>
            <div class="gallery_right"><img src="<?php bloginfo('template_url'); ?>/img/gallery_arrow_large.svg" /></div>
        </div>
        */ ?>
		

	</div>	

</div><!-- end of #news -->

<?php get_footer(); ?>