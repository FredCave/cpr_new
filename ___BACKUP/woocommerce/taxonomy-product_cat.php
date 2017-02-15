<?php
if ( ! defined( 'ABSPATH' ) ) {
	exit; 
}

get_header();
get_sidebar();

// GET COLLECTION SLUG FOR DATA-COLLECTION ATTRIBUTE
$page_obj = get_queried_object();
$page_id = $page_obj->term_id;
$slug = $page_obj->slug;
?>

<!-- COLLECTION FILTER -->
<?php product_filter(); ?>

<!-- LOADING -->
<div id="loading">
	<img src="<?php bloginfo( 'template_url' ); ?>/img/loading.gif" />
</div>

<?php
// BACKGROUND COLOUR SETTER (MOVED TO HEADER)
// $bg_colour = get_field( "cat__colour", "product_cat_" . $page_id );
?>

<div class="collection page_collection page" data-collection="<?php echo $slug; ?>">

	<?php if ( have_posts() ) : ?>

		<?php woocommerce_product_loop_start(); ?>

			<?php while ( have_posts() ) : the_post(); ?>

				<?php wc_get_template_part( 'content', 'product' ); ?>
				
			<?php endwhile; ?>

		<?php woocommerce_product_loop_end(); ?>

	<?php endif; ?>

</div><!-- END OF .COLLECTION -->

<?php get_footer( ); ?>