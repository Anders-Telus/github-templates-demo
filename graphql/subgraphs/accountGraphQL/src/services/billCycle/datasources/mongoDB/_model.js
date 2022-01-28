import { MongoDataSource } from 'apollo-datasource-mongo';


export default class BillCycle extends MongoDataSource {
  initialize(config) {
    super.initialize({
      ...config,
      debug: true,
    });
  }

  loadBillCycle(billCycleId) {
    try {
      return this.BillCycle.loadOneById(billCycleId);
    } catch (error) {

      console.log(`---------> error -------------->  :: ${error}`);
      return error;
    }
  }
}
