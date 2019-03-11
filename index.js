const {get} = require('lodash');

module.exports = (options) => {

  const mysql =  options['mysql']  || require('mysql2/promise');
  let config;
  let logger;
  let connection;

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

  const start = async (dependencies) => {
    config = dependencies.config || {}
    logger = dependencies.logger || console
    logger.info('Starting the pool');
    return initPool(config);
  };

  // stop

  const stop = async () => {

  };

  return {
    start,
    stop
  };
}
