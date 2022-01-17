import {
  useEffect, useRef
} from 'react'
import moment from 'moment'
import { getCasaAppLocale } from '../locale'

const MANUAL_COMMENT_SLUG_LIST = ['emailInitiated', 'smsInitiated']
const brands = {
  telus: 'telus',
  koodo: 'koodo'
}

export const getSSRLocale = () => {
  let locale
  try {
    locale = {
      lang: window && window.__LOCALE__ ? window.__LOCALE__.lang : 'en',
      prov: window && window.__LOCALE__ ? window.__LOCALE__.prov : 'bc'
    }
  } catch (e) {
    locale = {
      lang: 'en',
      prov: 'bc'
    }
  }

  if (locale && locale.lang && locale.lang === 'fr') {
    return 'fr'
  }
  return 'en'
}

export const getCurrentLanguage = () => {
  const locale = moment.locale() === 'en' ? 'en' : 'fr'
  return locale
}

export const checkAcctType = (billingAcctType, type) => {
  return billingAcctType ? billingAcctType.toLowerCase().includes(type.toLowerCase()) : false
}

export const validate = {
  number: (input) => {
    const regex = /^[0-9]*$/
    const isNumeric = regex.test(input)
    return input.length && isNumeric
  },
  email: (input) => {
    const regex = /^\w+(?:[.-]\w+)*@\w+(?:[.-]\w+)*(?:\.\w{2,3})+$/
    const isEmail = regex.test(input)
    return input.length && isEmail
  },
  name: (input) => {
    const regex = /^[a-zA-Z]+([',.-\s][a-zA-Z]*)*([*])?$/
    const isName = regex.test(input)
    return input.length && isName
  },
  address: (input) => {
    /**
     * TODO: change regex to validate the input based on
     *       address format requirements, when available.
     */
    const regex = /^(?:[^?!@$%^&*+=`~{}\\|:;"'/_]*)$/
    const isAddress = regex.test(input)
    return input.length && isAddress
  },
  isEmpty: (input) => {
    return !!input?.trim()
  },
  checkSpecialCharacters: (input, allowedRegx) => {
    return allowedRegx.test(input)
  },
  checkNotNumbers: (input, allowedRegx) => {
    return allowedRegx.test(input)
  }
}

/**
 * A Hook for accessing the previous value of a prop or state variable
 * before a component update caused it to change
 * @param {*} value the prop or state variable to track
 */
export const usePrevious = (value) => {
  const ref = useRef()
  useEffect(() => { ref.current = value })
  return ref.current
}

// Custom hook to indicate if current render is the 1st render
export const useIsFirstRender = () => {
  const isFirstRenderRef = useRef(true)
  useEffect(() => {
    isFirstRenderRef.current = false
  }, [])
  return isFirstRenderRef.current
}

/* casacading loblist,request type and subtype and agentlist */
export const getRequestOrTypeData = async ({
  type, reqtype, selLOB, brand, taskCascadeMenuItemList, request, subtype
}) => {
  const lang = getCurrentLanguage()
  // const { formData } = getCasaAppLocale().task

  if (taskCascadeMenuItemList && taskCascadeMenuItemList.length) {
    const brandObj = taskCascadeMenuItemList.find((brandData) => {
      return brandData.key === brand.toUpperCase() &&
        brandData.lob &&
        brandData.lob.length
    })

    const lobObj = brandObj && brandObj.lob.find((l) => {
      return l.key === selLOB && l.requestType && l.requestType.length
    })

    if (type === 'requestList') {
      return lobObj && lobObj.requestType ? lobObj.requestType : []
    }

    if (type === 'request') {
      if (!request) {
        return lobObj.requestType.map((reqType) => {
          const reqData = reqType
          if (lang === 'fr' && reqData.key === 'Move') {
            reqData.key = (selLOB === 'Mobility' ? 'Déménagement' : 'Migration de services')
          }
          return {
            text: reqData.key,
            value: reqData.key
          }
        })
      }
      return lobObj.requestType.map((reqType) => {
        if (lang === 'fr' && reqType.key === 'Move') {
          request[reqType.key] = (selLOB === 'Mobility' ? 'Déménagement' : 'Migration de services')
        }
        return {
          text: request[lang][reqType.key],
          value: reqType.key
        }
      })
    }

    if (type === 'subtype') {
      const reqObj = lobObj.requestType.find((r) => {
        return r.key === reqtype && r.subType && r.subType.length
      })
      if (!subtype) {
        return reqObj && reqObj.subType.map((sType) => {
          return {
            text: sType.key,
            value: sType.key,
            resultSet: sType.resultSet
          }
        })
      }
      return reqObj && reqObj.subType.map((sType) => {
        return {
          text: subtype[lang][sType.key],
          value: sType.key,
          resultSet: sType.resultSet
        }
      })
    }
  }

  return []
}

export const getUniqueAgentFunctionList = async (lob, brand, taskCascadeMenuItemList) => {
  const { formData } = getCasaAppLocale().task
  const requestList = await getRequestOrTypeData({
    type: 'requestList', selLOB: lob, brand, taskCascadeMenuItemList
  })
  const agentFuncList = []
  const agent = {}
  requestList.forEach((req) => {
    req.subType.forEach((subT) => {
      if (!Object.keys(agent).includes(subT.resultSet.agentFunction)) {
        agentFuncList.push(
          {
            value: subT.resultSet.agentFunction,
            text: formData.agentFunction[subT.resultSet.agentFunction]
          }
        )
        agent[subT.resultSet.agentFunction] = subT.resultSet.agentFunction
      }
    })
  })
  return agentFuncList
}

export const captalizeFirstCharacter = (str) => {
  return str.split(' ').map(elm => `${elm.charAt(0).toUpperCase()}${elm.slice(1).toLowerCase()}`).join(' ')
}

/**
 * Executes a callback function predictably, after a certain delay.
 * Throttling a function prevents excessive or repeated calling of the function,
 * but does not get reset in the process
 *  - i.e. acts as a rate limiter for execution of handlers
 * @param {number} delay
 * @param {func} callback
 * @param {boolean} debounceMode
 */
export const throttle = (delay, callback, debounceMode) => {
  let timeoutID
  let cancelled = false
  let lastExec = 0
  const clearExistingTimeout = () => {
    if (timeoutID) { clearTimeout(timeoutID) }
  }

  const wrapper = (...args) => {
    const elapsed = Date.now() - lastExec
    const exec = () => {
      lastExec = Date.now()
      callback(...args)
    }

    if (cancelled) { return }
    if (debounceMode && !timeoutID) { exec() }
    clearExistingTimeout()
    if (debounceMode === undefined && elapsed > delay) {
      exec()
    } else {
      const clearTimeoutID = () => { timeoutID = undefined }
      timeoutID = setTimeout(
        debounceMode ? clearTimeoutID : exec,
        debounceMode === undefined ? delay - elapsed : delay
      )
    }
  }

  wrapper.cancel = () => {
    clearExistingTimeout()
    cancelled = true
  }
  return wrapper
}

/**
 * Stalls the execution of a callback function for a predetermined
 * amount of time, so long as it continues to be invoked
 * @param {*} delay stall delay
 * @param {*} atBegin true if callback is to be executed before stalling
 *                    initiates, false if after stalling period ends
 * @param {*} callback function to debounce
 */
export const debounce = (delay, atBegin, callback) => {
  return callback === undefined
    ? throttle(delay, atBegin, false)
    : throttle(delay, callback, atBegin)
}

/**
 * Finds and returns the browser name from a given user-agent header.
 * Browsers recognized by this helper:
 * - Chrome
 * - Chromium
 * - Firefox
 * - Safari
 * - Opera
 * - Seamonkey
 * - Internet Explorer
 * - Microsoft Edge
 *
 * If none of the above browsers can be retrieved from a user-agent
 * string, then Unknown is returned as a fallback
 * @param {String} userAgent user-agent request header
 */
export const getBrowser = (userAgent = '') => {
  let browserName = 'Unknown'
  const ua = userAgent.toLowerCase()
  const regex = /[a-zA-Z]+\/([0-9]+|\.)+/g // Matches all "<product>/<product-version>" strings
  const matches = ua.match(regex)
  const identifiers = matches.map(i => i.split('/')[0]) // Remove product versions

  const browsers = [
    { name: 'Chrome', includesAny: ['chrome'], excludesAll: ['chromium', 'edge', 'edg'] },
    { name: 'Chromium', includesAny: ['chromium'], excludesAll: [] },
    { name: 'Firefox', includesAny: ['firefox'], excludesAll: ['seamonkey'] },
    { name: 'Safari', includesAny: ['safari'], excludesAll: ['chrome', 'chromium', 'edge', 'edg'] },
    { name: 'Opera', includesAny: ['opera', 'opr'], excludesAll: [] },
    { name: 'Seamonkey', includesAny: ['seamonkey'], excludesAll: [] },
    { name: 'Internet Explorer', includesAny: ['trident'], excludesAll: [] },
    { name: 'Microsoft Edge', includesAny: ['edge', 'edg'], excludesAll: [] }
  ]

  const intersection = (a, b) => a.filter(value => b.includes(value))
  browsers.forEach((browser) => {
    if (
      intersection(browser.includesAny, identifiers).length > 0 &&
      intersection(browser.excludesAll, identifiers).length === 0
    ) {
      browserName = browser.name
    }
  })

  /**
   * Checking older versions of Internet Explorer
   * - i.e. IE 10 and below running on certain operating systems
   */
  if (ua.includes('msie')) { browserName = 'Internet Explorer' }

  return browserName
}

export const getTranslatedCaseStatus = (caseStatus) => {
  const locale = getCasaAppLocale()
  switch (caseStatus.toLowerCase()) {
    case 'open':
      return locale.case.caseStatus.open
    case 'cancelled':
      return locale.case.caseStatus.cancelled
    case 'closed':
      return locale.case.caseStatus.completed
    case 'draft':
      return locale.case.caseStatus.draft
    default:
      return caseStatus
  }
}

export const getTaskStatus = (status) => {
  switch (status) {
    case 'IssueResolved':
      return 'COMPLETED'
    case 'FollowUpCompleted':
      return 'COMPLETED'
    case 'SubstitutedByAnotherTask':
      return 'COMPLETED'
    case 'NoLongerRequired':
      return 'CANCELLED'
    case 'AlreadyCompleted':
      return 'CANCELLED'
    case 'RequiresEscalation':
      return 'CANCELLED'
    default:
      return status
  }
}

export const getTranslatedAsscTaskStatus = (taskStatus) => {
  const locale = getCasaAppLocale()
  switch (taskStatus.toLowerCase()) {
    case 'not_started':
      return locale.case.asscTaskStatus.notStarted
    case 'completed':
      return locale.case.asscTaskStatus.completed
    case 'cancelled':
      return locale.case.asscTaskStatus.cancelled
    case 'pending':
      return locale.case.asscTaskStatus.pending
    case 'in_progress':
      return locale.case.asscTaskStatus.inProgress
    default:
      return taskStatus
  }
}

export const getTranslatedBanStatus = (status) => {
  const locale = getCasaAppLocale()
  switch (status.toLowerCase()) {
    case 'open':
      return locale.ban.openStatus
    case 'closed':
      return locale.ban.closedStatus
    default:
      return status
  }
}
export const isManualComment = (agentDetail, commentTxt) => {
  let manualComment = true
  try {
    if (agentDetail && Object.keys(agentDetail).includes('name') && Object.keys(agentDetail).includes('id')) {
      if (agentDetail.name.toUpperCase() === 'SYSTEM' && agentDetail.id.toUpperCase() === 'SYSTEM') {
        manualComment = false
      }
    }
    const commentsObj = commentTxt ? JSON.parse(commentTxt) : commentTxt
    if (commentsObj && commentsObj.slugs) {
      manualComment = false
    }
  } catch (e) {
    return manualComment
  }
  return manualComment
}

export const handleManualComments = (text) => {
  try {
    const commentsObj = JSON.parse(text)
    return commentsObj.text
  } catch (ex) {
    return text
  }
}

export const handleSlugComments = (text) => {
  try {
    const commentsObj = JSON.parse(text)
    return commentsObj.slugs === 'closedUsingDisposition' ? commentsObj.slugs : ''
  } catch (ex) {
    return text
  }
}

export const replaceAllSlug = (mapSlugs, comment) => {
  let newComment = ''
  const re = new RegExp(Object.keys(mapSlugs).join('|'), 'gi')
  newComment = comment.replace(re, (matched) => {
    return mapSlugs[matched]
  })
  return newComment
}

export const formatCaseComments = (text) => {
  const locale = getCasaAppLocale()
  let formattedComment = ''
  try {
    const commentsObj = JSON.parse(text)
    const mapSlugs = {}
    const slugsMaps = commentsObj.slugs.split(',')
    const comment = commentsObj.text
    let commentTxt = ''
    if (slugsMaps.length > 1) {
      slugsMaps.map((slug) => {
        if (slug) mapSlugs[slug.trim()] = (locale.case[slug.trim()] || slug.trim())
        return mapSlugs
      })
      commentTxt = replaceAllSlug(mapSlugs, comment)
    } else if (commentsObj.slugs) {
      const slugVal = locale.case[commentsObj.slugs.trim()] || commentsObj.slugs.trim()
      mapSlugs[commentsObj.slugs.trim()] = slugVal
      commentTxt = replaceAllSlug(mapSlugs, comment)
    } else {
      commentTxt = comment
    }
    formattedComment = commentTxt.split('<|>').join('\n')
    const currentLanguage = getCurrentLanguage()
    if (currentLanguage === 'fr') {
      // shift Dollor symbol ToRight
      const dollorRegex = /(\$)(\d)+/g
      const allMatches = formattedComment.match(dollorRegex)
      let newDollorTxt = ''
      if (allMatches) {
        allMatches.map((dollor) => {
          newDollorTxt = dollor.replace('$', '')
          formattedComment = formattedComment.replace(dollor, `${newDollorTxt}$`)
          return formattedComment
        })
      }
    }
    return formattedComment
  } catch (ex) {
    return text
  }
}
export const getNotificationslLink = (ban, brand, lineOfBusiness, customerId) => {
  const { communicationHistoryUrl } = 'http://localhost:8000'
  const brandNum = brand && brand.toLowerCase() === 'telus' ? '1' : '3'
  return lineOfBusiness.toLowerCase() === 'mobility'
    ? `${communicationHistoryUrl.mobility}${ban}&brand=${brandNum}&mastersourceid=130&lang=${moment.locale()}`
    : `${communicationHistoryUrl.ffh}mastersourceid=1012&customerid=${customerId}&lang=${moment.locale()}`
}

export const TIMEZONE_MAPPING = (tz) => {
  switch (tz) {
    case 'PST':
    case 'PDT':
    case 'PT':
      return 'America/Los_Angeles'
    case 'MST':
    case 'MDT':
    case 'MT':
      return 'America/Denver'
    case 'EST':
    case 'EDT':
    case 'ET':
      return 'America/New_York'
    case 'CST':
    case 'CDT':
    case 'CT':
      return 'America/Chicago'
    case 'NL':
    case 'NDT':
    case 'NST':
      return 'America/St_Johns'
    case 'AT':
    case 'ADT':
    case 'AST':
      return 'Canada/Atlantic'
    default:
      return 'America/Denver'
  }
}

export const checkIfCookiesExpired = () => {
  const cookies = document.cookie.split(';')
  const cookiesObj = {}
  cookies.forEach((cookie) => {
    if (cookie) {
      cookiesObj[cookie.split('=')[0].trim()] = cookie.split('=')[1].trim()
    }
  })
  return !(cookiesObj.prov && cookiesObj.lang)
}

/**
 * Returns billingTypeType based on selected language
 * @param {*} billingTypeSubtype
 * @param {*} brand
 * * @return {boolean} billingTypeType
 */
export const getBillingAccountType = (billingTypeSubtype, brand) => {
  const locale = getCasaAppLocale()
  const billingTypeType = (billingTypeSubtype.type + billingTypeSubtype.subtype)
  return (brand === brands.telus ? locale.ban.billingAccountTypes.telus[billingTypeType]
    : locale.ban.billingAccountTypes.koodo[billingTypeType])
}

export const createUdTypeData = (udItemData, type) => {
  const udParamType = type
  if (udItemData) {
    return udItemData.forEach((udType) => {
      udParamType.en[udType.slug] = udType.en_val
      udParamType.fr[udType.slug] = udType.fr_val
    })
  }
  return {}
}

export const isAuthorized = (policyResourceId, applicationPolicies, employeeRoles) => {
  let isAuth = false

  const relevantPolicies = applicationPolicies
    .filter(policy => policy.resourceId === policyResourceId && policy.effect === 'Allow')
    .find(
      policyItem => employeeRoles.some(
        role => (policyItem.roleList ? policyItem.roleList.includes(role) : null)
      )
    )
  isAuth = employeeRoles.some(role => (relevantPolicies && relevantPolicies.roleList
    ? relevantPolicies.roleList.includes(role)
    : false))

  return isAuth
}

/**
 * @description sort an simple array or array of obj
 * @param ${ key, order } - Object
 * @returns sort function
 */
export const compareSort = ({ key = '', order = 'asc' } = {}) => {
  return function innerSort (a, b) {
    let varA = a[key] === undefined ? a : a[key]
    let varB = b[key] === undefined ? b : b[key]

    varA = typeof varA === 'string' ? varA.toUpperCase() : varA
    varB = typeof varB === 'string' ? varB.toUpperCase() : varB

    let comparison = 0
    if (varA > varB) {
      comparison = 1
    } else if (varA < varB) {
      comparison = -1
    }
    return (
      (order === 'desc') ? (comparison * -1) : comparison
    )
  }
}

/**
 * @description Open new window with post method
 * @param ${ url, data } - Object
 * @returns openWindowWithPost function
 */
export const openWindowWithPost = (url, data) => {
  const form = document.createElement('form')
  form.id = 'sendnotificationform'
  form.id = 'sendnotificationform'
  form.target = '_blank'
  form.method = 'POST'
  form.action = url
  form.style.display = 'none'
  Object.keys(data).forEach((key) => {
    const input = document.createElement('input')
    input.type = 'hidden'
    input.name = key
    input.value = typeof data[key] === 'object' ? JSON.stringify(data[key]) : data[key]
    form.appendChild(input)
  })
  form.style.display = 'none'
  form.enctype = 'application/json'
  document.body.appendChild(form)
  form.submit()
  document.getElementById('sendnotificationform').remove()
}

/**
 * @description Get Agent Language from Cookie
 * @returns getAgentLanguage function
 */
export const getAgentLanguage = () => {
  const cookies = document.cookie.split(';')
  const cookiesObj = {}
  cookies.forEach((cookie) => {
    if (cookie) {
      cookiesObj[cookie.split('=')[0].trim()] = cookie.split('=')[1].trim()
    }
  })
  return cookiesObj.lang || 'EN'
}

export const isManualSMSEmailComment = (text) => {
  let commentsObj
  // Checks whether the text is stringified object or plain string
  if (text[0] === '{' && text[text.length - 1] === '}') {
    commentsObj = JSON.parse(text)
  } else {
    commentsObj = {
      slugs: '',
      text
    }
  }
  const slugsMaps = commentsObj.slugs.split(',')
  if (slugsMaps.length > 1) {
    return false
  }
  return MANUAL_COMMENT_SLUG_LIST.includes(commentsObj.slugs)
}

export const isPolicyTaskUpdate = (applicationPolicies, employeeRoles) => {
  let isAuth = false
  const relevantPolicies = applicationPolicies
    .filter(policy => (policy.resourceId === 'Task Update' || policy.resourceId === 'Task Complete') &&
      policy.effect === 'Allow')
    .find(
      policyItem => employeeRoles.some(
        role => (policyItem.roleList ? policyItem.roleList.includes(role) : null)
      )
    )
  isAuth = employeeRoles.some(role => (relevantPolicies && relevantPolicies.roleList
    ? relevantPolicies.roleList.includes(role)
    : false))

  return isAuth
}

export const formatPhoneNumber = (phoneNumberString) => {
  try {
    if (phoneNumberString === '') return phoneNumberString
    if (Number.isNaN(phoneNumberString)) {
      throw new Error('Invalid contact no.')
    }
    const cleaned = (`${phoneNumberString}`).replace(/\D/g, '')
    const match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/)
    if (match) {
      return `${match[1]}-${match[2]}-${match[3]}`
    }
    return phoneNumberString
  } catch (error) {
    return error
  }
}

export const getAmountColor = (amount) => {
  return /-/g.test(amount) ? '#C12335' : '#2A2C2E'
}

export const getColor = (s) => {
  if (s.toLowerCase() === 'pending') return '#4B286D'
  if (s.toLowerCase() === 'rejected') return '#C12335'
  return '#71757B'
}

export const getStatus = (s) => {
  let status = 'checkmark'
  if (s.toLowerCase() === 'completed' || s.toLowerCase() === 'approved') {
    status = 'checkmark'
  } else if (s.toLowerCase() === 'rejected') {
    status = 'times'
  }
  return status
}

export const getVarient = (s) => {
  let status = 'primary'
  if (s.toLowerCase() === 'completed' || s.toLowerCase() === 'approved') {
    status = 'primary'
  } else if (s.toLowerCase() === 'rejected') {
    status = 'error'
  }
  return status
}

export const formatStatus = (s) => {
  return `${s[0].toUpperCase()}${s.slice(1).toLowerCase()}`
}

export const getApprover = (_item) => {
  const lastApprover = _item.approvals && _item.approvals.slice(_item.approvals.length - 1)
  return (lastApprover && lastApprover.length ? lastApprover[0].approverId : _item.creatorId) || 'System'
}

export const getTaxType = (taxes = [], type) => {
  const taxData = taxes.filter(t => t.type === type)
  return taxData.length && taxData[0].amount
}

export const getCustomerIdList = (banList) => {
  let customerIds = []
  if (banList && banList.length) {
    customerIds = banList.map(item => item.customerId)
  }
  return [...new Set(customerIds)]
}

export const getFormattedCustomerProfileList = (data) => {
  const custListData = {}
  if (data && data.length) {
    data.forEach((item) => {
      const key = Object.keys(item)[0]
      custListData[key] = item[key]
    })
  }
  return custListData
}

/**
 * prepare details pop up object for task, case, notes
 */
export const prepareDetailPopupObj = (data) => {
  const {
    tabUniqId,
    type,
    id,
    dragPosition
  } = data
  return ({
    [tabUniqId]: [{
      type,
      id,
      dimensions: {
        height: '70vh',
        width: '75%'
      },
      index: 4,
      isOpen: true,
      minimized: false,
      isDraggable: true,
      position: 0,
      modifieable: {
        showMinimizeIcon: true,
        showCloseIcon: true,
        dragPosition: dragPosition || {
          x: '25%',
          y: '177px'
        },
        rel: {
          x: 0,
          y: 0
        },
        showFooter: false,
        showHeader: true,
        showBody: true
      }
    }]
  })
}

export const getCurrentCustomerId = (customerId = '', mobility = [], ffh = []) => {
  let currentCustomerId = customerId
  if (ffh.length && mobility.length) {
    currentCustomerId = ffh[0].customerId
  }
  return currentCustomerId
}
