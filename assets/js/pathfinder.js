		
		var walls = [];
		var steps = 200;
		var steplimit = 200;
		var checkpoints = [];
		var offset = 15;

		function clearPaths( ) {
			checkpoints = [];
			walls = [];
		}

		function findPoint( from, to, color, renderpath ) {
			
			var color = color || 'green';
			var renderpath = renderpath || false;

			for( var i = 0; i<=steps; i++ ) {

				if( renderpath ) renderCheckPoint();

				var current = current || false;

				if( !current ) {

					if( isWall( from.x, from.y ) ) return;

					var distance = getDistance(from, to );

					addCheckPoint( from.x, from.y, distance, 0, 2 );

					// Get Checkpoints from starting position
					loopAdjacent( from.x, from.y, function( x, y ){

						var distance = getDistance({ x: x, y: y }, to );
						var cost = getDistance({ x: x, y: y }, from );

						addCheckPoint( x, y, distance, cost );

					}, offset, true);

				} else {

					if( current.d <= offset ) {
						
						BackTrackToPoint( current, from, color );

						break;
					}

					// Get Checkpoints from current position
					loopAdjacent( current.x, current.y, function( x, y ){

						var distance = getDistance({ x: x, y: y }, to );
						var cost = getDistance({ x: x, y: y }, from );

						addCheckPoint( x, y, distance, cost );

					}, offset, true);
					
				}

				// Get lowest distance from checkpoint
				var lowest = { x:0, y:0, d:Infinity, c:Infinity };

				$.each( checkpoints, function( ){

					if( this.type == 1 ) {
						if( lowest.d >= this.d ) {
							lowest.d = this.d;
							lowest.x = this.x;
							lowest.y = this.y;
							lowest.c = this.c;
						}
					}

				});

				updateCheckPoint( lowest, 2 );

				current = lowest;

			}

			checkpoints = [];

 		}

 		function BackTrackToPoint( current, from, color ) {

 			for( var i = 0; i<=steplimit; i++ ) {

	 			addWall( current.x, current.y,1, color);

	 			updateCheckPoint( current, 3 );

	 			// Get lowest cost from checkpoint
				var lowest = { x:0, y:0, d:Infinity, c:Infinity };

				loopAdjacent( current.x, current.y, function( x, y ){

					if( checkpoint = isCheckPoint( x, y ) ) {
						if( checkpoint.type != 3 ) {
							if( lowest.c >= checkpoint.c ) {
								lowest.c = checkpoint.c;
								lowest.d = checkpoint.d;
								lowest.x = checkpoint.x;
								lowest.y = checkpoint.y;
							}
						}
					}

				}, offset, false);

	 			current = lowest;

	 			if( current.c == 0 ) {

	 				updateCheckPoint( current, 3 );

	 				addWall( current.x, current.y,1, color );
	 				break;
	 			}
	 		}
 		}

		function updateCheckPoint( point, type ) {
			
			$.each( checkpoints, function( ){
				if( this.x == point.x && this.y == point.y ) {
					this.type = type;
				}
			});

		}

		function renderCheckPoint( color ) {
			var color = color || 'lightgreen';

			$.each( checkpoints, function( ) {

				if( this.type == 1 )
					drawRect( this.x, this.y, this.w, this.h, color );

				if( this.type == 2 )
					drawRect( this.x, this.y, this.w, this.h, 'lightblue' );

				if( this.type == 3 )
					drawRect( this.x, this.y, this.w, this.h, 'black' );

			});
		}

		function addCheckPoint( x, y, distance, cost, type ) {
			
			var type = type || 1; 

			if( !isCheckPoint( x, y ) && !isWall( x, y ) ) 
				checkpoints.push({ x:x, y:y, type: type, w: offset - 0.1, h: offset - 0.1, d: distance, c: cost });

		}

		function isCheckPoint( x, y, w, h ) { 

			var w = offset - 0.1;
			var h = offset - 0.1;
			var result = false;

			$.each( checkpoints, function( ){

				if( overlap({ x:x, y:y, w:w, h:h}, { x:this.x, y:this.y, w:this.w, h:this.h }) ) {
						result = this;
				}

			});

			return result;
		}

		function addWall( x, y, type, color ) {
			
			var type = type || 1; 
			var color = color || 'red'; 

			if( !isWall( x, y ) ) 
				walls.push({ x:x, y:y, type: type, w: offset-0.1, h: offset-0.1, color: color });

		}

		function isWall( x, y ) { 

			var w = offset - 0.1;
			var h = offset - 0.1;
			var result = false;

			$.each( walls, function( ){

				if( overlap({ x:x, y:y, w:w, h:h}, { x:this.x, y:this.y, w:this.w, h:this.h }) ) {
					if( this.type == 1 || this.type == 2 ) {
						result = true;
					}
				}

			});

			return result;
		}

		function renderWalls( ) {

			$.each( walls, function( ){

				drawRect( this.x, this.y, this.w, this.h, this.color );

			});

		}