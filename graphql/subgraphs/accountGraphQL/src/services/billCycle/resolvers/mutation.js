const mutation = {
  addBillCycle: (_, args, { dataSources: { BillCycle } }) => {
    const {
      id,
      billingDateShift,
      billingPeriod,
      chargeDateOffset,
      description,
      frequency,
      href,
      name,
      mailingDateOffset,
      paymentDueDateOffset,
    } = args.billCycle;
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
      paymentDueDateOffset,
    });
  },
};

export default mutation;
