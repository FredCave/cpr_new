var Home = {

	tStart: 0,

	animBlock : false,

	landingVis: true,

	verticalScreen: false,

	firstLoad: true,

	winW: $(window).width(),

	winH: $(window).height(),

	init: function () {

		console.log("Home.init");
 
		this.slideInit();

		this.bindEvents();

	},

	bindEvents: function () {

		// CLICK
		$("#landing_page_access a").on( "click", function(e) {
			e.preventDefault();
			Home.landingEnd();
		});

		$("#video_wrapper").on("click touchstart", function(){
			var video = document.getElementById("video");
			video.play();
			console.log("Video click.");
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

	slideInit: function () {

		console.log("Home.slideInit");

		var mq = window.matchMedia(" (orientation:portrait), (max-aspect-ratio:3/4), (max-width: 600px)");
		if ( mq.matches ) {
			this.mobileInit();
			return;
		}

		if ( $("#landing_page ul li").length === 0 ) {
			// NO IMAGES: VIDEO
			console.log("No landing page images.");
			$(".spinner").fadeOut();	
		}

		// PREPARE FIRST SLIDE
		var firstLi = $("#landing_page ul li:first-child");
		firstLi.addClass("visible");
		// GET SRC FROM IMAGECALC
		var src = Page.imageCalc( firstLi.find(".bg_image") );
		// WAIT UNTIL SRC LOADED
		$('<img/>').attr('src', src ).on("load error", function() {

			// HIDE LOADING ANIMATION
			$(".spinner").fadeOut();

			$(this).remove();
			// SET SRC
			firstLi.find(".bg_image").css('background-image', "url('" + newSrc + "')").removeClass("blurred");	
			// FADE OUT HOLDING IMAGE
			firstLi.find("holding_image").fadeOut();
			// LOAD ALL OTHER IMAGES
			$("#landing_page ul li").not( firstLi ).each( function() {
				var thisImg = $(this).find(".bg_image")
				thisImg.css('background-image', "url('" + Page.imageCalc( thisImg ) + "')").removeClass("blurred");
			});
		});

	},

	mobileInit: function () {

		console.log("Home.mobileInit");

		// SHOW COLLECTION
		Home.landingEnd();

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

		if ( !this.animBlock && !this.verticalScreen ) {

			console.log("Home.landingReset");
			
			// IF NOT VISIBLE
			if ( !$("#landing_page").find(".visible").length ) {
				this.slideInit();
			}

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

			// HIDE BOTTOM MENU
			$("#menu_bottom").fadeOut().addClass("hide");

			if ( $("#video").length ) {
				this.videoPlay();
			}

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

			// SHOW BOTTOM MENU
			$("#menu_bottom").fadeIn().removeClass("hide");

			// SHOW COLLECTION
			$(".front_collection").removeClass("collection_hidden");

			// ANIMATE
			$("#landing_page").addClass("landing_hidden").animate({
				marginTop: "-100vh"
			}, 1000, function(){
			
			});

			this.landingVis = false;

			if ( $("#video").length ) {
				this.videoPause();
			}

		}

	},

	videoPlay: function () {

		console.log("Home.videoPlay");

		// IF VIDEO NOT PLAYING
			// PLAY
		var video = document.getElementById("video");
		if (video.paused) {
			video.play();
		} 

	},

	videoPause: function () {

		console.log("Home.videoPause");

		var video = document.getElementById("video");
		video.pause();

	}

}