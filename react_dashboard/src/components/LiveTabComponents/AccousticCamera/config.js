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

var data = generateScatter();
var config = {
    chart: {
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
    plotOptions: {
        scatter: {
            width: 10,
            height: 10,
            depth: 10
        }
    },
    yAxis: {
        min: 0,
        max: 10,
        title: null
    },
    xAxis: {
        min: 0,
        max: 10,
        gridLineWidth: 1
    },
    zAxis: {
        min: 0,
        max: 10,
        showFirstLabel: false
    },
    legend: {
        enabled: false
    },
    series: [{
        name: 'Salmon',
        colorByPoint: true,
        data : data,
    }]
}

module.exports = config;
