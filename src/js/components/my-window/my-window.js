/**
 * The my-window web component module.
 *
 * @author Emilia Hansson <eh222yn@student.lnu.se>
 * @version 1.0.0
 */

// The code for dragging the window is partly inspired by https://www.kirupa.com/html5/drag.htm (retrieved 2021-12-31).

/**
 * Defines template.
 */
const template = document.createElement('template')
template.innerHTML = `
  <div id='window'>
    <div id='menu'>
      <span id='header-text'></span>
      <button id='close'><span>x</span></button>
    </div>
    <slot></slot>
  <div>
  <style>
    :host {
      position: fixed;
    }
    #window {
      width: 500px;
      height: 525px;
      background-color: white;
      border-radius: 5px;
      box-shadow: 1px 1px 5px #666;
      box-shadow: rgba(50, 50, 93, 0.25) 0px 13px 27px -5px, rgba(0, 0, 0, 0.3) 0px 8px 16px -8px;
    }
    #menu {
      width: 500px;
      height: 25px;
      background-color: #e8e8e8;
      border-radius: 5px 5px 0px 0px;
      border-bottom: 1px solid #cdcdcd;
    }
    #header-text {
      position: absolute;
      left: 45%;
      margin-top: 3px;
      font-family: 'Montserrat', cursive;
      font-size: 0.9rem;
    }
    #close {
      float: left;
      border-radius: 100%;
      width: 13px;
      height: 13px;
      line-height: 3px;
      font-size: 11px;
      background: red;
      color: red;
      border: none;
      margin: 5px;
    }
    #close:hover {
      color: #530000;
      font-weight: bolder;
      cursor: pointer;
    }
    #close:focus {
      outline: none;
      color: #530000;
      font-weight: bolder;
      box-shadow: 1px 1px 3px #333;
      border-width: thin;
    }
    #close span {
      display: block;
      position: absolute;
      top: 10px;
      left: 9.25px;
    }
    ::slotted(*) {
      display: block;
      margin: 0 auto;
    }
  </style>
`

/**
 * Defines custom element.
 */
customElements.define('my-window',
  /**
   * Represents a my-memory-game element.
   */
  class extends HTMLElement {
    /**
     * Represents a close button.
     *
     * @type {HTMLButtonElement}
     */
    #close
    /**
     * The x position of the mouse pointer within the window.
     *
     * @type {number}
     */
    #xInitial
    /**
     * The y position of the mouse pointer within the window.
     *
     * @type {number}
     */
    #yInitial
    /**
     * The current x position for the window.
     *
     * @type {number}
     */
    #xPosition
    /**
     * The current y position for the window.
     *
     * @type {number}
     */
    #yPosition
    /**
     * The offset from the start x position.
     *
     * @type {number}
     */
    #xOffset
    /**
     * The offset from the start y position.
     *
     * @type {number}
     */
    #yOffset
    /**
     * A boolean indicating if a window is being dragged.
     *
     * @type {boolean}
     */
    #dragging = false

    /**
     * Creates an instance of current type.
     */
    constructor () {
      super()
      this.attachShadow({ mode: 'open' })
        .appendChild(template.content.cloneNode(true))

      this.#close = this.shadowRoot.querySelector('#close')

      this.addEventListener('mousedown', event => this.#startDragging(event))
      document.addEventListener('mousemove', event => this.#drag(event))
      window.addEventListener('mouseup', event => this.#endDragging(event))
      this.#close.addEventListener('click', event => this.#closeWindow(event))
    }

    /**
     * Called after the element is inserted in the DOM.
     */
    connectedCallback () {
      this.#xOffset = Number(this.style.left.match(/(\d+)/gm)[0])
      this.#yOffset = Number(this.style.top.match(/(\d+)/gm)[0])
    }

    /**
     * Attributes to monitor.
     *
     * @returns {string[]} A string array of attributes.
     */
    static get observedAttributes () {
      return ['header']
    }

    /**
     * Called when one or several of the observed attributes changes.
     *
     * @param {string} name - The attribute's name.
     * @param {*} oldValue - The old value.
     * @param {*} newValue - The new value.
     */
    attributeChangedCallback (name, oldValue, newValue) {
      if (name === 'header' && oldValue !== newValue) {
        this.shadowRoot.querySelector('#menu span').textContent = newValue
      }
    }

    /**
     * Indicates that the window can be dragged.
     *
     * @param {Event} event The mousedown event.
     */
    #startDragging (event) {
      if (this.#yPosition < 0) {
        this.#yPosition = 0
        this.#yInitial = 0
        this.#yOffset = 0
      }
      this.#xInitial = event.clientX - this.#xOffset
      this.#yInitial = event.clientY - this.#yOffset
      this.#dragging = true
      this.dispatchEvent(new CustomEvent('focused'))
    }

    /**
     * Drags the window when the cursor is pressed down within the window container.
     *
     * @param {Event} event The mousemove event.
     */
    #drag (event) {
      if (this.#dragging) {
        event.preventDefault()
        if (!(event.clientX < 10 || event.clientX > window.innerWidth - 10 || event.clientY > window.innerHeight - 10)) {
          if (this.#yPosition < 0) {
            this.#updateXPos(event)
            if (event.clientY > this.#yInitial) {
              this.#updateYPos(event)
            }
            this.#setTranslate()
          } else {
            this.#updateXPos(event)
            this.#updateYPos(event)
            this.#setTranslate()
          }
        }
      }
    }

    /**
     * Updates the x position.
     *
     * @param {Event} event The mousemove event.
     */
    #updateXPos (event) {
      this.#xPosition = event.clientX - this.#xInitial
      this.#xOffset = this.#xPosition
    }

    /**
     * Updates the y position.
     *
     * @param {Event} event The mousemove event.
     */
    #updateYPos (event) {
      this.#yPosition = event.clientY - this.#yInitial
      this.#yOffset = this.#yPosition
    }

    /**
     * The dragging of the window ends and the initial position is updated.
     *
     * @param {Event} event The mouseup event.
     */
    #endDragging (event) {
      this.#xInitial = this.#xPosition
      this.#yInitial = this.#yPosition
      this.#dragging = false
    }

    /**
     * Repositions the window.
     */
    #setTranslate () {
      this.style.left = `${this.#xPosition}px`
      this.style.top = `${this.#yPosition}px`
    }

    /**
     * Indicates that the window should close.
     *
     * @param {Event} event The click event.
     */
    #closeWindow (event) {
      event.preventDefault()
      this.dispatchEvent(new CustomEvent('closed'))
    }
  }
)
