/**
 * @file
 * Javascript for Scatterplot.
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
  Drupal.d3.scatterplot = function (select, settings) {
      var xaxis = settings.xaxis;
      var color = settings.color;
      var study = settings.study;
      var gene = settings.gene;
      var pval = settings.apoe_pvalue;

      var sformat = d3.format(".2f");

      if(!pval){
        var legendText = Array("Click box to show/hide " + color);
      } else {
        var pvalString = "ApoE ANOVA p-value: " + sformat(pval);
        var legendText = Array(pvalString, "Click box to show/hide " + color);
      }

      console.log(pval);

      console.log('gene');
      console.log(gene);


      //These arrays come in as an object; this converts them back to an array
      var series = $.map(settings.series, function(value, index) {
          return [value];
      });
      var data = $.map(settings.rows, function(value, index) {
          return [value];
      });

      console.log('series');
      console.log(series);

      //Legend doesn't work right when Apoe is numeric, but works correctly as string
      data.forEach(function(d) {
          d.ApoE = String(d.ApoE);
        });

      console.log(data);

    var svg = dimple.newSvg("#visualization", 1200, 400);
    //d3.csv("/sites/all/themes/scf_theme/Scatterplot/dclk1_data.csv", function (data) {
        // Create the chart
        var myChart = new dimple.chart(svg, data);
        myChart.setBounds(60, 30, 820, 330)

// This section can be used to add a graph title if we want one.
//         svg.append("text")
//           .attr("x", 295)
//           .attr("y", 30)
//           .attr("text-anchor", "middle")
//           .style("font-size", "16px")
//           .style("text-decoration", "underline")
//           .text(gene + " expression vs. " + xaxis);

        // Create a standard bubble for each Subject
        // Color = key in the legend


        var x = myChart.addCategoryAxis("x", [xaxis]);
        var y = myChart.addMeasureAxis("y", "Expression");
        y.title = gene;

        myChart.addSeries(series, dimple.plot.bubble);

        var avg = myChart.addSeries("Avg", dimple.plot.bar, [x, y]);
        avg.aggregate = dimple.aggregateMethod.avg;
        avg.stacked = false;
        myChart.assignColor("Avg", "#C0C0C0", "#C0C0C0", 1);

        var myLegend = myChart.addLegend(960, 100, 100, 300, "Right");
        myChart.draw();

        // This is a critical step.  By doing this we orphan the legend. This
        // means it will not respond to graph updates.  Without this the legend
        // will redraw when the chart refreshes removing the unchecked item and
        // also dropping the events we define below.
        myChart.legends = [];


        // This block simply adds the legend title. I put it into a d3 data
        // object to split it onto 2 lines.  This technique works with any
        // number of lines, it isn't dimple specific.
        svg.selectAll("title_text")
          .data(legendText)
          .enter()
          .append("text")
            .attr("x", 900)
            .attr("y", function (d, i) { return 80 + i * 14; })
            .style("font-family", "sans-serif")
            .style("font-size", "10px")
            .style("color", "Black")
            .text(function (d) { return d; });

        // Get a unique list of Color category values to use when filtering
        var filterValues = dimple.getUniqueValues(data, color);
        // Get all the rectangles from our now orphaned legend
        myLegend.shapes.selectAll("rect")
          // Add a click event to each rectangle
          .on("click", function (e) {
            // This indicates whether the item is already visible or not
            var hide = false;
            var newFilters = [];
            // If the filters contain the clicked shape hide it
            filterValues.forEach(function (f) {
              if (f === e.aggField.slice(-1)[0]) {
                hide = true;
              } else {
                newFilters.push(f);
              }
            });
            // Hide the shape or show it
            if (hide) {
              d3.select(this).style("opacity", 0.2);
            } else {
              newFilters.push(e.aggField.slice(-1)[0]);
              d3.select(this).style("opacity", 0.8);
            }
            // Update the filters
            filterValues = newFilters;
            // Filter the data
            myChart.data = dimple.filterData(data, color, filterValues);
            // Passing a duration parameter makes the chart animate. Without
            // it there is no transition
            myChart.draw(800);
          });
      //});
  }

})(jQuery);
