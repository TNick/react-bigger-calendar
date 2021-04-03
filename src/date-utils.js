import { useContext, createContext } from 'react'
import DateIODateFnsAdapter from '@date-io/date-fns'
import getDayOfYear from 'date-fns/getDayOfYear'
export { default } from '@date-io/date-fns'

/**
 * Our custom adapter build on top of the date-fns library.
 */
export class DateFnsAdapter extends DateIODateFnsAdapter {
  getDayOfYear(date) {
    return getDayOfYear(date)
  }
}

/**
 * We create a context so that we can use hooks to retrieve the
 * adapter in components.
 */
export const DateLibContext = createContext(null)
DateLibContext.displayName = 'DateLibContext'

/**
 * Hook that allows you to work with dates in components.
 *
 * @returns the date-fns adapter
 */
export const useDateLib = () => {
  return useContext(DateLibContext)
}
