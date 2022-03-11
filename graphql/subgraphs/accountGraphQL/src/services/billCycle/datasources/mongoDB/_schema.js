import mongoose from  'mongoose';

export default mongoose.Schema({
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
})
