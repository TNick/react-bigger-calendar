import React, { useMemo, Fragment } from 'react'
import PropTypes from 'prop-types'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableContainer from '@material-ui/core/TableContainer'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import eachDayOfInterval from 'date-fns/eachDayOfInterval'
import isSameDay from 'date-fns/isSameDay'
import startOfDay from 'date-fns/startOfDay'
import endOfDay from 'date-fns/endOfDay'
import compareAsc from 'date-fns/compareAsc'
import addMinutes from 'date-fns/addMinutes'
import getDate from 'date-fns/getDate'
import formatISO from 'date-fns/formatISO'
import format from 'date-fns/format'
import Chip from '@material-ui/core/Chip'
import { makeStyles } from '@material-ui/core/styles'

import useViewMode from '../useViewMode'

const useStyles = makeStyles((theme) => ({
  activeDay: theme.calendar.activeDay,
  inactiveDay: theme.calendar.inactiveDay,
  selectedDay: theme.calendar.selectedDay,
  columnMinuteHeader: {
    border: '0',
    width: '1rem'
  },
  rowMinuteHeader: {
    border: '0',
    width: '1rem'
  }
}))

/**
 * Presents the events in a day based on useMonthViewMode.
 */
export const DayView = ({ gridResolution }) => {
  const { currentDate } = useViewMode()
  const classes = useStyles()
  const [dayHeaders, allDayRow, tableContent] = useMemo(() => {
    // This is where we store column headers that indicate the
    // name of the day. First element is the column where the
    // row labels are stored.
    const localDayHeaders = [
      <TableCell key='row-labels' className={classes.columnMinuteHeader}>
        Day
      </TableCell>,
      <TableCell
        key={`${formatISO(currentDate)}`}
        rowSpan={3}
        align='center'
        className={classes.selectedDay}
      >
        {`${format(currentDate, 'eee')}`}&nbsp;
        <Chip label={getDate(currentDate)} color='primary' size='small' />
      </TableCell>
    ]

    // This is where we store the cells that host the events that last
    // a full day. First element is the column where the
    // row labels are stored.
    const localAllDayRow = [
      <TableCell
        component='th'
        scope='row'
        key='row-labels'
        className={classes.columnMinuteHeader}
      />,
      <TableCell
        key={`${formatISO(currentDate)}`}
        rowSpan={2}
        className={classes.selectedDay}
      />
    ]

    // This is where we store the rows that host each time slot.
    // The list will have as many items as time slots in the day.
    // It consist of lists of 8 elements (one for the row label and
    // 7 for 7 days in the week).
    const localTableContent = []

    // Iterate minutes.
    let minute = startOfDay(currentDate)
    let iMin = 0
    const lastMinute = endOfDay(currentDate)
    while (compareAsc(minute, lastMinute) === -1) {
      // Either create the list for this time slot or retrieve it

      // First column has the label for the row (the minute)
      const rowList = [
        <TableCell
          component='th'
          scope='row'
          key='row-label'
          rowSpan={2}
          className={classes.rowMinuteHeader}
        >
          {format(minute, 'HH:mm')}
        </TableCell>
      ]
      localTableContent.push(rowList)

      // Append the cell for this day in this time slot
      rowList.push(
        <TableCell
          key={`${formatISO(currentDate)}`}
          rowSpan={2}
          className={classes.selectedDay}
        >
          {/* getDate(day) */}
        </TableCell>
      )

      // Advance to next time slot in this day.
      minute = addMinutes(minute, gridResolution)
      iMin++
    }

    return [localDayHeaders, localAllDayRow, localTableContent]
  }, [currentDate])

  return (
    <TableContainer>
      <Table width='100%' height='100%'>
        <TableHead>
          <tr>{dayHeaders}</tr>
        </TableHead>
        <TableBody>
          <TableRow>{allDayRow}</TableRow>
          {tableContent.map((dataRow, i) => (
            <>
              <TableRow key={`row-even-${i}`}>{dataRow[0]}</TableRow>
              <TableRow key={`row-odd-${i}`}>{dataRow.slice(1)}</TableRow>
            </>
          ))}

          <TableRow>
            <TableCell />
          </TableRow>
          <TableRow>
            <TableCell />
            <TableCell />
            <TableCell />
            <TableCell />
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  )
}

DayView.propTypes = {
  gridResolution: PropTypes.number
}

DayView.defaultProps = {
  gridResolution: 60
}
