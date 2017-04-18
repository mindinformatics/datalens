/**
 * @file
 * Javascript for Scatterplot.
 */
(function($) {

Drupal.d3.scattercsv = function (select, settings) {

      var svg = dimple.newSvg("#visualization", 900, 600);
      var real_fc  = function(x){ return (x>0 ? Math.pow(2,x) : -1/Math.pow(2,x)) };

      d3.csv("/sites/all/libraries/d3.scattercsv/MSBB_HIPP_Braak_CERAD.csv", function (data) {
       data = data.filter(function(d) { return d.PValue < 0.01 })
       data.forEach(function(d) {
            d.FC = real_fc(+d.logFC);
            d.FC1 = real_fc(+d.logFC1);

          });
       console.log(data);
        var myChart = new dimple.chart(svg, data);
        myChart.setBounds(60, 30, 800, 530)
        myChart.addMeasureAxis("x", "FC");
        myChart.addMeasureAxis("y", "FC1");
        //myChart.addMeasureAxis("z", "logFC");
        myChart.addSeries(["GeneSymbol", "PValue", "PValue1", "logFC1"], dimple.plot.bubble);
        //myChart.addLegend(200, 10, 360, 20, "right");
        myChart.draw();
      });

}

})(jQuery);
