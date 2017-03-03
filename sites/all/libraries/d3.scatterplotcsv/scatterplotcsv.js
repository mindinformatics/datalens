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

      d3.csv("/sites/all/themes/scf_theme/Scatterplot/file.csv", function(error, data) {
        console.debug(data);
          data.forEach(function(d) {
            d.LogFC = +d.LogFC;
            d.PValue = +d.PValue;
            d.AdjPValue = +d.AdjPValue;
          });


})(jQuery);
