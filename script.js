const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

const box = 20;
let snake = [{x:9 * box, y:10 *box}];
let direction = 'RIGHT';
let food = {
    x: math.floor(Math.random() * 19 + 1)*box,
    y: math.floor(Math.random() * 19 + 1)*box
}
let score = 0;
document.addEventListener('keydown', changeDirection);

function changeDirection(event){
 if(event.keycode === 37 && direction !== 'RIGHT'){
    direction = 'LEFT';
 }else if(event.keycode === 38 && direction !== 'DOWN'){
    direction = 'UP';
 }else if(event.keycode === 39 && direction !== 'LEFT'){
    direction = 'RIGHT';
 }else if(event.keycode === 40 && direction !== 'UP'){
    direction = 'DOWN';
 }
}

        function drawSnake() {
            for (let i = 0; i < snake.length; i++) {
                ctx.fillStyle = (i === 0) ? 'green' : 'lightgreen';
                ctx.fillRect(snake[i].x, snake[i].y, box, box);
                ctx.strokeStyle = 'darkgreen';
                ctx.strokeRect(snake[i].x, snake[i].y, box, box);
            }
        }

        function drawFood() {
            ctx.fillStyle = 'red';
            ctx.fillRect(food.x, food.y, box, box);
        }

        function collision(head, array) {
            for (let i = 0; i < array.length; i++) {
                if (head.x === array[i].x && head.y === array[i].y) {
                    return true;
                }
            }
            return false;
        }

        function gameLoop() {
            if (snake[0].x < 0 || snake[0].x >= canvas.width || 
                snake[0].y < 0 || snake[0].y >= canvas.height || 
                collision(snake[0], snake.slice(1))) {
                clearInterval(game);
                alert("Game Over! Your score: " + score);
                return;
            }

            let headX = snake[0].x;
            let headY = snake[0].y;

            if (direction === 'LEFT') headX -= box;
            if (direction === 'UP') headY -= box;
            if (direction === 'RIGHT') headX += box;
            if (direction === 'DOWN') headY += box;

            const newHead = { x: headX, y: headY };

            if (newHead.x === food.x && newHead.y === food.y) {
                score++;
                food = {
                    x: Math.floor(Math.random() * 19 + 1) * box,
                    y: Math.floor(Math.random() * 19 + 1) * box
                };
            } else {
                snake.pop(); // Remove the tail
            }

            if (!collision(newHead, snake)) {
                snake.unshift(newHead); // Add new head
            }

            ctx.clearRect(0, 0, canvas.width, canvas.height);
            drawSnake();
            drawFood();
        }

        const game = setInterval(gameLoop, 100);