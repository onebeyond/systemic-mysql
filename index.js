const {get} = require('lodash');

module.exports = (options) => {

  const mysql =  options['mysql']  || require('mysql2/promise');
  let config;
  let logger;

  // configure

  const initPool = async (config) => {

    const pool = await mysql.createPool({
      connectionLimit: config.ConnectionLimit || 10,
      host: config.host || 'localhost',
      user: config.user || 'admin',
      password: config.password || 'password',
      database: config.database || 'event_aggregates'
    });

    return pool;
  };

  const start = (dependencies, cb) => {
    config = dependencies.config || {}
    logger = dependencies.logger || console

    logger.info('Starting the pool');
    return initPool(config);
    cb();
  };

  // stop

  const stop = (connectionPool, cb) => {
    if (connectionPool) {
      return connectionPool.release();
    }
    return cb();
  };

  return {
    start: start,
    stop
  };
}
