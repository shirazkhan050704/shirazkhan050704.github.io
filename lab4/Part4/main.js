const para = document.querySelector('p');

// Variable to track the number of balls
let count = 0;

// Select the canvas element and get the drawing context
const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');

// Set canvas dimensions to fill the window
const width = canvas.width = window.innerWidth;
const height = canvas.height = window.innerHeight;

// Function to generate a random integer between min and max
function random(min,max) {
  return Math.floor(Math.random()*(max-min)) + min;
};

// Function to generate a random RGB color
function randomRGB() {
  return `rgb(${random(0, 255)},${random(0, 255)},${random(0, 255)})`;
}

// Base class for shapes
class Shape {
  constructor(x, y, velX, velY) {
    this.x = x;
    this.y = y;
    this.velX = velX;
    this.velY = velY;
  }
}

// Ball class extending Shape
class Ball extends Shape {
  constructor(x, y, velX, velY, color, size) {
    super(x, y, velX, velY);
    this.color = color;
    this.size = size;
    this.exists = true; // Track if ball is still active
  }

  // Draw the ball on the canvas
  draw() {
    ctx.beginPath();
    ctx.fillStyle = this.color;
    ctx.arc(this.x, this.y, this.size, 0, 2 * Math.PI);
    ctx.fill();
  }

  // Update ball position and handle wall collisions
  update() {
    if ((this.x + this.size) >= width || (this.x - this.size) <= 0) {
      this.velX = -this.velX;
    }
    if ((this.y + this.size) >= height || (this.y - this.size) <= 0) {
      this.velY = -this.velY;
    }

    this.x += this.velX;
    this.y += this.velY;
  }

  // Detect collision with other balls and change color on impact
  collisionDetect() {
    for (const ball of balls) {
      if (!(this === ball) && ball.exists) {
        const dx = this.x - ball.x;
        const dy = this.y - ball.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < this.size + ball.size) {
          ball.color = this.color = randomRGB();
        }
      }
    }
  }
}

// EvilCircle class for player-controlled object
class EvilCircle extends Shape {
  constructor(x, y) {
    super(x, y, 20, 20);
    this.color = "white";
    this.size = 10;

    // Add keyboard controls for movement
    window.addEventListener('keydown', (e) => {
      switch(e.key) {
        case 'a': this.x -= this.velX; break;
        case 'd': this.x += this.velX; break;
        case 'w': this.y -= this.velY; break;
        case 's': this.y += this.velY; break;
      }
    });
  }

  // Draw the EvilCircle
  draw() {
    ctx.beginPath();
    ctx.strokeStyle = this.color;
    ctx.lineWidth = 3;
    ctx.arc(this.x, this.y, this.size, 0, 2 * Math.PI);
    ctx.stroke();
  }

  // Prevent EvilCircle from moving outside canvas boundaries
  checkBounds() {
    if ((this.x + this.size) >= width) this.x -= this.size;
    if ((this.x - this.size) <= 0) this.x += this.size;
    if ((this.y + this.size) >= height) this.y -= this.size;
    if ((this.y - this.size) <= 0) this.y += this.size;
  }

  // Detect collision with balls and remove them
  collisionDetect() {
    for (const ball of balls) {
      if (ball.exists) {
        const dx = this.x - ball.x;
        const dy = this.y - ball.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < this.size + ball.size) {
          ball.exists = false;
          count--;
          para.textContent = 'Ball count: ' + count;
        }
      }
    }
  }
}

// Array to store all ball objects
const balls = [];

// Generate 25 balls with random properties
while (balls.length < 25) {
  const size = random(10, 20);
  const ball = new Ball(
    random(0 + size, width - size),
    random(0 + size, height - size),
    random(-7, 7),
    random(-7, 7),
    randomRGB(),
    size
  );
  balls.push(ball);
  count++;
  para.textContent = 'Ball count: ' + count;
}

// Create an instance of EvilCircle
const evilBall = new EvilCircle(random(0, width), random(0, height));

// Main animation loop
function loop() {
  ctx.fillStyle = 'rgba(0, 0, 0, 0.25)'; // Create a fading effect
  ctx.fillRect(0, 0, width, height);

  for (const ball of balls) {
    if (ball.exists) {
      ball.draw();
      ball.update();
      ball.collisionDetect();
    }
  }

  evilBall.draw();
  evilBall.checkBounds();
  evilBall.collisionDetect();

  requestAnimationFrame(loop); // Recursively call loop to keep animation running
}

// Start the animation loop
loop();