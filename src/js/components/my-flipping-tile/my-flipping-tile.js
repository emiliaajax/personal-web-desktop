
const template = document.createElement('template')

template.innerHTML = `
  <button id='tile' back>
    <div id='back'> 
      <img src='../../images/tile-back.jpg'>
    </div>
    <div id='front' class='hidden'>
      <slot></slot>
    </div>
  </button>
  <style>
    :host {
      display: inline-block;
      height: 90px;
      width: 90px;
      padding: 0;
      margin: 0;
      border-radius: 10px;
      perspective: 1000px;
      position: relative;
      vertical-align: top;
    }
    #back, #front {
      margin: 0 auto;
    }
    ::slotted(*), img {
      position: absolute;
      top: 0px;
      left: 0px;
      width: 90px;
      border-radius: 10px;
    }
    #tile {
      background-color: rgb(0, 0, 0, 0);
      width: 90px;
      height: 90px;
      padding-top: 10px;
      padding-bottom: 10px;
      border-radius: 10px;
      /* border: 1px solid #666; */
      border: none;
      border-width: thin;
      cursor: pointer;
      transition: 0.5s;
      transform-style: preserve-3d;
    }
    #tile[back] {
      transform: rotateY(180deg);
    }
    #tile[revealed] {
      /* border: 1px dotted black; */
      border: none;
      box-shadow: none;
      pointer-events: none; 
    }
    #tile[disabled] {
      cursor: default;
      pointer-events: none;
      border: none;
    }
    #tile[invisible] {
      visibility: hidden;
      /* border: 1px dotted black; */
      box-shadow: none;
    }
    :host([invisible]) {
      /* border: 1px dotted black; */
      box-shadow: none;
    }
    .hidden {
      display: none;
    }
  </style>
`

customElements.define('my-flipping-tile',
  /**
   * Represents a my-flipping-tile element.
   */
  class extends HTMLElement {
    /**
     * The element representing the tile.
     *
     * @type {HTMLDivElement}
     */
    #tile
    /**
     * The element representing the front of tile.
     *
     * @type {HTMLImageElement}
     */
    #front
    /**
     * The element representing the back of tile.
     *
     * @type {HTMLImageElement}
     */
    #back
    /**
     * Creates an instance of current type.
     */
    constructor () {
      super()
      this.attachShadow({ mode: 'open' })
        .appendChild(template.content.cloneNode(true))
      this.#tile = this.shadowRoot.querySelector('#tile')
      this.#front = this.shadowRoot.querySelector('#front')
      this.#back = this.shadowRoot.querySelector('#back')

      this.shadowRoot.addEventListener('click', (event) => {
        event.preventDefault()
        this.#flip()
        this.dispatchEvent(new CustomEvent('flip'))
      })
    }

    /**
     * Attributes to monitor.
     *
     * @returns {string[]} A string array of attributes.
     */
    static get observedAttributes () {
      return ['invisible', 'disabled', 'revealed']
    }

    /**
     * Called when one or several of the observed attributes changes.
     *
     * @param {string} name - The attribute's name.
     * @param {*} oldValue - The old value.
     * @param {*} newValue - The new value.
     */
    attributeChangedCallback (name, oldValue, newValue) {
      if (name === 'invisible' && oldValue !== newValue) {
        if (newValue === '') {
          this.#tile.setAttribute('invisible', '')
        } else {
          this.#tile.removeAttribute('invisible')
        }
      }
      if (name === 'disabled' && oldValue !== newValue) {
        if (newValue === '') {
          this.#tile.setAttribute('disabled', '')
        } else {
          this.#tile.removeAttribute('disabled')
        }
      }
      if (name === 'revealed' && oldValue !== newValue) {
        this.#tile.setAttribute('disabled', '')
        this.#tile.setAttribute('revealed', '')
        if (newValue !== '') {
          this.#flip()
          this.#tile.removeAttribute('disabled')
          this.#tile.removeAttribute('revealed')
        }
      }
    }

    /**
     * Flips the tile.
     *
     */
    #flip () {
      if (this.#tile.hasAttribute('back')) {
        this.#tile.toggleAttribute('back')
        setTimeout(() => {
          this.#back.classList.add('hidden')
          this.#front.classList.remove('hidden')
        }, 150)
      } else {
        this.#tile.toggleAttribute('back')
        setTimeout(() => {
          this.#back.classList.remove('hidden')
          this.#front.classList.add('hidden')
        }, 150)
      }
    }
  }
)
