$(function()
{
  //variables
  var mode =0; //app mode
  var timeCounter=0;//time timeCounter
  var lapCounter=0; //lap lapCounter
  var action;//store atrribute of setInteral action
  var lapNumber = 0;
  //minute seconds centiseconds for time and lap
  var timeMinutes, timeSeconds, timeCentiseconds, lapMinutes, lapSeconds, lapCentiseconds ;

  //on app load show atart and lap Buttons
  hideshowButtons("#startButton", "#lapButton");
  //click on start Buttons
  //mode on
  $(" #startButton").click(function(){
    mode =1;
    //show stop and lap buttons
    hideshowButtons("#stopButton", "#lapButton");
    //start action
    startAction();
  });



$("#stopButton").click(function(){
  //show resume and reset Buttons
  hideshowButtons("#resumeButton","#resetButton");
  //stop counters
  clearInterval(action);
});

$("#resumeButton").click(function(){
  //show stop and lap Buttons
  hideshowButtons("#stopButton","#lapButton");
  //start counters
  startAction();
});

$("#resetButton").click(function(){
//reload page
location.reload();
});
$("#lapButton").click(function(){
  if(mode){
    //stop actionn
    clearInterval(action);
    //reset the laps
    lapCounter=0;
    addLap();
    //startAction
    startAction();
  }
})




  //functions
  function hideshowButtons(x,y){
    $(".control").hide();
    $(x).show();
    $(y).show();
  }

  //start the counter
  function startAction(){
    action = setInterval(function(){
      timeCounter++;
      if(timeCounter == 100*60*100){
        timeCounter = 0;
      }
      lapCounter++;
      if(lapCounter==100*60*100){
      lapCounter=0;
    }
      updateTime();
    },10);
  }

  //update time is going to convert counters to minutes sec and centi sec
  function updateTime(){
    //1 minute = 60*100centiseconds = 6000centiseconds
    timeMinutes=Math.floor(timeCounter/6000);
    //1 sec = 100centiseconds
    timeSeconds=Math.floor((timeCounter%6000) /100);
    timeCentiseconds=(timeCounter%6000) %100;
    $("#timeminute").text(format(timeMinutes));
    $("#timesecond").text(format(timeSeconds));
    $(" #timecentisecond").text(format(timeCentiseconds));
    //laps update
    //1 minute = 60*100centiseconds = 6000centiseconds
    lapMinutes=Math.floor(lapCounter/6000);
    //1 sec = 100centiseconds
    lapSeconds=Math.floor((lapCounter%6000) /100);
    lapCentiseconds=(lapCounter%6000) %100;
    //update time
    $("#lapminute").text(format(lapMinutes));
    $("#lapsecond").text(format(lapSeconds));
    $(" #lapcentisecond").text(format(lapCentiseconds));
  }
  //format numbers
  function format(number){
    if(number<10){
      return '0'+number;
      }
      else{
        return number;
      }
  }

//addLapfunction: print lap details inside the ;ap box
function addLap(){
  lapNumber++;
  var myLapDetails='<div class="lap">'+
   '<div class ="laptimetitle">'+
    'Lap'+ lapNumber +
   '</div>'+
   '<div class="laptime">'+
   '<span>'+format(lapMinutes)+'</span>'+
   ':<span>'+format(lapSeconds)+'</span>'+
   ':<span>'+format(lapCentiseconds)+'</span>'+
   '</div>'+
   '</div>';
  $(myLapDetails).appendTo("#laps");
}


});
