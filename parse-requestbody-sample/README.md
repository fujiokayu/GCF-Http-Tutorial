# [parse-requestbody-sample](https://cloud.google.com/functions/docs/writing/http?hl=ja)

## Gist
### Parse the request body like "req.body.~~"
```
exports.helloWorld = (req, res) => {
  if (req.body.message === undefined) {
    // This is an error case, as "message" is required
    res.status(400).send('No message defined!');
  } else {
    // Everything is ok
    console.log(req.body.message);
    res.status(200).end();
  }
};
```
```
curl -X POST -H "Content-Type:application/json"  -d '{"message":"hello world!"}' YOUR_HTTP_TRIGGER_ENDPOINT
```
### The body of the request is automatically parsed based on the content-type header.
- application/json	'{"name":"John"}'
    - request.body.name == "John"
- application/octet-stream	'John'
    - request.body.toString() == "John"
- text/plain	'John'
    - request.body == "John"
- application/x-www-form-urlencoded	'name=John'
    - request.body.name == "John"

- [bodyParser.json](https://www.npmjs.com/package/body-parser#bodyparserjsonoptions)
- [bodyParser.raw](https://www.npmjs.com/package/body-parser#bodyparserrawoptions)
- [bodyParser.text](https://www.npmjs.com/package/body-parser#bodyparsertextoptions)
- [bodyParser.urlencoded](https://www.npmjs.com/package/body-parser#bodyparserurlencodedoptions)

```
curl -X POST -H "Content-Type:application/json"  -d '{"name":"John"}' YOUR_HTTP_TRIGGER_ENDPOINT
```

### Authentication and CORS
1. Add the Authorization header to Access-Control-Allow-Headers.
1. Set the Access-Control-Allow-Credentials header to true.
1. Set a specific origin in Access-Control-Allow-Origin (wildcards are not accepted).
```
/**
 * HTTP function that supports CORS requests with credentials.
 *
 * @param {Object} req Cloud Function request context.
 * @param {Object} res Cloud Function response context.
 */
exports.corsEnabledFunctionAuth = (req, res) => {
  // Set CORS headers for preflight requests
  // Allows GETs from origin https://mydomain.com with Authorization header

  res.set('Access-Control-Allow-Origin', 'https://mydomain.com');
  res.set('Access-Control-Allow-Credentials', 'true');

  if (req.method === 'OPTIONS') {
    // Send response to OPTIONS requests
    res.set('Access-Control-Allow-Methods', 'GET');
    res.set('Access-Control-Allow-Headers', 'Authorization');
    res.set('Access-Control-Max-Age', '3600');
    res.status(204).send('');
  } else {
    res.send('Hello World!');
  }
};
```

### Handling HTTP methods
```
function handleGET(req, res) {
  // Do something with the GET request
  res.status(200).send('Hello World!');
}

function handlePUT(req, res) {
  // Do something with the PUT request
  res.status(403).send('Forbidden!');
}

/**
 * Responds to a GET request with "Hello World!". Forbids a PUT request.
 *
 * @example
 * gcloud functions call helloHttp
 *
 * @param {Object} req Cloud Function request context.
 * @param {Object} res Cloud Function response context.
 */
exports.helloHttp = (req, res) => {
  switch (req.method) {
    case 'GET':
      handleGET(req, res);
      break;
    case 'PUT':
      handlePUT(req, res);
      break;
    default:
      res.status(405).send({error: 'Something blew up!'});
      break;
  }
};
```