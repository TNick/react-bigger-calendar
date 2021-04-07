import React from 'react'
import { DayController } from './DayController'
import { DayView } from './DayView'

/**
 * View a day worth of events.
 */
const DefaultDayView = () => {
  return (
    <DayController>
      <DayView />
    </DayController>
  )
}

export default DefaultDayView
