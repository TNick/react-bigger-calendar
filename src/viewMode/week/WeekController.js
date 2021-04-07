import React, { Children, useState, useCallback, useEffect } from 'react'
import useViewMode from '../useViewMode'
import addDays from 'date-fns/addDays'
import startOfToday from 'date-fns/startOfToday'
import subDays from 'date-fns/subDays'
import { weekIntervalFromDate } from './lib'
import { WeekModeContext } from './WeekModeContext'

/**
 * Controls a week display.
 *
 * The start of the interval is taken from the view mode controller.
 * We compute the start and end of the interval as well as the start and
 * end of the week; The view will probably use this information to
 * display in a different shade the dates that are not part of current week.
 */
export const WeekController = ({ children }) => {
  const {
    currentDate,
    startDate,
    setCurrentDate,
    setStartDate,
    setNavigation
  } = useViewMode()
  // On first render we take the value from the upper level controller
  // and compute the interval that we're going to use.
  const [interval, setInterval] = useState(
    weekIntervalFromDate(currentDate || startDate)
  )

  // This is how we change the interval.
  const changeInterval = useCallback(
    (newInterval, newCrtDate = null) => {
      setInterval(newInterval)
      setCurrentDate(newCrtDate || newInterval.start)
      setStartDate(newInterval.start)
    },
    [setInterval, setCurrentDate, setStartDate]
  )

  // Handler for when the user ask us to navigate to previous page.
  const navigateToPrevious = useCallback(() => {
    const newInterval = weekIntervalFromDate(subDays(interval.start, 7))
    changeInterval(newInterval)
  }, [])

  // Handler for when the user ask us to navigate to the page
  // that contains today.
  const navigateToToday = useCallback(() => {
    const today = startOfToday()
    const newInterval = weekIntervalFromDate(today)
    changeInterval(newInterval, today)
  }, [])

  // Handler for when the user ask us to navigate to next page.
  const navigateToNext = useCallback(() => {
    const newInterval = weekIntervalFromDate(addDays(interval.start, 7))
    changeInterval(newInterval)
  }, [])

  // Set the handlers in view mode controller.
  useEffect(() => {
    setNavigation([navigateToPrevious, navigateToToday, navigateToNext])
  }, [setNavigation])

  return (
    <WeekModeContext.Provider value={{ interval }}>
      {Children.only(children)}
    </WeekModeContext.Provider>
  )
}
