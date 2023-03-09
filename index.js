import http from 'http';
import fetch from 'node-fetch';
import chalk from 'chalk';
process.env.NODE_TLS_REJECT_UNAUTHORIZED='0'
const hostname = '127.0.0.1';
const port = 3000;
const server = http.createServer((req, res) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    res.end('Hello World');
});
server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
    geraUsuarios(10)
});
function geraUsuarios(n) {
    let url = `https://randomuser.me/api/?results=${n}`;
    let options ={method:'GET',headers:{'Content-Type':'application/json'}};
    fetch(url, options)
        .then(res => res.json())
        .then(json => {
            for(let i=0;i<n;i++){
            console.log(chalk.green(json.results[i].name.first+' '+json.results[i].name.last))
            }
        })
        .catch(err => console.error('error:' + err));
}