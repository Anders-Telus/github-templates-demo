const buildSource = require('.');
const seed = require('./db/seed')

module.exports.data = async function(db){
    const builtSource = { ...buildSource.db(db)}
    const branches = await builtSource.Branch.Branch.insertMany(seed.branches)
    const professions = await builtSource.Profession.Profession.insertMany(seed.professions)
    branches.forEach(async branch => {
      const pros = await builtSource.Profession.Profession.find({ branchSourceId: branch.sourceId}).lean()
      await builtSource.Branch.Branch.updateOne({ sourceId: branch.sourceId }, { $set: { professions: pros.map(p => p._id )} })
    })
    
    professions.forEach(async profession => {
      await builtSource.Job.Job.insertMany([{ profession: profession._id }])
    })
  };