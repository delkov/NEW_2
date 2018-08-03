const databaseName = 'passport_local_knex';

module.exports = {
  development: {
    client: 'postgresql',
    connection: {
      database: 'passport_local_knex',
      user:     'postgres',
      password: 'z5UHwrg8'
    },
    migrations: {
      directory: __dirname + '/src/server/db/migrations'
    },
    seeds: {
      directory: __dirname + '/src/server/db/seeds'
    }
  },
  test: {
    client: 'postgresql',
    connection: {
      database: 'passport_local_knex_test',
      user:     'postgres',
      password: 'z5UHwrg8'
    },
    migrations: {
      directory: __dirname + '/src/server/db/migrations'
    },
    seeds: {
      directory: __dirname + '/src/server/db/seeds'
    }
  }
};
