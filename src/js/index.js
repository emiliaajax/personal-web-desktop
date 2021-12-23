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
  .map(elem => elem.addEventListener('clicked', () => startApp()))

/**
 * Hello.
 */
function startApp () {
  const window = document.createElement('my-window')
  window.addEventListener('closed', () => closeApp())
  const memory = document.createElement('my-memory-game')
  window.append(memory)
  document.body.append(window)
}

/**
 * Bye.
 */
function closeApp () {
  const window = document.querySelector('my-window')
  window.remove()
}
