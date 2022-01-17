import moment from 'moment'
import appLocale from '../locales';

const URL_REGEX = /(.*\/)(en|fr)(\/)(ab|bc|mb|nb|nl|ns|nt|nu|on|pe|qc|sk|yt)(\/)(.*)/

export const getNewLocaleUrl = (event) => {
  const defaultLocale = { language: 'en', region: 'bc' }
  const newLocale = event && event.detail ? event.detail : defaultLocale
  let newUrl = window.location.href

  const currentUrl = window.location.href.toLowerCase()

  if (URL_REGEX.test(currentUrl)) {
    newUrl = currentUrl.replace(
      URL_REGEX,
      // about header change locale event does not include region so we
      // default to existing region
      `$1${newLocale.language}/${newLocale.region || '$4'}/$6`
    )
  } else {
    // We need to manually set the cookie as express locale won't
    document.cookie = `lang=${newLocale.language};path=/;expires=Tue, 19 Jan 2038 03:14:07 UTC;domain=.telus.com`
    document.cookie = `prov=${newLocale.region.toUpperCase()};path=/;expires=Tue, 19 Jan 2038 03:14:07 UTC;domain=.telus.com`
  }

  return newUrl
}

export const getNewLocaleUrlWithoutBase = (event) => {
  const newUrl = getNewLocaleUrl(event);
  return newUrl.replace(
    URL_REGEX,
    '/$2$3$4$5$6'
  )
}

export const changeLocale = (event) => {
  const path = getNewLocaleUrl(event)
  window.history.replaceState({}, '', path)
}

export const getCurrentLanguage = () => {
  const locale = moment.locale() === 'en' ? 'en' : 'fr'
  return locale
}

export const getCasaAppLocale = (manualOverride) => {
  try {
    const locale = manualOverride || moment.locale()
    return locale === 'fr' ? appLocale.fr : appLocale.en
  } catch (e) {
    return appLocale.en
  }
}