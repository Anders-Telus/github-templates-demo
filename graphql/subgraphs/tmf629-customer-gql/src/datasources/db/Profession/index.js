const ProfessionModel = require('./_model');
const ProfessionSchema = require('./_schema');

module.exports = db =>
  new ProfessionModel({ Profession: db.model('Profession', ProfessionSchema) });