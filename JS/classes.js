const urls = {
    map: "https://api.tomtom.com/map/1/staticimage?layer=basic&style=main&center=(>0)%2C%20(>1)&width=512&height=512&view=Unified&key=(>2)"
};

const Coord = function(lat, lon) {
    this.lon = lon;
    this.lat = lat;
};