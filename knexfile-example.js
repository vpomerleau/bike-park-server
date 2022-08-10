// Update with your config settings.

/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */
module.exports = {
  development: {
    client: "mysql",
    connection: {
      host: "127.0.0.1",
      user: "root",
      password: '', //YOUR MYSQL PASSWORD GOES HERE
      database: "bikepark",
      charset: "utf8",
    },
  },
};
