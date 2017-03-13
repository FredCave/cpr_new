<!DOCTYPE html>
<html <?php language_attributes(); ?> style="margin-top: 0px !important">

<head>
	<?php 
	// GET CURRENT TITLE
	$title = explode ( ",", wp_title( ",", false, "right" ) )[0]; 
	// GET LANDING PAGE IMAGE
	$the_query = new WP_Query( 'name=landing-page' );
	if ( $the_query->have_posts() ) :
	    while ( $the_query->have_posts() ) : $the_query->the_post();
			$images = get_field("landing_row");
			$landing_image = $images[0]["landing_image"]["sizes"]["extra-large"];
			if ( empty($landing_image) ) {
				$landing_image = "http://canpeprey.com/static/3_0289-1024x683.jpg";
			}
		endwhile;
		wp_reset_postdata();
	endif;
	?>
	<title>Can Pep Rey<?php if ( !is_front_page() ) echo " – " . $title; ?></title>
    <meta name="description" content="<?php bloginfo("description"); ?>">
	<meta charset="UTF-8">
	<meta http-equiv="X-UA-Compatible" content="IE=9" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta property="og:url" content="<?php bloginfo('url'); ?>/" />
    <meta property="og:type" content="Website" />
    <meta property="og:title" content="<?php bloginfo("name"); ?>" />
    <meta property="og:description" content="<?php bloginfo("description"); ?>" />
	<meta property="og:image" content="<?php echo $landing_image; ?>" />
    <meta property="og:image:width" content="200" />
	<meta property="og:image:height" content="200" />

	<meta name="viewport" content="width=device-width, initial-scale=1">
	<link rel="stylesheet" type="text/css" href="<?php bloginfo('stylesheet_url') ?>">
	<link rel="stylesheet" type="text/css" href="<?php bloginfo('template_url') ?>/style.min.css">

	<link rel="shortcut icon" href="<?php bloginfo("template_url"); ?>/img/favicon-160x160.png">
	<link rel="apple-touch-icon" sizes="160x160" href="/favicon-160x160.png">
	<script>
		// FIX IE CONSOLE ERRORS
		if (!window.console) console = {log: function() {}}; 
	</script>

	<?php wp_head(); ?>
</head>

<?php 
// SET BG COLOUR
$page_obj = get_queried_object();
?>

<body>
	<div id="wrapper" style="background:<?php echo cpr_set_bg( $page_obj ); ?>">