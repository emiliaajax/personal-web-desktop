
const template = document.createElement('template')

template.innerHTML = `
  <div id='emojis'>
    <button id='emoji-button'>😊</button>
    <div id='emoji-container' class='hidden'>
      <button class='emoji'>😊</button>
      <button class='emoji'>😃</button>
      <button class='emoji'>😆</button>
      <button class='emoji'>😂</button>
      <button class='emoji'>😞</button>
      <button class='emoji'>😡</button>
      <button class='emoji'>😢</button>
      <button class='emoji'>😭</button>
      <button class='emoji'>❤️</button>
      <button class='emoji'>😜</button>
      <button class='emoji'>😘</button>
      <button class='emoji'>😇</button>
      <button class='emoji'>😅</button>
      <button class='emoji'>😍</button>
      <button class='emoji'>🤩</button>
      <button class='emoji'>😕</button>
      <button class='emoji'>😉</button>
      <button class='emoji'>😮</button>
      <button class='emoji'>😎</button>
      <button class='emoji'>😁</button>
      <button class='emoji'>😑</button>
      <button class='emoji'>😳</button>
      <button class='emoji'>🙃</button>
      <button class='emoji'>🥰</button>
      <button class='emoji'>😋</button>
      <button class='emoji'>🤪</button>
      <button class='emoji'>🤗</button>
      <button class='emoji'>🤔</button>
      <button class='emoji'>😏</button>
      <button class='emoji'>😒</button>
      <button class='emoji'>🙄</button>
      <button class='emoji'>😬</button>
      <button class='emoji'>😪</button>
      <button class='emoji'>😴</button>
      <button class='emoji'>😷</button>
      <button class='emoji'>🤢</button>
      <button class='emoji'>🥴</button>
      <button class='emoji'>🤯</button>  
      <button class='emoji'>🥳</button>
      <button class='emoji'>🤓</button>
      <button class='emoji'>😰</button>
      <button class='emoji'>😤</button>
      <button class='emoji'>😓</button>
      <button class='emoji'>🤬</button>
      <button class='emoji'>💩</button>
      <button class='emoji'>👋</button>
      <button class='emoji'>👌</button>
      <button class='emoji'>✌️</button>
      <button class='emoji'>🤞</button>
      <button class='emoji'>🤙</button>
      <button class='emoji'>👍</button>
      <button class='emoji'>👎</button>
      <button class='emoji'>👏</button>
      <button class='emoji'>🙌</button>
      <button class='emoji'>🙏</button>
      <button class='emoji'>💪</button>
      <button class='emoji'>💁</button>
      <button class='emoji'>🙋</button>
      <button class='emoji'>🤷</button>
      <button class='emoji'>🤴</button>
      <button class='emoji'>👸</button>
      <button class='emoji'>💃</button>
      <button class='emoji'>🕺</button>
      <button class='emoji'>💏</button>
      <button class='emoji'>🙈</button>
      <button class='emoji'>🙉</button>
      <button class='emoji'>🙉</button>
      <button class='emoji'>💦</button>
      <button class='emoji'>🐶</button>
      <button class='emoji'>🐷</button>
      <button class='emoji'>🦠</button>
      <button class='emoji'>🌺</button>
      <button class='emoji'>🌍</button>
      <button class='emoji'>☀️</button>
      <button class='emoji'>⭐</button>
      <button class='emoji'>🔥</button>
      <button class='emoji'>🍆</button>
      <button class='emoji'>🍔</button>
      <button class='emoji'>🍟</button>
      <button class='emoji'>🍕</button>
      <button class='emoji'>🍿</button>
      <button class='emoji'>🍾</button>
      <button class='emoji'>🍻</button>
      <button class='emoji'>🥂</button>
      <button class='emoji'>🛹</button>
      <button class='emoji'>🏆</button>
      <button class='emoji'>✈️</button>
      <button class='emoji'>🏔️</button>
      <button class='emoji'>🏝️</button>
      <button class='emoji'>🚀</button>
      <button class='emoji'>🗺️</button>
      <button class='emoji'>🎉</button>
      <button class='emoji'>🧸</button>
      <button class='emoji'>💻</button>
      <button class='emoji'>💉</button>
      <button class='emoji'>🇸🇪</button>
      <button class='emoji'>🇳🇴</button>
    </div>
  </div>
  <style>
    #emojis {
      position: absolute;
    }
    #emoji-button {
      width: 40px;
      height: 40px;
      /* border: 1px solid #666; */
      border: none;
      padding-top: 3px;
      border-radius: 2px;
      border-radius: 10px;
      font-size: 1.7rem;
      cursor: pointer;
      background-color: rgb(237, 237, 237, 0);
    }
    #emoji-button:hover {
      background-color: #aef2ee;
    }
    #emoji-button:focus {
      background-color: #aef2ee;
      outline: none;
    }
    #emoji-container {
      position: absolute;
      width: 210px;
      max-height: 180px;
      left: -145px;
      top: -190px;
      display: flex;
      flex-wrap: wrap;
      background-color: white;
      border-radius: 0px 10px 10px 10px;
      overflow: scroll;
      box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
    }
    .emoji {
      width: 30px;
      height: 30px;
      text-decoration: none;
      border: black;
      background-color: white;
      cursor: pointer;
    }
    .emoji:hover {
      background-color: #ededed;
    }
    .emoji:focus {
      background-color: #ededed;
      outline: none;
    }
    .hidden {
      display: none !important;
    }
  </style>
`

customElements.define('my-emojis',
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

      this.shadowRoot.querySelector('#emoji-button').addEventListener('click', event => {
        event.preventDefault()
        if (!this.shadowRoot.querySelector('#emoji-container').hasAttribute('active')) {
          this.shadowRoot.querySelector('#emoji-container').setAttribute('active', '')
          this.shadowRoot.querySelector('#emoji-container').classList.remove('hidden')
        } else {
          this.shadowRoot.querySelector('#emoji-container').removeAttribute('active')
          this.shadowRoot.querySelector('#emoji-container').classList.add('hidden')
          event.target.blur()
          this.dispatchEvent(new CustomEvent('closed'))
        }
      })

      this.shadowRoot.querySelectorAll('.emoji').forEach(emoji => emoji.addEventListener('click', event => {
        event.preventDefault()
        this.dispatchEvent(new CustomEvent('clicked', { detail: { emojiValue: emoji.textContent } }))
      }))
    }
  }
)
