import BillFormat from './mongoDB';

const db = (db) => ({ 
    BillFormat: BillFormat(db)
});

export default { db };