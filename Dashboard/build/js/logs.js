$(document).ready(function(){

  $(".toMakeSame").height($(".toMakeSame1").height());

  var canvas = document.getElementById('Tupdating-chart');
  var ctxT = canvas.getContext('2d');
  var canvas = document.getElementById('Dupdating-chart');
  var ctxD = canvas.getContext('2d');
  var canvas = document.getElementById('Supdating-chart');
  var ctxS = canvas.getContext('2d');
  var canvas = document.getElementById('Fupdating-chart');
  var ctxF = canvas.getContext('2d');


  var labelss = [],
  TempetureData = [],
  FeedingData = [],
  SalinitData = [],
  DisovlData = [];

  function randn_bm() {
      var u = 1 - Math.random(); // Subtraction to flip [0, 1) to (0, 1].
      var v = 1 - Math.random();
      return Math.sqrt( -2.0 * Math.log( u ) ) * Math.cos( 2.0 * Math.PI * v );
  }

  function generateData(points){
    var SMean = 35, SVar = 2;
    var TMean = 10, TVar = 2;
    var DMean = 13, DVar = 5;

    for( var i = 0; i < points; i++){
      labelss.push(i);
      TempetureData.push(randn_bm()*TVar + TMean);
      SalinitData.push(randn_bm()*SVar + SMean);
      DisovlData.push(randn_bm()*DVar + DMean);
      FeedingData.push(randn_bm()*10 + 150);
    }
  }

  generateData(50);
  var TemperatureData = {
      labels: labelss,
      datasets: [
          {
              fillColor: "rgba(220,220,220,0.2)",
              strokeColor: "rgba(220,220,220,1)",
              pointColor: "rgba(220,220,220,1)",
              pointStrokeColor: "#fff",
              data: TempetureData
          },
      ]
    };
  var FeedData = {
      labels: labelss,
      datasets: [
          {
              fillColor: "rgba(220,220,220,0.2)",
              strokeColor: "rgba(220,220,220,1)",
              pointColor: "rgba(220,220,220,1)",
              pointStrokeColor: "#fff",
              data: FeedingData
          },
      ]
    };
  var DisolvedOxyData = {
      labels: labelss,
      datasets: [
          {
              fillColor: "rgba(220,220,220,0.2)",
              strokeColor: "rgba(220,220,220,1)",
              pointColor: "rgba(220,220,220,1)",
              pointStrokeColor: "#fff",
              data: DisovlData
          },
      ]
    };
  var SalinityData = {
      labels: labelss,
      datasets: [
          {
              fillColor: "rgba(220,220,220,0.2)",
              strokeColor: "rgba(220,220,220,1)",
              pointColor: "rgba(220,220,220,1)",
              pointStrokeColor: "#fff",
              data: SalinitData
          },
      ]
    };

  // Reduce the animation steps for demo clarity.
  var myLiveChartT = new Chart(ctxT).Line(TemperatureData, {animationSteps: 15});
  var myLiveChartD = new Chart(ctxD).Line(DisolvedOxyData, {animationSteps: 15});
  var myLiveChartS = new Chart(ctxS).Line(SalinityData, {animationSteps: 15});
  var myLiveChartF = new Chart(ctxF).Line(FeedData, {animationSteps: 15});

});
