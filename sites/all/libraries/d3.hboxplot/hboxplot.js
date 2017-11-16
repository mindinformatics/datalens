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

d3.csv("/sites/all/themes/scf_theme/HBoxplot/CD33.csv", boxplot)

function boxplot(data){

  data.forEach(function(d) {
            d.max = +d.max;
            d.min = +d.min;
            d.median = +d.median;
            d.row = +d.row;
          });

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
    .attr("width", 520);


  xScale = d3.scale.linear()
    //.domain([0,100]) // 0% to 100%
    .domain([d3.min(data, function(d){ return d.min }), d3.max(data, function(d){ return d.max })])
    .range([
      margin.left,
      w - margin.right
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

  var rows = data.map(function(d){return Number(d.row)});
  var brain_regions = data.map(function(d){return (d.BrainRegion)});

  yAxis = d3.svg.axis()
    .scale(yScale)
    .orient("right")
    .tickSize(-12)
    .tickValues(rows)
    .tickFormat(function(d,i) { return brain_regions[i] });


  d3.select("svg").append("g")
    .attr("transform", "translate(470,0)")
    .attr("id", "yAxisG")
    .call(yAxis);

  d3.select("svg").append("line")
    .attr("x1", xScale(1))
    .attr("x2", xScale(1))
    .attr("y1", 0)
    .attr("y2", 470)
    .style("stroke", "gray")
    .style("stroke-width", "1px");

  d3.select("svg").selectAll("circle.median")
    .data(data)
    .enter()
    .append("circle")
    .attr("class", "tweets")
    .attr("r", 5)
    .attr("cx", function(d) {return xScale(d.median)})
    .attr("cy", function(d) {return yScale(d.row)})
    .style("fill", "none");

  d3.select("svg").selectAll("g.box")
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
        .style("stroke", "black")
        .style("stroke-width", "4px");

      d3.select(this)
        .append("line")
        .attr("class", "max")
        .attr("x1", xScale(d.max) - xScale(d.median))
        .attr("x2", xScale(d.max) - xScale(d.median))
        .attr("y1", -10)
        .attr("y2", 10)
        .style("stroke", "red")
        .style("stroke-width", "4px");

      d3.select(this)
        .append("line")
        .attr("class", "min")
        .attr("x1", xScale(d.min) - xScale(d.median))
        .attr("x2", xScale(d.min) - xScale(d.median))
        .attr("y1", -10)
        .attr("y2", 10)
        .style("stroke", "orange")
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
        .style("fill", "darkgray")
        .style("stroke", "darkgray")
        .style("stroke-width", "4px");

    })
}


}

})(jQuery);
