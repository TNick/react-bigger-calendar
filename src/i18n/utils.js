import merge from 'lodash/merge'
import { DEFAULT_LOCALE } from './index'

/**
 * Resolve the browser locale according to the value of the global window.navigator
 *
 * Use it to determine the locale at runtime.
 */
export const resolveBrowserLocale = (defaultLocale = DEFAULT_LOCALE) => {
  // from http://blog.ksol.fr/user-locale-detection-browser-javascript/
  // Rely on the window.navigator object to determine user locale
  const { language, browserLanguage, userLanguage } = window.navigator
  return (language || browserLanguage || userLanguage || defaultLocale).split(
    '-'
  )[0]
}

/**
 * Compose translations from multiple packages for a single language (eg: 'english').
 *
 * Use it to merge translations from addons with the main translations.
 */
export const mergeTranslations = (...translationsModules) =>
  merge({}, ...translationsModules)
