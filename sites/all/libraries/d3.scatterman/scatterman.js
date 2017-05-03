/**
 * @file
 * Javascript for Scatterplot.
 */
(function($) {

Drupal.d3.scatterman = function (select, settings) {

var margin = {top: 20, right: 20, bottom: 50, left: 40},
    width = 1200 - margin.left - margin.right,
    height = 500 - margin.top - margin.bottom;

var x = d3.scale.linear()
    .range([0, width-400]);

var yLower = d3.scale.linear()
    .range([height, (height - height/3)]);

var yUpper = d3.scale.linear()
    .range([(height - height/3), 0]);

var color = d3.scale.ordinal().range(["#0D66FE", "#F800FE"]);

// .05
//var tickLabels = ['1','2','3','4','5','6','7','8','9','10','11','12','13','14','15','16','17','18','19','20','21','','XY', 'MT'];

var tickLabels = ['1','2','3','4','5','6','7','8','9','10','11','12','13','14','15','16','17','18','19','20','21','22'];

var xAxis = d3.svg.axis()
    .scale(x)
    // .05
    //.tickValues([149067279, 363074478, 591315308, 785709935, 978046680, 1144100478, 1313205909, 1464130770, 1623277730, 1748605215, 1892253176, 2016468450, 2151868098, 2262265200, 2367463699, 2462467876, 2533014977, 2621303898, 2693441634, 2755549660, 2816636825, 2869330135, 2887510102, 3039705353])
    .tickValues(settings.tickval)
    .tickSize(6,0)
    .tickFormat(function(d, i) {
      return tickLabels[i]})
    .orient("bottom");

var yLowerAxis = d3.svg.axis()
    .scale(yLower)
    .tickSize(-width+400, 0)
    .ticks(5)
    .orient("left");

var yUpperAxis = d3.svg.axis()
    .scale(yUpper)
    .tickSize(-width+400, 0)
    .ticks(5)
    .orient("left");

var svg = d3.select('#' + settings.id).append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");


// Lasso functions to execute while lassoing
var lasso_start = function() {
  lasso.items()
    .attr("r", function(d) { return (d.Pvalue > 6 ? 3:2); }) // reset size
    .style("fill",null) // clear all of the fills
    .classed({"not_possible":true,"selected":false}); // style as not possible
};

var lasso_draw = function() {
  // Style the possible dots
  lasso.items().filter(function(d) {return d.possible===true})
    .classed({"not_possible":false,"possible":true});

  // Style the not possible dot
  lasso.items().filter(function(d) {return d.possible===false})
    .classed({"not_possible":true,"possible":false});
};

var lasso_end = function() {
  // Reset the color of all dots
  lasso.items()
     .style("fill", function(d) { return color(d.color) });

  // Style the selected dots
  lasso.items().filter(function(d) {return d.selected===true})
    .classed({"not_possible":false,"possible":false})
    .attr("r",7);


   var genes = lasso.items().filter(function(d) {return d.selected===true})
   genes = genes[0];
   console.debug("genes");
   console.debug(genes);

   //nodeValue

   genes = genes.sort(function(x, y){
    return d3.ascending(x.cy, y.cy);
    })


 var labels = svg.selectAll(".labels")
    .data(genes);

   console.debug("labels");
   console.debug(labels);

    labels.enter().append("g")
      .attr("class", "labels")
      .attr("transform", function(d, i) { return "translate(-100," + i * 20 + ")"; });

    labels.append("text")
      .attr("x", width - 24)
      .attr("y", 9)
      .attr("dy", ".35em")
      .style("text-anchor", "end")
      .text(function(d) { return d.id; });



  // Reset the style of the not selected dots
  lasso.items().filter(function(d) {return d.selected===false})
    .classed({"not_possible":false,"possible":false})
    .attr("r", function(d) { return (d.Pvalue > 6 ? 3:2); });

};

// Create the area where the lasso event can be triggered
var lasso_area = svg.append("rect")
                      .attr("width",width)
                      .attr("height",height)
                      .style("opacity",0);

// Define the lasso
var lasso = d3.lasso()
      .closePathDistance(75) // max distance for the lasso loop to be closed
      .closePathSelect(true) // can items be selected by closing the path?
      //.hoverSelect(true) // can items by selected by hovering over them?
      .area(lasso_area) // area where the lasso can be started
      .on("start",lasso_start) // lasso start function
      .on("draw",lasso_draw) // lasso draw function
      .on("end",lasso_end); // lasso end function



// Init the lasso on the svg:g that contains the dots

d3.select("svg").call(lasso);

d3.csv(settings.input, function(error, data) {
  data.forEach(function(d) {
    d.cumulative_pos = +d.cumulative_pos;
    d.DisplayP = +d.Pvalue;
    if (d.logpval) {
      d.Pvalue = +d.logpval;
    } else {
      d.Pvalue = -(Math.log10(+d.Pvalue));
    }
  });

  //console.debug("data");
  //console.debug(data);

  x.domain(d3.extent(data, function(d) { return d.cumulative_pos; })).nice();
  //y.domain(d3.extent(data, function(d) { return d.Pvalue; })).nice();

   var x_axis = svg.append("g")
        .attr("class", "x axis axis--x")
        .attr("transform", "translate(0," + height + ")")
        .style("font-size","9px")
        .call(xAxis);

    x_axis.append("text")
      .attr("class", "label")
      .attr("x", width-750)
      .attr("y", 35)
      .style("text-anchor", "end")
      .style("font-size","12px")
      .text("Chromosome Position");


   var tip = d3.tip()
      .attr('class', 'd3-tip')
      .html(function(d) { return (d.MarkerName + ": " + d.HGNC); })
      .direction('nw')
      .offset([0, 3]);

    svg.call(tip);

    var sformat = d3.format(".1e");


    var yMax = d3.max( data, function(d) { return d.Pvalue });
    console.debug("yMax");
    console.debug(yMax);

    yLower.domain(d3.extent([2,30])).nice();

    yUpper.domain(d3.extent([30,yMax])).nice();

  var y_axis_lower = svg.append("g")
      .attr("class", "y axis axis--y ylower")
      .style("font-size","9px")
      .call(yLowerAxis);

  var y_axis_upper = svg.append("g")
      .attr("class", "y axis axis--y yupper")
      .style("font-size","9px")
      .call(yUpperAxis);

   y_axis_upper.append("text")
      .attr("class", "label")
      .attr("transform", "rotate(-90)")
      .attr("x", -120)
      .attr("y", -30)
      .attr("dy", "0.4em")
      .style("text-anchor", "end")
      .style("font-size","12px")
      .text("-log10(P-value)");


    var xMax = d3.max( data, function(d) { return d.cumulative_pos });
    console.debug("xMax");
    console.debug(xMax);

    svg.append("line")
        .attr("class", "pval")
        .style("stroke-dasharray", ("3, 3"))
        .attr('x1',x(0))
        .attr('x2',x(xMax))
        .attr('y1',yLower(8))
        .attr('y2',yLower(8));


    svg.selectAll(".dot")
        .data(data)
      .enter().append("circle")
        .attr("id",function(d) {return ( d.MarkerName + ": " + d.HGNC + ", " + sformat(d.DisplayP));})
        .attr("class", "dot")
        .attr("r", function(d) { return (d.Pvalue > 8 ? settings.bigr:settings.smallr); })
        .attr("cx", function(d) { return x(d.cumulative_pos); })
        .attr("cy", function(d) { return (d.Pvalue > 31 ? yUpper(d.Pvalue):yLower(d.Pvalue)); })
        .on('mouseover', tip.show)
        .on('mouseout', tip.hide)
        .style("fill", function(d) { return color(d.color); });


    lasso.items(d3.selectAll(".dot"));

/*
  var legend = svg.selectAll(".legend")
      .data(color.domain())
    .enter().append("g")
      .attr("class", "legend")
      .attr("transform", function(d, i) { return "translate(-290," + i * 20 + ")"; });
 */

/*
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
 */

});

}

})(jQuery);
