import buildSource from './index.js';
import seed from './mongoDB/seed.js'


const data = async (db) => {
  const builtSource = { ...buildSource.db(db) }
  const billFormats = await builtSource.BillFormat.BillFormat.insertMany(seed.billFormats)
};

export default { data };
