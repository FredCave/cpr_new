var Wholesale = {

	// INIT CALLED FROM WWOF-PRODUCT-LISTING.PHP

	init: function (){

		console.log("Wholesale.init");

		this.bindEvents();

		// ADD RRP TO PRICES
		this.rrpAppend();

		// LOAD IMAGES
		this.imagesLoad();

		// TRIGGER EVENT FOR NAVIGATION BETWEEN AJAX PAGES
		$("body").trigger("wholesale_ready");

	},

	bindEvents: function () {

		console.log("Wholesale.bindEvents");

		// UNBIND ALL EVENTS FIRST

		// BIND GALLERY EVENTS
		$("#wwof_product_listing_ajax_content").off("click", ".gallery_right");
		$("#wwof_product_listing_ajax_content").on("click", ".gallery_right", function () {
			var target = $(this).parents(".wholesale_product_image").find(".gallery");
			Gallery.nextSlide( target );
		});

		$("#wwof_product_listing_ajax_content").off("click", ".gallery_left");
		$("#wwof_product_listing_ajax_content").on("click", ".gallery_left", function () {
			var target = $(this).parents(".wholesale_product_image").find(".gallery");
			Gallery.prevSlide( target );
		});

		// OTHER COLOURS
		$("#wwof_product_listing_ajax_content").off("mouseover", ".wholesale_other_colours");
		$("#wwof_product_listing_ajax_content").on( "mouseover", ".wholesale_other_colours", function(){
			Wholesale.otherColoursHover( $(this) );
		});

		$("#wwof_product_listing_ajax_content").off("mouseout", ".wholesale_other_colours");
		$("#wwof_product_listing_ajax_content").on( "mouseout", ".wholesale_other_colours", function(){
			Wholesale.otherColoursUnhover( $(this) );
		});

		$("#wwof_product_listing_ajax_content").off("click", ".wholesale_other_colours");
		$("#wwof_product_listing_ajax_content").on( "click", ".wholesale_other_colours", function(){
			Wholesale.otherColoursClick( $(this) );
		});

		// FILTER

		$("#ws_filter_toggle").off("click");
		$("#ws_filter_toggle").on( "click", function (e) {
			Wholesale.filterToggle();
		});

			// CLICK OUTSIDE TO CLOSE
		$(document).on( "click", function (e) {

	    	var container = $("#search_wrapper");
		    if (!container.is(e.target) && container.has(e.target).length === 0) {
		    	Wholesale.filterHide();
		    }

		});

		$(".wsale_term").off("click");
		$(".wsale_term").on( "click", function (e) {
			e.preventDefault();
			Wholesale.filterProducts( $(this) );
		});

		// $("#wwof_product_displayall_btn").off("click");
		$("#wwof_product_displayall_btn").one( "click", function(){
			Wholesale.filterReset();
		});

		// ADD TO CART
		$(".custom_add_to_cart").on("click", function (e){
			// e.preventDefault();

			// console.log("Add to cart.");

			// Wholesale.customAddToCart( $(this) );

			// var itemId = $(this).parents(".variation_wrapper").attr("data-variation");
			// Wholesale.ajaxQuantities( $(this), itemId );	

		});

	}, 

	rrpAppend: function () {

		console.log("Wholesale.rrpAppend");

		$(".variable_price .price").each( function(){
			$(this).find("del .amount").prepend("RRP: ").unwrap();
		});

	}, 

	imagesLoad: function () {

		console.log("Wholesale.imagesLoad");

		// LOOP THROUGH IMAGES
		$(".wholesale_image").each( function (){

			console.log( 43 );
			// GET SRC
			var newSrc = Page.imageCalc( $(this) );
			$(this).attr( "src", newSrc );

		});

	},

	otherColoursHover: function ( hover ) {

		console.log("Wholesale.otherColoursHover");

		// GET TARGET TITLE
		var targetText = hover.find("p").text();
		// INJECT INTO PLACEHOLDER
		hover.parents(".wholesale_product_title").find(".wholesale_other_colours_title").text( targetText );

	},

	otherColoursUnhover: function ( hover ) {

		console.log("Wholesale.otherColoursUnhover");

		// EMPTY PLACEHOLDER
		hover.parents(".wholesale_product_title").find(".wholesale_other_colours_title").text( "");

	},

	otherColoursClick: function ( click ) {

		console.log("Wholesale.otherColoursClick");

		var targetOffset,
			padding,
			targetId = click.data("id");

		console.log( 106, targetId );

		// CHECK IF TARGET IS ON PAGE
		if ( $("#" + targetId).length ) {
			// GET OFFSET OF TARGET
			targetOffset = $("#" + targetId).offset().top;
			padding = parseInt ( $(".page").css("padding-top") );

			if ( targetOffset > 0 ) {
				$("html,body").animate({
					scrollTop : targetOffset - padding
				}, 1000 );
			}

		} else {
			
			// NOT ON PAGE
			this.otherColoursNavOffPage( click, targetId );

		}

	},

	otherColoursNavOffPage: function ( click, targetId ) {

		console.log("Wholesale.otherColoursNavOffPage");

		// CHECK IF CLOSER TO BEGINNING OR END
		var docH = $("html").height(),
			clickPos = click.offset().top;

		if ( clickPos > ( docH / 2 ) ) {

			console.log("Bottom");

			// NEXT
			$("#wwof_product_listing_pagination").find(".next").trigger("click");
			// SCROLL TO SELECTED PRODUCT
			$("body").on( "wholesale_ready", function(){
				targetOffset = $("#" + targetId).offset().top;
				padding = parseInt ( $(".page").css("padding-top") );

				console.log( 147, targetOffset - padding );

				if ( targetOffset > 0 ) {
					console.log( 157, targetOffset );
					$("html,body").animate({
						scrollTop : targetOffset - padding
					}, 1000 );
				}
				// REMOVE LISTENER
				$("body").off("wholesale_ready");
			});

		} else {

			console.log("Top");

			// PREV
			$("#wwof_product_listing_pagination").find(".prev").trigger("click");
			// SCROLL TO SELECTED PRODUCT
			$("body").on( "wholesale_ready", function(){
				
				console.log(177, "wholesale_ready");

				targetOffset = $("#" + targetId).offset().top;
				padding = parseInt ( $(".page").css("padding-top") );

				console.log( 165, targetOffset - padding );

				if ( targetOffset > 0 ) {
					console.log( 183, targetOffset );
					
					setTimeout( function (){
						$("html,body").animate({
							scrollTop : targetOffset - padding
						}, 1000 );						
					}, 1000 );

				}
				// REMOVE LISTENER
				$("body").off("wholesale_ready");
			});

		}

	},

	filterShow: function () {

		console.log("Wholesale.filterShow");

		var wrapper = $("#search_wrapper"),
			termsH = $("#wsale_filter_terms").height(),
			termsPadding = 80;
		// IF PORTRAIT
		if ( $(window).height() > $(window).width() ) {
			termsPadding = 140;
		};
		wrapper.css({
			"height" : termsH + termsPadding
		}).removeClass("hidden");
		wrapper.find("#wsale_filter_terms").css({
			"padding-top": "0"
		});
		// HIDE + EMPTY SELECTED TERM
		$("#selected_term").text("").hide();

	},

	filterHide: function () {

		console.log("Wholesale.filterHide");

		var wrapper = $("#search_wrapper");

		if ( $("#selected_term").is(':visible') ) {
			// IF FILTER TERM IS VISIBLE
			wrapper.css({
				"height" : "100px"
			}).addClass("hidden");
		} else {
			wrapper.css({
				"height" : ""
			}).addClass("hidden");				
		}
		wrapper.find("#wsale_filter_terms").css({
			"padding-top": ""
		});

	},

	filterToggle: function () {

		console.log("Wholesale.filterToggle");

		// CHECK IF HIDDEN
		if ( $("#search_wrapper").hasClass("hidden") ) {
			this.filterShow();
		} else {
			this.filterHide();
		}

	},

	filterProducts: function ( click ) {

		console.log("Wholesale.filterProducts");

		// GET TARGET
		var target = click.data("target"),
			text = click.text();

		// GET CLASS
		if ( click.hasClass("wsale_term_cat") ) {

			// GET AVAILABLE OPTIONS FROM DROPDOWN
			var dropdown = $("#wwof_product_search_category_filter");
			dropdown.find("option").each( function(){
				var optionName = $(this)[0].innerHTML,
					optionSlug = optionName.toLowerCase().split(" ").join("-");

				if ( target === optionSlug ) {
					// GET VAL
					var thisVal = $(this)[0].index;
					// REMOTELY SELECT IN DROPDOWN
					dropdown.prop( "selectedIndex", thisVal );
					// CLEAR TEXT FIELD
					$("#wwof_product_search_form").val("");
				}
			});

		} else if ( click.hasClass("wsale_term_tag") ) {

			// PLURAL TO SINGULAR
			var lastLetter = target.slice(-1),
				secondLastLetter = target.slice(-2);
			if ( secondLastLetter === "es" ) {
				target = target.substring(0, target .length - 2);
			} else if ( lastLetter === "s" ) {
				target = target.substring(0, target .length - 1);
			}
			if ( target === "sweatshirt" ) {
				target = "sweater";
			}
			// REMOVE HYPHENS FOR TSHIRTS		
			if ( target.indexOf("-") > -1 ) {
				target = target.split("-").join("");
			}
			// INJECT TEXT IN SEARCH FIELD
			$("#wwof_product_search_form").val( target );
		
		}

		// TRIGGER CLICK
		$("#wwof_product_search_btn")[0].click();

		// HIGHLIGHT SELECTED TAG
		$("#wsale_filter_terms a").css( "border-bottom", "" );
		click.css( "border-bottom", "2px solid black" );

		// APPEND TEXT TO PLACEHOLDER
		$("#selected_term").text( text ).show();

		// HIDE TERMS
		this.filterHide();

	},

	filterReset: function () {

		console.log("Wholesale.filterReset");

		// CLEAR SELECTED TERMS
		$("#wsale_filter_terms a").css( "border-bottom", "" );
		// CLEAR TEXT FIELD
		$("#wwof_product_search_form").val("");
		// HIDE + EMPTY SELECTED TERM
		$("#selected_term").text("").hide();

	},

	updateQuantities: function ( cartQuantity, click ) {

		console.log("Wholesale.updateQuantities");

		var inputQuantity = parseInt( click.siblings(".quantity").find("input").val() );

		// IF QUANTITY WRAPPER ALREADY EXISTS
		if ( click.parents(".variation_wrapper").find(".quantity_in_cart").length ) {
			console.log("Wrapper exists.", cartQuantity, inputQuantity );
			click.parents(".variation_wrapper").find(".quantity_in_cart").text( cartQuantity + inputQuantity );
		} else {
			console.log("Wrapper does not exist.");
			click.parents(".variation_wrapper").find(".variation_size").after("<div class='in_cart'><span class='quantity_in_cart'>" + inputQuantity + "</span> in cart</div>");
		}

	},

	ajaxQuantities: function ( click, itemId ) {

		console.log("Wholesale.ajaxQuantites");

		// ON CLICK EVENT
		// CHECK HOW MANY OF CLICKED ITEM IS IN CART + QUANTITY IN INPUT FIELD
		$.ajax({
	        url: myAjax.ajaxurl,
	        data: {
	            "action" : "quantities",
	            "id" : itemId
	        },
	        success:function(data) {
				console.log(data);
				// INJECT INTO HTML
				Wholesale.updateQuantities( parseInt(data), click );
	        },
	        error: function(errorThrown){
	            console.log(errorThrown);
	        }
	    }); 

	},

	customAddToCart: function ( click ) {

		console.log("Wholesale.customAddToCart");

		var productId = click.data("id"),
			variationId = click.data("variation"),
			quantity = parseInt( click.siblings(".quantity").find("input").val() ), 
			variationSize = click.data("size");

		console.log( 426, productId, variationId, quantity, variationSize );

		$.ajax({
		    url: myAjax.ajaxurl,
		    data: {
		        "action" : "woocommerce_add_variation_to_cart",
		        "product_id" : productId,
		        "variation_id" : variationId,
		        "quantity" : quantity,
		        "variation_size" : variationSize, 
		    	type: "POST"  
		    },
		});

	}

}
