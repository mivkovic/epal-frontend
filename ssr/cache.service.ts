const redis = require('redis');
const config = require('./config');

let client;

const connect = () => {
  client = redis.createClient(config.redis);
  handleOnConnect();
  handleOnError();
};

const handleOnConnect = () => {
  client.on('connect', (err) => {
    console.log('Connected to Redis.');
  });
};

const handleOnError = () => {
  client.on('error', (err) => {
    console.error('Error' + err);
  });
};

const set = (key, value, callback) => {
  if (!client) {
    return handleNotConnectedYet(callback);
  }

  client.set(key, value, 'EX', config.redis.expiration, callback);
};

const get = (key, callback) => {
  if (!client) {
    return handleNotConnectedYet(callback);
  }

  client.get(key, callback);
};

const deleteCache = (callback) => {
  if (!client) {
    return handleNotConnectedYet(callback);
  }

  client.flushall();
}

const handleNotConnectedYet = (callback) => {
  if (typeof callback === 'function') {
    callback('Redis not connected yet', null);
  }
};

module.exports = {
  connect: connect,
  set: set,
  get: get,
  deleteCache: deleteCache
}
