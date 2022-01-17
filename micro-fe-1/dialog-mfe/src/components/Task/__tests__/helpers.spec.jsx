import validateSms from '../helpers'

describe('task create', () => {
  it('should return true for valid sms', () => {
    const sms = '7865876587'
    const result = validateSms(sms, 'Mobility')
    expect(result).toBeTruthy()
  })
  it('should return false for invalid sms', () => {
    const sms = '7865876587899'
    const result = validateSms(sms, 'Mobility')
    expect(result).toBeFalsy()
  })
})
