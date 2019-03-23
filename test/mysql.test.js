const expect = require('expect.js');

const mysqlComponent = require('..');

describe('Mysql Component', () => {
  let pool;
  let connection;
  let mysql;

  before( async () => {
    let dependencies = {
      config: {
        connectionLimit: 10,
        host: 'localhost',
        user: 'admin',
        password: 'password',
        database: 'example'
      }
    };
    mysql = mysqlComponent(dependencies);
    pool = await mysql.start(dependencies);
    connection = pool.connection;
  })

  after( async () => {
    await mysql.stop();
  })

  it('It should connect without error' , () => {
     expect(connection).to.not.be.null;
  });

});
