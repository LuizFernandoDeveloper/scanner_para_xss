const express = require("express");
const bodyParser = require("body-parser")
const queryString = require("query-string")
const puppeterr = require("puppeteer")
const http = require("http")

const app =  express();

app.get("/", (req, res) => {
    res.send("Funcionando")
})