import mongoose from  'mongoose';

export default mongoose.Schema({
    id: String,
    name: String,
    accountType: String,
    description: String,
    href: String,
    billCycle: {type: mongoose.Schema.Types.ObjectId, ref: 'BillCycle'}
});