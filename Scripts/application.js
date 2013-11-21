; (function (window, $) {
    var cyberlane = {
    	resize: function () {
        	$("#main-row").css("height", ($("body").height() - $("footer").height() - $(".masterhead").height()) + "px");
    	}
	};

    window.onresize = function (event) {
        cyberlane.resize();
    };

    cyberlane.resize();
})(window, jQuery);