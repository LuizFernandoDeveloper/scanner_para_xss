const express = require("express");
const bodyParser = require("body-parser")
const queryString = require("query-string")
const puppeterr = require("puppeteer")
const http = require("http")

const app =  express();
const server = http.createServer(app);

app.get("/", (req, res) => {
    res.send("Funcionando")
})

server.listen(process.env.PORT || 4000, () => {
    console.log("Server iniciado")
})
    