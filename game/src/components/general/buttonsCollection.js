'use strinct';
import Controls from "./../general/controls.js";

export default class ButtonsCollection extends Controls {



    constructor() {
        super();

        this.type = 'buttonsCollection';
        this.template = document.createElement('template');
        this.template.innerHTML = `
            <div data-render-block="controls">
                <div data-action="slot-1">
                    <span>⛺</span>
                </div>
                <div data-action="slot-2">
                    <span>🚩</span>
                </div>
            </div>
            <!--<div data-render-block="close_btn" target="parent">❌</div>-->
        `;
    }

    /* ~~~ */
    connectedCallback() {
        console.log('On connected');

        console.log("Icons:", Controls.getIcon('gun'));
        let superComponentTemplate = new Controls().template


        this.attachShadow({ mode: 'open' });
        this.shadowRoot.appendChild(this.template.content.cloneNode(true));
        this.shadowRoot.appendChild(superComponentTemplate.content.cloneNode(true));

        let elems = document.querySelectorAll('[data-action]')
        let controlsWrap = this.shadowRoot.querySelector('[data-render-block="controls"]')
        elems.forEach((uie, index) => {
            // super.setActionAdded(this, uie)
            controlsWrap.appendChild(uie);
        });

        this.type = (this.getAttribute('type') !== null) ? this.getAttribute('type') : this.type;

        const clsBtn = this.shadowRoot.querySelector('[data-render-block="close_btn"]')
        super.closePanel(clsBtn) // FIXME: will be in a 'close panel' comp. code

        this.setAction1()
        this.setAction2()
    }
    /* ~~~ */

    setAction1(root) {
        let element = this.shadowRoot.querySelector('[data-action="slot-1"]')

        element.addEventListener('click', (event) => {
            this.actionStatus[1] = true
            console.log('Action 1', this.actionStatus[1])
        })
    }

    setAction2(root) {
        let element = this.shadowRoot.querySelector('[data-action="slot-2"]')

        element.addEventListener('click', (event) => {
            this.actionStatus[2] = true
            console.log('Action 2', this.actionStatus[2])
        })
    }


}

customElements.define('buttons-collection', ButtonsCollection);