var lt;
var ltd;

function ResolveLink(link, ...args) {
    for(let i = 0; i < args.length; i++)
        link = link.replace(`(>${i})`, args[i]);

    return link;
}

function Navigate(div, key) {
    navigator.geolocation.getCurrentPosition((pos) => {
        let newCoord = new Coord(
            pos.coords.latitude, 
            pos.coords.longitude
        );

        RenderMapStatic(div, newCoord, key);
    });
}

function RenderMapDynamic(x, y) {
    var map = tt.map({
        key: 'Wb96nvDR9AEwTcbFv4EZiHnlBgt3495Y',
        container: 'map',
        center: [x, y],
        zoom : 15,
        maxZoom : 20,
        minZoom : 13 
    });
    map.addControl(new tt.FullscreenControl());
    map.addControl(new tt.NavigationControl())
}

function RenderMapStatic(div, coords, key) {
    let imgLn = ResolveLink(urls.map, coords.lon, coords.lat, key);
    
    let img = document.createElement("img");
    img.src = imgLn;

    div?.lastChild?.remove();
    div.appendChild(img);
}

function getPosition(long, lat){
    lt=lat
    ltd=long
    RenderMapDynamic(ltd, lt)
}

function getLocation(clb){
    navigator.geolocation.getCurrentPosition((pos) => (
        clb(pos.coords.longitude, pos.coords.latitude)
    ));
}

getLocation(getPosition)
