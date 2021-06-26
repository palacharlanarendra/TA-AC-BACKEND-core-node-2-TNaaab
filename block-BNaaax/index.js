let http = require('http');
let path = require('path');

let server = http.createServer(handleRequest);


function handleRequest(req,res){
    console.log(__dirname);
    console.log(__filename);
    var formPath = path.join(__dirname,'server.js');
    console.log(formPath); 
    res.end(formPath);
}



server.listen(3000,'localhost',()=>{
    console.log('server is listening to the port 3k');
})