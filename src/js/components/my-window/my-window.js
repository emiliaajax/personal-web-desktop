
// The code for dragging window is inspired by https://www.kirupa.com/html5/drag.htm (31/12-21).

const template = document.createElement('template')

template.innerHTML = `
  <div id='container'>
  <div id='window-container'>
    <div id='window'>
      <div id='menu'>
        <button id='close'>x</button>
      </div>
      <slot></slot>
    <div>
  </div>
</div>
  <style>
    :host {
      position: fixed;
      top: 10px;
      left: 10px;
    }
    #window {
      width: 500px;
      height: 525px;
      background-color: white;
      border-radius: 5px;
      box-shadow: 1px 1px 5px #666;
    }
    #menu {
      width: 500px;
      height: 25px;
      background-color: #e8e8e8;
      border-radius: 5px 5px 0px 0px;
      border-bottom: 1px solid #cdcdcd;
    }
    #close {
      float: right;
      border-radius: 100%;
      width: 13px;
      height: 13px;
      line-height: 13px;
      text-align: center;
      font-size: 11px;
      background: red;
      color: #333;
      border: none;
      margin: 5px;
    }
    ::slotted(*) {
      display: block;
      margin: 0 auto;
      /* margin-top: 20px; */
    }
  </style>
`

customElements.define('my-window',
  /**
   * Represents a my-memory-game element.
   */
  class extends HTMLElement {
    #close
    #windowContainer
    #window
    #initX
    #initY
    #currX
    #currY
    #xOffset = 0
    #yOffset = 0
    #dragging = false

    /**
     * Creates an instance of current type.
     */
    constructor () {
      super()
      this.attachShadow({ mode: 'open' })
        .appendChild(template.content.cloneNode(true))

      this.#windowContainer = this.shadowRoot.querySelector('#window-container')
      this.#window = this.shadowRoot.querySelector('#window')
      this.#close = this.shadowRoot.querySelector('#close')

      this.#windowContainer.addEventListener('mousedown', (event) => this.#startDragging(event))
      this.#windowContainer.addEventListener('mouseup', (event) => this.#endDragging(event))
      document.addEventListener('mousemove', (event) => this.#drag(event))
      this.#close.addEventListener('click', (event) => {
        event.preventDefault()
        // this.dispatchEvent(new CustomEvent('closed'))
        this.classList.add('hidden')
      })
    }

    /**
     * Executes when the pointer is pressed down within the #container element. Sets that the element can be dragged.
     *
     * @param {Event} event The mousedown event.
     */
    #startDragging (event) {
      this.#initX = event.clientX - this.#xOffset
      this.#initY = event.clientY - this.#yOffset
      this.#dragging = true
    }

    /**
     * Executes when the pointer is within the #container element and when the element can be dragged.
     *
     * @param {Event} event The mousemove event.
     */
    #drag (event) {
      if (this.#dragging) {
        event.preventDefault()
        this.#currX = event.clientX - this.#initX
        this.#currY = event.clientY - this.#initY
        this.#xOffset = this.#currX
        this.#yOffset = this.#currY
        this.#setTranslate(this.#currX, this.#currY, this.#window)
      }
    }

    /**
     * Executes when the pointer is let up.
     *
     * @param {Event} event The mousemove event.
     */
    #endDragging (event) {
      this.#initX = this.#currX
      this.#initY = this.#currY
      this.#dragging = false
    }

    /**
     * Sets the position of the element.
     *
     * @param {number} x The x-coordinate.
     * @param {number} y The y-coordinate.
     * @param {HTMLElement} elem The element to set the position for.
     */
    #setTranslate (x, y, elem) {
      elem.style.transform = `translate3d(${x}px, ${y}px, 0)`
    }
  }
)
