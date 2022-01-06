
// The code for dragging window is inspired by https://www.kirupa.com/html5/drag.htm (31/12-21).

const template = document.createElement('template')

template.innerHTML = `
  <div id='container'>
  <div id='window-container'>
    <div id='window'>
      <div id='menu'>
        <button id='close'><span>x</span></button>
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
      line-height: 3px;
      /* text-align: center; */
      font-size: 11px;
      background: red;
      color: red;
      border: none;
      margin: 5px;
    }
    #close:hover {
      color: #530000;
      font-weight: bolder;
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
      right: 8px;
    }
    ::slotted(*) {
      display: block;
      margin: 0 auto;
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

      this.#windowContainer.addEventListener('mousedown', event => this.#startDragging(event))
      document.addEventListener('mousemove', event => this.#drag(event))
      this.#windowContainer.addEventListener('mouseup', event => this.#endDragging(event))
      this.#close.addEventListener('click', event => this.#closeWindow(event))
    }

    /**
     * Executes when the pointer is pressed down within the #container element. Sets that the element can be dragged.
     *
     * @param {Event} event The mousedown event.
     */
    #startDragging (event) {
      // if (this.#currX < -10) {
      //   this.#currX = -10
      //   this.#initX = 0
      //   this.#xOffset = 0
      // }
      if (this.#currY < -10) {
        this.#currY = -10
        this.#initY = 0
        this.#yOffset = 0
      }
      // if (this.#currX < -10 && this.#currY < -10) {
      //   this.#currX = -10
      //   this.#initX = 0
      //   this.#xOffset = 0
      //   this.#currY = -10
      //   this.#initY = 0
      //   this.#yOffset = 0
      // }
      this.#initX = event.clientX - this.#xOffset
      this.#initY = event.clientY - this.#yOffset
      this.#dragging = true
      this.dispatchEvent(new CustomEvent('focus'))
    }

    /**
     * Executes when the pointer is within the #container element and when the element can be dragged.
     *
     * @param {Event} event The mousemove event.
     */
    #drag (event) {
      // console.log(this.#currY)
      // if (this.#currX < -10 || this.#currY < -10 ||
      //   (this.#currX < -10 && this.#currY < -10)) {
      //   this.#endDragging()
      // }
      if (this.#dragging) {
        event.preventDefault()
        // event.pageY < 10 ||
        if (event.pageX < 10 ||
          event.pageX > window.innerWidth || event.pageY > window.innerHeight) {
          this.#endDragging()
        } else {
          if (this.#currY < -10) {
            this.#currX = event.clientX - this.#initX
            this.#xOffset = this.#currX
            this.#setTranslate()
          } else {
            this.#currX = event.clientX - this.#initX
            this.#currY = event.clientY - this.#initY
            this.#xOffset = this.#currX
            this.#yOffset = this.#currY
            this.#setTranslate()
          }
        }
      }
    }

    /**
     * Executes when the pointer is let up.
     *
     * @param {Event} event The mousemove event.
     */
    #endDragging (event) {
      // if (this.#currX <= -10) {
      //   this.#currX = 5
      // }
      this.#initX = this.#currX
      this.#initY = this.#currY
      this.#dragging = false
      this.style.transform = `translate3d(${this.#currX}px, ${this.#currY}px, 0)`
    }

    /**
     * Sets the position of the element.
     */
    #setTranslate () {
      this.style.transform = `translate3d(${this.#currX}px, ${this.#currY}px, 0)`
    }

    /**
     * Saying that window should close.
     *
     * @param {Event} event The click event.
     */
    #closeWindow (event) {
      event.preventDefault()
      this.dispatchEvent(new CustomEvent('closed'))
    }
  }
)
