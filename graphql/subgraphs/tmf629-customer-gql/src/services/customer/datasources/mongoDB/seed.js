const customers = [
  {
    id: 1,
    name: "John",
    status: 'Active',
    href: 'http://www.google.com',
    statusReason: 'Some reason',
    characteristic: [
      {
        name: 'good',
        valueType: 'newType',
        value: 'new'
      }
    ],
    creditProfile: [
      {
        creditProfileDate: '2021-10-15',
        creditRiskRating: 5,
        creditScore: 10,
        validFor: {
          endDateTime: '2021-12-31',
          startDateTime: '2021-10-15'
        }
      }
    ]
  },
  {
    id: 2,
    name: "Bob",
    status: 'Inactive',
    href: 'http://www.example.com',
    statusReason: 'Some other reason',
    characteristic: [
      {
        name: 'better',
        valueType: 'oldType',
        value: 'old'
      }
    ],
    creditProfile: [
      {
        creditProfileDate: '2020-10-15',
        creditRiskRating: 4,
        creditScore: 8,
        validFor: {
          endDateTime: '2020-12-31',
          startDateTime: '2020-10-15'
        }
      }
    ]
  }
]

export default { customers };
