/////GLOBALS/////
const key = "Fy5uZ608OtfEGkkPspzyTj8hNxWU43tk";

const latbox = document.getElementById("lat");
const longbox = document.getElementById("long");
const imgDiv = document.getElementById("imagery");
/////GLOBALS/////

const urls = {
    map: "https://api.tomtom.com/map/1/staticimage?layer=basic&style=main&center=(>0)%2C%20(>1)&width=512&height=512&view=Unified&key=(>2)",
    scalableMap: "https://api.tomtom.com/map/1/tile/basic/main/(>0)/(>1)/(>2).pbf?view=Unified&key=(>3)"
};

const Coord = function(lat, lon) {
    this.lon = lon;
    this.lat = lat;
};