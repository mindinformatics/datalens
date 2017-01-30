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
	rows = settings.rows;


    var pValue = 0.1;
    var FCValue = 3.52;
    // var dataFile = "/sites/all/themes/scf_theme/BubbleChart/microglia-genes-m1-B2-B1.csv";
    // var dataFile = "/sites/all/themes/scf_theme/BubbleChart/microglia-genes-m0-B2-B1.csv";
    var dataFile = "/sites/all/themes/scf_theme/BubbleChart/microglia-genes-m0-B3-B1.csv";
    // var dataFile = "/sites/all/themes/scf_theme/BubbleChart/microglia-genes-m1-B2-B1.csv";
    // var dataFile = "/sites/all/themes/scf_theme/BubbleChart/microglia-genes-m1-B3-B1.csv";
    // var dataFile = "/sites/all/themes/scf_theme/BubbleChart/microglia-genes-m2-B2-B1.csv";
    // var dataFile = "/sites/all/themes/scf_theme/BubbleChart/microglia-genes-m2-B2-B1.csv";
    // var dataFile = "/sites/all/themes/scf_theme/BubbleChart/Microglia-out-B2-B1.csv";
    // var dataFile = "/sites/all/themes/scf_theme/BubbleChart/Microglia-out-B3-B1.csv";
    // var dataFile = "/sites/all/themes/scf_theme/BubbleChart/Microglia-out-B3-B2.csv";
    // var dataFile = "/sites/all/themes/scf_theme/BubbleChart/Hyman-all-out.csv";

    var real_fc  = function(x){ return (x>0 ? Math.pow(2,x) : -1/Math.pow(2,x)) };


    // pValue Slider ****************************************************************************************************************************************************************************
    // Axis
    var pValue_x_min = 1e-8; //1e0
    var pValue_x_max = 1e-1; //1e-6 (for a reason I didn't look into, needs a spread of at least 10^6 to render correctly)

    var margin = {top: 10, right: 10, bottom: 20, left: 10},
    width = $("#PValue").width() - margin.left - margin.right,
    height = 0;//$("#PValue").height() - margin.top - margin.bottom - $("#sliderPVal").height();

    var superscript = "⁰¹²³⁴⁵⁶⁷⁸⁹", superscriptMinus = "⁻",
        formatPower = function(d) { return (d + "").split("").map(function(c) { return superscript[c]; }).join(""); };


    var pValue_x = d3.scale.log()
        .domain([pValue_x_min, pValue_x_max])
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
    $("#sliderPVal").attr({ "max" : 1*Math.log10(pValue_x_max), "min" : 1*Math.log10(pValue_x_min), "value" : pValue, "step" : .0001 });

    var sliderOutput = function(x){ return Math.pow(10,x); };
    var sliderInput  = function(x){ return (Math.log10(x))};

    $("#sliderPVal").on("input", function(){
      $("#PValText").val( sliderOutput( $("#sliderPVal").val()).toFixed( -1*Math.log10(pValue_x_min) ).replace(/\.?0+$/, '') );
      pValue = sliderOutput( $("#sliderPVal").val());

    });
    $("#sliderPVal").on("change", function(){ updateChart(); });

    // Textfield
    $("#PValText").val( pValue.toFixed( -1*Math.log10(pValue_x_min) ).replace(/\.?0+$/, '' ) ); // set initial value

    var pUpdate = function(){
      pValue = Number( $("#PValText").val() );
      $("#sliderPVal").val(sliderInput(pValue));
      updateChart();
    };

    $("#PValText").focusout( function(e){
      pUpdate();
    });

    $("#PValText").keypress(function(e) {
        if(e.which == 13) {
            pUpdate();
        }
    });


    // FCValue Slider ********************************************************************************************************************************************************************************************
    // Axis
    var fc_min = 1, fc_max = Math.ceil(real_fc(3.51671876)); // regular FC Value -> 3.51671876;
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
      FCValue = Number($("#sliderFCVal").val());
      $("#FCValText").val(FCValue);
    });
    $("#sliderFCVal").on("change", function(event){ updateChart(); });

    // Textfield
    $("#FCValText").val(FCValue); // set initial value

    var fcUpdate = function(){
      FCValue = Number( $("#FCValText").val() );
      $("#sliderFCVal").val(FCValue);
      updateChart();
    };

    $("#FCValText").focusout( function(e){
      fcUpdate();
    });
    $("#FCValText").keypress(function(e) {
        if(e.which == 13) {
            fcUpdate();
        }
    });

    // Legend for FC Value colors ********************************************************************************************************************************************************************************************
    var legendMargin = { top: 20, bottom: 20, left: 20, right: 20 };

    // use same margins as main plot
    var margin = { top: 20, bottom: 20, left: 30, right: 20 };
    var legendWidth = 10;
    var legendHeight = 200;
    var legendFullWidth = 100;
    var legendFullHeight = legendHeight + margin.bottom + margin.top;

    var legendSvg = d3.select('#legend').append("svg")
        .attr('width', legendFullWidth)
        .attr('height', legendFullHeight)
        .append('g')
        .attr('transform', 'translate(' + legendMargin.left + ',' +
        legendMargin.top + ')');

    // update the color scale, restyle the plot points and legend
    function updateColorLegend(scale, minVal, maxVal) {
        // create color scale
        var colorScale = d3.scale.linear()
            .domain(linspace(minVal, maxVal, scale.length))
            .range(scale);

        // clear current legend
        legendSvg.selectAll('*').remove();

        // append gradient bar
        var gradient = legendSvg.append('defs')
            .append('linearGradient')
            .attr('id', 'gradient')
            .attr('x1', '0%') // bottom
            .attr('y1', '100%')
            .attr('x2', '0%') // to top
            .attr('y2', '0%')
            .attr('spreadMethod', 'pad');

        // programatically generate the gradient for the legend
        // this creates an array of [pct, color] pairs as stop
        // values for legend
        var pct = linspace(0, 100, scale.length).map(function(d) {
            return Math.round(d) + '%';
        });

        var colorPct = d3.zip(pct, scale);

        colorPct.forEach(function(d) {
            gradient.append('stop')
                .attr('offset', d[0])
                .attr('stop-color', d[1])
                .attr('stop-opacity', .6);
        });

        legendSvg.append('rect')
            .attr('x1', 0)
            .attr('y1', 0)
            .attr('width', legendWidth)
            .attr('height', legendHeight)
            .style('fill', 'url(#gradient)');

        // create a scale and axis for the legend
        var legendScale = d3.scale.linear()
            .domain([minVal, maxVal])
            .range([legendHeight, 0]);

        var max_value = Math.ceil(maxVal);

        var legendAxis = d3.svg.axis()
            .scale(legendScale)
            .orient("right")
            .tickValues(d3.range(minVal, max_value))
            .ticks(10, function(d) {
              return d;
            });

        legendSvg.append("g")
            .attr("class", "legend axis")
            .attr("transform", "translate(" + legendWidth + ", 0)")
            .call(legendAxis);

        legendSvg.append("text")
          .attr("class", "y label")
          .attr("text-anchor", "end")
          .attr("y", 6)
          .attr("dy", "-.75em")
          .attr("transform", "rotate(-90)")
          .text("FC Value");
    }

    function linspace(start, end, n) {
        var out = [];
        var delta = (end - start) / (n - 1);

        var i = 0;
        while(i < (n - 1)) {
            out.push(start + (i * delta));
            i++;
        }

        out.push(end);
        return out;
    }


    // Selections - Checkbox filtering *********************************************************************************************************************************************
    // store checkboxes
    var checkboxFilters = {};

    var onCheckboxFilterChange = function (event){
      // console.log('checkbox ' + event + ' ' + this.checked + ' ' + this.value);
      updateChart();
    };

    var isData = function(d){
      if(d.Study && d.Contrast && d.DataType && d.parent) return true;
      else return false;
    };

    // checks if there is a checkbox in the UI for the data (at the time of loading the app)
    // NOTE: check box may be invisible, just needs to be in the DOM
    var hasCheckboxInUI = function (d) {
      var hasStudy = false, hasContrast = false, hasDataType = false, hasBrainRegion = false;

      if(isData(d)    )//&& checkBoxExists(d))
      {
        hasStudy = typeof(checkboxFilters['Study'][d.Study]) != "undefined";
        hasContrast = typeof(checkboxFilters['Contrast'][d.Contrast]) != "undefined";
        hasDataType = typeof(checkboxFilters['DataType'][d.DataType]) != "undefined";
        hasBrainRegion = typeof(checkboxFilters['parent'][d.parent]) != "undefined";
        return hasStudy && hasBrainRegion && hasContrast && hasDataType;
      }

      // if it's hierarchy and not data, pass it as 'having a checkbox'
      else return true;
    };

    var checkBoxMatch = function(d){
      var isStudy = false, isContrast = false, isDataType = false, isBrainRegion = false;

      if(isData(d))
      {
        if(hasCheckboxInUI(d))
        {
          isStudy = checkboxFilters['Study'][d.Study].checked;
          isContrast = checkboxFilters['Contrast'][d.Contrast].checked;
          isDataType = checkboxFilters['DataType'][d.DataType].checked;
          isBrainRegion = checkboxFilters['parent'][d.parent].checked;
          return isStudy && isBrainRegion && isContrast && isDataType;
        }
        // if no checkbox in UI for the data (at the time of loading the app), don't graph the data (can reverse default)
        else return false;
      }

      // if it's hierarchy and not data, pass it as 'matched'
      else return true;
    };

    checkboxFilters['Study'] = {};
    $(".cbox.study").each(function(){
        // set checked initially
        this.checked = true;
        // listen for a change
        this.onchange = onCheckboxFilterChange;
        // add DOM element to the key/object for later lookup
        checkboxFilters['Study'][ this.value ] = this; //element.value().toString().replace(/\s+/g, '');
    });

    checkboxFilters['parent'] = {};
    $(".cbox.brainRegion").each(function(){
        this.checked = true;
        this.onchange = onCheckboxFilterChange;
        checkboxFilters['parent'][ this.value ] = this;
    });

    checkboxFilters['Contrast'] = {};
    $(".cbox.contrast").each(function(){
        this.checked = true;
        this.onchange = onCheckboxFilterChange;
        checkboxFilters['Contrast'][ this.value ] = this;
    });

    checkboxFilters['DataType'] = {};
    $(".cbox.dataType").each(function(){
        this.checked = true;
        this.onchange = onCheckboxFilterChange;
        checkboxFilters['DataType'][ this.value ] = this;
    });






    // Processing Data *********************************************************************************************************************************************
    var data, emptyDataMap, emptyTree, node, groups, circles, titles, tooltips, parentPaths, parentTitles;

    var root;

    var diameter = 880, //960,
    format = d3.format(",d");

    var pack = d3.layout.pack()
      .size([diameter - 4, diameter - 4])
      .value(function(d) { return d.size; })
      .padding(0);

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
      // if(
      //     (
      //       // check all studies selected
      //       //checkBoxMatch(d)
      //       //&&
      //       d.PValue <= pValue
      //       &&
      //       real_fc(Math.abs(d.LogFC)) <= FCValue
      //     )
      //     ||
      //     d.Study == ""
      //   )
        return d.size;
      // else
      //   // return d.size;
      //   return 0.0001; // approximately zero, but actually zero screws up packing function
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
      var dataMap = rows.reduce(function(map, node) {
        map[node.name] = node;
        return map;
      }, {});
      emptyDataMap = jQuery.extend(true, {}, dataMap); // store the datamap for reuse when making changes to data, later.

      console.log('datamap');
      console.log(dataMap);

      // create the tree array
      var treeData = [];
      //rows.filter(function(d){ return d.name != "NA" && d.LogFC != "NA" && d.size != "NA" && d.PValue != "NA" && d.AdjPValue != "NA" && d.PValue < pValue && Math.abs(real_fc(d.LogFC)) < FCValue && checkBoxMatch(d)})
      rows.filter(function(d){ return d})
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

      // data[0].children.splice(0,1);

      // comb through the code and remove any tree structure without children (besides leaves)
      function trimUnusedParents(root) {
          // cleanedData = jQuery.extend(true, {}, root);// copy empty treeData for reuse later
          function recurse(name, node) {
              if (node.children) node.children.forEach(function (child) {
                recurse(node.name, child);
              });
              // if it's not a leaf node, but it has no children... (and it's not the root node)
              if(!node.Study && !node.children)
              {
                // then remove from parent
                // search through data for node matching the parent
                var parentNode;
                for(var i=0; i<data.length; i++)
                {
                  if(data[i].name == node.parent)
                  {
                    parentNode = data[i];
                  }
                }
                if(!parentNode)
                    console.log('no match?');
                // search through the parent's children for a match to the childless node
                for (i=0; i<parentNode.children.length; i++)
                {
                  if(parentNode.children[i].name == node.name)
                    parentNode.children.splice(i,1);

                    // recheck if parent became childless
                    // recurse(parentNode.name, parentNode); // <-- exceeds max call stack
                };
              }
          };

          // the last tier lingers, manually remove it! (recursive calls exceed maximus stack size)
          for(var k=0; k<root.children.length; k++){
            if(
              root.children[k].name === "Frontal lobe" ||
              root.children[k].name === "Temporal lobe" ||
              root.children[k].name === "Limbic system" ||
              root.children[k].name === "Striatum" ||
              root.children[k].name === "Cingulum" ||
              root.children[k].name === "Occipital Visual Cortex" ||
              root.children[k].name === "Middle Temporal Gyrus" ||
              root.children[k].name === "Amygdala" ||
              root.children[k].name === "Caudate Nucleus" ||
              root.children[k].name === "Prefrontal Cortex" ||
              root.children[k].name === "Hippocampus" ||
              root.children[k].name === "Inferior Frontal Gyrus" ||
              root.children[k].name === "Inferior Temporal Gyrus" ||
              root.children[k].name === "Posterior Cingulate Cortex" ||
              root.children[k].name === "Precentral Gyrus" ||
              root.children[k].name === "Parahippocampal Gyrus" ||
              root.children[k].name === "Putamen" ||
              root.children[k].name === "Superior Parietal Lobule" ||
              root.children[k].name === "Superior Temporal Gyrus" ||
              root.children[k].name === "Temporal Pole" ||
              root.children[k].name === "Temporal Cortex" ||
              root.children[k].name === "Anterior Cingulate" ||
              root.children[k].name === "Cerebellum" ||
              root.children[k].name === "Dorsolateral Prefrontal Cortex" ||
              root.children[k].name === "Frontal Pole" ||
              root.children[k].name === "Nucleus Accumbens" ||
              root.children[k].name === "Parietal lobe" ||
              root.children[k].name === "Occipital lobe"
            )
            {
              if(!root.children[k].children || root.children[k].children.length<1)
                root.children.splice(k,1);
            };
          };
          recurse(null, root);
          return root;;
      };

      root = trimUnusedParents((treeData[0])); // run through a few times because it might make a parent no longer have children (multiple tiers), and a recursive algorythm keeps running over maximum stack size due to large dataset
      root = trimUnusedParents(root);
      root = trimUnusedParents(root);
      root = trimUnusedParents(root);
      root = trimUnusedParents(root);

      // Graphing *********************************************************************************************************************************************
      // root = treeData[0];
      console.log('root');
      console.log(root);

      node = svg.datum(root).selectAll(".node")
              .data(pack.nodes);
              ////console.debug(node);

      pack.value( userInputFilter );
      pack.nodes(root);

      groups = node.enter().append("g")
            .attr("class", function(d) { return d.children ? "node" : "leaf node"; })
            .attr("transform", function(d) { return "translate(" + d.x + "," + d.y + ")"; });

      tooltips = groups.append("title")
            //(d.children ? "" : ": " + format(d.size)
            .html(function(d) { return (d.children ? d.name : d.name + "<br/>" + "FC: " + real_fc(d.LogFC) + "<br/>" + "P-value: " + d.PValue + "<br/>" + "Adjusted P-value: " + d.AdjPValue + "<br/>" + "Study: " + d.Study) });


      // Color Map
      // var data_points = d3.entries(dataMap);
      // console.log("data_points");
      // console.log(data_points);
      // var max_fc = d3.max( data_points, function(d) { return d['value']['LogFC'] });
  	  var max_fc = real_fc(d3.max( data, function(d) { return d.LogFC }));
      ////console.debug(max_fc);
      // var min_fc = d3.min( data_points, function(d) { return d['value']['LogFC'] });
  	  var min_fc = real_fc(d3.min( data, function(d) { return d.LogFC }));
      ////console.debug(min_fc);
      var color_scale = d3.scale.linear().domain([min_fc, max_fc]).range(['#253494', '#bd0026']);
      // console.log('color');
      // console.log(color_scale(max_fc));

      updateColorLegend(['#253494', '#bd0026'], min_fc, max_fc);

      circles = node.filter(function(d){ return !( d.name == "WB" ); }).append("circle")
          .attr("r", function(d) { return d.children ? 0.95 * d.r : d.r; }) //0.909090909
          .style('fill', function(d) { return (d.children ? "#000" : color_scale(real_fc(d.LogFC))); })
          // .style('fill-opacity', function(d) { return ( d.children ? '0' : '.6' ); })
          .style('fill-opacity', function(d) { return ( (d.children || d.r<1) ? '.07' : '.6' ); })
          // .style('stroke', function(d){ return d.children ? '#000' : 'none'})
          .style('stroke-opacity','.1')
          .style('stroke-width', '10px');


      ////console.debug(node);


      // RENDERING TEXT

      //If no children, display title like this
      titles = node.filter(function(d) { return !(d.children); }).append("text")
          // .attr("dy", ".2em")
          .attr("dy", ".33em")
          .style("text-anchor", "middle")
          .style("font-size", function(d) { return Math.min( d.r, 8 ) + "px" })
          .text(function(d) {
            if(d.name != "WB")
              return d.name.substring(0, d.r * 0.4);
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
                // .attr("dy", function(d){ return Math.max(0.909090909 * d.r + 10)+"px"})
                .attr("dy", function(d){ return (.001 * d.r)+"em"})
                .style("text-anchor", "middle")
                .style("font-size", function(d) { return Math.min(12, (Math.max( 0.2 * d.r, 11)) ) + "px" })
                // .style("font-weight", function(d) { return (0.2 * d.r > 12 ? 'Regular' : '600')})
                //.style("text-shadow", "-1px 0 #cecece, 0 2px #cecece, 1px 0 #cecece, 0 -0px #e0e0e0") // left, bottom, right, top
            .append("textPath")
                .attr("xlink:href",function(d,i){return "#s"+i;})
                .attr("startOffset",function(d){return "28%";})
                .text(function(d) {
                  if(d.parent.name != "WB")
                    return ( (d.r > 30 && d.parent.r / d.r > 1.4) ? d.name : "" );
                  else
                    return (d.r > 30 ? d.name : "");
                });
    };

    var updateChart = function() {

      d3.selectAll("svg").selectAll("g.node").remove();
      d3.csv(dataFile, load);

      // pack.value( userInputFilter );
      // pack.nodes(root);

      // circles.transition().duration(2000)
      //     .attr("r", function(d) { return d.children ? 0.95 * d.r : d.r; }) //0.909090909
      //     .style('fill-opacity', function(d) { return ( (d.children || d.r<1) ? '.07' : '.6' ); })
      //     .style('stroke', function(d){ return d.children ? '#000' : 'none'});

      // groups.transition().duration(2000)
      //     .attr("transform", function(d) { return "translate(" + d.x + "," + d.y + ")"; });

      // tooltips
      //     .html(function(d) { return (d.children ? d.name : d.name + "<br/>" + "FC: " + d.LogFC + "<br/>" + "P-value: " + d.PValue + "<br/>" + "Adjusted P-value: " + d.AdjPValue + "<br/>" + "Study: " + d.Study) });

      // // RENDERING TEXT
      // //If no children, display title like this
      // titles
      //     .style("font-size", function(d) { return Math.min( d.r, 8 ) + "px" })
      //     .text(function(d) { return d.name.substring(0, d.r * 0.4); });

      // //If has children
      // parentPaths
      //     .attr("id", function(d,i){return "s"+i;})
      //     .attr("fill","none")
      //     .attr("d", arc);

      // parentTitles
      //       .attr("xlink:href",function(d,i){return "#s"+i;})
      //       .attr("startOffset",function(d){return "28%";})
      //       .style("text-anchor", "middle")
      //       .text(function(d) {
      //         return ( (d.r > 30 && d.parent.r / d.r > 1.4) ? d.name : "" );
      //         // return (d.r > 30 ? d.name : "");
      //       })
      //       .attr("dy", function(d){ return (.005 * d.r)+"em"})
      //       .style("font-size", function(d) { return Math.min(16, (Math.max( 0.2 * d.r, 11)) ) + "px" });
    };


    d3.csv(dataFile, load);
    // load(null, newData);


    d3.select(self.frameElement).style("height", diameter + "px");
  }

})(jQuery);
