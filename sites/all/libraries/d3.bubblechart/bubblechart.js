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

      d3.csv("/sites/all/themes/scf_theme/BubbleChart/test.csv", function(error, data) {
          data.forEach(function(d) {
            d.LogFC = +d.LogFC;
          });


        // *********** Convert flat data into a nice tree ***************
        // create a name: node map
        var dataMap = data.reduce(function(map, node) {
          map[node.name] = node;
          return map;
        }, {});

        // create the tree array
        var treeData = [];
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

        root = treeData[0];



        var node = svg.datum(root).selectAll(".node")
                .data(pack.nodes);

                //console.debug(node);

          node.enter().append("g")
                .attr("class", function(d) { return d.children ? "node" : "leaf node"; })
                .attr("transform", function(d) { return "translate(" + d.x + "," + d.y + ")"; });

          node.append("title")
                //(d.children ? "" : ": " + format(d.size)
                .html(function(d) { return (d.children ? d.name : d.Gene + "<br/>" + "FC: " + d.LogFC + "<br/>" + "P-value: " + d.PValue + "<br/>" + "Adjusted P-value: " + d.AdjPValue + "<br/>" + "Study: " + d.Study) });


          var data_points = d3.entries(dataMap);
          //console.debug(test);
          var max_fc = d3.max( data_points, function(d) { return d['value']['LogFC'] });
          //console.debug(max_fc);
          var min_fc = d3.min( data_points, function(d) { return d['value']['LogFC'] });
          //console.debug(min_fc);
          var color_scale = d3.scale.linear().domain([min_fc, max_fc]).range(['#253494', '#bd0026']);
          console.debug(color_scale(max_fc));

          node.append("circle")
              .attr("r", function(d) { return d.r; })
              .style('fill', function(d) { return (d.children ? "none" : color_scale(d.LogFC)); })
              .style('fill-opacity', function(d) { return (d.children ? '0' : '.5'); })

              .style('stroke', 'black');


          node.filter(function(d) { return !d.children; }).append("text")
              .attr("dy", ".3em")
              .style("text-anchor", "middle")
              .text(function(d) { return d.name.substring(0, d.r / 3); });
        });

        d3.select(self.frameElement).style("height", diameter + "px");


  }

})(jQuery);
