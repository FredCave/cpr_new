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
<?php // product_filter(); ?>

<!-- LOADING -->
<div class="spinner"></div>

<div class="collection page_collection page" data-collection="<?php echo $slug; ?>">

	<ul id="filtered_products"></ul>

	<?php if ( have_posts() ) : ?>

		<?php woocommerce_product_loop_start(); ?>

			<?php while ( have_posts() ) : the_post(); ?>

				<?php wc_get_template_part( 'content', 'product' ); ?>
				
			<?php endwhile; ?>

		<?php woocommerce_product_loop_end(); ?>

	<?php endif; ?>

</div><!-- END OF .COLLECTION -->

<?php get_footer( ); ?>