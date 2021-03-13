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

function DrawMarker(map) {
    document.getElementById("dropdown_background").style.display = "inline";

    Locate((ignore, coord, ignore2) => {
        var marker = new tt.Marker({
            draggable: true
        })
        .setLngLat([coord.lon, coord.lat])
        .addTo(map);

        marker.on("dragend", () => {
            let crds = marker.getLngLat();
            SendData({
                lng: crds.lng,
                lat: crds.lat
            });
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