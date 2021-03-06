/**
 * The my-emojis web component module.
 *
 * @author Emilia Hansson <eh222yn@student.lnu.se>
 * @version 1.0.0
 */

/**
 * Defines template.
 */
const template = document.createElement('template')
template.innerHTML = `
  <div id='emojis'>
    <button id='emoji-button'>ð</button>
    <div id='emoji-container' class='hidden'>
      <button class='emoji'>ð</button>
      <button class='emoji'>ð</button>
      <button class='emoji'>ð</button>
      <button class='emoji'>ð</button>
      <button class='emoji'>ð</button>
      <button class='emoji'>ðĄ</button>
      <button class='emoji'>ðĒ</button>
      <button class='emoji'>ð­</button>
      <button class='emoji'>âĪïļ</button>
      <button class='emoji'>ð</button>
      <button class='emoji'>ð</button>
      <button class='emoji'>ð</button>
      <button class='emoji'>ð</button>
      <button class='emoji'>ð</button>
      <button class='emoji'>ðĪĐ</button>
      <button class='emoji'>ð</button>
      <button class='emoji'>ð</button>
      <button class='emoji'>ðŪ</button>
      <button class='emoji'>ð</button>
      <button class='emoji'>ð</button>
      <button class='emoji'>ð</button>
      <button class='emoji'>ðģ</button>
      <button class='emoji'>ð</button>
      <button class='emoji'>ðĨ°</button>
      <button class='emoji'>ð</button>
      <button class='emoji'>ðĪŠ</button>
      <button class='emoji'>ðĪ</button>
      <button class='emoji'>ðĪ</button>
      <button class='emoji'>ð</button>
      <button class='emoji'>ð</button>
      <button class='emoji'>ð</button>
      <button class='emoji'>ðŽ</button>
      <button class='emoji'>ðŠ</button>
      <button class='emoji'>ðī</button>
      <button class='emoji'>ð·</button>
      <button class='emoji'>ðĪĒ</button>
      <button class='emoji'>ðĨī</button>
      <button class='emoji'>ðĪŊ</button>  
      <button class='emoji'>ðĨģ</button>
      <button class='emoji'>ðĪ</button>
      <button class='emoji'>ð°</button>
      <button class='emoji'>ðĪ</button>
      <button class='emoji'>ð</button>
      <button class='emoji'>ðĪŽ</button>
      <button class='emoji'>ðĐ</button>
      <button class='emoji'>ð</button>
      <button class='emoji'>ð</button>
      <button class='emoji'>âïļ</button>
      <button class='emoji'>ðĪ</button>
      <button class='emoji'>ðĪ</button>
      <button class='emoji'>ð</button>
      <button class='emoji'>ð</button>
      <button class='emoji'>ð</button>
      <button class='emoji'>ð</button>
      <button class='emoji'>ð</button>
      <button class='emoji'>ðŠ</button>
      <button class='emoji'>ð</button>
      <button class='emoji'>ð</button>
      <button class='emoji'>ðĪ·</button>
      <button class='emoji'>ðĪī</button>
      <button class='emoji'>ðļ</button>
      <button class='emoji'>ð</button>
      <button class='emoji'>ðš</button>
      <button class='emoji'>ð</button>
      <button class='emoji'>ð</button>
      <button class='emoji'>ð</button>
      <button class='emoji'>ð</button>
      <button class='emoji'>ðĶ</button>
      <button class='emoji'>ðķ</button>
      <button class='emoji'>ð·</button>
      <button class='emoji'>ðĶ </button>
      <button class='emoji'>ðš</button>
      <button class='emoji'>ð</button>
      <button class='emoji'>âïļ</button>
      <button class='emoji'>â­</button>
      <button class='emoji'>ðĨ</button>
      <button class='emoji'>ð</button>
      <button class='emoji'>ð</button>
      <button class='emoji'>ð</button>
      <button class='emoji'>ð</button>
      <button class='emoji'>ðŋ</button>
      <button class='emoji'>ðū</button>
      <button class='emoji'>ðŧ</button>
      <button class='emoji'>ðĨ</button>
      <button class='emoji'>ðđ</button>
      <button class='emoji'>ð</button>
      <button class='emoji'>âïļ</button>
      <button class='emoji'>ðïļ</button>
      <button class='emoji'>ðïļ</button>
      <button class='emoji'>ð</button>
      <button class='emoji'>ðšïļ</button>
      <button class='emoji'>ð</button>
      <button class='emoji'>ð§ļ</button>
      <button class='emoji'>ðŧ</button>
      <button class='emoji'>ð</button>
      <button class='emoji'>ðļðŠ</button>
      <button class='emoji'>ðģðī</button>
    </div>
  </div>
  <style>
    #emojis {
      position: absolute;
    }
    #emoji-button {
      width: 40px;
      height: 40px;
      border: none;
      padding-top: 3px;
      border-radius: 2px;
      border-radius: 10px;
      font-size: 1.7rem;
      cursor: pointer;
      background-color: rgb(237, 237, 237, 0);
    }
    #emoji-button:hover {
      background-color: #aef2ee;
    }
    #emoji-button:focus {
      background-color: #aef2ee;
      outline: none;
    }
    #emoji-container {
      position: absolute;
      width: 210px;
      max-height: 180px;
      left: -145px;
      top: -190px;
      display: flex;
      flex-wrap: wrap;
      background-color: white;
      border-radius: 0px 10px 10px 10px;
      overflow: scroll;
      /* Box-shadow code from https://getcssscan.com/css-box-shadow-examples */
      box-shadow: rgba(50, 50, 93, 0.25) 0px 13px 27px -5px, rgba(0, 0, 0, 0.3) 0px 8px 16px -8px;
    }
    .emoji {
      width: 30px;
      height: 30px;
      text-decoration: none;
      border: black;
      background-color: white;
      cursor: pointer;
    }
    .emoji:hover {
      background-color: #ededed;
    }
    .emoji:focus {
      background-color: #ededed;
      outline: none;
    }
    .hidden {
      display: none !important;
    }
  </style>
`

/*
 * Defines custom element.
 */
customElements.define('my-emojis',
  /**
   * Represents a my-emojis element.
   */
  class extends HTMLElement {
    /**
     * Represents the element containing the emojis.
     *
     * @type {HTMLDivElement}
     */
    #emojiContainer
    /**
     * Creates an instance of current type.
     */
    constructor () {
      super()
      this.attachShadow({ mode: 'open' })
        .appendChild(template.content.cloneNode(true))

      this.#emojiContainer = this.shadowRoot.querySelector('#emoji-container')

      // Event handlers
      this.shadowRoot.querySelector('#emoji-button').addEventListener('click', event => this.#openAndCloseEmojiContainer(event))
      // this.#emojiContainer.addEventListener('click', event => {
      //   event.preventDefault()
      //   this.dispatchEvent(new CustomEvent('clicked', { detail: { emojiValue: event.target.textContent } }))
      // })
      this.shadowRoot.querySelectorAll('.emoji').forEach(emoji => emoji.addEventListener('click', event => {
        event.preventDefault()
        this.dispatchEvent(new CustomEvent('clicked', { detail: { emojiValue: emoji.textContent } }))
      }))
    }

    /**
     * Opens the emoji container if the container is not active, otherwise closes it.
     *
     * @param {Event} event The click event.
     */
    #openAndCloseEmojiContainer (event) {
      event.preventDefault()
      if (!this.#emojiContainer.hasAttribute('active')) {
        this.#emojiContainer.setAttribute('active', '')
        this.#emojiContainer.classList.remove('hidden')
      } else {
        this.#emojiContainer.removeAttribute('active')
        this.#emojiContainer.classList.add('hidden')
        event.target.blur()
        this.dispatchEvent(new CustomEvent('closed'))
      }
    }
  }
)
