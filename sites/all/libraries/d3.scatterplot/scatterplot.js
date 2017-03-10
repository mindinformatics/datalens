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

      console.log('gene');
      console.log(gene);

      //TODO: Change APOE to string, not number?
      //Buckets for Age at Death?

      //These arrays come in as an object; this converts them back to an array
      var series = $.map(settings.series, function(value, index) {
          return [value];
      });
      var data = $.map(settings.rows, function(value, index) {
          return [value];
      });
      console.log(data);

      data.forEach(function(d) {
          d.Apoe = String(d.Apoe);
        });


    var svg = dimple.newSvg("#visualization", 590, 400);
    //d3.csv("/sites/all/themes/scf_theme/Scatterplot/dclk1_data.csv", function (data) {
        // Create the chart
        var myChart = new dimple.chart(svg, data);
        myChart.setBounds(60, 30, 420, 330)

        // Create a standard bubble for each Subject
        // Color = key in the legend
        myChart.addCategoryAxis("x", [xaxis]);
        myChart.addMeasureAxis("y", "Expression");
        //myAxis.title = "My Awesome New Title";
        myChart.addSeries(series, dimple.plot.bubble);
        var myLegend = myChart.addLegend(530, 100, 60, 300, "Right");
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
          .data(["Click box to show/hide", color, " "])
          .enter()
          .append("text")
            .attr("x", 499)
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
