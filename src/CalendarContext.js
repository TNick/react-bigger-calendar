import React, { useState } from 'react'
import DataProviderContext from './dataProvider/DataProviderContext'
import ViewModeContext from './viewMode/ViewModeContext'
import { DateFnsAdapter, DateLibContext } from './date-utils'
import TranslationProvider from './i18n/TranslationProvider'

/**
 * Controls the data used by the calendar.
 */
const CalendarContext = ({ dataProvider, i18nProvider, children }) => {
  const [viewMode, setViewMode] = useState('week')
  const [interval, setInterval] = useState([])
  return (
    <TranslationProvider i18nProvider={i18nProvider}>
      <DateLibContext.Provider value={DateFnsAdapter}>
        <DataProviderContext.Provider value={dataProvider}>
          <ViewModeContext.Provider
            value={{ viewMode, setViewMode, interval, setInterval }}
          >
            {children}
          </ViewModeContext.Provider>
        </DataProviderContext.Provider>
      </DateLibContext.Provider>
    </TranslationProvider>
  )
}

export default CalendarContext
