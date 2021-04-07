import { createContext, useContext } from 'react'

/**
 * Identifies our context.
 */
export const WorkWeekModeContext = createContext(null)
WorkWeekModeContext.displayName = 'WorkWeekModeContext'

/**
 * Hook for getting week view controller.
 */
export const useWorkWeekView = () => {
  return useContext(WorkWeekModeContext)
}
