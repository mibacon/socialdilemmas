$(function () { // this is a shortcut for document ready
    
	var s = Snap("#svg")
	var height = (document.documentElement.clientHeight)*.5
	
    $.getJSON("./defect.json", function(data) {
	    var counter = 0;
	    var oldX1 = 300
	    var oldX2 = 500; //svg width is hardcoded as 600
	    var	oldY1 = height -20//svg height is hardcoded as 600
	    var oldY2 = height -20
	    s.text(oldX1, height, "Defector")
		s.text(oldX1 + (oldX2-oldX1)/2, height, "vs")
		s.text(oldX2, height, "Partner")
	    ;

	    var ry = 50
	    var rx = 50
	    // var g = s.g()



	    var drawArc1 = function(move) { 	
	    	

	    	var y = oldY1 - ry

	    	if (move == "d") {
	    		x = oldX1 + rx
	    	} else {
	    		x = oldX1 - rx 
	    	}

	    	var arc = s.path(`M${oldX1 + " " + oldY1} Q${oldX1 + " " + y + " " + x + " " + y}`)

	        arc.attr({stroke:"#000", fill:"none", 'stroke-width': 4})
	       	
	        oldX1 = x;
	        oldY1 = y;

	      	var pathLength = Snap.path.getTotalLength(arc);
			arc.attr({'stroke-dasharray': pathLength*2, 'stroke-dashoffset': pathLength*2})



			arc.animate({'stroke-dashoffset': pathLength}, 1000, mina.easeinout)


	    } //end of drawArc1

	   	var drawArc2 = function(move) { 	


	        var y = oldY2 - ry

	    	if (move == "d") {
	    		x = oldX2 + rx
	    	} else {
	    		x = oldX2 - rx 
	    	}

	    	var arc = s.path(`M${oldX2 + " " + oldY2} Q${oldX2 + " " + y + " " + x + " " + y}`)

	        arc.attr({stroke:"#c8c8c8", fill:"none", 'stroke-width': 4})
	        
	        oldX2 = x;
	        oldY2 = y;

	      	var pathLength = Snap.path.getTotalLength(arc);
			arc.attr({'stroke-dasharray': pathLength*2, 'stroke-dashoffset': pathLength*2})
			arc.animate({'stroke-dashoffset': pathLength}, 1000, mina.easeinout)


	    } //end of drawArc1
	   
	    // the next line, of course, assumes you have an element with id="next"
	   $('#next').click(function () {
	    	$("#next span").text("Next step")
	    	$('p').hide()
	    	$('#content').css("display","block").text(data[counter].text)
	        counter = (counter + 1) % data.length; // increment your counter
	        // the modulus (%) operator resets the counter to 0
	        // when it reaches the length of the array

	        console.log(counter)
	        drawArc1(data[counter].player1); // the new incremented value
	        drawArc2(data[counter].player2)

	       	// if (counter == 0) {
	        //    	location.reload();
	        	
	        // }
	        if (counter == data.length-1){
	        	$('button').css('opacity',0.5);
	        	$('button').on('mouseover', function() {
	        		$('button').css('opacity', 1)
	        	})
	        }
	    });

	})// end of data
})//end of ready