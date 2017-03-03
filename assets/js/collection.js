var Collection = {

	imgFrontBack: 0,

	imgLoadIndex: 0,

	winW: $(window).width(),

	winH: $(window).height(),

	filter: false,

	init: function () {

		console.log("Collection.init");

		this.bindEvents();

		// FADE IN COLLECTION
		$(".collection").fadeIn().css({"opacity":"1"});

		// PREPARE GRID
		this.gridReset();
		this.gridCalc();

		// SHOW IMAGES
		this.collectionImages();

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

		// FILTER ALL EMPTY PRODUCTS
		$(".product").each( function() {
			if ( !$(this).find(".product_image").length ) {
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
			i = 0;

		console.log( 122, noImages );

		//  RECALCULATED ON RESIZE
		var arrayLarge = [3,5,3,5],
			arrayMid = [3,1,5,3],
			arraySmall = [3,1,2,1];
		// WHILE LOOP CORRESPONDS TO EACH ROW
		while ( total < noImages ) {
			if ( $(window).width() <= 600 ) {
				// number = arraySmall[ i ];
				number = 3;
			// } else if ( $(window).width() <= 780 ) {
			// 	number = arrayMid[ i ];
			} else {
				// number = arrayLarge[ i ];
				number = 4;
			}
	
			// IF NUMBER OF IMAGES LEFT IS LESS THAN ARRAY NUMBER
			if ( ( noImages - total ) < number ) {
				number = noImages - total;
			}	
			
			// REMOVE EXISTING CLASSES BEGINNING WITH CHILD-*
			$(".collection " + grid_class).slice( total, total+number ).wrapAll("<div class='collection_row'></div>").attr("data-row", number);
			
			total += number; 

			if ( i === 3 ) {
				i = 0;
			} else {
				i++;	
			}

		} // END OF WHILE
		
		// SET IMAGE WIDTH
		// var imgRatio,
		// 	newWidth;
		// $(".collection .selected-product").find(".product_image").each( function(){
		// 	imgRatio = $(this).attr("width") / $(this).attr("height");
		// 	// WIDTH BASED ON PARENT HEIGHT
		// 	newWidth = $(this).parents("li").height() * imgRatio;
		// 	$(this).css( "width", newWidth ).addClass("lazyload").attr( "data-ratio", imgRatio );
		// });

		// 	// INITIATE LAZYSIZES
		// 	lazySizes.init();
		// 	// SHOW IMAGES			
		// 	$(".collection .selected-product").fadeIn("slow");
		// }

	},

	imgLoad: function ( imgWrapper, filter, maxImages ) {

		// console.log("Collection.imgLoad");

		if ( Collection.imgLoadIndex < maxImages ) {

		    var img = imgWrapper.find(".front");
		    if ( Collection.imgFrontBack === 1 ) {
		    	img = imgWrapper.find(".back");
		    }

			var newSrc = Page.imageCalc( img );

			console.log( 188, "newSrc:", newSrc );

		    img.attr( "src", newSrc ).on("load error", function () {

		    	if ( Collection.imgFrontBack === 0 ) {
					Collection.imgFrontBack++;
					Collection.imgLoad( imgWrapper, filter, maxImages );
					img.css("opacity","1");
		    	} else {
					// RESET FRONTBACK
					Collection.imgFrontBack = 0;
					// UPDATE LOAD INDEX
					Collection.imgLoadIndex++;
					Collection.collectionImages( filter );
					img.css("opacity","1");
		    	}

		   		// SHOW IMAGE
		    	imgWrapper.fadeIn();
		    });

		} 

	},

	collectionImages: function ( filter ) {

		// GET NUMBER OF IMAGES
		var grid_class = ".selected-product";
		if ( filter ) {
			grid_class = ".filtered-product";
		}

		var noImages = $(grid_class).length;

		console.log( 226, Collection.imgLoadIndex, noImages );

		if ( Collection.imgLoadIndex < noImages ) {

			console.log("Collection.collectionImages");

			// console.log( 227, Collection.imgLoadIndex, noImages );

			// LOAD NEXT IN LINE
			var nextImg = $(grid_class).eq(Collection.imgLoadIndex);
			this.imgLoad( nextImg, filter, noImages );
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
			bg.prependTo("#menu_bottom")
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

	}

}