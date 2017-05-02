<?php
/**
 * My Account page
 *
 * @author 		WooThemes
 * @package 	WooCommerce/Templates
 * @version     2.0.0
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit; // Exit if accessed directly
}
get_header();
get_sidebar();
// wc_print_notices(); 
?>

<!-- WHOLESALE LOGIN HERE -->

<p class="myaccount_user my_account">

	<?php /* echo "Wholesale currently unavailable."; */ ?>

	<?php
	printf(
		__( 'Hello <strong>%1$s</strong> (not %1$s? <a href="%2$s">Sign out</a>).', 'woocommerce' ) . ' ',
		$current_user->display_name,
		wc_get_endpoint_url( 'customer-logout', '', wc_get_page_permalink( 'myaccount' ) )
	); ?>
</p>

<div id="wholesale_link" class="my_account">
	<a class="button" href="<?php bloginfo( 'url' ); ?>/wholesale-ordering/">Wholesale order page</a>
</div>
