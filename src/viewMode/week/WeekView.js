import React from 'react'
import PropTypes from 'prop-types'

import IntervalGrid from '../common/IntervalGrid'
import { useWeekView } from './WeekModeContext'

/**
 * Presents the events in a week based on useMonthViewMode.
 */
export const WeekView = ({ gridResolution }) => {
  const { interval } = useWeekView()
  return <IntervalGrid gridResolution={gridResolution} interval={interval} />
}

WeekView.propTypes = {
  gridResolution: PropTypes.number
}

WeekView.defaultProps = {
  gridResolution: 60
}
