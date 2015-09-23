var https = require('https');
var fs = require('fs');

var options = {
    key: fs.readFileSync('key.pem'),
    cert: fs.readFileSync('cert.pem')
};

https.createServer(options, function (req, res) {
    console.log('request starting...');

    fs.readFile('./index.html', function(error, content) {
        if (error) {
            res.writeHead(500);
            res.end("404 Page Not Found");
        }
        else {
            res.writeHead(200, { 'Content-Type': 'text/html' });
            res.end(content, 'utf-8');
        }
    });
}).listen(8000);
var http;
http = require('http');
http.createServer(function (req, res) {
    fs.readFile('./index.html', function(error, content) {
        if (error) {
            res.writeHead(500);
            res.end("404 Page Not Found");
        }
        else {
            res.writeHead(200, { 'Content-Type': 'text/html' });
            res.end(content, 'utf-8');
        }
    });
}).listen(8888);