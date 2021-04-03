import React, { cloneElement } from 'react'
import { Container } from '@material-ui/core'
import PropTypes from 'prop-types'
import CalendarToolbar from './CalendarToolbar'
import useViewMode from './viewMode/useViewMode'
import getView from './viewMode/getView'

/**
 * Default calendar view layer.
 *
 * The component includes a toolbar at the top which may be turned off by passing
 * false to `toolbar` prop or can be customized by passing a component
 * to `toolbar`.
 *
 *
 */
const CalendarView = ({ Toolbar, CustomViews, ...rest }) => {
  const { viewMode, setViewMode } = useViewMode()
  const View = getView(viewMode, CustomViews)
  return (
    <Container>
      {Toolbar ? <Toolbar setViewMode={setViewMode} /> : null}
      {cloneElement(View, rest)}
    </Container>
  )
}

CalendarView.propTypes = {
  /**
   * The toolbar to use at the top of the component.
   *
   * This property can be false, in which case there will be no top toolbar,
   * or you can pass your own component to replace the default toolbar.
   * See CalendarToolbar to help with writing a custom toolbar.
   */
  Toolbar: PropTypes.oneOfType([PropTypes.bool, PropTypes.func])
}

CalendarView.defaultProps = {
  Toolbar: CalendarToolbar
}

export default CalendarView
