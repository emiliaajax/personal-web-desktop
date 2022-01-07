/**
 * The nickname-form web component module.
 *
 * @author Emilia Hansson <eh222yn@student.lnu.se>
 * @version 1.1.0
 */

const template = document.createElement('template')

template.innerHTML = `
  <form id='form' autocomplete='off' method='POST' action=''>
    <label part='name-text' for='name'>Username</label>
    <input id='name' type='text' name='name' autofocus>
    <div id='wrong-input'></div>
    <input id='submit' type='submit' value='Enter'>
  </form>
  <style>
    label {
      display: block;
      font-size: 1.5rem;
      text-transform: uppercase;
      font-weight: bold;
      text-align: center;
      color: #333;
      font-family: Georgia;
    }
    #name {
      display: block;
      margin: 0 auto;
      width: 200px;
      height: 50px;
      font-size: 1.2rem;
      margin-top: 20px;
      border-radius: 10px;
      padding-left: 20px;
      border: none;
      cursor: text;
    }
    #submit {
      display: block;
      margin: 0 auto;
      margin-top: 20px;
      width: 100px;
      border-radius: 10px;
      height: 50px;
      font-size: 1.2rem;
      cursor: pointer;
      color: white;
      background-color: #333;
      border: none;
    }
    #name:focus {
      outline: none;
      border: none;
    }
    #submit:focus {
      border: none;
      outline: 1px solid white;
    }
    #wrong-input {
      text-align: center;
      color: white;
      margin-top: 10px;
    }
  </style>
`

customElements.define('my-username-form',
  /**
   * Represents a nickname-form element.
   */
  class extends HTMLElement {
    /**
     * The element representing the nickname.
     *
     * @type {HTMLFormElement}
     */
    #nicknameForm

    /**
     * Creates an instance of current type.
     */
    constructor () {
      super()
      this.attachShadow({ mode: 'open' })
        .appendChild(template.content.cloneNode(true))
      this.#nicknameForm = this.shadowRoot.querySelector('#form')

      this.#nicknameForm.addEventListener('submit', (event) => this.#onSubmit(event))
    }

    /**
     * Called after the element is inserted in the DOM.
     */
    connectedCallback () {
      this.shadowRoot.querySelector('input#name').focus()
    }

    /**
     * Executes when the nickname form is submitted.
     *
     * @param {Event} event The submit event.
     */
    #onSubmit (event) {
      event.preventDefault()
      if (this.shadowRoot.querySelector('input#name').value.length > 2) {
        this.dispatchEvent(new CustomEvent('added', { detail: { nickname: this.shadowRoot.querySelector('input#name').value } }))
      } else {
        this.shadowRoot.querySelector('#wrong-input').textContent = '* Username must be at least three characters'
      }
    }
  }
)
