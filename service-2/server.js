const consul = new (require('consul'))();
const http = require('http');

const service = {
  name: 'Service-2',
  address: '10.0.0.1',
  port: 3001
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
