let http = require('http');
let qs = require('querystring');
let fs = require('fs');

let server = http.createServer(handleRequest);

function handleRequest(req, res) {
  let formatData = req.headers['content-type'];
  let store = '';
  req.on('data', (chunk) => {
    store += chunk;
  });
  req.on('end', () => {
    if (req.method === 'GET' && req.url === '/form') {
      res.setHeader('Content-Type', 'text/html');
      fs.createReadStream('./form.html').pipe(res);
    }
    if (req.method === 'POST' && req.url === '/form') {
      let parseData = qs.parse(store);
      res.setHeader('Content-Type', 'text/html');
      res.end(`<h1>${parseData.name}</h1>
      <h2>${parseData.email}</h2>
      <h2>${parseData.age}</h2>
      `);
    }
  });
}

server.listen(3000, 'localhost', () => {
  console.log('server is listening to the port 3k');
});
