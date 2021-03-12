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

function RenderMap(div, coords, specs, key) {
    //..//
}

function RenderMapStatic(div, coords, key) {
    let imgLn = ResolveLink(urls.map, coords.lon, coords.lat, key);
    
    let img = document.createElement("img");
    img.src = imgLn;

    div?.lastChild?.remove();
    div.appendChild(img);
}