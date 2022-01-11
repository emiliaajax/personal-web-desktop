/**
 * The my-memory-game web component module.
 *
 * @author Emilia Hansson <eh222yn@student.lnu.se>
 * @version 1.0.0
 */

import '../my-flipping-tile/index.js'
import '../my-username-form/my-username-form.js'

/**
 * Urls to images used in component. Tile images retrieved from NASA Image Gallery at https://images.nasa.gov/.
 */
const tileImages = 8
const tileImageUrls = []
for (let i = 0; i < tileImages; i++) {
  tileImageUrls[i] = (new URL(`images/${i + 1}.png`, import.meta.url)).href
}
const backgroundImage = (new URL('images/memory-background.jpg', import.meta.url)).href

/**
 * Defines template.
 */
const template = document.createElement('template')
template.innerHTML = `
  <div id='levels'>
    <button id='easy'>Easy</button>
    <button id='intermediate'>Intermediate</button>
    <button id='difficult'>Difficult</button>
  </div>
  <div id='memory-game' class='hidden'>
    <div id='counter'>0</div>
    <div id='board'></div>
  </div>
  <div id='game-over' class='hidden'>
    <div id='score-text'></div>
    <table id='high-score'><tbody></tbody></table>
    <div id='buttons'>
      <button id='play-again'>Play again</button>
      <button id='change-level'>Change level</button>
    </div>
  </div>
  <style>
    :host {
      /* Some style regarding tiles are inspired from the solution to the exercise */
      --tile-size: 100px;
      background: url('${backgroundImage}');
      background-position: top;
      width: 500px;
      height: 500px;
    }
    #levels {
      padding-top: 170px;
    }
    button {
      display: block;
      margin: 0 auto;
      margin-top: 10px;
      width: 100px;
      height: 30px;
      background-color: #000;
      color: white;
      border: 1px solid #000;
      border-radius: 5px;
      cursor: pointer;
      opacity: 0.9;
    }
    button:focus {
      outline: 2px solid white;
    }
    #board {
      display: grid;
      grid-template-columns: repeat(4, var(--tile-size));
      gap: 10px;
      justify-content: center;
    }
    :host([level = 'easy']) #board {
      grid-template-columns: repeat(2, var(--tile-size)) !important;
      padding-top: 110px;
    }
    :host([level = 'intermediate']) #board {
      padding-top: 110px;
    }
    :host([level = 'difficult']) #board {
      padding-top: 40px;
    }
    #counter {
      font-size: 1.1rem;
      text-align: center;
      padding-top: 5px;
      padding-bottom: 6px;
      color: white;
      max-width: 40px;
      height: 20px;
      margin: 0 auto;
      border-radius: 0px 0px 10px 10px;
      background-color: rgb(0, 0, 0, 0.8);
      font-family: Impact, Haettenschweiler, 'Arial Narrow Bold', sans-serif;
    }
    #game-over {
      padding-top: 110px;
    }
    #score-text {
      text-align: center;
      color: white;
      font-size: 1.3rem;
    }
    #high-score {
      margin: 0 auto;
      margin-top: 20px;
      width: 250px;
      height: 150px;
      background-color: rgb(0, 0, 0, 0.6);
      color: white;
      border-width: thin;
      text-align: center;
      text-transform: capitalize;
      padding-bottom: 10px;
      border-radius: 10px;
    }
    #high-score th, #high-score td {
      width: 50%;
    }
    #buttons {
      margin-top: 20px;
      display: grid;
      grid-template-columns: 1fr 0.9fr 0.9fr 1fr;
    }
    #memory-game button {
      float: left;
      margin-top: 0;
      background-color: rgb(0, 0, 0, 0.8);
      border: none;
    }
    #game-over button {
      display: inline-block;
      text-align: center;
      width: 100px;
      height: 30px;
      margin: 0 auto;
    }
    #play-again {
      grid-column: 2/3;
    }
    #change-level {
      grid-column: 3/4;
    }
    .hidden {
      display: none;
    }
  </style>
`

/**
 * Defines custom element.
 */
customElements.define('my-memory-game',
  /**
   * Represents a my-memory-game element.
   */
  class extends HTMLElement {
    /**
     * Represents all the level button elements.
     *
     * @type {HTMLDivElement}
     */
    #levels
    /**
     * The number of moves done in the game.
     *
     * @type {number}
     */
    #moves = 0
    /**
     * The size of the grid.
     *
     * @type {number}
     */
    #size = 16
    /**
     * Represents the memory game area.
     *
     * @type {HTMLDivElement}
     */
    #memoryGame
    /**
     * Represents the game board.
     *
     * @type {HTMLDivElement}
     */
    #board
    /**
     * Represents the counter.
     *
     * @type {HTMLDivElement}
     */
    #counter
    /**
     * Represents the easy level button.
     *
     * @type {HTMLButtonElement}
     */
    #easyLevel
    /**
     * Represents the intermediate level button.
     *
     * @type {HTMLButtonElement}
     */
    #intermediateLevel
    /**
     * Represents the difficult level button.
     *
     * @type {HTMLButtonElement}
     */
    #difficultLevel
    /**
     * Represents the game over element.
     *
     * @type {HTMLDivElement}
     */
    #gameOver
    /**
     * The highscore object retrieved from localStorage.
     *
     * @type {object}
     */
    #highScore
    /**
     * An array with alt text for the memory images.
     *
     * @type {string[]}
     */
    #imagesAltText = ['Earth', 'Mars', 'Mercury',
      'Venus', 'Jupiter', 'Saturn', 'Uranus', 'Neptune']

    /**
     * Creates an instance of current type.
     */
    constructor () {
      super()
      this.attachShadow({ mode: 'open' })
        .appendChild(template.content.cloneNode(true))

      this.#easyLevel = this.shadowRoot.querySelector('#easy')
      this.#intermediateLevel = this.shadowRoot.querySelector('#intermediate')
      this.#difficultLevel = this.shadowRoot.querySelector('#difficult')
      this.#memoryGame = this.shadowRoot.querySelector('#memory-game')
      this.#board = this.shadowRoot.querySelector('#board')
      this.#counter = this.shadowRoot.querySelector('#counter')
      this.#gameOver = this.shadowRoot.querySelector('#game-over')
      this.#levels = this.shadowRoot.querySelector('#levels')

      // Event handlers
      this.#easyLevel.addEventListener('click', event => this.#setLevel(event, 'easy'))
      this.#intermediateLevel.addEventListener('click', event => this.#setLevel(event, 'intermediate'))
      this.#difficultLevel.addEventListener('click', event => this.#setLevel(event, 'difficult'))
      this.shadowRoot.querySelector('#play-again').addEventListener('click', event => this.#playAgain(event))
      this.shadowRoot.querySelector('#change-level').addEventListener('click', event => this.#changeLevel(event))
    }

    /**
     * Attributes to monitor.
     *
     * @returns {string[]} A string array of attributes.
     */
    static get observedAttributes () {
      return ['level']
    }

    /**
     * Called when one or several of the observed attributes changes.
     *
     * @param {string} name - The attribute's name.
     * @param {*} oldValue - The old value.
     * @param {*} newValue - The new value.
     */
    attributeChangedCallback (name, oldValue, newValue) {
      if (name === 'level' && oldValue !== newValue) {
        if (newValue === 'easy') {
          this.#size = 4
        }
        if (newValue === 'intermediate') {
          this.#size = 8
        }
        if (newValue === 'difficult') {
          this.#size = 16
        }
        this.#createTiles()
      }
    }

    /**
     * Creates tiles depending on size of the grid.
     */
    #createTiles () {
      this.#board.textContent = ''
      const shuffledImageArray = this.#collectAndShuffleImages()
      for (let i = 0; i < this.#size; i++) {
        const tile = document.createElement('my-flipping-tile')
        tile.classList.add('tile')
        const img = document.createElement('img')
        img.setAttribute('src', shuffledImageArray[i].src)
        img.setAttribute('alt', shuffledImageArray[i].alt)
        tile.append(img)
        tile.addEventListener('flip', () => {
          tile.setAttribute('revealed', '')
          this.#checkTilesRevealed()
        })
        this.#board.append(tile)
      }
    }

    /**
     * Checks how many tiles are revealed.
     */
    async #checkTilesRevealed () {
      const tiles = Array.from(this.shadowRoot.querySelectorAll('.tile')).filter(tile => tile.hasAttribute('revealed'))
      if (tiles.length === 2) {
        this.shadowRoot.querySelectorAll('.tile').forEach(tile => tile.setAttribute('disabled', ''))
        setTimeout(() => {
          this.#moves += 1
          this.#counter.textContent = `${this.#moves}`
        }, 400)
        this.#checkIfMatch(tiles)
      }
    }

    /**
     * Checks if the revealed tiles match.
     *
     * @param {Element[]} tiles An array with revealed tiles to compare.
     */
    #checkIfMatch (tiles) {
      if (tiles[0].querySelector('img').getAttribute('src') === tiles[1].querySelector('img').getAttribute('src')) {
        tiles[0].setAttribute('invisible', '')
        tiles[1].setAttribute('invisible', '')
      }
      setTimeout(() => {
        tiles[0].removeAttribute('revealed')
        tiles[1].removeAttribute('revealed')
        this.shadowRoot.querySelectorAll('.tile').forEach(tile => tile.removeAttribute('disabled'))
        this.#checkIfAllTilesCollected()
      }, 500)
    }

    /**
     * Checks if all tiles has been collected.
     */
    #checkIfAllTilesCollected () {
      if (Array.from(this.shadowRoot.querySelectorAll('.tile')).every(tile => tile.hasAttribute('invisible'))) {
        this.#setHighscore()
        this.#displayGameOver()
      }
    }

    /**
     * Returns a shuffled array of relative adresses to the images used in the game. Inspired by code from A3 assignment (deck module, shuffle method).
     *
     * @returns {string[]} A shuffled array of adresses to images.
     */
    #collectAndShuffleImages () {
      const imageArray = []
      for (let j = 0; j < this.#size / 2; j++) {
        const imageObject = {
          src: tileImageUrls[j],
          alt: this.#imagesAltText[j]
        }
        imageArray.push(imageObject)
        imageArray.push(imageObject)
      }
      let i = imageArray.length
      while (i) {
        const j = Math.floor((Math.random() * i))
        const x = imageArray[--i]
        imageArray[i] = imageArray[j]
        imageArray[j] = x
      }
      return imageArray
    }

    /**
     * Sets the level of the memory game.
     *
     * @param {Event} event The click event.
     * @param {string} level The level of the memory game.
     */
    #setLevel (event, level) {
      event.preventDefault()
      this.setAttribute('level', level)
      this.#levels.classList.add('hidden')
      this.#memoryGame.classList.remove('hidden')
    }

    /**
     * Displays when all tiles has been collected and game is over.
     */
    #displayGameOver () {
      this.#createTiles()
      this.#memoryGame.classList.add('hidden')
      this.shadowRoot.querySelector('#score-text').textContent = `YOUR SCORE: ${this.#moves}`
      this.#gameOver.classList.remove('hidden')
      this.#moves = 0
      this.#counter.textContent = `${this.#moves}`
      this.shadowRoot.querySelectorAll('.tile').forEach(tile => tile.removeAttribute('invisible'))
    }

    /**
     * Sets the high score.
     */
    #setHighscore () {
      if (!localStorage.getItem('memoryHighscore')) {
        localStorage.setItem('memoryHighscore', JSON.stringify({
          easy: '-',
          intermediate: '-',
          difficult: '-'
        }))
      }
      this.#compareScores()
      this.#updateScoreBoard()
    }

    /**
     * Compares the current score with the high score.
     */
    #compareScores () {
      this.#highScore = JSON.parse(localStorage.getItem('memoryHighscore'))
      if (this.getAttribute('level') === 'easy' && (this.#moves < this.#highScore.easy || this.#highScore.easy === '-')) {
        this.#highScore.easy = this.#moves
      }
      if (this.getAttribute('level') === 'intermediate' && (this.#moves < this.#highScore.intermediate || this.#highScore.intermediate === '-')) {
        this.#highScore.intermediate = this.#moves
      }
      if (this.getAttribute('level') === 'difficult' && (this.#moves < this.#highScore.difficult || this.#highScore.difficult === '-')) {
        this.#highScore.difficult = this.#moves
      }
      localStorage.setItem('memoryHighscore', JSON.stringify(this.#highScore))
    }

    /**
     * Creates a table containing the top scores for respective level.
     */
    #updateScoreBoard () {
      const levels = Object.keys(this.#highScore)
      const scores = Object.values(this.#highScore)
      const table = this.shadowRoot.querySelector('#high-score tbody')
      table.textContent = ''
      for (let i = 0; i < levels.length; i++) {
        const tr = document.createElement('tr')
        tr.append(this.#createTableContent(`${levels[i]}`))
        tr.append(this.#createTableContent(`${scores[i]}`))
        table.append(tr)
      }
    }

    /**
     * Returns a td element with text content.
     *
     * @param {string} text A string to be inserted in a td element.
     * @returns {HTMLElement} A td element.
     */
    #createTableContent (text) {
      const content = document.createElement('td')
      content.textContent = text
      return content
    }

    /**
     * Restarts the game on the current level.
     *
     * @param {Event} event The click event.
     */
    #playAgain (event) {
      event.preventDefault()
      this.#gameOver.classList.add('hidden')
      this.#memoryGame.classList.remove('hidden')
    }

    /**
     * Restarts game from choosing level.
     *
     * @param {Event} event The click event.
     */
    #changeLevel (event) {
      event.preventDefault()
      this.#gameOver.classList.add('hidden')
      this.#levels.classList.remove('hidden')
    }
  }
)
