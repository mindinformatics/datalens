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
  Drupal.d3.lzoom = function (select, settings) {

      window.module = "locuszoom";

     console.log("I am here!");
    // Define Data Sources
    var data_sources = new LocusZoom.DataSources()
      //.add("trait", ["AssociationLZ", {url: "sites/all/libraries/locuszoom/lzoom/IGAP_stage1_selected.json?", params: {analysis: 3, id_field: "MarkerName"}} ] );
      .add("assoc", ["AssociationLZ", {url: "sites/all/libraries/locuszoom/staticdata/assoc_10_114550452-115067678.json?", params: {analysis: 3, id_field: "variant"} } ] )
      .add("ld", ["LDLZ", {url: "sites/all/libraries/locuszoom/staticdata/ld_10_114550452-115067678.json?"}])
      .add("gene", ["GeneLZ", { url: "sites/all/libraries/locuszoom/staticdata/genes_10_114550452-115067678.json?"}])
      .add("recomb", ["RecombLZ", { url: "sites/all/libraries/locuszoom/staticdata/recomb_10_114550452-115067678.json?" }])
      .add("constraint", ["GeneConstraintLZ", { url: "sites/all/libraries/locuszoom/staticdata/constraint_10_114550452-115067678.json?" }])
      .add("intervals", ["IntervalLZ", { url: "sites/all/libraries/locuszoom/staticdata/intervals_10_114550452-115067678.json?"}]);

    console.log("I am here 2!");
    // Get the standard assocation plot layout from LocusZoom's built-in layouts
    var mods = {
      namespace: {
        default: "assoc",
        ld: "ld",
        gene: "gene",
        recomb: "recomb",
        intervals: "intervals"
      }
    };
    layout = LocusZoom.Layouts.get("plot", "interval_association", mods);

    console.log("I am here 3!");

    // Generate the LocusZoom plot
    var plot = LocusZoom.populate("#plot", data_sources, layout);

    console.log("I am here 4!");

  }

})(jQuery);
