"use strict";

var plot_base_max_limit = 3000000;
var plot_base_min_limit = 20000;

var share_url_button_timeout = null;
var flashCopied = function(){
    d3.select("#share_url_button").text("Copied!");
    d3.select("#share_url_input").style({"background-color": "#B8F2D0"})
        .transition().duration(2000).style({"background-color": "#EAEAEA"});
    share_url_button_timeout = setTimeout(function(){
        d3.select("#share_url_button").text("Copy URL");
    }, 2000);
};

var toggle_expandable = function(base_id, toggle){
    if (typeof base_id != "string"){ return; }
    if (typeof toggle == "undefined"){
        var toggle = Boolean(d3.select("#" + base_id).style("display") == "none");
    } else {
        toggle = Boolean(toggle);
    }
    d3.select("#" + base_id).style({"display": (toggle ? null: "none")});
    d3.select("#" + base_id + "_caret").classed("fa-chevron-up", toggle).classed("fa-chevron-down", !toggle);
};

// **************************************************************
// Pull the list of supported GWAS studies from the UMich/CSG API
var studies = {};
var studies_array = [];
var pubmed_id_list = "";
var study_ids_by_pmid = {};
var study_ids_by_pmid_list_idx = [];
LocusZoom.createCORSPromise("GET", "https://portaldev.sph.umich.edu/api/v1/single/?format=objects")
    .then(function(response){
        try {
            // Parse response to build an object of all available studies and their data
            var data = JSON.parse(response).data;
            data.forEach(function(d, i){
                if (!parseInt(d.id)){ return; }
                d.on_plot = false;
                d.citation_sort = d.date + "_" + d.first_author
                d.etc = "<span class='etc_label'>Build:</span> " + d.build
                      + (d.imputed ? "<br><span class='etc_label'>Imputed:</span> " + d.imputed : "")
                      + (d.tech ? "<br><span class='etc_label'>Tech:</span> " + d.tech : "");
                studies[d.id] = d;
                studies[d.id].array_idx = studies_array.push(d) - 1;
            });
        } catch (e){
            console.error("Unable to load studies: ", e);
            d3.select("#add_gwas_loading").text("Unable to load studies: " + e);
            return Q.reject(e);
        }
        return Q.defer();
    })

    // Request study data from the PubMed APIs
    .then(function(){
        var pubmed_list_idx = 0;
        for (var study in studies){
            if (!studies.hasOwnProperty(study)){ continue; }
            if (studies[study].pmid){
                pubmed_id_list += (pubmed_id_list.length ? "," : "") + studies[study].pmid;
                study_ids_by_pmid[studies[study].pmid] = study;
                study_ids_by_pmid_list_idx[pubmed_list_idx] = study;
                pubmed_list_idx++;
            }
        }
        if (!pubmed_id_list){ return Q.defer(); }

        // Fire off an independent request for study abstracts (takes a while, can be deferred)
        LocusZoom.createCORSPromise("GET", "https://eutils.ncbi.nlm.nih.gov/entrez/eutils/efetch.fcgi?db=pubmed&retmode=text&rettype=abstract&id=" + pubmed_id_list)
        .then(function(response){
            try {
                var abstract_response = response.trim().split("\n\n\n");
                abstract_response.forEach(function(d, i){
                    var id = study_ids_by_pmid_list_idx[i];
                    studies[id].abstract = d.replace(/\n/g,"<br>");
                    // Apply the abtract to descriptions of any panels already added to the plot
                    if (typeof plot.panels["study_" + id] != "undefined"){
                        plot.panels["study_" + id].layout.dashboard.components[3].menu_html = "<h3 style=\"margin-top: 0px;\">" + studies[id].analysis + "</h3>" + studies[id].abstract;
                    }
                });
            } catch (e){
                Q.reject("Error parsing PubMed abstract API response: " + e);
            }
        });

        // Fire off a request for study details, keep display of results dependent on this request returning
        return LocusZoom.createCORSPromise("GET", "https://eutils.ncbi.nlm.nih.gov/entrez/eutils/esummary.fcgi?db=pubmed&retmode=json&rettype=abstract&id=" + pubmed_id_list);

    })

    // Parse study data from PubMed APIs and show results
    .then(function(response){

        // Parse the summary response
        try {
          var summary_response = JSON.parse(response).result;
          var keys = ["pubdate", "epubdate", "source", "authors", "fulljournalname", "elocationid"];
          summary_response.uids.forEach(function(uid){
              keys.forEach(function(key){
                  studies[study_ids_by_pmid[uid]][key] = summary_response[uid][key]
              });
          });
          return Q.defer();
        } catch (e){
          Q.reject("Error parsing PubMed summary API response: " + e);
        }

    })

    // All data now loaded - set up stream table for adding GWAS to plot
    .then(function() {

        // Remove the loading indicator
        d3.select("#add_gwas_loading").remove();
        d3.select("#add_gwas_title_total").html("<small>("+Object.keys(studies).length+")</small>");
        toggle_expandable("add_gwas", true);

        var html = $.trim($("#gwas_row_template").html()), template = Mustache.compile(html);
        var view = function(record){
            return template({record: record});
        };

        var $found = $('#gwas_found');
        $('#found').text(studies_array.length + " total studies");

        var callbacks = {
            pagination: function(summary){
                if ($.trim($('#gwas_search').val()).length > 0){
                    $found.text(summary.total + " matching studies");
                } else {
                    $found.text(studies_array.length + " total studies");
                }
            }
        }

        var options = {
            view: view,
            search_box: '#gwas_search',
            per_page: 10,
            callbacks: callbacks,
            auto_sorting: true,
            pagination: {
                container: '#add_gwas_pagination',
                span: 5,
                next_text: 'Next &gt;',
                prev_text: '&lt; Previous',
                per_page_select: "#gwas_per_page",
                per_page: 10
            },
            fields: ["study"]
        }

        $('#gwas_stream_table').stream_table(options, studies_array);
        return Q.defer();

    })

    // Add studies to the plot from URL, if applicable
    .then(function(){
        if (getURLVariable("p")){
            try {
                var setup = JSON.parse(LZString.decompressFromEncodedURIComponent(getURLVariable("p")));
                var match;
                setup.panel_ids.forEach(function(panel_id){
                    if (match = panel_id.match(/^study_(\d+)$/)){
                        addStudy(match[1]);
                    }
                });
                plot.applyState(setup.state);
            } catch (e){
                console.error("Unable to parse URL plot setup: ", e);
            }
        }
    });

// *******************************************************************
// Pull the list of supported annotation tracks from the UMich/CSG API
var tracks = {};
var tracks_array = [];
var track_ids_by_pmid = {};
var track_ids_by_pmid_list_idx = [];
LocusZoom.createCORSPromise("GET", "https://portaldev.sph.umich.edu/api/v1/annotation/intervals/?format=objects")
    .then(function(response){
        try {
            // Parse response to build an object of all available tracks and their data
            var data = JSON.parse(response).data;
            data.forEach(function(d, i){
                if (!parseInt(d.id)){ return; }
                d.on_plot = false;
                d.etc = "<span class='etc_label'>Build</span>: " + d.build
                      + (d.assay ? "<br><span class='etc_label'>Assay</span>: " + d.assay : "")
                      + (d.cell_line ? "<br><span class='etc_label'>Cell Line</span>: " + d.cell_line : "")
                      + (d.tissue ? "<br><span class='etc_label'>Tissue</span>: " + d.tissue.replace("_"," ") : "");
                tracks[d.id] = d;
                tracks[d.id].array_idx = tracks_array.push(d) - 1;
            });
        } catch (e){
            console.error("Unable to load tracks: ", e);
            d3.select("#add_annotations_loading").text("Unable to load tracks: " + e);
            return Q.reject(e);
        }
        return Q.defer();
    })

    // Request track data from the PubMed APIs
    .then(function(){
        var pubmed_list_idx = 0;
        for (var track in tracks){
            if (!tracks.hasOwnProperty(track)){ continue; }
            if (tracks[track].pmid){
                pubmed_id_list += (pubmed_id_list.length ? "," : "") + tracks[track].pmid;
                track_ids_by_pmid[tracks[track].pmid] = track;
                track_ids_by_pmid_list_idx[pubmed_list_idx] = track;
                pubmed_list_idx++;
            }
        }
        if (!pubmed_id_list){ return Q.defer(); }

        // Fire off an independent request for track abstracts (takes a while, can be deferred)
        LocusZoom.createCORSPromise("GET", "https://eutils.ncbi.nlm.nih.gov/entrez/eutils/efetch.fcgi?db=pubmed&retmode=text&rettype=abstract&id=" + pubmed_id_list)
        .then(function(response){
            try {
                var abstract_response = response.trim().split("\n\n\n");
                abstract_response.forEach(function(d, i){
                    var id = track_ids_by_pmid_list_idx[i];
                    tracks[id].abstract = d.replace(/\n/g,"<br>");
                    // Apply the abtract to descriptions of any panels already added to the plot
                    if (typeof plot.panels["track_" + id] != "undefined"){
                        plot.panels["track_" + id].layout.dashboard.components[3].menu_html = "<h3 style=\"margin-top: 0px;\">" + tracks[id].analysis + "</h3>" + tracks[id].abstract;
                    }
                });
            } catch (e){
                Q.reject("Error parsing PubMed abstract API response: " + e);
            }
        });

        // Fire off a request for track details, keep display of results dependent on this request returning
        return LocusZoom.createCORSPromise("GET", "https://eutils.ncbi.nlm.nih.gov/entrez/eutils/esummary.fcgi?db=pubmed&retmode=json&rettype=abstract&id=" + pubmed_id_list);

    })

    // Parse track data from PubMed APIs and show results
    .then(function(response){

        // Parse the summary response
        try {
          var summary_response = JSON.parse(response).result;
          var keys = ["pubdate", "epubdate", "source", "authors", "fulljournalname", "elocationid"];
          summary_response.uids.forEach(function(uid){
              keys.forEach(function(key){
                  tracks[track_ids_by_pmid[uid]][key] = summary_response[uid][key]
              });
          });
          return Q.defer();
        } catch (e){
          Q.reject("Error parsing PubMed summary API response: " + e);
        }

    })

    // All data now loaded - set up stream table for adding tracks to plot
    .then(function() {

        // Remove the loading indicator
        d3.select("#add_annotations_loading").remove();
        d3.select("#add_annotations_title_total").html("<small>("+Object.keys(tracks).length+")</small>");
        //toggle_expandable("add_annotations", true);

        var html = $.trim($("#annotations_row_template").html()), template = Mustache.compile(html);
        var view = function(record){
            return template({record: record});
        };

        var $found = $('#annotations_found');
        $('#found').text(tracks_array.length + " total tracks");

        var callbacks = {
            pagination: function(summary){
                if ($.trim($('#annotations_search').val()).length > 0){
                    $found.text(summary.total + " matching tracks");
                } else {
                    $found.text(tracks_array.length + " total tracks");
                }
            }
        }

        var options = {
            view: view,
            search_box: '#annotations_search',
            per_page: 10,
            callbacks: callbacks,
            auto_sorting: true,
            pagination: {
                container: '#add_annotations_pagination',
                span: 5,
                next_text: 'Next &gt;',
                prev_text: '&lt; Previous',
                per_page_select: "#annotations_per_page",
                per_page: 10
            }
        }

        $('#annotations_stream_table').stream_table(options, tracks_array);
        return Q.defer();

    })

    // Add tracks to the plot from URL, if applicable
    .then(function(){
        if (getURLVariable("p")){
            try {
                var setup = JSON.parse(LZString.decompressFromEncodedURIComponent(getURLVariable("p")));
                var match;
                setup.panel_ids.forEach(function(panel_id){
                    if (match = panel_id.match(/^track_(\d+)$/)){
                        addTrack(match[1]);
                    }
                });
                plot.applyState(setup.state);
            } catch (e){
                console.error("Unable to parse URL plot setup: ", e);
            }
        }
    });

// *************************

// Data Sources - APIs LocusZoom will connect to for various pieces of data
var data_sources = new LocusZoom.DataSources()
  .add("gene", ["GeneLZ", { url: "https://portaldev.sph.umich.edu/api/v1/annotation/genes/", params: { source: 2 } }])
  .add("constraint", ["GeneConstraintLZ", { url: "http://exac.broadinstitute.org/api/constraint" }])
  .add("ld", ["LDLZ", "https://portaldev.sph.umich.edu/api/v1/pair/LD/"])
  .add("recomb", ["RecombLZ", { url: "https://portaldev.sph.umich.edu/api/v1/annotation/recomb/results/", params: {source: 15} }])
  .add("sig", ["StaticJSON", [{ "x": 0, "y": 7.30103 }, { "x": 2881033286, "y": 7.30103 }] ]);

// Layout - the description of the plot and how data is presented. We start with only the genes panel.
var initial_layout = {
  responsive_resize: true,
  min_region_scale: plot_base_min_limit,
  max_region_scale: plot_base_max_limit,
  aspect_ratio: 4,
  dashboard: LocusZoom.Layouts.get("dashboard", "region_nav_plot"),
  panels: [
    LocusZoom.Layouts.get("panel","genes")
  ]
};
initial_layout.panels[0].dashboard.components.splice(0,1);
initial_layout.panels[0].dashboard.components[0].group_position = "end";

// Create the LocusZoom plot
var plot = LocusZoom.populate("#lzplot", data_sources, initial_layout);
plot.panels.genes.curtain.show("Loading Genes...", { "text-align": "center" });
plot.panels.genes.addBasicLoader();
plot.panels.genes.on("data_rendered", function(){ this.curtain.hide(); });

// Whenever the plot is updated make sure the value in the "Navigate to Region" input is correct
plot.on("layout_changed", function(){
    document.getElementById("input_region").value = plot.state.chr + ":" + plot.state.start + "-" + plot.state.end;
    document.getElementById("share_url_input").value = getPlotURL();
});

// This function will add a data source for an study (by numeric ID)
// and add a panel to the LocusZoom plot to display it
function addStudy(id){
    id = id || document.getElementById("add_study").value;
    if (typeof studies[id] != "object"){ return; }
    // If the beginning message is showing (and the main plot hidden) then show the main plot
    if ($("#beginning_message").is(":visible")){
        $("#beginning_message").hide();
        $("#main_row").show();
        toggle_expandable("add_gwas", false);
    }
    // Check that the study is not already loaded in the plot
    var namespace = "study_" + id;
    if (plot.panels[namespace]){ return; }
    // Adjust row templates
    studies[id].on_plot = true;
    studies_array[studies[id].array_idx].on_plot = true;
    $("#add_study_button_"+id).removeClass("button-green").addClass("button-yellow").prop("disabled", true).html("Added");
    // Add the data source
    var assoc_source = [ "AssociationLZ",
                         { url: "https://portaldev.sph.umich.edu/api/v1/single/",
                           params: {
                               analysis: id,
                               id_field: "variant"
                           }
                         }
                       ];
    data_sources.add(namespace, assoc_source);

    // Define the new panel's layout
    var mods = {
        namespace: { "default": namespace, "assoc": namespace, ld: "ld" },
        id: namespace,
        title: { text: studies[id].first_author + " " + studies[id].date + " - " + studies[id].analysis },
        y_index: -1,
    };
    var layout = LocusZoom.Layouts.get("panel", "association", mods);
    layout.dashboard.components.push({ type: "menu", color: "yellow", position: "right", "button_html": "Abstract", "menu_html": "<h3 style=\"margin-top: 0px;\">" + studies[id].analysis + "</h3>" + (studies[id].abstract || "<i>Requesting abstract from PubMed...</i>") });

    // Add the panel and set up event handlers
    var panel = plot.addPanel(layout).addBasicLoader();
    panel.curtain.show("Loading Study...", { "text-align": "center" });
    panel.on("data_rendered", function(){
        this.curtain.hide();
        this.legend.render();
    });
    plot.on("layout_changed", function(){
        if (typeof this.panels["study_"+id] == "undefined" && studies[id].on_plot){
            studies[id].on_plot = false;
            studies_array[studies[id].array_idx].on_plot = false;
            $("#add_study_button_"+id).removeClass("button-yellow").addClass("button-green").prop("disabled", false).html("+ Add to plot");
            $("#gwas_loci_"+id).remove();
        }
    });
    plot.rescaleSVG();
    // Get the GWAS loci for the study
    getGWASLoci(studies[id]);
    // Track the action of adding this study in piwik
    _paq.push(['trackEvent', 'LocusZoom.js - Our Data', 'Added Study', studies[id].analysis]);
}

// Add an annotation track data source and panel (by numeric ID)
function addTrack(id){
    id = id || document.getElementById("add_track").value;
    if (typeof tracks[id] != "object"){ return; }
    // If the beginning message is showing (and the main plot hidden) then show the main plot
    if ($("#beginning_message").is(":visible")){
        $("#beginning_message").hide();
        $("#main_row").show();
        toggle_expandable("add_annotations", false);
    }
    // Check that the track is not already loaded in the plot
    var namespace = "track_" + id;
    if (plot.panels[namespace]){ return; }
    // Adjust row templates
    tracks[id].on_plot = true;
    tracks_array[tracks[id].array_idx].on_plot = true;
    $("#add_track_button_"+id).removeClass("button-green").addClass("button-yellow").prop("disabled", true).html("Added");
    // Add the data source
    var interval_source = [ "IntervalLZ",
                            { url: "https://portaldev.sph.umich.edu/api/v1/annotation/intervals/results/",
                              params: { source: id }
                            }
                          ];
    data_sources.add(namespace, interval_source);

    // Define the new panel's layout
    var mods = {
        namespace: { intervals: namespace },
        id: namespace,
        y_index: -1
    };
    var layout = LocusZoom.Layouts.get("panel", "intervals", mods);
    layout.data_layers[0].split_tracks = true;
    layout.data_layers[0].always_hide_legend = true;
    var track_info_html = "<h4 style=\"margin-top: 0px;\">" + tracks[id].description + "</h4>" + tracks[id].etc;
    layout.dashboard.components.push({ type: "menu", color: "yellow", position: "right",
                                       button_html: "Track Info", menu_html: track_info_html });

    // Add the panel and set up event handlers
    var panel = plot.addPanel(layout).addBasicLoader();
    panel.curtain.show("Loading Track...", { "text-align": "center" });
    panel.on("data_rendered", function(){
        this.curtain.hide();
    });
    plot.on("layout_changed", function(){
        if (typeof this.panels["track_"+id] == "undefined" && tracks[id].on_plot){
            tracks[id].on_plot = false;
            tracks_array[tracks[id].array_idx].on_plot = false;
            $("#add_track_button_"+id).removeClass("button-yellow").addClass("button-green").prop("disabled", false).html("+ Add to plot");
        }
    });
    plot.rescaleSVG();
    // Track the action of adding this track in piwik
    _paq.push(['trackEvent', 'LocusZoom.js - Our Data', 'Added Track', tracks[id].analysis]);
}

var default_gwas_loci_response = {"response":{"docs":[{"rsId":["rs560887"],"reportedGene":["G6PC2"],"chromosomeName":["2","CHR_HSCHR2_1_CTG7_2"],"chromosomePosition":[168906638,168923627]},{"rsId":["rs10830963"],"reportedGene":["MTNR1B"],"chromosomeName":["11"],"chromosomePosition":[92975544]},{"rsId":["rs4607517"],"reportedGene":["GCK"],"chromosomeName":["7"],"chromosomePosition":[44196069]},{"rsId":["rs9552416"],"reportedGene":["TUBA3C"],"chromosomeName":["13","CHR_HSCHR13_1_CTG3"],"chromosomePosition":[18737101]},{"rsId":["rs780094"],"reportedGene":["GCKR"],"chromosomeName":["2"],"chromosomePosition":[27518370]},{"rsId":["rs2191349"],"reportedGene":["DGKB"],"chromosomeName":["7"],"chromosomePosition":[15024684]},{"rsId":["rs11558471"],"reportedGene":["SLC30A8"],"chromosomeName":["8"],"chromosomePosition":[117173494]},{"rsId":["rs7607980"],"reportedGene":["GRB14","COBLL1"],"chromosomeName":["2"],"chromosomePosition":[164694691]},{"rsId":["rs3736594"],"reportedGene":["MRPL33"],"chromosomeName":["2"],"chromosomePosition":[27772914]},{"rsId":["rs11605924"],"reportedGene":["CRY2"],"chromosomeName":["11"],"chromosomePosition":[45851540]}]}};

// Get the GWAS loci for a study from the EBI GWAS Catalog, then
// add a div to present them as naviagtion elements for the plot
function getGWASLoci(study){
    // Sanity check - study must be an object with a pubmed ID
    if (typeof study != "object" || typeof study.pmid != "string"){ return; }
    // First make sure we have a place on the page to load results.
    // Prepopulate it with a loading message and spinner.
    if (!$("#gwas_loci_container #gwas_loci_" + study.id).length){
        $("#gwas_loci_container").append("<div id=\"gwas_loci_" + study.id + "\"></div>");
    }
    var fail = function(study){
        $("#gwas_loci_container #gwas_loci_" + study.id + " .gwas_loci_list").html("<span style=\"color: #B85D5C;\"><b>Unable to load GWAS loci.</b></span>");
        return false;
    }
    $("#gwas_loci_container #gwas_loci_" + study.id)
        .append("<h4>GWAS loci for " + study.first_author + " " + study.date + "<br><small>" + study.analysis + "</small></h4>")
        .append("<div class=\"gwas_loci_list\"><img src=\"images/loading.gif\" width=\"14\" height=\"14\"> <i>Loading GWAS loci...</i></div>");
    // Query the GWAS catalog for GWAS loci based off the pubmed ID
    try {
        var parseGWASLociResponse = function(raw_response, error_message){
            try {
                if (typeof error_message == "string"){ throw(error_message); }
                var response = JSON.parse(raw_response);
                $("#gwas_loci_container #gwas_loci_" + study.id + " .gwas_loci_list").html("<ul class=\"gwasloci-menu\"></ul>");
                response.response.docs.forEach(function(doc){
                    // Verify this doc is a GWAS locus object
                    if (!Array.isArray(doc.reportedGene) || !Array.isArray(doc.rsId)){ return; }
                    var gene = doc.reportedGene[0];
                    var rsid = doc.rsId[0];
                    // Resolve chromosome or skip this locus
                    var chr = NaN;
                    doc.chromosomeName.forEach(function(chrName){
                        if (!isNaN(parseInt(chrName))){ chr = parseInt(chrName); }
                    });
                    if (isNaN(chr)){ return; }
                    // Resolve start/end positions or skip this locus
                    var signal_start = NaN;
                    var signal_end = NaN;
                    doc.chromosomePosition.forEach(function(pos){
                        if (isNaN(signal_start) || isNaN(signal_end)){
                            signal_start = signal_end = parseInt(pos);
                        } else {
                            signal_start = Math.min(signal_start, parseInt(pos));
                            signal_end = Math.max(signal_end, parseInt(pos));
                        }
                    });
                    if (isNaN(signal_start) || isNaN(signal_end)){ return; }
                    // Put it all together and add it to the list
                    var current_scale = plot.state.end - plot.state.start;
                    var range = Math.ceil(Math.max(signal_end - signal_start, plot.state.end - plot.state.start) / 2);
                    var range_start = Math.ceil((signal_end + signal_start)/2) - range;
                    var range_end = Math.ceil((signal_end + signal_start)/2) + range;
                    var signal_region = chr + ":" + signal_start;
                    var nav_region = chr + ":" + range_start + "-" + range_end;
                    $("#gwas_loci_container #gwas_loci_" + study.id + " .gwas_loci_list ul.gwasloci-menu").append("<li><a href=\"javascript:void(0);\" onclick=\"showRegion('" + nav_region + "');\">" + gene + " <small>" + rsid + " [" + signal_region + "]</small></a></li>");
                });
            } catch (e){
                $("#gwas_loci_container #gwas_loci_" + study.id + " .gwas_loci_list").append("<div style=\"color: #B85D5C;\"><b>" + e + "</b></div>");
            }
        };
        LocusZoom.createCORSPromise("GET", "https://www.ebi.ac.uk/gwas/api/search?q=" + study.pmid)
            .then(function(response){
                if (!response.length){
                    return parseGWASLociResponse(default_gwas_loci_response, "GWAS loci request failed; API endpoint missing CORS header. Defaults used instead.");
                }
                return parseGWASLociResponse(response);
            }, function(){ return fail(study); });
    } catch (e){
        console.warn(e);
        fail(study);
    }
}

// This function will process a selection for the "Show Region by Gene" input by looking
// up its locus, expanding it to a 600kb region, and applying the state to the plot.
function showGene(){
  var region = document.getElementById("select_region").value;
  if (typeof(regions[region]) != "string"){ return; }
  var target = regions[region].split(":");
  var chr = +target[0];
  var pos = +target[1];
  if (chr > 0 && pos > 0){
    plot.layout.panels.forEach(function(panel){
        plot.panels[panel.id].loader.show("Updating Region...").animate();
    });
    plot.applyState({
      chr: chr,
      start: Math.max(pos - 300000, 0),
      end: pos + 300000
    });
  }
}

// This function will process the contents of the "Navigate to Region" input
// to apply a state to the plot showing any arbitrary region
function showRegion(arg_region){
  if (typeof arg_region == "string"){
    $("#input_region").val(arg_region);
    return showRegion();
  }
  document.getElementById("input_region").style["background-color"] = null;
  d3.select("#input_region").style({"background-color": null});
  var region = document.getElementById("input_region").value;
  if (typeof region != "string"){
    document.getElementById("input_region").style["background-color"] = "#FFCCCC";
    return;
  }
  region = region.split(":");
  var chr = +region[0];
  var pos = region[1].split("-");
  var start = +pos[0];
  var end = +pos[1];
  if (!(chr > 0 && start > 0 && end > 0)){
    document.getElementById("input_region").style["background-color"] = "#FFCCCC";
    return;
  }
  plot.applyState({
    chr: chr,
    start: start,
    end: end
  });
  return;
}

function getPlotURL(){
  var p = {
    state: plot.layout.state,
    panel_ids: plot.panel_ids_by_y_index
  }
  return document.location.origin + document.location.pathname + "?p=" + LZString.compressToEncodedURIComponent(JSON.stringify(p));
}

function getURLVariable(variable){
  var query = window.location.search.substring(1);
  var vars = query.split("&");
  for (var i=0; i < vars.length; i++) {
    var pair = vars[i].split("=");
    if (pair[0] == variable){ return pair[1]; }
  }
  return(false);
}

// This function takes the data bound to a gene returned from the gene names API
// And translates it into values in the region input.
function applySelectedGeneName(){
    if (gene_lookup_active == null){ return; }
    var data = $("a", $("#gene_lookup_results .dropdown-menu li.option")[gene_lookup_active]).data();
    showRegion(data['region']);
    $("#gene_lookup").val(data['name']);
    $("#gene_lookup_results").html("");
    gene_lookup_active = null;
}

// Set up Gene Lookup search box
var gene_lookup_active = null;
var gene_lookup_results_timeout = null;
$(document).ready(function() {
    $("#gene_lookup").searchbox({
        url: "https://portaldev.sph.umich.edu/api_internal_dev/v1/annotation/genes/?transcripts=F",
        param: "filter",
        partial: "source in 2 and gene_name like '{value}*'",
        dom_id: '#gene_lookup_results',
        loading_css: '#gene_lookup_loading',
        delay: 250,
        parse: function(response){
            var input = $("#gene_lookup").val().toUpperCase();
            var html = '<ul class="dropdown-menu">';
            for (var i = 0; i < response.data.length && i < 8; i++){
                if (response.data[i].gene_name.split(input).length != 2){ continue; }
                var term = '<b>' + input + "</b>" + response.data[i].gene_name.split(input)[1];
                var range = response.data[i].end - response.data[i].start;
                var center = response.data[i].end - Math.round(range/2);
                var padded_range = Math.max(Math.min(range * 2, plot_base_max_limit), plot_base_min_limit);
                var gene_region = response.data[i].chrom + ":" + response.data[i].start + "-" + response.data[i].end;
                var nav_region = response.data[i].chrom + ":" + Math.max((center-Math.round(padded_range/2)),1) + '-' + (center+Math.round(padded_range/2));
                html += '<li class="option" data-index="' + i + '"><a class="dropdown-item" href="javascript:void(0);" role="option" data-region="' + nav_region + '" data-name="' + response.data[i].gene_name + '">' + term + ' <small>' + gene_region + '</small></a></li>';
            }
            if (response.data.length > 8){
                html += '<li><span>...' + response.data.length + " matches</span></li>";
            } else if (!response.data.length){
                html += '<li><span>no matches</span></li>';
            }
            html += '</ul>';
            return html;
        },
        postparse: function(){
            $("#gene_lookup_results .dropdown-menu li.option").hover(
                function(){
                    $("#gene_lookup_results .dropdown-menu li.option").removeClass("active");
                    gene_lookup_active = $(this).data().index;
                    $(this).addClass("active");
                }, function(){
                    gene_lookup_active = null;
                    $(this).removeClass("active");
                }
            ).click(applySelectedGeneName);
        }
    });
    $("#gene_lookup")
        .blur(function(){
            gene_lookup_results_timeout = setTimeout(function(){
                $("#gene_lookup_results").html("");
                gene_lookup_active = null;
            }, 250);
        })
        .focus(function(){
            clearTimeout(gene_lookup_results_timeout);
            $.searchbox.process($("#gene_lookup").val().toUpperCase());
        })
        .bind("keydown", function(event){
            switch(event.which){
            case 38: // up arrow
                if (gene_lookup_active == null){
                    gene_lookup_active = $("#gene_lookup_results .dropdown-menu li.option").length - 1;
                } else {
                    $($("#gene_lookup_results .dropdown-menu li.option")[gene_lookup_active]).removeClass("active");
                    gene_lookup_active--;
                    if (gene_lookup_active == -1){
                        gene_lookup_active = $("#gene_lookup_results .dropdown-menu li.option").length - 1;
                    }
                }
                $($("#gene_lookup_results .dropdown-menu li.option")[gene_lookup_active]).addClass("active");
                break;
            case 40: // down arrow
                if (gene_lookup_active == null){
                    gene_lookup_active = 0;
                } else {
                    $($("#gene_lookup_results .dropdown-menu li.option")[gene_lookup_active]).removeClass("active");
                    gene_lookup_active++;
                    if (gene_lookup_active == $("#gene_lookup_results .dropdown-menu li.option").length){
                        gene_lookup_active = 0;
                    }
                }
                $($("#gene_lookup_results .dropdown-menu li.option")[gene_lookup_active]).addClass("active");
                break;
            case 13: // enter
                applySelectedGeneName();
                break;
            }
        });
});
