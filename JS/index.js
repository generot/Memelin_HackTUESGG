/////GLOBALS/////
const key = "Fy5uZ608OtfEGkkPspzyTj8hNxWU43tk";

const latbox = document.getElementById("lat");
const longbox = document.getElementById("long");
const imgDiv = document.getElementById("imagery");
/////GLOBALS/////

function entry() {
    let lat = parseFloat(latbox.value),
        long = parseFloat(longbox.value);

    RenderMapStatic(
        imgDiv, 
        new Coord(lat, long), 
        key
    );
}
