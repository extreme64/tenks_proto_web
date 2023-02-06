 
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

         <img src="/graphics-not-used/HUD on Behance_files/3d-art.png" alt="some 3d image -- shadow">
    </panel>
`;
 
 
class TestProto extends HTMLElement {

    static observedAttributes = ['maptype'];

    constructor() {
        super();

        // Custom element's property
        this.maptype = 'basic';

        this.attachShadow({ mode: 'open' });
        this.shadowRoot.appendChild(template.content.cloneNode(true));

        // TEST: Get custom element attribute set in HTML
        console.dir(this.getAttribute('maptype'));

        // TEST: Get child element added in the HTML
        console.info(this.querySelector('img'));

        console.info(this.innerHTML);

        this.maptype = this.getAttribute('maptype');
        console.log(this.maptype);

        this.shadowRoot.appendChild( this.querySelector('img') );
    
    }

    // Added to the DOM
    onMount() {
    }

    // Connected
    connectedCallback() { 
        console.log('On connected'); 

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

        if (name === 'maptype') {
            this.querySelector('[slot = "typeDescription"]').textContent = this.getAttribute('maptype');

            console.log( this.shadowRoot.querySelector('[data-render-block="map"]') )
        }
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

customElements.define('test-proto', TestProto);


// FIXME LOAD template HTML
// import template from './template.js';

// export default class MyModule extends HTMLElement {

//     constructor() {
//         super();
//         this.shadow = this.attachShadow({ mode: "open" });
//         this.template = new DOMParser().parseFromString(template, 'text/html').querySelector('template');
//         this.shadow.appendChild(this.template.content);
//     }
// }