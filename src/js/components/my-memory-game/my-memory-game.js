
import '../my-flipping-tile/index.js'
import '../nickname-form/nickname-form.js'
import '../high-score/high-score.js'

const template = document.createElement('template')

template.innerHTML = `
  <div id='levels'>
    <button id='easy'>Easy</button>
    <button id='medium'>Medium</button>
    <button id='difficult'>Difficult</button>
  </div>
  <div id='memory-game' class='hidden'>
    <div id='counter'>0</div>
    <div id='board'></div>
  </div>
  <div id='game-over' class='hidden'>
    <div id='text'></div>
    <table id='high-score'>
      <tbody></tbody>
    </table>
    <div id='buttons'>
      <button id='play-again'>Play again</button>
      <button id='change-level'>Change level</button>
    </div>
  </div>
  <style>
    :host {
      --tile-size: 100px;
      background: url('../../../images/memory-background-2.jpg');
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
      background-color: #333;
      color: white;
      border: 1px solid #000;
      border-radius: 5px;
    }
    #board {
      display: grid;
      grid-template-columns: repeat(4, var(--tile-size));
      gap: 10px;
      justify-content: center;
    }
    :host([level = 'easy']) #board {
      grid-template-columns: repeat(2, var(--tile-size)) !important;
      padding-top: 90px;
    }
    :host([level = 'medium']) #board {
      padding-top: 90px;
    }
    :host([level = 'difficult']) #board {
      padding-top: 20px;
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
      padding-top: 80px;
    }
    #text {
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
      border: 1px solid black;
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

customElements.define('my-memory-game',
  /**
   * Represents a my-memory-game element.
   */
  class extends HTMLElement {
    #counter = 0
    #size = 16
    #board
    #easyLevel
    #mediumLevel
    #difficultLevel
    #memoryHighscore
    #imagesAltText = ['Earth', 'Mars', 'Mercury',
      'Venus', 'Jupiter', 'Saturn', 'Uranus', 'Neptune']

    /**
     * Creates an instance of current type.
     */
    constructor () {
      super()
      this.attachShadow({ mode: 'open' })
        .appendChild(template.content.cloneNode(true))
      this.#board = this.shadowRoot.querySelector('#board')
      this.#easyLevel = this.shadowRoot.querySelector('#easy')
      this.#mediumLevel = this.shadowRoot.querySelector('#medium')
      this.#difficultLevel = this.shadowRoot.querySelector('#difficult')

      this.#easyLevel.addEventListener('click', event => this.#setLevel(event, 'easy'))
      this.#mediumLevel.addEventListener('click', event => this.#setLevel(event, 'medium'))
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
        if (newValue === 'medium') {
          this.#size = 8
        }
        if (newValue === 'difficult') {
          this.#size = 16
        }
        this.#createTiles()
      }
    }

    /**
     * Called after the element is inserted in the DOM.
     */
    connectedCallback () {
      this.#createTiles()
    }

    /**
     * Create tiles depending on size.
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
          this.#counter += 1
          this.shadowRoot.querySelector('#counter').textContent = `${this.#counter}`
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
      }, 1000)
    }

    /**
     * Checks if all tiles has been collected.
     */
    #checkIfAllTilesCollected () {
      if (Array.from(this.shadowRoot.querySelectorAll('.tile')).every(tile => tile.hasAttribute('invisible'))) {
        this.#setHighscore()
        this.#gameOver()
      }
    }

    /**
     * Returns a shuffled array of relative adresses to the images used in the game. Inspired by code from A3 assignment.
     *
     * @returns {string[]} A shuffled array of relative adresses to images.
     */
    #collectAndShuffleImages () {
      const imageArray = []
      for (let j = 1; j <= this.#size / 2; j++) {
        const imageObject = {
          src: `../../images/${j}.png`,
          alt: this.#imagesAltText[j - 1]
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
      this.shadowRoot.querySelector('#levels').classList.add('hidden')
      this.shadowRoot.querySelector('#memory-game').classList.remove('hidden')
    }

    /**
     * Displays when all tiles has been collected and game is over.
     */
    #gameOver () {
      this.#createTiles()
      this.shadowRoot.querySelector('#memory-game').classList.add('hidden')
      this.shadowRoot.querySelector('#text').textContent = `YOUR SCORE: ${this.#counter}`
      this.shadowRoot.querySelector('#game-over').classList.remove('hidden')
      this.#counter = 0
      this.shadowRoot.querySelector('#counter').textContent = `${this.#counter}`
      this.shadowRoot.querySelectorAll('.tile').forEach(tile => tile.removeAttribute('invisible'))
    }

    /**
     * Sets the high score.
     */
    #setHighscore () {
      if (!localStorage.getItem('memoryHighscore')) {
        localStorage.setItem('memoryHighscore', JSON.stringify({
          easy: '-',
          medium: '-',
          difficult: '-'
        }))
      }
      this.#compareScores()
      this.#updateScoreBoard()
    }

    /**
     * Compares the current score with the high score. If the current score is better, it will be set as the new high score.
     */
    #compareScores () {
      this.#memoryHighscore = JSON.parse(localStorage.getItem('memoryHighscore'))
      if (this.getAttribute('level') === 'easy' && (this.#counter < this.#memoryHighscore.easy || this.#memoryHighscore.easy === '-')) {
        this.#memoryHighscore.easy = this.#counter
      }
      if (this.getAttribute('level') === 'medium' && (this.#counter < this.#memoryHighscore.medium || this.#memoryHighscore.medium === '-')) {
        this.#memoryHighscore.medium = this.#counter
      }
      if (this.getAttribute('level') === 'difficult' && (this.#counter < this.#memoryHighscore.difficult || this.#memoryHighscore.difficult === '-')) {
        this.#memoryHighscore.difficult = this.#counter
      }
      localStorage.setItem('memoryHighscore', JSON.stringify(this.#memoryHighscore))
    }

    /**
     * Creates a table containing the top scores for respective level.
     */
    #updateScoreBoard () {
      const levels = Object.keys(this.#memoryHighscore)
      const scores = Object.values(this.#memoryHighscore)
      const table = this.shadowRoot.querySelector('#high-score tbody')
      table.textContent = ''
      for (let i = 0; i < levels.length; i++) {
        const tr = document.createElement('tr')
        tr.append(this.#createTableContent(`${levels[i]}`))
        tr.append(this.#createTableContent(`🌟 ${scores[i]}`))
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
      this.shadowRoot.querySelector('#game-over').classList.add('hidden')
      this.shadowRoot.querySelector('#memory-game').classList.remove('hidden')
    }

    /**
     * Restarts game from choosing level.
     *
     * @param {Event} event The click event.
     */
    #changeLevel (event) {
      event.preventDefault()
      this.shadowRoot.querySelector('#game-over').classList.add('hidden')
      this.shadowRoot.querySelector('#levels').classList.remove('hidden')
    }
  }
)
