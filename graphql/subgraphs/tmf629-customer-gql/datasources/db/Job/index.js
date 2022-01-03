const JobModel = require('./_model');
const JobSchema = require('./_schema');

module.exports = db => new JobModel({ Job: db.model('Job', JobSchema) });