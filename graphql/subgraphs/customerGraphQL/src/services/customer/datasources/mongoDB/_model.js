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

    saveCustomer(data) {
        try {
            const customer = new this.Customer(data);
            return customer.save();
        } catch (error) {
            console.log(`---------> customer save error -------------->  :: ${error}`);
            return error;
        }
    }

    allCustomers() {
        try {
            return this.Customer.find({}).clone().catch(function(err){ console.log(err)});
        } catch (error) {
            console.log(`allCustomer error :: ${error}`);
            return error;
        }
    }
}