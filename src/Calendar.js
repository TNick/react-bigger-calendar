import React from 'react'
import PropTypes from 'prop-types'

import CalendarContext from './CalendarContext'
import CalendarView from './CalendarView'

/**
 * Main calendar component.
 *
 * The component includes a toolbar at the top (may be turned off by passing
 * false to `toolbar` prop or can be customized by passing a component
 * to `toolbar`).
 *
 * The component simply passes provided properties to the context
 * and view components. You can use these components directly in
 * your code if you need more control.
 */
const Calendar = ({
  CustomViews,
  dataProvider,
  i18nProvider,
  initialCurrentDate,
  initialStartDate,
  initialViewMode,
  Toolbar,
  theme
}) => {
  return (
    <CalendarContext
      dataProvider={dataProvider}
      i18nProvider={i18nProvider}
      initialCurrentDate={initialCurrentDate}
      initialStartDate={initialStartDate}
      initialViewMode={initialViewMode}
      theme={theme}
    >
      <CalendarView Toolbar={Toolbar} CustomViews={CustomViews} />
    </CalendarContext>
  )
}

Calendar.propTypes = {
  /**
   * The object used to retrieve events.
   */
  dataProvider: PropTypes.object.isRequired,

  /**
   * The object providing translations.
   */
  i18nProvider: PropTypes.object.isRequired,

  /**
   * The toolbar to use at the top of the component.
   *
   * This property can be false, in which case there will be no top toolbar,
   * or you can pass your own component to replace the default toolbar.
   * See CalendarToolbar to help with writing a custom toolbar.
   */
  Toolbar: PropTypes.oneOfType([PropTypes.bool, PropTypes.object])
}

// Calendar.defaultProps = {
//   toolbar: undefined
// }

export default Calendar
