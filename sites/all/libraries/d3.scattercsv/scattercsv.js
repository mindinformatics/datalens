/**
 * @file
 * Javascript for Scatterplot.
 */
(function($) {

Drupal.d3.scattercsv = function (select, settings) {

var margin = {top: 20, right: 20, bottom: 30, left: 40},
    width = 960 - margin.left - margin.right,
    height = 500 - margin.top - margin.bottom;

var x = d3.scale.linear()
    .range([0, width]);

var y = d3.scale.linear()
    .range([height, 0]);

var color = d3.scale.category10();

var xAxis = d3.svg.axis()
    .scale(x)
    .orient("bottom");

var yAxis = d3.svg.axis()
    .scale(y)
    .orient("left");

var real_fc  = function(x){ return (x>0 ? Math.pow(2,x) : -1/Math.pow(2,x)) };

var svg = d3.select('#' + settings.id).append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

d3.csv("/sites/all/libraries/d3.scattercsv/MSBB_HIPP_Braak_CERAD.csv", function(error, data) {
  if (error) throw error;

  data.forEach(function(d) {
    d.logFC = real_fc(+d.logFC);
    d.logFC1 = real_fc(+d.logFC1) ;
  });

  x.domain(d3.extent(data, function(d) { return d.logFC; })).nice();
  y.domain(d3.extent(data, function(d) { return d.logFC1; })).nice();


  svg.append("g")
      .attr("class", "x axis")
      .attr("transform", "translate(0," + height + ")")
      .call(xAxis)
    .append("text")
      .attr("class", "label")
      .attr("x", width)
      .attr("y", -6)
      .style("text-anchor", "end")
      .text("Sepal Width (cm)");

  svg.append("g")
      .attr("class", "y axis")
      .call(yAxis)
    .append("text")
      .attr("class", "label")
      .attr("transform", "rotate(-90)")
      .attr("y", 6)
      .attr("dy", ".71em")
      .style("text-anchor", "end")
      .text("Sepal Length (cm)")


  svg.selectAll(".dot")
      .data(data)
    .enter().append("circle")
      .attr("class", "dot")
      .attr("r", 1)
      .attr("cx", function(d) { return x(d.logFC); })
      .attr("cy", function(d) { return y(d.logFC1); })
      .style("fill", function(d) { return color(d.PValue); });

  var legend = svg.selectAll(".legend")
      .data(color.domain())
    .enter().append("g")
      .attr("class", "legend")
      .attr("transform", function(d, i) { return "translate(0," + i * 20 + ")"; });

  legend.append("rect")
      .attr("x", width - 18)
      .attr("width", 18)
      .attr("height", 18)
      .style("fill", color);


  legend.append("text")
      .attr("x", width - 24)
      .attr("y", 9)
      .attr("dy", ".35em")
      .style("text-anchor", "end")
      .text(function(d) { return d; });
      console.log("here");

});

}
})(jQuery);
