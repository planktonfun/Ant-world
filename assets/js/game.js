				
		var numResourcesLoaded = 0; 
		var totalResources = 0;
		var images = [];
		var sounds = [];
		var extras = [];
		var loadPercent = 0;
		var isSafari = /Safari/.test(navigator.userAgent) && /Apple Computer/.test(navigator.vendor);
		var isDevice = /iphone|ipad|ipod|android/i.test(navigator.userAgent);
		var quicktime = false;
		var mobilesound = false;
		
		if( isSafari ) {

			if (navigator.plugins) {
			    for (i=0; i < navigator.plugins.length; i++ ) {
			        if (navigator.plugins[i].name.indexOf
			        ("QuickTime") >= 0)
			        { quicktime = true; }
			    }
			}

			if ((navigator.appVersion.indexOf("Mac") > 0)
			    && (navigator.appName.substring(0,9) == "Microsoft")
			    && (parseInt(navigator.appVersion) < 5) )
			{ quicktime = true; }

			if( !quicktime ) {
				alert( 'I\'m sorry in order to produce sound in safari, you need a quicktime player installed' );
			}

			if( isDevice == true && quicktime == true && isSafari == true ) { // for iphone devices
				quicktime = false;
				mobilesound = true;
			}
		}

		function loadAll( ) { // Load all images

			var container = [];
			var container2 = [];
			var container3 = [];

			// Images
			container.push("sprite_stickman");

			// Sounds
			// Check if ipad and disable sound			
			if( !isSafari || ( isSafari == true && quicktime == true ) ) {
				// container2.push("432032");
			}

			// Extras
			// container3.push("left");

			totalResources = container.length + container2.length + container3.length;
			// totalResources++;
			
			$.each( container, function( index, value ) {
				loadImage( value );
			});

			$.each( container2, function( index, value ) {
				loadSounds( value );
			});

			$.each( container3, function( index, value ) {
				loadExtras( value );
			});
		}
			
		function loadImage( name ) {		  
				images[name] = new Image();
				images[name].src = "./assets/images/" + name + ".png";
				images[name].onload = function() { loadFunc( ); };
		}

		function loadSounds( name ) {		  
				sounds[name] = new Audio("./assets/sounds/" + name + ".mp3");
				sounds[name].addEventListener('loadeddata', function(){ loadFunc( ); });
		}

		function loadExtras( name ) {		  
				extras[name] = new Image();
				extras[name].src = "./assets/images/" + name + ".png";
				extras[name].onload = function() { loadFunc( ); };
		}

		function loadFunc( ) {
			numResourcesLoaded += 1;

			if( numResourcesLoaded === totalResources ) {
					loadPercent = 100;

					// map game image file
					mapGameImage();

					// render canvas
					setInterval( render_canvas, 1000/60 );

					console.log( Math.round( loadPercent ) );					
			} else {
					loadPercent = (( numResourcesLoaded / totalResources ) * 100);
					
					console.log( Math.round( loadPercent ) );
			}
		}

		// Game Setup
		var canvas = document.getElementById("canvas");
		var context = canvas.getContext("2d");
		var start_time = timeStamp();

		function render_canvas() {

			canvas.width = canvas.width; // Clear the page
			
			// Display Background
			render_background( );

			// Display Mouse Cursor
			drawMouse( mouse_x, mouse_y );

		}

		function render_background( ) {

			gif['stickman'].period = 20;
			gif['stickman'].animate();

			drawFromPartImage( images[ gif['stickman'].img ], gif['stickman'].map(), 421, 154 );
			drawFromPartImage( images[ gif['stickman'].img ], gif['stickman'].map(), 302, 154 );
			drawFromPartImage( images[ gif['stickman'].img ], gif['stickman'].map(), 198, 154 );

			var time = (timeStamp() - start_time)/1000;

			addText( time.toFixed(3), 244, 103, 50, "green", 1, 0 );

		}