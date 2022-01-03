
import '../my-pwd-dock/index.js'
import '../my-pwd-icon/index.js'
import '../my-memory-game/index.js'
import '../my-chat/index.js'
import '../my-window/index.js'

const template = document.createElement('template')

template.innerHTML = `
  <div id='pwd'>
    <my-pwd-dock>
      <my-pwd-icon id='my-memory-game' src='../../../images/1.png'></my-pwd-icon>
      <my-pwd-icon id='my-chat' src='../../../images/2.png'></my-pwd-icon>
      <my-pwd-icon id='my-snake-app' src='../../../images/3.png'></my-pwd-icon>
    </my-pwd-dock>
  </div>
  <style>
  </style>
`

customElements.define('my-pwd',
  /**
   * Represents a my-pwd element.
   */
  class extends HTMLElement {
    #zIndex = 1
    /**
     * Creates an instance of current type.
     */
    constructor () {
      super()
      this.attachShadow({ mode: 'open' })
        .appendChild(template.content.cloneNode(true))

      this.shadowRoot.querySelectorAll('my-pwd-icon').forEach(icon => icon.addEventListener('clicked', event => this.#openApp(event)))
    }

    /**
     * Opens up a sub app.
     *
     * @param {Event} event The clicked event.
     */
    #openApp (event) {
      const appName = event.target.getAttribute('id')
      const app = document.createElement(appName)
      const window = document.createElement('my-window')
      window.style.zIndex = this.#zIndex.toString()
      this.#zIndex += 1
      window.append(app)
      window.addEventListener('closed', event => this.#closeApp(event))
      window.addEventListener('focus', event => {
        event.target.style.zIndex = this.#zIndex.toString()
        this.#zIndex += 1
      })
      app.focus()
      event.target.append(window)
    }

    /**
     * Closes a sub app.
     *
     * @param {Event} event The closed event.
     */
    #closeApp (event) {
      event.target.remove()
    }
  }
)
