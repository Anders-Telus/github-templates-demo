import mongoose from 'mongoose';

export default mongoose.Schema({
    id: String,
    href: String,
    name: String,
    status: String,
    statusReason: String,
    characteristic: [{
        name: String,
        valueType: String,
        value: String
    }],
    creditProfile: [{
        creditProfileDate: Date,
        creditRiskRating: Number,
        creditScore: Number,
        validFor: {
            endDateTime: Date,
            startDateTime: Date
        }
    }],
    billCycle: {type: mongoose.Schema.Types.Array, ref: 'BillCycle'},
});
