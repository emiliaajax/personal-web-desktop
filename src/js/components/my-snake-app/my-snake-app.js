
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
    #snake = [
      { x: 50, y: 200, moveX: 1, moveY: 0 },
      { x: 40, y: 200, moveX: 1, moveY: 0 },
      { x: 30, y: 200, moveX: 1, moveY: 0 },
      { x: 20, y: 200, moveX: 1, moveY: 0 },
      { x: 10, y: 200, moveX: 1, moveY: 0 }]

    #snakeHead = this.#snake[0]
    #snakeMoveX = 1
    #snakeMoveY = 0
    #snakeLength = 10
    #snakeWidth = 10
    #intervalID
    /**
     * Creates an instance of current type.
     */
    constructor () {
      super()
      this.attachShadow({ mode: 'open' })
        .appendChild(template.content.cloneNode(true))

      this.#canvas = this.shadowRoot.querySelector('#game-canvas')
      this.#canvasContext = this.#canvas.getContext('2d')

      document.addEventListener('keydown', event => {
        event.preventDefault()
        if (this.#snakeHead.moveX > 0) {
          switch (event.key) {
            case 'ArrowUp':
              this.#snakeHead.moveX = this.#snakeMoveY
              this.#snakeHead.moveY = -this.#snakeMoveX
              break
            case 'ArrowDown':
              this.#snakeHead.moveX = this.#snakeMoveY
              this.#snakeHead.moveY = this.snakeMoveX
              break
          }
        }
        if (this.#snakeHead.moveX < 0) {
          switch (event.key) {
            case 'ArrowUp':
              this.#snakeHead.moveX = this.#snakeMoveY
              this.#snakeHead.moveY = this.#snakeMoveX
              break
            case 'ArrowDown':
              this.#snakeHead.moveX = this.#snakeMoveY
              this.#snakeHead.moveY = -this.snakeMoveX
              break
          }
        }
        if (this.#snakeHead.moveY > 0) {
          switch (event.key) {
            case 'ArrowRight':
              this.#snakeHead.moveX = this.#snakeMoveY
              this.#snakeHead.moveY = this.#snakeMoveX
              break
            case 'ArrowLeft':
              this.#snakeHead.moveX = -this.#snakeMoveY
              this.#snakeHead.moveY = this.snakeMoveX
              break
          }
        }
        if (this.#snakeHead.moveY < 0) {
          switch (event.key) {
            case 'ArrowRight':
              this.#snakeHead.moveX = -this.#snakeMoveY
              this.#snakeHead.moveY = this.#snakeMoveX
              break
            case 'ArrowLeft':
              this.#snakeHead.moveX = this.#snakeMoveY
              this.#snakeHead.moveY = this.snakeMoveX
              break
          }
        }
      })
    }

    /**
     * Called after the element is inserted in the DOM.
     */
    connectedCallback () {
      this.#intervalID = setInterval(() => {
        this.#moveSnake()
        this.#drawGameContent()
      }, 30)
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
      this.#snake.forEach(part => this.#drawRect(part.x, part.y, this.#snakeLength, this.#snakeWidth, 'green'))
    }

    /**
     * Moves the snake.
     */
    #moveSnake () {
      this.#snake.forEach(part => {
        part.x += part.moveX
        part.y += part.moveY
      })
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
