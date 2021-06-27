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
    if (req.method === 'GET') {
      let parsedUrl = qs.parse(req.url);
      fs.readFile(
        `./users/${parsedUrl['/users?username']}.json`,
        (err, content) => {
          if (err) {
            console.log(err);
          }
          let strData = JSON.parse(content);
          // res.setHeader('Content-Type', 'text/html');
          console.log(strData['name']);
          res.end(`<h2>${strData['name']}</h2>`);
        }
      );
    }

    if (req.method === 'DELETE') {
      let parsedUrl = qs.parse(req.url);
      fs.unlink(`./users/${parsedUrl['/users?username']}.json`, (err) => {
        if (err) console.log(err);
        else {
          console.log(`\nDeleted file: ${parsedUrl['/users?username']}.json`);
        }
      });
    }
    if (req.method === 'POST' && req.url === '/users') {
      res.writeHead(201, { 'Content-Type': 'text/html' });
      let parseData = JSON.parse(store);
      console.log(parseData['username']);
      if (fs.existsSync(`./users/${parseData['username']}.json`)) {
        res.end(
          'user existed! , With the same name , Try again with unique name'
        );
      }
      fs.open(`./users/${parseData['username']}.json`, 'wx', function (err, f) {
        if (err) {
          return console.error(err);
        }
        console.log(f);
        console.log('File opened!!');
      });
      fs.writeFile(
        `./users/${parseData['username']}.json`,
        JSON.stringify(parseData),
        function (err, data) {
          if (err) {
            return console.log(err);
          }
          console.log(data);
        }
      );
      file_descriptor = fs.openSync(`./users/${parseData['username']}.json`);
      fs.close(file_descriptor, () => {});
    }
    if (req.method === 'PUT') {
      res.writeHead(201, { 'Content-Type': 'text/html' });
      let parseData = JSON.parse(store);
      console.log(parseData['username']);

      fs.open(`./users/${parseData['username']}.json`, 'r+', function (err, f) {
        if (err) {
          return console.error(err);
        }
        console.log(f);
        console.log('File opened!!');
      });
      const fd = fs.openSync(`./users/${parseData['username']}.json`, 'r+');

      fs.ftruncate(fd, 24, (err) => {
        if (err) console.log(err);
        else {
          console.log('Contents of file after truncate:');
          console.log(
            fs.readFileSync(`./users/${parseData['username']}.json`, 'utf8')
          );
        }
      });

      fs.writeFile(
        `./users/${parseData['username']}.json`,
        JSON.stringify(parseData),
        function (err, data) {
          if (err) {
            return console.log(err);
          }
          console.log(data);
        }
      );
      file_descriptor = fs.openSync(`./users/${parseData['username']}.json`);
      fs.close(file_descriptor, () => {});
    }
    res.end();
  });
}

server.listen(3000, 'localhost', () => {
  console.log('server is listening to the port 3k');
});
