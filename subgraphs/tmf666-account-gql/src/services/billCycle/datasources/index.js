import BillCycle from './mongoDB';

const db = (db) => ({ 
  BillCycle: BillCycle(db)
});

export default { db };