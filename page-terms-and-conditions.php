<?php get_header(); ?>
<?php get_sidebar(); ?>

<!-- LOADING -->
<div class="spinner"></div>

<div id="terms_and_conditions" class="page">

	<?php 	
		$terms_query = new WP_Query("name=terms");
		if ( $terms_query->have_posts() ) :
			while ( $terms_query->have_posts() ) : $terms_query->the_post();
				the_content();
			endwhile;
		endif;
	?>

</div>

<?php get_footer(); ?>