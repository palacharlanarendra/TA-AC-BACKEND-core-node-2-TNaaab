// let http = require('http');
// let path = require('path');
// let absolutePath = __dirname;
// let server = http.createServer(handleRequest);

// function handleRequest(req, res) {
//   console.log(__filename);
//   if (req.url === '/index.html') {
//     res.setHeader('Content-Type', 'text/plain');
//     let pathLink = path.join(absolutePath, '/index.html');
//     res.write(pathLink);
//     res.write(req.url);
//     res.end();
//   }
//   if (req.url === '/app.js') {
//     res.setHeader('Content-Type', 'text/plain');
//     res.end(absolutePath + req.url);
//   }
// }

// server.listen(3000, 'localhost', () => {
//   console.log('server is listening to the port 3k');
// });

let http = require('http');

let server = http.createServer(handleRequest);

function handleRequest(req, res) {
  let formatData = req.headers['content-type'];
  let store = '';
  req.on('data', (chunk) => {
    store += chunk;
  });
  req.on('end', () => {
    if (
      req.method === 'POST' &&
      req.url === '/' &&
      formatData === 'application/json'
    ) {
      res.writeHead(201, { 'Content-Type': 'application/json' });
      res.end(store);
    }
  });
}

server.listen(3000, 'localhost', () => {
  console.log('server is listening to the port 3k');
});
