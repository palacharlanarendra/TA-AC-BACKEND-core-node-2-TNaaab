let http = require('http');
let qs = require('querystring');
let fs = require('fs');

let server = http.createServer(handleRequest);

function handleRequest(req, res) {
  let formatData = req.headers['content-type'];
  let store = '';

  req.on('end', () => {
    if (req.method === 'GET' && req.url === '/form') {
      //   let parseData = qs.parse(store);
      fs.createReadStream('./form.html').pipe(res);
      console.log(req.query);
      console.log(store);
      res.end(`ended`);
    }
  });
}

server.listen(3000, 'localhost', () => {
  console.log('server is listening to the port 3k');
});
