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

app.get("/scanner", async (req, res) => {
    let url = req.query.url; 
    //res.send("Analisando URl" + url)  
    console.log("Iniciando análise da url" + url)
    let  passuixss = await validaXss(url)
})

server.listen(process.env.PORT || 4000, () => {
    console.log("Server iniciado")
})

const MALICIOUS_SCRIPT = [

    '<script>alert("xss")</script>',
    '<image src=1 href=1 onerror="javascript:alert(1)"></image>',
    "')%3Balert(1)%3Bvar b=('",
    '<iframe onReadyStateChange iframe onReadyStateChange="javascript:javascript:alert(1)"></iframe onReadyStateChange>',
    '<html onMouseOut html onMouseOut="javascript:javascript:alert(1)"></html onMouseOut>',
    '<img src="http://inexist.ent" onerror="javascript:alert(1)"/>',

];

async function validaXss(url){

    const browser = await puppeterr.launch({
        headless: false,
        defaultViewport: null,
        args:['--start-maximized']

    })
    const page = await browser.newPage();
    await page.goto(url, {waitUntil: "networkidle2"})
    const formsArray = await page.$$('form');
    const page2 = await browser.newPage();
    let estaVulneravel = false;
    page2.on('dialog', async (dialog) => {
        estaVulneravel = True;
        dialog.accept();

    })
}
    