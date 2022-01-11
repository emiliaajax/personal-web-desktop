/**
 * The my-pwd web component module.
 *
 * @author Emilia Hansson <eh222yn@student.lnu.se>
 * @version 1.0.0
 */

import '../my-pwd-dock/index.js'
import '../my-pwd-icon/index.js'
import '../my-memory-game/index.js'
import '../my-chat/index.js'
import '../my-window/index.js'
import '../my-snake-game/index.js'

/**
 * Urls to images used in component.
 */
const wallpaperImage = (new URL('images/wallpaper.jpg', import.meta.url)).href
const memoryIconImage = (new URL('images/memory-icon.png', import.meta.url)).href
const chatIconImage = (new URL('images/chat-icon.png', import.meta.url)).href
const snakeIconImage = (new URL('images/snake-icon.png', import.meta.url)).href

/**
 * Defines templates.
 */
const template = document.createElement('template')
template.innerHTML = `
  <div id='pwd'>
    <my-pwd-dock>
      <my-pwd-icon name='Memory' app='my-memory-game' src='${memoryIconImage}'></my-pwd-icon>
      <my-pwd-icon name='Chat' app='my-chat' src='${chatIconImage}'></my-pwd-icon>
      <my-pwd-icon name='Snake' app='my-snake-game' src='${snakeIconImage}'></my-pwd-icon>
    </my-pwd-dock>
  </div>
  <style>
    #pwd {
      max-width: 100vw;
      min-height: 100vh;
      background: url('${wallpaperImage}');
      background-position: top;
      background-size: cover;
      background-repeat: no-repeat;
      margin: 0;
    }
    my-pwd-dock {
      max-width: 500px;
    }
    my-window {
      position: fixed;
    }
  </style>
`

/**
 * Defines custom element.
 */
customElements.define('my-pwd',
  /**
   * Represents a my-pwd element.
   */
  class extends HTMLElement {
    /**
     * The current z-index.
     *
     * @type {number}
     */
    #zIndex = 1
    /**
     * The current window.
     *
     * @type {HTMLElement}
     */
    #window
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
     * Opens up a sub app in a new window.
     *
     * @param {Event} event The clicked event.
     */
    #openApp (event) {
      event.target.blur()
      const appName = event.target.getAttribute('app')
      const app = document.createElement(appName)
      this.#window = document.createElement('my-window')
      this.#window.setAttribute('header', event.target.getAttribute('name'))
      this.#window.style.zIndex = this.#zIndex.toString()
      this.#zIndex += 1
      this.#window.append(app)
      this.#addEventHandlers()
      this.#positionWindow()
      this.shadowRoot.querySelector('#pwd').append(this.#window)
      if (appName === 'my-snake-game') {
        app.addEventListener('quit', event => event.target.parentNode.remove())
      }
    }

    /**
     * Positions the window.
     */
    #positionWindow () {
      if (this.shadowRoot.querySelectorAll('my-window').length !== 0) {
        const howManyWindows = this.shadowRoot.querySelectorAll('my-window').length + 1
        this.#window.style.left = `${howManyWindows * 10}px`
        this.#window.style.top = `${howManyWindows * 20}px`
      } else {
        this.#window.style.left = '20px'
        this.#window.style.top = '20px'
      }
    }

    /**
     * Adds event listeners to the window.
     */
    #addEventHandlers () {
      this.#window.addEventListener('closed', event => this.#closeApp(event))
      this.#window.addEventListener('focused', event => {
        event.target.style.zIndex = this.#zIndex.toString()
        this.#zIndex += 1
      })
    }

    /**
     * Closes a sub app window.
     *
     * @param {Event} event The closed event.
     */
    #closeApp (event) {
      event.target.remove()
    }
  }
)
