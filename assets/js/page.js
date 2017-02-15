var Page = {

	menuVisible: false, 

	init: function () {

		console.log("Page.init");

		if ( $("#home").length ) {
			Home.init();
		} else if ( $(".collection").length ) {
			Collection.init();
		}


		this.bindEvents();

	},

	bindEvents: function () {

		console.log("Page.bindEvents");

		$("#menu_toggle a").on("click", function(e){
			e.preventDefault();
			if ( !Page.menuVisible ) {
				Page.menuOpen();
				Page.menuVisible = true;
			} else {
				Page.menuClose();
				Page.menuVisible = false;
			}
		});

	},

	menuOpen: function () {

		console.log("Page.menuOpen");

		// GIVE HEIGHT TO MENU
		var menu = $("#menu_top_hidden"),
			totalH = $("#menu_content_wrapper").height() + 120;
		menu.css({"height":totalH});

	},

	menuClose: function () {

		console.log("Page.menuClose");

		$("#menu_top_hidden").css({"height":""});

	}

}

$(document).on( "ready", function() {

	Page.init();

});