const template = document.createElement('template')
template.innerHTML = `
    <style>
        :host {
            display: block;
            font-family: sans-serif;
            text-align: center;
            margin: 20px;
            background-color: #f9f9f9;
            padding: 20px;
            border-radius: 8px;
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
            max-width: 300px;
            margin: 0 auto;
        }
        #arabicName {
            color: #333;
            font-size: 50px;
            margin-top: 50px;
        }
    </style>
    <div id="container">
        <h1>Type your name here <span id="name"></span></h1>
        <input type="text" id="nameInput" />
        <button id="submit">Submit</button>
        <button id="reset" style="display: none;">Reset</button>
        <h1 id="arabicName"></h1>
    </div>
`

customElements.define('name-component',

  /**
   * Class that defines the custom element.
   */
  class extends HTMLElement {
    #submit
    #nameInput
    #arabicName
    #reset
    #latinToArabicMap = {
      a: 'ا',
      b: 'ب',
      c: 'س',
      d: 'د',
      e: 'ا',
      f: 'ف',
      g: 'ج',
      h: 'ه',
      i: 'ي',
      j: 'ج',
      k: 'ك',
      l: 'ل',
      m: 'م',
      n: 'ن',
      o: 'و',
      p: 'ب',
      q: 'ق',
      r: 'ر',
      s: 'س',
      t: 'ت',
      u: 'و',
      v: 'ف',
      w: 'و',
      x: 'كس',
      y: 'ي',
      z: 'ز',
      kh: 'خ',
      th: 'ت',
      dh: 'ذ',
      sh: 'ش',
      gh: 'غ',
      ph: 'ف',
      ch: 'ش',
      ie: 'ي',
      ei: 'ي',
      ey: 'ي',
      la: 'لى',
      nn: 'ن'
    }

    /**
     * Constructor that creates the custom element.
     */
    constructor () {
      super()
      this.attachShadow({ mode: 'open' })
      this.shadowRoot.appendChild(template.content.cloneNode(true))
      this.#submit = this.shadowRoot.querySelector('#submit')
      this.#nameInput = this.shadowRoot.querySelector('#nameInput')
      this.#arabicName = this.shadowRoot.querySelector('#arabicName')
      this.#reset = this.shadowRoot.querySelector('#reset')
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
          const arabicName = this.translateName(name)
          elementToChange.textContent = 'Hello, ' + name
          this.#nameInput.style.display = 'none'
          this.#submit.style.display = 'none'
          this.#reset.style.display = 'inline-block'
          this.#arabicName.textContent = 'Your name in Arabic is: ' + arabicName
        }
      })
      // Add an event listener to the reset button that resets the form.
      this.#reset.addEventListener('click', () => {
        this.#nameInput.style.display = 'inline-block'
        this.#submit.style.display = 'inline-block'
        this.#reset.style.display = 'none'
        this.#nameInput.value = ''
        this.#arabicName.textContent = ''
        this.shadowRoot.querySelector('h1').textContent = 'Type your name here'
      })
    }

    /**
     * Method that translates a name from Latin characters to Arabic characters.
     *
     * @param {string} name - The name to translate.
     * @returns {string} The name translated to Arabic.
     */
    translateName (name) {
      let arabicName = ''
      let i = 0
      const length = name.length

      for (i = 0; i < length; i++) {
        if (i < length - 1) {
          const doubleChar = name.slice(i, i + 2).toLowerCase()
          if (this.#latinToArabicMap[doubleChar]) {
            arabicName += this.#latinToArabicMap[doubleChar]
            i += 1
            continue
          }
        }
        const singleChar = name[i].toLowerCase()
        arabicName += this.#latinToArabicMap[singleChar] || name[i]
      }

      return arabicName
    }
  }
)
