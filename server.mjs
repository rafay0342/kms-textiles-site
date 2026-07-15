import { createReadStream, statSync } from 'node:fs';
import { extname, join, normalize, sep } from 'node:path';
import { fileURLToPath } from 'node:url';
import { createServer } from 'node:http';
import { pipeline } from 'node:stream';

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

// Returns the resolved file path, or null for requests that cannot be decoded
// (malformed percent-encoding, null bytes) and should get a 400.
function safePath(urlPath) {
  let pathname;
  try {
    pathname = decodeURIComponent(urlPath.split('?')[0]);
  } catch {
    return null;
  }
  if (pathname.includes('\0')) return null;
  const candidate = normalize(join(root, pathname === '/' ? 'index.html' : pathname));
  return candidate.startsWith(root + sep) ? candidate : join(root, 'index.html');
}

function serveFile(response, filePath) {
  const extension = extname(filePath).toLowerCase();
  response.writeHead(200, {
    'Cache-Control': extension === '.html' ? 'no-cache' : 'public, max-age=31536000, immutable',
    'Content-Type': mimeTypes[extension] || 'application/octet-stream',
  });
  // pipeline (unlike .pipe) tears down both streams when either side fails,
  // so aborted downloads don't leak fds and stream errors can't crash the process.
  pipeline(createReadStream(filePath), response, (error) => {
    if (error) response.destroy();
  });
}

const server = createServer((request, response) => {
  try {
    const filePath = safePath(request.url || '/');

    if (filePath === null) {
      response.writeHead(400, { 'Content-Type': 'text/plain; charset=utf-8' });
      response.end('Bad Request');
      return;
    }

    let stats = null;
    try {
      stats = statSync(filePath, { throwIfNoEntry: false });
    } catch {
      // Unstatable paths (e.g. ENAMETOOLONG from scanner URLs) get the SPA fallback.
    }
    if (stats && stats.isFile()) {
      serveFile(response, filePath);
      return;
    }

    serveFile(response, join(root, 'index.html'));
  } catch (error) {
    console.error(`${new Date().toISOString()} error handling ${request.method} ${request.url}`, error);
    if (!response.headersSent) {
      response.writeHead(500, { 'Content-Type': 'text/plain; charset=utf-8' });
    }
    response.end();
  }
});

server.listen(port, host, () => {
  console.log(`KMS Textiles server listening on ${host}:${port}`);
});

// Last-resort safety net: this server is stateless, so log loudly and keep
// serving rather than letting an unexpected error take the whole site down.
process.on('uncaughtException', (error) => {
  console.error(`${new Date().toISOString()} uncaught exception (continuing)`, error);
});
process.on('unhandledRejection', (reason) => {
  console.error(`${new Date().toISOString()} unhandled rejection (continuing)`, reason);
});

// Exit cleanly when the platform recycles the container so the shutdown
// registers as a graceful stop (code 0) instead of a spurious failure.
for (const signal of ['SIGTERM', 'SIGINT']) {
  process.on(signal, () => {
    server.close(() => process.exit(0));
    server.closeIdleConnections();
    // Keep-alive or stalled sockets must not hold shutdown past the
    // platform's kill grace period.
    setTimeout(() => process.exit(0), 5000).unref();
  });
}
