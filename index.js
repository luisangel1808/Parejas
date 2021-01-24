let player;
let n;
let images = [];
let move = true;
let figuras = 0;
let minutes = 0;
let seconds = 0;
let secondsBoard=0;
let minutesBoard=0;
let uncoveredSquares=[]
let active = true;
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
    timer();
  
  login.classList.add("hidden");
  main.classList.remove("hidden");
  let index=  Math.ceil(Math.random()*20)
  for ( let i=index; i < (figuras+index); i++) {
    images.push(`${urlAPI}${i}.jpg`);
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
    if (uncoveredSquares.includes(square.id)===false) {
      if (squareSelected.length == 0) {
        squareSelected.push(square);
      } else if (squareSelected.length == 1) {
        if (square.getAttribute("id") !== squareSelected[0].getAttribute("id")) {
          squareSelected.push(square);
        }
      }
    squareSelected[squareSelected.length - 1].lastChild.src = squareSelected[squareSelected.length - 1].getAttribute("image");
      if (squareSelected.length == 2) {
        squareSelected[0].getAttribute("image") === square.getAttribute("image")
          ? goodAnswer()
          : badAnswer();
      }
    };
  }
  const goodAnswer = () => {
    uncoveredSquares.push(squareSelected[0].id)
    uncoveredSquares.push(squareSelected[1].id)
    p.innerHTML = "Genial!";
    feedbackContainer.appendChild(p);
    squareSelected.splice(0);
    aciertos++;
    if (aciertos === figuras) {
      active=false;
      alert("Felicidades, ganaste");
      showTable();
      removeElements();
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


}

function start() {
  const level = document.getElementById("level");
  player = document.getElementById("name").value;
  level.checked === true ? (n = 6) : (n = 2);
  figuras = n ** 2 / 2;
  init();
}
function removeElements() {
  while (container.lastChild) {
    container.removeChild(container.lastChild);
  }
  minutes = 0;
  seconds = 0;
  aciertos = 0;
  fallos = 0;
  secondsBoard=0;
  minutesBoard=0;
  uncoveredSquares= []
  images = [];
}

function playAgain() {
  main.classList.add("hidden");
  login.classList.remove("hidden");
}

const showTable = () =>{
  const scoresBody = document.getElementById('scoresbody')
  const tdName = document.createElement('td')
  const tRow = document.createElement('tr')
  scoresBody.appendChild(tRow);
  tdName.innerText=player
  tRow.appendChild(tdName)
  const tdScore = document.createElement('td')
  tdScore.innerText=`${fallos}`
  tRow.appendChild(tdScore)
  const tdTime = document.createElement('td')
  tdTime.innerText=`${minutesBoard}:${secondsBoard}`
  tRow.appendChild(tdTime)
  const scoresContainer=document.getElementById('scores')
  scoresContainer.classList.replace('hidden','scores')
  main.classList.replace('main','hidden')
  const playAgain = document.getElementById('playAgain')
  playAgain.onclick = () =>{
      scoresContainer.classList.replace('scores','hidden')
      const loginContainer=document.getElementById('login')
      loginContainer.classList.replace('hidden','login')
      main.classList.add("hidden");
      login.classList.remove("hidden");
      active=true;
  }
}   

function timer(){
  
  setInterval(() => {
    
    if (active===true) {
      
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
  }
},1000);
}



