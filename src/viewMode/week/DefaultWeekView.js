import React from 'react'
import { WeekController } from './WeekController'
import { WeekView } from './WeekView'

/**
 * View a week worth of events.
 */
const DefaultWeekView = () => {
  return (
    <WeekController>
      <WeekView />
    </WeekController>
  )
}

export default DefaultWeekView
