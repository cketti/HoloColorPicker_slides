(function($) {
	$(".reveal").append('<div id="qrcode-control"></div>');
	var control = $("#qrcode-control");
	
	var enabled = false;
	
	var removeQrCode = function() {
		var qrcodeCanvas = $("#qrcode-canvas");
	
		if (qrcodeCanvas.size() != 0) {
			qrcodeCanvas.remove();
			
			if (Reveal.isPaused()) {
				Reveal.togglePause();
			}
		}
	};
	
	var showQrCode = function(text) {
		Reveal.togglePause();
		
		$(".reveal").append('<div id="qrcode-canvas"></div>')
		var qrcodeCanvas = $("#qrcode-canvas");
		
		// http://stackoverflow.com/questions/210717/using-jquery-to-center-a-div-on-the-screen
		qrcodeCanvas.css("top", Math.max(0, (($(window).height() - qrcodeCanvas.outerHeight()) / 2) + $(window).scrollTop()) + "px");
		qrcodeCanvas.css("left", Math.max(0, (($(window).width() - qrcodeCanvas.outerWidth()) / 2) + $(window).scrollLeft()) + "px");
		
		qrcodeCanvas.qrcode({text: text, width: 512, height: 512});

		qrcodeCanvas.click(removeQrCode);
	};
	
	control.click(function() {
		if (enabled) {
			control.removeClass("enabled");
			enabled = false;
			
			removeQrCode();
		} else {
			control.addClass("enabled");
			enabled = true;
		}
	});
	
	control.dblclick(function() {
		showQrCode(window.location.pathname);
	});
	
	$(".reveal a").click(function() {
		if (enabled) {
			showQrCode($(this).attr("href"));
			
			return false;
		}
		
		return true;
	});
	
	$(document).keydown(function(eventObject) {
		removeQrCode();
	});

})(jQuery);