const consul = new (require('consul'))();
const http = require('http');

const service = {
  name: 'my-service',
  address: '10.0.0.1',
  port: 3000
};

consul.agent.service.register(service, (err) => {
  if (err) throw err;

  console.log(`Registered service ${service.name}`);
});

const server = http.createServer((req, res) => {
  res.end('Hello, World!');
});

server.listen(service.port, () => {
  console.log(`Server listening on port ${service.port}`);
});
