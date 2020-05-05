let currentX = 100;
let currentY = 100;
let distanceX = 5;
let distanceY = 5;


function animate(){
    document.querySelector(".ball").style.left = currentX + "px";
    document.querySelector(".ball").style.top = currentY + "px";
    currentX += distanceX;
    currentY += distanceY;
    if((currentX > 800 || currentX < 100) || (currentY > 600 ||  currentY < 100)){
        distanceX *= -1 ;
        distanceY *= -1;
    }
    setTimeout("animate()",10);
}

window.addEventListener("load",animate)