const consul = new (require('consul'))();
const http = require('http');

const service = {
  name: 'Service-1',
  address: '10.0.0.1',
  port: 3000
};

const check = {
  name: "service1 health check",
  notes: "HTTP GET health check",
  serviceid: service.name,
  ttl: "15s",
  http: "http://"+service.address+":"+service.port+"/health",
  interval: "10s",
  timeout: "2s"
};

const server = http.createServer((req, res) => {
  if (req.url === '/health') {
    res.writeHead(200);
    res.end('OK');
  } else {
    res.end('Hello, World from service1!');
  }
});

consul.agent.check.register(check, (err) => {
  if (err) throw err;
  console.log(`Registered health check for ${service.name}`);
});

consul.agent.service.register(service, (err) => {
  if (err) throw err;

  console.log(`Registered service ${service.name}`);
});

server.listen(service.port, () => {
  console.log(`Server listening on port ${service.port}`);
});
