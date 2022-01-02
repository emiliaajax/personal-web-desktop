
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
    #snakeX = 15
    #snakeY = 100
    #snakeMoveX = 1
    #snakeMoveY = 0
    #snakeLength = 50
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
        const snakeMoveX = this.#snakeMoveX
        const snakeLength = this.#snakeLength
        if (this.#snakeMoveX > 0) {
          switch (event.key) {
            case 'ArrowUp':
              this.#snakeMoveX = this.#snakeMoveY
              this.#snakeMoveY = -snakeMoveX
              this.#snakeLength = this.#snakeWidth
              this.#snakeWidth = snakeLength
              break
            case 'ArrowDown':
              this.#snakeMoveX = this.#snakeMoveY
              this.#snakeMoveY = snakeMoveX
              this.#snakeLength = this.#snakeWidth
              this.#snakeWidth = snakeLength
              break
          }
        }
        if (this.#snakeMoveX < 0) {
          switch (event.key) {
            case 'ArrowUp':
              this.#snakeMoveX = this.#snakeMoveY
              this.#snakeMoveY = snakeMoveX
              this.#snakeLength = this.#snakeWidth
              this.#snakeWidth = snakeLength
              break
            case 'ArrowDown':
              this.#snakeMoveX = this.#snakeMoveY
              this.#snakeMoveY = -snakeMoveX
              this.#snakeLength = this.#snakeWidth
              this.#snakeWidth = snakeLength
              break
          }
        }
        if (this.#snakeMoveY > 0) {
          switch (event.key) {
            case 'ArrowRight':
              this.#snakeMoveX = this.#snakeMoveY
              this.#snakeMoveY = snakeMoveX
              this.#snakeLength = this.#snakeWidth
              this.#snakeWidth = snakeLength
              break
            case 'ArrowLeft':
              this.#snakeMoveX = -this.#snakeMoveY
              this.#snakeMoveY = snakeMoveX
              this.#snakeLength = this.#snakeWidth
              this.#snakeWidth = snakeLength
              break
          }
        }
        if (this.#snakeMoveY < 0) {
          switch (event.key) {
            case 'ArrowRight':
              this.#snakeMoveX = -this.#snakeMoveY
              this.#snakeMoveY = snakeMoveX
              this.#snakeLength = this.#snakeWidth
              this.#snakeWidth = snakeLength
              break
            case 'ArrowLeft':
              this.#snakeMoveX = this.#snakeMoveY
              this.#snakeMoveY = snakeMoveX
              this.#snakeLength = this.#snakeWidth
              this.#snakeWidth = snakeLength
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
      }, 50)
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
      this.#drawRect(this.#snakeX, this.#snakeY, this.#snakeLength, this.#snakeWidth, 'green')
    }

    /**
     * Moves the snake.
     */
    #moveSnake () {
      this.#snakeX += this.#snakeMoveX
      this.#snakeY += this.#snakeMoveY
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
