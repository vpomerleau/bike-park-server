const connections = {
  development: {
    client: "mysql",
    connection: {
      host: "127.0.0.1",
      user: "root",
      password: "", //YOUR MYSQL PASSWORD GOES HERE
      database: "bikepark",
      charset: "utf8",
    },
  },
  production: {
    client: "mysql",
    connection: process.env.JAWSDB_URL,
  },
};

module.exports =
  process.env.NODE_ENV === "production"
    ? connections.production
    : connections.development;
