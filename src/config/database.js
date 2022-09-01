require('dotenv').config();

const { DB_DIALECT, DB_HOST, DB_USERNAME, DB_PASSWORD, DB_DATABASE } =
  process.env;

module.exports = {
  dialect: DB_DIALECT,
  host: DB_HOST,
  username: DB_USERNAME,
  password: DB_PASSWORD,
  database: DB_DATABASE,
  define: {
    timestamps: true,
    underscored: true
  }
};
