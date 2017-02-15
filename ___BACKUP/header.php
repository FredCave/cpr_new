<!DOCTYPE html>
<html <?php language_attributes(); ?> style="margin-top: 0px !important">

<head>
	<?php $title = explode ( ",", wp_title( ",", false, "right" ) )[0]; ?>
	<title>Can Pep Rey <?php if ( !is_front_page() ) echo "– " . $title; ?></title>
    <meta name="description" content="">
	<meta charset="UTF-8">
	<meta http-equiv="X-UA-Compatible" content="IE=9" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta property="og:url" content="<?php bloginfo('url'); ?>/" />
    <meta property="og:type" content="Website" />
    <meta property="og:title" content="Can Pep Rey" />
    <meta property="og:description" content="Can Pep Rey is a wom­enswear brand based on the rel­a­tive con­cept of liv­ing space, fash­ion and art." />
	<meta property="og:image" content="http://jackandbill.com/cpr2/wp-content/uploads/2016/03/CPR-71-1024x683.jpg" />
    <meta property="og:image:width" content="200" />
	<meta property="og:image:height" content="200" />

	<meta name="viewport" content="width=device-width, initial-scale=1">
	<link rel="stylesheet" type="text/css" href="<?php bloginfo('stylesheet_url') ?>">

	<link rel="shortcut icon" href="<?php bloginfo("template_url"); ?>/img/favicon-160x160.png">
	<link rel="apple-touch-icon" sizes="160x160" href="/favicon-160x160.png">
	<script src="<?php bloginfo('template_url'); ?>/js/jquery.min.js"></script>
	<script>
		// PICTURE ELEMENT HTML5 SHIV
		document.createElement( "picture" );
		// FIX IE CONSOLE ERRORS
		if (!window.console) console = {log: function() {}}; 
	</script>


	<?php wp_head(); ?>
</head>

<?php 
// SET COLOUR
// IF COLLECTION OR SINGLE OR HOME
if ( is_archive() || is_single() || is_home() ) {
	$page_obj = get_queried_object();
	if ( is_archive() ) {
		$cat_id = $page_obj->term_id;
	} else if ( is_single() ) {
		// GET PARENT COLLECTION ID
		$page_id = $page_obj->term_id;
		$parent_cat = get_the_terms( $post->ID, 'product_cat' );
		$cat_id = $parent_cat[0]->term_id;
	} else if ( is_home() ) {
		// GET LATEST COLLECTION
			// GET ALL COLLECTIONS
		$args = array(
		    'taxonomy'			=> 'product_cat',
		    'orderby'			=> 'id',
			'order'				=> 'desc',
			'hide_empty'		=> 0
		);
		$all_cats = get_categories( $args );
			// CHECK IF SHOULD BE VISIBLE ON FRONT PAGE OR NOT
		$cat_id;
		foreach ( $all_cats as $cat ) {  	
			if ( get_field( "cat__visible", "product_cat_" . $cat->term_id ) ) {
				$cat_id = $cat->term_id;
				break;
			}
		}	
	}
	$bg_color = get_field( "cat__colour", "product_cat_" . $cat_id );	
	if ( !$bg_color ) {
		// $bg_color = "#efebe8";
		$bg_color = "white"; // DEFAULT
	}
}
?>

<body>
	<div id="wrapper" style="background:<?php echo $bg_color; ?>">
