import { MongoDataSource } from 'apollo-datasource-mongo';

export default class Customer extends MongoDataSource {
    initialize(config) {
        super.initialize({
            ...config,
            debug: true,
        });
    }
    getCustomer(customerId) {
        try {
            return this.Customer.loadOneById(customerId);
        } catch (error) {
            console.log(`---------> customer error -------------->  :: ${error}`);
            return error;
        }
    }

    allCustomers() {
        try {
            return this.Customer.find({});
        } catch (error) {
            console.log(`allCustomer error :: ${error}`);
            return error;
        }
    }
}