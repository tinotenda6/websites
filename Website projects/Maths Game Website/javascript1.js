var playing = false;
var score;
var action;
var timeremaining;
var correctAnswer;
var apple;
var appleID;
var maxApple;

document.getElementById("startresetE").onclick= function(){
//if we are playing
if(playing==true){
  location.reload(); //causes page to reload
}
else{
  playing=true;
  score = 0;
  apple = 0;
  appleID =0;
  maxApple = 50;
  document.getElementById("scorevalue").innerHTML =score;
  document.getElementById("scorevalue").innerHTML =apple;
  document.getElementById("timeremainingE").style.display = "block";//show countdownbox
  document.getElementById("startresetE").innerHTML = "reset game";
  timeremaining=60;
  document.getElementById("timeremainingvalue").innerHTML=timeremaining;
//hide gameover box1
hide("gameOverE");
//hide("sets");

  //start countdown
  startCountdown();
  generateQA();
}
}

//clicking on answerbox
for(i=1;i<3;i++){
document.getElementById("box"+ i).onclick=function(){
//check if we are playing
if(playing==true){
  if(this.innerHTML == correctAnswer){
    score ++;
    document.getElementById("scorevalue").innerHTML=score;
    apple = apple + 2;
    document.getElementById("applesvalue").innerHTML=apple;
    //add 2 apples for each crrect answer
    for(i=1; i<=2; i++ ){
      if(appleID < maxApple){ //50 is max value of appples
        appleID = appleID+1;
    $("#fruity").append('<img src="images/apple.png" class="image" id = "appleID">');
  }
    }
    //hide wrong box1
    hide("wrongeasy");
    show("correcteasy");
    setTimeout(function(){
      hide("correcteasy");
    }, 1000);
    //generate new // QUESTION
    generateQA();
  }
  else{
    //wrong reduce one apple value rempve one apples

    hide("correcteasy");
    show("wrongeasy");
    apple = apple - 1;
    document.getElementById("applesvalue").innerHTML=apple;
    if(apple <= maxApple ){
    $("#appleID").remove();
    appleID = appleID -1;
  }
    setTimeout(function(){
      hide("wrongeasy");
    }, 1000);
  }
}
}
}

function startCountdown(){
action = setInterval(function(){
  timeremaining -= 1;
  document.getElementById("timeremainingvalue").innerHTML=timeremaining;
  if(timeremaining==0){
   stopCountdown;
   document.getElementById("gameOverE").style.display="block";
   document.getElementById("gameOverE").innerHTML="<p>Game Over!</p> <p>Your score is "+score+"</p> <p> You collected "+apple+" / "+maxApple+" apples </p>";
   hide("timeremainingE");
   hide("correcteasy");
   hide("wrongeasy");
   playing=false;
  document.getElementById("startresetE").innerHTML="Play again";
  document.getElementById("startresetE").onclick= function(){
    location.reload();
  }
  }
}, 1000);
}
function stopCountdown(){
    clearInterval(action);
}

function hide(Id){
  document.getElementById(Id).style.display = "none";
}
function show(Id){
  document.getElementById(Id).style.display = "block";
}

function generateQA(){
var x = Math.round(10*Math.random());
var y = Math.round(9*Math.random());
correctAnswer= x*y;
document.getElementById("questioneasy").innerHTML=x + "x" +y;
document.getElementById("hintID").innerHTML="Hint: " + y + " sets of " + x;
var correctPosition=1+Math.round(1*Math.random());
document.getElementById("box"+correctPosition).innerHTML=correctAnswer;
var answers = [correctAnswer];
for(i=1; i<3;i++){
  if(i!=correctPosition){
    var wrongAnswer;
    do{
    wrongAnswer= Math.round(10*Math.random()) * Math.round(10*Math.random());
}while(answers.indexOf(wrongAnswer)>-1)
    document.getElementById("box"+i).innerHTML=wrongAnswer;
    answers.push(wrongAnswer);
  }
}
}
