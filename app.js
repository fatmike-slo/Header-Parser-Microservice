// write a microservice to get ip, language and operating system
const express = require("express");
const app = express();
const bodyParser = require("body-parser")
const useragent = require("express-useragent");
const cors = require("cors");

app.use(cors());
app.use(bodyParser.json());
app.use(useragent.express());
app.use(express.static(__dirname + "/"))

app.get("/", (req, res) => {
    res.sendfile("index.html");
});

app.get("/api/whoami", (req, res) => {
    let ip;
    if (req.headers['x-forwarded-for'] !== undefined) {
        let regex = /(\d{1,3}.\d{1,3}.\d{1,3}.\d{1,3})*/;
        let header = req.headers['x-forwarded-for'];
        let find = header.split(regex);
        ip = find[1];
    }
    else {
        ip = req.ip;
        console.log(ip);
    }
    let language = req.acceptsLanguages();
    let software = req.useragent.os + ", " + req.useragent.browser;

    res.json({
        ipaddress: ip,
        language: language[0],
        software: software
    });
});

app.listen(3000);
console.log('online, at port 3000');
