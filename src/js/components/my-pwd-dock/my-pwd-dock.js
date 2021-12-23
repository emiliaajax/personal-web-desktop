
const template = document.createElement('template')

template.innerHTML = `
  <div id='dock'>
    <slot></slot>
  </div>
  <style>
    :host {
      position: fixed;
      bottom: 0%;
      left: 10%;
      right: 10%;
    }
    #dock {
      display: flex;
      flex-direction: row;
      max-width: 1200px;
      height: 130px;
      background-color: rgb(0, 0, 0, 0.6);
      border-radius: 5px;
      justify-content: center;
      align-items: center;
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
