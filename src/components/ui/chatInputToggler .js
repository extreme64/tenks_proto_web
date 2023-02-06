import Controls from "../general/controls";

/**
 * This component uses the Shadow DOM to encapsulate the styles 
 * and structure of the component, ensuring that it won't interfere 
 * with other elements on the page. The button has an event listener 
 * attached to it that toggles the open class on the .chat-input 
 * element, which in turn controls its visibility through CSS.
 *
 * @class ChatInputToggler
 * @extends {HTMLElement}
 */
class ChatInputToggler extends Controls {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        this.shadowRoot.innerHTML = `
      <style>
        .chat-input-toggler {
          display: flex;
          justify-content: center;
        }
        .chat-input {
          display: none;
        }
        .chat-input.open {
          display: block;
        }
      </style>
      <div class="chat-input-toggler">
        <button id="chat-input-toggler-button">Open/Close Chat Input</button>
        <div class="chat-input">
          <input type="text" id="chat-input-field"/>
          <button id="chat-input-submit">Submit</button>
        </div>
      </div>
    `;

    this.shadowRoot
        .querySelector("#chat-input-toggler-button")
        .addEventListener("click", () => {
            this.shadowRoot
                .querySelector(".chat-input")
                .classList.toggle("open");
        });
    }
}

customElements.define("chat-input-toggler", ChatInputToggler);