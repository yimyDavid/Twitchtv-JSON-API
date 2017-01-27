 var channels = ["ESL_SC2", "OgamingSC2", "cretetion", "freecodecamp", "storbeck", "habathcx", "RobotCaleb", "noobs2ninjas"];
 
function getChannels(){

var allContent ="";  
$.each(channels, function(index, channelName){
 $.getJSON('https://api.twitch.tv/kraken/streams/' + channelName + '?client_id=3ayqtffruo2goxf0cvyp75wjm28g4pq&callback=?', function(data) {
  
   if(data.stream !== null){
      var htmlContent = "<a href=" + data.stream.channel.url + " target=\"_blank\"><div class=\"row  hide-on bg-success row-channel-on\">";
     htmlContent += "<div class=\"col-xs-1 \"><img src=" + data.stream.channel.logo+"></div>";
     htmlContent += "<div class=\"col-xs-3 \"><p>" + channelName +  "</p></div>";
     htmlContent += "<div class=\"col-xs-8 \"><p>" + data.stream.game +": " + data.stream.channel.status+ "</p></div>";
     htmlContent += "</div></a>";
     
    $("#twitch-channels").prepend(htmlContent);
   }else{
  $.getJSON('https://api.twitch.tv/kraken/channels/' + channelName + '?client_id=3ayqtffruo2goxf0cvyp75wjm28g4pq&callback=?', function(data) {
     var htmlOffContent = "<a href=" + data.url + " target=\"_blank\"><div class=\"row hide-off bg-danger row-channel-off\">";
     htmlOffContent += "<div class=\"col-xs-1 \"><img src=" + data.logo+"></div>";
     htmlOffContent += "<div class=\"col-xs-3\"><p>" + channelName + "</p></div>";
     htmlOffContent += "<div class=\"col-xs-8\"><p>OffLine</p></div>";
     htmlOffContent += "</div></a>";
     $("#twitch-channels").append(htmlOffContent);
   }  
   
 )};//json
  
});//end getJSON
 
}); 
}
$(document).ready(function(){
  //would work without a enclosing function, as well.
  getChannels();
  $("#status").click(function(event){
     event.preventDefault();
     var status = event.target.id;
    if(status === "on"){
      $(".hide-off").css({"display":"none"});
      $(".hide-on").css({"display":"block"});
     }
    else if(status ==="off"){
      $(".hide-on").css({"display":"none"});
      $(".hide-off").css({"display":"block"});
    }else{
       $(".hide-on").css({"display":"block"});
      $(".hide-off").css({"display":"block"});
    }
  });
});

