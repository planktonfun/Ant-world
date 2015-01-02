// Initiate Loading
$(function(){ 

	loadAll( );
	
	$(window).bind('resize', function() {

		var width = 1370;
		var height = 721;
		var parentWidth = window.innerWidth;
		var parentHeight = window.innerHeight;

		var aspect = width / height;
		var parentAspect = parentWidth / parentHeight;

		if (aspect > parentAspect) {
		    newWidth = parentWidth;
		    newHeight = newWidth / aspect;
		} else {
		    newHeight = parentHeight;
		    newWidth = newHeight * aspect;
		}

		$('.container').width(newWidth);
		$('.container').height(newHeight);	


		var preferredHeight = height;  
		var fontsize = 58;
		var displayHeight = newHeight;
		var percentage = displayHeight / preferredHeight;
		var newFontSize = Math.floor(fontsize * percentage) - 1;
		$("body").css("font-size", newFontSize);

    }).trigger('resize');
	
});