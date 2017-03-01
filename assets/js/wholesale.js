var Wholesale = {

	init: function (){

		console.log("Wholesale.init");

		this.bindEvents();

		// ADD RRP TO PRICES
		this.rrpAppend();

		// LOAD IMAGES
		this.imagesLoad();

		// TRIGGER EVENT FOR NAVIGATION BETWEEN AJAX PAGES
		$(this).trigger("wholesale_ready");

	},

	bindEvents: function () {

		console.log("Wholesale.bindEvents");

		// BIND GALLERY EVENTS
		$("#wwof_product_listing_ajax_content").on("click", ".gallery_right", function () {
			console.log(24);
			var target = $(this).parents(".gallery_nav").prev(".wholesale_product_image").find(".gallery");
			Gallery.nextSlide( target );
		});

		$("#wwof_product_listing_ajax_content").on("click", ".gallery_left", function () {
			console.log(30);
			var target = $(this).parents(".gallery_nav").prev(".wholesale_product_image").find(".gallery");
			Gallery.prevSlide( target );
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

	}

}

	// EVENTS


// 	6. WHOLESALE
		
	// 6.1. OTHER COLOURS

		// ON HOVER

	// $("#wwof_product_listing_ajax_content").on( "mouseover", ".wholesale_other_colours", function(){
	// 	console.log(341);
	// 	wsaleOtherColoursHover( $(this) );
	// });

	// $("#wwof_product_listing_ajax_content").on( "mouseout", ".wholesale_other_colours", function(){
	// 	wsaleOtherColoursUnhover( $(this) );
	// });

	// 	// ON CLICK

	// $("#wwof_product_listing_ajax_content").on( "click", ".wholesale_other_colours", function(){
	// 	wsaleOtherColoursClick( $(this) );
	// });

	// // 6.1. FILTER TOGGLE

	// $("#ws_filter_toggle").on( "click", function (e) {
	// 	e.preventDefault();
	// 	wsaleFilterToggle();
	// });

	// 	// CLICK OUTSIDE TO CLOSE
	// $(document).on( "click", function (e) {
 //    	var container = $("#search_wrapper");
	//     if (!container.is(e.target) && container.has(e.target).length === 0) {
	//         container.css({
	//         	"height" : ""
	//         }).addClass("hidden");
	//         container.find("#wsale_filter_terms").css({
	// 			"padding-top": ""
	// 		});
	//     }
	// });

	// // 6.2. FILTER TERMS CLICK

	// $(".wsale_term").on( "click", function (e) {
	// 	e.preventDefault();
	// 	wsaleFilter( $(this) );
	// });

	// 	// RESET
	// $("#wwof_product_displayall_btn").on( "click", function(){
	// 	wsaleFilterReset();
	// });



	// // 7.2. WHOLESALE OTHER COLOURS

	// 	// HOVER

	// function wsaleOtherColoursHover ( click ) {
	// 	// console.log("wsaleOtherColoursHover");
	// 	// GET TARGET TITLE
	// 	var targetText = click.find("p").text();
	// 	// INJECT INTO PLACEHOLDER
	// 	click.parents(".wholesale_product_title").find(".wholesale_other_colours_title").text( targetText );
	// }

	// function wsaleOtherColoursUnhover( click ) {
	// 	// console.log("wsaleOtherColoursUnhover");
	// 	// EMPTY PLACEHOLDER
	// 	click.parents(".wholesale_product_title").find(".wholesale_other_colours_title").text( "");
	// }

	// 	// CLICK

	// function wsaleOtherColoursClick ( click ) {
	// 	console.log("wsaleOtherColoursClick");
	// 	var targetOffset,
	// 		padding;
	// 	// GET TARGET ID
	// 	var targetId = click.data("id");

	// 	// CHECK IF TARGET IS VISIBLE
	// 	if ( $("#" + targetId).length ) {
	// 		// VISIBLE
	// 		// GET OFFSET OF TARGET
	// 		targetOffset = $("#" + targetId).offset().top;
	// 		padding = parseInt ( $(".page").css("padding-top") );
	// 		console.log(973, padding);
	// 		if ( targetOffset > 0 ) {
	// 			console.log( 884, targetOffset );
	// 			$("html,body").animate({
	// 				scrollTop : targetOffset - padding
	// 			}, 1000 );
	// 		}
	// 	} else {
	// 		// NOT VISIBLE
	// 		console.log("Not visible.");
	// 		// CHECK IF CLOSER TO BEGINNING OR END
	// 		var docH = $("html").height();
	// 		var clickPos = click.offset().top;
	// 		if ( clickPos > ( docH / 2 ) ) {
	// 			// NEXT
	// 			$("#wwof_product_listing_pagination").find(".next").trigger("click");
	// 			// SCROLL TO SELECTED PRODUCT
	// 			$(window).on( "wholesale_ready", function(){
	// 				console.log("wholesale_ready");
	// 				targetOffset = $("#" + targetId).offset().top;
	// 				padding = parseInt ( $(".page").css("padding-top") );
	// 				if ( targetOffset > 0 ) {
	// 					console.log( 884, targetOffset );
	// 					$("html,body").animate({
	// 						scrollTop : targetOffset - padding
	// 					}, 1000 );
	// 				}
	// 				// REMOVE LISTENER
	// 				$(window).off("wholesale_ready");
	// 			});
	// 		} else {

	// 			// PREV
	// 			$("#wwof_product_listing_pagination").find(".prev").trigger("click");
	// 			// SCROLL TO SELECTED PRODUCT
	// 			$(window).on( "wholesale_ready", function(){
	// 				console.log("wholesale_ready");
	// 				targetOffset = $("#" + targetId).offset().top;
	// 				padding = parseInt ( $(".page").css("padding-top") );
	// 				if ( targetOffset > 0 ) {
	// 					console.log( 884, targetOffset );
	// 					$("html,body").animate({
	// 						scrollTop : targetOffset - padding
	// 					}, 1000 );
	// 				}
	// 				// REMOVE LISTENER
	// 				$(window).off("wholesale_ready");
	// 			});
	// 		}
	// 	}


	// }

	// // 7.3. WHOLESALE FILTER TOGGLE

	// function wsaleFilterToggle () {
	// 	console.log("wsaleFilterToggle");
	// 	var wrapper = $("#search_wrapper");
	// 	var termsH = $("#wsale_filter_terms").height();
	// 	var termsPadding = 80;
	// 	// IF PORTRAIT
	// 	if ( $(window).height() > $(window).width() ) {
	// 		termsPadding = 140;
	// 	}
	// 	console.log( $(window).width(), termsH, termsPadding );
	// 	// CHECK IF HIDDEN
	// 	if ( wrapper.hasClass("hidden") ) {
	// 		// SHOW
	// 		wrapper.css({
	// 			"height" : termsH + termsPadding
	// 		});
	// 		wrapper.find("#wsale_filter_terms").css({
	// 			"padding-top": "0"
	// 		});
	// 		wrapper.removeClass("hidden");
	// 		// HIDE + EMPTY SELECTED TERM
	// 		$("#selected_term").text("").hide();
	// 	} else {
	// 		// HIDE
	// 		if ( $("#selected_term").is(':visible') ) {
	// 			// IF FILTER TERM IS VISIBLE
	// 			wrapper.css({
	// 				"height" : "100px"
	// 			});
	// 		} else {
	// 			wrapper.css({
	// 				"height" : ""
	// 			});				
	// 		}
	// 		wrapper.find("#wsale_filter_terms").css({
	// 			"padding-top": ""
	// 		});
	// 		wrapper.addClass("hidden");
	// 	}
	// }	

	// // 7.4. WHOLESALE FILTER TOGGLE

	// function wsaleFilter ( click ) {
	// 	console.log("wsaleFilter");
	// 	// GET TARGET
	// 	var target = click.data("target");
	// 	var text = click.text();
	// 	// GET CLASS
	// 	if ( click.hasClass("wsale_term_cat") ) {
	// 		// CATEGORY
	// 			// GET AVAILABLE OPTIONS FROM DROPDOWN
	// 		var dropdown = $("#wwof_product_search_category_filter");
	// 		dropdown.find("option").each( function(){
	// 			var optionName = $(this)[0].innerHTML;
	// 			var optionSlug = optionName.toLowerCase().split(" ").join("-");
	// 			if ( target === optionSlug ) {
	// 				// GET VAL
	// 				var thisVal = $(this)[0].index;
	// 				// REMOTELY SELECT IN DROPDOWN
	// 				dropdown.prop( "selectedIndex", thisVal );
	// 				// CLEAR TEXT FIELD
	// 				$("#wwof_product_search_form").val("");
	// 			}
	// 		});
	// 	} else if ( click.hasClass("wsale_term_tag") ) {
	// 		// TAG
	// 		// PLURAL TO SINGULAR
	// 		var lastLetter = target.slice(-1);
	// 		var secondLastLetter = target.slice(-2);
	// 		if ( secondLastLetter === "es" ) {
	// 			target = target.substring(0, target .length - 2);
	// 		} else if ( lastLetter === "s" ) {
	// 			target = target.substring(0, target .length - 1);
	// 		}
	// 		if ( target === "sweatshirt" ) {
	// 			target = "sweater";
	// 		}
	// 		// REMOVE HYPHENS FOR TSHIRTS		
	// 		if ( target.indexOf("-") > -1 ) {
	// 			target = target.split("-").join("");
	// 		}
	// 			// INJECT TEXT IN SEARCH FIELD
	// 		$("#wwof_product_search_form").val( target );
	// 	}
	// 	// TRIGGER CLICK
	// 	$("#wwof_product_search_btn")[0].click();

	// 	// SCROLL TO TOP
	// 	$("html, body").animate({
	// 		scrollTop : 0
	// 	}, 500 );

	// 	// HIGHLIGHT SELECTED TAG
	// 	// $("#wsale_filter_terms a").css( "border-bottom", "" );
	// 	// click.css( "border-bottom", "2px solid black" );

	// 	// APPEND TEXT TO PLACEHOLDER
	// 	$("#selected_term").text( text ).show();

	// 	// HIDE TERMS
	// 	wsaleFilterToggle();

	// }	

	// function wsaleFilterReset () {
	// 	console.log("wsaleFilterReset");
	// 	// CLEAR SELECTED TERMS
	// 	$("#wsale_filter_terms a").css( "border-bottom", "" );
	// 	// CLEAR TEXT FIELD
	// 	$("#wwof_product_search_form").val("");
	// 	// HIDE + EMPTY SELECTED TERM
	// 	$("#selected_term").text("").hide();
	// }