// Q. Suppose we have 3 files inside a directory on desktop
// The structure is
//   - node(folder)
//     - app.js
//     - server.js
//     - index.html
// You are currently inside server.js

// Write code to
// - capture absolute path of `server.js`(itself)
// - get absolute path of `app.js`
// - get realtive path of `index.html`
// - get absolute path of `index.html` using `path module`

let http = require('http');
let path = require('path');
let absolutePath = __dirname;
let server = http.createServer(handleRequest);

function handleRequest(req, res) {
  console.log(__filename);
  if (req.url === '/index.html') {
    res.setHeader('Content-Type', 'text/plain');
    let pathLink = path.join(absolutePath, '/index.html');
    res.write(pathLink);
    res.write(req.url);
    res.end();
  }
  if (req.url === '/app.js') {
    res.setHeader('Content-Type', 'text/plain');
    res.end(absolutePath + req.url);
  }
}

server.listen(3000, 'localhost', () => {
  console.log('server is listening to the port 3k');
});

// Q. Create a server using http
// - handle post method on '/' route
// - send json data on it from postman
// {
//   team: 'kxip',
//   players: 18,
//   captain: 'KL Rahul'
// }
// ```
// - capture data from request on server side using data and end event on request object
// - when end event fires, send entire captured data in response with status code 201.

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

// Q. Follow above steps with form data from postman instead of json data.
// - once data has been captured, send only captain's name in response.

let http = require('http');
let qs = require('querystring');

let server = http.createServer(handleRequest);

function handleRequest(req, res) {
  let formatData = req.headers['content-type'];
  let store = '';
  req.on('data', (chunk) => {
    store += chunk;
  });
  req.on('end', () => {
    res.writeHead(201, { 'Content-Type': 'application/json' });
    res.end(store);
  });
}

server.listen(3000, 'localhost', () => {
  console.log('server is listening to the port 3k');
});

// Q. Create server which can handle both json/form data without specifying which format of data is being received.
// - add listener on port 9000
// - use `data/end` event to capture json/form data
// - use `req.headers['Content-Type']` to check data format
// - parse respective data format i.e. json/form
// - send entire data in response
// - data sent from postman should have fields:
//   - city
//   - state
//   - country
//   - pin
let http = require('http');
let qs = require('querystring');

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
      formatData === 'application/x-www-form-urlencoded'
    ) {
      res.writeHead(201, { 'Content-Type': 'text' / 'x-www-form-urlencoded' });
      let parseData = qs.parse(store);
      res.end(JSON.stringify(parseData));
    }
  });
}

server.listen(3000, 'localhost', () => {
  console.log('server is listening to the port 3k');
});

// Q. create server, send json data in request from postman, parse in on the server and send html response with entire parsed data information.
// - format of json data is {name: your name, email: "", }
// - Html response format is <h1>Name</h1><h2>email</h2>

let http = require('http');
let qs = require('querystring');

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

    if (
      req.method === 'POST' &&
      req.url === '/' &&
      formatData === 'application/x-www-form-urlencoded'
    ) {
      res.writeHead(201, { 'Content-Type': 'text' / 'x-www-form-urlencoded' });
      let parseData = qs.parse(store);
      res.end(JSON.stringify(parseData));
    }
  });
}

server.listen(3000, 'localhost', () => {
  console.log('server is listening to the port 3k');
});

// Q. create server, send json data in request from postman, parse in on the server and send html response with entire parsed data information.
// - format of json data is {name: your name, email: "", }
// - Html response format is <h1>Name</h1><h2>email</h2>

let http = require('http');
let qs = require('querystring');

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
      res.writeHead(201, { 'Content-Type': 'text/html' });
      let parseData = JSON.parse(store);
      console.log(parseData['team']);
      res.end(`<h1>${parseData.name}</h1><h2>${parseData.email}</h2>`);
    }
  });
}

server.listen(3000, 'localhost', () => {
  console.log('server is listening to the port 3k');
});

// Q. Follow above question with form data containing fields i.e name and email.
// - Parse form-data using `querystring` module
// - respond with HTML page containing only email from data in H2 tag.

let http = require('http');
let qs = require('querystring');

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
      formatData === 'application/x-www-form-urlencoded'
    ) {
      res.writeHead(201, { 'Content-Type': 'text' / 'x-www-form-urlencoded' });
      let parseData = qs.parse(store);
      console.log(typeof parseData);
      res.end(`<h2>${parseData.email}</h2>`);
    }
  });
}

server.listen(3000, 'localhost', () => {
  console.log('server is listening to the port 3k');
});
