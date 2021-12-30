/**
 * The high-score web component module.
 *
 * @author Emilia Hansson <eh222yn@student.lnu.se>
 * @version 1.1.0
 */

const template = document.createElement('template')

template.innerHTML = `
  <table id='highScore'>
    <tr>
      <th>Nickname</th>
      <th>Score</th>
    </tr>
    <tr>
      <td id='u1'></td>
      <td id='s1'></td>
    </tr>
    <tr>
      <td id='u2'></td>
      <td id='s2'></td>
    </tr>
    <tr>
      <td id='u3'></td>
      <td id='s3'></td>
    </tr>
    <tr>
      <td id='u4'></td>
      <td id='s4'></td>
    </tr>
    <tr>
      <td id='u5'></td>
      <td id='s5'></td>
    </tr>
  </ul>
  <style>
    :host {
      display: block;
      margin: 0 auto;
      margin-top: 20px;
      width: 300px;
      height: 300px;
      display: flex;
      justify-content: space-evenly;
      align-items: flex-start;
      background-color: white;
      color: black;
      font-size: 1.5rem;
      border: 2px inset #FFFFFF;
    }
    th {
      text-transform: uppercase;
      padding-left: 20px;
      padding-right: 20px;
      padding-top: 20px;
      padding-bottom: 10px;
    }
    td {
      padding-left: 20px;
      padding-right: 20px;
      padding-top: 5px;
    }
  </style>
`

customElements.define('high-score',
  /**
   * Represents a high-score element.
   */
  class extends HTMLElement {
    /**
     * An array to contain all scores.
     */
    #scoreArray

    /**
     * Creates an instance of current type.
     */
    constructor () {
      super()
      this.attachShadow({ mode: 'open' })
        .appendChild(template.content.cloneNode(true))
      this.#scoreArray = []
    }

    /**
     * Called after the element is inserted in the DOM.
     */
    connectedCallback () {
      this.#updateHighScore()
    }

    /**
     * Compares the current score with the scores saved in localStorage and saves up to five of the best scores.
     *
     * @param {string} nickname The nickname to add to the high score.
     * @param {string} score The score associated with the nickname.
     */
    addToHighScore (nickname = 'Player', score) {
      if (score) {
        if (localStorage.length === 0) {
          const json = JSON.stringify(this.#scoreArray)
          localStorage.setItem('highscore', json)
        }
        const highscoreJSON = localStorage.getItem('highscore')
        let highscoreArray = JSON.parse(highscoreJSON)
        highscoreArray.push({
          nickname: nickname,
          score: score
        })
        highscoreArray.sort((a, b) => a.score - b.score, 0)
        if (highscoreArray.length >= 5) {
          highscoreArray = highscoreArray.slice(0, 5)
        }
        highscoreArray = JSON.stringify(highscoreArray)
        localStorage.setItem('highscore', highscoreArray)
        this.#updateHighScore()
      }
    }

    /**
     * Writes the username with corresponding score to the score board.
     */
    #updateHighScore () {
      if (localStorage.length !== 0) {
        const highscoreJSON = localStorage.getItem('highscore')
        const highscoreArray = JSON.parse(highscoreJSON)
        for (let i = 0; i < highscoreArray.length; i++) {
          this.shadowRoot.querySelector(`#u${i + 1}`).textContent = highscoreArray[i].nickname
          this.shadowRoot.querySelector(`#s${i + 1}`).textContent = highscoreArray[i].score
        }
      }
    }
  }
)
