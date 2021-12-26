
const template = document.createElement('template')

template.innerHTML = `
  <div id='window'>
    <div id='menu'>
      <button id='close'>x</button>
    </div>
    <slot></slot>
  <div>
  <style>
    :host {
      position: fixed;
      top: 10px;
      left: 10px;
    }
    #window {
      width: 500px;
      height: 500px;
      background-color: white;
      border-radius: 5px;
      box-shadow: 1px 1px 5px #666;
    }
    #menu {
      width: 500px;
      height: 25px;
      background-color: #e8e8e8;
      border-radius: 5px 5px 0px 0px;
      box-shadow: 0px 1px 1px #666;
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
      margin-top: 20px;
    }
  </style>
`

customElements.define('my-window',
  /**
   * Represents a my-memory-game element.
   */
  class extends HTMLElement {
    #close
    /**
     * Creates an instance of current type.
     */
    constructor () {
      super()
      this.attachShadow({ mode: 'open' })
        .appendChild(template.content.cloneNode(true))

      this.#close = this.shadowRoot.querySelector('#close')
      this.#close.addEventListener('click', (event) => {
        event.preventDefault()
        // this.dispatchEvent(new CustomEvent('closed'))
        this.classList.add('hidden')
      })
    }
  }
)
