/**
 * @file
 * Javascript for Bubblechart.
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

  // var 

  Drupal.d3.bubblechart = function (select, settings) {
    
    var pValue = 0.01;
    var FCValue = 3.52;


    // pValue Slider *******************************
    // Axis
    var margin = {top: 10, right: 10, bottom: 20, left: 10},
    width = $("#PValue").width() - margin.left - margin.right,
    height = 0;//$("#PValue").height() - margin.top - margin.bottom - $("#sliderPVal").height();

    var superscript = "⁰¹²³⁴⁵⁶⁷⁸⁹", superscriptMinus = "⁻",
        formatPower = function(d) { return (d + "").split("").map(function(c) { return superscript[c]; }).join(""); };

    var pValue_x = d3.scale.log()
        .domain([1e0, 1e-6])
        .range([0, width]);

    var pValue_xAxis = d3.svg.axis()
        .scale(pValue_x)
        .orient("bottom")
        .ticks(10, function(d) { 
          console.log('d ' + d);
          if(d < 1) return 10 + superscriptMinus + formatPower(Math.round(Math.log(d) / Math.LN10)); 
          else return 10 + formatPower(Math.round(Math.log(d) / Math.LN10)); 
        });

    var svg = d3.select("#PValue").append("svg")
        .attr("id", "PValAxis")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
      .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    svg.append("g")
        .attr("class", "x axis")
        .attr("transform", "translate(0," + height + ")")
        .call(pValue_xAxis);

    // Slider
    $("#sliderPVal").attr({ "max" : 6, "min" : 0, "value" : pValue, "step" : .0001 });
    
    var sliderOutput = function(x){ return Math.pow(10,-x); }; // <- minus x because the slider outputs positive values instead of negative ones.
    var sliderInput  = function(x){ return (-1 * Math.log10(x))};

    $("#sliderPVal").on("input", function(){ 
      $("#PValText").val( sliderOutput( $("#sliderPVal").val()));
      pValue = sliderOutput( $("#sliderPVal").val());
    });
    $("#sliderPVal").on("change", function(){ updateChart(); });

    // Textfield
    $("#PValText").focusout( function(e){
      pValue = Number( $("#PValText").val() );
      $("#sliderPVal").val(sliderInput(pValue));
      updateChart();
    });


    // FCValue Slider *******************************   
    // Axis
    var fc_min = -2.5444, fc_max = 3.51671876;
    width = $("#FCValue").width() - margin.left - margin.right,
    height = 0;//$("#PValue").height() - margin.top - margin.bottom - $("#sliderPVal").height();

    var fcValue_x = d3.scale.linear()
        .domain([fc_min, fc_max])
        .range([0, width]);

    var fcValue_xAxis = d3.svg.axis()
        .scale(fcValue_x)
        .orient("bottom")
        .ticks(10, function(d) { return d; });

    var svg = d3.select("#FCValue").append("svg")
        .attr("id", "FCValAxis")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
      .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    svg.append("g")
        .attr("class", "x axis")
        .attr("transform", "translate(0," + height + ")")
        .call(fcValue_xAxis);

    // Slider 
    $("#sliderFCVal").attr({ "max" : fc_max, "min" : fc_min, "value" : FCValue, "step" : .0001 });
    
    $("#sliderFCVal").on("input",  function(event){ 
      FCValue = $("#sliderFCVal").val(); 
      $("#FCValText").val(FCValue);
    });
    $("#sliderFCVal").on("change", function(event){ updateChart(); });

    // Textfield
    $("#FCValText").focusout( function(e){
      FCValue = Number( $("#FCValText").val() );
      $("#sliderFCVal").val(FCValue);
      updateChart();
    });



    var data, emptyDataMap, emptyTree, node, groups, circles, titles, tooltips, parentPaths, parentTitles;

    var root;

    var diameter = 960,
      format = d3.format(",d");

    var pack = d3.layout.pack()
      .size([diameter - 4, diameter - 4])
      .value(function(d) { return d.size; })
      .padding(1.5);

    var svg = d3.select('#' + settings.id).append("svg")
      .attr("width", diameter)
      .attr("height", diameter)
      .append("g")
      .attr("transform", "translate(2,2)");

    var arc = d3.svg.arc()
      .innerRadius(function(d){return d.r-d.r/5;})
      .outerRadius(function(d){return d.r;})
      .startAngle(0)
      .endAngle(2*Math.PI);

    var userInputFilter = function(d)
    {
      if( 
          (
            // d.Study == "MSBB" 
            d.PValue <= pValue //&&
            //d.FCValue <= FCValue
          ) ||
          d.Study == "" 
        ) 
        return d.size;
      else 
        return 0.0001; // approximately zero, but actually zero screws up packing function
    };

    var load = function(error, dataIn) {
      data = dataIn;
      console.log('data');
      console.log(data);
      data.forEach(function(d) {
        d.LogFC = +d.LogFC;
        d.PValue = +d.PValue;
        d.AdjPValue = +d.AdjPValue;
      });

      // *********** Convert flat data into a nice tree ***************
      // create a name: node map
      var dataMap = data.reduce(function(map, node) {
        map[node.name] = node;
        return map;
      }, {});
      emptyDataMap = jQuery.extend(true, {}, dataMap); // store the datamap for reuse when making changes to data, later.
      
      console.log('datamap');
      console.log(dataMap);

      // create the tree array
      var treeData = [];
      data.filter(function(d){ return d.name != "NA" && d.LogFC != "NA" && d.size != "NA" && d.PValue != "NA" && d.AdjPValue != "NA" && d.PValue < 0.01})
        .forEach(function(node) {
          // add to parent
          var parent = dataMap[node.parent];
          if (parent) {
            // create child array if it doesn't exist
            (parent.children || (parent.children = []))
              // add node to child array
              .push(node);
          } else {
            // parent is null or missing
            treeData.push(node);
          }
        });
      emptyTree = jQuery.extend(true, {}, treeData);// copy empty treeData for reuse later


      //console.debug(treeData[0].children[0]);
      root = treeData[0];
      console.log('root');
      console.log(root);

      node = svg.datum(root).selectAll(".node")
              .data(pack.nodes);
              //console.debug(node);

      pack.value( userInputFilter );
      console.log('blah');
      pack.nodes(root);

      groups = node.enter().append("g")
            .attr("class", function(d) { return d.children ? "node" : "leaf node"; })
            .attr("transform", function(d) { return "translate(" + d.x + "," + d.y + ")"; });

      tooltips = groups.append("title")
            //(d.children ? "" : ": " + format(d.size)
            .html(function(d) { return (d.children ? d.name : d.name + "<br/>" + "FC: " + d.LogFC + "<br/>" + "P-value: " + d.PValue + "<br/>" + "Adjusted P-value: " + d.AdjPValue + "<br/>" + "Study: " + d.Study) });


      // Color Map
      var data_points = d3.entries(dataMap);
      console.log("data_points");
      // console.log(data_points);
      var max_fc = d3.max( data_points, function(d) { return d['value']['LogFC'] });
      //console.debug(max_fc);
      var min_fc = d3.min( data_points, function(d) { return d['value']['LogFC'] });
      //console.debug(min_fc);
      var color_scale = d3.scale.linear().domain([min_fc, max_fc]).range(['#253494', '#bd0026']);
      console.log('color');
      console.log(color_scale(max_fc));


      circles = node.filter(function(d){ return !( d.name == "WB" ); }).append("circle")
          .attr("r", function(d) { return d.r; })
          .style("visibility", function(d) { 
            if (d.r < 0.01) return "none"; 
            else return "visible"; 
          })
          .style('fill', function(d) { return (d.children ? "none" : color_scale(d.LogFC)); })
          .style('fill-opacity', function(d) { return (d.children ? '0' : '.6'); })
          .style('stroke', 'black');


      //console.debug(node);


      // RENDERING TEXT

      //If no children, display title like this
      titles = node.filter(function(d) { return !(d.children); }).append("text")
          // .attr("dy", ".2em")
          .attr("dy", ".33em")
          .style("text-anchor", "middle")
          // .text(function(d) { return d.name.substring(0, d.r / 3); });
          .style("font-size", function(d) { return (d.r) + "px"; })
          .text(function(d) { 
            if(d.r < 15) return d.name.substring(0, d.r / 6); 
            else return d.name.substring(0, d.r / 10); 
          });

      //If has children
      parentPaths = node.filter(function(d) { return d.children; })
       .filter(function(d){ return !(d.name == "WB"); })
       //.filter(function(d){ return !(d.parent.name == "WB"); })
       .append("path")
            .attr("id", function(d,i){return "s"+i;})
            .attr("fill","none")
            .attr("d", arc);

      parentTitles = node.filter(function(d) { return d.children; })
       .filter(function(d){ return !(d.name == "WB"); })
      //.filter(function(d){ return !(d.parent.name == "WB"); })
       .append("text")
                .attr("dy", "1em")
                .style("text-anchor", "middle")
            .append("textPath")
                .attr("xlink:href",function(d,i){return "#s"+i;})
                .attr("startOffset",function(d){return "30%";})
                .text(function(d) { return d.name; });
    };

    var updateChart = function() {

      pack.value( userInputFilter );
      console.log('spacer?');
      pack.nodes(root);

      circles.transition().duration(2000)
              .attr("r", function(d){ return d.r; } );

      groups.transition().duration(2000)
          .attr("transform", function(d) { return "translate(" + d.x + "," + d.y + ")"; });

      tooltips
          .html(function(d) { return (d.children ? d.name : d.name + "<br/>" + "FC: " + d.LogFC + "<br/>" + "P-value: " + d.PValue + "<br/>" + "Adjusted P-value: " + d.AdjPValue + "<br/>" + "Study: " + d.Study) });

      // RENDERING TEXT
      arc = d3.svg.arc()
        .innerRadius(function(d){return d.r-d.r/5;})
        .outerRadius(function(d){return d.r;})
        .startAngle(0)
        .endAngle(2*Math.PI);
      //If no children, display title like this
      titles
          // .attr("dy", ".2em")
          .attr("dy", ".33em")
          .style("text-anchor", "middle")
          // .style("font-size", function(d) { return Math.min(2 * d.r, (2 * d.r - 8) / this.getComputedTextLength() * 24) + "px"; })
          .style("font-size", function(d) { return (d.r) + "px"; })
          // .text(function(d) { return d.name.substring(0, d.r / 3); });
          .text(function(d) { 
            if(d.r < 15) return d.name.substring(0, d.r / 6); 
            else return d.name.substring(0, d.r / 10); 
          });

      //If has children
      parentPaths
          .attr("id", function(d,i){return "s"+i;})
          .attr("fill","none")
          .attr("d", arc);

      parentTitles
          .attr("xlink:href",function(d,i){return "#s"+i;})
          .attr("startOffset",function(d){return "30%";})
          .text(function(d) { return d.name; });

    };



    d3.csv("/sites/all/themes/scf_theme/BubbleChart/Hyman-all-out.csv", load );


    d3.select(self.frameElement).style("height", diameter + "px");

    // d3.select("#button1").on("click", updateChart );
  }

})(jQuery);
