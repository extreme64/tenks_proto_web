 
const template = document.createElement('template');
template.innerHTML = `
    <style>
        [data-render-block="minimap"] {
            z-index: 20;
            width: 148px;
            height: 148px;
            background: gray;
            position: absolute;
            bottom: 0px;
            left: 0px;
        }

        [data-render-block="map_graphic"] {
            display: flex;
            flex-wrap: wrap;
        }
        [data-render-block="map_graphic"] > span {
            font-size: 0.4em;
            color: rgb(251 19 255);
            width: 18px;
            text-align: center;
            display: flex;
            height: 12px;
            justify-content: center;
            align-items: center;
        }
    </style>

    <div data-render-block="minimap">
        <div>
            <slot name="minimapControls">[..] [..]</slot>
        </div>
        <div>
            Type: <slot name="typeDescription">Basic</slot>
        </div>
        <div data-render-block="map_graphic">
            <slot name="minimapTracing"></slot>
        </div>

        <!-- <img src="/graphics-not-used/HUD on Behance_files/3d-art.png" alt="some 3d image -- shadow"> -->
    </div>
`;
 
 
class Minimap extends HTMLElement {

    static observedAttributes = ['maptype', 'data'];
    

    constructor() {
        super();

        // Custom element's property
        this.maptype = 'basic'

        this.data = []
    }


    /**
     * @param {any[]} mapData
     */
    setData(mapData) {
        this.data = mapData

        let minimapmapDataTracing = []

        this.data.map((item, index) => {

            let color
            switch(item.typeId){
                case 1:
                    color = "#865e40"
                    break
                case 2:
                    color = "#813b30"
                    break
                case 3:
                    color = "#499321"
                    break
                case 4:
                    color = "#266a2c"
                    break
                case 5:
                    color = "#275842"
                    break
                case 6:
                    color = "#28752e"
                    break
                case 7:
                    color = "#4160c3"
                    break
                case 8:
                    color = "#221111"
                    break
            }
            minimapmapDataTracing += `<span style="background-color: ${color}">${item.typeId}</span>`

        })

        this.shadowRoot.querySelector('[data-render-block="map_graphic"]').innerHTML = minimapmapDataTracing;
    }

    getData() {
        return this.data
    } 

    // Added to the DOM
    onMount() {
    }

    // Connected
    connectedCallback() { 
        console.log('On connected'); 

        this.attachShadow({ mode: 'open' });
        this.shadowRoot.appendChild(template.content.cloneNode(true));

      
        // TEST: Get custom element attribute set in HTML
        console.dir(this.getAttribute('maptype'));

        this.maptype = this.getAttribute('maptype');  
     }

     // Disconnected (delete from DOM)
    disconnectedCallback() { 
        console.log('On disconnected'); 
     }

    static get observedAttributes() {
        return ['maptype', 'data'];
    }

    attributeChangedCallback(name, oldValue, newValue) {

        console.log('')

        if (oldValue === newValue) return;

        if (name === 'maptype') {
            this.maptype = newValue;
            this.querySelector('[slot="typeDescription"]').textContent = this.getAttribute('maptype');
        }

        if (name === 'data') {
            this.data = newValue;
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

customElements.define('minimap-preview', Minimap);
