/**
 * The my-pwd-icon web component module.
 *
 * @author Emilia Hansson <eh222yn@student.lnu.se>
 * @version 1.0.0
 */

const template = document.createElement('template')

template.innerHTML = `
  <button id='icon'>
    <img id='image-icon' />
  </button>
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
   * Represents a my-pwd element.
   */
  class extends HTMLElement {
    /**
     * Represents the icon.
     *
     * @type {HTMLButtonElement}
     */
    #icon
    /**
     * Represents the icon image.
     *
     * @type {HTMLImageElement}
     */
    #imageIcon
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
     * Indicates that the app can be opened.
     *
     * @param {Event} event The click event.
     */
    #openApp (event) {
      event.preventDefault()
      this.dispatchEvent(new CustomEvent('clicked'))
    }
  }
)
