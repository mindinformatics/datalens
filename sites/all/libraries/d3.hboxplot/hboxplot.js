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

d3.csv("/sites/all/themes/scf_theme/HBoxplot/hboxplot_data.csv", boxplot)

function boxplot(data){

  var h = 500,
      w = 500;

  var margin = {
    'top': 20,
    'bottom': 20,
    'left': 20,
    'right': 30
  }

  d3.select('#' + settings.id).append("svg")
    .attr("height", h)
    .attr("width", w);


  xScale = d3.scale.linear()
    .domain([0,100]) // 0% to 100%
    .range([
      margin.left,
      w - margin.right
    ]);

  yScale = d3.scale.linear()
    .domain([
      Number(d3.max(data, function(d){ return d.day })) + 1,
      Number(d3.min(data, function(d){ return d.day })) - 1
    ])
    .range([
      h - margin.bottom,
      margin.top
    ]);

  console.log(data);

  xAxis = d3.svg.axis()
    .scale(xScale)
    .orient("bottom")
    .ticks(10)
    .tickSize(-12)
    .tickSubdivide(true); // deprecated, I know

  d3.select("svg").append("g")
    .attr("transform", "translate(0,480)")
    .attr("id", "xAxisG")
    .call(xAxis);

  var days = data.map(function(d){return Number(d.day)});

  yAxis = d3.svg.axis()
    .scale(yScale)
    .orient("right")
    .tickSize(-12)
    .tickValues(days);


  d3.select("svg").append("g")
    .attr("transform", "translate(470,0)")
    .attr("id", "yAxisG")
    .call(yAxis);

  d3.select("svg").selectAll("circle.median")
    .data(data)
    .enter()
    .append("circle")
    .attr("class", "tweets")
    .attr("r", 5)
    .attr("cx", function(d) {return xScale(d.median)})
    .attr("cy", function(d) {return yScale(d.day)})
    .style("fill", "none");

  d3.select("svg").selectAll("g.box")
    .data(data)
    .enter()
    .append("g")
    .attr("class", "box")
    .attr("transform", function(d){
      return "translate(" + xScale(d.median) + "," +
        yScale(d.day) + ")"
    })
    .each(function(d,i){

      d3.select(this)
        .append("line")
        .attr("class", "range")
        .attr("x1", xScale(d.max) - xScale(d.median))
        .attr("x2", xScale(d.min) - xScale(d.median))
        .attr("y1", 0)
        .attr("y2", 0)
        .style("stroke", "black")
        .style("stroke-width", "4px");

      d3.select(this)
        .append("line")
        .attr("class", "max")
        .attr("x1", xScale(d.max) - xScale(d.median))
        .attr("x2", xScale(d.max) - xScale(d.median))
        .attr("y1", -10)
        .attr("y2", 10)
        .style("stroke", "black")
        .style("stroke-width", "4px");

      d3.select(this)
        .append("line")
        .attr("class", "min")
        .attr("x1", xScale(d.min) - xScale(d.median))
        .attr("x2", xScale(d.min) - xScale(d.median))
        .attr("y1", -10)
        .attr("y2", 10)
        .style("stroke", "black")
        .style("stroke-width", "4px");

      d3.select(this)
        .append("rect")
        .attr("class", "range")
        .attr("x", xScale(d.q1) - xScale(d.median))
        .attr("y", -10)
        .attr("height", 20)
        .attr("width", xScale(d.q3) - xScale(d.q1))
        .style("fill", "white")
        .style("stroke", "black")
        .style("stroke-width", "2px");

      d3.select(this)
        .append("line")
        .attr("x1", 0)
        .attr("x2", 0)
        .attr("y1", -10)
        .attr("y2", 10)
        .style("stroke", "darkgray")
        .style("stroke-width", "4px");

    })
}


}

})(jQuery);
