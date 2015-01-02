// separate image file to segments
var map = [];
var gif = [];

function mapGameImage()
{
	// create group of images to animate
	generateMapGif( 0, 0, 116, 143, "stickman", 21, "sprite_stickman" );

}

function generateMapGif( x, y, w, h, base, quantity, img, vertical ) {
	
	if(typeof(vertical)==='undefined') vertical = false;	

	for( var i = 1; i <= quantity; i++) 
	{
		map[ base + i ] = {
			x: x,
			y: y,
			w: w,
			h: h
		};

		if( vertical ) y += h;
		else x += w;

	}

	gif[ base ] = {
		base: base,
		img: img,
		s: 1,
		max: quantity,
		period: 75,
		map: function() { return map[ this.base + this.s ] },
		update: timeStamp(),
		addframe: function() { if( this.s >= this.max ) this.s = 1; else this.s += 1; },
		animate: function() { var time = (timeStamp() - this.update); if(  time >= this.period ) { 
			this.update = timeStamp(); 
			this.addframe(); 
		}},
		x: x, 
		y: y, 
		w: w, 
		h: h
	};

}