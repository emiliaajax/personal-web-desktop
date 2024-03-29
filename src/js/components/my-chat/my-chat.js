/**
 * The my-chat web component module.
 *
 * @author Emilia Hansson <eh222yn@student.lnu.se>
 * @version 1.0.0
 */

import '../my-username-form/index.js'
import '../my-emojis/index.js'

// Web socket server address and API key.
const WSS_ADDRESS = ''
const ACCESS_TOKEN_SECRET = ''

/**
 * Urls to images used in component.
 */
const sendIconImage = (new URL('images/send-icon.png', import.meta.url)).href
const soundOffImage = (new URL('images/sound-off.png', import.meta.url)).href
const soundOnImage = (new URL('images/sound-on.png', import.meta.url)).href
const noWifi = (new URL('images/no-wifi.png', import.meta.url)).href

/**
 * Gets url to audio used in component. Retrieved from https://freesound.org/people/yfjesse/sounds/235911/.
 */
const notificationAudio = (new URL('audio/235911__yfjesse__notification-sound.wav', import.meta.url)).href

/**
 * Defines template.
 */
const template = document.createElement('template')
template.innerHTML = `
  <div id='username'>
    <my-username-form></my-username-form>
  </div>
  <div id='chat' class='hidden'>
    <div id='offlineMessage' class='hidden'></div>
    <div id='onlineMessage' class='hidden'></div>
    <div id='chat-output'></div>
    <div id='noConnection' class='hidden'>
      <img src='${noWifi}' width='30'>
      <span>No internet connection</span>
    </div>
    <form id='chat-message'>
      <textarea id='message'></textarea>
      <button id='send-button' type='submit'><img src='${sendIconImage}' alt='Send'></button>
      <my-emojis></my-emojis>
      <button id='notification-sound' mode='off'>
        <img src='${soundOnImage}' alt='Sound on' id='sound-on' class='hidden'>
        <img src='${soundOffImage}' alt='Sound off' id='sound-off'>
      </button>
    </form>
    <audio src='${notificationAudio}' controls class='hidden'>
  </div>
  <style>
    #username {
      background-color: #5de6de;
      /* Background color with gradient retrieved from https://www.eggradients.com/category/blue-gradient */
      background-image: linear-gradient(315deg, #5de6de 0%, #b58ecc 74%);
      width: 500px;
      height: 500px;
    }
    #chat {
      width: 500px;
      height: 500px;
      background-color: #5de6de;
      /* Background color with gradient retrieved from https://www.eggradients.com/category/blue-gradient */
      background-image: linear-gradient(315deg, #5de6de 0%, #b58ecc 74%);
      display: grid;
      grid-template-rows: auto;
    }
    my-username-form {
      position: absolute;
      top: 35%;
      left: 28%;
      margin: 0 auto;
    }
    #noConnection img {
      position: absolute;
      left: 60px;
      top: 2px;
      background-color: rgb(0, 0, 0, 0)
    }
    #noConnection span {
      position: absolute;
      left: 100px;
      top: 10px;
    }
    #noConnection {
      position: absolute;
      top: 200px;
      left: 100px;
      width: 300px;
      height: 30px;
      border-radius: 10px;
      background-color: #333;
      text-align: center;
      color: white;
      padding-top: 10px;
      /* Box-shadow code from https://getcssscan.com/css-box-shadow-examples */
      box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
      transition: all 0.3s ease;
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
      word-break: break-all;
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
    #notification-sound {
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
    #notification-sound:hover {
      cursor: pointer;
    }
    #chat-message button img {
      width: 35px;
      display: block;
    }
    #notification-sound img {
      width: 30px !important;
    }
    #offlineMessage {
      width: 8px;
      height: 8px;
      border-radius: 50%;
      position: absolute;
      top: 9px;
      left: 53%;
      background-color: #8b0000;
    }
    #onlineMessage {
      width: 8px;
      height: 8px;
      border-radius: 50%;
      position: absolute;
      top: 9px;
      left: 53%;
      background-color: green;
    }
    .hidden {
      display: none !important;
    }
  </style>
`

/*
 * Defines custom element.
 */
customElements.define('my-chat',
  /**
   * Represents a my-chat element.
   */
  class extends HTMLElement {
    /**
     * The channel property of the message.
     *
     * @type {string}
     */
    #channel = '1dsD-A444-Dfa0-sd43-0d32-P0we'
    /**
     * The timeout identifier.
     *
     * @type {number}
     */
    #timeoutID
    /**
     * A boolean with connection status.
     *
     * @type {boolean}
     */
     #connected
    /**
     * Represents the chat message form.
     *
     * @type {HTMLFormElement}
     */
    #chatMessage
    /**
     * Represents the send message button.
     *
     * @type {HTMLButtonElement}
     */
    #sendButton
    /**
     * Represents the message textarea.
     *
     * @type {HTMLTextAreaElement}
     */
    #message
    /**
     * The username used in the chat.
     *
     * @type {string}
     */
    #username
    /**
     * Represents the custom username form element.
     *
     * @type {HTMLElement}
     */
    #usernameForm
    /**
     * The WebSocket object.
     *
     * @type {WebSocket}
     */
    #socket
    /**
     * Represents the output where the messages will be display.
     *
     * @type {HTMLDivElement}
     */
    #chatOutput
    /**
     * Represents the notification sound on/off button.
     *
     * @type {HTMLButtonElement}
     */
    #notificationSound
    /**
     * An object of emojis.
     *
     * @type {object}
     */
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
      this.#usernameForm = this.shadowRoot.querySelector('my-username-form')
      this.#chatOutput = this.shadowRoot.querySelector('#chat-output')
      this.#notificationSound = this.shadowRoot.querySelector('#notification-sound')

      // Event handlers
      this.#usernameForm.addEventListener('added', (event) => {
        this.#storeUsername(event)
        this.#startChat(event)
      })
      this.#sendButton.addEventListener('click', event => this.#onSubmit(event))
      this.#message.addEventListener('keydown', event => {
        if (event.key === 'Enter') {
          event.preventDefault()
          this.#onSubmit(event)
        }
      })
      this.shadowRoot.querySelector('my-emojis').addEventListener('clicked', event => this.#addEmojiToMessage(event))
      this.shadowRoot.querySelector('my-emojis').addEventListener('closed', () => this.#message.focus())
      this.#notificationSound.addEventListener('click', event => this.#soundControl(event))
      window.addEventListener('offline', () => this.#displayOfflineMessage())
      window.addEventListener('online', () => this.#displayOnlineMessage())
    }

    /**
     * Called after the element is inserted in the DOM.
     */
    connectedCallback () {
      this.#socket = new window.WebSocket(WSS_ADDRESS)
      this.#socket.addEventListener('open', () => this.#displayOnlineMessage())
      this.#socket.addEventListener('close', () => this.#displayOfflineMessage())
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
      clearTimeout(this.#timeoutID)
    }

    /**
     * Displays the chat.
     */
    #startChat () {
      this.shadowRoot.querySelector('#username').classList.add('hidden')
      this.shadowRoot.querySelector('#chat').classList.remove('hidden')
      this.#message.focus()
    }

    /**
     * Sends the submitted message to the server over the WebSocket connection.
     *
     * @param {Event} event The click event.
     */
    #onSubmit (event) {
      event.preventDefault()
      if (this.#message.value.length !== 0) {
        this.#searchMessageForEmojis()
        if (this.#socket.readyState === 1 && this.#connected) {
          this.#socket.send(JSON.stringify({
            type: 'message',
            data: this.#message.value,
            username: this.#username,
            key: ACCESS_TOKEN_SECRET,
            channel: this.#channel
          }))
          this.#chatMessage.reset()
        } else {
          this.#noConnectionBanner()
        }
      }
      this.#sendButton.blur()
      this.#message.focus()
    }

    /**
     * Displays the chat messages in the chat output area.
     *
     * @param {Event} event The message event.
     */
    #displayChatMessage (event) {
      const messageData = JSON.parse(event.data)
      if (messageData.type === 'notification' || messageData.type === 'message') {
        const pElem = document.createElement('p')
        pElem.textContent = `${messageData.username}: ${messageData.data}`
        messageData.channel === this.#channel ? pElem.setAttribute('right', '') : pElem.setAttribute('left', '')
        if (messageData.type === 'message' && messageData.channel !== this.#channel && this.#notificationSound.getAttribute('mode') === 'on') {
          this.shadowRoot.querySelector('audio').play()
        }
        this.#chatOutput.append(pElem)
      }
      this.#chatOutput.scrollTop = this.#chatOutput.scrollHeight
    }

    /**
     * Controls the sound of the notification. If the mode is set to on, the sound is turned off. If the mode is set to off, the sound is turned on.
     *
     * @param {Event} event The click event.
     */
    #soundControl (event) {
      event.preventDefault()
      this.#message.focus()
      if (this.#notificationSound.getAttribute('mode') === 'on') {
        this.#notificationSound.setAttribute('mode', 'off')
        this.shadowRoot.querySelector('#sound-on').classList.add('hidden')
        this.shadowRoot.querySelector('#sound-off').classList.remove('hidden')
      } else {
        this.#notificationSound.setAttribute('mode', 'on')
        this.shadowRoot.querySelector('#sound-off').classList.add('hidden')
        this.shadowRoot.querySelector('#sound-on').classList.remove('hidden')
      }
    }

    /**
     * Stores the username.
     *
     * @param {Event} event The added event.
     */
    #storeUsername (event) {
      this.#username = event.detail.nickname
      sessionStorage.setItem('username', this.#username)
    }

    /**
     * Adds the emoji to the message textarea.
     *
     * @param {Event} event The clicked event.
     */
    #addEmojiToMessage (event) {
      this.#message.focus()
      this.#message.value = this.#message.value + event.detail.emojiValue + ' '
    }

    /**
     * Searches the message for certain character combinations (emoticons) and replaces matches with emojis.
     */
    #searchMessageForEmojis () {
      const emoticons = Object.keys(this.#emojis)
      const emojis = Object.values(this.#emojis)
      for (let i = 0; i < emoticons.length; i++) {
        const emoticon = emoticons[i]
        for (let j = 0; j < this.#message.value.length - 1; j++) {
          if (emoticon[0] === this.#message.value[j]) {
            if (emoticon[1] === this.#message.value[j + 1]) {
              this.#message.value = this.#message.value.replace(this.#message.value[j] + this.#message.value[j + 1], emojis[i])
            }
          }
        }
      }
    }

    /**
     * Displays a timed banner with "no internet connection" text.
     */
    #noConnectionBanner () {
      this.shadowRoot.querySelector('#noConnection').classList.remove('hidden')
      this.#timeoutID = setTimeout(() => {
        this.shadowRoot.querySelector('#noConnection').classList.add('hidden')
      }, 5000)
    }

    /**
     * Displays a red dot and a timed connection banner when offline.
     */
    #displayOfflineMessage () {
      this.shadowRoot.querySelector('#offlineMessage').classList.remove('hidden')
      this.shadowRoot.querySelector('#onlineMessage').classList.add('hidden')
      this.#connected = false
      this.#noConnectionBanner()
    }

    /**
     * Displays a green dot when online, and if web socket is closed or closing, creates a new connection.
     */
    #displayOnlineMessage () {
      if (this.#socket.readyState === 2 || this.#socket.readyState === 3) {
        this.#socket = new window.WebSocket(WSS_ADDRESS)
        this.#socket.addEventListener('message', event => this.#displayChatMessage(event))
      }
      this.shadowRoot.querySelector('#offlineMessage').classList.add('hidden')
      this.shadowRoot.querySelector('#onlineMessage').classList.remove('hidden')
      this.#connected = true
    }
  }
)
