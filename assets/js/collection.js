var Collection = {

	imgLoadIndex: 0,

	imagesOnPage: 0,

	winW: $(window).width(),

	winH: $(window).height(),

	filter: false,

	collLoaded: false,

	noCols: 4,

	init: function ( cols ) {

		console.log("Collection.init");

		this.bindEvents();

		// FADE IN COLLECTION
		$(".collection").fadeIn().css({"opacity":"1"});

		this.gridLoad();

		// FILTER INIT
		this.filterInit();

	},

	bindEvents: function () {

		console.log("Collection.bindEvents");

		$(".selected-product").on( "mouseenter", function(){
			// SHOW BACK IMAGE
			$(this).find(".front").hide();
			$(this).find(".back").show();
		});

		$(".selected-product").on( "mouseleave", function(){
			// SHOW FRONT IMAGE
			$(this).find(".front").show();
			$(this).find(".back").hide();
		});

		// FILTER EVENTS
		$("#filter_toggle").on("click", function(e){
			e.preventDefault();
			if ( !$("#collection_filter").is(':visible') ) {
				Collection.filterShow();		
			} else {
				Collection.filterHide();
			}
		});

		$(".filter").on("click", function(e) {
			e.preventDefault();
			Collection.filterProducts( $(this) );
		});

		// CLICK OUTSIDE OF FILTER ELEMENTS TO CLOSE
		$("#menu_bottom").on("click", "#filter_bg", function(e){
			if(!$(e.target).closest("a.filter").length) {
		        Collection.filterHide();
		    }  
		});

		$(".clear_filter").on("click", function(){
			Collection.filterClear( $(this) );
		});

		$(window).on("resize", _.throttle( function(){
			// Collection.marginsCalc();
		}, 1000 ));

	},

	mediaChange: function (mql) {

		console.log("Collection.mediaChange", mql);

		if (mql.v.matches) {

			// IF SCREEN VERTICAL OR LESS THAN 600PX WIDE 

			var newCols = 2;

		} else {

	    	// MORE THAN 800PX WIDE

	    	var newCols = 4;

	    }

	    // CHECK IF NEW NO. COLS DIFFERENT TO PREVIOUS
		if ( Collection.noCols !== newCols ) {
			Collection.noCols = newCols;

			// IF COLLECTION NOT YET INIT – ON HOME
			// if ( !$(".collection").is(":visible") ) {
			// 	Collection.init();
			// } else {
			// 	Collection.gridLoad();					
			// }

		}

	},

	gridLoad: function () {

		console.log("Collection.gridLoad", this.noCols);

		// PREPARE GRID
		this.gridReset();
		this.gridCalc();

		// SHOW IMAGES
		Collection.imgLoadIndex = 0;
		this.collectionImages();

		this.collLoaded = true;

	},

	gridReset: function () {

		console.log("Collection.gridReset");

		$(".product").addClass("selected-product");

		// HIDE IMAGES
		$(".non_single_product").hide();
		// NEED TO REMOVE PREVIOUSLY ADDED ROWS
		$(".collection_row").each( function(){
			$(this).find(".product").prependTo( $(this).parents("ul") );
		}).remove();

		// DURING FILTERING BOTTOMS ARE NOT HIDDEN
		if ( !Collection.filter ) {
			// FILTER OUT ALL BOTTOMS
			$(".bottom").removeClass("selected-product");					
		}

		// FILTER ALL PRODUCTS WITH LESS THAN 2 IMAGES
		$(".product").each( function() {
			if ( $(this).find(".product_image").length < 2 ) {
				$( this ).removeClass("selected-product");	
			}
		});

	},

	gridCalc: function ( filter ) {

		console.log("Collection.gridCalc");

		var grid_class;
		if ( filter ) {
			grid_class = ".filtered-product";
		} else {
			grid_class = ".selected-product";
		}
	
		var noImages = $(grid_class).length,
			total = 0,
			i = 1;

		console.log( 122, noImages, this.noCols );

		// WHILE LOOP CORRESPONDS TO EACH ROW
		while ( total < noImages ) {

			// STORE NUMBER OF IMAGES IN GRID AS VARIABLE
			this.imagesOnPage = noImages;

			number = this.noCols;
			// IF NUMBER OF IMAGES LEFT IS LESS THAN ARRAY NUMBER
			if ( ( noImages - total ) < number ) {
				number = noImages - total;
			}	
			
			// REMOVE EXISTING CLASSES BEGINNING WITH CHILD-*
			$(".collection " + grid_class).slice( total, total+number ).wrapAll("<div id='row-"+i+"' class='collection_row'></div>").attr({"data-row": number});
			
			// SHOW LI IN ORDER TO STOP SHIFTING COLUMNS
			$("#row-" + i).find("li").show();

			// CALCULATE MARGINS ON ROW
			this.marginsCalc( $("#row-" + i) );

			total += number; 

			console.log( 195, i );

			i++;

			// if ( i === 3 ) {
			// 	i = 0;
			// } else {
			// 	i++;	
			// }

		} // END OF WHILE
		
	},

	imgLoad: function ( imgWrapper, filter ) {

		// CALLED BY COLLECTIONIMAGES AND ITSELF

		console.log("Collection.imgLoad", Collection.imgLoadIndex, Collection.imagesOnPage);

		var img = imgWrapper.find(".front");

		// IF FRONT LOADED:
	    if ( img.hasClass("loaded") ) {
	    	img = imgWrapper.find(".back");	    		
	    }	

		var newSrc = Page.imageCalc( img );

		img.attr( "src", newSrc ).on( "load error", function (e) {

			$(this).addClass("loaded");	
		    	 		
			// FRONT
			if ( img.hasClass("front") ) {

				// SHOW AND RUN AGAIN
				img.css("opacity","1");
				Collection.imgLoad( imgWrapper, filter );

			// BACK
			} else {
				
				// TIMEOUT SO GHOST IMAGE DOESN'T APPEAR ON WRAPPER FADE-IN
				setTimeout( function (){
					img.css("opacity","1");
				}, 500 );

				// UPDATE LOAD INDEX
				Collection.imgLoadIndex++;

				if ( Collection.imgLoadIndex <= Collection.imagesOnPage ) {
					Collection.collectionImages( filter );
				}

			}

			// SHOW IMAGE LI
			imgWrapper.css("opacity","1");
		
		});


	},

	collectionImages: function ( filter ) {

		// GET NUMBER OF IMAGES
		var grid_class = ".selected-product";
		if ( filter ) {
			grid_class = ".filtered-product";
		}

		var noImages = $(grid_class).length;
		// STORE NOIMAGES AS VARIABLE
		Collection.imagesOnPage = noImages;

		console.log( 226, Collection.imgLoadIndex, noImages );

		if ( Collection.imgLoadIndex < noImages ) {

			console.log("Collection.collectionImages");

			// LOAD NEXT IN LINE
			var nextImg = $(grid_class).eq(Collection.imgLoadIndex);

			console.log( 278, $(grid_class).eq(Collection.imgLoadIndex).find("a").attr("href") );

			this.imgLoad( nextImg, filter);
			
		} else {
			// END OF LOOP
			console.log("End of loop.");
			// HIDE LOADING ANIMATION
			$(".spinner").fadeOut();
		}

	},

	filterInit: function () {

		console.log("Collection.filterInit");

		// LOOP THROUGH PHP GENERATED TAGS
		// & CHECK IF THEY ARE ON PAGE
		$("#collection_filter li").each( function(){
			var filterText = $(this).find("a").attr("id");
			if ( !$(".product_tag-" + filterText).length ) {
				console.log( filterText, " hidden." );
				$(this).hide();
			} 
		});

	},

	filterShow: function () {

		console.log("Collection.filterShow");

		// SHOW BACKGROUND
		if ( !$("#filter_bg").length ) {
			var bg = $("<div></div>").attr("id","filter_bg");
			bg.prependTo("#menu_bottom");
		}
		$("#filter_bg").fadeIn(1000);
		$("#collection_filter").fadeIn();

	},

	filterHide: function () {

		console.log("Collection.filterHide");

		$("#filter_bg").fadeOut();
		$("#collection_filter").fadeOut();

	},

	filterProducts: function ( click ) {

		console.log("Collection.filterProducts");

		// GET TAG OF CLICKED CATEGORY
		var thisId = click.attr("id"), 
			thisClass = "product_tag-" + thisId;

		console.log( 287, thisClass );

		// IMAGES
		this.filterProductImages(thisClass);
	
		// FILTER
			// REPLACE FILTER TOGGLE WITH SELECTED TAG + SHOW CLOSE BUTTON
		$("#filter_toggle").text( click.text() ).next("img").show();
		$("#collection_filter").fadeOut();
		$("#filter_bg").fadeOut();

		// SCROLL TO TOP OF COLLECTION
		var collTop = 0;
		if ( $(".collection").length ) {
			collTop = $(".collection").offset().top;
		} 	

		console.log( 304, collTop );

		$("html,body").animate({scrollTop: collTop}, 500);

	},

	filterProductImages: function ( thisClass ) {

		console.log("Collection.filterProductImages", thisClass );

		// HIDE ALL IMAGES
		$(".product").hide();
		$(".selected-product").removeClass("selected-product");
		// CREATE ARRAY OF FILTERED PRODUCTS
		var elems = [];
		// LOOP THROUGH ITEMS ON PAGE
		$(".product").each( function(){
			if ( $(this).hasClass( thisClass ) ) {
				console.log( 322, "yes." );
				// PUSH TO ARRAY
				elems.push( $(this).clone().addClass("filtered-product") );
			}
		});	

		// APPEND ELEMS TO DOM
		$("#filtered_products").append( elems );

		// RE-CALCULATE GRID
		this.gridReset();
		this.gridCalc( true );

		Collection.imgLoadIndex = 0;
		this.collectionImages( true );

	},

	filterClear: function () {

		console.log("Page.filterClear");

		// RESET 
		$("#filtered_products").empty();	
		$(".clear_filter").hide();	
		$("#filter_toggle").text( "Filter" );

		// RE-CALCULATE GRID
		this.gridReset();
		this.gridCalc();
		Collection.imgLoadIndex = 0;
		this.collectionImages();

		// SCROLL TO TOP OF COLLECTION
		var collTop = 0;
		if ( $(".collection").length ) {
			collTop = $(".collection").offset().top;
		} 		
		$("html,body").animate({scrollTop: collTop}, 500);

	},

	marginsCalc: function ( row ) {

		console.log("Collection.marginsCalc");

		var target;
		if ( row === undefined ) {
			row = $(".collection_row").first();
			target = $(".collection_row");
		} else {
			target = row;
		}

		console.log( 433, target );

		// LOOP THROUGH ROWS
		target.each( function(){

			console.log( 437, $(this) );

			// GET TOTAL SPACE BETWEEN ALL IMAGES
			var firstLi = $(this).find("li").first(),
				liW = firstLi.find("img").width(),
				totalDiff = 0,
				percFour = 0,
				percThree = 0;

			if ( firstLi.attr("data-row") == 4 ) {
				totalDiff = Collection.winW - (liW * 4);
				percFour = totalDiff / Collection.winW / 5 * 100;
			} else {	
				totalDiff = Collection.winW - (liW * 3);
				percThree = totalDiff / Collection.winW / 4 * 100;
			}	

			console.log( liW*4, Collection.winW, totalDiff, percFour, percThree );
			
			if ( percFour > 0 || percThree > 0 ) {
				if ( $(this).find("li[data-row=4]").length ) {
					$(this).css({
						"width" : 100 - (percFour*2) + "%",
						"left" : percFour + "%",
						"margin-bottom" : percFour + "%"
					});					
				} else {
					$(this).css({
						"width" : 100 - (percThree*2) + "%",
						"left" : percThree + "%",
						"margin-bottom" : percFour + "%"
					});
				}
			} else {
				$(this).css({
					"width" : "",
					"left" : "",
					"margin-bottom" : ""
				});			
			}

		});

	}

}