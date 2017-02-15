var Home = {

	tStart: 0,

	animBlock : false,

	landingVis: true,

	firstLoad: true,

	winW: $(window).width(),

	winH: $(window).height(),

	init: function () {

		console.log("Home.init");
 
		this.slideInit();

		this.bindEvents();

	},

	slideInit: function () {

		console.log("Home.slideInit");

		// PREPARE FIRST SLIDE
		var firstLi = $("#landing_page ul li:first-child");
		firstLi.addClass("visible");
		// GET SRC FROM IMAGECALC
		var src = this.imageCalc( firstLi.find(".bg_image") );
		// WAIT UNTIL SRC LOADED
		$('<img/>').attr('src', src ).load(function() {
			$(this).remove();
			// SET SRC
			firstLi.find(".bg_image").css('background-image', "url('" + newSrc + "')").removeClass("blurred");	
			// FADE OUT HOLDING IMAGE
			firstLi.find("holding_image").fadeOut();
			// LOAD ALL OTHER IMAGES
			$("#landing_page ul li").not( firstLi ).each( function() {
				var thisImg = $(this).find(".bg_image")
				thisImg.css('background-image', "url('" + Home.imageCalc( thisImg ) + "')").removeClass("blurred");
			});
		});

		// HIDE LOADING ANIMATION
		$(".spinner").fadeOut();

	},

	bindEvents: function () {

		// CLICK
		$("#landing_page_access a").on( "click", function(e) {
			e.preventDefault();
			Home.landingEnd();
		});

		// TOUCH EVENTS
		$('#landing_page').bind('touchstart', function (e){
			tStart = e.originalEvent.touches[0].clientY;
			e.preventDefault();
		});

		$('#landing_page').bind( 'touchend', function (e){
			var tEnd = e.originalEvent.changedTouches[0].clientY;
			if( tStart > tEnd + 5 ){
		    	this.landingForward();
			} else if ( tStart < tEnd - 5 ) {
		    	this.landingBack();
			}
			e.preventDefault();
		});

		// SCROLL EVENTS
		$('#landing_page').bind( "mousewheel DOMMouseScroll", _.throttle(function (e) {
			Home.scrollCalc( e.originalEvent );
		}, 500 ) );

		$('.front_collection').bind( "mousewheel DOMMouseScroll", _.throttle(function (e) {
			if ( !this.landingVis && $(window).scrollTop() === 0 ) {
				Home.scrollCalc( e.originalEvent, true );
			}
		}, 500 ) );

	},

	scrollCalc: function ( oe, reset ) {

		console.log( "Home.scrollCalc", oe );

	    if ( oe.wheelDelta ) {
	        delta = -oe.wheelDelta;
	    }
	    if ( oe.detail ) {
	        delta = oe.detail * 40;
	    }
	    if ( delta > 0 && this.landingVis ) {
	    	this.landingSlideForward();
	    } else if ( delta < -1 ) {
	    	if ( reset && delta < -10 ) {
	    		// MAKE MORE SENSITIVE
	    		this.landingReset();
	    	} else {
	    		this.landingSlideBack();	    		
	    	}
	    }

	},

	imageCalc: function ( image ) {

		console.log("Home.imageCalc");

		// GET IMAGE WIDTH
		var imgW,
			currSrc;
		if ( image.hasClass("bg_image") ) {
			currSrc = image.css("background-image");
			imgW = image.width();
		} else {
			currSrc = image.attr("src");
			// imgW = image.height(); // IMAGE HEIGHT FOR PORTRAIT IMAGES
			// TMP: HEIGHT = 67VW
			imgW = this.winH * 0.67;
		}

		console.log( 122, imgW, currSrc );

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
		// console.log( 43, newSrc, currSrc);
		if ( newSrc !== currSrc ) {
			return newSrc;
		} else {
			return currSrc;
		}

	},

	landingSlideForward: function () {
		
		console.log("Home.landingSlideForward", this.animBlock );

		var landingVis = $("#landing_page .visible");
		if ( !this.animBlock ) {
			// CHECK IF NEXT
			if ( landingVis.next().length ) {
				// NEXT SLIDE
				landingVis.removeClass("visible").next().addClass("visible");
				// BLOCK ANY ANIMATION FOR 2 SECONDS
				this.animBlock = true;
				setTimeout( function(){
					Home.animBlock = false;
					console.log( 182, Home.animBlock );
				}, 2000 );
			} else {
				// SHOW COLLECTION
				Home.landingEnd();
			}
		}

	},	

	landingSlideBack: function () {

		console.log("Home.landingSlideBack");

		var landingVis = $("#landing_page .visible");
		if ( !this.animBlock ) {
			// CHECK IF PREV
			if ( landingVis.prev().length ) {
				landingVis.removeClass("visible").prev().addClass("visible");
			}
		}

	},

	landingReset: function () {

		console.log("Home.landingReset");

		if ( !this.animBlock ) {
			
			this.animBlock = true;
			setTimeout( function(){
				Home.animBlock = false;
			}, 2000 );

			// ANIMATE
			$("#landing_page").removeClass("landing_hidden").animate({
				marginTop: "0vh"
			}, 1000, function(){
				// HIDE COLLECTION
				$(".front_collection").addClass("collection_hidden");
			});

			this.landingVis = true;

		}

	},

	landingEnd: function () {

		console.log("Home.landingEnd", this.animBlock);

		if ( !this.animBlock ) {

			this.animBlock = true;
			setTimeout( function(){
				Home.animBlock = false;
			}, 2000 );

			// SHOW LOADING ANIMATION
			$(".spinner").fadeIn();

			// LOAD COLLECTION
			console.log( 231, this.firstLoad );
			if ( this.firstLoad ) {
				Collection.init();
				this.firstLoad = false;
			}

			// SHOW COLLECTION
			$(".front_collection").removeClass("collection_hidden");

			// ANIMATE
			$("#landing_page").addClass("landing_hidden").animate({
				marginTop: "-100vh"
			}, 1000, function(){
				// SHOW BOTTOM NAV
				// $("#secondary_nav").fadeIn();			
			});

			this.landingVis = false;

		}

	}

}