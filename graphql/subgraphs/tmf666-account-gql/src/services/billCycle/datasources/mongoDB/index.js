import BillCycle from './_model';
import BillCycleSchema from './_schema';

const db = db => new BillCycle({ BillCycle: db.model('BillCycle', BillCycleSchema) });

export default db;