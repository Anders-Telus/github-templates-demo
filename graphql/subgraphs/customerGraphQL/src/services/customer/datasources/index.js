import customerDBSoruce from './mongoDB';

const db = (db) => ({
  Customer: customerDBSoruce(db)
});

export default { db };
