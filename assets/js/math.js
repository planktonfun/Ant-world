		// Calculating functions
		function overlap(r1, r2) {
		    var hit = !(r1.x + r1.w < r2.x ||
		               r2.x + r2.w < r1.x ||
		               r1.y + r1.h < r2.y ||
		               r2.y + r2.h < r1.y);
	    	
	    	return hit;
		}

		function sortArrayDesc( arrays ) {
				var min = [];

				for( var index in arrays ) {
					min.push( index );
				};
			    
			    min.sort(function(a,b){return a-b;});
				
				return min;
		}

		function getDistance( point1, point2 ) {
			var xs = point2.x - point1.x;
			var ys = point2.y - point1.y;

			xs = xs * xs;
			ys = ys * ys;

			return Math.sqrt( xs + ys );
		}

		function limVar( num, min, max ) {
			return Math.min( Math.max( parseFloat( num ), min ), max );
		}

		function randNum( min, max ) {
			return Math.floor( Math.random() * (max - min + 1) + min );
		}

		function drawEllipse( centerX, centerY, width, height ) 
		{
			context.beginPath();
			context.moveTo(centerX, centerY - height/2);

			context.bezierCurveTo(
			centerX + width/2, centerY - height/2,
			centerX + width/2, centerY + height/2,
			centerX, centerY + height/2);

			context.bezierCurveTo(
			centerX - width/2, centerY + height/2,
			centerX - width/2, centerY - height/2,
			centerX, centerY - height/2);

			context.fillStyle = 'rgba(0,0,0,0.4)';
			context.fill();
			context.closePath();	
		}

		function scaleImage( ) {
			context.scale( scalewidth, scaleheight);
		}

		function revertScale( ) {
			context.scale( revertwidth, revertheight);
		}

		function calculateFPS() {

			var thisFrameFPS = 1000 / ((now=new Date) - lastUpdate);
			
			if (now!=lastUpdate){
				fps += (thisFrameFPS - fps) / fpsFilter;
				lastUpdate = now;
			}

		}

		function loopAdjacent( x, y, callback, offset, diagonal ) {

			var diagonal = diagonal || false;
			var offset = offset || 1;

			callback( x+offset, y );
			callback( x-offset, y );
			callback( x, y+offset );
			callback( x, y-offset );

			if( diagonal ) {
				callback( x+offset, y-offset );
				callback( x+offset, y+offset );				
				callback( x-offset, y+offset );
				callback( x-offset, y-offset );
			}

		}

		function drawFromPartImage( image, map, x, y, w, h ) {

			if(typeof(w)==='undefined') w = map.w;
			if(typeof(h)==='undefined') h = map.h;

			context.drawImage( image, 
				map.x, map.y, map.w, map.h,
				x, y, w, h
			);
		
		}

		function addText( text, x, y, size, color, opacity, borders ) {

			if(typeof(borders)==='undefined') borders = true;	
			if(typeof(size)==='undefined') size = 24;	
			if(typeof(color)==='undefined') color = "White";	
			if(typeof(opacity)==='undefined') opacity = 1;	

			opacity = limVar(opacity, 0, 1);
			
			context.save();
			context.globalAlpha = opacity;
			context.font = size + "px Gloria Hallelujah";
			context.fillStyle = color;

			if( borders ) {
				context.miterLimit = 2;
				context.lineJoin = 'circle';
				context.lineWidth = 7;
				context.strokeText(text, x, y);
				context.lineWidth = 1;
			}

			context.fillText(text, x, y);
			context.globalAlpha = 1;
			context.restore();
		}

		function drawRect( x, y, w, h, color ) {

			if(typeof(color)==='undefined') color = "Black";

			context.fillStyle = color;
			context.fillRect(x - (w/2),y - (h/2),w,h);
		}

		function drawMouse( x, y, id ) {

			if(typeof(id)==='undefined') id = "canvas";

			var div = $("#" + id);
		    var width = 721;
			var height = 1370;
			var ratiox = width / div.width();
			var ratioy = height / div.height();
		    var mousex = (x - div.offset().left) * ratiox;
		    var mousey = (y - div.offset().top) * ratioy;
		    var canvas = document.getElementById( id );
			var context = canvas.getContext("2d");

			if(typeof(cursor)==='object') context.drawImage( cursor, mousex - 15, mousey - 5 );
			else drawRect( mousex, mousey, 5, 5, id );

	    	addText( Math.round(mousex) + ', ' + Math.round(mousey), mousex+(20*ratiox), mousey+(60*ratioy) );

	    	return { x: mousex, y: mousey };

		}

		function timeStamp() {
			if (!Date.now) {
			    Date.now = function() { 
			    	return new Date().getTime(); 
			    };
			}

			return Date.now();
		}