import Account from './mongoDB';

const db = (db) => ({ 
  Account: Account(db)
});

export default { db };