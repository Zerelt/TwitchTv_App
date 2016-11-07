
//array containing streamer names;
arr = ["freecodecamp", "storbeck", "terakilobyte", "habathcx", "RobotCaleb", "thomasballinger", "noobs2ninjas", "beohoff", "brunofin", "comster404", "lagtvmaximusblack", "RiotGames", "ogamingsc2", "esl_sc2", "novawar","blizzard", "lirik", "totalbiscuit", "geersart", "crunk_muffin"];

$(document).ready(function() {

  //loop to check if streamer is live or not(note that this time there's no need for JSONP; it returns the values with JSON like normal, altough i could have let just one for loop, i made 2 of them to remember about JSONP)
  for (var j = 0; j < arr.length; j++) {
    $.getJSON("https://api.twitch.tv/kraken/streams/" + arr[j]+'?client_id=bce27voby5n5fextha9zj04b41ljppd&callback=?', function(json2) {
      //Offline:
      if (json2.hasOwnProperty("stream") === true && json2.stream === null) {
        $.getJSON(json2._links.channel+'?client_id=bce27voby5n5fextha9zj04b41ljppd', function(obj) {
          var pic=obj.logo;
          if(obj.logo===null) {
            pic = "./images/noAvatar.jpg";
          }

          $("#offlineDiv").append("<a href="+obj.url+" target='_blank'>"+"<img src= "+pic +">"+"<div class='offlineInfo'>"+obj.display_name+"</div>"+"<span>"+obj.language+"</span>"+"</a>"+"<br/>");
        });
      }

      //Online
      if (json2.hasOwnProperty("stream") &&json2.stream!==null){
        var pic2=json2.stream.channel.logo;
        if(json2.stream.channel.logo===null) {
          pic2 = "./images/noAvatar.jpg";
        }

        $("#onlineDiv").append("<a href="+json2.stream.channel.url+" target='_blank'>"+"<img src= "+pic2+">"+"<div class='mainInfo'>"+json2.stream.channel.display_name+"<br />"+"Playing: "+json2.stream.channel.game+ "</div>" +" "+"<span>"+"<img class='viewIcon' src="+'./images/viewers.png'+">"+"  "+"<div class='viewCount'>"+json2.stream.viewers+"</div>"+"</span>"+"</a>"+"<br />");
      }
    });
  }

  //loop using JSONP (adding this "?callback=?" makes it JSONP) to check if the streamer name exists or not;without using JSONP and using just JSON, it wouldn't return the key values;
  for (var i = 0; i < arr.length; i++) {
    $.getJSON("https://api.twitch.tv/kraken/channels/" + arr[i] + "?client_id=bce27voby5n5fextha9zj04b41ljppd&callback=?", function(json) {
      if (json.message !== undefined) {
        $("#offlineDiv").append("<img src ="+"./images/offline.png"+">"+"<div class='offlineInfo'>"+json.message +"</div>"+ "<br />");
        //alternative for the error picture:https://cdn1.iconfinder.com/data/icons/toolbar-signs/512/no-512.png (red color)
      }
    });
  }

  $("#offlineDiv").toggle();
  $("#button").click(function () {
    if($("#button2").html()=="+" && $("#button").html()=="-"){
      $("#offlineDiv").slideToggle();
      $("#onlineDiv").slideToggle();
      $("#button").html("+");
      $("#button2").html("-");
    }
    else if($("#button2").html()=="-" && $("#button").html()=="+") {
      $("#onlineDiv").slideToggle();
      $("#offlineDiv").slideToggle();
      $("#button").html("-");
      $("#button2").html("+");
    }

  });

  $("#button2").click(function () {
    if($("#button").html()=="+" && $("#button2").html()=="-"){
      $("#offlineDiv").slideToggle();
      $("#onlineDiv").slideToggle();
      $("#button2").html("+");
      $("#button").html("-");
    }
    else if($("#button").html()=="-" && $("#button2").html()=="+") {
      $("#onlineDiv").slideToggle();
      $("#offlineDiv").slideToggle();
      $("#button2").html("-");
      $("#button").html("+");
    }

  });

});
