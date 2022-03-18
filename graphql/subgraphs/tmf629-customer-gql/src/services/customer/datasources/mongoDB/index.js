import Customer from './_model';
import CustomerSchema from './_schema';

const db = db => new Customer({ Customer: db.model('Customer', CustomerSchema) });

export default db;