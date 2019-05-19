const get = require('lodash.get')

module.exports = (options) => {

  const mysql =   get(options, 'msyql') || require('mysql2/promise');
  let config;
  let logger;
  let pool;
  let connection;

  // configure

  const initPool = async (config) => {

    pool = await mysql.createPool({
      connectionLimit: config.ConnectionLimit,
      host: config.host,
      user: config.user,
      password: config.password,
      database: config.database,
    });

    return pool;
  };

  const getConnection = async () => await pool.getConnection();

  const releaseConnection = async () => await connection.release();


  const start = async (dependencies) => {
    config = dependencies.config || {};
    logger = dependencies.logger || console;

    logger.info('Starting the pool');
    pool = await initPool(config);
    connection = await getConnection();
    return {
      pool,
      connection
    };
  };

  const stop = async () => await releaseConnection(connection);

  return {
    start,
    stop,
  };
}
