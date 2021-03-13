const express = require("express");

const database = require("quick.db");
const path = require("path");

const server = express();

const dirs = ['../../HTML', '../../CSS', '../../', '../../JS', '../../images'];
const images = [
    "/CSS/trash_cans/chervena_kofa.png",
    "/CSS/trash_cans/julta_kofa.png",
    "/CSS/trash_cans/sinq_kofa.png",
    "/CSS/trash_cans/siva_kofa.png",
    "/CSS/trash_cans/zelena_kofa.png",
    "/images/Mitaka.png",
    "/images/nakovich.png",
    "/images/tejkar.png",
    "/images/venkoto.png",
]

const includeFiles = [
    "/CSS/index.css",
    "/CSS/map.css", 
    "/HTML/main.html",
    "/HTML/map.html", 
    "/HTML/aboutUs.html",
    "/index.html",
    ...images
];

function setDirs(dirArr) {
    for(let dir of dirArr)
        server.use(express.static(path.join(__dirname, dir)));
}

function UploadFiles(response, dirs) {
    for(let file of dirs)
        response.sendFile(file);
}

function add_trashcan(marker){
    database.set("ID_counter", database.get("ID_counter") + 1);
    database.set(`Trashcan_${marker.id}`, {type: marker.type, latitude: marker.lat, longtitude: marker.lon});
}

setDirs(dirs);
server.use(express.json());
server.use(express.urlencoded({
    extended: true
}));

server.get("/", (req, res) => {
    UploadFiles(res, includeFiles);
});

server.get("/get-markers", (req, res) => {
    res.send(database.all());
});

server.post("/post-navigate", (req, res) => {
    add_trashcan(req.body);

    return res.redirect("/");
});

//console.log(database.all());
server.listen("80");
