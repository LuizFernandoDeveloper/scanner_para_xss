#  Scanner para detecção de vunerabilidade de xss
<img src="./img/cross-site-scripting-xss.jpg" alt="Cross site scripting">


## Licença vinculada ao repositório
[![NPM](https://github.com/LuizFernandoDeveloper/scanner_para_xss)](https://github.com/LuizFernandoDeveloper/scanner_para_xss/blob/main/LICENSE)

#
## O que você deve instalar no diretorio raiz ?
    1. npm init 
    2. npm install express
    3. npm install body-parser
    4. npm install query-string
    5. npm install puppeteer
## como utilizar ? 
    1. Digite na raiz da pasta npm start
    2. Digite no navegador "http://localhost:4000/" 
    3. Coloque apos /scanner?url= o site que deseja analizar como por exemplo :/scanner?url=http://testphp.vulnweb.com/listproducts.php?cat=1 
    4. exemplo :  http://localhost:4000/scanner?url=http://testphp.vulnweb.com/listproducts.php?cat=1
    5. retorno do scanner : verdadeiro para vulneravel e falso para não vuneravel