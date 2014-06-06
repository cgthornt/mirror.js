mirror.js
=========
A simple node.js application that responds with what you send it. Very useful for testing proxying applications.

## Examples

Basic usage:
```
$ curl -i localhost:8000

HTTP/1.1 200 OK
Content-Type: application/json
X-Mirror-Hello: hello
Date: Fri, 06 Jun 2014 18:30:00 GMT
Connection: keep-alive
Transfer-Encoding: chunked

{
  "request": {
    "method": "GET",
    "url": "/",
    "urlQuery": {},
    "headers": {
      "user-agent": "curl/7.30.0",
      "host": "localhost:8000",
      "accept": "*/*"
    },
    "body": {}
  },
  "response": {
    "statusCode": 200,
    "headersSubset": {
      "Content-Type": "application/json",
      "X-Mirror-Hello": "hello"
    }
  }
}
```

Change response header:
```
curl -i localhost:8000/?statusCode=202

HTTP/1.1 202 Accepted
Content-Type: application/json
X-Mirror-Hello: hello
Date: Fri, 06 Jun 2014 18:30:38 GMT
Connection: keep-alive
Transfer-Encoding: chunked

{
  "request": {
    "method": "GET",
    "url": "/?statusCode=202",
    "urlQuery": {
      "statusCode": "202"
    },
    "headers": {
      "user-agent": "curl/7.30.0",
      "host": "localhost:8000",
      "accept": "*/*"
    },
    "body": {}
  },
  "response": {
    "statusCode": "202",
    "headersSubset": {
      "Content-Type": "application/json",
      "X-Mirror-Hello": "hello"
    }
  }
}
```

Using POST

```
$ curl -i -X POST -H 'Content-Type: application/json' -d '{"hello":"world"}' localhost:8000

HTTP/1.1 200 OK
Content-Type: application/json
X-Mirror-Hello: hello
Date: Fri, 06 Jun 2014 18:31:46 GMT
Connection: keep-alive
Transfer-Encoding: chunked

{
  "request": {
    "method": "POST",
    "url": "/",
    "urlQuery": {},
    "headers": {
      "user-agent": "curl/7.30.0",
      "host": "localhost:8000",
      "accept": "*/*",
      "content-type": "application/json",
      "content-length": "17"
    },
    "body": {
      "hello": "world"
    }
  },
  "response": {
    "statusCode": 200,
    "headersSubset": {
      "Content-Type": "application/json",
      "X-Mirror-Hello": "hello"
    }
  }
}
```
