
import BillFormat from './_model';
import BillFormatSchema from './_schema';

const db = db => new BillFormat({ BillFormat: db.model('BillFormat', BillFormatSchema) });

export default db;