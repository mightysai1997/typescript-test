/*
Type Of Vulnerability : Path Traversal
CWE : CWE-23
Description : The provided code contains unsanitized input from the request URL that flows into the readFile function, where it is used as a path. This may result in a Path Traversal vulnerability, allowing an attacker to read arbitrary files.
*/

import * as fs from 'fs';
import * as http from 'http';
import * as url from 'url';

const server = http.createServer((req: http.IncomingMessage, res: http.ServerResponse) => {
  const query = url.parse(req.url!, true).query as { path?: string }; //Source

  if (query.path) {
    try {
      // Use fs.promises.readFile to read files asynchronously
      fs.promises.readFile(query.path, (err, data) => {   //Sink
        if (err) {
          res.writeHead(404, { 'Content-Type': 'text/plain' });
          res.end('File not found');
        } else {
          res.writeHead(200, { 'Content-Type': 'text/plain' });
          res.end(data);
        }
      });
    } catch (error) {
      res.writeHead(500, { 'Content-Type': 'text/plain' });
      res.end('Internal Server Error');
    }
  } else {
    res.writeHead(400, { 'Content-Type': 'text/plain' });
    res.end('Missing path parameter');
  }
});

server.listen(8080, () => {
  console.log('Server is listening on port 8080');
});
