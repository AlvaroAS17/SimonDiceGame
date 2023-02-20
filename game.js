var buttomColors = ["red", "blue", "green", "yellow"];
var gameParttern = [];
var userClickedPattern = [];
var start = false;
var level = 0;
$(".btn").click(function() {
    var userChosenColour = $(this).attr("id");
    userClickedPattern.push(userChosenColour);
    //console.log(userClickedPattern);
    playSound(userChosenColour);
    animatePress(userChosenColour);
    checkAnswer(userClickedPattern.length-1);
   });
$(document).keypress(function (){
    if (!start){
        $("#level-title").text("level "+level);
        nextSequence();
        start=true;
    }
});

function nextSequence() {
    userClickedPattern = [];
    var randomNumber = Math.floor(Math.random()*4);
    var randomChosenColour = buttomColors[randomNumber];
    gameParttern.push(randomChosenColour);
    $("#"+randomChosenColour).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChosenColour);
    level++;
    $("#level-title").text("level "+level);
}

function playSound(name){
    var audio = new Audio ("sounds/"+name+".mp3");
    audio.play();
}

function animatePress(currentColour) {
    $("."+currentColour).addClass("pressed");
    setTimeout(function() {
        $("."+currentColour).removeClass('pressed')}, 100
    );
}

function checkAnswer(currentLevel) {
   if (gameParttern[currentLevel] === userClickedPattern[currentLevel]) {
    if (gameParttern.length === userClickedPattern.length) {
        setTimeout(nextSequence, 1000);
    }
   } else{
    playSound("wrong");
    $("body").addClass('game-over')
    setTimeout(function() {
        $("body").removeClass('game-over')}, 200
    );
    $("#level-title").text("Game Over, Press Any Key to Restart");
    startOver();
   }
}

function startOver (){
    level = 0;
    gameParttern = [];
    start = false;
}

