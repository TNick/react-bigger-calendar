import React, { Children, useState, useCallback, useEffect } from 'react'
import useViewMode from '../useViewMode'
import addDays from 'date-fns/addDays'
import startOfToday from 'date-fns/startOfToday'
import subDays from 'date-fns/subDays'
import { DayModeContext } from './DayModeContext'

/**
 * Controls a day display.
 *
 * The start of the interval is taken from the view mode controller.
 * We compute the start and end of the interval as well as the start and
 * end of the day; The view will probably use this information to
 * display in a different shade the dates that are not part of current day.
 */
export const DayController = ({ children }) => {
  return (
    <DayModeContext.Provider value={{ }}>
      {Children.only(children)}
    </DayModeContext.Provider>
  )
}
