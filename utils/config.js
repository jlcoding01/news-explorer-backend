const {
  JWT_SECRET = "strong-key",
  DATABASE_URL = "mongodb://127.0.0.1:27017/newsexplorer_db",
} = process.env;

module.exports = { JWT_SECRET, DATABASE_URL };
