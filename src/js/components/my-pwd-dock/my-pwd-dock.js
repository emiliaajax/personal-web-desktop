
const template = document.createElement('template')

template.innerHTML = `
  <div id='dock'>
    <slot></slot>
  </div>
  <style>
    :host {
      display: block;
      position: absolute;
      bottom: 0%;
      left: 10%;
      right: 10%;
    }
    #dock {
      max-width: 1200px;
      height: 80px;
      background-color: black;
      opacity: 0.4;
      border-radius: 5px;
    }
  </style>
`

customElements.define('my-pwd-dock',
  /**
   * Represents a my-memory-game element.
   */
  class extends HTMLElement {
    /**
     * Creates an instance of current type.
     */
    constructor () {
      super()
      this.attachShadow({ mode: 'open' })
        .appendChild(template.content.cloneNode(true))
    }
  }
)
