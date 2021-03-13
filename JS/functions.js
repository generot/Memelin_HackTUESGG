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

function DrawExistingMarker(map, coords) {
    var marker = new tt.Marker({
        draggable: true
    })
    .setLngLat([coords.lon, coords.lat])
    .addTo(map);

    return marker;
}

function CreateMarker(map) {
    Locate((ignore, coord, ignore2) => {
        let marker = DrawExistingMarker(map, coord);

        let markerObj = {
            id: globalCount++,
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