import { createServer } from 'node:http';
import { readFile, stat } from 'node:fs/promises';
import { resolve, extname, sep } from 'node:path';
const root = resolve('public');
const types = {'.html':'text/html', '.css':'text/css', '.js':'text/javascript', '.svg':'image/svg+xml', '.webmanifest':'application/manifest+json'};
createServer(async (req, res) => {
  if (!['GET', 'HEAD'].includes(req.method)) { res.writeHead(405); return res.end(); }
  try {
    const pathname = decodeURIComponent(new URL(req.url, 'http://localhost').pathname);
    let file = resolve(root, '.' + pathname);
    if (file !== root && !file.startsWith(root + sep)) { res.writeHead(403); return res.end(); }
    if ((await stat(file)).isDirectory()) file = resolve(file, 'index.html');
    const body = await readFile(file);
    res.writeHead(200, {'Content-Type': (types[extname(file)] || 'application/octet-stream') + '; charset=utf-8', 'Cache-Control':'no-cache', 'X-Content-Type-Options':'nosniff'});
    res.end(req.method === 'HEAD' ? undefined : body);
  } catch { res.writeHead(404); res.end('Not found'); }
}).listen(Number(process.env.PORT || 3000), '127.0.0.1', () => console.log('Open http://localhost:' + (process.env.PORT || 3000)));
