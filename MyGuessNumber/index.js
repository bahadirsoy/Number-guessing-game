//Theme elements
const lightTheme = document.getElementById("light-themei");
const darkTheme = document.getElementById("dark-themei");

//Container
const container = document.getElementById("container");

//Form elements
const form = document.querySelector("form");
const submitButton= document.getElementById("submitButton");
const guessInput=document.getElementById("guess");
let previousGuessDiv=document.getElementById("previousGuess");
let guessesRemainingDiv=document.getElementById("guessesRemaining");
const playAgainButton=document.getElementById("playAgain");

//Alerts
const alert=document.getElementById("alert2");
const alert1=document.getElementById("alert1");

//Variables
let guess;
let previousGuess=-1;
let guessRemainingNum=10;
const randomNumber=Math.floor(Math.random() * 100)+1;
let guesses=[];


setEventListeners();    


//Set event listeners
function setEventListeners() {
    lightTheme.addEventListener("click", changeToLightTheme);
    darkTheme.addEventListener("click", changeToDarkTheme);
    form.addEventListener("submit",guessingProcess);
    playAgainButton.addEventListener("click",refresh);
}

//Check empty
function checkEmpty(number){
    if(number===null || number===""){
        return true;
    }
    return false;
}

//Check magnitude
function checkMagnitude(number){
    if(number<0 || number>100){
        return true;
    } else{
        return false;
    }
}

//Flash effect
function flash(alert){
    alert.style.background="red";
    setTimeout(function(){
        alert.style.background="";
    },500)
}

//Laughing
function laugh(){
    var audio = new Audio('../img/laughing.mp3');
    audio.play();
}

//Beep
function beep() {
    var snd = new Audio("data:audio/wav;base64,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qJrx4KOQjahZxWbcZgztj2c49nKmkId44S71j0c8eV9yDK6uPRzx5X18eDvjvQ6yKo9ZSS6l//8elePK/Lf//IInrOF/FvDoADYAGBMGb7FtErm5MXMlmPAJQVgWta7Zx2go+8xJ0UiCb8LHHdftWyLJE0QIAIsI+UbXu67dZMjmgDGCGl1H+vpF4NSDckSIkk7Vd+sxEhBQMRU8j/12UIRhzSaUdQ+rQU5kGeFxm+hb1oh6pWWmv3uvmReDl0UnvtapVaIzo1jZbf/pD6ElLqSX+rUmOQNpJFa/r+sa4e/pBlAABoAAAAA3CUgShLdGIxsY7AUABPRrgCABdDuQ5GC7DqPQCgbbJUAoRSUj+NIEig0YfyWUho1VBBBA//uQZB4ABZx5zfMakeAAAAmwAAAAF5F3P0w9GtAAACfAAAAAwLhMDmAYWMgVEG1U0FIGCBgXBXAtfMH10000EEEEEECUBYln03TTTdNBDZopopYvrTTdNa325mImNg3TTPV9q3pmY0xoO6bv3r00y+IDGid/9aaaZTGMuj9mpu9Mpio1dXrr5HERTZSmqU36A3CumzN/9Robv/Xx4v9ijkSRSNLQhAWumap82WRSBUqXStV/YcS+XVLnSS+WLDroqArFkMEsAS+eWmrUzrO0oEmE40RlMZ5+ODIkAyKAGUwZ3mVKmcamcJnMW26MRPgUw6j+LkhyHGVGYjSUUKNpuJUQoOIAyDvEyG8S5yfK6dhZc0Tx1KI/gviKL6qvvFs1+bWtaz58uUNnryq6kt5RzOCkPWlVqVX2a/EEBUdU1KrXLf40GoiiFXK///qpoiDXrOgqDR38JB0bw7SoL+ZB9o1RCkQjQ2CBYZKd/+VJxZRRZlqSkKiws0WFxUyCwsKiMy7hUVFhIaCrNQsKkTIsLivwKKigsj8XYlwt/WKi2N4d//uQRCSAAjURNIHpMZBGYiaQPSYyAAABLAAAAAAAACWAAAAApUF/Mg+0aohSIRobBAsMlO//Kk4soosy1JSFRYWaLC4qZBYWFRGZdwqKiwkNBVmoWFSJkWFxX4FFRQWR+LsS4W/rFRb/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////VEFHAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAU291bmRib3kuZGUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAMjAwNGh0dHA6Ly93d3cuc291bmRib3kuZGUAAAAAAAAAACU=");  
    snd.play();
}

//Applause
function applause(){
    var audio = new Audio('../img/applause2.mp3');
    audio.play();
}

//Refresh page
function refresh(){
    location.reload();
}

//Display play again
function playAgain(){
    submitButton.style.display="none";
    playAgainButton.style.display="block";
}


//Update previous guess
function updatePreviousGuess(number){
    previousGuessDiv.textContent=number;
}

//Guessing process
function guessingProcess(e){

    if(guessRemainingNum===0){
        throw new Error("Stopping the function!");
    }

    guess=guessInput.value.trim();

    //Check user input
    if(checkEmpty(guess)){
        alert1.style.display="block";
        alert1.textContent="Type a number!";
        e.preventDefault();
        throw new Error("Stopping the function!");
    } else{
        alert1.style.display="none";
    }

    if(checkMagnitude(guess)){
        alert1.style.display="block";
        alert1.textContent="Number is between 1 and 100 !";
        e.preventDefault();
        throw new Error("Stopping the function!");
    } else{
        alert1.style.display="none";
    }

    //Check if guess is correct
    if(guess<randomNumber){
        alert.textContent="Too low! Try again";
        beep();
        flash(alert);

        guessesRemainingDiv.textContent = --guessRemainingNum;

        if(guessRemainingNum===0){
            alert.textContent="You lose AHHAHAHA";
            laugh();
            playAgain();
            e.preventDefault();
            return;
        }

    } else if(guess>randomNumber){
        alert.textContent="Too high! Try again";
        beep();
        flash(alert);

        guessesRemainingDiv.textContent = --guessRemainingNum;

        if(guessRemainingNum===0){
            alert.textContent="You lose AHHAHAHA";
            laugh();
            playAgain();
            e.preventDefault();
            return;
        }


    } else{
        alert.textContent="Correct!";
        applause();
        guessRemainingNum=0;
        guessesRemainingDiv.textContent = 0;
        playAgain();
    }

    guesses.push(guess);
    previousGuess++;
    
    //Update previous guess
    if(previousGuess>-1){
        previousGuessDiv.textContent=guesses[previousGuess];
        console.log(guesses);
    }

    e.preventDefault();

}

//Change to light theme
function changeToLightTheme(e) {
    container.style.color="white";
    lightTheme.style.display="none";
    darkTheme.style.display="inline";
    submitButton.style.background="white";
    submitButton.style.color="black";
    alert.className="alert alert-light";
    container.className="Bcontainer bg-dark";

    e.preventDefault();
}

//Change to dark theme
function changeToDarkTheme(e) {
    container.style.color="black";
    lightTheme.style.display="inline";
    darkTheme.style.display="none";
    submitButton.style.background="black";
    submitButton.style.color="white";
    alert.className="alert alert-dark";
    container.className="Bcontainer bg-light";
    lightTheme.style.color="black";

    e.preventDefault();
}
