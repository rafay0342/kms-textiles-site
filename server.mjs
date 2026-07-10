import { createReadStream, existsSync, statSync } from 'node:fs';
import { extname, join, normalize } from 'node:path';
import { fileURLToPath } from 'node:url';
import { createServer } from 'node:http';

const port = Number(process.env.PORT) || 3000;
const host = process.env.HOST || '0.0.0.0';
const root = join(fileURLToPath(new URL('.', import.meta.url)), 'dist');

const mimeTypes = {
  '.css': 'text/css; charset=utf-8',
  '.gif': 'image/gif',
  '.html': 'text/html; charset=utf-8',
  '.ico': 'image/x-icon',
  '.jpeg': 'image/jpeg',
  '.jpg': 'image/jpeg',
  '.js': 'text/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.png': 'image/png',
  '.svg': 'image/svg+xml',
  '.webp': 'image/webp',
};

function safePath(urlPath) {
  const pathname = decodeURIComponent(urlPath.split('?')[0]);
  const candidate = normalize(join(root, pathname === '/' ? 'index.html' : pathname));
  return candidate.startsWith(root) ? candidate : join(root, 'index.html');
}

function serveFile(response, filePath) {
  const extension = extname(filePath).toLowerCase();
  response.writeHead(200, {
    'Cache-Control': extension === '.html' ? 'no-cache' : 'public, max-age=31536000, immutable',
    'Content-Type': mimeTypes[extension] || 'application/octet-stream',
  });
  createReadStream(filePath).pipe(response);
}

const server = createServer((request, response) => {
  const filePath = safePath(request.url || '/');

  if (existsSync(filePath) && statSync(filePath).isFile()) {
    serveFile(response, filePath);
    return;
  }

  serveFile(response, join(root, 'index.html'));
});

server.listen(port, host, () => {
  console.log(`KMS Textiles server listening on ${host}:${port}`);
});
