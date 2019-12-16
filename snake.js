const cvs = document.getElementById("snake");
const ctx = cvs.getContext("2d");

const box = 32;

let snake = [];
snake[0] = { x: 9 * box, y: 10 * box }; //snake starting pos

let food = {
  x: Math.floor(Math.random() * 17 + 1) * box,
  y: Math.floor(Math.random() * 15 + 3) * box
};

let score = 0;
let d;

//control snake
document.addEventListener("keydown", direction);

function direction(event) {
  let key = event.keyCode;
  if (key == 37 && d != "RIGHT") {
    d = "LEFT";
  } else if (key == 38 && d != "DOWN") {
    d = "UP";
  } else if (key == 39 && d != "LEFT") {
    d = "RIGHT";
  } else if (key == 40 && d != "UP") {
    d = "DOWN";
  }
}

//check collision
function collision(head, array) {
  for (let i = 0; i < array.length; i++) {
    if (head.x == array[i].x && head.y == array[i].y) {
      return true;
    }
  }
  return false;
}

//draw to canvas
function draw() {
  ctx.fillStyle = "#8faeb9";
  ctx.fillRect(0, 0, cvs.getAttribute("width"), cvs.getAttribute("height"));
  for (let i = 0; i < snake.length; i++) {
    ctx.fillStyle = i == 0 ? "#2dcaff" : "#7f7f7f";
    ctx.fillRect(snake[i].x, snake[i].y, box, box);

    ctx.strokeStyle = "black";
    ctx.strokeRect(snake[i].x, snake[i].y, box, box);
  }
  ctx.fillStyle = "yellow";
  ctx.fillRect(food.x, food.y, box, box);

  //old head pos
  let snakeX = snake[0].x;
  let snakeY = snake[0].y;

  //which direction
  if (d == "LEFT") snakeX -= box;
  if (d == "RIGHT") snakeX += box;
  if (d == "UP") snakeY -= box;
  if (d == "DOWN") snakeY += box;

  //if snake eats food

  if (snakeX == food.x && snakeY == food.y) {
    score++;
    food = {
      x: Math.floor(Math.random() * 17 + 1) * box,
      y: Math.floor(Math.random() * 15 + 3) * box
    };
  } else {
    //remove tail
    snake.pop();
  }

  let newHead = {
    x: snakeX,
    y: snakeY
  };
  //game over

  if (
    snakeX < box ||
    snakeX > 17 * box ||
    snakeY < box ||
    snakeY > 17 * box ||
    collision(newHead, snake)
  ) {
    clearInterval(game);
  }

  snake.unshift(newHead);

  ctx.fillStyle = "white";
  ctx.font = "45px Changa One";
  ctx.fillText(score, 2 * box, 1.6 * box);
}

let game = setInterval(draw, 100);
