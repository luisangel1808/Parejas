let names = [];
let n;
let images = [];
let move = true;
let figuras = 0;
let minutes = 0;
let seconds = 0;
const urlAPI = "https://randomfox.ca/images/";
let aciertos = 0;
let fallos = 0;
const main = document.getElementById("main");
const login = document.getElementById("login");
const container = document.querySelector(".container");
const feedbackContainer = document.querySelector(".feedback");
const timerContainer = document.querySelector(".timer__p");
timerContainer.innerHTML = `00:00`;
function init() {
  const timer = () => {
    setInterval(setTimer, 1000);
  };

  const setTimer = () => {
    seconds++;
    if (seconds === 60) {
      seconds = 0;
      minutes++;
    }
    secondsBoard = `${seconds}`;
    minutesBoard = `${minutes}`;
    if (seconds < 10) {
      secondsBoard = `0${seconds}`;
    }
    if (minutes < 10) {
      minutesBoard = `0${minutes}`;
    }
    timerContainer.innerHTML = `${minutesBoard}:${secondsBoard}`;
  };

  timer();
  login.classList.add("hidden");
  main.classList.remove("hidden");
  for (let index = 1; index <= figuras; index++) {
    images.push(`https://randomfox.ca/images/${index}.jpg`);
  }

  let Squares = images.concat(images).map((symbol) => {
    return {
      symbol: symbol,
      value: Math.random(),
    };
  });

  const p = document.querySelector(".p");
  p.innerHTML = "Vamos!";
  feedbackContainer.appendChild(p);

  Squares.sort((a, b) => {
    if (a.value > b.value) {
      return 1;
    }
    if (a.value < b.value) {
      return -1;
    }
    return 0;
  });

  let rowContainer = document.createElement("div");

  Squares.map((square, index) => {
    const squareContainer = document.createElement("div");
    squareContainer.classList.add("square");
    squareContainer.setAttribute("id", `${index}`);
    squareContainer.setAttribute("image", `${square.symbol}`);
    const img = document.createElement("img");
    img.src = "assets/img/question.png";
    squareContainer.onclick = () => {
      if (move) {
        checkPair(squareContainer);
      }
    };
    squareContainer.appendChild(img);
    if (index % n === 0) {
      rowContainer = document.createElement("div");
      rowContainer.classList.add("row");
    }
    container.appendChild(rowContainer);
    rowContainer.appendChild(squareContainer);
  });

  let squareSelected = [];

  const checkPair = (square) => {
    if (squareSelected.length == 0) {
      squareSelected.push(square);
    } else if (squareSelected.length == 1) {
      if (square.getAttribute("id") !== squareSelected[0].getAttribute("id")) {
        squareSelected.push(square);
      }
    }

    squareSelected[squareSelected.length - 1].lastChild.src = squareSelected[
      squareSelected.length - 1
    ].getAttribute("image");

    if (squareSelected.length == 2) {
      squareSelected[0].getAttribute("image") === square.getAttribute("image")
        ? goodAnswer()
        : badAnswer();
    }
  };

  const goodAnswer = () => {
    p.innerHTML = "Genial!";
    feedbackContainer.appendChild(p);
    squareSelected.splice(0);
    aciertos++;
    if (aciertos === figuras) {
      saveScore();
      removeElements();
      playAgain();
      alert("Felicidades, ganaste");
    }
  };

  const badAnswer = () => {
    p.innerHTML = "Ups!";
    move = false;
    fallos++;
    feedbackContainer.appendChild(p);
    setTimeout(
      () =>
        squareSelected.map((square, index) => {
          square.lastChild.src = "assets/img/question.png";
          if (index === 1) {
            squareSelected.splice(0);
            move = true;
          }
        }),
      1000
    );
  };

  list = document.querySelector(".list");
  const saveScore = () => {
    li = document.createElement("li");
    li.innerHTML = `${names[names.length - 1]} Errores:${fallos}`;
    list.appendChild(li);
  };
}

function start() {
  const level = document.getElementById("level");
  const name = document.getElementById("name").value;
  names.push(name);
  level.checked === true ? (n = 6) : (n = 4);
  figuras = n ** 2 / 2;
  init();
}
function removeElements() {
  while (container.lastChild) {
    container.removeChild(container.lastChild);
  }

  aciertos = 0;
  fallos = 0;
  images = [];
}

function playAgain() {
  main.classList.add("hidden");
  login.classList.remove("hidden");
}
