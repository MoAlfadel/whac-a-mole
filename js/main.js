const boxes = document.querySelectorAll(".box");
const scoreDisplay = document.getElementById("score");
const timeLeft = document.getElementById("timeLeft");
const highestDisplay = document.getElementById("highestDisplay");
const newGame = document.getElementById("new");
const clearHicstory = document.getElementById("clear");
const positiveClickAudio = document.getElementById("positiveClickSound");
const nagativeClickSound = document.getElementById("nagativeClickSound");
let activelevel = document.querySelector(".active").textContent.trim();
let moveTime;

let randomBox;
let result = 0;
const colors = [
  "#2a9d8f",
  "#264653",
  "#e9c46a",
  "#e76f51",
  "#d62828",
  "#457b9d",
  "#ffafcc",
  "#4f772d",
  "#7b2cbf",
  "#450920",
  "#6a040f",
  "#d90429",
  "#03045e",
  "#e63946",
  "#240046",
  "#03071e",
];

if (activelevel === "one") {
  moveTime = 400;
} else if (activelevel === "two") {
  moveTime = 250;
} else if (activelevel === "three") {
  moveTime = 160;
}
console.log(moveTime);
//playing time
let time = +timeLeft.innerText;

let moveMole = window.setInterval(() => {
  setMoleToRandomBox();
}, moveTime); //move mole every .4s and set mole to random

function setMoleToRandomBox() {
  boxes.forEach((box) => {
    box.classList.remove("mole");
    box.style.backgroundColor = "transparent";
  });
  randomBox = boxes[getRandomInt(0, 8)];
  randomBox.classList.add("mole");
  randomBox.style.backgroundColor = colors[getRandomInt(0, colors.length)]; //set random color to mole (randomBox)
}

let countDown = window.setInterval(() => {
  timeLeft.innerHTML--;
  controlPlay();
}, 1000);

//control the play (check if the time left )
function controlPlay() {
  if (timeLeft.innerHTML == 0) {
    clearInterval(countDown); //the time left (stp count down )
    clearInterval(moveMole); // do not move mole
    boxes.forEach((box) => {
      box.classList.remove("mole"); //remove the mole style
    });
    randomBox.style.backgroundColor = "transparent"; //remove background color
    randomBox = null; //no randox to click  it
  }
}

// get random int from range [min , max]
function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

//play
boxes.forEach((box) => {
  box.addEventListener("click", (e) => {
    if (e.target.id === randomBox.id) {
      positiveClickAudio.play();
      result++;
      scoreDisplay.textContent = result;
    } else {
      nagativeClickSound.play();
    }
  });
});

//check the result if it > hightest
setTimeout(() => {
  if (!localStorage[`${activelevel}`]) {
    localStorage[`${activelevel}`] = result;
  } else if (result > localStorage[`${activelevel}`]) {
    localStorage[`${activelevel}`] = result;
  }
  // update the score
  highestDisplay.innerHTML = localStorage[`${activelevel}`];
}, time * 1000); // after the game end

// display when open the page
displayHightest();

//display hightest score
function displayHightest() {
  highestDisplay.innerHTML = localStorage[`${activelevel}`] || 0;
}

clearHicstory.addEventListener("click", () => {
  localStorage.removeItem(`${activelevel}`);
  displayHightest();
});

newGame.addEventListener("click", () => {
  window.location.reload();
});
