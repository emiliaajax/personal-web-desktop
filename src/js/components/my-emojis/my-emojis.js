
const template = document.createElement('template')

template.innerHTML = `
  <button id='emoji-button'>😊</button>
  <div id='emoji-container' class='hidden'>
    <button id='emoji-button'>😊</button>
    <button id='emoji-button'>😊</button>
    <button id='emoji-button'>😊</button>
    <button id='emoji-button'>😊</button>
    <button id='emoji-button'>😊</button>
    <button id='emoji-button'>😊</button>
    <button id='emoji-button'>😊</button>
    <button id='emoji-button'>😊</button>
    <button id='emoji-button'>😊</button>
    <button id='emoji-button' value='&#128540;'>&#128540;</button>
    <button id='emoji-button'>😊</button>
    <button id='emoji-button'>😊</button>
    <button id='emoji-button'>😊</button>
    <button id='emoji-button'>😊</button>
    <button id='emoji-button'>😊</button>
    <button id='emoji-button'>😊</button>
    <button id='emoji-button'>😊</button>
    <button id='emoji-button'>😊</button>
    <button id='emoji-button'>😊</button>
  </div>
  <style>
    #emoji-button {
      width: 60px;
      height: 40px;
      /* border: 1px solid #666; */
      border-width: thin;
      border-radius: 2px;
    }
    #emoji-container {
      border: 1px solid #666;
      border-width: thin;
      position: absolute;
      width: 150px;
      display: flex;
      flex-wrap: wrap;
      background-color: white;
    }
    #emoji-container button {
      width: 30px;
      height: 30px;
      text-decoration: none;
      border: black;
      background-color: white;
    }
    .hidden {
      display: none !important;
    }
  </style>
`

customElements.define('my-emojis',
  /**
   * Represents a my-pwd element.
   */
  class extends HTMLElement {
    /**
     * Creates an instance of current type.
     */
    constructor () {
      super()
      this.attachShadow({ mode: 'open' })
        .appendChild(template.content.cloneNode(true))

      this.shadowRoot.querySelector('#emoji-button').addEventListener('click', event => {
        event.preventDefault()
        if (!this.shadowRoot.querySelector('#emoji-container').hasAttribute('active')) {
          this.shadowRoot.querySelector('#emoji-container').setAttribute('active', '')
          this.shadowRoot.querySelector('#emoji-container').classList.remove('hidden')
        } else {
          this.shadowRoot.querySelector('#emoji-container').removeAttribute('active')
          this.shadowRoot.querySelector('#emoji-container').classList.add('hidden')
        }
        this.shadowRoot.querySelectorAll('#emoji-container button').forEach(emoji => emoji.addEventListener('click', event => {
          event.preventDefault()
          this.dispatchEvent(new CustomEvent('clicked', { detail: { emojiValue: emoji.value } }))
        }))
      })
    }
  }
)
