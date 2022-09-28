 
const template = document.createElement('template');
template.innerHTML = `
    <style>
        [data-render-block="map"] {
            width: 148px;
            height: 148px;
            background: gray;
            position: absolute;
            bottom: 10px;
            left: 10px;
        }
    </style>

    <panel data-render-block="map">
        <div>
            Type: <slot name="typeDescription">Basic</slot>
        </div>

        <div data-render-block="map_graphic">
            <slot name="minimapTracing"></slot>
        </div>
    </panel>
`;
 
 
class MinimapPannel extends HTMLElement {

    static observedAttributes = ['maptype'];

    constructor() {
        super();

        // Custom element's property
        this.maptype = 'basic';

        this.attachShadow({ mode: 'open' });
        this.shadowRoot.appendChild(template.content.cloneNode(true));

        // TEST: Get custom element attribute set in HTML
        // console.dir(this.getAttribute('maptype'));

        // TEST: Get child element added in the HTML
        // console.info(this.querySelector('img'));

    }

    // Added to the DOM
    onMount() {
    }

    // Connected
    connectedCallback() { 
        console.log('On connected'); 

        this.maptype = this.getAttribute('maptype');
        // console.log(this.maptype);

        let typeDescription = this.shadowRoot.querySelector('[name="typeDescription"]')
        typeDescription.innerHTML = `[ ${this.maptype} ]` 
        this.maptype = `[ ${this.maptype} ]` 
        console.log(typeDescription);
     }

     // Disconnected (delete from DOM)
    disconnectedCallback() { 
        console.log('On disconnected'); 
     }

    static get observedAttributes() {
        return ['maptype'];
    }

    attributeChangedCallback(name, oldValue, newValue) {
        if (oldValue === newValue) return;
        this.maptype = newValue;
    }


    /* --- */
    //return the style content
    // getStyleContent() {
    //     return `
    //     span.marvel {
    //         background: red;
    //         color: white;
    //     }
    //     `;
    // }


}

customElements.define('minimap-panel', MinimapPannel);
