$( document ).ready( function() {
  function getCookie(cname) {
    var name = cname + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(';');
    for(var i = 0; i <ca.length; i++) {
      var c = ca[i];
      while (c.charAt(0) == ' ') {
        c = c.substring(1);
      }
      if (c.indexOf(name) == 0) {
        return c.substring(name.length, c.length);
      }
    }
    return "";
  }

  if(getCookie("unvervalue")!= "1"){
    var d = new Date();
    var exdays = 1; // Number of hours before cookie dies
    d.setTime(d.getTime() + (exdays*60*60*1000));//exdays*24*60*6
    var expires = "expires="+ d.toUTCString();
    document.cookie = "unvervalue = 1;" + expires;
    $( '#myModal' ).modal( 'toggle' );
  }
  $('#vid1').on('loadedmetadata', function() {
  this.currentTime = 5;
  }, false);
  $('#vid2').on('loadedmetadata', function() {
  this.currentTime = 10;
  }, false);
  $('#vid3').on('loadedmetadata', function() {
  this.currentTime = 15;
  }, false);
  $('#vid4').on('loadedmetadata', function() {
  this.currentTime = 20;
  }, false);
  $('#vid5').on('loadedmetadata', function() {
  this.currentTime = 25;
  }, false);
  $('video').click(function() {
    var id = $(this).attr('id');
    location.replace("live")

  });
  $("#logo").height($("#info").height());
  console.log($("#logo").height(), $('#info').height())
});
