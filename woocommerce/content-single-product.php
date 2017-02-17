<?php
if ( ! defined( 'ABSPATH' ) ) {
	exit; 
}

if ( is_single() ) { 
	$classes[] = "single_product";
} else { 
	$classes[] = "non_single_product";
} 
?>

<!--<div itemscope itemtype="<?php echo woocommerce_get_product_schema(); ?>" id="product-<?php the_ID(); ?>" <?php post_class( $classes ); ?>>-->
<div itemscope itemtype="<?php echo woocommerce_get_product_schema(); ?>" id="product-<?php the_ID(); ?>">

	<div id="single_main_image">

		<?php 
		$image = get_field("product_images")[0]["product_image"];
		if( !empty($image) ): 
        	$width = $image["width"];
        	$height = $image["height"];
            $thumb = $image["sizes"][ "thumbnail" ]; // 300
            $medium = $image["sizes"][ "medium" ]; // 600
            $large = $image["sizes"][ "large" ]; // 800
            $extralarge = $image["sizes"][ "extra-large" ]; // 1024
            $landingpage = $image["sizes"]["landing-page"]; // 2048
        	?>

			<img 
			width="<?php echo $width; ?>" 
			height="<?php echo $height; ?>" 
		    src="" 
		    data-thm="<?php echo $thumb; ?>" 
		    data-med="<?php echo $medium; ?>" 
		    data-lrg="<?php echo $large; ?>" 
		    data-xlg="<?php echo $extralarge; ?>" 
		    data-lnd="<?php echo $landingpage; ?>" 
			class="single_main_image <?php echo $class; ?>" />	

		<?php endif; ?>

	</div><!-- end of #single_main_image -->

	<!-- PRODUCT INFO -->
	<?php wc_get_template_part( 'content', 'single-product-info' ); ?>

</div><!-- END OF PRODUCT -->







