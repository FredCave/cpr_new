<?php
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}
global $product;
$classes = array();
// EXTRA CLASS FOR IMAGE PLACEMENT
$classes[] = "selected-product";
?>

<?php 
// REDIRECT LINKS FOR BOTTOM PRODUCTS
if ( get_field( "other_item" ) ) {
	$link_id = get_field( "other_item" )[0]->ID;
} else {
	$link_id = "";
}
// GET POST CLASSES
$all_classes = get_post_class();
// CLASSES TO LOOK FOR
$bottom_classes = array( "product-tag-shorts", "product-tag-leggings", "product-tag-skirts", "product-tag-pants" );
if( count( array_intersect($bottom_classes, $all_classes) ) > 0 ) {
    // IF AT LEAST ONE OF THESE CLASSES IS PRESENT
	$classes[] = "bottom";
}
?>

<?php if ( is_single() ) { 
	$classes[] = "single_product";
} else { 
	$classes[] = "non_single_product child-0";
} ?>



<li <?php post_class( $classes ); ?> data-link="<?php echo $link_id; ?>">
	<a href="<?php the_permalink(); ?>" class="open_single">
		<!-- LOAD FIRST TWO IMAGES FOR HOVER EFFECT -->
		<?php 
		$rows = get_field("product_images");
		if ( $rows ) : 
			$i = 1;
			while ( $i >= 0 ) :	
				$image = $rows[$i]['product_image'];
				// var_dump($image);		
				if( !empty($image) ): 
		            $thumb = $image['sizes'][ "thumbnail" ]; // 200x300
		            $medium = $image['sizes'][ "medium" ]; // 400x600
		            $large = $image['sizes'][ "large" ]; // 533x800
		            $extralarge = $image['sizes'][ "extra-large" ]; // 683x1024
		            $width = $image['sizes'][ "thumbnail-width" ]; 
		            $height = $image['sizes'][ "thumbnail-height" ]; 
		            if ( $i === 1 ) {
		            	$class = "back";
		            } else {
		            	$class = "front";
		            }
		            ?>
					<img 
					width="<?php echo $width; ?>"  
					height="<?php echo $height; ?>"  
				    src="" 
				    data-thm="<?php echo $thumb; ?>" 
				    data-med="<?php echo $medium; ?>" 
				    data-lrg="<?php echo $large; ?>" 
				    data-xlg="<?php echo $extralarge; ?>" 
					class="product_image <?php echo $class; ?>" />		
				<?php
				endif; // END OF IF IMAGE
				$i--; 
			endwhile;  
		endif; 
		?>
	</a>
</li>