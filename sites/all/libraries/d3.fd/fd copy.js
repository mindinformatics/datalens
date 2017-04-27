/**
 * @file
 * Javascript for ForceDirected Graph with Fisheye Distortion.
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
  Drupal.d3.fd = function (select, settings) {
    var width = 960,
       height = 500;

    var svg = d3.select('#' + settings.id).append("svg")
        .attr("width", width)
        .attr("height", height);

    var force = d3.layout.force()
        .gravity(0.05)
        .distance(100)
        .charge(-100)
        .size([width, height]);

    d3.tsv("/sites/all/libraries/d3.fd/Tau.tsv", function(error, links) {
     d3.csv("/sites/all/libraries/d3.fd/Tau-genes.csv", function(error, nodes) {
      if (error) throw error;

      force
          .nodes(nodes)
          .links(links)
          .start();

      var link = svg.selectAll(".link")
          .data(links)
        .enter().append("line")
          .attr("class", "link");

      var node = svg.selectAll(".node")
          .data(nodes)
        .enter().append("g")
          .attr("class", "node")
          .call(force.drag);

      node.append("image")
          .attr("xlink:href", "https://github.com/favicon.ico")
          .attr("x", -8)
          .attr("y", -8)
          .attr("width", 16)
          .attr("height", 16);

      node.append("text")
          .attr("dx", 12)
          .attr("dy", ".35em")
          .text(function(d) { return d.id });

      force.on("tick", function() {
        link.attr("x1", function(d) { return d.source.x; })
            .attr("y1", function(d) { return d.source.y; })
            .attr("x2", function(d) { return d.target.x; })
            .attr("y2", function(d) { return d.target.y; });

        node.attr("transform", function(d) { return "translate(" + d.x + "," + d.y + ")"; });
      });
    });
  });

  }
})(jQuery);
