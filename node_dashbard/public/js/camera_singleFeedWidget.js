var schedule = [{time: new Date().setHours(7,39,0,0),kilo:235,rate:18},
                {time: new Date().setHours(16,15,0,0),kilo:295,rate:12},
              ];

$(document).ready(function(){
schedule.sort(function(a,b){
  return a.time > b.time
});
// Functions for updating the time widget
var London = {lat:51.5, long: -0.1}
var maxTime = 24 * 60 * 60 * 1000;
var timeoutVal = Math.floor(maxTime/100);
var times = SunCalc.getTimes(new Date(), London.lat, London.long);
var midnight = new Date().setHours(24,0,0,0);
var start = new Date().setHours(0,0,0,0);



createTimeline();
createSchedule(schedule);
// animateUpdate();

function createSchedule( array_feed ){
  array_feed.forEach(function( element, i ){
    // Put the icon on the timeline
    $("#day_timeline").append("<div class='meal_time' id=meal_time"+ i
    +" style='position:absolute;z-index:10;width:10px;border-radius:100%;height:10px;background-color:#5caf3b; left:"+Math.round(((element.time-start)/maxTime)*100)+"%'></div>");
  });
  // Build up first slider
  var time_D = new Date(array_feed[0].time);
  $("#slides_meal").text( 1 +" / "+ array_feed.length );
  $("#slides_time").text( time_D.getHours() + ':' + time_D.getMinutes()  );
  $("#slides_dose").text( array_feed[0].kilo );
  $("#slides_rate").text( array_feed[0].rate );
  $("#feedgiven").text( schedule[0].kilo + " / " +schedule.reduce(function(a,b){return a.kilo + b.kilo}) );
  $("#calculatedFeed").text( schedule.reduce(function(a,b){return a.kilo + b.kilo}) );

  $("#meal_time0").css({"background-color":"#4ce011"});

}

function createTimeline(){
  // The current time stuff
  var now = Date.now();
  var timeDiff = now - start;
  var perc = Math.round((timeDiff/maxTime)*100);

  var light_times = new Array(5);
  light_times[0] = (times.dawn - start ),
  light_times[1] = (times.sunrise - times.dawn),
  light_times[2] = (times.sunset - times.sunrise),
  light_times[3] = (times.dusk - times.sunset),
  light_times[4] = (midnight - times.dusk);

  light_times = light_times.map(function(timeDiff){
    return ((timeDiff/maxTime)*100);
  })
  //CSS
  $("#dawn").text(times.dawn.getHours() + ':' + times.dawn.getMinutes() )
  $("#sunrise").text( times.sunrise.getHours() + ':' + times.sunrise.getMinutes()  )
  $("#sunset").text( times.sunset.getHours() + ':' + times.sunset.getMinutes()  )
  $("#dusk").text( times.dusk.getHours() + ':' + times.dusk.getMinutes()  )

  $('#Night1').width(light_times[0]+"%").css({"height":"10px","float":"left","background-color":"#91a1be"});
  $('#Dawn').width(light_times[1]+"%").css({"height":"10px","float":"left","background-color":"#c0ddF0"});
  $('#Sunlight').width(light_times[2]+"%").css({"height":"10px","float":"left","background-color":"#FFED9E"});
  $('#Dusk').width(light_times[3]+"%").css({"height":"10px","float":"left","background-color":"#c0ddF0"});
  $('#Night2').width(light_times[4]+"%").css({"height":"10px","float":"left","background-color":"#91a1be"});
  $('#slider').css({"position":"absolute","z-index" :"10","width":"10px","height":"10px","border-radius":"100%","left":perc+"%","background-color":"#ffa007"});
  setTimeout(animateUpdate, timeoutVal);
}

function animateUpdate() {
  var now = Date.now();
  var timeDiff = now - start;
  var perc = Math.round((timeDiff/maxTime)*100);
  if (perc <= 100) {
    $("#slider").css({ left: perc+"%" });
  }
}


  $('#Intensity').slider({
      id: 'slider22',
      min: 0,
      max: 200,
      step: 1,
      value: 100,
      tooltip: 'hover',
      rangeHighlights: [{ "start": 180, "end": 190 }]});
  $('#Amount').slider({
      id: 'slider23',
      min: 0,
      max: 200,
      step: 1,
      value: 100,
      tooltip: 'hover',
      rangeHighlights: [{ "start": 180, "end": 190 }]});

 // Slideshow code
  var slideIndex = 0;

  function getSlide(Slide){
    var time_D = new Date(Slide.time);
    $("#slides_meal").text( slideIndex+1 +" / "+ schedule.length );
    $("#slides_time").text( time_D.getHours() + ':' + time_D.getMinutes()  );
    $("#slides_dose").text( Slide.kilo );
    $("#slides_rate").text( Slide.rate );
    $(".meal_time").css({"background-color":"#5caf3b"});
    $("#meal_time"+slideIndex).css({"background-color":"#4ce011"});
  }
  function showSlides(n) {
    slideIndex += n;
    if (slideIndex >= schedule.length) {slideIndex = 0}
    if (slideIndex < 0) {slideIndex = schedule.length - 1}
    getSlide(schedule[slideIndex]);
  }
  $(".meal_time").click(function(){
    var id = this.id.replace("meal_time","");
    slideIndex = Number(id);
    getSlide(schedule[slideIndex]);
  })
  $(".prev").click(function(){showSlides(-1)});
  $(".next").click(function(){showSlides(1)});
  // Adjust heights of shit
  $("#sensors").height($("#feeding_params").height());
  $("#3d").height($("#video_").height());

});
