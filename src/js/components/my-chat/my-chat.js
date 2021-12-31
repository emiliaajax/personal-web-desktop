
import '../nickname-form/index.js'

const template = document.createElement('template')

template.innerHTML = `
  <div id='chat'>
    <div id='username'>
      <nickname-form></nickname-form>
    </div>
    <div id='chat-output' class='hidden'></div>
    <form id='chat-message' class='hidden'>
      <textarea id='message'></textarea>
      <input type='submit' value='Send'>
    </form>
  </div>
  <style>
    #chat {
      width: 500px;
      height: 500px;
      background-image: linear-gradient(180deg, #edf1fa, #e4ebf6, #d3def0, #cad9ef, #d9e2f3, white);
      background-color: white;
      display: grid;
      grid-template-columns: 0.5fr 1fr 1fr 0.5fr;
      grid-template-rows: auto;
    }
    #username {
      grid-column: 2/4;
      grid-row: 2/3;
      margin: 0 auto;
    }
    #chat-output {
      background-color: white;
      width: 400px;
      height: 250px;
      border-radius: 10px 10px 0px 0px; 
      grid-column: 2/4;
      grid-row: 1/2;
      margin-top: 20px;
      padding: 20px;
      overflow: scroll;
    }
    #chat-output p {
      background-color: #e8e8e8;
      box-shadow: 1px 1px 5px #cdcdcd;
      border-radius: 20px;
      padding-left: 10px;
      padding-right: 10px;
      padding-top: 10px;
      padding-bottom: 10px;
      max-width: 250px !important;
      margin-top: 5px;
      margin-bottom: 5px;
      word-break: break-all;
    }
    #chat-output p[right] {
      display: table;
      text-align: right;
      margin-right: 0px;
      margin-left: auto;
      background-color: cornflowerblue;
    }
    #chat-message {
      grid-column: 2/4;
      grid-row: 2/3;
      justify-content: center;
      display: grid;
      grid-template-columns: 4fr 1fr;
    }
    #message {
      padding: 20px;
      padding-top: 20px;
      resize: none;
      display: block;
      height: 100px;
      width: 330px;
      border: none;
      grid-column: 1/2;
    }
    #chat-message input[type='submit'] {
      margin-left: 10px;
      grid-column: 2/3;
      width: 60px;
      height: 50px;
      margin-bottom: 20px;
    }
    .hidden {
      display: none !important;
    }
  </style>
`

customElements.define('my-chat',
  /**
   * Represents a my-memory-game element.
   */
  class extends HTMLElement {
    #chatMessage
    #message
    #username
    #nicknameForm
    #socket
    #chatOutput
    /**
     * Creates an instance of current type.
     */
    constructor () {
      super()
      this.attachShadow({ mode: 'open' })
        .appendChild(template.content.cloneNode(true))

      this.#chatMessage = this.shadowRoot.querySelector('#chat-message')
      this.#message = this.shadowRoot.querySelector('#message')
      this.#nicknameForm = this.shadowRoot.querySelector('nickname-form')
      this.#chatOutput = this.shadowRoot.querySelector('#chat-output')

      this.#chatMessage.addEventListener('submit', (event) => this.#onSubmit(event))
      this.#nicknameForm.addEventListener('added', (event) => this.#startChat(event))
    }

    /**
     * Called after the element is inserted in the DOM.
     */
    connectedCallback () {
      this.#socket = new window.WebSocket('wss://courselab.lnu.se/message-app/socket')
      this.#socket.addEventListener('message', event => this.#displayChatMessage(event))
    }

    /**
     * Called after the element is removed from the DOM.
     */
    disconnectedCallback () {
      this.#socket.close()
    }

    /**
     * Creates an instance of current type.
     *
     * @param {Event} event The submit event.
     */
    #startChat (event) {
      this.#username = event.detail.nickname
      this.#nicknameForm.classList.add('hidden')
      this.shadowRoot.querySelector('#chat-output').classList.remove('hidden')
      this.shadowRoot.querySelector('#chat-message').classList.remove('hidden')
    }

    /**
     * Creates an instance of current type.
     *
     * @param {Event} event The submit event.
     */
    #onSubmit (event) {
      event.preventDefault()
      if (this.#socket.readyState === 1) {
      // this.#socket.addEventListener('open', () => this.#socket.send(JSON.stringify({
      //   type: 'message',
      //   data: this.#message.value,
      //   username: this.#username,
      //   key: 'eDBE76deU7L0H9mEBgxUKVR0VCnq0XBd'
      // })))
        this.#socket.send(JSON.stringify({
          type: 'message',
          data: this.#message.value,
          username: this.#username,
          key: 'eDBE76deU7L0H9mEBgxUKVR0VCnq0XBd',
          channel: 'emilias-channel'
        }))
      }
      this.#chatMessage.reset()
      console.log(this.#socket)
    }

    /**
     * Creates an instance of current type.
     *
     * @param {Event} event The submit event.
     */
    #displayChatMessage (event) {
      const data = JSON.parse(event.data)
      if (data.type === 'notification' || data.type === 'message') {
        const message = document.createElement('p')
        message.textContent = `${data.username}: ${data.data}`
        data.channel === 'emilias-channel' ? message.setAttribute('right', '') : message.setAttribute('left', '')
        this.#chatOutput.append(message)
      }
      this.#chatOutput.scrollTop = this.#chatOutput.scrollHeight
    }
  }
)
