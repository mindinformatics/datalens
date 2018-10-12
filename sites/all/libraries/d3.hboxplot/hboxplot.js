/**
 * @file
 * Javascript for Horizontal Boxplot.
 */
(function($) {

  /**
   * Adds library to the global d3 object.
   *
   * @param select
   * @param settings
   *   Array of values passed to d3_draw.
   *   id: required. This will be needed to attach your
   *       visualization to the DOM.
   */
Drupal.d3.hboxplot = function (select, settings) {

  // Change mongo data from object to array
  var data = $.map(settings.rows, function(value, index) {
          return [value];
      });
  //console.log(settings.rows);
  //console.log(data);


  // For files: Uncomment the next 3 lines, and uncomment the closing brace for the boxplot function
  //file =  "/sites/all/themes/scf_theme/HBoxplot/" + settings.file;
  //d3.csv(file, boxplot)
//function boxplot(data){

  var rn = 1;
  data.forEach(function(d) {
            //d.PValue = +d.PValue.toPrecision(2);
            d.PValue = +d.PValue;
            d.max = +d.CIR;
            d.min = +d.CIL;
            d.median = +d.logFC;
            d.row = rn;
            rn++;
  });


  var sformat = d3.format(".1e");

  if (settings.chart_size == "multi") {
    var h = data.length * 25 + 100,
      w = 400;

    var margin = {
    'top': 20,
    'bottom': 20,
    'left': 20,
    'right': 53
    }

    var chart = d3.select('#' + settings.id).append("svg")
      .attr("height", h + 40)
      .attr("width", w + 53);

  } else {
    var h = data.length * 25 + 100,
      w = 700;

    var margin = {
    'top': 20,
    'bottom': 20,
    'left': 20,
    'right': 280
    }

    var chart = d3.select('#' + settings.id).append("svg")
      .attr("height", h + 40)
      .attr("width", w + 280);
  }




  xScale = d3.scale.linear()
    //.domain([0.2, 3]) // 0% to 100%
    .domain([d3.min(data, function(d){ return d.min }), d3.max(data, function(d){ return d.max })])
    .range([
      margin.left,
      w - 49
    ]);

  yScale = d3.scale.linear()
    .domain([
      Number(d3.max(data, function(d){ return d.row })) + 1,
      Number(d3.min(data, function(d){ return d.row })) - 1
    ])
    .range([
      h - margin.bottom,
      margin.top
    ]);

  //console.log(data);

  xAxis = d3.svg.axis()
    .scale(xScale)
    .orient("bottom")
    .ticks(5)
    .tickSize(-12)
    .tickSubdivide(true); // deprecated, I know

  var yt = h - 20;

  chart.append("g")
    .attr("transform", "translate(0," + yt + ")")
    .attr("id", "xAxisG")
    .call(xAxis);


  chart.append("text")
    .attr("text-anchor", "middle")  // this makes it easy to centre the text as the transform is applied to the anchor
    //.attr("transform", "translate("+ (width/2) +","+(height-(padding/3))+")")  // centre below axis
    .attr("transform", "translate(" + (w/2) + " ," + (h + margin.top) + ")")
    .text("Log2 Fold Change");

  var rows = data.map(function(d){return Number(d.row)});
  var p_vals = data.map(function(d){return (d.PValue) });

  if (settings.category == "BrainRegion") {
    var yLabels = data.map(function(d){return (d.BrainRegion + " (" + sformat(d.PValue)+ ")" )});
  }

  if (settings.category == "FileName") {
    var yLabels = data.map(function(d){return (d.FileName.replace(".csv", "") + " (" + sformat(d.PValue)+ ")" ) });
  }

  yAxis = d3.svg.axis()
    .scale(yScale)
    .orient("right")
    .tickSize(-12)
    .tickValues(rows)
    .tickFormat(function(d,i) { return yLabels[i] })
    //.text("fill", function(d,i) { return (p_vals[i] <= .05 ? "green" : "black")});

  var xt = w - 30;

  chart.append("g")
    .attr("transform", "translate(" + xt + ",0)")
    .attr("id", "yAxisG")
    .attr("class", "yaxis axis")
    .call(yAxis);

  chart.append("line")
    .attr("x1", xScale(1))
    .attr("x2", xScale(1))
    .attr("y1", 0)
    .attr("y2", h - 20)
    .style("stroke", "gray")
    .style("stroke-width", "1px");

  chart.selectAll(".yaxis text")  // select all the text elements for the y-axis
    .style("fill", function(d,i) { return (p_vals[i] <= .05 ? "#74c476" : "black")})
    .style("font-weight", function(d,i) { return (p_vals[i] <= .05 ? "bold" : "")});

  chart.selectAll("circle.median")
    .data(data)
    .enter()
    .append("circle")
    .attr("class", "tweets")
    .attr("r", 5)
    .attr("cx", function(d) {return xScale(d.median)})
    .attr("cy", function(d) {return yScale(d.row)})
    .style("fill", "none");

  chart.selectAll("g.box")
    .data(data)
    .enter()
    .append("g")
    .attr("class", "box")
    .attr("transform", function(d){
      return "translate(" + xScale(d.median) + "," +
        yScale(d.row) + ")"
    })
    .each(function(d,i){

      d3.select(this)
        .append("line")
        .attr("class", "range")
        .attr("x1", xScale(d.max) - xScale(d.median))
        .attr("x2", xScale(d.min) - xScale(d.median))
        .attr("y1", 0)
        .attr("y2", 0)
        .style("stroke", function(d) { return ((d.Study !="MSBB" && settings.chart_size == "multi")? "#3182bd" : "#ADCAD8")})
        .style("stroke-width", "4px");

      d3.select(this)
        .append("line")
        .attr("class", "max")
        .attr("x1", xScale(d.max) - xScale(d.median))
        .attr("x2", xScale(d.max) - xScale(d.median))
        .attr("y1", -10)
        .attr("y2", 10)
        .style("stroke", function(d) { return ((d.Study !="MSBB" && settings.chart_size == "multi")? "#3182bd" : "#ADCAD8")})
        .style("stroke-width", "4px");

      d3.select(this)
        .append("line")
        .attr("class", "min")
        .attr("x1", xScale(d.min) - xScale(d.median))
        .attr("x2", xScale(d.min) - xScale(d.median))
        .attr("y1", -10)
        .attr("y2", 10)
        .style("stroke", function(d) { return ((d.Study !="MSBB" && settings.chart_size == "multi")? "#3182bd" : "#ADCAD8")})
        .style("stroke-width", "4px");

    /*  d3.select(this)
        .append("rect")
        .attr("class", "range")
        .attr("x", xScale(d.q1) - xScale(d.median))
        .attr("y", -10)
        .attr("height", 20)
        .attr("width", xScale(d.q3) - xScale(d.q1))
        .style("fill", "white")
        .style("stroke", "blue")
        .style("stroke-width", "2px"); */

      d3.select(this)
        .append("rect")
        .attr("x", 0)
        .attr("y", -5)
        .attr("height", 10)
        .attr("width", 10)
        .style("fill", function(d) { return ((d.Study !="MSBB" && settings.chart_size == "multi") ? "#3182bd" : "#ADCAD8")})
        .style("stroke", function(d) { return ((d.Study !="MSBB" && settings.chart_size == "multi")? "#3182bd" : "#ADCAD8")})
        .style("stroke-width", "4px");

    })
// }

}

})(jQuery);
