
import '../my-pwd-dock/index.js'
import '../my-pwd-icon/index.js'
import '../my-memory-game/index.js'
import '../my-chat/index.js'
import '../my-window/index.js'
import '../my-snake-app/index.js'

const template = document.createElement('template')

template.innerHTML = `
  <div id='pwd'>
    <my-pwd-dock>
      <my-pwd-icon id='my-memory-game' src='../../../images/memory-icon.png'></my-pwd-icon>
      <my-pwd-icon id='my-chat' src='../../../images/chat-icon.png'></my-pwd-icon>
      <my-pwd-icon id='my-snake-app' src='../../../images/snake-icon.png'></my-pwd-icon>
    </my-pwd-dock>
  </div>
  <style>
    my-pwd-dock {
      max-width: 500px;
    }
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
      this.shadowRoot.querySelector('#my-snake-app').addEventListener('quit', event => event.target.parentNode.remove())
    }

    /**
     * Opens up a sub app.
     *
     * @param {Event} event The clicked event.
     */
    #openApp (event) {
      event.target.blur()
      const appName = event.target.getAttribute('id')
      const app = document.createElement(appName)
      const window = document.createElement('my-window')
      window.style.zIndex = this.#zIndex.toString()
      this.#zIndex += 1
      window.append(app)
      window.addEventListener('closed', event => this.#closeApp(event))
      window.addEventListener('focused', event => {
        event.target.style.zIndex = this.#zIndex.toString()
        this.#zIndex += 1
      })
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
