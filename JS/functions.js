function ResolveLink(link, ...args) {
    for(let i = 0; i < args.length; i++)
        link = link.replace(`(>${i})`, args[i]);

    return link;
}

function Locate(clb, key = "") {
    navigator.geolocation.getCurrentPosition((pos) => {
        let newCoord = new Coord(
            pos.coords.latitude, 
            pos.coords.longitude
        );

        clb(imgDiv, newCoord, key);
    });
}

function Navigate(key) {
    Locate((div, crd, key) => {
        RenderMapStatic(div, crd, key);
    }, key);
}

function InitGlobalMap(map) {
    globalMap = map;
}

function DrawExistingMarker(map, coords, type) {
    var iconElement = document.createElement('div');
    iconElement.className = 'marker-icon';

    switch(type){
        case "Plastic/Metal":
            iconElement.style.backgroundImage = "url('../CSS/trash_cans/julta_kofa.png')";
            //iconElement.style.backgroundImage = "url('/images/julta_kofa.png')";
            break;
        case "Paper":
            iconElement.style.backgroundImage = "url('../CSS/trash_cans/sinq_kofa.png')";
            //iconElement.style.backgroundImage = "url('/images/sinq_kofa.png')";
            break;
        case "Glass":
            iconElement.style.backgroundImage = "url('../CSS/trash_cans/zelena_kofa.png')";
            //iconElement.style.backgroundImage = "url('/images/zelena_kofa.png')";
            break;
        case "Basic":
            iconElement.style.backgroundImage = "url('../CSS/trash_cans/siva_kofa.png')";
            //iconElement.style.backgroundImage = "url('/images/siva_kofa.png')";
            break;    
    }

    
    var marker = new tt.Marker({
        draggable: true,
        element: iconElement
    })
    .setLngLat([coords.lon, coords.lat])
    .addTo(map);

    return marker;
}

function CloseMenu(){
    document.getElementById("dropdown_background").style.display = "none";
}

function OpenMenu() {
    document.getElementById("dropdown_background").style.display = "inline";
}

function GetType() {
    document.getElementById("dropdown_background").style.display = "none";
    return document.getElementById("input").value;
}

function CreateMarker(map) {
    Locate((ignore, coord, ignore2) => {
        var type_ = GetType();
        let marker = DrawExistingMarker(map, coord, type_);

        let markerObj = {
            id: globalCount++,
            type: type_,
            lon: coord.lon,
            lat: coord.lat 
        };

        allMarkers.push(markerObj);

        marker.on("dragend", () => {
            let crds = marker.getLngLat();
            let objIx = allMarkers.indexOf(markerObj);

            allMarkers[objIx].lon = crds.lng;
            allMarkers[objIx].lat = crds.lat;
        });
    });
}

function CreateDynamicMap(crds = [30, 30]) {
    var map = tt.map({
        key: 'Wb96nvDR9AEwTcbFv4EZiHnlBgt3495Y',
        container: 'map',
        center: Array.from(crds),
        zoom : 15,
        maxZoom : 20,
        minZoom : 13 
    });

    map.addControl(new tt.FullscreenControl());
    map.addControl(new tt.NavigationControl());

    return map;
}

function RenderMapDynamic(map, x, y) {
    map.jumpTo({
        center: [x, y]
    }, {});

    return map;
}

function RenderMapStatic(div, coords, key) {
    let imgLn = ResolveLink(urls.map, coords.lon, coords.lat, key);
    
    let img = document.createElement("img");
    img.src = imgLn;

    div?.lastChild?.remove();
    div.appendChild(img);
}

function getLocation(clb, tr, map){
    if(tr == 1) {
        window.location.reload();
    } else {
        navigator.geolocation.getCurrentPosition((pos) => (
            clb(pos.coords.longitude, pos.coords.latitude, map)
        ));
    }
}