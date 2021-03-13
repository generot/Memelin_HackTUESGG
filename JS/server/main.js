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

function add_trashcan(type_, marker){
    database.set("ID_counter", database.get("ID_counter") + 1);
    database.set(`Trashcan_${marker.id}`, {type: type_, latitude: marker.lat, longtitude: marker.lon});
}

setDirs(dirs);
server.use(express.json());
server.use(express.urlencoded({
    extended: true
}));

server.get("/", (req, res) => {
    for(let file in includeFiles)
        res.sendFile(file);
});

server.get("/get-markers", (req, res) => {
    res.send(database.all());
});

server.post("/post-navigate", (req, res) => {
    add_trashcan("Red", req.body);

    return res.redirect("/");
});

console.log(database.all());
server.listen("80");
