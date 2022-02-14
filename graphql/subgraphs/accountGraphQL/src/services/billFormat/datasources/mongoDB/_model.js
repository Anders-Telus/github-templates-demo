import { MongoDataSource } from "apollo-datasource-mongo";

export default class BillFormat extends MongoDataSource {
  initialize(config) {
    super.initialize({
      ...config,
      debug: true,
    });
  }

  loadBillFormat(billFormatId) {
    try {
      return this.BillFormat.loadOneById(billFormatId);
    } catch (error) {
      console.log(`---------> error -------------->  :: ${error}`);
      return error;
    }
  }

  saveBillFormat(data) {
    try {
      const billFormat = new this.BillFormat(data);
      return billFormat.save();
    } catch (error) {
      console.log(
        `---------> BillFormat save error -------------->  :: ${error}`
      );
      return error;
    }
  }

  async allBillFormats() {
    try {
      const billFormatModel = this.BillFormat.find({}).clone().catch(function(err){ console.log(err)});
      return billFormatModel;
    } catch (error) {
      console.log(`BillFormats error :: ${error}`);
      return error;
    }
  }
}
