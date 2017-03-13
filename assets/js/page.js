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
		// CART
		} else if ( $("#cart").length ) {
			this.couponCheck();
			$(".spinner").fadeOut();
		// NEWS + SINGLE NEWS
		} else {
			if ( $(".gallery").length ) {
				Gallery.init();
			} else {
				this.imagesLoad();				
			}
			this.iframesCheck();
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

		// STOP SCROLLING ANIMATION ON MOUSE/TOUCH EVENTS
		var page = $("html, body");
		page.on("scroll mousedown wheel DOMMouseScroll mousewheel keyup touchmove", function(){
			page.stop(true,true);
		});

		// ONLY IN CART
		$(".product-quantity-input input[type=button]").on("click", function(){
			// SHOW UPDATE CART BUTTON
			Page.showUpdateCart();
		});

		$("#secondary_nav").on("click", ".update_cart_bis", function (){
			Page.updateCart();
		});

		// MEDIA QUERY MATCHING
		var mql = {};
		mql.m = window.matchMedia("(max-width: 800px)");
		mql.v = window.matchMedia(" (orientation:portrait), (max-aspect-ratio:3/4), (max-width: 600px)");
		mql.m.addListener(function(){
			Page.handleMediaChange(mql);
		});
		mql.v.addListener(function(){
			Page.handleMediaChange(mql);	
		});
		Page.handleMediaChange(mql);

	},

	handleMediaChange: function (mql) {

		console.log("Collection.handleMediaChange");

		if ( $(".collection").length ) {
			Collection.mediaChange(mql);
		}

		if ( mql.v.matches ) {
			console.log( 111 );
			Home.verticalScreen = true;
		} else {
			Home.verticalScreen = false;			
		}

	},

	menuOpen: function () {

		console.log("Page.menuOpen");

		Page.menuVisible = true;

		// GIVE HEIGHT TO MENU
		var menu = $("#menu_top_hidden"),
			totalH = $("#menu_content_wrapper").outerHeight() + 120;
		menu.css({"height":totalH});
		setTimeout(function(){
			menu.css({"height":"auto"});
		}, 1000 );

	},

	menuClose: function () {

		console.log("Page.menuClose");

		Page.menuVisible = false;
		// GET + SET CURRENT HEIGHT FOR ANIMATION
		var menuH = $("#menu_top_hidden").height();
		$("#menu_top_hidden").css({"height":menuH});
		setTimeout( function(){
			$("#menu_top_hidden").css({"height":""});	
		}, 100 );
		
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

	},

	couponCheck: function () {

		console.log("Page.couponCheck");

		if ( $(".coupon").length ) {
			// IF VALUE IS WHOLESALE AND NOT ALREADY ADDED
			if ( $(".coupon input").attr("value") === "wholesale" ) {
				if ( $(".cart_totals").find(".cart-discount").length ) {
					console.log("Coupon applied");
				} else {
					console.log("Apply coupon.");
					$(".coupon input.button").trigger("click");					
				}
			}
		}

	},

	iframesCheck: function () {

		if ( $("iframe").length ) {

			console.log("Page.iframesCheck");

			$("iframe").each( function(){
				var thisR = $(this).attr("width") / $(this).attr("height"),
					newH = $(this).width() / thisR,
					maxH = $(window).height() * 0.8;

				console.log( 248, maxH, maxH * thisR );

				// IF TALLER THAN PARENT
				if ( newH > maxH ) {
					$(this).css({
						"height" : maxH,
						"width" : maxH * thisR
					});	
				} else {
					$(this).css({
						"height" : newH,
						"width" : "" 	
					});	
				}
				// RESIZE PARENT 
				$(this).parents(".news_content").css( "min-height", newH );
			});	

		}
				
	},

	showUpdateCart: function ( click ) {

		console.log("Page.showUpdateCart");

		// IF BUTTON DOES NOT ALREADY EXIST
		if ( !$("#secondary_nav").find(".update_cart_bis").length ) {
			// CLONE BUTTON
			$("<div class='update_cart_bis'>Update cart</div>").appendTo( $("#secondary_nav ul") );
		} else {
			console.log("Already exists.");
		}

	},

	updateCart: function () {

		console.log("Page.updateCart");

		$(".update_cart").trigger("click");

	}

}

$(document).on( "ready", function() {

	Page.init();

});