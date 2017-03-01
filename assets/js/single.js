var Single = {
	
	init: function () {

		console.log("Single.init");

		this.bindEvents();

		// ONLY MAIN IMAGE IS LOADED ON INIT
		this.mainImageLoad();

		this.slideShowCheck();

	},

	bindEvents: function () {

		console.log("Single.bindEvents");

		var winScroll;
		// SCROLL CHECKER
		$(window).on('scroll', _.throttle(function(e) {
			winScroll = $(window).scrollTop();
			Single.scrollChecker( winScroll );
		}, 500));

		$(".product_desc_click").on("click", function(){
			Single.descToggle( $(this) );
		});

		// CLICK OUTSIDE TO CLOSE
		$(".single_page").on("click", function(e){
			if( !$(e.target).closest(".product_desc_toggle").length ) {
				$(".product_desc_toggle").each( function(){
					if ( $(this).find(".product_desc_click").hasClass("expanded") ) {
		        		Single.descClose( $(this) );
		    		}
				});
			} 
		});

		// BIND BUTTON EVENTS
		$(".gallery_right").on("click", function () {
			var target = $(this).parents(".gallery_nav").prev(".single_images_right").find(".gallery");
			Gallery.nextSlide( target );
		});

		$(".gallery_left").on("click", function () {
			var target = $(this).parents(".gallery_nav").prev(".single_images_right").find(".gallery");
			Gallery.prevSlide( target );
		});

	},

	scrollChecker: function ( scrollTop ) {

		console.log("Single.scrollChecker");

		var infoTop = $(".single_info_wrapper").offset().top, 
			collTop = $(".collection").offset().top;
		if ( infoTop < scrollTop + Page.winH ) {
			// FADE IN BOTTOM MENU
			$("#menu_bottom").fadeIn().removeClass("hide");
			// LOAD COLLECTION
			if ( collTop < scrollTop + Page.winH ) {
				console.log(39);
				// LOAD COLLECTION
				Collection.init();
				// UNBIND SCROLLCHECKER
				$(window).off('scroll');
			}
		} else {
			$("#menu_bottom").fadeOut().addClass("hide");
		}

	},

	mainImageLoad: function () {

		console.log("Single.mainImageLoad");

		// GET SRC FROM IMAGECALC
		var img = $(".single_main_image"),
			src = Page.imageCalc( img );

		console.log( 60, src );

		// WAIT UNTIL SRC LOADED
		img.attr( "src", src ).on("load", function () {
			// HIDE LOADING ANIMATION
			$(".spinner").fadeOut();
			// FADE IN PAGE
			$("#single_page").css("opacity","1");
			// RE-SOURCE OTHER IMAGES
			Single.additionalImagesLoad();
		});

	},

	additionalImagesLoad: function() {

		console.log("Single.additionalImagesLoad");

		var src;

		$(".single_additional_image").each( function (){
			src = Page.imageCalc( $(this) );
			$(this).attr( "src", src );
		});

	},

	slideShowCheck: function () {

		console.log("Single.slideShowCheck");

		$(".single_images_right").each( function(){
			// GET NUMBER OF IMAGES
			var noImages = $(this).find("img").length;
			// IF NOIMAGES > 1 : INIT SLIDESHOW
			if ( noImages > 1 ) {
				Single.slideShowInit( $(this) );
			}
			// SHOW FIRST IMAGE
			$(this).find("li").first().addClass("visible");
		});

	},

	slideShowInit: function ( wrapper ) {

		console.log("Single.slideShowInit");

		// SHOW BUTTONS
		wrapper.next(".gallery_nav").show();

	},

	descOpen: function ( target ) {

		console.log("Single.descOpen", target);

		target.find(".product_desc").css({
				"height" : "auto",
				"max-height" : 400,
				"padding-bottom" : "16px" 	
			});
		target.find(".product_desc_click").addClass("expanded");

	},

	descClose: function ( target ) {

		console.log("Single.descClose");

		target.find(".product_desc").css({
			"height" : "",
			"max-height" : "",
			"padding-bottom" : "" 	
		});
		target.find(".product_desc_click").removeClass("expanded");

	},

	descToggle: function ( click ) {

		console.log("Single.descToggle");

		var target = click.parents(".product_desc_toggle");
		if ( !click.hasClass("expanded") ) {
			Single.descOpen( target );
		} else {
			Single.descClose( target );
		}

	}

}