import React from 'react'
import PropTypes from 'prop-types'

import IntervalGrid from '../common/IntervalGrid'
import { useWorkWeekView } from './WorkWeekModeContext'

/**
 * Presents the events in a work week based on useWorkWeekViewMode.
 */
export const WorkWeekView = ({ gridResolution }) => {
  const { interval } = useWorkWeekView()
  return <IntervalGrid gridResolution={gridResolution} interval={interval} />
}

WorkWeekView.propTypes = {
  gridResolution: PropTypes.number
}

WorkWeekView.defaultProps = {
  gridResolution: 60
}
