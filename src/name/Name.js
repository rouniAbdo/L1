const template = document.createElement('template')
template.innerHTML = `
    <style>
        :host {
            display: block;
            font-family: sans-serif;
            text-align: center;
            margin: "20px";
        }
        h1 {
            color: #333;
            font-size: 24px;
        }
        input {
            padding: 8px;
            margin: 10px 0;
            border: 1px solid #ccc;
            border-radius: 4px;
            font-size: 16px;
            width: calc(100% - 20px);
            box-sizing: border-box;
        }
        button {
            padding: 8px 16px;
            background-color: #007bff;
            color: #fff;
            border: none;
            border-radius: 4px;
            cursor: pointer;
            transition: background-color 0.3s;
        }
        button:hover {
            background-color: #0056b3;
        }
        button:disabled {
            background-color: #ccc;
            cursor: not-allowed;
        }
        #container {
            Max-width: 300px;
            margin: 0 auto;
        }
        </style>
        <div id="container">
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
      this.#submit.addEventListener('click', () => {
        const name = this.#nameInput.value.trim()
        const elementToChange = this.shadowRoot.querySelector('h1')
        if (!name) {
          elementToChange.textContent = 'Please type your name'
        } else {
          elementToChange.textContent = 'Hello, ' + name
          this.#nameInput.style.display = 'none'
          this.#submit.style.display = 'none'
        }
      })
    }
  }
)
