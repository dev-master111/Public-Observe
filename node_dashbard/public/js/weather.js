var weather_Data;
$(document).ready(function(){
  var lat = 56.8198;
  var lon = -5.1052;
  var weatherIcons;
  var req = $.getJSON("/json/icons.json");
  req.then(function(res){
    weatherIcons = res;
    return $.getJSON('http://api.openweathermap.org/data/2.5/weather?lat='+lat+'&lon='+lon+'&APPID=90218217a5640940a557861baa80b780');
  }).then(function(resp) {
  var prefix = 'wi wi-';
  var code = resp.weather[0].id;
  var icon = weatherIcons[code].icon;

  // If we are not in the ranges mentioned above, add a day/night prefix.
  if (!(code > 699 && code < 800) && !(code > 899 && code < 1000)) {
    icon = 'day-' + icon;
  }

  // Finally tack on the prefix.
  icon = prefix + icon;
  $("#weatherIcon").addClass(icon);
});
});
