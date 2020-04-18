const fs = require('fs');
const path = require('path');
const util = require('util');
const env = require('dotenv')
  .config({
    path: path.resolve(process.cwd(), '.env')
  });
  
fs.writeFile(
  './src/environments/environment.ts',
  `export const environment = ${util.inspect(env.parsed, false, 2, false)};`,
  (err) => {
    if (err) throw err;
  }
);
