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
       height = 700;

    var svg = d3.select('#' + settings.id).append("svg")
        .attr("width", width)
        .attr("height", height);

    var color = d3.scale.category10();

    var force = d3.layout.force()
        .gravity(0.05)
        .distance(100)
        .charge(-100)
        .size([width, height]);

    d3.csv("/sites/all/libraries/d3.fd/snp-links.csv", function(error, links) {
     d3.csv("/sites/all/libraries/d3.fd/snp-genes.csv", function(error, nodes) {
      if (error) throw error;

      console.log(nodes);
      console.log(links);

      links.forEach(function(d) {
        d.source = +d.source;
        d.target = +d.target;
        if (typeof d.source == "number") { d.source = nodes[d.source]; }
        if (typeof d.target == "number") { d.target = nodes[d.target]; }
      });

      console.log(nodes);
      console.log(links);

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

/*
      node.append("image")
          .attr("xlink:href", "https://github.com/favicon.ico")
          .attr("x", -8)
          .attr("y", -8)
          .attr("width", 16)
          .attr("height", 16);
 */

      node.append("circle")
          .attr("r", 5)
          .attr("fill", function(d) { return color(d.group); });

      node.append("text")
          .attr("dx", 12)
          .attr("dy", ".35em")
          .text(function(d) { return d.name });

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
