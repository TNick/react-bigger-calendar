import React, { useMemo } from 'react'
import eachDayOfInterval from 'date-fns/eachDayOfInterval'
import isSameDay from 'date-fns/isSameDay'
import formatISO from 'date-fns/formatISO'
import isWithinInterval from 'date-fns/isWithinInterval'
import Box from '@material-ui/core/Box'
import { makeStyles } from '@material-ui/core/styles'

import useViewMode from '../useViewMode'
import { DayCell } from './DayCell'
import { useMonthView } from './MonthModeContext'

const useStyles = makeStyles((theme) => {
  console.log('theme = %O', theme)
  return {
    activeDay: theme.calendar.activeDay,
    inactiveDay: theme.calendar.inactiveDay,
    selectedDay: theme.calendar.selectedDay
  }
})

/**
 * Presents the events in a month based on useMonthViewMode.
 */
export const MonthView = () => {
  const classes = useStyles()
  const { interval, month } = useMonthView()
  const { currentDate } = useViewMode()
  const rows = useMemo(() => {
    const localRows = []
    // Get a list of days.
    const days = eachDayOfInterval(interval)
    // Pre-compute some values.
    const totalCells = days.length
    // Ge through each week.
    for (let i = 0; i < totalCells; i = i + 7) {
      // Then go through each day in that week.
      localRows.push(
        <Box
          display='flex'
          justifyContent='center'
          key={`${formatISO(days[i])}`}
        >
          {days.slice(i, i + 7).map((day) => (
            <DayCell
              key={`${formatISO(day)}`}
              day={day}
              inMonth={isWithinInterval(day, month)}
              isCurrent={isSameDay(currentDate, day)}
              classes={classes}
            />
          ))}
        </Box>
      )
    }
    return localRows
  }, [interval, month])

  return <Box>{rows}</Box>
}
