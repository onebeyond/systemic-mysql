module.exports = (options) => {

  const mysql =  get(options, 'mysql')  || require("mysql")();
  let config;
  let logger;

  // configure

  const getConfig = (dependencies) => {
    config = dependencies.config
    logger = dependencies.logger || console
  };

  const initPool = (config) => {

    const pool = mysql.createPool({
      connectionLimit: 10,
      host: config.host,
      user: config.user,
      password: config.password,
      database: config.database
    });

    pool.getConnection((err, connection) => {
      if (err) {
          if (err.code === 'PROTOCOL_CONNECTION_LOST') {
              console.error('Database connection was closed.')
          };
          if (err.code === 'ER_CON_COUNT_ERROR') {
              console.error('Database has too many connections.')
          };
          if (err.code === 'ECONNREFUSED') {
              console.error('Database connection was refused.')
          };
      };
      if (connection) connection.release();
      return;
    })
    return pool;
  }

  const validate = (cb) => {
    if (!has(config, 'vhosts')) return cb(new Error('config.vhosts is required'))
    cb();
  }
  // start

  const start = (cb) => {
    logger.info('Starting the pool');
    return initPool();
  }

  // stop

  const stop = (cb) => {
    if (connectionPool) {
      return connectionPool.end()
        .then(() => next());
    }
    return next();
  }

  return {
    start: async.seq(getConfig, validate, start),
    stop
  }
}
