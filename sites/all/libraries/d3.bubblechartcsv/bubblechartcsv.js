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
  Drupal.d3.bubblechartcsv = function (select, settings) {
      //rows = settings.rows;
      //console.debug(rows);

      var diameter = 960,
        format = d3.format(",d");

      var pack = d3.layout.pack()
      .size([diameter - 4, diameter - 4])
      .value(function(d) { return d.size; })
      .padding(2);

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

      d3.csv("/sites/all/themes/scf_theme/BubbleChart/Microglia-out-B3-B2.csv", function(error, data) {
        console.debug(data);
          data.forEach(function(d) {
            d.LogFC = +d.LogFC;
            d.PValue = +d.PValue;
            d.AdjPValue = +d.AdjPValue;
          });

        // *********** Convert flat data into a nice tree ***************
        // create a name: node map
        //csv to input: change data to rows
        var dataMap = data.reduce(function(map, node) {
          map[node.name] = node;
          return map;
        }, {});

        //console.debug(dataMap);

        // create the tree array
        var treeData = [];
        //csv to input: change data to rows
        data.forEach(function(node) {
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


        var node = svg.datum(root).selectAll(".node")
                .data(pack.nodes);

                //console.debug(node);

          node.enter().append("g")
                .attr("class", function(d) { return d.children ? "node" : "leaf node"; })
                .attr("transform", function(d) { return "translate(" + d.x + "," + d.y + ")"; });

          node.append("title")
                //(d.children ? "" : ": " + format(d.size)
                .html(function(d) { return (d.children ? d.name : d.name + "<br/>" + "FC: " + d.LogFC + "<br/>" + "P-value: " + d.PValue + "<br/>" + "Adjusted P-value: " + d.AdjPValue + "<br/>" + "Study: " + d.Study + "<br/>" + "Contrast: " + d.Contrast) });


// These max and mins are not correct;
//           var data_points = d3.entries(dataMap);
//           console.debug(test);
//           var max_fc = d3.max( data_points, function(d) { return d['value']['LogFC'] });
//           console.debug('max_fc');
//           console.debug(max_fc);
//           var min_fc = d3.min( data_points, function(d) { return d['value']['LogFC'] });
//           console.debug('min_fc');
//           console.debug(min_fc);

          var max_fc = d3.max( data, function(d) { return d.LogFC });
            console.debug('max_fc');
            console.debug(max_fc);
          var min_fc = d3.min( data, function(d) { return d.LogFC });
            console.debug('min_fc');
            console.debug(min_fc);
          var color_scale = d3.scale.linear().domain([min_fc, max_fc]).range(['#253494', '#bd0026']);
            console.debug(color_scale(max_fc));

          node.filter(function(d){ return !(d.name == "WB"); }).append("circle")
              .attr("r", function(d) { return d.r; })
              .style('fill', function(d) { return (d.children ? "none" : color_scale(d.LogFC)); })
              .style('fill-opacity', function(d) { return ( (d.children || d.r<1) ? '0' : '.6' ); })
              .style('stroke', function(d){ return d.children ? '#ccc' : 'none'})
              .style('stroke-width', '2px');

          //console.debug(node);

          //If no children, display title like this
          node.filter(function(d) { return !d.children; }).append("text")
            .attr("dy", ".33em")
            .style("text-anchor", "middle")
            .style("font-size", function(d) { return Math.min( d.r, 8 ) + "px" })
            .text(function(d) { return d.name.substring(0, d.r * 0.4); });


        //If has children
         node.filter(function(d) { return d.children; })
         .filter(function(d){ return !(d.name == "WB"); })
         //.filter(function(d){ return !(d.parent.name == "WB"); })
         .append("path")
              .attr("id", function(d,i){return "s"+i;})
              .attr("fill","none")
              .attr("d", arc);

         node.filter(function(d) { return d.children; })
         .filter(function(d){ return !(d.name == "WB"); })
         //.filter(function(d){ return !(d.parent.name == "WB"); })
         .append("text")
                  .attr("dy", "1em")
                  .style("text-anchor", "middle")
              .append("textPath")
                  .attr("xlink:href",function(d,i){return "#s"+i;})
                  .attr("startOffset",function(d){return "30%";})
                  .text(function(d) { return d.name; });

        });

        d3.select(self.frameElement).style("height", diameter + "px");

  }

})(jQuery);
