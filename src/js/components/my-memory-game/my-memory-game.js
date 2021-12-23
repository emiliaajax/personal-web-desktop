
import '../my-flipping-tile/index.js'

const template = document.createElement('template')

template.innerHTML = `
  <div id='counter'>Moves: 0</div>
  <div id='board'></div>
  <style>
    :host {
      --tile-size: 80px;
    }
    #board {
      display: grid;
      grid-template-columns: repeat(4, var(--tile-size));
      gap: 10px;
      justify-content: center;
    }
    :host([easy]) #board {
      grid-template-columns: repeat(2, var(--tile-size));
    }
    #counter {
      font-size: 1.5rem;
      text-align: center;
      margin-bottom: 20px;
      font-family: Impact, Haettenschweiler, 'Arial Narrow Bold', sans-serif; 

    }
    my-flipping-tile {
      width: var(--tile-size);
      height: var(--tile-size);
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
    /**
     * Creates an instance of current type.
     */
    constructor () {
      super()
      this.attachShadow({ mode: 'open' })
        .appendChild(template.content.cloneNode(true))
      this.#board = this.shadowRoot.querySelector('#board')
    }

    /**
     * Called after the element is inserted in the DOM.
     */
    connectedCallback () {
      if (this.hasAttribute('easy')) {
        this.#size = 4
      }
      if (this.hasAttribute('medium')) {
        this.#size = 8
      }
      this.#createTiles()
      this.shadowRoot.querySelectorAll('.tile').forEach(tile => tile.addEventListener('flip', () => {
        tile.setAttribute('revealed', '')
        this.#checkTilesRevealed()
      }))
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
        img.setAttribute('src', shuffledImageArray[i])
        tile.append(img)
        // tile.addEventListener('flip', () => {
        //   tile.setAttribute('revealed', '')
        //   this.#checkTilesRevealed()
        // })
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
          this.shadowRoot.querySelector('#counter').textContent = `Moves: ${this.#counter}`
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
        this.shadowRoot.querySelectorAll('.tile').forEach(tile => tile.removeAttribute('disabled', ''))
      }, 1000)
    }

    /**
     * Returns a shuffled array of relative adresses to the images used in the game. Inspired by code from A3 assignment.
     *
     * @returns {string[]} A shuffled array of relative adresses to images.
     */
    #collectAndShuffleImages () {
      const imageArray = []
      for (let j = 1; j <= this.#size / 2; j++) {
        imageArray.push(`../../images/${j}.png`)
        imageArray.push(`../../images/${j}.png`)
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
  }
)
