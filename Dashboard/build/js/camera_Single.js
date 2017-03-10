var chart;
var fish_array
$(document).ready(function(){

    $(".toMakeSame").height($(".toMakeSame1").height())
    // Give the points a 3D feel by adding a radial gradient
    Highcharts.getOptions().colors = $.map(Highcharts.getOptions().colors, function (color) {
        return {
            radialGradient: {
                cx: 0.4,
                cy: 0.3,
                r: 0.5
            },
            stops: [
                [0, color],
                [1, Highcharts.Color(color).brighten(-0.2).get('rgb')]
            ]
        };
    });

    // Generating the fishes
    // Standard Normal variate using Box-Muller transform.
function randn_bm() {
    var u = 1 - Math.random(); // Subtraction to flip [0, 1) to (0, 1].
    var v = 1 - Math.random();
    return Math.sqrt( -2.0 * Math.log( u ) ) * Math.cos( 2.0 * Math.PI * v );
}

function generateScatter(){
  var fish_array = [];
  var location;
  for (var i = 0; i < 50; i++){
    var x = randn_bm()*10, y = -1*Math.abs(randn_bm()*30), z = randn_bm()*10;
    location = [x,y,z];
    fish_array.push(location);
  }
  return fish_array
}

function swimfish(inArray){
  for( var i = 0; i < inArray.length; i++){
    for (var k = 0; k < 3; k++){
      rnd = randn_bm();
      inArray[i][k] = inArray[i][k] + rnd;
      // So they cant swim out of the cage
      if (Math.abs(inArray[i][k]) > 23){
        inArray[i][k] = inArray[i][k] - 2*rnd;
      }
    }
  }
  return inArray;
}
    fish_array = generateScatter();

    // Set up the chart
    chart = new Highcharts.Chart({
        chart: {
            renderTo: 'fish_container',
            margin: 100,
            type: 'scatter',
            options3d: {
                enabled: true,
                alpha: 10,
                beta: 30,
                depth: 250,
                viewDistance: 5,
                fitToPlot: false,
                frame: {
                    bottom: { size: 1, color: 'rgba(0,0,0,0.02)' },
                    back: { size: 1, color: 'rgba(0,0,0,0.04)' },
                    side: { size: 1, color: 'rgba(0,0,0,0.06)' }
                }
            }
        },
        exporting: { enabled: false },
        title: {
            text: null, style: {display: 'none'}
        },
        subtitle: {
            text: null, style: {display: 'none'}
        },
        plotOptions: {
            scatter: {
                width: 10,
                height: 10,
                depth: 10
            }
        },
        yAxis: {
            min: -50,
            max: 0,
            title: null
        },
        xAxis: {
            min: -25,
            max: 25,
            gridLineWidth: 1
        },
        zAxis: {
            min: -25,
            max: 25,
            showFirstLabel: false
        },
        legend: {
            enabled: false
        },
        credits: {
      enabled: false
  },
        series: [{
            name: 'Salmon',
            colorByPoint: false,
            data: fish_array
        }]
    });

    setInterval(function(){
      // Add two random numbers for each dataset
      fish_array = swimfish(fish_array);
      chart.series[0].setData(fish_array,true,true,false);
    }, 1000);

    // Add mouse events for rotation
    $(chart.container).on('mousedown.hc touchstart.hc', function (eStart) {
        eStart = chart.pointer.normalize(eStart);

        var posX = eStart.pageX,
            posY = eStart.pageY,
            alpha = chart.options.chart.options3d.alpha,
            beta = chart.options.chart.options3d.beta,
            newAlpha,
            newBeta,
            sensitivity = 5; // lower is more sensitive

        $(document).on({
            'mousemove.hc touchdrag.hc': function (e) {
                // Run beta
                newBeta = beta + (posX - e.pageX) / sensitivity;
                chart.options.chart.options3d.beta = newBeta;

                // Run alpha
                newAlpha = alpha + (e.pageY - posY) / sensitivity;
                chart.options.chart.options3d.alpha = newAlpha;

                chart.redraw(false);
            },
            'mouseup touchend': function () {
                $(document).off('.hc');
            }
        });

});

$('#Intensity').slider({
    id: 'slider22',
    min: 0,
    max: 200,
    step: 1,
    value: 14,
    rangeHighlights: [{ "start": 180, "end": 190 }]});
$('#Amount').slider({
    id: 'slider23',
    min: 0,
    max: 200,
    step: 1,
    value: 14,
    rangeHighlights: [{ "start": 180, "end": 190 }]});
});// Moving chartMaxDat
