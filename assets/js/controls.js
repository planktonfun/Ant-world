// Controls and Clicks
var mouse_x = 0;
var mouse_y = 0;
var clicked = false;
var keypressed = 0;
var tiltLR = 0;

function addCanvasEventListener(name, fn) { // Get Mouse/touchpad position
	window.addEventListener(name, fn, false);
}

addCanvasEventListener( "touchmove", getmouse );								
addCanvasEventListener( "mousemove",  getmouse );
addCanvasEventListener( "mousedown",  function() { clicked = true });
addCanvasEventListener( "mouseup",  function() { clicked = false });

function getmouse(e) { 
	mouse_x = e.clientX || e.layerX;
	mouse_y = e.clientY || e.layerY;
	preventDefault(e);

	return false;
}

function preventDefault(e) {
  e = e || window.event;
  if (e.preventDefault)
      e.preventDefault();
  e.returnValue = false;  
}

document.onkeydown = function(e) { // Monitor Keyboard keys
	e = e || window.event;
	
	keypressed = e.keyCode;

	// prevent scrolling
	switch( keypressed ) {
		case 38:
		case 40:
			preventDefault(e);
	}

};

document.onkeyup = function(e) { // Monitor Keyboard keys
	e = e || window.event;	

	keypressed = 0;
};


// for mobile devices
// if (window.DeviceOrientationEvent) {
// 	window.addEventListener('deviceorientation', function(eventData) {
// 	    // gamma is the left-to-right tilt in degrees, where right is positive
// 	    tiltLR = Math.round( eventData.gamma );

// 	  }, false);
// }