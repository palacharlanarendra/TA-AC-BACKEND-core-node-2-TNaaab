let http = require('http');
let fs = require('fs');

var server = http.createServer(handleRequest);

function handleRequest(req,res){
    res.setHeader('Content-Type','text/html');
    fs.createReadStream('./readme.txt').pipe(res);
}

server.listen(3000,()=>{
    console.log("server is listening to the port 3k");
})