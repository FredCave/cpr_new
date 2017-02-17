var Single = {
	
	init: function () {

		console.log("Single.init");

		this.bindEvents();

		// FIRST LOAD MAIN IMAGE
		this.mainImageLoad();

		// THEN COLLECTION (+FILTER)

	},

	bindEvents: function () {

		console.log("Single.bindEvents");

		var winScroll;
		// SCROLL CHECKER
		$(window).on('scroll', _.throttle(function(e) {
			winScroll = $(window).scrollTop();
			Single.scrollChecker( winScroll );
		}, 500));

	},

	scrollChecker: function ( scrollTop ) {

		console.log("Single.scrollChecker");

		var collTop = $(".collection").offset().top;
		if ( collTop < scrollTop + Page.winH ) {
			// LOAD COLLECTION
			Collection.init();
			// UNBIND SCROLLCHECKER
			$(window).off('scroll');
		}

	},

	mainImageLoad: function () {

		console.log("Single.mainImageLoad");

		// GET SRC FROM IMAGECALC
		var img = $(".single_main_image"),
			src = Page.imageCalc( img );
		// WAIT UNTIL SRC LOADED
		img.attr( "src", newSrc ).on("load", function () {
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
			console.log( 47, src );
			$(this).attr( "src", src );
		});

	}

}