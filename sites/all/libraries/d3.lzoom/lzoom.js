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

    var study_id = settings.study;
    var host = settings.host;
    window.module = "locuszoom";

    //console.log("I am here!");
    //console.log(study_id);

    LocusZoom.Data.AssociationSource.prototype.getURL = function(state, chain, fields) {
      var analysis = state.analysis || chain.header.analysis || this.params.analysis || 3;
      return this.url + "analysis in " + analysis  +
        " and chromosome in " + state.chr +
        " and position ge " + state.start +
        " and position le " + state.end + ".json";
   };

// https://portaldev.sph.umich.edu/api/v1/statistic/single/results/?filter=analysis in 3 and chromosome in  '10' and position ge 114550452 and position le 115067678
    // Define Data Sources
    apiBase = "https://portaldev.sph.umich.edu/api/v1/";
    ourAPI = host + "/assoc/lzoom/";
    var data_sources = new LocusZoom.DataSources()

        //.add("assoc", ["AssociationLZ", { url: apiBase + "statistic/single/", params: {analysis: 3, id_field: "variant"}}])
        .add("assoc", ["AssociationLZ", { url: ourAPI, params: {analysis: study_id, id_field: "variant"}}])
        .add("ld", ["LDLZ", { url: apiBase + "pair/LD/" }])
        .add("gene", ["GeneLZ", { url: apiBase + "annotation/genes/", params: {source: 2} }])
        .add("recomb", ["RecombLZ", { url: apiBase + "annotation/recomb/results/", params: {source: 15} }])
        .add("constraint", ["GeneConstraintLZ", { url: "http://exac.broadinstitute.org/api/constraint" }])
        .add("intervals", ["IntervalLZ", { url: "https://portaldev.sph.umich.edu/api/v1/annotation/intervals/results/",
                              params: { source: 18 }}]);

    console.log(data_sources);

    //console.log("I am here 2!");
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
    // This adds the navigation region
    layout.dashboard = LocusZoom.Layouts.get("dashboard", "region_nav_plot");

    //console.log("I am here 3!");

    // Generate the LocusZoom plot
    var plot = LocusZoom.populate("#plot", data_sources, layout);

    //console.log("I am here 4!");

  }

})(jQuery);
