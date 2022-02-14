import { MongoDataSource } from "apollo-datasource-mongo";

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

  saveBillCycle(data) {
    try {
      const billCycle = new this.BillCycle(data);
      return billCycle.save();
    } catch (error) {
      console.log(
        `---------> BillCycle save error -------------->  :: ${error}`
      );
      return error;
    }
  }

 async allBillCycles() {
    try {
     const billModel = this.BillCycle.find({}).clone().catch(function(err){ console.log(err)});
     return billModel;
    } catch (error) {
      console.log(`BillCycle error :: ${error}`);
      return error;
    }
  }
}
