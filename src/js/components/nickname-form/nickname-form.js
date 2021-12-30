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
    <input id='submit' type='submit' value='Start'>
  </form>
  <style>
    label {
      display: block;
      font-size: 1.5rem;
      /* text-transform: uppercase; */
      font-weight: bold;
      text-align: center;
      color: black;
    }
    #name {
      display: block;
      margin: 0 auto;
      width: 200px;
      height: 50px;
      font-size: 1.2rem;
      margin-top: 20px;
      border-radius: 2px;
      padding-left: 20px;
      border-width: thin;
    }
    #submit {
      display: block;
      margin: 0 auto;
      margin-top: 20px;
      width: 150px;
      height: 50px;
      font-size: 1.5rem;
      cursor: pointer;
      color: white;
      background-color: black;
      border-width: thin;
    }
    #name:focus, #submit:focus {
      outline: 2px solid #666;
      border: none;
    }
    #wrong-input {
      text-align: center;
      color: white;
      margin-top: 10px;
    }
  </style>
`

customElements.define('nickname-form',
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
