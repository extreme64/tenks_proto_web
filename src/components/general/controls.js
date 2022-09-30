 
const template = document.createElement('template');
template.innerHTML = `
    <style>
        [data-render-block="controls"] {
            z-index: 30;
            display: flex;
            width: 100%;
            background: red;
        }
       [data-render-block="close_btn"] {
            content: '❌';
            position: absolute;
            top: 0px;
            right: 4px;
            display: flex;
            width: 1.2em;
            height: 1.2em;
            background: white;
            text-align: center;
            align-items: center;
            justify-content: center;
        }
        [data-render-block="close_btn"]:hover{
            content: '❌';
            background: #ee22ee;
        }
    </style>

    <div data-render-block="controls">
        <div>
            <span>⛺</span>
        </div>
        <div>
            <span>🚩</span>
        </div>
        <div>
            <span>⏳</span>
        </div>
         <div>
            <span>📡</span>
        </div>
    </div>
    <div data-render-block="close_btn" target="parent">❌</div>
`;
 
const btnGraphics = [
    '⛺','💰','🔫','🔧','⚙️','📡','💬','💢','📣','🔃',
    '◀️','▶️','➕','➖','✖️','❓','❗','💲','♻️','✔️','❌',
    '🆘','💠','💀','☠️','🎓'
]

 
class Controls extends HTMLElement {

    static observedAttributes = ['type'];
    

    constructor() {
        super();

        this.type = 'generic';
    }

    // Added to the DOM
    onMount() {
    }

    connectedCallback() { 
        console.log('On connected'); 

        this.attachShadow({ mode: 'open' });
        this.shadowRoot.appendChild(template.content.cloneNode(true));

        this.type = this.getAttribute('type');  
     }

    disconnectedCallback() { }

    static get observedAttributes() {
        return ['type'];
    }

    attributeChangedCallback(name, oldValue, newValue) {
        if (oldValue === newValue) return;
        this.maptype = newValue;

        if (name === 'type') {
            console.log( this.type )
        }
    }
}

customElements.define('controls-ui', Controls);
