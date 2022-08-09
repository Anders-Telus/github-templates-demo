
import Account from './_model';
import AccountSchema from './_schema';

const db = db => new Account({ Account: db.model('Account', AccountSchema) });

export default db;