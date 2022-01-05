
const template = document.createElement('template')

template.innerHTML = `
  <button id='icon'>
    <img id='image-icon' />
  </button>
  <slot></slot>
  <style>
    :host {
      margin-left: 10px;
      margin-right: 10px;
      margin-top: 20px;
      margin-bottom: 20px;
    } 
    #icon {
      width: 100px;
      height: 100px;
      margin: 0;
      padding: 0;
      background: rgb(0, 0, 0, 0);
      border: none;
      outline: none;
    }
    #icon:focus {
      opacity: 0.4;
    }
    #icon:hover {
      cursor: pointer;
      opacity: 0.5;
    }
    #image-icon {
      display: block;
      width: 100px;
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
    #icon
    /**
     * Creates an instance of current type.
     */
    constructor () {
      super()
      this.attachShadow({ mode: 'open' })
        .appendChild(template.content.cloneNode(true))

      this.#imageIcon = this.shadowRoot.querySelector('#image-icon')
      this.#icon = this.shadowRoot.querySelector('#icon')

      this.#icon.addEventListener('click', event => this.#openApp(event))
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
      this.dispatchEvent(new CustomEvent('clicked'))
    }
  }
)
