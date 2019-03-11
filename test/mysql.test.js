const expect = require('expect.js');

const mysqlComponent = require('..');

describe('Mysql Component', () => {
  let pool;
  let connection;

  before( async () => {
    let dependencies = {
      config: {
        connectionLimit: 10,
        host: 'localhost',
        user: 'admin',
        password: 'password',
        database: 'event_aggregates'
      }
    };
    mysql = mysqlComponent(dependencies);
    pool = await mysql.start(dependencies.config);
    mysql.createConnec
  })

  after( async () => {
    await mysql.stop();
  })

  it('It should connect without error' , async () => {
    connection = await pool.getConnection();
    connection.release();
    expect(connection).to.not.be.null;
  });

});
