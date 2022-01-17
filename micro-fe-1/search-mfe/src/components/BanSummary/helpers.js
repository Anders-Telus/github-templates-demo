import moment from 'moment'

export const getMobBanStatusTooltip = (status, locale) => {
  switch (status) {
    case 'Delinquent':
      return locale.app.tooltip.mobBanStatusDelinquent
    case 'Ceased':
      return locale.app.tooltip.mobBanStatusCeased
    case 'Cancelled':
      return locale.app.tooltip.mobBanStatusCancelled
    case 'Tentative':
      return locale.app.tooltip.mobBanStatusTentative
    case 'Suspended':
      return locale.app.tooltip.mobBanStatusSuspended
    default:
      return ''
  }
}

export const getFFHBanStatusTooltip = (status, locale) => {
  switch (status) {
    case 'In Treatment':
      return locale.app.tooltip.ffhBanStatusInTreatment
    default:
      return ''
  }
}

export const getMobilityDataUsage = (usage) => {
  const usageData = usage
    ? Object.values(usage)
    : []
  return usageData
}

export const getFormatedDate = (date) => {
  return date ? moment.utc(date).format('ll') : '-'
}

export const getCreditCard = (cardType, locale) => {
  switch (cardType) {
    case 'Visa':
      return locale.ban.creditCardType.visa
    case 'MasterCard':
      return locale.ban.creditCardType.masterCard
    case 'American Express':
      return locale.ban.creditCardType.americanExpress
    case 'Other':
      return locale.ban.creditCardType.other
    case 'Not Applicable':
      return locale.ban.creditCardType.notApplicable
    default:
      return ''
  }
}

export const getCreditClass = (lineOfBusiness, creditClassCd) => {
  if (lineOfBusiness === 'mobility') {
    if (creditClassCd === 'E' || creditClassCd === 'K' || creditClassCd === 'V') {
      return true
    }
  } else if (lineOfBusiness === 'ffh') {
    if (creditClassCd === 'D' || creditClassCd === 'R') {
      return true
    }
  }
  return false
}

export const getCreditToolTip = (lineOfBusiness, creditClassCd) => {
  if (lineOfBusiness === 'ffh') {
    if (creditClassCd === 'E') {
      return 'ffh-E'
    } if (creditClassCd === 'D') {
      return 'ffh-D'
    } if (creditClassCd === 'R') {
      return 'ffh-R'
    } if (creditClassCd === 'V') {
      return 'ffh-V'
    } if (creditClassCd === 'G') {
      return 'ffh-G'
    }
  } if (lineOfBusiness === 'mobility') {
    if (creditClassCd === 'A') {
      return 'mobility-A'
    } if (creditClassCd === 'B') {
      return 'mobility-B'
    } if (creditClassCd === 'C') {
      return 'mobility-C'
    } if (creditClassCd === 'D') {
      return 'mobility-D'
    } if (creditClassCd === 'E') {
      return 'mobility-E'
    } if (creditClassCd === 'F') {
      return 'mobility-F'
    } if (creditClassCd === 'K') {
      return 'mobility-K'
    } if (creditClassCd === 'L') {
      return 'mobility-L'
    } if (creditClassCd === 'M') {
      return 'mobility-M'
    } if (creditClassCd === 'N') {
      return 'mobility-N'
    } if (creditClassCd === 'P') {
      return 'mobility-P'
    } if (creditClassCd === 'R') {
      return 'mobility-R'
    } if (creditClassCd === 'S') {
      return 'mobility-S'
    } if (creditClassCd === 'T') {
      return 'mobility-T'
    } if (creditClassCd === 'U') {
      return 'mobility-U'
    } if (creditClassCd === 'V') {
      return 'mobility-V'
    } if (creditClassCd === 'W') {
      return 'mobility-W'
    } if (creditClassCd === 'X') {
      return 'mobility-X'
    } if (creditClassCd === 'Y') {
      return 'mobility-Y'
    } if (creditClassCd === 'Z') {
      return 'mobility-Z'
    }
  }
  return false
}
