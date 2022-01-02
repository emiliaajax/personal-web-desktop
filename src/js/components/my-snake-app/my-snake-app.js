
const template = document.createElement('template')

template.innerHTML = `
`

customElements.define('my-snake-app',
  /**
   * Represents a my-snake-app element.
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
