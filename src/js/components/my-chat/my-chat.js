
import '../nickname-form/index.js'
import '../my-emojis/index.js'

const template = document.createElement('template')

template.innerHTML = `
  <div id='chat'>
    <div id='username'>
      <nickname-form></nickname-form>
    </div>
    <div id='chat-output' class='hidden'></div>
    <form id='chat-message' class='hidden'>
      <textarea id='message'></textarea>
      <button id='send-button' type='submit'><img src='../../../images/send-icon.png'></button>
      <my-emojis></my-emojis>
      <button id='sound-control' mode='off'>
        <img src='../../../images/sound-on.png' alt='Sound on' id='sound-on' class='hidden'>
        <img src='../../../images/sound-off.png' alt='Sound on' id='sound-off'>
      </button>
    </form>
    <audio src='../../../audio/235911__yfjesse__notification-sound.wav' controls class='hidden'>
  </div>
  <style>
    #chat {
      width: 500px;
      height: 500px;
      background-color: #5de6de;
      background-image: linear-gradient(315deg, #5de6de 0%, #b58ecc 74%);
      display: grid;
      /* grid-template-columns: 1fr 1fr 1fr 1fr; */
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
      height: 280px;
      border-radius: 10px 10px 0px 0px; 
      grid-column: 1/4;
      grid-row: 1/2;
      padding: 20px;
      overflow: scroll;
      margin: 0 auto;
      margin-top: 20px;
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
      overflow-wrap: break-word;
      /* word-break: break-all; */
      font-family: 'Montserrat', sans-serif;
      font-size: 0.9rem;
    }
    #chat-output p[left] {
      display: table;
      text-align: left;
      margin-left: 0px;
      margin-right: auto;
    }
    #chat-output p[right] {
      display: table;
      text-align: right;
      margin-right: 0px;
      margin-left: auto;
      background-color: cornflowerblue;
      /* background-color: #0096FF; */
    }
    #chat-message {
      grid-column: 3/4;
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
      height: 70px;
      width: 330px;
      border: none;
      grid-column: 1/2;
      grid-row: 1/3;
      outline: none;
      font-family: 'Montserrat', sans-serif;
      font-size: 0.9rem;
      overflow: scroll;
    } 
    my-emojis {
      margin-left: 15px;
      grid-column: 2/3;
      margin-top: -45px;
    }
    #send-button {
      margin-left: 15px;
      grid-column: 2/3;
      display: flex;
      justify-content: center;
      border-radius: 10px;
      width: 40px;
      height: 40px;
      border: none;
      background-color: rgb(255, 255, 255, 0);
    }
    #send-button:hover {
      cursor: pointer;
      background-color: #aef2ee;
    }
    #send-button:focus {
      outline: none;
      background-color: #aef2ee;
    }
    #sound-control {
      margin-left: 15px;
      grid-column: 2/3;
      display: flex;
      justify-content: center;
      border-radius: 10px;
      width: 35px;
      height: 35px;
      margin-top: -50px;
      border: none;
      background-color: rgb(255, 255, 255, 0);
    }
    #sound-control:hover {
      cursor: pointer;
    }
    #chat-message button img {
      width: 35px;
      display: block;
    }
    #sound-control img {
      width: 30px !important;
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
    #channel = '1dsD-A444-Dfa0-sd43-0d32-P0we'
    #chatMessage
    #sendButton
    #message
    #username
    #nicknameForm
    #socket
    #chatOutput
    #emojis = {
      ':)': '😊',
      ':D': '😃',
      xD: '😆',
      XD: '😂',
      ':(': '😞',
      ':@': '😡',
      ':\'(': '😢',
      ':=(': '😭',
      '<3': '❤️',
      ':*': '😘',
      'o:)': '😇',
      'O:)': '😇',
      '(Y)': '👍',
      ':/': '😕',
      ';)': '😉',
      ':O': '😮',
      ':o': '😮',
      '8)': '😎',
      ';P': '😜',
      ':|': '😑',
      ':$': '😳'
    }

    /**
     * Creates an instance of current type.
     */
    constructor () {
      super()
      this.attachShadow({ mode: 'open' })
        .appendChild(template.content.cloneNode(true))

      this.#chatMessage = this.shadowRoot.querySelector('#chat-message')
      this.#sendButton = this.shadowRoot.querySelector('#send-button')
      this.#message = this.shadowRoot.querySelector('#message')
      this.#nicknameForm = this.shadowRoot.querySelector('nickname-form')
      this.#chatOutput = this.shadowRoot.querySelector('#chat-output')

      this.shadowRoot.querySelector('#sound-control').addEventListener('click', event => {
        event.preventDefault()
        this.#message.focus()
        if (this.shadowRoot.querySelector('#sound-control').getAttribute('mode') === 'on') {
          this.shadowRoot.querySelector('#sound-control').setAttribute('mode', 'off')
          this.shadowRoot.querySelector('#sound-on').classList.add('hidden')
          this.shadowRoot.querySelector('#sound-off').classList.remove('hidden')
        } else {
          this.shadowRoot.querySelector('#sound-control').setAttribute('mode', 'on')
          this.shadowRoot.querySelector('#sound-off').classList.add('hidden')
          this.shadowRoot.querySelector('#sound-on').classList.remove('hidden')
        }
      })

      this.#sendButton.addEventListener('click', event => this.#onSubmit(event))
      this.#nicknameForm.addEventListener('added', (event) => {
        this.#username = event.detail.nickname
        sessionStorage.setItem('username', this.#username)
        this.#startChat(event)
      })
      this.shadowRoot.querySelector('my-emojis').addEventListener('clicked', event => {
        this.#message.focus()
        this.#message.value = this.#message.value + event.detail.emojiValue
      })
      this.shadowRoot.querySelector('my-emojis').addEventListener('closed', () => this.#message.focus())
    }

    /**
     * Called after the element is inserted in the DOM.
     */
    connectedCallback () {
      this.#socket = new window.WebSocket('wss://courselab.lnu.se/message-app/socket')
      this.#socket.addEventListener('message', event => this.#displayChatMessage(event))
      if (sessionStorage.getItem('username')) {
        this.#username = sessionStorage.getItem('username')
        this.#startChat()
      }
    }

    /**
     * Called after the element is removed from the DOM.
     */
    disconnectedCallback () {
      this.#socket.close()
    }

    /**
     * Creates an instance of current type.
     */
    #startChat () {
      this.#nicknameForm.classList.add('hidden')
      this.shadowRoot.querySelector('#chat-output').classList.remove('hidden')
      this.#chatMessage.classList.remove('hidden')
      this.#message.focus()
    }

    /**
     * Creates an instance of current type.
     *
     * @param {Event} event The submit event.
     */
    #onSubmit (event) {
      event.preventDefault()
      let messageData = this.#message.value
      if (messageData.length !== 0) {
        const emojis = Object.keys(this.#emojis)
        const emojiCodes = Object.values(this.#emojis)
        for (let i = 0; i < emojis.length; i++) {
          const emoji = emojis[i]
          for (let j = 0; j < messageData.length - 1; j++) {
            if (emoji[0] === messageData[j]) {
              if (emoji[1] === messageData[j + 1]) {
                messageData = messageData.replace(messageData[j] + messageData[j + 1], emojiCodes[i])
              }
            }
          }
        }
        if (this.#socket.readyState === 1) {
          // this.#socket.addEventListener('open', () => this.#socket.send(JSON.stringify({
          this.#socket.send(JSON.stringify({
            type: 'message',
            data: messageData,
            username: this.#username,
            key: 'eDBE76deU7L0H9mEBgxUKVR0VCnq0XBd',
            channel: this.#channel
          }))
        }
        this.#chatMessage.reset()
      }
      this.#sendButton.blur()
      this.#message.focus()
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
        const messageData = data.data
        message.textContent = `${data.username}: ${messageData}`
        data.channel === this.#channel ? message.setAttribute('right', '') : message.setAttribute('left', '')
        if (data.type === 'message' && data.channel !== this.#channel && this.shadowRoot.querySelector('#sound-control').getAttribute('mode') === 'on') {
          this.shadowRoot.querySelector('audio').play()
        }
        this.#chatOutput.append(message)
      }
      this.#chatOutput.scrollTop = this.#chatOutput.scrollHeight
    }
  }
)
