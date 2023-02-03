'use strinct';
import Controls from "./../general/controls.js";

export default class PingMapUI extends Controls {

    status = new Map()
    componentElement
    icon
    static pingCount = 0
    static pingElements = []

    origin
    target

    duration = 2
    volume = 80
    style = 1
    color = "#aa33aa"
    inlineStyle

    static universalStatus = new Map() 

    constructor(
        duration,
        volume,
        style,
        color
    ) {
        super();


        //TODO: inject CSS, dynamically on init. 'inimap-ui::part', into --origin-- element
        // This way, no need to couple comp. CSS into maon CSS file
        this.icon = Controls.getIcon('exclamation')
        this.duration = duration
        this.volume = volume
        this.style = style
        this.color = color

        this.origin = document.querySelector('minimap-ui'); // get from map setup [maps minimap element]

        this.type = 'pingMap';
        this.template = document.createElement('template');
        this.originStyleAddition = `
        [part = "ping-wrap-part"] {
            position: absolute;
            top: -17px;
            left: -17px;
            display: flex;
            width: 34px;
            height: 34px;
            align-items: center;
            justify-content: center;
        }

        [part = "ping-part"] {
            position: relative;
            display: flex;
            width: 5px;
            height: 5px;
            border-radius: 50%;

            animation: pingAnim 2.2s ease-in-out 3;
        }

        @keyframes pingAnim {
            0% {
                background: #fff;
                border: 0px solid #222;
            }
            20% {
                background: #fff;
                border: 15px solid #fff;
            }
            60% {
                background: #aaa;
                border: 0px solid #222;
            }
            80% {
                background: #fff;
                border: 10px solid #fff;
            }
            100% {
                background: #fff;
                border: 0px solid #222;
            }
        }
        `

        // this.template.innerHTML = this.inlineStyle`
        this.template.innerHTML += `<span>${this.icon}</span>`;
    }

    /* ~~~ */
    connectedCallback() {
        console.log('On connected');

        // let superComponentTemplate = new Controls().template

        this.attachShadow({ mode: 'open' });
        this.componentElement = this.shadowRoot.appendChild(this.template.content.cloneNode(true));
        
        this.type = (this.getAttribute('type') !== null) ? this.getAttribute('type') : this.type;
    
        // Handle on btn event
        this.addEventListener('click', (event) => {
            this.initialisePing(event)
        })

        this.origin.addEventListener('minimapClicked', (event) => {
            this.executePing(event)
        })

    }
    /* ~~~ */

    initialisePing(event) {
        if (this.status.get('active')) return

        /* Set cursor: cross */
        this.origin.style.cursor = 'url("./../ui/cursors/aqx2w-topno.svg") 18.4 4.5, auto'
        
        /* Set action ACTIVE */
        this.status.set('active', true)
    }

    executePing(event){
        if (!this.status.get('active')) return

        this.origin.style.cursor = 'auto'

        // Action done. Set action NOT ACTIVE.
        this.status.set('active', false)

        let left = event.detail.point.x + 148-34 + "px"
        let top = event.detail.point.y-34 + "px"
        PingMapUI.pingElements[PingMapUI.pingCount] = this.createPingElement(left, top)

        let minimapWhiteboard = event.detail.map.shadowRoot.querySelector('[part="whiteboard"]') 
        minimapWhiteboard.appendChild(PingMapUI.pingElements[PingMapUI.pingCount])
        if (PingMapUI.pingCount > 0) {
            this.autoDeletePingElement(7, PingMapUI.pingCount)
        }
        
        PingMapUI.universalStatus.set('styleAdded', true)
        PingMapUI.pingCount++
    }

    createPingElement(x, y) {
        let elem = document.createElement('div')
        let pingStyle = document.createElement('style')
        let pingElement = document.createElement('div')

        elem.setAttribute("style", "left: " + x + " !important; top: " + y + " !important;")
        elem.setAttribute("part", "ping-wrap-part")
        elem.classList.add('ping-container')

        if (!PingMapUI.universalStatus.get('styleAdded')) {
            pingStyle.innerHTML = this.originStyleAddition
            elem.appendChild(pingStyle)
        }

        pingElement.classList.add('ping')
        pingElement.setAttribute("part", "ping-part");
        elem.appendChild(pingElement)
        return elem
    }

    autoDeletePingElement(time, index){
        setTimeout(() => {
            PingMapUI.pingElements[index].remove()
            PingMapUI.pingCount--
        }, time*1000);
    }

}

customElements.define('ping-ui', PingMapUI);