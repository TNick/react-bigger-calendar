import { useContext } from 'react'

import TranslationContext from './TranslationContext'

/**
 * Get the current locale from the TranslationContext
 *
 * This hook re-renders when the locale changes.
 */
const useLocale = () => {
  const { locale } = useContext(TranslationContext)
  return locale
}

export default useLocale
