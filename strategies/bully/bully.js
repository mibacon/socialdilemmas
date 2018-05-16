$(function () { // this is a shortcut for document ready
    
	var s = Snap("#svg")
	
	var height = (document.documentElement.clientHeight)*.5

    $.getJSON("./bully.json", function(data) {
	    var counter = 0;
	    
		var oldX1 = 300
	    var oldX2 = 500; //svg width is hardcoded as 600
	    var	oldY1 = height-20;//svg height is hardcoded as 600
	    var	oldY2 = height-20;
	    s.text(oldX1, height, "Bully")
		s.text(oldX1 + (oldX2-oldX1)/2, height, "vs")
		s.text(oldX2, height, "Partner")
	    
	    
	    var ry = 50
	    var rx = 50
	    // var g = s.g()

	    
	    
	    var drawArc = function(move, player) { 	

		
	    	var oldX = (player == "player1")? oldX1: oldX2
			var oldY = (player == "player1")? oldY1: oldY2
			var color = (player == "player1")? "#000": "#c8c8c8"
	    	var y = oldY - ry
			
			console.log("at this stage, oldX is " + oldX)
	    
	    	if (move == "d") {
	    		x = oldX + rx
	    	} else {
	    		x = oldX - rx 
	    	}

	    	var arc = s.path(`M${oldX + " " + oldY} Q${oldX + " " + y + " " + x + " " + y}`)

	        arc.attr({stroke:color, fill:"none", 'stroke-width': 4})
	       	
	        if (player == "player1"){
	        	oldX1 = x
	        	oldY1 = y
	        } else {
	        	oldX2 = x
	        	oldY2 = y
	        }
	        
	        
			var glow = s.filter(Snap.filter.shadow(0, 2, "#c8c8c8", .8));

	      	var pathLength = Snap.path.getTotalLength(arc);
			arc.attr({'stroke-dasharray': pathLength*2, 'stroke-dashoffset': pathLength*2})
	
			var drawCircle = function(){
				if (player == "player1"){
					var circle = s.circle(x,y,0).attr({fill: "#000", filter: glow}).addClass("circle")
					setTimeout(function() {
							circle.animate({r:5}, 500, mina.linear)
						}, 1000); 
				} else {
					if (counter > 0) {
						var circle = s.circle(oldX,oldY, 0).attr({fill: "#FFF", stroke: "#c8c8c8", filter: glow}).addClass("circle")
						setTimeout(function() {
							circle.animate({r:5}, 500, mina.linear)
						}, 1500); 
						
					}
				}
			} 
		


	

				arc.animate({'stroke-dashoffset': pathLength}, 1000, mina.easeinout, drawCircle())
		
			//end of drawcircle
			
			

	    } //end of drawArc1
	    
	    


	    
	    
	    $('#next').click(function () {
	    	$("#next span").text("Next step")
	    	$('p').hide()
	    	$('#content').css("display","block").text(data[counter].text)
	    	
	        console.log(counter)
	    	$(".circle").attr({visibility: "hidden"})
	        drawArc(data[counter].player1, "player1");
	        drawArc(data[counter].player2, "player2");// the new incremented value
	       
			counter = (counter + 1) ;// increment your counter
	        // the modulus (%) operator resets the counter to 0
	        // when it reaches the length of the array
	      	if (counter == data.length){
	      		counter = counter
	        	$('button').css('opacity',0.5);
	        	$('button').on('mouseover', function() {
	        		$('button').css('opacity', 1)
	        	}).on('mouseout', function() {
	        		$('button').css('opacity', 0.5)
	        	})
	        }
	    }); // end of click

	})// end of data
})//end of ready