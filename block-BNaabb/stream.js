let http = require('http');

let server = http.createServer(handleRequest);

function handleRequest(req, res) {
  if (req.method === 'POST' && req.url === '/') {
    var store = '';
    req.on('data', (chunk) => {
      store = store + chunk;
    });

    req.on('end', () => {
      //   res.setHeader('Content-Type', 'text/plain');
      res.write(store);
      console.log(store);
      res.end();
    });
  }
}

server.listen(3456, 'localhost', () => {
  console.log('server is listening to the port 3456');
});
