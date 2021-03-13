function entry() {
    let lat = parseFloat(latbox.value),
        long = parseFloat(longbox.value);

    RenderMapStatic(
        imgDiv, 
        new Coord(lat, long), 
        key
    );
}
