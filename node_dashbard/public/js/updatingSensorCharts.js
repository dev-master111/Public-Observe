// UPDATE GRAPHS
$(document).ready(function(){

  var canvas = document.getElementById('updating-chart');
  var ctx = canvas.getContext('2d');
  var TemperatureData = {
      labels: [1, 2, 3, 4, 5, 6, 7],
      datasets: [
          {
              fillColor: "rgba(220,220,220,0.2)",
              strokeColor: "rgba(220,220,220,1)",
              pointColor: "rgba(220,220,220,1)",
              pointStrokeColor: "#fff",
              data: [7, 7.8, 7.85, 7.9, 7.2, 7.3, 7]
          },
      ]
    };
  var DisolvedOxyData = {
      labels: [1, 2, 3, 4, 5, 6, 7],
      datasets: [
          {
              fillColor: "rgba(220,220,220,0.2)",
              strokeColor: "rgba(220,220,220,1)",
              pointColor: "rgba(220,220,220,1)",
              pointStrokeColor: "#fff",
              data: [9, 8.8, 8.85, 8.9, 9.2, 9.3, 9]
          },
      ]
    };
  var SalinityData = {
      labels: [1, 2, 3, 4, 5, 6, 7],
      datasets: [
          {
              fillColor: "rgba(220,220,220,0.2)",
              strokeColor: "rgba(220,220,220,1)",
              pointColor: "rgba(220,220,220,1)",
              pointStrokeColor: "#fff",
              data: [32, 32.6, 33, 33.2, 32.5, 32.5, 32.2]
          },
          {
              fillColor: "rgba(220,220,220,0.2)",
              strokeColor: "rgba(220,220,220,1)",
              pointColor: "rgba(220,220,220,1)",
              pointStrokeColor: "#fff",
              data: [33, 32.6, 34, 32.2, 32.5, 34.9, 32.2]
          },
          {
              fillColor: "rgba(220,220,220,0.2)",
              strokeColor: "rgba(220,220,220,1)",
              pointColor: "rgba(220,220,220,1)",
              pointStrokeColor: "#fff",
              data: [31, 32.6, 31, 32.2, 31.5, 31.5, 31.2]
          }
      ]
    };
  var startingData = TemperatureData;
  var latestLabel = startingData.labels[6];
  var Salinity = false;
// Reduce the animation steps for demo clarity.
var myLiveChart = new Chart(ctx).Line(startingData, {animationSteps: 15});
var x = 1, offset = 9.5;
setInterval(function(){
  var data;
  if(Salinity){
    data = [[Math.random()*x+offset],[Math.random()*x+offset],[Math.random()*x+offset]];
  } else {
    data = [Math.random()*x+offset]
  }
  myLiveChart.addData(data, ++latestLabel);
  // Remove the first point so we dont just add values forever
  myLiveChart.removeData();
}, 6000);

var upDate = function(){
  $('#updating-chart').remove(); // this is my <canvas> element
  $('#canvaswrapperDiv').append('<canvas id="updating-chart" width="500" height="200"></canvas>');
  var value = $('input[name="data"]:checked').val();
  var canvas = document.getElementById('updating-chart');
  var ctx = canvas.getContext('2d');
  Salinity = false;
  if ( value == "T") {
    startingData = TemperatureData;
    offset = 7;
    x =1;
  } else if (value == "D") {
    startingData = DisolvedOxyData;
    offset = 8.5;
    x =1;
  } else if (value == "S") {
    startingData = SalinityData;
    offset = 32;
    x = 5;
    Salinity = true;
  } else {
    console.log("Not a correct Radio Button");
  }
  // Update the labels...
  var arr = [];
  for(var i = 0; i < 7; i++){
    arr.push(latestLabel-i);
  }
  startingData.labels = arr.reverse();
  // Reduce the animation steps for demo clarity.
  myLiveChart = new Chart(ctx).Line(startingData, {animationSteps: 15});
}
  $('.toUpdate').click(upDate)
});
