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
  Drupal.d3.scatterplotcsv = function (select, settings) {
      //rows = settings.rows;
      //console.debug(rows);

      //Data: AMP-AD_MSBB_APOE_Tau.csv: Geneid,Chr,Start,End,Strand,Length,geneSymbol,hB_RNA_1111
      //Clinical: MSBB_clinical.csv: individualIdentifier,PMI,RACE,AOD,CDR,SEX,NP.1,PlaqueMean,bbscore
      //MSBB_SampleIDs.csv: SampleID, SubjectID, BrainRegion

      //<script src="/lib/d3.v4.3.0.js"></script>
      //<script src="http://dimplejs.org/dist/dimple.v2.3.0.min.js"></script>
    //var svg = dimple.newSvg("#chartContainer", 590, 400);
    var svg = dimple.newSvg("#visualization", 590, 400);
      d3.csv("/sites/all/themes/scf_theme/Scatterplot/dclk1_data.csv", function (data) {
        // Create the chart
        var myChart = new dimple.chart(svg, data);
        myChart.setBounds(60, 30, 420, 330)

        // Create a standard bubble of SKUs by Price and Sales Value
        // We are coloring by Owner as that will be the key in the legend
        //myChart.addMeasureAxis("x", "AgeAtDeath");
        myChart.addCategoryAxis("x", ["Diagnosis"]);
        myChart.addMeasureAxis("y", "DCLK1");
        myChart.addSeries(["Sex", "AgeAtDeath", "ApoE"], dimple.plot.bubble);
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
          .data(["Click box to","show/hide ApoE:"," "])
          .enter()
          .append("text")
            .attr("x", 499)
            .attr("y", function (d, i) { return 80 + i * 14; })
            .style("font-family", "sans-serif")
            .style("font-size", "10px")
            .style("color", "Black")
            .text(function (d) { return d; });

        // Get a unique list of Owner values to use when filtering
        var filterValues = dimple.getUniqueValues(data, "ApoE");
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
            myChart.data = dimple.filterData(data, "ApoE", filterValues);
            // Passing a duration parameter makes the chart animate. Without
            // it there is no transition
            myChart.draw(800);
          });
      });
  }

})(jQuery);
