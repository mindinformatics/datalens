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

    var pValue = 0.05;
    var FCValue = 1.5;

    var dataFile = "/sites/all/themes/scf_theme/BubbleChart/microglia-genes-m0-B3-B1.csv";

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
          //console.log('d ' + d);
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

    var updateFilters = function(dataSet){

      // uncheck parents, removes children
      // UNIMPELMENTED !
      // no recursive or multi-tiered updating for now!

      console.log('dataSet');
      console.log(dataSet);
      // use a filtered dataMap based on sliders but not checkboxes (otherwise when an item is unchecked, it disappears and cannot be rechecked)
      var dataSlider = jQuery.extend(true, new Array(), rows.filter(function(d){ return d.name != "NA" && d.LogFC != "NA" && d.size != "NA" && d.PValue != "NA" && d.AdjPValue != "NA" && d.PValue < pValue && Math.abs(real_fc(d.LogFC)) < FCValue }));
      var dataMapSlider = dataSlider.reduce(function(map, node) {
          map[node.name] = node;
          return map;
        }, {});

      var dataSliderTree = [];

      dataSlider.forEach(function(node) {
          // add to parent
          var parent = dataMapSlider[node.parent];
          if (parent) {
            // create child array if it doesn't exist
            (parent.children || (parent.children = []))
              // add node to child array
              .push(node);
          } else {
            // parent is null or missing
            dataSliderTree.push(node);
          }
        });


      // check constrast
      var checkboxes = $(".cbox.contrast");
      for(var element in checkboxes){
        if(!isNaN(element)){
          // get value of checkbox
          var value = checkboxes[element].value;
          // turn off
          checkboxes[element].parentElement.style.display = "none";

          for(var i=0; i<dataSlider.length; i++){
            if(dataSlider[i].Contrast == value) {
              checkboxes[element].parentElement.style.display = "";
              break;
            }
          }
        }
      };

      // check data type
      var checkboxes = $(".cbox.dataType");
      for(var element in checkboxes){
        if(!isNaN(element)){
          // get value of checkbox
          var value = checkboxes[element].value;
          // turn off
          checkboxes[element].parentElement.style.display = "none";

          for(var i=0; i<dataSlider.length; i++){
            if(dataSlider[i].DataType == value) {
              checkboxes[element].parentElement.style.display = "";
              break;
            }
          }
        }
      };

      // check study
      var checkboxes = $(".cbox.study");
      for(var element in checkboxes){
        if(!isNaN(element)){
          // get value of checkbox
          var value = checkboxes[element].value;
          // turn off
          checkboxes[element].parentElement.style.display = "none";

          for(var i=0; i<dataSlider.length; i++){
            if(dataSlider[i].Study == value) {
              checkboxes[element].parentElement.style.display = "";
              break;
            }
          }
        }
      };

      // check for brain region
      var checkboxes = $(".cbox.brainRegion");
      for(var element in checkboxes){
          if(!isNaN(element)){
            // get value of checkbox
            var value = checkboxes[element].value;

            console.log(value);
            // turn off
            checkboxes[element].parentElement.style.display = "none";

            for(var i=0; i<dataSlider.length; i++){
            if(dataSlider[i].BrainRegion == value) {
              checkboxes[element].parentElement.style.display = "";
              break;
            }
          }
        }
    };
}
    // Processing Data *********************************************************************************************************************************************
    var data, data2, dataMap, emptyDataMap, emptyTree, node, groups, circles, titles, tooltips, parentPaths, parentTitles;

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

    // comment out this part - loads CSV for testing outside of Drupal environment
    var loadCSV = function() {
      d3.csv(dataFile, function(error, dataIn){
        data = dataIn;
        console.log('data');
        console.log(data);
        data.forEach(function(d) {
          d.LogFC = +d.LogFC;
          d.PValue = +d.PValue;
          d.AdjPValue = +d.AdjPValue;
        });

        updateChart();
      });
    };

    var updateChart = function() {
      d3.selectAll("svg").selectAll("g.node").remove();

      console.log('rows');
      console.log(rows);

//    var data2 = rows.filter(function(d){ return  d.PValue < pValue && Math.abs(real_fc(d.LogFC)) < FCValue && checkBoxMatch(d)});
      var genes = jQuery.extend(true, new Array(),
      rows.filter(function(d) {return d.Study &&  d.PValue < pValue && Math.abs(real_fc(d.LogFC)) > FCValue && checkBoxMatch(d)}));

      console.log('genes');
      console.log(genes);

      // Create a map of objects
      dataMap = jQuery.extend(true, new Array(), rows.reduce(function(map, node) {
            map[node.name] = node;
            return map
        }, {}));

      console.log('dataMap');
      console.log(dataMap);
      console.log('dataMap');

      // Find genes with distinct parents

      var unique = {};
      var distinctGenes = [];
      genes.forEach(function (d) {
        if (!unique[d.parent]) {
          distinctGenes.push(d);
          unique[d.parent] = true;
        }
      });


      console.log('distinctGenes');
      console.log(distinctGenes);

      // Add the parents of these genes with distinct parents
      var parents=[];
      function getParents(node) {
          if (node.parent != "null") {
            //console.log(node.parent);
             parent = dataMap[node.parent]
             if(parents.indexOf(parent) == -1) {
                parents.push(parent);
              }
             return (getParents(parent));
          }
          else {
           return;
         }
      }

      distinctGenes.forEach(getParents);
      console.log('parents');
      console.log(parents);

      // Concatenate genes with parents

      var data2 = genes.concat(parents);

      // create the tree array

      var treeData = [];

      data2.forEach(function(node) {
          //console.log(node.parent);
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

       console.log("treeData");
       console.log(treeData);


      // Graphing *********************************************************************************************************************************************
      root = treeData[0];
      console.log('root');
      console.log(root);

      node = svg.datum(root).selectAll(".node")
              .data(pack.nodes);

      console.debug('node');
      console.debug(node);

      pack.value(function(d){return d.size;} );
      pack.nodes(root);

      groups = node.enter().append("g")
            .attr("class", function(d) { return d.children ? "node" : "leaf node"; })
            .attr("transform", function(d) { return "translate(" + d.x + "," + d.y + ")"; });


      // groups.transition().duration(2000)
      //     .attr("transform", function(d) { return "translate(" + d.x + "," + d.y + ")"; });

      tooltips = groups.append("title")
            //(d.children ? "" : ": " + format(d.size)
            .html(function(d) { return (d.children ? d.name : d.name + "<br/>" + "FC: " + real_fc(d.LogFC) + "<br/>" + "P-value: " + d.PValue + "<br/>" + "Adjusted P-value: " + d.AdjPValue + "<br/>" + "Study: " + d.Study) });


      // Color Map

      var max_fc = real_fc(d3.max( data2, function(d) { return d.LogFC }));
      max_fc= max_fc > 1 ? max_fc : 1;
      console.debug(max_fc);

      var min_fc = real_fc(d3.min( data2, function(d) { return d.LogFC }));
      min_fc = min_fc < -1 ? min_fc : -1;
      console.debug(min_fc);

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

/*
     circles.transition().duration(2000)
           .attr("r", function(d) { return d.children ? 0.95 * d.r : d.r; }) //0.909090909
           .style('fill-opacity', function(d) { return ( (d.children || d.r<1) ? '.07' : '.6' ); })
           .style('stroke', function(d){ return d.children ? '#000' : 'none'});
*/


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
                // .style("text-shadow", "-1px 0 #cecece, 0 2px #cecece, 1px 0 #cecece, 0 -0px #e0e0e0") // left, bottom, right, top
            .append("textPath")
                .attr("xlink:href",function(d,i){return "#s"+i;})
                .attr("startOffset",function(d){return "28%";})
                .text(function(d) {
                  if(d.parent.name != "WB")
                    return ( (d.r > 30 && d.parent.r / d.r > 1.4) ? d.name : "" );
                  else
                    return (d.r > 30 ? d.name : "");
                });

     updateFilters(genes);
    };

    updateChart();

    d3.select(self.frameElement).style("height", diameter + "px");
  }

})(jQuery);

