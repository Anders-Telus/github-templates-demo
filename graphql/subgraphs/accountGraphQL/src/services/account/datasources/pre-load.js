import buildSource from './index.js';
import seed from './mongoDB/seed.js'


const data = async (db) => {
  const builtSource = { ...buildSource.db(db) }
  await builtSource.Account.Account.deleteMany({});
  await builtSource.Account.Account.insertMany(seed.accounts)
};

export default { data };
