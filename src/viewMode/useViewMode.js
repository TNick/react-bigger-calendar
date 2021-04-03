import { useContext } from 'react'

import ViewModeContext from './ViewModeContext'

/**
 * Hook for getting current view mode.
 *
 * By default we know of day, week, month and agenda view modes.
 */
const useViewMode = () => {
  return useContext(ViewModeContext)
}
export default useViewMode
