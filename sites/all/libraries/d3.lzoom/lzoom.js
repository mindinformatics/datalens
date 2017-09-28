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
    apiBase = "https://portaldev.sph.umich.edu/api/v1/";
    var data_sources = new LocusZoom.DataSources()
      //.add("trait", ["AssociationLZ", {url: "sites/all/libraries/locuszoom/lzoom/IGAP_stage1_selected.json?", params: {analysis: 3, id_field: "MarkerName"}} ] );
      //21:27107568-27688738
        .add("assoc", ["AssociationLZ", { url: apiBase + "statistic/single/", params: {analysis: 3, id_field: "variant"}}])
        .add("ld", ["LDLZ", { url: apiBase + "pair/LD/" }])
        .add("gene", ["GeneLZ", { url: apiBase + "annotation/genes/", params: {source: 2} }])
        .add("recomb", ["RecombLZ", { url: apiBase + "annotation/recomb/results/", params: {source: 15} }])
        .add("constraint", ["GeneConstraintLZ", { url: "http://exac.broadinstitute.org/api/constraint" }])
        //.add("intervals", ["IntervalLZ", { url: apiBase + "annotation/intervals"}]);
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
