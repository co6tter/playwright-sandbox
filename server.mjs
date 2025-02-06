import { readFile } from "node:fs";
import { createServer } from "node:http";
import { extname, join } from "node:path";

const port = process.env.PORT || 3000;
const baseDir = process.cwd();

const server = createServer((req, res) => {
  console.log("req.url: ", req.url);
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
