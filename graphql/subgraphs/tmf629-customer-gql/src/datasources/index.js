const dbSource = require('./db');

module.exports = {
  db: db => dbSource(db)
};