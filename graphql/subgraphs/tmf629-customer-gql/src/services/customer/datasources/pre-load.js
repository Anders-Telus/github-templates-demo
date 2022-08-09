import buildSource from './index.js';
import seed from './mongoDB/seed.js'


const data = async (db) => {
  const builtSource = { ...buildSource.db(db) }
  await builtSource.Customer.Customer.deleteMany({});
  await builtSource.Customer.Customer.insertMany(seed.customers)
};

export default { data };