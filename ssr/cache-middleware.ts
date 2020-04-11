const CacheService = require('./cache.service');
import * as MobileDetect from "mobile-detect";
CacheService.connect();

export const cacheMiddleware = (req, res, next) => {
  const md = new MobileDetect(req.headers['user-agent']);

  const cacheKey = md.mobile() ?
    `mobile-${req.url}` : `web-${req.url}`;

  CacheService.get(cacheKey, (err, cache) => {
    if (!err && cache) {
      console.log(`Serving ${cacheKey} from cache.`);

      return res.end(cache);
    }

    res.sendResponse = res.send;
    res.send = (body) => {
      CacheService.set(cacheKey, body, (err, reply) => {
        if (err) {
          console.error(err);
        }

        if (reply == 'OK') {
          console.log(`Caching ${cacheKey}.`);
          res.sendResponse(body);
        }
      });
    };

    next();
  });
};
