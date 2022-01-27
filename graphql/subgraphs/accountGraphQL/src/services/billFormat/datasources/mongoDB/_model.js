import { MongoDataSource } from 'apollo-datasource-mongo';


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
}
