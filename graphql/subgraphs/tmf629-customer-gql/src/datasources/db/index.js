const Branch = require('./Branch');
const Profession = require('./Profession');
const Job = require('./Job');

module.exports = db => ({
    Job: Job(db),
    Branch: Branch(db),
    Profession: Profession(db)
  })