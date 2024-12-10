import { Knex } from "knex";

const config: { [key: string]: Knex.Config } = {
  development: {
    client: "pg",
    connection: {
      host: "localhost",
      user: "malaga",
      password: "malaga",
      database: "malagadb",
    },
  },
};

export default config;
