$(function () { // this is a shortcut for document ready
    
	var s = Snap("#svg")
	
	var counter = 0;
	    
	var height = (document.documentElement.clientHeight)*.75
	
	var ry = 50
    var rx = 50
	    
		var drawArc = function(move, player, counter) { 	

	    	
	    	var oldX = (player == "player1")? oldX1: oldX2
			var oldY = (player == "player1")? oldY1: oldY2
			var color = (player == "player1")? "#000": "#c8c8c8"
	    	var y = oldY - ry
			
			console.log("at this stage, oldY is " + oldY)
	    
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
					if ((counter == 1) || (counter == 2)) {
						var circle = s.circle(oldX,oldY, 0).attr({stroke: "#c8c8c8", fill: "#FFF", filter: glow})
						setTimeout(function() {
							circle.animate({r:5}, 500, mina.linear)
						}, 1500); 
						
					}
				}
			} //end of drawcircle
		
			arc.animate({'stroke-dashoffset': pathLength}, 1000, mina.easeinout, drawCircle())
		
			
		} //end of drawArc	
			

					var oldX1 = 300
				    var oldX2 = 500; //svg width is hardcoded as 600
				    var	oldY1 = height-20;//svg height is hardcoded as 600
				    var	oldY2 = height-20;
				    s.text(oldX1, height, "Collective Strategy")
					s.text(oldX1 + (oldX2-oldX1)/2, height, "vs")
					s.text(oldX2, height, "Partner")

	    $.getJSON("./colls.json", function(data) {
    		
    		$('#next').click(function () {
			    $("#next span").text("Next step")
			    $('p').hide()
			    $('#content').css("display","block").text(data[counter].text)
    				console.log('counter is ' + counter)
    				
    				$(".circle").attr({visibility: "hidden"})
			        if (counter < data[0].length) {
			        	$('#content').text(data[0][counter].text)
				        drawArc(data[0][counter].player1, "player1", counter);
				        drawArc(data[0][counter].player2, "player2", counter);// the new incremented value
	    				counter = (counter + 1) //% ((data[0].length)*2)
			        	
			        	
			        } else if (counter == data[0].length) {
			        	var counter2 = counter - data[0].length
					    $("path").attr({visibility: "hidden"})
					    $("circle").attr({visibility: "hidden"})
						$("#content").attr({visibility:"hidden"})
					    counter = counter + 1
			        
			        	oldX1 = 300
			        	oldX2 = 500
			        	oldY1 = height-20;//svg height is hardcoded as 600
				    	oldY2 = height-20;
			        } else if (counter < 15) {
    				// if (counter > data[0].length) {
    					counter = (counter + 1) 

						var counter2 = counter - 9
					
					    console.log('counter2 is ' + counter2)
					    $('#content').text(data[1][counter2].text)
				        drawArc(data[1][counter2].player1, "player1", counter2);
				        drawArc(data[1][counter2].player2, "player2", counter2);// the new incremented value
    				} else {
    					$('button').css('opacity',0.5);
			        	$('button').on('mouseover', function() {
			        		$('button').css('opacity', 1)
			        	}).on('mouseout', function() {
			        		$('button').css('opacity', 0.5)
			        	})
    				}
    				
    			})
    			
	   
		})// end of data
	
		
})//end of ready