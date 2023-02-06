


export default class Controls extends HTMLElement {

    template
    static observedAttributes = ['type'];
    actionStatus = []
    addedActionStatus = []

    static _icons = new Map()
        .set('tent', '⛺')
        .set('money_bag', '💰')
        .set('gun', '🔫')
        .set('wrentch', '🔧')
        .set('cog', '⚙️')
        .set('radio_dish', '📡')
        .set('message', '💬')
        .set('focus', '💢')
        .set('megaphone', '📣')
        .set('circle_araound', '🔃')
        .set('left_arrow', '◀️')
        .set('right_arrow', '▶️')
        .set('plus', '➕')
        .set('minus', '➖')
        .set('close', '✖️')
        .set('question', '❓')
        .set('exclamation', '❗')
        .set('dollar', '💲')
        .set('recycle', '♻️')
        .set('check', '✔️')
        .set('close_big', '❌')
        .set('sos_sign', '🆘')
        .set('aim', '💠')
        .set('scull', '💀')
        .set('death', '☠️')
        .set('diploma', '🎓')

    static getIcon(iconKey) {
        return Controls._icons.get(iconKey)
    }

    constructor() {
        super();
 
        this.type = 'generic';
        this.template = document.createElement('template');
        this.template.innerHTML = `
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
        <div data-render-block="close_btn" target="parent">❌</div>`;
        // this.template.innerHTML = `
        //  <close-ui target="parent">❌</close-ui>
        // `;
    }

    /* ~~~ */
    // Added to the DOM
    onMount() {
    }

    connectedCallback() {
        console.log('On connected');

        this.attachShadow({ mode: 'open' });
        this.shadowRoot.appendChild(this.template.content.cloneNode(true));

        // let elems = document.querySelectorAll('[data-action]')
        // let controlsWrap = this.shadowRoot.querySelector('[data-render-block="controls"]')
        // elems.forEach((uie, index) => {
        //     this.setActionAdded(this, uie)
        //     controlsWrap.appendChild(uie);
        // });


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
            console.log(this.type)
        }
    }
    /* ~~ */

    /**
     *
     *
     * @param {*} btn
     * @memberof ButtonsCollection
     */
    // TODO: Make a 'close panel' comp.
    closePanel(btn) {
        btn.addEventListener('click', (event) => {
            console.log('Close panel. Target:', btn.getAttribute('target'))
        })
    }

    /**
     *
     *
     * @param {*} ref
     * @param {*} el
     * @memberof Controls
     */
    setActionAdded(ref, el) {
        const statusObj = { status: true }
        const attr = el.getAttribute("data-action")

        el.addEventListener('click', (e) => {
            this.addedActionStatus[attr] = statusObj
            console.log(`Action Added: ${attr}`, this.addedActionStatus[attr])
        })
    }

}

customElements.define('controls-ui', Controls);
