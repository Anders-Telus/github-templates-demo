import { UserInputError } from "apollo-server"
import { BillCycle } from "../.."
const mutation = {
  addBillCycle: (_, args, { dataSources: { BillCycle } }) => {
    const { id, billingDateShift, billingPeriod, chargeDateOffset, description, frequency, href, name, mailingDateOffset, paymentDueDateOffset } = args.billCycle
    if (args.id < 1) {
      throw new UserInputError("We need an ID")
    }
    // if (!billingDateShift.length) throw new Error('BillingDateShift not found');
    // if (!billingPeriod.length) throw new Error('BillingPeriod not found');
    // if (!chargeDateOffset.length) throw new Error('ChargeDateOffset not found');
    // if (!frequency.length) throw new Error('Frequency not found');
    if (!name.length) throw new Error("Name is not found")
    return BillCycle.saveBillCycle({
      id,
      billingDateShift,
      billingPeriod,
      chargeDateOffset,
      description,
      frequency,
      href,
      name,
      mailingDateOffset,
      paymentDueDateOffset
    })
  },
  deleteBillCycle: (_, id, { dataSources: { BillCycle } }) => {
    return BillCycle.deleteBillCycle({id})
  }
}

export default mutation
