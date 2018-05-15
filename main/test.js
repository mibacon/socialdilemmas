var map = function(n, start1, stop1, start2, stop2) {
  return ((n-start1)/(stop1-start1))*(stop2-start2)+start2;
};


var height = (document.documentElement.clientHeight)*.3
var width = height

// var width = 200;
// var height = 200;
var s;
$(function () { 

     
     

	$.getJSON("../scores1.json", function(data) {

		var state = {game: $(".buttons input:checked").attr("id"), strategy: $("li").eq(0).attr("id"), color: false}
		
		var arr = ["#svg0", "#svg1", "#svg2", "#svg3", "#svg4", "#svg5", "#svg6", "#svg7", "#svg8"]
		var gameLevel;
		var color;

		var bcolor;

		function update() {
			console.log(state)

			var counter = 0;
			

			for (var i = 0; i < Object.keys(data).length; i ++) {

				if (state.game == "PD") {
            		gameLevel = data[i].games[0]
            		color = "#C5AC52"

            	} else if (state.game == "Stag") {
            		gameLevel = data[i].games[1]
            		color = "#e7298a"
            	} else {
            		gameLevel = data[i].games[2]
            		color = "#994FF8"
            	}
            	var matchLevel = gameLevel.match

                var cscore = gameLevel.final_scores[0]
			    

			   if (state.color) {
			    	if (cscore < 100) {
			    	bcolor = "#feebe2"
				    } else if (cscore < 200){
				    	bcolor = "#fbb4b9"
				    } else if (cscore < 300){
				    	bcolor = "#f768a1"
				    } else if (cscore < 400){
				    	bcolor = "#c51b8a"
				    } else {
				    	bcolor = "#7a0177"
				    }

			    } else {
			    	bcolor = "#c8c8c8"
			    }
			    
			    

			    

                if ((state.strategy == data[i].strat1) && (state.strategy == data[i].strat2)) {
                	s = Snap("#svg")
      	            s.text(0,14, data[i].strat2).attr({fill:"#000"}).addClass("slabel")
      	            s.rect(0,20,width,height).attr({fill:bcolor})
		        	drawPlayer("p1", matchLevel, color)
		        	drawPlayer("p2", matchLevel, color)
 				}               	

                if ((state.strategy == data[i].strat1) && (state.strategy != data[i].strat2)) {
                	             	
            		s = Snap(arr[counter])

            		counter ++
            		s.text(0,14, data[i].strat2).attr({fill:"#000"}).addClass("slabel")
            		s.rect(0,20,width,height).attr({fill:bcolor})
	        		drawPlayer("p1", matchLevel, color)
		       		drawPlayer("p2", matchLevel, color)
                }
    		} //end of i loop


		} //end of update

		function deleteAll(){
			$(".slabel").remove()
		}
		//strategy selector
		$("li").on("click", function(){
			deleteAll()
			$("li").removeClass("selected")
			$(this).addClass("selected")
			state.strategy = $(this).attr("id")
			update()
			
		})


		
		//game selector
		$(".buttons input").on("click", function(){
			deleteAll()
			var elt = $(this)

			if(elt.has(":checked")){
				state.game = elt.attr("id")
				update()
			}
		})

		$(".switch input").on("click", function(){
				state.color = ! state.color
				$("#score").toggle()
				update()
		})




		function drawPlayer(player, beta, color) {


	        var d = (player == "p1")? 0.45:0.55
	        
	        var oldX = width*d

	        var ry = (height-20)/50
	        var rx = width/50/2

	        var oldY = height;

	        var x,y;
	    	
	    		       
	        
	      	for (var i = 0; i < 50; i++) {
	      	
	      	// var thick = map(beta[i][cscore], 0, 500, 2,20)
		        y = oldY - ry
		        
		        if (beta[i][player] == "D") {
		        x = oldX + rx
		        
		        var arc = s.path(`M${oldX + " " + oldY} Q${oldX + " " + y + " " + x + " " + y}`)
		        arc.attr({
		              fill: "none",
		              stroke: color,
		              'stroke-width': 3
		              })
		        
		        } else {
		        
		        x = oldX - rx 
		        var arc = s.path(`M${oldX + " " + oldY} Q${oldX + " " + y + " " + x + " " + y}`)
		        arc.attr({
		              fill: "none",
		              stroke: color,
		              'stroke-width': 3
		              })
		        }


		           
		        oldX = x;
		        oldY = y;
	      	} //end of for loop

	    } //end of Draw function

	    
	    update()
	    

	})//end of data



})//end of ready