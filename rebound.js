let ball;
let paddle;
let score;
let playingArea;
let gear;
let controls;
let newButton;
let difficultySelect;
let doneButton;
let sound;
let music;
let availableWidth;
let availableHeight;
let playingAreaWidth;
let playingAreaHeight;
let ballSpeedX = 2; //dx //horizontal speed of ball
let ballSpeedY = 2; // dy vertical speed of ball
let paddleSpeedX = 48 ; //pdx paddle speed(number of px that the paddle moves on the screen using keyboard)
let currentScore = 0; 
let timer; //fire of all events
let paddleLeft = 228;//coordinate of left side of paddle
let paddleRight = paddleLeft + 64;// 64 is the width of our paddle
let ballLeft = 100;
let ballTop = 8;
let drag = false;
let soundEnabled = false;
let musicEnabled = false;

let beepX;
let beepY;
let beepPaddle;
let beepGameOver;
let bgMusic;

window.addEventListener("load",init);
window.addEventListener("resize",init);// resize the screen based of user screen

function init() {
    ball = document.getElementById("ball");
    paddle = document.getElementById("paddle");
    score = document.getElementById("score");
    playingArea = document.getElementById("playingArea");
    gear = document.querySelector("#gear");
    controls = document.getElementById("controls");
    newButton = document.getElementById("new");
    difficultySelect = document.getElementById("difficulty");
    doneButton = document.getElementById("done");
    sound = document.getElementById("snd");
    music = document.getElementById("music");
    //make page size
    layoutPage(); // determine all the sizes for game
    //keyListener for moving may paddle wih keyboard keys
    document.addEventListener("keydown",keyListener,false);// false is for bubble phase and true is for capture size 
    //set touch and mouse  for game
    playingArea.addEventListener('mousedown',mouseDown,false);
    playingArea.addEventListener('mousemove',mouseMove,false);
    playingArea.addEventListener('mouseup',mouseUp,false);
    playingArea.addEventListener('touchstart',mouseDown,false);
    playingArea.addEventListener('touchmove',mouseMove,false);
    playingArea.addEventListener('touchend',mouseUp,false);
    //setting box
    gear.addEventListener("click",showSettings,false);
    newButton.addEventListener("click",newGame,false);
    doneButton.addEventListener("click",hideSettings,false);
    difficultySelect.addEventListener("change",function(){
    setDifficulty(difficultySelect.selectedIndex)},false);
    //sound default
    sound.addEventListener("click",toggleSound,false);
    music.addEventListener("click",toggleMusic,false);
    //when everything is ready run start function and make animation
    timer = requestAnimationFrame(start);
}

//make page size
function layoutPage(){
    availableWidth = innerWidth;//get the screen width of user
    availableHeight = innerHeight;//get the screen height of user
    playingAreaWidth = availableWidth - 22// make width to what we want(left is 10 px ,we have 20 + 2 because of our border)
    playingAreaHeight = availableHeight -22//make height to what we want(top is 10 px , bottom 10 px and 2 for borders each side )
    playingArea.style.width  = playingAreaWidth + "px"//assign new width to page
    playingArea.style.height = playingAreaHeight + "px"//assign new height to page
}

//using keyboaed keys
function keyListener(event){
    let key = event.keyCode;
    //left arrow and A key  
    if((key == 37 || key == 65) && paddleLeft > 0){
        //left arrow and A make the padddle to  move to left(48px)
        paddleLeft -= paddleSpeedX ;
        if(paddleLeft < 0)
        paddleLeft = 0;
    }

    //right arrow and D key
    else if((key == 39 || key == 68) &&  paddleRight < playingAreaWidth){
        //right arrow and D key make the padddle to  move to right(48px)
        paddleLeft += paddleSpeedX ;
        if(paddleRight > playingAreaWidth)
        paddleRight = playingAreaWidth;
    }
    
    paddle.style.left = paddleLeft + "px"
}

//making 
function start(){
    render();
    detectCollisions();
    difficulty();
    //36 is the height of score label + height of paddle
    if(ballTop < playingAreaHeight - 36){
        timer = requestAnimationFrame(start);
    }
    else{
       gameOver();
    }
}

//ball position and score
function render(){
    moveBall();
    updateScore();

}

//draw ball with new initials
function moveBall(){
    ballLeft += ballSpeedX;
    ballTop += ballSpeedY;
    ball.style.left = ballLeft + "px";
    ball.style.top = ballTop + "px";
}

//changing score while ball is playing
function updateScore(){
    currentScore += 5;
    score.innerHTML = "Score : " + currentScore;
}

//reflecting ball
function detectCollisions(){
    if(collisionX()){
     ballSpeedX *= -1;
    }
    if(collisionY()){
        ballSpeedY *= -1;
    }
}

//check left and right edges of screen , 4px is cushion
function collisionX(){
    if(ballLeft < 4 || ballLeft > playingAreaWidth - 20){
        playSound(beepX);
        return true;
    }
    return false;
}


function collisionY(){
    //check if ball hit top of the page
    if(ballTop < 4){
        playSound(beepY);
        return true;
    }
    //  check the top of the ball is bigger than 10+20+10+16+8 (height of paddle and score and page and ball)
    if(ballTop > playingAreaHeight - 64){
        // middle of paddle
        if(ballLeft >= paddleLeft + 16 && ballLeft < paddleLeft + 48){
            if(ballSpeedX < 0){
               ballSpeedX = -2;
            }
            else{
            ballSpeedX = 2;
            }
            playSound(beepPaddle);
            return true;
        }    
        //left edge of paddle 
        else if(ballLeft >= paddleLeft && ballLeft < paddleLeft + 16){
            if(ballSpeedX < 0){
            ballSpeedX = -8;
            }
            else{
            ballSpeedX = 8;
                }
                playSound(beepPaddle);
                return true;}
        //right edge of paddle 
        else if(ballLeft >= paddleLeft + 48 && ballLeft <= paddleLeft + 64){
            if(ballSpeedX < 0){
                ballSpeedX = -8;
            }
            else{
                ballSpeedX = 8;
                }
                playSound(beepPaddle);
                return true;
            }
    }
    return false;
}



//change difficulty
function difficulty(){
    if(currentScore % 1000 == 0){
        if(ballSpeedY>0)
        ballSpeedY += 2;
        else
        ballSpeedY -= 2;
    }
}


function gameOver(){
    cancelAnimationFrame(timer);
    score.innerHTML += "   Game Over"
    score.style.backgroundColor = "rgb(128,0,0)";
    playSound(beepGameOver);
}


function mouseDown(event){
    drag = true;
}

function mouseUp(event){
    drag = false;
}

function mouseMove(event){
    if(drag){
        event.preventDefault();
        // 32 is the half width of paddle, 
        paddleLeft = event.clientX - 32 || event.targetTouches[0].pageX - 32;
        if(paddleLeft < 0)
        paddleLeft = 0;
        if(paddleRight > playingAreaWidth)
        paddleRight = playingAreaWidth;
        paddle.style.left = paddleLeft + "px";
    }
}

    function showSettings(){
        controls.style.display = "block";
        cancelAnimationFrame(timer);//game is paused
    }

    function hideSettings(){
        controls.style.display = "none";
        timer = requestAnimationFrame(start);
    }

    function setDifficulty(diff){
        switch(diff){
            case 0 :
                ballSpeedY = 2;
                paddleSpeedX = 48;
                break;
            case 1 :
                ballSpeedY = 4;
                paddleSpeedX = 32;
                break;
            case 2 :
                ballSpeedY = 6;
                paddleSpeedX = 16;
                break;
            default:
                ballSpeedY = 2;
                paddleSpeedX = 48;      
        }
    }

    function newGame(){
        ballTop = 8;
        currentScore = 0;
        ballSpeedX = 2;
        setDifficulty(difficultySelect.selectedIndex);
        score.style.backgroundColor = "rgb(32,128,64)";
        hideSettings();
    }

    function initAudio(){
        //load audio files
        beepX = new Audio('sounds/beepX.mp3');
        beepY = new Audio('sounds/beepY.mp3');
        beepPaddle = new Audio('sounds/beepPaddle.mp3');
        beepGameOver = new Audio('sounds/beepGameOver.mp3');
        bgMusic = new Audio('sounds/music.mp3');
        //turn off volume
        beepX.volume = 0;
        beepY.volume = 0;
        beepPaddle.volume = 0;
        beepGameOver.volume = 0;
        bgMusic.volume = 0;
        //play each file
        //this grants permission
        beepX.play();
        beepY.play();
        beepPaddle.play();
        beepGameOver.play();
        bgMusic.play();
        //pause each file
        //this stores them in memory for later
        beepX.pause();
        beepY.pause();
        beepPaddle.pause();
        beepGameOver.pause();
        bgMusic.pause();
        //set the volume back for next time
        beepX.volume = 1;
        beepY.volume = 1;
        beepPaddle.volume = 1;
        beepGameOver.volume = 1;
        bgMusic.volume = 1;
    }

    function toggleSound(){
        if(beepX == null){
            initAudio();
        }
        soundEnabled = !soundEnabled;
    }

    function playSound(objSound){
        if(soundEnabled)
            objSound.play();
    }

    function toggleMusic(){
        if(bgMusic == null){
            initAudio();
        }
        if(musicEnabled)
          bgMusic.pause();
          else{
              bgMusic.loop = true;
              bgMusic.play();
          }
          musicEnabled = !musicEnabled;
    }
