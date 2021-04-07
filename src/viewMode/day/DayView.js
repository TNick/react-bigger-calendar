import React, { useMemo } from 'react'
import PropTypes from 'prop-types'
import startOfDay from 'date-fns/startOfDay'
import endOfDay from 'date-fns/endOfDay'

import useViewMode from '../useViewMode'
import IntervalGrid from '../common/IntervalGrid'

/**
 * Presents the events in a day based on useMonthViewMode.
 */
export const DayView = ({ gridResolution }) => {
  const { currentDate } = useViewMode()
  const interval = useMemo(() => ({
    start: startOfDay(currentDate),
    end: endOfDay(currentDate)
  }))
  return <IntervalGrid gridResolution={gridResolution} interval={interval} />
}

DayView.propTypes = {
  gridResolution: PropTypes.number
}

DayView.defaultProps = {
  gridResolution: 60
}
