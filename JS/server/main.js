const express = require("express");

const database = require("quick.db");
const path = require("path");

const server = express();

const dirs = ['../../HTML', '../../CSS', '../../', '../../JS'];
const includeFiles = [
    "/CSS/index.css",
    "/CSS/map.css", 
    "/HTML/main.html",
    "/HTML/map.html", 
    "/index.html"
];

function setDirs(dirArr) {
    for(let dir of dirArr)
        server.use(express.static(path.join(__dirname, dir)));
}

setDirs(dirs);

server.use(express.urlencoded({
    extended: true
}));

server.use(express.json());

server.get("/", (req, res) => {
    for(let file in includeFiles)
        res.sendFile(file);
});

server.post("/post-navigate", (req, res) => {
    console.log(req.body);
    add_trashcan("Red", req.body);

    return res.redirect("/");
})

server.listen("80");

function add_trashcan(type_, marker){
    database.set("ID_counter", database.get("ID_counter") + 1);
    database.set(`Trashcan_${marker.id}`, {type: type_, latitude: marker.lat, longtitude: marker.lon});
}