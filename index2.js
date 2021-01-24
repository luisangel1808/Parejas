class Game{
    constructor(player, level, figuras){

        this.player=player;
        this.level= level;
        this.images = [];
        this.move = true;
        this.figuras = figuras;
        this.squares
        this.minutes = 0;
        this.seconds = 0;
        this.urlAPI = "https://randomfox.ca/images/";
        this.aciertos = 0;
        this.fallos = 0;
        this.squareSelected = [];
        this.init();
        this.timer();
        const feedbackContainer = document.querySelector(".feedback");
        

    }

    init() {      
        const main = document.getElementById("main");
        const login = document.getElementById("login");
        login.classList.add("hidden");
        main.classList.remove("hidden");
        const container = document.querySelector(".container");
        let index=  Math.round(Math.random*20)
        for ( let i=1; i <= figuras+index; i++) {
          this.images.push(`${urlAPI}${index}.jpg`);
        }
      
        this.squares = this.images.concat(this.images).map((symbol) => {
          return {
            symbol: symbol,
            value: Math.random(),
          };
        });
      
        this.squares.sort((a, b) => {
          if (a.value > b.value) {
            return 1;
          }
          if (a.value < b.value) {
            return -1;
          }
          return 0;
        });
      
        let rowContainer = document.createElement("div");
      
        this.squares.map((square, index) => {
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
          console.log('a')
        });
      
    }
      

    timer(){
        
            setInterval(() => {
                if (this.active===true) {
                    const timerContainer = document.querySelector(".timer__p");
                    this.seconds++;
                    if (this.seconds === 60) {
                    this.seconds = 0;
                    this.minutes++;
                    }
                    this.secondsBoard = `${this.seconds}`;
                    this.minutesBoard = `${this.minutes}`;
                    if (this.seconds < 10) {
                    this.secondsBoard = `0${this.seconds}`;
                    }
                    if (this.minutes < 10) {
                    this.minutesBoard = `0${this.minutes}`;
                    }
                    timerContainer.innerHTML = `${this.minutesBoard}:${this.secondsBoard}`;
                }
            },1000);       
    }
}  

function start(){    
    const level = document.getElementById("level");
    const name = document.getElementById("name").value;
    level.checked === true ? (n = 6) : (n = 4);
    figuras = n ** 2 / 2;
    const game = new Game(name,level)
}