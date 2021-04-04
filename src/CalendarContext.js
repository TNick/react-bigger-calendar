import React, { useState } from 'react'
import { ThemeProvider } from '@material-ui/core/styles'
import DataProviderContext from './dataProvider/DataProviderContext'
import ViewModeContext from './viewMode/ViewModeContext'
import { DateFnsAdapter, DateLibContext } from './date-utils'
import TranslationProvider from './i18n/TranslationProvider'

/**
 * Controls the data used by the calendar.
 */
const CalendarContext = ({
  children,
  dataProvider,
  i18nProvider,
  initialCurrentDate,
  initialStartDate,
  initialViewMode,
  theme
}) => {
  const [viewMode, setViewMode] = useState(initialViewMode)
  const [currentDate, setCurrentDate] = useState(initialCurrentDate)
  const [startDate, setStartDate] = useState(initialStartDate)
  const [navigation, setNavigation] = useState([() => {}, () => {}, () => {}])
  const [navigateToPrevious, navigateToToday, navigateToNext] = navigation

  return (
    <TranslationProvider i18nProvider={i18nProvider}>
      <DateLibContext.Provider value={DateFnsAdapter}>
        <DataProviderContext.Provider value={dataProvider}>
          <ThemeProvider theme={theme}>
            <ViewModeContext.Provider
              value={{
                currentDate,
                startDate,
                setCurrentDate,
                setStartDate,
                setViewMode,
                viewMode,
                navigateToPrevious,
                navigateToToday,
                navigateToNext,
                setNavigation
              }}
            >
              {children}
            </ViewModeContext.Provider>
          </ThemeProvider>
        </DataProviderContext.Provider>
      </DateLibContext.Provider>
    </TranslationProvider>
  )
}

export default CalendarContext
