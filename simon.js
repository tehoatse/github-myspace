let level = 1;
let sequence = [];
let guessNumber = 0;

function Button (element, sound){
    this.element = element;
    this.sound = new Audio(sound);
}

const buttons = [
    new Button(document.querySelector(".green"), "assets/green.mp3"),
    new Button(document.querySelector(".red"), "assets/red.mp3"),
    new Button(document.querySelector(".yellow"), "assets/yellow.mp3"),
    new Button(document.querySelector(".blue"), "assets/blue.mp3")
];

Button.prototype.playSound = function(){
        this.sound.play();
}

document.addEventListener("keydown", startGame);

function startGame(){
    resetGame();
    for(let button of buttons){
        button.element.addEventListener("click", function(){
            handleClick(button);
        });
    } 
    gameLoop(); 
}

function gameLoop(){
    document.querySelector("h1").innerHTML = "Level " + level;    
    getNextButton();
}

function handleClick(button){    
    
    button.playSound();
    flashButton(button.element);
    
    if(checkSequence(button, guessNumber)){
        guessNumber++;
    }
    else{
        new Audio("assets/wrong.mp3").play();
        document.querySelector("h1").innerHTML = "Game Over, Press Any Key to Restart";
        resetGame();
        document.addEventListener("keydown", gameLoop);
        document.body.classList.add("game-over");
        setTimeout(function(){
            document.body.classList.remove("game-over");
        }, 200);
    }

    if(guessNumber == level){
        level++;
        guessNumber = 0;
        setTimeout(function(){
            getNextButton();
        }, 500);
        document.querySelector("h1").innerHTML = "Level " + level;
    }
}

function flashButton(element){
    element.classList.add("pressed");
    setTimeout(function(){
        element.classList.remove("pressed");
        }, 100);
}

function getNextButton(){
    sequence.push(Math.floor(Math.random() * 4));
    showButton(buttons, sequence[level-1]);
}

function showButton(buttons, button){
    buttons[button].element.style.opacity = "0";
    buttons[button].playSound();
    setTimeout(function(){
        buttons[button].element.style.opacity = "1";
    }, 100);
}

function checkSequence(button, clickNumber){

    if(buttons.indexOf(button) == sequence[clickNumber]){
        return true;
    }
    else{
        return false;
    }
}

function resetGame(){
    level = 1;
    while(sequence.length > 0){
        sequence.pop();   
    }
    guessNumber = 0;
    document.removeEventListener("keydown", startGame);
}

