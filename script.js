const hangmanImage = document.querySelector(".hangman-box img");
const wordShow = document.querySelector(".word-view");
const predictText = document.querySelector(".predict-text b");
const keypadDIV = document.querySelector(".keypad");
const gameOverlay = document.querySelector(".game-overlay");
const tryAgainBtn = document.querySelector(".try-again");

let presentWord, correctLetters, incorrectPredictCount;
const maxPredict = 6;

const resetGame = () => { 
    // resetting all game variables and UI elements
    correctLetters = [];
    incorrectPredictCount = 0;
    hangmanImage.src = `images/hangman-${incorrectPredictCount}.svg`;
    predictText.innerText = `${incorrectPredictCount} ${maxPredict}`;
    keypadDIV.querySelectorAll("button").forEach(btn => btn.disabled = false);
    wordShow.innerHTML = presentWord.split("").map(() => `<li class="letter"></li>`).join("");
    gameOverlay.classList.remove("view");
}

const getRandomWord = () => {
    // selecting a random word and hint from the wordlist
    const { word, hint } = wordList[Math.floor(Math.random() * wordList.length)];
    presentWord = word;
    document.querySelector(".hint-word b").innerText = hint;
    resetGame();
    
}
const gameOver = (isVictory) => {
    // After 600ms of the game complete.. showing overlay with relevant details
    setTimeout(() => {
        const overlayText = isVictory ? `you found the word:` : `The correct word is:`;
        gameOverlay.querySelector("img").src = `images/${isVictory ? 'victory' : 'lost'}.gif`;
        gameOverlay.querySelector("h4").innerText = `${isVictory ? 'Congrats!' : 'Game Over!'}`;
        gameOverlay.querySelector("p").innerHTML = `${overlayText} <b>${presentWord}</b>`;
        gameOverlay.classList.add("view");
    }, 250);
}

const initGame = (button, clickedLetter) => {
// checking if clickedLetter exist on the presentWord
if (presentWord.includes(clickedLetter)){
    // showing all correct letters in the word show
   [...presentWord].forEach((letter, index) => {
    if(letter === clickedLetter) {
        correctLetters.push(letter);
        wordShow.querySelectorAll("li")[index].innerText = letter;
        wordShow.querySelectorAll("li")[index].classList.add("predicted");
    }
   });
} else{
    // if clicked letter doesn't exist in then update the incorrectPredictCount and hangman image
    incorrectPredictCount++;
    hangmanImage.src = `images/hangman-${incorrectPredictCount}.svg`;
}

button.disabled = true;
 predictText.innerText = `${incorrectPredictCount} ${maxPredict}`;

 // calling gaveOver function if any of these condition meets
 if(incorrectPredictCount === maxPredict) return gameOver(false);
 if(correctLetters.length === presentWord.length) return gameOver(true);
}

// creating keypad buttons and adding event listeners
for (let i = 97; i<= 122; i++) {
    const button = document.createElement("button");
    button.innerText = String.fromCharCode(i);
    keypadDIV.appendChild(button);
    button.addEventListener("click", e => initGame(e.target, String.fromCharCode(i)));
    
}

getRandomWord();
tryAgainBtn.addEventListener("click", getRandomWord);
    



















