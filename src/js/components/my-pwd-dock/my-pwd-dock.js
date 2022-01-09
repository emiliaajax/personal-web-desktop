/**
 * The my-pwd-dock web component module.
 *
 * @author Emilia Hansson <eh222yn@student.lnu.se>
 * @version 1.0.0
 */

/**
 * Defines template
 */
const template = document.createElement('template')
template.innerHTML = `
  <div id='dock'>
    <slot></slot>
  </div>
  <style>
    :host {
      position: fixed;
      bottom: 0%;
      left: 30%;
      right: 10%;
      max-width: 1200px;
      min-width: 500px;
    }
    #dock {
      display: flex;
      flex-direction: row;
      height: 130px;
      background-color: rgb(0, 0, 0, 0.6);
      border-radius: 5px;
      justify-content: center;
      align-items: center;
    }
  </style>
`

/**
 * Defines custom element.
 */
customElements.define('my-pwd-dock',
  /**
   * Represents a my-pwd-dock element.
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
