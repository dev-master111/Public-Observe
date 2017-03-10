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
  var height=35;
  var radius=7;
  var Nfish=400;
  var location;
  var x1 = 7;
  for (var i = 0; i < Nfish; i++){
   // var x = randn_bm()*10, y = -1*Math.abs(randn_bm()*30), z = randn_bm()*10;
   //var theta = 2*Math.atan(radius/height);
   //theta/2*Math.PI;
   //var x = (((height-(height*Math.random())/height)* radius)*Math.cos(theta));
   var x= radius*Math.sin((2*Math.PI*i)/Nfish) + Math.random()*x1 - (x1 /2);
   //var y = (((height-(height*Math.random())/height)* radius)*Math.sin(theta));
   var y = -Math.random()*10 + -5;
   var z= radius*Math.cos((2*Math.PI*i)/Nfish) + Math.random()*x1 - (x1 /2);
    location = [x,y,z];
    fish_array.push(location);
  }
  return fish_array
}

function generateCage(radius,height){
    var numberPylons = 5;
    var toPlot = [];
    var x,y,z, constant;
    for(var i = 0; i < height; i=i+2){
        y = -i;
        if ( i % 10 ===0){
            constant = 10;
        } else {
            constant = 1;
        }
        for(var k = 0; k < numberPylons * constant; k++){
            x = radius*Math.sin((2*Math.PI*k)/numberPylons);
            z = radius*Math.cos((2*Math.PI*k)/numberPylons);
            toPlot.push([x,y,z]);
        }
    }
    return toPlot;
}
function generateCage2(radius,height){
    var numberPylons = 8;
    var toPlot = [];
    var cone = 10
    var x,y,z, constant;
    var r = radius;

    for(var i = 0; i < height + cone; i++){
        y = -i;
        if ( i % 10 ===0){
            constant = 10;
        } else {
            constant = 1;
        }
        if ( i > height ){
          radius = r * (1 - ((i-height) / cone));
        }
        for(var k = 0; k < numberPylons * constant; k++){
            x = radius*Math.sin((2*Math.PI*k)/numberPylons);
            z = radius*Math.cos((2*Math.PI*k)/numberPylons);
            toPlot.push([x,y,z]);
        }
    }
    return toPlot;
}

function generatefeeding(radius,height){
    var pipeLength = radius+1;
    var toPlot = [];
    var x,y,z
        for(var k = 0; k < pipeLength; k++){
            x = (-radius-1)+k;
            z = 0;
            y= 0
            toPlot.push([x,y,z]);
        }
    return toPlot;
}

function swimfish(inArray,radius){
    var fish_array = [];
  var height=35;
  var radius=10;
  var Nfish=400;
  var location;
  for (var i = 0; i < Nfish; i++){
   // var x = randn_bm()*10, y = -1*Math.abs(randn_bm()*30), z = randn_bm()*10;
   //var theta = 2*Math.atan(radius/height);
   //theta/2*Math.PI;
   //var x = (((height-(height*Math.random())/height)* radius)*Math.cos(theta));
   var x= radius*Math.sin((2*Math.PI*i)/Nfish) + 3*Math.random();
   //var y = (((height-(height*Math.random())/height)* radius)*Math.sin(theta));
   var y = -randn_bm()*4 + -5;
   var z= radius*Math.cos((2*Math.PI*i)/Nfish) + 3*Math.random();
    location = [x,y,z];
    fish_array.push(location);
  }
  return fish_array
}
    fish_array = generateScatter();
    feedingPipe=generatefeeding(14,25);
    pylons2 = generateCage2(14,15);
    pylons = generateCage(14,25);
    // Set up the chart

    chart = new Highcharts.Chart({
      colors: ['#7cb5ec', '#FF0000', '#90ed7d', '#434348', '#8085e9',
   '#f15c80', '#e4d354', '#2b908f', '#f45b5b', '#91e8e1'],
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
                    bottom: { size: 1 , color: 'rgba(0,0,0,0.02)' },
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
            min: -25,
            max: 0,
            title: null
        },
        xAxis: {
            min: -20,
            max: 20,
            gridLineWidth: 1
        },
        zAxis: {
            min: -20,
            max: 20,
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
        },{
            name: 'Cage',
            colorByPoint: false,
            data: pylons,
        },{
            name: 'Camera',
            colorByPoint: false,
            data: [[0,-7,0]]
        },{
            name: 'Feeding Pipe',
            colorByPoint: false,
            data: feedingPipe
        },
        ]
    });
    setInterval(function(){
      // Add two random numbers for each dataset
      fish_array = generateScatter();
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

      $('#launch-modal').click(function(){
          $("#modal-video").modal();
      });

      $('#fish_container').click(function(){
        var chart2 = new Highcharts.Chart({
          colors: ['#7cb5ec', '#FF0000', '#90ed7d', '#434348', '#8085e9',
       '#f15c80', '#e4d354', '#2b908f', '#f45b5b', '#91e8e1'],
            chart: {
                renderTo: 'fish_container2',
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
                        bottom: { size: 1 , color: 'rgba(0,0,0,0.02)' },
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
                min: -25,
                max: 0,
                title: null
            },
            xAxis: {
                min: -20,
                max: 20,
                gridLineWidth: 1
            },
            zAxis: {
                min: -20,
                max: 20,
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
            },{
                name: 'Cage',
                colorByPoint: false,
                data: pylons2
            },{
                name: 'Camera',
                colorByPoint: false,
                data: [[0,-7,0]]
            },{
                name: 'Feeding Pipe',
                colorByPoint: false,
                data: feedingPipe
            },
            ]
        });

        setInterval(function(){
          // Add two random numbers for each dataset
          fish_array = generateScatter();
          chart2.series[0].setData(fish_array,true,true,false);
        }, 1000);
        $(chart2.container).on('mousedown.hc touchstart.hc', function (eStart) {
            eStart = chart2.pointer.normalize(eStart);

            var posX = eStart.pageX,
                posY = eStart.pageY,
                alpha = chart2.options.chart.options3d.alpha,
                beta = chart2.options.chart.options3d.beta,
                newAlpha,
                newBeta,
                sensitivity = 5; // lower is more sensitive

            $(document).on({
                'mousemove.hc touchdrag.hc': function (e) {
                    // Run beta
                    newBeta = beta + (posX - e.pageX) / sensitivity;
                    chart2.options.chart.options3d.beta = newBeta;

                    // Run alpha
                    newAlpha = alpha + (e.pageY - posY) / sensitivity;
                    chart2.options.chart.options3d.alpha = newAlpha;

                    chart2.redraw(false);
                },
                'mouseup touchend': function () {
                    $(document).off('.hc');
                }
            });

          });

          $("#modal-scatter").modal();
      });
});
