const http = require("http");

const server = http.createServer((req, res) => {
    res.writeHead("200");
    res.end("Hello, world!");
});

server.listen("80", "192.168.12.100");