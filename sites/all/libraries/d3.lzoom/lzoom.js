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

    var apiBase = "https://portaldev.sph.umich.edu/api/v1/";
    var source = 2;
    var chr = 10;
    var end = 115058349;
    var start = 114458349;

     var gene_query = apiBase + "annotation/genes/?filter=source in " + source +
        " and chrom eq '" + chr + "'" +
        " and start le " + end +
        " and end ge " + start;

    gene_uri = encodeURI(gene_query);
    console.log(gene_uri);

    //$gene_query = apiBase + "annotation/genes/?filter=source%20in%202%20and%20chrom%20eq%20%2710%27%20and%20start%20le%20115058349%20and%20end%20ge%20114458349";

 // $intervals_query = "http://localhost:8888/sites/all/libraries/locuszoom/staticdata/intervals_10_114550452-115067678.json??filter=id%20in%2016%20and%20chromosome%20eq%20%2710%27%20and%20start%20le%20115067678%20and%20end%20ge%20114550452"

  ///annotation/intervals/

 var test = "https://portaldev.sph.umich.edu/api/v1/annotation/genes/?filter=source%20in%202%20and%20chrom%20eq%20%2710%27%20and%20start%20le%20115058349%20and%20end%20ge%20114458349";


  var xmlhttp = new XMLHttpRequest();
  var gene;

  xmlhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
        gene = JSON.parse(this.responseText);

    }
  };
  xmlhttp.open("GET", test, false);
  xmlhttp.send();


//  LocusZoom.Data.AssociationSource.prototype.getURL = function(state, chain, fields) {
//     var analysis = state.analysis || chain.header.analysis || this.params.analysis || 3;
//     return this.url;
// };

    // Define Data Sources
    apiBase = "https://portaldev.sph.umich.edu/api/v1/";
    ourAPI = "http://localhost:8888/lzoom-data?gene=APP";
    var data_sources = new LocusZoom.DataSources()

        .add("assoc", ["AssociationLZ", { url: apiBase + "statistic/single/", params: {analysis: 3, id_field: "variant"}}])
        //.add("assoc", ["AssociationLZ", { url: ourAPI, params: {analysis: 3, id_field: "variant"}}])
        .add("ld", ["LDLZ", { url: apiBase + "pair/LD/" }])
        .add("gene", ["GeneLZ", { url: apiBase + "annotation/genes/", params: {source: 2} }])
        .add("recomb", ["RecombLZ", { url: apiBase + "annotation/recomb/results/", params: {source: 15} }])
        .add("constraint", ["GeneConstraintLZ", { url: "http://exac.broadinstitute.org/api/constraint" }])
        .add("intervals", ["IntervalLZ", { url: apiBase + "annotation/intervals"}]);

        console.log(data_sources);

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
