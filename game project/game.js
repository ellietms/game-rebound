let score = 0;
let availableWidth;
let availableHeight;
let timer;
let iterations = 0;

window.addEventListener('load',setGameAreaBounds);
function setGameAreaBounds(){
    availableWidth = innerWidth;//get the width of our screen size
    availableHeight = innerHeight;//get the height of our screen size
    availableWidth -= 22; // 10 for left + 10 for right + 2 for border width
    availableHeight -= 97;
    document.querySelector(".gameArea").style.width = availableWidth + "px";// assign the width to our game area
    document.querySelector(".gameArea").style.height = availableHeight + "px"; // assign the height to our game area
    document.querySelector(".dot").addEventListener("click",userScore); // add score when we click the square button 
    availableWidth -= 74 ;// for managing square button coordinate from the right of page(be inside the game area)
    availableHeight -= 74;// for managing square button coordinate from the bottom  of page(be inside the game area)
    moveDot(); // make random coordinate for our button and specific time for ending the game
}

function userScore() {
    score += 1;
    document.querySelector(".scoreLabel").innerHTML = "Score :  " + score;
}

function moveDot() {
    let leftCoordinate = Math.floor(Math.random()*availableWidth);//random number between 0 to available width
    let topCoordinate = Math.floor(Math.random()*availableHeight);//random number between 0 to available height
    if( leftCoordinate < 10 ){
        leftCoordinate = 10
    }
    if( topCoordinate < 10 ){
        topCoordinate = 10
    }
    document.querySelector(".dot").style.left = leftCoordinate + "px"
    document.querySelector(".dot").style.top = topCoordinate + "px"
    //until here we have our square button random coordinate

    // 
     if(iterations < 30) {
         timer = setTimeout("moveDot()",1000); // make the square button different coordinates for 30 second (it will not finish until it gets the iterations = 30 ) 
     }
     else{
         document.querySelector(".scoreLabel").innerHTML += "    Game Over!";
         document.querySelector(".dot").removeEventListener("click",userScore); // when the game is over (for specific time) we want that user  cant click the button for getting score
         clearTimeout(timer);
     }
     iterations++;
}