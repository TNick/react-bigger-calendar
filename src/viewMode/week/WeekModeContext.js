import { createContext, useContext } from 'react'

/**
 * Identifies our context.
 */
export const WeekModeContext = createContext(null)
WeekModeContext.displayName = 'WeekModeContext'

/**
 * Hook for getting week view controller.
 */
export const useWeekView = () => {
  return useContext(WeekModeContext)
}
