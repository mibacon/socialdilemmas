 var margin = { top: 110, right: 0, bottom: 20, left: 275 },
          width = 960 - margin.left - margin.right,
          height = 600 - margin.top - margin.bottom,
          gridSize = Math.floor(height / 11),
          legendElementWidth = gridSize*1.66,
          buckets = 5,
          colors = ['#feebe2','#fcc5c0','#fa9fb5','#f768a1','#c51b8a','#7a0177'], // alternatively colorbrewer.YlGnBu[9]
          strats = ['Adaptive Pavlov ',
'Grumpy',
'Grudger',
'Tit For Tat',
'Win-Stay Lose-Shift',
'Cooperator',
'Stochastic Cooperator',
'Bully',
'CollectiveStrategy',
'Defector'
],
          strats2 = ['Adaptive Pavlov ',
'Grumpy',
'Grudger',
'Tit For Tat',
'Win-Stay Lose-Shift',
'Cooperator',
'Stochastic Cooperator',
'Bully',
'CollectiveStrategy',
'Defector'];
          datasets = ["PD.tsv", "Stag.tsv", "Chicken.tsv"],
          datasets2 = ["PDAvg.tsv", "StagAvg.tsv", "ChickenAvg.tsv"]


     var div = d3.select("body").append("div")
          .attr("class", "tooltip")
          .style("opacity", 0)
          // .attr("width", 300)
          // .attr("height", 200);
    
      var svg = d3.select("#chart").append("svg")
          .attr("width", width + margin.left + margin.right)
          .attr("height", height + margin.top + margin.bottom)

          .append("g")
          .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

     
      
      var yLabels = svg.selectAll(".yLabel")
          .data(strats)
          .enter().append("text")
            .text(function (d) { return d; })
            .attr("x", 0)
            .attr("y", (d, i) => i * gridSize)
            .style("text-anchor", "end")
            .attr("transform", "translate(-6," + gridSize / 1.5 + ")")
            .attr("class", "yLabel mono");

      var xLabels = svg.selectAll(".xLabel")
          .data(strats2)
          .enter().append("text")
            .text((d) => d)
            // .attr("x", (d, i) => i * gridSize)
            .attr("y", 0)
            .style("text-anchor", "start")
            // .attr("transform", "translate(" + gridSize / 2 + ", -6)")
            .attr("dx", "-.8em")
            .attr("dy", ".15em")
            .style("transform", function(d, i){
              return "translate(" + ((i * gridSize)+ 25)+ "px, -24px) rotate(-65deg)"})
            .attr("class", "xLabel mono")
            ;
      

      var avgLabel = svg.append("text")
          .text('Average')
          .attr("x", 500)
          .attr("y", 0)
          .style("text-anchor", "start")
          .style("transform", "translate(315px, 450px) rotate(-65deg)")
                .attr("class", "mono");
          

      var heatmapChart = function(tsvFile) {
        d3.tsv(tsvFile, (error, data) => {
          // var colorScale = d3.scaleLinear()
          //   .domain([0, d3.max(data, (d) => d.value)])
          //   .range(colors);
          var colorScale = d3.scaleThreshold()
              .domain([0,20, 40, 60, 80, 95])
              .range([0].concat(colors));

          var cards = svg.selectAll(".strat2")
              .data(data, (d) => d.strat1+':'+d.strat2);

          cards.append("title");

          cards.enter().append("rect")
              .attr("x", (d) => (d.strat2 - 1) * gridSize)
              .attr("y", (d) => (d.strat1 - 1) * gridSize)
              .attr("class", "bordered")
              .attr("width", gridSize)
              .attr("height", gridSize)
              .style("fill", (d) => colorScale(d.value))
              .on("mouseover", function(d) {
                 div.transition()
                   .duration(200)
                   .style("opacity", .8);
                 div.html(d.value + "%")
                    .style("left", (d3.event.pageX) + "px")
                    .style("top", (d3.event.pageY) + "px")
                    .style('display', 'block');
                 })
               .on("mouseout", function(d) {
                 div.transition()
                   .duration(500)
                   .style("opacity", 0);
                 });
            

          // cards.select("title").text((d) => d.value);

          cards.exit().remove();

          var legend = svg.selectAll(".legend")
              // .data([0].concat(colorScale.quantiles()), (d) => d);
              .data(colorScale.domain(), (d)=> d)

          var legend_g = legend.enter().append("g")
              .attr("class", "legend");

          legend_g.append("rect")
            .attr("x", (d, i) => legendElementWidth * i)
            .attr("y", height-25)
            .attr("width", legendElementWidth)
            .attr("height", gridSize / 2)
            .style("fill", (d, i) => colors[i]);

          legend_g.append("text")
            .attr("class", "mono")
            .text((d) => "≥ " + Math.round(d))
            .attr("x", (d, i) => legendElementWidth * i)
            .attr("y", height-25 + gridSize);

          legend.exit().remove();
        });
      };
      
      
       var avgChart = function(tsvFile) {
        d3.tsv(tsvFile, (error, data) => {
          var colorScale = d3.scaleThreshold()
              .domain([0,20, 40, 60, 80, 95])
              .range([0].concat(colors));

          var cards2 = svg.selectAll(".strat")
              .data(data, (d) => d.Strat);

          cards2.enter().append("rect")
              .attr("x", 500)
              .attr("y", (d) => (d.Strat-1) * gridSize)
              .attr("class", "bordered")
              .attr("width", gridSize)
              .attr("height", gridSize)
              .style("fill", (d) => colorScale(d.rate))
              .on("mouseover", function(d) {
                 div.transition()
                   .duration(200)
                   .style("opacity", .8);
                 div.html(d.rate + "%")
                    .style("left", (d3.event.pageX) + "px")
                    .style("top", (d3.event.pageY) + "px")
                    .style('display', 'block');
                 })
               .on("mouseout", function(d) {
                 div.transition()
                   .duration(500)
                   .style("opacity", 0);
                 });
            

          cards2.exit().remove();
        })
       }

      heatmapChart(datasets[1]);
      avgChart(datasets2[0])
      
      

      var datasetpicker = d3.select("#dataset-picker")
        .selectAll(".dataset-button")
        .data(datasets);
        
      datasetpicker.enter()
        .append("input")
        .attr("id", (d) => d.replace(/\.[^/.]+$/, ""))
        .attr("type", "button")
        .attr("class", "dataset-button")
        // .on("click", (d) =>  avgChart(d));
        .on("click", (d) => heatmapChart(d));
