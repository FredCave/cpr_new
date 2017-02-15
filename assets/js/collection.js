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

	},

	gridReset: function () {

		console.log("Collection.gridReset");

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

	gridCalc: function () {

		console.log("Collection.gridCalc");
	
		var noImages = $(".selected-product").length,
			total = 0,
			i = 0;

		//  RECALCULATED ON RESIZE
		var arrayLarge = [3,5,3,5],
			arrayMid = [3,1,5,3],
			arraySmall = [3,1,2,1];
		// WHILE LOOP CORRESPONDS TO EACH ROW
		while ( total < noImages ) {
			if ( $(window).width() <= 600 ) {
				number = arraySmall[ i ];
			} else if ( $(window).width() <= 780 ) {
				number = arrayMid[ i ];
			} else {
				number = arrayLarge[ i ];
			}
	
			// IF NUMBER OF IMAGES LEFT IS LESS THAN ARRAY NUMBER
			if ( ( noImages - total ) < number ) {
				number = noImages - total;
			}	
			
			// REMOVE EXISTING CLASSES BEGINNING WITH CHILD-*
			$(".collection .selected-product").slice( total, total+number ).wrapAll("<div class='collection_row'></div>").attr("data-row", number);
			
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

	imgLoad: function ( imgWrapper ) {

		console.log("Collection.imgLoad");

	    var img = imgWrapper.find(".front");
	    if ( Collection.imgFrontBack > 0 ) {
	    	img = imgWrapper.find(".back");
	    }

		var newSrc = Home.imageCalc( img );

	    img.attr( "src", newSrc ).on("load", function () {
	    	if ( Collection.imgFrontBack == 0 ) {
				Collection.imgFrontBack++;
				Collection.imgLoad( imgWrapper );
				img.css("opacity","1");
	    	} else {
	    		img.css("opacity","1");
				// RESET FRONTBACK
				Collection.imgFrontBack = 0;
				// UPDATE LOAD INDEX
				Collection.imgLoadIndex++;
				Collection.collectionImages();
	    	}
	   		// SHOW IMAGE
	    	imgWrapper.fadeIn();
	    });

	},

	collectionImages: function () {

		console.log("collectionImages");

		// GET NUMBER OF IMAGES
		var noImages = $(".selected-product").length;

		if ( Collection.imgLoadIndex < noImages ) {
			// LOAD NEXT IN LINE
			var nextImg = $(".selected-product").eq(Collection.imgLoadIndex);
			this.imgLoad(nextImg);
		}


	}

}