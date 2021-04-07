import React from 'react'
import ViewAgenda from './DefaultAgenda'
import { DefaultDayView } from './day'
import { DefaultMonthView } from './month'
import { DefaultWeekView } from './week'
import { DefaultWorkWeekView } from './workWeek'

const getView = (viewMode, CustomViews) => {
  if (
    CustomViews &&
    Object.prototype.hasOwnProperty.call(CustomViews, viewMode)
  ) {
    return CustomViews[viewMode]
  } else if (viewMode === 'day') {
    return <DefaultDayView />
  } else if (viewMode === 'week') {
    return <DefaultWeekView />
  } else if (viewMode === 'wweek') {
    return <DefaultWorkWeekView />
  } else if (viewMode === 'month') {
    return <DefaultMonthView />
  } else if (viewMode === 'agenda') {
    return <ViewAgenda />
  } else {
    throw new Error(
      `Unknown view mode ${viewMode}. ` +
        'To use a custom view mode pass a CustomViews property ' +
        'where the key indicates the view mode and the value ' +
        'is a component that renders that view mode.'
    )
  }
}

export default getView
