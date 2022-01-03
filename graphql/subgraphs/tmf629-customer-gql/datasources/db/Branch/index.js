const BranchModel = require('./_model');
const BranchSchema = require('./_schema');
const mongoose = require('mongoose');


module.exports = db => new BranchModel({ Branch: db.model('Branch', BranchSchema) });

