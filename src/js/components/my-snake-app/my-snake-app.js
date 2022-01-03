
const template = document.createElement('template')

template.innerHTML = `
  <canvas id='game-canvas' width='500' height='500'></canvas>
  <button class='hidden'>Restart game</button>
  <div id='game-over' class='hidden'>Game Over</div>
  <style>
    #game-over {
      font-size: 40px;
      position: fixed;
      left: 28%;
      top: 35%;
      z-index: 1000;
      color: white;
    }
    button {
      position: fixed;
      /* left: 10px; */
      left: 35%;
      top: 45%;
    }
    .hidden {
      display: none !important;
    }
  </style>
`

customElements.define('my-snake-app',
  /**
   * Represents a my-snake-app element.
   */
  class extends HTMLElement {
    #canvas
    #canvasContext
    #velocity = 20
    #snakeMoveX = this.#velocity
    #snakeMoveY = 0
    #snakeLength = 19
    #snakeWidth = 19
    #intervalID
    #foodPosition
    #score = 0
    #snake = [
      { x: 250, y: 200 }, { x: 230, y: 200 }, { x: 210, y: 200 },
      { x: 190, y: 200 }, { x: 170, y: 200 }, { x: 150, y: 200 }
    ]

    /**
     * Creates an instance of current type.
     */
    constructor () {
      super()
      this.attachShadow({ mode: 'open' })
        .appendChild(template.content.cloneNode(true))

      this.#canvas = this.shadowRoot.querySelector('#game-canvas')
      this.#canvasContext = this.#canvas.getContext('2d')

      document.addEventListener('keydown', event => this.#turnSnake(event))
      this.shadowRoot.querySelector('button').addEventListener('click', event => this.#restartGame(event))
    }

    /**
     * Called after the element is inserted in the DOM.
     */
    connectedCallback () {
      this.#startGame()
    }

    /**
     * Starts the game.
     */
    #startGame () {
      this.#foodPosition = {
        x: Math.floor(Math.random() * (this.#canvas.width * 0.7)),
        y: Math.floor(Math.random() * (this.#canvas.height * 0.7))
      }
      this.#intervalID = setInterval(() => {
        this.#moveSnake()
        this.#drawGameContent()
        this.#snakeEatsFood()
        this.#collisionDetection()
      }, 110)
    }

    /**
     * Called after the element is removed from the DOM.
     */
    disconnectedCallback () {
      clearInterval(this.#intervalID)
    }

    /**
     * Draws the game content.
     */
    #drawGameContent () {
      this.#drawRect(0, 0, this.#canvas.width, this.#canvas.height, 'black')
      this.#drawRect(this.#foodPosition.x, this.#foodPosition.y, 5, 5, 'white')
      this.#snake.forEach(part => this.#drawRect(part.x, part.y, this.#snakeLength, this.#snakeWidth, 'green'))
      this.#drawScore()
    }

    /**
     * Moves the snake. Inspired by: https://www.educative.io/blog/javascript-snake-game-tutorial.
     */
    #moveSnake () {
      const snakeHead = { x: this.#snake[0].x + this.#snakeMoveX, y: this.#snake[0].y + this.#snakeMoveY }
      if (snakeHead.x > this.#canvas.width) {
        snakeHead.x = 0
      }
      if (snakeHead.x < 0) {
        snakeHead.x = this.#canvas.width
      }
      if (snakeHead.y > this.#canvas.height) {
        snakeHead.y = 0
      }
      if (snakeHead.y < 0) {
        snakeHead.y = this.#canvas.height
      }
      this.#snake.unshift(snakeHead)
      this.#snake.pop()
    }

    /**
     * Turns the snake depending on pressed arrow key.
     *
     * @param {Event} event The keydown event.
     */
    #turnSnake (event) {
      if (this.#snakeMoveX !== 0) {
        switch (event.key) {
          case 'ArrowUp':
            event.preventDefault()
            this.#snakeMoveX = 0
            this.#snakeMoveY = -this.#velocity
            break
          case 'ArrowDown':
            event.preventDefault()
            this.#snakeMoveX = 0
            this.#snakeMoveY = this.#velocity
            break
        }
      }
      if (this.#snakeMoveY !== 0) {
        switch (event.key) {
          case 'ArrowRight':
            event.preventDefault()
            this.#snakeMoveX = this.#velocity
            this.#snakeMoveY = 0
            break
          case 'ArrowLeft':
            event.preventDefault()
            this.#snakeMoveX = -this.#velocity
            this.#snakeMoveY = 0
            break
        }
      }
    }

    /**
     * Adds length to the snake if the coordinates of the food and the head of the snake match. When a food is eaten, a new appears at randomized coordinates.
     */
    #snakeEatsFood () {
      if (this.#foodPosition.x >= this.#snake[0].x &&
        this.#foodPosition.x <= this.#snake[0].x + this.#snakeWidth &&
        this.#foodPosition.y >= this.#snake[0].y &&
        this.#foodPosition.y <= this.#snake[0].y + this.#snakeLength) {
        this.#foodPosition = {
          x: Math.floor(Math.random() * this.#canvas.width * 0.7),
          y: Math.floor(Math.random() * this.#canvas.height * 0.7)
        }
        this.#score += 100
        this.#snake.push({
          x: this.#snake[this.#snake.length - 1].x + this.#snakeWidth,
          y: this.#snake[this.#snake.length - 1].y + this.#snakeLength
        })
      }
    }

    /**
     * Draws the score at the top left corner of the canvas.
     */
    #drawScore () {
      this.#canvasContext.font = '16px Arial'
      this.#canvasContext.fillStyle = 'white'
      this.#canvasContext.fillText(`Score: ${this.#score}`, 10, 25)
    }

    /**
     * Sets game over when snake collides with itself.
     */
    #collisionDetection () {
      for (let i = 1; i < this.#snake.length; i++) {
        if (this.#snake[i].x >= this.#snake[0].x &&
          this.#snake[i].x <= this.#snake[0].x + this.#snakeWidth &&
          this.#snake[i].y >= this.#snake[0].y &&
          this.#snake[i].y <= this.#snake[0].y + this.#snakeLength) {
          this.shadowRoot.querySelector('#game-over').classList.remove('hidden')
          this.shadowRoot.querySelector('button').classList.remove('hidden')
          clearInterval(this.#intervalID)
        }
      }
    }

    /**
     * Restarts game.
     *
     * @param {Event} event The click event.
     */
    #restartGame (event) {
      event.preventDefault()
      this.#score = 0
      this.#snakeMoveX = this.#velocity
      this.#snakeMoveY = 0
      this.#snake = [
        { x: 250, y: 200 }, { x: 230, y: 200 }, { x: 210, y: 200 },
        { x: 190, y: 200 }, { x: 170, y: 200 }, { x: 150, y: 200 }
      ]
      this.shadowRoot.querySelector('#game-over').classList.add('hidden')
      this.shadowRoot.querySelector('button').classList.add('hidden')
      this.#startGame()
    }

    /**
     * A template for drawing a rectangle.
     *
     * @param {number} posX The x position where the rectangle will begin.
     * @param {number} posY The y position where the rectangle will begin.
     * @param {number} width The width of the rectangle.
     * @param {number} height The height of the rectangle.
     * @param {string} color The color of the rectangle.
     */
    #drawRect (posX, posY, width, height, color) {
      this.#canvasContext.fillStyle = color
      this.#canvasContext.fillRect(posX, posY, width, height)
    }
  }
)
