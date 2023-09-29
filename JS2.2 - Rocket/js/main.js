'use strict';

/***********************************************************************************/
/************************************* DONNEES *************************************/
/***********************************************************************************/

let startButton = document.getElementById("firing-button");
let cancelButton = document.getElementById("cancel-button");
let reinitButton = document.getElementById("reinit-button");
let rocket = document.getElementById("rocket");
let timer = 10;
let printTimer = document.getElementById("timer")
printTimer.innerHTML = timer;
let firingInterval;

/***********************************************************************************/
/************************************ FONCTIONS ************************************/
/***********************************************************************************/

function startTimer() {
    rocket.src = "images/rocket2.gif";
    firingInterval = setInterval(stopAndFly, 1000);
    startButton.classList.add('disabled');
}

function stopAndFly(){
    timer--;
    printTimer.innerHTML = timer;
    if (timer == 0){
        clearInterval(firingInterval);
        rocket.classList.add('tookOff');
        rocket.src = "images/rocket3.gif";
        cancelButton.classList.add('disabled');
    }
}

function stopTimer() {
    clearInterval(firingInterval);
    rocket.src = "images/rocket1.png";
    startButton.classList.remove('disabled');
}
function reinitTimer() {
    timer = 10;
    printTimer.innerHTML = timer;
    clearInterval(firingInterval);
    rocket.src = "images/rocket1.png";
    startButton.classList.remove('disabled');
}

/************************************************************************************/
/********************************** CODE PRINCIPAL **********************************/
/************************************************************************************/

startButton.addEventListener("click", startTimer);
cancelButton.addEventListener("click", stopTimer);
reinitButton.addEventListener("click", reinitTimer);


    
    
    