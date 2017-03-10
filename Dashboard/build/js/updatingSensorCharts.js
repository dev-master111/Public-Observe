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
              data: [10, 9.8, 9.85, 9.9, 10.2, 10.3, 10]
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
              data: [13, 12.8, 13.4, 13, 12.7, 12.2, 10.7]
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
              data: [35, 35.6, 36, 36.2, 35.5, 35.5, 35.2]
          },
      ]
    };
  var startingData = TemperatureData;
  var latestLabel = startingData.labels[6];

// Reduce the animation steps for demo clarity.
var myLiveChart = new Chart(ctx).Line(startingData, {animationSteps: 15});
var x = 1, offset = 9.5;
setInterval(function(){
  // Add two random numbers for each dataset
  myLiveChart.addData([Math.random()*x+offset], ++latestLabel);
  // Remove the first point so we dont just add values forever
  myLiveChart.removeData();
}, 6000);

var upDate = function(){
  $('#updating-chart').remove(); // this is my <canvas> element
  $('#canvaswrapperDiv').append('<canvas id="updating-chart" width="500" height="200"></canvas>');
  var value = $('input[name="data"]:checked').val();
  var canvas = document.getElementById('updating-chart');
  var ctx = canvas.getContext('2d');
  console.log(value)
  if ( value == "T") {
    startingData = TemperatureData;
    offset = 9.5;
    x =1;
  } else if (value == "D") {
    startingData = DisolvedOxyData;
    offset = 12.5;
    x =1;
  } else if (value == "S") {
    startingData = SalinityData;
    offset = 35;
    x = 5;
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
