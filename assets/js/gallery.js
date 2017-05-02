var Gallery = {

	init: function () {

		console.log("Gallery.init");

		this.bindEvents();

		this.imagesLoad();

		$(".spinner").fadeOut();

	},

	bindEvents: function () {

		console.log("Gallery.bindEvents");

		$(".gallery_right").on("click", function () {
			Gallery.nextSlide( $(".gallery") );
		});

		$(".gallery_left").on("click", function () {
			Gallery.prevSlide( $(".gallery") );
		});

		$(window).on("resize", _.throttle(function (e) {
			Gallery.imgSizeCheck();
		}, 500 ) );

	},

	imagesLoad: function ( image ) {

		console.log("Gallery.imagesLoad");

		this.imgSizeCheck();

		var src;
		$(".gallery img").each( function (){
			src = Page.imageCalc( $(this) );
			$(this).attr( "src", src ).css("opacity","1");
		});

		// SHOW FIRST SLIDE		
		$(".gallery").find("li").first().addClass("visible");

	},

	imgSizeCheck : function () {

		console.log("Gallery.imgSizeCheck");

		// CHECK IF LANDSCAPE IMAGES ARE TOO TALL FOR WRAPPER
		// RUN ON INIT + RESIZE

		var wrapperRatio = $(".gallery").width() / $(".gallery").height(),
			imgRatio;

		// console.log( 55, wrapperRatio );

		// LOOP THROUGH IMAGES
		$(".gallery img").each( function (){
			// CHECK IMG RATION AGAINST WRAPPER RATIO
			imgRatio = $(this).width() / $(this).height();
			if ( imgRatio < wrapperRatio ) {
				$(this).removeClass("landscape").addClass("portrait");
			}
		});

	},

	nextSlide: function ( gallery ) {

		console.log("Gallery.nextSlide");

		var current = gallery.find(".visible");

		// console.log( 51, current, current.next().length );

		current.removeClass("visible");
		if ( current.next().length ) {
			current.next().addClass("visible");
		} else {
			gallery.find("li").first().addClass("visible");		
		}

	},

	prevSlide: function ( gallery ) {

		console.log("Gallery.prevSlide");

		var current = gallery.find(".visible");

		current.removeClass("visible");
		if ( current.prev().length ) {
			current.prev().addClass("visible");
		} else {	
			gallery.find("li").last().addClass("visible");		
		}

	},

	campaignVideoResize: function () {
            
		console.log("Gallery.campaignVideoResize");

        var video = $("#campaign_video iframe"),
        	vidR = parseInt( video.attr("height") ) / parseInt( video.attr("width") ); // VIDEO RATIO
			newH = ( $(".gallery").width() * vidR ) / $(".gallery").height() * 100;

        console.log( 113, vidR, newH );

        video.css({
            "width": "100%",
            "margin-left": "",
            // "margin-top": 0 - ( this.winW * vidR - this.winH ),
            "height": newH + "%"
        });  

    },

}