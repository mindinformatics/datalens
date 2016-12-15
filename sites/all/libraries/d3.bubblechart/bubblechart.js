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


  Drupal.d3.bubblechart = function (select, settings) {

    //rows = settings.rows;
    //console.debug(rows);

    // Set default values
    var pValue = 0.01;
    var FCValue = 3.52;

    // Setup Sliders
    d3.select("#sliderPVal").call(d3.slider().min(0).max(1).value(pValue).on("slide", function(event, value){
      console.log('slider PVal ' + value);
      pValue = value;
    }));
    d3.select("#sliderPVal").on("mouseup", function(event){
      console.log('slider PVal mouseup ' + pValue);
      updateChart();
    });
    d3.select("#sliderFCVal").call(d3.slider().min(-2.54).max(3.52).value(FCValue).on("slide", function(event, value){ FCValue = value; }));
    d3.select("#sliderFCVal").on("mouseup", function(event){
      console.log('slider FCVal mouseup ' + FCValue);
      updateChart();
    });



    var data, emptyDataMap, emptyTree, node, groups, circles, titles, tooltips, parentPaths, parentTitles, root;


    var diameter = 960,
      format = d3.format(",d");

    var pack = d3.layout.pack()
      .size([diameter - 4, diameter - 4])
      .value(function(d) { return d.size; });

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

    var filterFunction = function(d)
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

      // create the tree array - part 1 - branches
      var treeData = [];
      data.filter(function(d){ return d.Study == "" }).forEach(function(node) {
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


      // var dataFiltered = data.filter(function(d){ return d; }); //d.PValue < 0.005; }); // return d.PValue == 0.601138921 || d.PValue == 0.481694435});
      // console.log("dataFiltered");
      // console.log(dataFiltered);

      // create the tree array - part 2 - leaves (use filtered data here)
      data.filter(function(d){ return d.Study != ""}).forEach(function(node) {
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


      //console.debug(treeData[0].children[0]);
      root = treeData[0];
      console.log('root');
      console.log(root);

      node = svg.datum(root).selectAll(".node")
              .data(pack.nodes);
              //console.debug(node);

      pack.value( filterFunction );
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
          .attr("dy", ".2em")
          .style("text-anchor", "middle")
          .text(function(d) { return d.name.substring(0, d.r / 3); });

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

      pack.value( filterFunction );
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
          .attr("dy", ".2em")
          .style("text-anchor", "middle")
          .text(function(d) { return d.name.substring(0, d.r / 3); });

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



    d3.csv("/sites/all/themes/scf_theme/BubbleChart/Hypoxia-viz.csv", load );


    d3.select(self.frameElement).style("height", diameter + "px");

    // d3.select("#button1").on("click", updateChart );
  }

})(jQuery);
