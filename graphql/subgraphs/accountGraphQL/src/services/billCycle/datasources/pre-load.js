import buildSource from './index.js';
import seed from './mongoDB/seed.js'


const data = async (db) => {
  const builtSource = { ...buildSource.db(db) }
  const billCycle = await builtSource.BillCycle.BillCycle.insertMany(seed.billCycles)
};

export default { data };
