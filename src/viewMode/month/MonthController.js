import React, { Children, useState, useCallback, useEffect } from 'react'
import useViewMode from '../useViewMode'
import addDays from 'date-fns/addDays'
import startOfToday from 'date-fns/startOfToday'
import subDays from 'date-fns/subDays'
import { intervalFromDate } from './lib'
import { MonthModeContext } from './MonthModeContext'

/**
 * Controls a month display.
 *
 * The start of the interval is taken from the view mode controller.
 * We compute the start and end of the interval as well as the start and
 * end of the month; The view will probably use this information to
 * display in a different shade the dates that are not part of current month.
 */
export const MonthController = ({ children }) => {
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
    intervalFromDate(currentDate || startDate)[0]
  )
  const [month, setMonth] = useState(
    intervalFromDate(currentDate || startDate)[1]
  )

  // This is how we change the interval.
  const changeInterval = useCallback(
    (newInterval, newMonth, newCrtDate = null) => {
      setInterval(newInterval)
      setMonth(newMonth)
      setCurrentDate(newCrtDate || month.start)
      setStartDate(month.start)
    },
    [setInterval, setMonth, setCurrentDate, setStartDate]
  )

  // Handler for when the user ask us to navigate to previous page.
  const navigateToPrevious = useCallback(() => {
    const [newInterval, newMonth] = intervalFromDate(subDays(interval.start, 1))
    changeInterval(newInterval, newMonth)
  }, [])

  // Handler for when the user ask us to navigate to the page
  // that contains today.
  const navigateToToday = useCallback(() => {
    const today = startOfToday()
    const [newInterval, newMonth] = intervalFromDate(today)
    changeInterval(newInterval, newMonth, today)
  }, [])

  // Handler for when the user ask us to navigate to next page.
  const navigateToNext = useCallback(() => {
    const [newInterval, newMonth] = intervalFromDate(addDays(interval.end, 1))
    changeInterval(newInterval, newMonth)
  }, [])

  // Set the handlers in view mode controller.
  useEffect(() => {
    setNavigation([navigateToPrevious, navigateToToday, navigateToNext])
  }, [setNavigation])

  return (
    <MonthModeContext.Provider value={{ interval, month }}>
      {Children.only(children)}
    </MonthModeContext.Provider>
  )
}
