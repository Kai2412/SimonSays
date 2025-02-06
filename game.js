var gameStarted = false;
var userClickedPattern = [];
var gamePattern = [];
var currentLevel = 0;
const buttonColors = ["red","blue","green","yellow"];
function startOver(){
    userClickedPattern = []; 
    gamePattern = [];   
    currentLevel = 0; 
    gameStarted = false;
};
function checkAnswer(){
  if(JSON.stringify(gamePattern) === JSON.stringify(userClickedPattern)){
    userClickedPattern = []; 
    setTimeout(function(){nextSequence();},1000)
  } else {
    $('body').addClass("game-over");
    var gameOverSound = new Audio('sounds/wrong.mp3');
    gameOverSound.volume = 0.15; 
    gameOverSound.play();
    setTimeout(function(){
        alert('You suck!');
        $('h1').text("Game Over, Press Any Key to Restart");
        $('body').removeClass("game-over");
        startOver();
    },200)
  }  
};

function playSound(name) {
    var generalSound = new Audio('sounds/'+ name +'.mp3');
    generalSound.volume = 0.15; 
    generalSound.play();
};
function animatePress(currentColour) {
    var currentColourFade = currentColour
    $(currentColourFade).addClass("pressed");
    setTimeout(function() {
        $(currentColourFade).removeClass("pressed");
    }, 100);
};
function nextSequence(){
    currentLevel = currentLevel + 1;
    $('h1').text("Level: " + currentLevel);
    var randomNumber = Math.floor((Math.random()*4));
    var randomChosenColor = buttonColors[randomNumber];
    gamePattern.push(randomChosenColor);
    $("." + randomChosenColor).animate({opacity: .25}).animate({opacity: 1});
    playSound(randomChosenColor);
    
};
$('.btn').click(function() {
    console.log('Button clicked:', this.className);
    userClickedPattern.push(this.id);
    console.log(userClickedPattern);
    playSound(this.id);
    animatePress(this);
    if(userClickedPattern.length === gamePattern.length){
        checkAnswer();
    }
});
$(document).keydown(function(event){
    if(gameStarted === false){
        nextSequence();
        gameStarted = true;
        userClickedPattern = [];
        $('h1').text("Level: " + currentLevel)
    }
})