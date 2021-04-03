import React from 'react'
import ViewAgenda from './DefaultAgenda'
import ViewDay from './DefaultDay'
import ViewMonth from './DefaultMonth'
import ViewWeek from './DefaultWeek'
import ViewWorkWeek from './DefaultWorkWeek'

const getView = (viewMode, CustomViews) => {
  if (
    CustomViews &&
    Object.prototype.hasOwnProperty.call(CustomViews, viewMode)
  ) {
    return CustomViews[viewMode]
  } else if (viewMode === 'day') {
    return <ViewDay />
  } else if (viewMode === 'week') {
    return <ViewWeek />
  } else if (viewMode === 'wweek') {
    return <ViewWorkWeek />
  } else if (viewMode === 'month') {
    return <ViewMonth />
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
