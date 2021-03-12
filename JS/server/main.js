const express = require("express");
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

server.get("/", (req, res) => {
    for(let file in includeFiles)
        res.sendFile(file);
});

server.listen("80");
