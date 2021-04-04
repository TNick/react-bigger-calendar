import { createContext, useContext } from 'react'

/**
 * Identifies our context.
 */
export const MonthModeContext = createContext(null)
MonthModeContext.displayName = 'MonthModeContext'

/**
 * Hook for getting month view controller.
 */
export const useMonthView = () => {
  return useContext(MonthModeContext)
}
