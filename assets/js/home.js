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

		$(window).on("resize", _.throttle( function(){
			Home.winH = $(window).height();
			Home.winW = $(window).width();
			Home.videoResize();
		}, 500 ));

	},

	slideInit: function () {

		console.log("Home.slideInit");

		var mq = window.matchMedia(" (orientation:portrait), (max-aspect-ratio:3/4), (max-width: 600px)");
		if ( mq.matches ) {
			// this.mobileInit();
			// return;
		}

		// IF VIDEO
		if ( $("#landing_video").length ) {

			Page.createPlayer( $("#landing_video") );

		}

		// PREPARE FIRST SLIDE
		var firstLi = $("#landing_page ul li:first-child");
		firstLi.addClass("visible");
		// IF FIRST LI IS IMAGE
		if ( firstLi.find(".bg_image").length ) {
			// GET SRC FROM IMAGECALC
			var src = Page.imageCalc( firstLi.find(".bg_image") );
			// WAIT UNTIL SRC LOADED
			$('<img/>').attr('src', src ).on("load error", function() {
				$(this).remove();
				// SET SRC
				firstLi.find(".bg_image").css('background-image', "url('" + newSrc + "')").removeClass("blurred");	
				// FADE OUT HOLDING IMAGE
				firstLi.find("holding_image").fadeOut();
				
				Home.loadConsecutiveImages();
			});
		}

	},

	videoReady: function () {

		console.log("Home.videoReady");

		// RESIZE VIDEO
		Home.videoResize();	
		// LOAD OTHER IMAGES + REMOVE SPINNER
		Home.loadConsecutiveImages();
		// FADE IN VIDEO
		$("#landing_video iframe").css("opacity","1");

	},

	loadConsecutiveImages: function () {

		console.log("Home.loadConsecutiveImages");

		// HIDE LOADING ANIMATION
		$(".spinner").fadeOut();
		// LOAD ALL OTHER IMAGES
		$("#landing_page ul li").not( $("#landing_page ul li:first-child") ).each( function() {
			var thisImg = $(this).find(".bg_image");
			console.log( 159, Page.imageCalc( thisImg ) );
			thisImg.css('background-image', "url('" + Page.imageCalc( thisImg ) + "')").removeClass("blurred");
		});

	},

	mobileInit: function () {

		console.log("Home.mobileInit");

		// SHOW COLLECTION
		// Home.landingEnd();

	},

	videoResize: function () {
            
		console.log("Home.videoResize");

        var winR = this.winH / this.winW, // WINDOW RATIO
			video = $("#landing_page iframe"),
        	vidR = parseInt( video.attr("height") ) / parseInt( video.attr("width") ); // VIDEO RATIO

        	console.log( 141, this.winH, this.winW );

        if ( winR > vidR ) {
            // FULL HEIGHT

            console.log("Full height");

            var newW = ( this.winH / vidR ) / this.winW * 100;

            video.css({
                "width": newW + "%",
                "margin-left": 0 - ( ( newW - 100 ) / 2 ) + "%",
                "margin-top": "",
                "height": "100%"
            });
        } else {    
            // FULL WIDTH

            console.log("Full width");

            var newH = ( this.winW * vidR ) / this.winH * 100;

            console.log( 165, newH - 100 );

            video.css({
                "width": "100%",
                "margin-left": "",
                "margin-top": 0 - ( this.winW * vidR - this.winH ),
                "height": newH + "%"
            });  
        }
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
				// IF VIDEO
				if ( landingVis.find("#landing_video").length ) {
					Page.player.pause();
				}

				// NEXT SLIDE
				landingVis.removeClass("visible").next("li").addClass("visible");
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
				// IF VIDEO
				if ( $("#landing_page .visible").find("#landing_video").length ) {
					Page.player.play();
				}
			}
		}

	},

	landingReset: function () {

		// if ( !this.animBlock && !this.verticalScreen ) {
		if ( !this.animBlock ) {

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

			if ( $("#landing_video").length ) {
				Page.player.play();
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

			// PAUSE VIDEO
			if ( $("#landing_video").length ) {
				Page.player.pause();
			}


		}

	}

	// videoPlay: function () {

	// 	console.log("Home.videoPlay");

	// 	// IF VIDEO NOT PLAYING
	// 		// PLAY
	// 	var video = document.getElementById("video");
	// 	if (video.paused) {
	// 		video.play();
	// 	} 

	// },

	// videoPause: function () {

	// 	console.log("Home.videoPause");

	// 	var video = document.getElementById("video");
	// 	video.pause();

	// }

}