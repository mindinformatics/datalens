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



  gene_1 = [{
      "chrom": "10",
      "end": 114578503,
      "exons": [
        {
          "chrom": "10",
          "end": 114207225,
          "exon_id": "ENSE00001449955.2",
          "start": 114206756,
          "strand": "+"
        },
        {
          "chrom": "10",
          "end": 114207225,
          "exon_id": "ENSE00001882813.1",
          "start": 114206757,
          "strand": "+"
        },
        {
          "chrom": "10",
          "end": 114207225,
          "exon_id": "ENSE00001821417.1",
          "start": 114206992,
          "strand": "+"
        },
        {
          "chrom": "10",
          "end": 114207225,
          "exon_id": "ENSE00001616164.1",
          "start": 114207016,
          "strand": "+"
        },
        {
          "chrom": "10",
          "end": 114207225,
          "exon_id": "ENSE00001943986.1",
          "start": 114207022,
          "strand": "+"
        },
        {
          "chrom": "10",
          "end": 114207225,
          "exon_id": "ENSE00001887515.1",
          "start": 114207034,
          "strand": "+"
        },
        {
          "chrom": "10",
          "end": 114207225,
          "exon_id": "ENSE00001941638.1",
          "start": 114207107,
          "strand": "+"
        },
        {
          "chrom": "10",
          "end": 114207225,
          "exon_id": "ENSE00001885329.1",
          "start": 114207117,
          "strand": "+"
        },
        {
          "chrom": "10",
          "end": 114208247,
          "exon_id": "ENSE00001817770.1",
          "start": 114208140,
          "strand": "+"
        },
        {
          "chrom": "10",
          "end": 114209417,
          "exon_id": "ENSE00001820498.1",
          "start": 114208640,
          "strand": "+"
        },
        {
          "chrom": "10",
          "end": 114210484,
          "exon_id": "ENSE00001956888.1",
          "start": 114208640,
          "strand": "+"
        },
        {
          "chrom": "10",
          "end": 114220341,
          "exon_id": "ENSE00003578306.1",
          "start": 114220283,
          "strand": "+"
        },
        {
          "chrom": "10",
          "end": 114220341,
          "exon_id": "ENSE00003610417.1",
          "start": 114220283,
          "strand": "+"
        },
        {
          "chrom": "10",
          "end": 114224416,
          "exon_id": "ENSE00003649011.1",
          "start": 114224306,
          "strand": "+"
        },
        {
          "chrom": "10",
          "end": 114224416,
          "exon_id": "ENSE00003639068.1",
          "start": 114224306,
          "strand": "+"
        },
        {
          "chrom": "10",
          "end": 114224517,
          "exon_id": "ENSE00001819667.1",
          "start": 114224306,
          "strand": "+"
        },
        {
          "chrom": "10",
          "end": 114245050,
          "exon_id": "ENSE00001816216.1",
          "start": 114244728,
          "strand": "+"
        },
        {
          "chrom": "10",
          "end": 114286923,
          "exon_id": "ENSE00003510762.1",
          "start": 114286846,
          "strand": "+"
        },
        {
          "chrom": "10",
          "end": 114287164,
          "exon_id": "ENSE00001938379.1",
          "start": 114286846,
          "strand": "+"
        },
        {
          "chrom": "10",
          "end": 114286923,
          "exon_id": "ENSE00003465081.1",
          "start": 114286846,
          "strand": "+"
        },
        {
          "chrom": "10",
          "end": 114293309,
          "exon_id": "ENSE00001949792.1",
          "start": 114293289,
          "strand": "+"
        },
        {
          "chrom": "10",
          "end": 114298089,
          "exon_id": "ENSE00001685704.1",
          "start": 114298005,
          "strand": "+"
        },
        {
          "chrom": "10",
          "end": 114298060,
          "exon_id": "ENSE00001906573.1",
          "start": 114298005,
          "strand": "+"
        },
        {
          "chrom": "10",
          "end": 114298405,
          "exon_id": "ENSE00001900667.1",
          "start": 114298005,
          "strand": "+"
        },
        {
          "chrom": "10",
          "end": 114428047,
          "exon_id": "ENSE00001694759.1",
          "start": 114427977,
          "strand": "+"
        },
        {
          "chrom": "10",
          "end": 114428757,
          "exon_id": "ENSE00001692595.1",
          "start": 114428696,
          "strand": "+"
        },
        {
          "chrom": "10",
          "end": 114497543,
          "exon_id": "ENSE00001767168.1",
          "start": 114496482,
          "strand": "+"
        },
        {
          "chrom": "10",
          "end": 114578503,
          "exon_id": "ENSE00001514122.2",
          "start": 114575049,
          "strand": "+"
        }
      ],
      "gene_id": "ENSG00000151532.9",
      "gene_name": "VTI1A",
      "start": 114206756,
      "strand": "+",
      "transcripts": [
        {
          "end": 114210484,
          "exons": [
            {
              "chrom": "10",
              "end": 114207225,
              "exon_id": "ENSE00001449955.2",
              "start": 114206756,
              "strand": "+"
            },
            {
              "chrom": "10",
              "end": 114208247,
              "exon_id": "ENSE00001817770.1",
              "start": 114208140,
              "strand": "+"
            },
            {
              "chrom": "10",
              "end": 114210484,
              "exon_id": "ENSE00001956888.1",
              "start": 114208640,
              "strand": "+"
            }
          ],
          "start": 114206756,
          "strand": "+",
          "transcript_chrom": "10",
          "transcript_id": "ENST00000483122.1",
          "transcript_name": "VTI1A-002"
        },
        {
          "end": 114209417,
          "exons": [
            {
              "chrom": "10",
              "end": 114207225,
              "exon_id": "ENSE00001882813.1",
              "start": 114206757,
              "strand": "+"
            },
            {
              "chrom": "10",
              "end": 114209417,
              "exon_id": "ENSE00001820498.1",
              "start": 114208640,
              "strand": "+"
            }
          ],
          "start": 114206757,
          "strand": "+",
          "transcript_chrom": "10",
          "transcript_id": "ENST00000472892.1",
          "transcript_name": "VTI1A-003"
        },
        {
          "end": 114245050,
          "exons": [
            {
              "chrom": "10",
              "end": 114207225,
              "exon_id": "ENSE00001821417.1",
              "start": 114206992,
              "strand": "+"
            },
            {
              "chrom": "10",
              "end": 114220341,
              "exon_id": "ENSE00003610417.1",
              "start": 114220283,
              "strand": "+"
            },
            {
              "chrom": "10",
              "end": 114224416,
              "exon_id": "ENSE00003639068.1",
              "start": 114224306,
              "strand": "+"
            },
            {
              "chrom": "10",
              "end": 114245050,
              "exon_id": "ENSE00001816216.1",
              "start": 114244728,
              "strand": "+"
            }
          ],
          "start": 114206992,
          "strand": "+",
          "transcript_chrom": "10",
          "transcript_id": "ENST00000489142.1",
          "transcript_name": "VTI1A-005"
        },
        {
          "end": 114578503,
          "exons": [
            {
              "chrom": "10",
              "end": 114207225,
              "exon_id": "ENSE00001616164.1",
              "start": 114207016,
              "strand": "+"
            },
            {
              "chrom": "10",
              "end": 114220341,
              "exon_id": "ENSE00003578306.1",
              "start": 114220283,
              "strand": "+"
            },
            {
              "chrom": "10",
              "end": 114224416,
              "exon_id": "ENSE00003649011.1",
              "start": 114224306,
              "strand": "+"
            },
            {
              "chrom": "10",
              "end": 114286923,
              "exon_id": "ENSE00003510762.1",
              "start": 114286846,
              "strand": "+"
            },
            {
              "chrom": "10",
              "end": 114298089,
              "exon_id": "ENSE00001685704.1",
              "start": 114298005,
              "strand": "+"
            },
            {
              "chrom": "10",
              "end": 114428047,
              "exon_id": "ENSE00001694759.1",
              "start": 114427977,
              "strand": "+"
            },
            {
              "chrom": "10",
              "end": 114428757,
              "exon_id": "ENSE00001692595.1",
              "start": 114428696,
              "strand": "+"
            },
            {
              "chrom": "10",
              "end": 114578503,
              "exon_id": "ENSE00001514122.2",
              "start": 114575049,
              "strand": "+"
            }
          ],
          "start": 114207016,
          "strand": "+",
          "transcript_chrom": "10",
          "transcript_id": "ENST00000393077.2",
          "transcript_name": "VTI1A-001"
        },
        {
          "end": 114497543,
          "exons": [
            {
              "chrom": "10",
              "end": 114207225,
              "exon_id": "ENSE00001616164.1",
              "start": 114207016,
              "strand": "+"
            },
            {
              "chrom": "10",
              "end": 114220341,
              "exon_id": "ENSE00003578306.1",
              "start": 114220283,
              "strand": "+"
            },
            {
              "chrom": "10",
              "end": 114224416,
              "exon_id": "ENSE00003649011.1",
              "start": 114224306,
              "strand": "+"
            },
            {
              "chrom": "10",
              "end": 114286923,
              "exon_id": "ENSE00003510762.1",
              "start": 114286846,
              "strand": "+"
            },
            {
              "chrom": "10",
              "end": 114298089,
              "exon_id": "ENSE00001685704.1",
              "start": 114298005,
              "strand": "+"
            },
            {
              "chrom": "10",
              "end": 114428047,
              "exon_id": "ENSE00001694759.1",
              "start": 114427977,
              "strand": "+"
            },
            {
              "chrom": "10",
              "end": 114428757,
              "exon_id": "ENSE00001692595.1",
              "start": 114428696,
              "strand": "+"
            },
            {
              "chrom": "10",
              "end": 114497543,
              "exon_id": "ENSE00001767168.1",
              "start": 114496482,
              "strand": "+"
            }
          ],
          "start": 114207016,
          "strand": "+",
          "transcript_chrom": "10",
          "transcript_id": "ENST00000432306.1",
          "transcript_name": "VTI1A-009"
        },
        {
          "end": 114298405,
          "exons": [
            {
              "chrom": "10",
              "end": 114207225,
              "exon_id": "ENSE00001943986.1",
              "start": 114207022,
              "strand": "+"
            },
            {
              "chrom": "10",
              "end": 114220341,
              "exon_id": "ENSE00003610417.1",
              "start": 114220283,
              "strand": "+"
            },
            {
              "chrom": "10",
              "end": 114224416,
              "exon_id": "ENSE00003639068.1",
              "start": 114224306,
              "strand": "+"
            },
            {
              "chrom": "10",
              "end": 114286923,
              "exon_id": "ENSE00003465081.1",
              "start": 114286846,
              "strand": "+"
            },
            {
              "chrom": "10",
              "end": 114298405,
              "exon_id": "ENSE00001900667.1",
              "start": 114298005,
              "strand": "+"
            }
          ],
          "start": 114207022,
          "strand": "+",
          "transcript_chrom": "10",
          "transcript_id": "ENST00000496445.1",
          "transcript_name": "VTI1A-008"
        },
        {
          "end": 114224517,
          "exons": [
            {
              "chrom": "10",
              "end": 114207225,
              "exon_id": "ENSE00001887515.1",
              "start": 114207034,
              "strand": "+"
            },
            {
              "chrom": "10",
              "end": 114220341,
              "exon_id": "ENSE00003610417.1",
              "start": 114220283,
              "strand": "+"
            },
            {
              "chrom": "10",
              "end": 114224517,
              "exon_id": "ENSE00001819667.1",
              "start": 114224306,
              "strand": "+"
            }
          ],
          "start": 114207034,
          "strand": "+",
          "transcript_chrom": "10",
          "transcript_id": "ENST00000494728.1",
          "transcript_name": "VTI1A-004"
        },
        {
          "end": 114298060,
          "exons": [
            {
              "chrom": "10",
              "end": 114207225,
              "exon_id": "ENSE00001941638.1",
              "start": 114207107,
              "strand": "+"
            },
            {
              "chrom": "10",
              "end": 114220341,
              "exon_id": "ENSE00003610417.1",
              "start": 114220283,
              "strand": "+"
            },
            {
              "chrom": "10",
              "end": 114224416,
              "exon_id": "ENSE00003639068.1",
              "start": 114224306,
              "strand": "+"
            },
            {
              "chrom": "10",
              "end": 114286923,
              "exon_id": "ENSE00003465081.1",
              "start": 114286846,
              "strand": "+"
            },
            {
              "chrom": "10",
              "end": 114293309,
              "exon_id": "ENSE00001949792.1",
              "start": 114293289,
              "strand": "+"
            },
            {
              "chrom": "10",
              "end": 114298060,
              "exon_id": "ENSE00001906573.1",
              "start": 114298005,
              "strand": "+"
            }
          ],
          "start": 114207107,
          "strand": "+",
          "transcript_chrom": "10",
          "transcript_id": "ENST00000489357.1",
          "transcript_name": "VTI1A-007"
        },
        {
          "end": 114287164,
          "exons": [
            {
              "chrom": "10",
              "end": 114207225,
              "exon_id": "ENSE00001885329.1",
              "start": 114207117,
              "strand": "+"
            },
            {
              "chrom": "10",
              "end": 114220341,
              "exon_id": "ENSE00003610417.1",
              "start": 114220283,
              "strand": "+"
            },
            {
              "chrom": "10",
              "end": 114224416,
              "exon_id": "ENSE00003639068.1",
              "start": 114224306,
              "strand": "+"
            },
            {
              "chrom": "10",
              "end": 114287164,
              "exon_id": "ENSE00001938379.1",
              "start": 114286846,
              "strand": "+"
            }
          ],
          "start": 114207117,
          "strand": "+",
          "transcript_chrom": "10",
          "transcript_id": "ENST00000480057.1",
          "transcript_name": "VTI1A-006"
        }
      ]
    }];

      console.log(gene_1);

  LocusZoom.Data.AssociationSource.prototype.getURL = function(state, chain, fields) {
    var analysis = state.analysis || chain.header.analysis || this.params.analysis || 3;
    return this.url;
};

    // Define Data Sources
    apiBase = "https://portaldev.sph.umich.edu/api/v1/";
    var data_sources = new LocusZoom.DataSources()
      //.add("trait", ["AssociationLZ", {url: "sites/all/libraries/locuszoom/lzoom/IGAP_stage1_selected.json?", params: {analysis: 3, id_field: "MarkerName"}} ] );
      //21:27107568-27688738
        .add("assoc", ["AssociationLZ", { url: apiBase + "statistic/single/", params: {analysis: 3, id_field: "variant"}}])
        .add("ld", ["LDLZ", { url: apiBase + "pair/LD/" }])
        //.add("gene", ["GeneLZ", { url: apiBase + "annotation/genes/", params: {source: 2} }])
        .add("gene", ["StaticJSON", gene_1])
        .add("recomb", ["RecombLZ", { url: apiBase + "annotation/recomb/results/", params: {source: 15} }])
        .add("constraint", ["GeneConstraintLZ", { url: "http://exac.broadinstitute.org/api/constraint" }])
        //.add("intervals", ["IntervalLZ", { url: apiBase + "annotation/intervals"}]);
        .add("intervals", ["IntervalLZ", { url: "sites/all/libraries/locuszoom/staticdata/intervals_10_114550452-115067678.json?"}]);

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
