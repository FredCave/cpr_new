var Page = {

	menuVisible: false, 

	winW: $(window).width(),

	winH: $(window).height(),

	init: function () {

		console.log("Page.init");

		if ( $("#home").length ) {
			Home.init();
		} else if ( $(".collection").length ) {
			// IF SINGLE
			if ( $("#single_page").length ) {
				Single.init();
			} else {
				Collection.init();
			}
		} else {
			this.imagesLoad();
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
			if(!$(e.target).closest("#menu_toggle").length) {
		        if ( Page.menuVisible ) {
		        	Page.menuClose();
		    	}
		    }  
		});

	},

	menuOpen: function () {

		console.log("Page.menuOpen");

		Page.menuVisible = true;
		// GIVE HEIGHT TO MENU
		var menu = $("#menu_top_hidden"),
			totalH = $("#menu_content_wrapper").height() + 120;
		menu.css({"height":totalH});

	},

	menuClose: function () {

		console.log("Page.menuClose");

		Page.menuVisible = false;
		$("#menu_top_hidden").css({"height":""});

	},

	imageCalc: function ( image ) {

		// console.log("Page.imageCalc");

		// GET IMAGE WIDTH
		var imgW,
			currSrc;

		// BG IMAGE: NEED TO GET CORRECT IMAGE WIDTH, NOT WINDOW WIDTH
		// SINGLE MAIN IMAGE FROM RATIO * WINW
		// PRODUCT IMAGE: WINH * 0.67

		if ( image.hasClass("bg_image") ) {
			// REDO
			currSrc = image.css("background-image");
			imgW = image.width();
		} else if ( image.hasClass("single_main_image") ) {
			currSrc = image.attr("src");
			var imgRatio = parseInt( image.attr("width") ) / parseInt( image.attr("height") );
			imgW = Page.winW / imgRatio;

		} else if ( image.hasClass("product_image") ) {
			currSrc = image.attr("src");
			// imgW = image.height(); // IMAGE HEIGHT FOR PORTRAIT IMAGES
			// TMP: HEIGHT = 67VW
			imgW = this.winH * 0.67;
		} else {
			imgW = image.width();
		}

		console.log( 105, imgW );	

		// CHANGE POINTS: THM = 300 / MED = 600 / LRG = 900 / XLG = 1280 / LPG = 2048
		if ( imgW > 300 && imgW <= 600 ) {
			newSrc = image.attr("data-med");
		} else if ( imgW > 600 && imgW <= 900 ) {
			newSrc = image.attr("data-lrg");
		} else if ( imgW > 900 && imgW <= 1280 ) {
			newSrc = image.attr("data-xlg");
		} else if ( imgW > 1280 && imgW <= 2048 ) {
			newSrc = image.attr("data-lnd");
		} else { // THUMB
			newSrc = image.attr("data-thm");
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
		img.attr( "src", src ).on( "load", function (){
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