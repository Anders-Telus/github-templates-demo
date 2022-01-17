import {
  NUMERICREGEX
} from '../../../../constant'

export default function validateSms(sms, lob) {
  const input = sms.replace(/\.|-|\s/g, '').trim()
  if (lob === 'Mobility' && input.length) {
    const isNumeric = NUMERICREGEX.test(input)
    if (!(input.length === 10 && isNumeric)) {
      return false
    }
  }
  return true
}

export const smsVisiblity = (lob, selectedLOB) => {
  try {
    return (lob.toLowerCase() === 'mob' || lob.toLowerCase() === 'mobility') && selectedLOB.toLowerCase() === 'mobility'
  } catch {
    return false
  }
}
