import React from 'react'
import { WorkWeekController } from './WorkWeekController'
import { WorkWeekView } from './WorkWeekView'

/**
 * View a week worth of events.
 */
const DefaultWorkWeekView = () => {
  return (
    <WorkWeekController>
      <WorkWeekView />
    </WorkWeekController>
  )
}

export default DefaultWorkWeekView
