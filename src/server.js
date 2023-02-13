const { createServer } = require("http");
const next = require("next");
const pino = require("pino");

const logger = pino({
  level: process.env.LOG_LEVEL || "info",
});

const dev = process.env.NODE_ENV !== "production";

const app = next({
  dev,
  hostname: dev ? "localhost" : process.env.HOST_URL,
  port: dev ? 3000 : process.env.HOST_PORT,
});

const handle = app.getRequestHandler();

app.prepare().then(() => {
  createServer((req, res) => {
    req.log = logger.child({
      requestId: req.headers["x-request-id"],
      url: req.url,
      method: req.method,
    });

    handle(req, res);
  }).listen(3000, (err) => {
    if (err) throw err;
    console.log("> Ready");
  });
});
