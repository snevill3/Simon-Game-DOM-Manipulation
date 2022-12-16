// Simon Game
// This game showcases DOM manipulation using the jQuery library

let level = 0;
let started = false;
let gamePattern = [];
let userClickedPattern = [];
const buttonColors = ["red", "blue", "green", "yellow"];


function nextSequence() {
    userClickedPattern = [];
    let randomNumber = Math.floor(Math.random() * 4);
    let randomChosenColor = buttonColors[randomNumber];
    gamePattern.push(randomChosenColor);

    // function to animate through gamePattern
    animateGamePattern();

    level++;
    $("#level-title").text("level "+level);
}

// play sound for button color
function playSound(name){
    let audio = new Audio("sounds/"+name+".mp3");
    audio.play();
}

// animate transition for button presses
function animatePress(currentColor) {
    $("#"+currentColor).addClass("pressed");
    setTimeout(function(){
        $("#"+currentColor).removeClass("pressed");
    }, 100);
}

// add event listener buttons
$(".btn").click(function() {
    let userChosenColor = this.id;
    userClickedPattern.push(userChosenColor);
    playSound(userChosenColor);

    animatePress(userChosenColor);

    //pass in last index of user's clicked pattern
    checkAnswer(userClickedPattern.length -1);
});

// add keypress event listener to document object
$(document).keypress(function(event) {
    if(!started) {
        nextSequence();
        started = true;
    }
});

// check user's answer
function checkAnswer(currentLevel) {
    if(userClickedPattern[currentLevel] === gamePattern[currentLevel]) {
        console.log("Success");
        if(userClickedPattern.length === gamePattern.length) {
            setTimeout(function() {
                nextSequence();
            }, 1000);
        }
    } else {
        console.log("failed");
        playSound("wrong");
        $("body").addClass("game-over");

        setTimeout(function() {
            $("body").removeClass("game-over");
        }, 200);

        $("#level-title").text("Game Over, Press Any Key to Restart");
        startOver();
    }
}

// iterates over array applying a delay for each animation
function animateGamePattern() {

    gamePattern.forEach(function(item, i) {
        
        setTimeout(function() {
            $("#"+item).fadeIn(100).fadeOut(100).fadeIn(100);
            playSound(item);
            console.log(item);
        }, i * 800);
    });
}

// restart game
function startOver() {
    level = 0;
    gamePattern = [];
    started = false;
}