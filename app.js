var http = require('http'),
     url = require('url'),
      qs = require('querystring');

var server = http.createServer(function(request, response) {
  var body = '';
  var contentType = request.headers['content-type'];
  var query = url.parse(request.url, true).query;

  var resJson = {
    request: {
      method: request.method,
      url: request.url,
      urlQuery: query,
      headers: request.headers
    }
  };

  request.on('data', function(chunk) {
    body += chunk.toString();
  });
  request.on('end', function() {
    var requestBody = {};

    if(body.length != 0)
      requestBody = (contentType && contentType.indexOf('application/json') > -1) ? JSON.parse(body) : qs.parse(body);

    resJson.request.body = requestBody;

    var returnStatusCode = requestBody.statusCode || query.statusCode || 200;

    var responseHeaders = {
      'Content-Type' : 'application/json',
      'X-Mirror-Hello' : 'hello'
    };

    response.writeHead(returnStatusCode, responseHeaders);


    resJson.response = {
      statusCode: returnStatusCode,
      headersSubset: responseHeaders
    };

    response.end(JSON.stringify(resJson, null, 2));
  });
});

var port = process.env.PORT || 8000;

server.listen(port);
console.log("Server now listening on port " + port);
