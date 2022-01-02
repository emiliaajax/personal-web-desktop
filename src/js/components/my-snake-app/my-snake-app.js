
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
    #snakeLength = 50
    /**
     * Creates an instance of current type.
     */
    constructor () {
      super()
      this.attachShadow({ mode: 'open' })
        .appendChild(template.content.cloneNode(true))

      this.#canvas = this.shadowRoot.querySelector('#game-canvas')
      this.#canvasContext = this.#canvas.getContext('2d')
    }

    /**
     * Called after the element is inserted in the DOM.
     */
    connectedCallback () {
      setInterval(() => {
        this.#moveSnake()
        this.#drawGameContent()
      }, 20)
    }

    /**
     * Draws the game content.
     */
    #drawGameContent () {
      this.#drawRect(0, 0, this.#canvas.width, this.#canvas.height, 'black')
      this.#drawRect(this.#snakeX, this.#snakeY, this.#snakeLength, 10, 'green')
    }

    /**
     * Moves the snake.
     */
    #moveSnake () {
      this.#snakeX += this.#snakeMoveX
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
