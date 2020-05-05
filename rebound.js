let ball;
let paddle;
let score;
let playingArea;
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

window.addEventListener("load",init);
window.addEventListener("resize",init);// resize the screen based of user screen

function init() {
    ball = document.getElementById("ball");
    paddle = document.getElementById("paddle");
    score = document.getElementById("score");
    playingArea = document.getElementById("playArea");
    layoutPage(); // determine all the sizes for game
    document.addEventListener("keydown",keyListener,false);// false is for bubble phase and true is for capture size 
    PlayingArray.addEventListener("mousedown",mouseDown,false);
    PlayingArray.addEventListener("mousemove",mouseMove,false);
    PlayingArray.addEventListener("mouseUp",mouseUp,false);
    PlayingArray.addEventListener("touchstart",mouseDown,false);
    PlayingArray.addEventListener("touchmove",mouseMove,false);
    PlayingArray.addEventListener("touched",mouseUp,false);
    timer = requestAnimationFrame(start);

}
function layoutPage(){
    availableWidth = innerWidth;//get the screen width of user
    availableHeight = innerHeight;//get the screen height of user
    playingAreaWidth = availableWidth - 22// make width to what we want(left is 10 px ,we have 20 + 2 because of our border)
    playingAreaHeight = availableHeight -22//make height to what we want(top is 10 px , bottom 10 px and 2 for borders each side )
    playingArea.style.width  = playingAreaWidth + "px"//assign new width to page
    playingArea.style.height = playingAreaHeight + "px"//assign new height to page
}

// 
function keyListener(event){
    let key = event.keyCode;
    //left arrow and A key  
    if((key == 37 || key == 65) && paddleLeft > 0){
        paddleLeft -= paddleSpeedX ;
        if(paddleLeft < 0)
        paddleLeft = 0;
    }

    //right arrow and D key
    else if((key == 39 || key == 68) &&  paddleRight < playingAreaWidth){
        paddleLeft += paddleSpeedX ;
        if(paddleRight > playingAreaWidth)
        paddleRight = playingAreaWidth;
    }
    
    paddle.style.left = paddleLeft + "px"
}

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

//draw ball with new initial
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
        return true;
    }
    return false;
}


function collisionY(){
    //check if ball hit top of the page
    if(ballTop < 4){
        return true;
    }
    //  check the top of the ball is bigger than 10+20+10+16+8 (height of paddle and score and page and ball)
    if(ballTop > playingAreaHeight - 64){
        //after check ball left 
        if(ballLeft >= paddleLeft && ballLeft <= paddleRight){
            return true
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
}


// function mouseDown(event){
//     drag = true;
// }

// function mouseUp(event){
//     drag = false;
// }

// function mouseMove(event){
//     if(drag){
//         event.preventDefault();
//         paddleLeft = event.clientX - 32 || event.targetTouches[0].pageX - 32;
//         if(paddleLeft < 0)
//         paddleLeft = 0;
//         if(paddleRight > playingAreaWidth)
//         paddleRight = playingAreaWidth;
//         paddle.style.left = paddleLeft + "px";
//     }
// }