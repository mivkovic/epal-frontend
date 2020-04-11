import 'zone.js/dist/zone-node';

import { ngExpressEngine } from '@nguniversal/express-engine';
import * as express from 'express';
import { join } from 'path';

import { APP_BASE_HREF } from '@angular/common';
import { existsSync } from 'fs';
import { AppServerModule } from 'src/main.server';
import { cacheMiddleware } from './ssr/cache-middleware';

// The Express app is exported so that it can be used by serverless Functions.
export function createServer() {
  const port = process.env.PORT || 4000;
  const server = express();
  const distFolder = join(process.cwd(), 'dist/epal-frontend/browser');
  const indexHtml = existsSync(join(distFolder, 'index.original.html')) ? 'index.original.html' : 'index';

  server.engine('html', ngExpressEngine({
    bootstrap: AppServerModule,
  }));

  server.set('view engine', 'html');
  server.set('views', distFolder);

  server.get('/sockjs-node/info', (req, res) => { res.end(); });

  server.get('*.(jpg|png|svg|css|woff2|js|ico|map|gif)$', express.static(distFolder, {
    maxAge: '1y'
  }));

  server.get('*', cacheMiddleware, (req, res) => {
    res.header('Cache-Control', 'no-cache, no-store');
    res.render(indexHtml, { req, providers: [{ provide: APP_BASE_HREF, useValue: req.baseUrl }] });
  });

  server.listen(port, () => {
    console.log(`Node Express server listening on http://localhost:${port}`);
  });
}

// Webpack will replace 'require' with '__webpack_require__'
// '__non_webpack_require__' is a proxy to Node 'require'
// The below code is to ensure that the server is run only when not requiring the bundle.
declare const __non_webpack_require__: NodeRequire;
const mainModule = __non_webpack_require__.main;
const moduleFilename = mainModule && mainModule.filename || '';

if (moduleFilename === __filename || moduleFilename.includes('iisnode')) {
  createServer();
}

export * from './src/main.server';
