 
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
        <div data-action="slot-1">
            <span>⛺</span>
        </div>
        <div data-action="slot-2">
            <span>🚩</span>
        </div>
        <div data-action="slot-3">
            <span>⏳</span>
        </div>
        <div data-action="slot-4">
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
    actionStatus = []

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
        
        this.setAction1()
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


    setAction1(root) {
        let element = this.shadowRoot.querySelector('[data-action="slot-1"]')
        element.addEventListener('click', (event) => {
            this.actionStatus[1] = true
            console.log('Action 1 ACTIVE')
            console.log(this.actionStatus)
        })
    }

    setAction2(root) {
        let element = this.shadowRoot.querySelector('[data-action="slot-2"]')
        element.addEventListener('click', (event) => {
            console.log(event)
            this.actionStatus[2] = true
            console.log('Action 2 ACTIVE')
            console.log(this.actionStatus)
        })
    }


}

customElements.define('controls-ui', Controls);
