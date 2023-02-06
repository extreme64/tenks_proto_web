'use strinct';
import PanelElement from "./../general/panel.js";

class Minimap extends PanelElement {

    template

    clicked = new CustomEvent('minimapClicked', {
        detail: {
            point: {
                x: null,
                y: null
            },
            map: null
        }
    });

    static observedAttributes = ['maptype', 'data'];

    constructor() {
        super();

        // Custom element's property
        this.maptype = 'basic'
        this.data = []
        this.template = document.createElement('template');
        this.template.innerHTML = `
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
                    position: relative;
                    z-index: 10
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
                .minimap__whiteboard {
                    display: flex;
                    width: 100%;
                    height: 96px;
                    position: relative;
                    z-index: 11;
                    top: -96px;
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
                <div part="whiteboard" class="minimap__whiteboard"></div>
            </div>
        `;
    }

    /* ~~~ */
    // Added to the DOM
    onMount() {
    }

    // Connected
    connectedCallback() {
        console.log('On connected');

        this.attachShadow({ mode: 'open' });
        this.shadowRoot.appendChild(this.template.content.cloneNode(true));

        // TEST: Get custom element attribute set in HTML
        console.dir(this.getAttribute('maptype'));

        this.maptype = this.getAttribute('maptype');

        // TODO: Test and remove offsets. "this.shadowRoot.addEventListener"
        this.addEventListener('mousedown', (e) => {

            // Get the bounding rectangle of target
            const rect = e.target.getBoundingClientRect();

            // Mouse position
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            this.dispatchEvent(
                new CustomEvent('minimapClicked', {
                    detail: {
                        point: { x, y },
                        map: this,
                    },
                })
            );
        })
    }

    // Disconnected (delete from DOM)
    disconnectedCallback() {
        console.log('On disconnected');
    }

    static get observedAttributes() {
        return ['maptype', 'data'];
    }

    attributeChangedCallback(name, oldValue, newValue) {

        if (oldValue === newValue) return;

        if (name === 'maptype') {
            this.maptype = newValue;
            this.querySelector('[slot="typeDescription"]').textContent = this.getAttribute('maptype');
        }

        if (name === 'data') {
            this.data = newValue;
        }
    }
    /* ~~~ */

    /**
     * @param {any[]} mapData
     */
    setData(mapData) {

        this.data = mapData

        let minimapmapDataTracing = []

        this.data.map((item, index) => {

            let color
            switch (item.typeId) {
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

}

customElements.define('minimap-ui', Minimap);
