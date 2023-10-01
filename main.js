const letters = "abcdefghijklmnopqrstuvwxyz0123456789+";
let lettersArray = letters.split("");

let lettersContainer = document.querySelector(".letters");
lettersArray.forEach((letter) => {
  let span = document.createElement("span");
  spanText = document.createTextNode(letter);
  span.appendChild(spanText);
  span.className = "letter-box";
  lettersContainer.appendChild(span);
});

const words = {
  programming: ["javascript", "php", "c++", "c", "python", "java"],
  people: [
    "elizabeth",
    "bill gates",
    "gandhi",
    "albert einstein",
    "thomas edison",
    "barack obama",
  ],
  countries: ["egypt", "syria", "palestine", "yemen", "qatar", "bahrain"],
};

let allKeys = Object.keys(words);

let randomPropNumber = Math.floor(Math.random() * allKeys.length);
let randomPropName = allKeys[randomPropNumber];
let randomPropValue = words[randomPropName];

let randomValueNumber = Math.floor(Math.random() * randomPropValue.length);
let randomValueName = randomPropValue[randomValueNumber];

document.querySelector(".game-info span").innerHTML = randomPropName;

let lettersGuessElement = document.querySelector(".letters-guess");
let lettersAndSpace = Array.from(randomValueName);

lettersAndSpace.forEach((letter) => {
  let emptySpan = document.createElement("span");
  if (letter === " ") {
    emptySpan.className = "with-space";
  }
  lettersGuessElement.appendChild(emptySpan);
});

let guessSpans = document.querySelectorAll(".letters-guess span");

let wrongAttempts = 0;
let theDraw = document.querySelector(".hangman-draw");

document.addEventListener("click", (e) => {
  let theStatus = false;

  if (e.target.className === "letter-box") {
    e.target.classList.add("clicked");

    let theClickedLetter = e.target.innerHTML.toLowerCase();

    let theChosenWord = Array.from(randomValueName.toLowerCase());
    theChosenWord.forEach((wordLetter, wordIndex) => {
      if (theClickedLetter == wordLetter) {
        theStatus = true;
        guessSpans.forEach((span, spanIndex) => {
          if (wordIndex === spanIndex) {
            span.innerHTML = theClickedLetter;
          }
        });
      }
    });
    if (theStatus !== true) {
      wrongAttempts++;
      theDraw.classList.add(`wrong-${wrongAttempts}`);

      if (wrongAttempts === 8) {
        endGame();
        lettersContainer.classList.add(`finished`);
      }
    }
  }
});

function endGame() {
  let div = document.createElement("div");
  let divText = document.createTextNode(
    `"Game Over", THE WORD IS ${randomValueName.toUpperCase()}`
  );

  div.appendChild(divText);
  div.classList.add("game-over")
  
  document.body.appendChild(div)
}
