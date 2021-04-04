import React from 'react'
import { MonthController } from './MonthController'
import { MonthView } from './MonthView'

/**
 * View a month worth of events.
 */
const DefaultMonthView = () => {
  return (
    <MonthController>
      <MonthView />
    </MonthController>
  )
}

export default DefaultMonthView
