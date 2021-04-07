import { createContext, useContext } from 'react'

/**
 * Identifies our context.
 */
export const DayModeContext = createContext(null)
DayModeContext.displayName = 'DayModeContext'

/**
 * Hook for getting day view controller.
 */
export const useDayView = () => {
  return useContext(DayModeContext)
}
