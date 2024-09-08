const template = document.createElement('template')
template.innerHTML = `
    <style>
        </style>
        <div>
            <h1>Typ your name here <span id="name"></span></h1>
            <input type="text" id="nameInput" />
            <button id="submit">Submit</button>
        </div>
    `
/**
 * This is a custom element that asks for the user's name.
 */
customElements.define('name-component',

  /**
   * Class that defines the custom element.
   */
  class extends HTMLElement {
    #submit
    #nameInput
    /**
     * Constructor that creates the custom element.
     */
    constructor () {
      super()
      this.attachShadow({ mode: 'open' })
      this.shadowRoot.appendChild(template.content.cloneNode(true))
      this.#submit = this.shadowRoot.querySelector('#submit')
      this.#nameInput = this.shadowRoot.querySelector('#nameInput')
    }

    /**
     * Method that is called when the custom element is connected to the DOM.
     * It adds an event listener to the submit button that changes the text of the h1 element.
     */
    connectedCallback () {
    }
  }
)
