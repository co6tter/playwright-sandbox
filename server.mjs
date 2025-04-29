import { Buffer } from "node:buffer";
import { readFile } from "node:fs";
import { createServer } from "node:http";
import { extname, join } from "node:path";
import dotenv from "dotenv";

dotenv.config();

const port = process.env.PORT || 3000;
const baseDir = process.cwd();

const USERNAME = process.env.BASIC_AUTH_USERNAME;
const PASSWORD = process.env.BASIC_AUTH_PASSWORD;

const server = createServer((req, res) => {
  console.log("req.url: ", req.url);

  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Basic ")) {
    res.writeHead(401, { "WWW-Authenticate": 'Basic realm="Secure Area"' });
    return res.end("Unauthorized");
  }

  const base64Credentials = authHeader.split(" ")[1];
  const credentials = Buffer.from(base64Credentials, "base64").toString("utf-8");
  const [username, password] = credentials.split(":");

  if (username !== USERNAME || password !== PASSWORD) {
    res.writeHead(401, { "WWW-Authenticate": 'Basic realm="Secure Area"' });
    return res.end("Unauthorized");
  }

  if (req.url === "/heartbeat") {
    res.writeHead(200, { "Content-Type": "text/plain" });
    return res.end("Hello World!\n");
  }

  let filePath = req.url === "/" ? "/index.html" : req.url;
  filePath = join(baseDir, "tests", filePath);
  const ext = extname(filePath);
  const contentType =
    {
      ".html": "text/html",
      ".css": "text/css",
      ".js": "text/javascript",
      ".json": "application/json",
      ".png": "image/png",
      ".jpg": "image/jpeg",
      ".gif": "image/gif",
    }[ext] || "text/plain";

  readFile(filePath, (err, data) => {
    if (err) {
      res.writeHead(404, { "Content-Type": "text/plain" });
      res.end("404 Not Found");
    } else {
      res.writeHead(200, { "Content-Type": contentType });
      res.end(data);
    }
  });
});

server.listen(port, "0.0.0.0", () => {
  console.log(`Server running at http://localhost:${port}/`);
});
