/**
 * The my-snake-game web component module.
 *
 * @author Emilia Hansson <eh222yn@student.lnu.se>
 * @version 1.0.0
 */

/**
 * Urls to images used in component.
 */
const snakeTextImage = (new URL('images/snake-text.jpg', import.meta.url)).href
const snakeStartButtonImage = (new URL('images/snake-start-button.png', import.meta.url)).href
const gameOverTextImage = (new URL('images/game-over.png', import.meta.url)).href
const yesButtonImage = (new URL('images/yes.png', import.meta.url)).href
const highlightedYesButtonImage = (new URL('images/yes-highlighted.png', import.meta.url)).href
const noButtonImage = (new URL('images/no.png', import.meta.url)).href
const highlightedNoButtonImage = (new URL('images/no-highlighted.png', import.meta.url)).href

/**
 * Defines template
 */
const template = document.createElement('template')
template.innerHTML = `
  <canvas id='game-canvas' width='500' height='500' tabindex=0></canvas>
  <div id='start-game'>
    <img id='snake-text' src='${snakeTextImage}' alt='Snake' width='300'>
    <button id='start'>
      <img src="${snakeStartButtonImage}" alt='Start game button'>
    </button>
  </div>
  <div id='game-over' class='hidden'>
    <img src='${gameOverTextImage}' alt='Game Over! Play again?' width='300'>
    <button id='restart' focused>
      <img src='${highlightedYesButtonImage}' alt='Yes button'>
    </button>
    <button id='quit'>
      <img src='${noButtonImage}' alt='No button'>
    </button>
  </div>
  <style>
    canvas:focus {
      outline: none;
    }
    #restart {
      position: absolute;
      left: 65px;
      top: 140px;
    }
    #quit {
      position: absolute;
      left: 175px;
      top: 140px;
    }
    #restart, #quit {
      background-color: rgb(0, 0, 0, 0);
      border: none;
      outline: none;
      cursor: pointer;
    }
    #start {
      position: absolute;
      left: 150px;
      top: 270px;
      background-color: rgb(0, 0, 0, 0);
      border: none;
      outline: none;
      cursor: pointer;
    }
    #start:focus {
      outline: 2px solid white;
    }
    #snake-text {
      position: absolute;
      left: 100px;
      top: 170px;
    }
    #game-over img {
      position: absolute;
      left: 100px;
      top: 150px;
    }
    #start img {
      width: 200px;
    }
    .hidden {
      display: none !important;
    }
  </style>
`

/**
 * Defines custom element.
 */
customElements.define('my-snake-game',
  /**
   * Represents a my-snake-game element.
   */
  class extends HTMLElement {
    /**
     * A boolean value indicating that a keydown event is active.
     *
     * @type {boolean}
     */
    #active
    /**
     * Represents the start button element.
     *
     * @type {HTMLButtonElement}
     */
    #startButton
    /**
     * Represents the restart button element.
     *
     * @type {HTMLButtonElement}
     */
    #restartButton
    /**
     * Represents the quit button element.
     *
     * @type {HTMLButtonElement}
     */
    #quitButton
    /**
     * Represents the start game element.
     *
     * @type {HTMLDivElement}
     */
    #start
    /**
     * Represents the canvas.
     *
     * @type {HTMLCanvasElement}
     */
    #canvas
    /**
     * The 2d drawing context on the canvas.
     *
     * @type {HTMLCanvasElement}
     */
    #canvasContext
    /**
     * The velocity of the snake.
     *
     * @type {number}
     */
    #velocity = 20
    /**
     * The start velocity of the snake in x-direction.
     *
     * @type {number}
     */
    #snakeMoveX = this.#velocity
    /**
     * The start velocity of the snake in y-direction.
     *
     * @type {number}
     */
    #snakeMoveY = 0
    /**
     * The length of one part of the snake.
     *
     * @type {number}
     */
    #snakeLength = 19
    /**
     * The width of one part of the snake.
     *
     * @type {number}
     */
    #snakeWidth = 19
    /**
     * The interval identifier.
     *
     * @type {number}
     */
    #intervalID
    /**
     * Representation of the food.
     *
     * @type {object}
     */
    #food
    /**
     * The score of current game.
     *
     * @type {number}
     */
    #score = 0
    /**
     * The high score.
     *
     * @type {number}
     */
    #highScore = 0
    /**
     * Representation of the snake. Inspired by: https://www.educative.io/blog/javascript-snake-game-tutorial.
     *
     * @type {object}
     */
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
      this.#startButton = this.shadowRoot.querySelector('#start')
      this.#restartButton = this.shadowRoot.querySelector('#restart')
      this.#quitButton = this.shadowRoot.querySelector('#quit')
      this.#start = this.shadowRoot.querySelector('#start-game')

      // Event handlers
      this.#startButton.addEventListener('click', event => {
        event.preventDefault()
        this.#start.classList.add('hidden')
        this.#startGame()
      })

      this.#canvas.addEventListener('keydown', event => this.#turnSnake(event))

      this.#quitButton.addEventListener('click', event => this.#quitGame(event))
      this.#quitButton.addEventListener('mouseover', () => this.#focusOnNoButton())
      this.#quitButton.addEventListener('mouseleave', () => this.#removeFocusOnNoButton())
      this.#quitButton.addEventListener('focus', () => {
        this.#focusOnNoButton()
        this.#removeFocusOnYesButton()
      })

      this.#restartButton.addEventListener('click', event => this.#restartGame(event))
      this.#restartButton.addEventListener('mouseover', () => this.#focusOnYesButton())
      this.#restartButton.addEventListener('mouseleave', () => this.#removeFocusOnYesButton())
      this.#restartButton.addEventListener('focus', () => {
        this.#focusOnYesButton()
        this.#removeFocusOnNoButton()
      })
    }

    /**
     * Called after the element is inserted in the DOM.
     */
    connectedCallback () {
      this.#drawRect(0, 0, this.#canvas.width, this.#canvas.height, 'black')
      if (!localStorage.getItem('snakeHighScore')) {
        localStorage.setItem('snakeHighScore', JSON.stringify({ score: this.#highScore }))
      }
      this.#highScore = JSON.parse(localStorage.getItem('snakeHighScore')).score
    }

    /**
     * Called after the element is removed from the DOM.
     */
    disconnectedCallback () {
      clearInterval(this.#intervalID)
    }

    /**
     * Starts the game.
     */
    #startGame () {
      this.#canvas.focus()
      this.#food = {
        x: Math.floor(Math.random() * ((this.#canvas.width * 0.8) - 35) + 35),
        y: Math.floor(Math.random() * ((this.#canvas.height * 0.8) - 35) + 35)
      }
      this.#intervalID = setInterval(() => {
        this.#moveSnake()
        this.#drawGameContent()
        this.#snakeEatsFood()
        this.#collisionDetection()
        this.#active = false
      }, 80)
    }

    /**
     * Draws the game content.
     */
    #drawGameContent () {
      this.#drawRect(0, 0, this.#canvas.width, this.#canvas.height, 'black')
      this.#drawRect(this.#food.x, this.#food.y, 5, 5, 'white')
      this.#snake.forEach(part => this.#drawRect(part.x, part.y, this.#snakeLength, this.#snakeWidth, '#00FF00'))
      this.#drawScore(`${this.#score}`, 10, 25)
      this.#drawScore(`⭐  ${this.#highScore}`, 420, 25)
    }

    /**
     * A template for drawing a rectangle.
     *
     * @param {number} posX The x position where the rectangle will be drawn.
     * @param {number} posY The y position where the rectangle will be drawn.
     * @param {number} width The width of the rectangle.
     * @param {number} height The height of the rectangle.
     * @param {string} color The color of the rectangle.
     */
    #drawRect (posX, posY, width, height, color) {
      this.#canvasContext.fillStyle = color
      this.#canvasContext.fillRect(posX, posY, width, height)
    }

    /**
     * Draws a score at the canvas.
     *
     * @param {string} scoreText The text to be drawn.
     * @param {number} x The x position.
     * @param {number} y The y positon.
     */
    #drawScore (scoreText, x, y) {
      this.#canvasContext.font = '16px Arial'
      this.#canvasContext.fillStyle = 'white'
      this.#canvasContext.fillText(scoreText, x, y)
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
      if (event.key === 'ArrowUp' || event.key === 'ArrowDown' ||
        event.key === 'ArrowRight' || event.key === 'ArrowLeft') {
        event.preventDefault()
      }
      if (this.#snakeMoveX !== 0 && !this.#active) {
        switch (event.key) {
          case 'ArrowUp':
            this.#snakeMoveX = 0
            this.#snakeMoveY = -this.#velocity
            this.#active = true
            break
          case 'ArrowDown':
            this.#snakeMoveX = 0
            this.#snakeMoveY = this.#velocity
            this.#active = true
            break
        }
      }
      if (this.#snakeMoveY !== 0 && !this.#active) {
        switch (event.key) {
          case 'ArrowRight':
            this.#snakeMoveX = this.#velocity
            this.#snakeMoveY = 0
            this.#active = true
            break
          case 'ArrowLeft':
            this.#snakeMoveX = -this.#velocity
            this.#snakeMoveY = 0
            this.#active = true
            break
        }
      }
    }

    /**
     * Adds length to the snake if the coordinates of the food and the head of the snake match. When a food is eaten, a new appears at randomized coordinates.
     */
    #snakeEatsFood () {
      if (this.#food.x >= this.#snake[0].x &&
        this.#food.x <= this.#snake[0].x + this.#snakeWidth &&
        this.#food.y >= this.#snake[0].y &&
        this.#food.y <= this.#snake[0].y + this.#snakeLength) {
        this.#food = {
          x: Math.floor(Math.random() * ((this.#canvas.width * 0.9) - 5) + 5),
          y: Math.floor(Math.random() * ((this.#canvas.height * 0.9) - 35) + 35)
        }
        this.#score += 100
        this.#snake.push({
          x: this.#snake[this.#snake.length - 1].x + this.#snakeWidth,
          y: this.#snake[this.#snake.length - 1].y + this.#snakeLength
        })
      }
    }

    /**
     * Checks if game has collided with itself. If it has, the game is over.
     */
    #collisionDetection () {
      for (let i = 1; i < this.#snake.length; i++) {
        if (this.#snake[i].x >= this.#snake[0].x &&
          this.#snake[i].x <= this.#snake[0].x + this.#snakeWidth &&
          this.#snake[i].y >= this.#snake[0].y &&
          this.#snake[i].y <= this.#snake[0].y + this.#snakeLength) {
          clearInterval(this.#intervalID)
          setTimeout(() => {
            this.#gameOver()
            this.#setHighScore()
          }, 300)
        }
      }
    }

    /**
     * Displays game over.
     */
    #gameOver () {
      this.#drawRect(0, 0, this.#canvas.width, this.#canvas.height, 'black')
      this.shadowRoot.querySelector('#game-over').classList.remove('hidden')
      this.#restartButton.focus()
    }

    /**
     * Restarts the game.
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
      this.#startGame()
    }

    /**
     * Sets focus on the yes button.
     */
    #focusOnYesButton () {
      this.shadowRoot.querySelector('#restart img').setAttribute('src', highlightedYesButtonImage)
    }

    /**
     * Removes focus on the yes button.
     */
    #removeFocusOnYesButton () {
      this.shadowRoot.querySelector('#restart img').setAttribute('src', yesButtonImage)
    }

    /**
     * Sets focus on the no button.
     */
    #focusOnNoButton () {
      this.shadowRoot.querySelector('#quit img').setAttribute('src', highlightedNoButtonImage)
      this.shadowRoot.querySelector('#restart img').setAttribute('src', yesButtonImage)
    }

    /**
     * Removes focus on the no button.
     */
    #removeFocusOnNoButton () {
      this.shadowRoot.querySelector('#quit img').setAttribute('src', noButtonImage)
    }

    /**
     * Indicates that the game should be ended.
     *
     * @param {Event} event The click event.
     */
    #quitGame (event) {
      event.preventDefault()
      this.dispatchEvent(new CustomEvent('quit'))
    }

    /**
     * Sets the high score.
     */
    #setHighScore () {
      const highScore = JSON.parse(localStorage.getItem('snakeHighScore'))
      if (this.#score > highScore.score) {
        highScore.score = this.#score
        localStorage.setItem('snakeHighScore', JSON.stringify(highScore))
        this.#highScore = this.#score
      }
    }
  }
)
