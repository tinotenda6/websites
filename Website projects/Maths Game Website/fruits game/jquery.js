
//explpode fruit
var playing = false;//when we load intially we aint playing
var score;
var trialsLeft;
var fruits=['apple', 'Banana', 'citron', 'grapes', 'mango', 'Orange', 'strawberry', 'srawberry', 'Watermelon' ];
var step;
var action;
$(function(){
$("#startreset").click(function(){
  //click on startresetbutton check if playing
  //we playing
  if(playing==true){
    location.reload();
  }
  else{
    //we are not playing
    playing=true; //game intiated
    //set score to 0
    score=0;
    $("#scorevalue").html(score);
    //show trials trialsLeft
    $("#trialsLeft").show();
    trialsLeft = 3;
    addHearts();
    //hide gameover box4
    $("#gameOver").hide();
    //change button to present
    $("#startreset").html("Reset Game");
    //start sending Fruits
    startAction();
  }
});
$("#fruit1").mouseover(function(){
  score++;
  $("#scorevalue").html(score); //updating the scorevalue
  //play sound
  //document.getElementbyid("slicesound").play();
  $("#slicesound")[0].play();//returns array and not really audio therefore use indexx 0 to access array which is the audio element
  //stop fruit1
  clearInterval(action);
  //hide fruit1
  $("#fruit1").hide("explode", 500); //slice the fruit
  //send new fruit1
  setTimeout(startAction, 500);
  startAction();
});


function addHearts(){
  //empty the trials box
$("#trialsLeft").empty();
for(i=0; i<trialsLeft;i++){

  $("#trialsLeft").append('<img src="images/heart.png" class="life">');
}
}
function startAction(){
  //generate fruit
  $("#fruit1").show();
  chooseFruit();
  $("#fruit1").css({'left':Math.round(550*Math.random()), 'top':-60});

  //random positioned

  //generate a random steps
  step = 1 + Math.round(5*Math.random());

  //move fruit down by one step

  action = setInterval(function(){
    $("#fruit1").css('top', $("#fruit1").position().top+step);


    if($("#fruit1").position().top>$("#fruitContainer").height()){
      //check if we have any trials trialsLeft
      if(trialsLeft > 1){
        //generate fruit
        $("#fruit1").show();
        chooseFruit();
        $("#fruit1").css({'left':Math.round(550*Math.random()), 'top':-60});

        //random positioned

        //generate a random steps
        step = 1 + Math.round(5*Math.random()); //change step

        //reduce trialsLeft
        trialsLeft --;
        //populate the trials left box
        addHearts();
      }else{
        //gameOver
        playing = false; //no pplaying
        $("#startreset").html("Start Game"); //change button to start game
        $("#gameOver").show();
        $("#gameOver").html("<p>Game Over!</p><p> Your score is " + score+"</p>");
        $("#trialsLeft").hide();
        stopAction();
      }
    }

  },10);
//check if fruit is too low

}

//generate a random fruit1

function chooseFruit(){
  $("#fruit1").attr('src', 'images/' + fruits[Math.round(8*Math.random())] + '.png');
}
//stop dropping fruit
function stopAction(){
  clearInterval(action);
  $("#fruit1").hide();
}
});
