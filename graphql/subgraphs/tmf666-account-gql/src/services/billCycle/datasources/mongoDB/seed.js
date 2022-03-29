const billCycles = [
  {
    id: "1",
    billingDateShift: 12,
    billingPeriod: "NET 1",
    paymentDueDateOffset: 20,
    mailingDateOffset: 2,
    name: "Bond",
    chargeDateOffset: 15,
    creditDateOffset: 10,
    description: "testing",
    frequency: "N/A",
    href: "www.test.com",
    validFor: {
      endDateTime: "2020-12-31",
      startDateTime: "2020-12-31"
    },
  },
  {
    id: "2",
    billingDateShift: 12,
    billingPeriod: "NET 2",
    paymentDueDateOffset: 20,
    mailingDateOffset: 2,
    name: "Anders",
    chargeDateOffset: 15,
    creditDateOffset: 10,
    description: "testing",
    frequency: "N/A",
    href: "www.test.com",
    validFor: {
      endDateTime: 0,
      startDateTime: 0
    },
  },
  {
    id: "3",
    billingDateShift: 12,
    billingPeriod: "NET 3",
    paymentDueDateOffset: 20,
    mailingDateOffset: 2,
    name: "Bond",
    chargeDateOffset: 15,
    creditDateOffset: 10,
    description: "testing",
    frequency: "N/A",
    href: "www.test.com",
    validFor: {
      endDateTime: "2022-12-17T22:00:36.136+08:00",
      startDateTime: "2022-12-17T22:00:36.136+08:00"
    },
  }
];

export default { billCycles };
