var http = require('http');
var url  = require('url');
var path = require('path');
var fs   = require('fs');

console.log('This is Node.JS server launched for demo purposes. DO NOT USE IN PRODUCTION ENVIRONMENT.');

http.createServer(function(request, response) {
	var uri = url.parse(request.url).pathname;

	//handle most common URLs
	if (uri == "/" || uri == "/index.html") {
	    uri = "/demo/demo.html";
	}

	var filename = path.join(process.cwd(), uri);

	fs.readFile(filename, 'binary', function(err, file) {
		if (err) {
			response.writeHead(500, { 'Content-Type': 'text/plain' });
			response.write(err + '\n');
			response.end();
			return;
		}

		response.writeHead(200, filename.match(/\.js$/) ? { 'Content-Type': 'text/html' } : {});
		response.write(file, 'utf-8');
		response.end();
	});
}).listen(8124, '0.0.0.0');

console.log('Demo page at http://0.0.0.0:8124/index.html');
