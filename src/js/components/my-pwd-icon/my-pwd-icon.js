
import '../my-window/index.js'

const template = document.createElement('template')

template.innerHTML = `
  <div id='icon'>
    <img id='image-icon'>
  </div>
  <my-window id='my-window' class='hidden'> 
    <slot></slot>
  </my-window>
  <style>
    :host {
      margin-left: 10px;
      margin-right: 10px;
      margin-top: 20px;
    }
    #icon {
      display: block;
      width: 100px;
      height: 100px;
    }
    #image-icon {
      display: block;
      max-width: 90%;
      margin: 0 auto;
    }
    .hidden {
      display: none;
    }
  </style>
`

customElements.define('my-pwd-icon',
  /**
   * Represents a my-memory-game element.
   */
  class extends HTMLElement {
    #imageIcon
    #window
    /**
     * Creates an instance of current type.
     */
    constructor () {
      super()
      this.attachShadow({ mode: 'open' })
        .appendChild(template.content.cloneNode(true))

      this.#imageIcon = this.shadowRoot.querySelector('#image-icon')
      this.#window = this.shadowRoot.querySelector('my-window')

      this.#imageIcon.addEventListener('click', event => this.#openApp(event))
      // this.#window.addEventListener('dragstart', (event) => {
      //   this.#window.setAttribute('dragging', '')
      //   event.dataTransfer.setData('text/plain', this.#window.id)
      // })
      // this.#window.addEventListener('dragend', (event) => {
      //   this.#window.removeAttribute('dragging')
      // })
    }

    /**
     * Attributes to monitor.
     *
     * @returns {string[]} A string array of attributes.
     */
    static get observedAttributes () {
      return ['src']
    }

    /**
     * Called when one or several of the observed attributes changes.
     *
     * @param {string} name - The attribute's name.
     * @param {*} oldValue - The old value.
     * @param {*} newValue - The new value.
     */
    attributeChangedCallback (name, oldValue, newValue) {
      if (name === 'src' && oldValue !== newValue) {
        this.#imageIcon.setAttribute('src', newValue)
      }
    }

    /**
     * Hello.
     *
     * @param {HTMLElement} event Hej.
     */
    #openApp (event) {
      event.preventDefault()
      this.#window.classList.remove('hidden')
    }
  }
)
