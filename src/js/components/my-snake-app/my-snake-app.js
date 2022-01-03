
const template = document.createElement('template')

template.innerHTML = `
  <canvas id='game-canvas' width='500' height='500'></canvas>
`

customElements.define('my-snake-app',
  /**
   * Represents a my-snake-app element.
   */
  class extends HTMLElement {
    #canvas
    #canvasContext
    #velocity = 15
    #snakeMoveX = this.#velocity
    #snakeMoveY = 0
    #snakeLength = 14
    #snakeWidth = 14
    #intervalID
    #foodPosition
    #snake = [
      { x: 250, y: 200 }, { x: 235, y: 200 }, { x: 220, y: 200 },
      { x: 205, y: 200 }, { x: 190, y: 200 }, { x: 175, y: 200 }
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
    }

    /**
     * Called after the element is inserted in the DOM.
     */
    connectedCallback () {
      this.#foodPosition = {
        x: Math.floor(Math.random() * this.#canvas.width),
        y: Math.floor(Math.random() * this.#canvas.height)
      }
      this.#intervalID = setInterval(() => {
        this.#moveSnake()
        this.#drawGameContent()
      }, 100)
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
    }

    /**
     * Moves the snake. Inspired by: https://www.educative.io/blog/javascript-snake-game-tutorial.
     */
    #moveSnake () {
      const snakeHead = { x: this.#snake[0].x + this.#snakeMoveX, y: this.#snake[0].y + this.#snakeMoveY }
      this.#snake.unshift(snakeHead)
      this.#snake.pop()
    }

    /**
     * Turns the snake depending on pressed arrow key.
     *
     * @param {Event} event The keydown event.
     */
    #turnSnake (event) {
      event.preventDefault()
      if (this.#snakeMoveX !== 0) {
        switch (event.key) {
          case 'ArrowUp':
            this.#snakeMoveX = 0
            this.#snakeMoveY = -this.#velocity
            break
          case 'ArrowDown':
            this.#snakeMoveX = 0
            this.#snakeMoveY = this.#velocity
            break
        }
      }
      if (this.#snakeMoveY !== 0) {
        switch (event.key) {
          case 'ArrowRight':
            this.#snakeMoveX = this.#velocity
            this.#snakeMoveY = 0
            break
          case 'ArrowLeft':
            this.#snakeMoveX = -this.#velocity
            this.#snakeMoveY = 0
            break
        }
      }
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
