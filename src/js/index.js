/**
 * The main script file of the application.
 *
 * @author // TODO: YOUR NAME <YOUR EMAIL>
 * @version 1.0.0
 */

import './components/my-pwd-icon/index.js'
import './components/my-window/index.js'
import './components/my-memory-game/index.js'

Array.from(document.querySelectorAll('my-pwd-icon'))
  .map(elem => elem.addEventListener('clicked', () => startApp(elem)))

/**
 * Hello.
 *
 * @param {HTMLElement} elem Hej.
 */
function startApp (elem) {
  const window = document.createElement('my-window')
  window.addEventListener('closed', () => closeApp(elem))
  const app = elem.firstElementChild
  window.append(app)
  document.body.append(window)
}

/**
 * Bye.
 *
 * @param {HTMLElement} elem Hej.
 */
function closeApp (elem) {
  const window = document.querySelector('my-window')
  const app = window.firstElementChild
  elem.append(app)
  window.remove()
}
