
import '../my-pwd-dock/index.js'
import '../my-pwd-icon/index.js'
import '../my-memory-game/index.js'
import '../my-chat/index.js'

const template = document.createElement('template')

template.innerHTML = `
  <div id='pwd'>
    <my-pwd-dock>
      <my-pwd-icon src='../../../images/1.png'>
        <my-memory-game></my-memory-game>
      </my-pwd-icon>
      <my-pwd-icon src='../../../images/2.png'>
        <my-chat></my-chat>
      </my-pwd-icon>
      <my-pwd-icon src='../../../images/3.png'>
        <my-memory-game></my-memory-game>
      </my-pwd-icon>
    </my-pwd-dock>
  </div>
`

customElements.define('my-pwd',
  /**
   * Represents a my-pwd element.
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
