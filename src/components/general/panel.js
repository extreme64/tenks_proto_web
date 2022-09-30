
const template = document.createElement('template');
template.innerHTML = `
    <style>
        [data-render-block="panel-ui"] {
            z-index: 10;
            width: 148px;
            height: 148px;
            background: #49faff;
            position: absolute;
            bottom: 8px;
            left: 8px;
            border: 2px solid red;
        }
    </style>

    <div data-render-block="panel-ui">
        <slot name="minimapPreview"></slot>
    </div>
`;

class PanelElement extends HTMLElement {

    static observedAttributes = ['panelType'];

    constructor() {
        super();

        this.panelType = 'generic';
    }

    onMount() {
    }

    connectedCallback() {
        this.attachShadow({ mode: 'open' });
        this.shadowRoot.appendChild(template.content.cloneNode(true));

        this.maptype = this.getAttribute('panelType');
    }

    disconnectedCallback() {}

    static get observedAttributes() {
        return ['panelType'];
    }

    attributeChangedCallback(name, oldValue, newValue) {
        if (oldValue === newValue) return;
        this.panelType = newValue;

        if (name === 'panelType') {}
    }
}

customElements.define('panel-ui', PanelElement);
