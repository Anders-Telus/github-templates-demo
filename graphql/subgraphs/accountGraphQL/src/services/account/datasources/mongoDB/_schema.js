import mongoose from  'mongoose';


const BillCycle = mongoose.Schema({
    billingDateShift: Number,
    billingPeriod: String,
    chargeDateOffset: Number,
    creditDateOffset: Number,
    description: String,
    frequency: String,
    href: String,
    id: String,
    mailingDateOffset: Number,
    name: String,
    paymentDueDateOffset: Number,
    validFor: {
        endDateTime: Date,
        startDateTime: Date
    }
});
export default mongoose.Schema({
    id: String,
    name: String,
    accountType: String,
    description: String,
    href: String,
    billCycle: {type: mongoose.Schema.Types.ObjectId, ref: 'billCycle'}
});