import React, { useState } from 'react'
import DataProviderContext from './dataProvider/DataProviderContext'
import ViewModeContext from './viewMode/ViewModeContext'

/**
 * Controls the data used by the calendar.
 */
const CalendarContext = ({ dataProvider, children }) => {
  const [viewMode, setViewMode] = useState('week')
  return (
    <DataProviderContext.Provider value={dataProvider}>
      <ViewModeContext.Provider value={{ viewMode, setViewMode }}>
        {children}
      </ViewModeContext.Provider>
    </DataProviderContext.Provider>
  )
}

export default CalendarContext
