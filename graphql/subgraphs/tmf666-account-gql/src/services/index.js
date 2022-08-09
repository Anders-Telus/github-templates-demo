import BillCycle from './billCycle/datasources/index';
import BillFormat from './billFormat/datasources/index';
import Account from './account/datasources/index';
import { dbConnection } from '../db'

export default () => ({
  billCycle: new BillCycle(dbConnection.collection('billCycle')),
  billFormat: new BillFormat(dbConnection.collection('billFormat')),
  account: new Account(dbConnection.collection('account'))
})

export { BillCycle, BillFormat, Account }
