<?php $initial_time = microtime(get_as_float); ?>

<?php get_header(); ?>
<?php get_sidebar(); ?>

<!-- LOADING -->
<div class="spinner"></div>

<div id="home" class="page" data-collection="collection">

	<!-- LANDING PAGE -->
	<?php include("includes/landing_page.php"); ?>

	<!-- COLLECTION -->
	<?php include("includes/front_loop.php"); ?>

</div><!-- END OF #HOME -->	
	    
<?php get_footer(); ?>

<?php $end_time = microtime(get_as_float); ?>
<?php // echo $end_time - $initial_time; ?>