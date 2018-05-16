$(function () { // this is a shortcut for document ready
    
	var s = Snap("#svg")
	
	var counter = 0;
	    
	var height = (document.documentElement.clientHeight)*.5
	var width = (document.documentElement.clientWidth)*.45
	
	var ry = 30
    var rx = 30
	    
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
					if (counter > 0)  {
						var circle = s.circle(oldX,oldY, 0).attr({stroke: "#c8c8c8", fill: "#FFF", filter: glow})
						setTimeout(function() {
							circle.animate({r:5}, 500, mina.linear)
						}, 1500); 
						
					}
				}
			} //end of drawcircle
		
			arc.animate({'stroke-dashoffset': pathLength}, 1000, mina.easeinout, drawCircle())
		
			
		} //end of drawArc	
			
			        var oldX1 = width *.3
				    var oldX2 = width *.6; //svg width is hardcoded as 600
				    var	oldY1 = height-20;//svg height is hardcoded as 600
				    var	oldY2 = height-20;
				    s.text(oldX1, height, "Adaptive Pavlov")
					s.text(oldX1 + (oldX2-oldX1)/2, height, "vs")
					s.text(oldX2, height, "Partner")

	    $.getJSON("./adaptiveP.json", function(data) {
    		
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
			        
			        	oldX1 = width *.3
				    	oldX2 = width *.6
			        	oldY1 = height-20
			        	oldY2 = height-20
			        } else if (counter < 15) {
    				// if (counter > data[0].length) {
    					counter = (counter + 1) 

						var counter2 = counter - 9
					
					    console.log('counter2 is ' + counter2)
					    $('#content').text(data[1][counter2].text)
				        drawArc(data[1][counter2].player1, "player1", counter2);
				        drawArc(data[1][counter2].player2, "player2", counter2);// the new incremented value
    				
			        	
			        } else if (counter == 15) {
			        	
					    $("path").attr({visibility: "hidden"})
					    $("circle").attr({visibility: "hidden"})
						$("#content").attr({visibility:"hidden"})
					    counter = counter + 1
			        
			        	oldX1 = width *.3
				    	oldX2 = width *.6
			        	oldY1 = height-20
			        	oldY2 = height-20
			        } else if (counter < 22) {
    					counter = (counter + 1) 

						var counter3 = counter - 16
					
					    console.log('counter2 is ' + counter3)
					    $('#content').text(data[2][counter3].text)
				        drawArc(data[2][counter3].player1, "player1", counter2);
				        drawArc(data[2][counter3].player2, "player2", counter2);// the n
			        
			        	
			        } else if (counter == 22) {
			        	
					    $("path").attr({visibility: "hidden"})
					    $("circle").attr({visibility: "hidden"})
						$("#content").attr({visibility:"hidden"})
					    counter = counter + 1
			        
			        	oldX1 = width *.3
				    	oldX2 = width *.6
			        	oldX2 = 400
			        	oldY1 = height-20
			        	oldY2 = height-20

    				} else if ( counter < 29) {
    					counter = (counter + 1) 

						var counter4 = counter - 23
					
					    console.log('counter2 is ' + counter4)
					    $('#content').text(data[3][counter4].text)
				        drawArc(data[3][counter4].player1, "player1", counter2);
				        drawArc(data[3][counter4].player2, "player2", counter2);// the n
    				} else {
    					$('button').css('opacity',0.5);
			        	$('button').on('mouseover', function() {
			        		$('button').css('opacity', 1)
			        	}).on('mouseout', function() {
			        		$('button').css('opacity', 0.5)
			        	})
    				}
    				
    			})
    			
	    // 		if (counter < data[0].length-1) {
					// $(".circle").attr({visibility: "hidden"})
			  //      drawArc(data[0][counter].player1, "player1");
			  //      drawArc(data[0][counter].player2, "player2");// the new incremented value
			       
					// counter = (counter + 1) //% data[0].length;
		    	
			  //  	// $('#graph').attr("src", data[counter].image)
			  //  	$('#content').text(data[0][counter].text)
		    	
		   //     console.log('counter is ' + counter)
		   //     console.log('data length is ' + data[0].length)
	    // 		} else {
	    // 			
			       
					// counter = (counter + 1) % data[1].length;
	    // 		}
	    	 	
		      	// }); // end of click
		      	
		   //   $('div').click(function () {
	    // 		if (counter > data[0].length-1) {
					// $(".circle").attr({visibility: "hidden"})
			  //      drawArc(data[1][counter].player1, "player1");
			  //      drawArc(data[1][counter].player2, "player2");// the new incremented value
			       
					// counter = (counter + 1) % data[0].length;
		    	
			  //  	// $('#graph').attr("src", data[counter].image)
			  //  	$('#content').text(data[0][counter].text)
		    	
		   //     console.log('counter is ' + counter)
		   //     console.log('data length is ' + data[0].length)
	    // 		}
		      	
		   //   	if (counter == 0) {
		   // 		
		   //   	}
		    	
	    	// } //end of for
		})// end of data
	
		
})//end of ready