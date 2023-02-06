
/**
 * ChatInput WebComponent creates a chat input with a text field and a send button.
 * When the send button is clicked, it dispatches a custom event chat - message 
 * with the message as the event detail.
 *
 * You can use this WebComponent in your HTML code as follows:
 * <chat-input ></chat-input >
 * 
 * You can listen for the chat - message event to handle the chat message 
 * in your game code.Here's an example of how you can do this:
 * 
 * const chatInput = document.querySelector('chat-input');
 * chatInput.addEventListener('chat-message', event => {
 *     // Handle the chat message
 *     console.log('Received chat message:', event.detail.message);
 * });
 * 
 * @class ChatInput
 * @extends {HTMLElement}
 */
class ChatInput extends HTMLElement {
    constructor() {
        super();

        // Create the shadow root
        this.attachShadow({ mode: 'open' });

        // Create the chat input element
        this.input = document.createElement('input');
        this.input.setAttribute('type', 'text');
        this.input.setAttribute('placeholder', 'Enter your message');

        // Create the send button element
        this.button = document.createElement('button');
        this.button.textContent = 'Send';

        // Add the input and button to the shadow root
        this.shadowRoot.appendChild(this.input);
        this.shadowRoot.appendChild(this.button);

        // Add an event listener to the send button
        this.button.addEventListener('click', () => {
            this.dispatchEvent(new CustomEvent('chat-message', {
                detail: {
                    message: this.input.value
                }
            }));
            this.input.value = '';
        });
    }
}

// Define the custom element
customElements.define('chat-input', ChatInput);