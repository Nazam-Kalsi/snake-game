let button = document.querySelector("button");
let board = document.getElementById("board");
let score = document.getElementById("score");
let hscore = document.getElementById("hscore");
let direction = "Right";
let snakebody = [{ x: 9, y: 11 }];
let food = foodcordinate();
let t;
hscore.innerHTML = (sessionStorage.getItem(1))?hscore.innerHTML = sessionStorage.getItem(1):"00";


function draw() {
  board.innerHTML = "";
  create();
  foodgenerate(); //get x and y from foodcordinate()
}

function create() {
  snakebody.forEach((block) => {
    let body = document.createElement("div");
    body.classList.add("snake");
    body.style.gridColumn = block.x;
    body.style.gridRow = block.y;
    board.append(body);
  });
}

function foodgenerate() {
  let foods = document.createElement("div");
  foods.classList.add("food");
  foods.style.gridRow = food.y;
  foods.style.gridColumn = food.x;
  board.append(foods);
}
function foodcordinate() {
  let x = Math.floor(Math.random() * (44 - 1) + 1);
  let y = Math.floor(Math.random() * (30 - 1) + 1);
  return { x, y };
}

function wallbreak() {
  sessionStorage.setItem(1, score.innerHTML);
  location.reload();
}

document.addEventListener("keydown", (q) => {
  if (q.keyCode == 37 || q.keyCode == 65) {
    //a
    direction = "Left";
  } else if (q.keyCode == 39 || q.keyCode == 68) {
    //d
    direction = "Right";
  } else if (q.keyCode == 38 || q.keyCode == 87) {
    //w
    direction = "Up";
  } else if (q.keyCode == 40 || q.keyCode == 83) {
    //s
    direction = "Down";
  }
});

function movement() {
  let head = { ...snakebody[0] };
  if (direction == "Left") {
    head.x--;
  } else if (direction == "Right") {
    head.x++;
  } else if (direction == "Up") {
    head.y--;
  } else if (direction == "Down") {
    head.y++;
  }
  snakebody.unshift(head);
  if (head.x == food.x && head.y == food.y) {
    score.innerHTML++;
    food = foodcordinate();
    foodgenerate();
  } else {
    snakebody.pop();
  }

  if (head.x == 0 || head.x == 46 || head.y == 0 || head.y == 31) {
    wallbreak();

  }
}
button.addEventListener("click", ()=>{
  start()
});

function start() {
 setInterval(() => {
    movement();
    draw();
  }, 300);
}

draw(); //create snake body and food.
foodcordinate(); //to get x any y for foodgenerate function.
