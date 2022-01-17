export const getMobBansData = (billingAcctNums) => {
  const data = billingAcctNums.map(acct => ({
    billingAcctNum: acct.billingAcctNum,
    lineOfBusiness: acct.lineOfBusiness,
    pin: acct.pin ? acct.pin : '',
    transBillingAcctStatus: acct.transBillingAcctStatus,
    email: acct.customerPrimaryContactEmail,
    isParent: acct.isParent,
    brand: acct.brand,
    authorizedUsers: acct.authorizedUsers ? acct.authorizedUsers.filter(Boolean) : [],
    preferredLanguage: acct.preferredLanguage,
    cbr: [
      { mobHomeContact: acct.mobHomeContact },
      { mobBusinessContact: acct.mobBusinessContact }
    ].filter(Boolean),
    isErrorSummary: acct.isErrorSummary,
    errors: acct.errors
  }))

  return data
}

export const getFFHBansData = (billingAcctNums) => {
  const map = {}
  billingAcctNums.forEach((acct) => {
    if (map[acct.customerId]) {
      map[acct.customerId].bans.push(
        {
          billingAcctNum: acct.billingAcctNum,
          pin: acct.pin ? acct.pin : '-',
          transBillingAcctStatus: acct.transBillingAcctStatus
        }
      )
    } else {
      map[acct.customerId] = {
        bans: [acct],
        pin: acct.pin ? acct.pin : '-',
        customerId: acct.customerId,
        transBillingAcctStatus: acct.transBillingAcctStatus,
        email: acct.customerPrimaryContactEmail,
        isParent: acct.isParent,
        authorizedUsers: acct.authorizedUsers ? acct.authorizedUsers.filter(Boolean) : [],
        preferredLanguage: acct.preferredLanguage,
        cbr: [
          { contactNum: acct.contactNum },
          { contactCellPhone: acct.contactCellPhone }
        ].filter(Boolean),
        lineOfBusiness: acct.lineOfBusiness,
        isErrorSummary: acct.isErrorSummary,
        errors: acct.errors
      }
    }
  })
  return map
}

export const getTooltipText = (phoneNumber, locale) => {
  if (phoneNumber === 'mobBusinessContact') {
    return locale.app.ban.businessPhone
  } if (phoneNumber === 'mobHomeContact') {
    return locale.app.ban.homePhone
  } if (phoneNumber === 'contactNum') {
    return locale.app.ban.contactPhone
  } if (phoneNumber === 'contactCellPhone') {
    return locale.app.ban.cellphone
  }
  return '-'
}

// check for connected account API error
export const getConnectedAccountError = (mobBans, ffhBans) => {
  return ((mobBans.length > 0 && mobBans[0].isErrorConnected) ||
  (ffhBans.length > 0 && ffhBans[0].isErrorConnected))
}

// check for any API error related to contact cards
export const getContactCardSectionError = (mobBans, ffhBans) => {
  let isError = false

  isError = !!mobBans.find((mob) => {
    const { isErrorSummary, isProfileError, isErrorConnected } = mob
    return isErrorSummary || isProfileError || isErrorConnected
  })
  if (isError) return isError

  isError = !!ffhBans.find((ffh) => {
    const { isErrorSummary, isProfileError, isErrorConnected } = ffh
    return isErrorSummary || isProfileError || isErrorConnected
  })

  return isError
}
