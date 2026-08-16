const test = require('node:test');
const assert = require('node:assert');
const http = require('http');

test('application returns Hello from DevOps', async () => {
  const server = http.createServer((req, res) => {
    res.end("Hello from DevOps 🚀");
  });

  await new Promise(resolve => server.listen(0, resolve));

  const port = server.address().port;

  const response = await new Promise((resolve, reject) => {
    http.get(`http://localhost:${port}`, res => {
      let data = '';

      res.on('data', chunk => data += chunk);
      res.on('end', () => resolve({
        statusCode: res.statusCode,
        body: data
      }));
    }).on('error', reject);
  });

  server.close();

  assert.strictEqual(response.statusCode, 200);
  assert.strictEqual(response.body, "Hello from DevOps 🚀");
});
