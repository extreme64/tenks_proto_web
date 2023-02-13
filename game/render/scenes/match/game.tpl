
    <nav></nav>
    <section data-render-block="map-matrix"></section>
    
    <hud data-render-block="hud-info">
        <status>
            <score>
                <player data-player="1">4</player>
                <player data-player="2">2</player>
            </score>
        </status>
    </hud>
    
    <ui data-render-block="hud-info">
    
    
        <panel-ui panelType="mapView">
    
            <span slot="topbar">
                Topbar.
            </span>
            <span slot="info">
                Panel info text here...
            </span>
    
            <minimap-ui slot="usefulSpace" maptype="tactical">
                <span slot="minimapControls">
    
                    <buttons-collection type="minimap-buttonsCollection">
    
                        <div data-action="slot-target">
                            <span>💢</span>
                        </div>
                        <div data-action="slot-chat">
                            <span>💬</span>
                        </div>
                        <div data-action="slot-ping">
                            <ping-ui></ping-ui>
                        </div>
    
                    </buttons-collection>
    
                </span>
                <span slot="typeDescription">Basic</span>
                <span slot="minimapTracing"></span>
            </minimap-ui>
    
        </panel-ui>
    
    
    </ui>
