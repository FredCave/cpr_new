var Page = {

	menuVisible: false, 

	winW: $(window).width(),

	winH: $(window).height(),

	init: function () {

		console.log("Page.init");

		// HOME PAGE
		if ( $("#home").length ) {
			Home.init();
		// COLLECTION + SINGLE PAGES
		} else if ( $(".collection").length ) {
			// IF SINGLE
			if ( $("#single_page").length ) {
				Single.init();
			} else {
				Collection.init();
			}
		// WHOLESALE
		// } else if ( $(".page-wholesale").length ) {
		// 	Wholesale.init();
		// NEWS + SINGLE NEWS
		} else {
			if ( $(".gallery").length ) {
				Gallery.init();
			} else {
				this.imagesLoad();				
			}
		}

		this.bindEvents();

	},

	bindEvents: function () {

		console.log("Page.bindEvents");

		$("#menu_toggle a").on("click", function(e){
			e.preventDefault();
			if ( !Page.menuVisible ) {
				Page.menuOpen();
			} else {
				Page.menuClose();
			}
		});

		// CLICK OUTSIDE OF MENU TO CLOSE
		$(document).on("click", function(e){
			if(!$(e.target).closest("#menu_top").length) {
		        if ( Page.menuVisible ) {
		        	Page.menuClose();
		    	}
		    }  
		});

		$(".menu_coll_toggle").on("click", function(e){
			Page.menuCollToggle( $(this) ); 
		});

		$(window).on("resize", _.throttle(function (e) {
			// Page.imagesLoad();
		}, 500 ) );

	},

	menuOpen: function () {

		console.log("Page.menuOpen");

		Page.menuVisible = true;
		// GIVE HEIGHT TO MENU
		var menu = $("#menu_top_hidden"),
			totalH = $("#menu_content_wrapper").outerHeight() + 120;

		console.log( 78, totalH );

		menu.css({"height":totalH});
		setTimeout(function(){
			menu.css({"height":"auto"});	
		}, 1000 );

	},

	menuClose: function () {

		console.log("Page.menuClose");

		Page.menuVisible = false;
		$("#menu_top_hidden").css({"height":""});

	},

	menuCollToggle: function ( click ) {

		console.log("Page.menuCollToggle");

		if ( !click.hasClass("expanded") ) {
			console.log("Expand.");
			click.addClass("expanded");
			// GET HEIGHT OF FOLLOWING
			var totalH = 0;
			click.next(".menu_coll_hidden").find("p").each( function (){
				totalH += $(this).outerHeight() + 4;
			});
			// CLOSE ANY OTHER COLLECTIONS
			click.parent("li").siblings("li").each( function(){
				$(this).find(".menu_coll_hidden").css({"height":"0"});
				$(this).find(".menu_coll_toggle").removeClass("expanded");
			});
			// EXPAND
			click.next(".menu_coll_hidden").css({"height":totalH});
		} else {
			console.log("Contract.");
			click.removeClass("expanded");
			click.next(".menu_coll_hidden").css({"height":0});
		}

	},

	imageCalc: function ( image ) {

		// console.log("Page.imageCalc");

		// GET IMAGE WIDTH
		var imgW,
			currSrc;
		if ( image.hasClass("bg_image") ) {
			// GET ACTUAL BG IMAGE WIDTH, NOT WRAPPER WIDTH
			var imgRatio = image.data("width") / image.data("height"),
				winRatio = this.winW / this.winH;
			if ( imgRatio > winRatio ) {				
				imgW = image.height() * imgRatio;
			} else {
				imgW = image.width();
			}
			currSrc = image.css("background-image");
		} else if ( image.hasClass("single_main_image") ) {
			// CALC IMAGE HEIGHT BEFORE LOADING
			currSrc = image.attr("src");
			var imgRatio = parseInt( image.attr("width") ) / parseInt( image.attr("height") );
			imgW = Page.winW / imgRatio;
		} else if ( image.hasClass("product_image") || image.hasClass("single_additional_image") ) {
			currSrc = image.attr("src");
			// imgW = image.height(); // IMAGE HEIGHT FOR PORTRAIT IMAGES
			// TMP: HEIGHT = 67VW
			imgW = this.winH * 0.67;
		} else {
			// PORTRAIT
			if ( image.hasClass("portrait") ) {
				imgW = image.height();
			} else {
				imgW = image.width();				
			}
		}

		// CHANGE POINTS: THM = 300 / MED = 600 / LRG = 900 / XLG = 1280 / LPG = 2048
		if ( imgW <= 300 ) {
			newSrc = image.attr("data-thm");
		} else if ( imgW > 300 && imgW <= 600 ) {
			newSrc = image.attr("data-med");
		} else if ( imgW > 600 && imgW <= 900 ) {
			newSrc = image.attr("data-lrg");
		} else if ( imgW > 900 && imgW <= 1280 ) {
			newSrc = image.attr("data-xlg");
		} else {
			newSrc = image.attr("data-lnd");
		} 
		// IF NEW SRC DIFFERENT: RENDER 
		if ( newSrc !== currSrc ) {
			return newSrc;
		} else {
			return currSrc;
		}

	},

	imagesLoad: function ( index ) {

		console.log("Page.imagesLoad");

		if ( typeof index === "undefined" ) {
			index = 0;	
		}

		var imgs = $(".page img"),
			img = $( imgs[index] ),
			src = this.imageCalc(img);
		img.attr( "src", src ).on( "load error", function (){
			// FADE IN IMAGE
			img.css("opacity","1");
			if ( index < imgs.length ) {
				// LOAD NEXT
				index++;
				Page.imagesLoad( index );
			}
		});

		$(".spinner").fadeOut();

	}

}

$(document).on( "ready", function() {

	Page.init();

});