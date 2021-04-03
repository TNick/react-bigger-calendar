import React, { useCallback, useMemo } from 'react'
import Toolbar from '@material-ui/core/Toolbar'
import Button from '@material-ui/core/Button'
import ButtonGroup from '@material-ui/core/ButtonGroup'
import Typography from '@material-ui/core/Typography'
import Box from '@material-ui/core/Box'
import { useButton } from '@react-aria/button'
import useViewMode from './viewMode/useViewMode'
import useTranslate from './i18n/useTranslate'

const ViewModeButton = ({
  viewMode,
  onClick,
  myViewMode,
  translate,
  ...rest
}) => {
  const ref = React.useRef()
  const { buttonProps } = useButton(rest, ref)

  return (
    <Button
      {...buttonProps}
      {...rest}
      color={viewMode === myViewMode ? 'primary' : 'inherit'}
      data-payload={myViewMode}
      onClick={onClick}
      ref={ref}
    >
      {translate(`rbc.tb.${myViewMode}`)}
    </Button>
  )
}

/**
 * Controls the data used by the calendar
 */
const CalendarToolbar = ({ CustomViews }) => {
  const translate = useTranslate()
  const { viewMode, setViewMode } = useViewMode()
  const onClick = useCallback(
    (event) => {
      setViewMode(event.currentTarget.dataset.payload)
    },
    [setViewMode]
  )

  // Create a list of buttons for each view mode.
  const viewModeButtons = useMemo(() => {
    const result = {}
    const commonProps = {
      viewMode,
      onClick,
      translate
    }
    if (CustomViews) {
      Object.keys(CustomViews).forEach((key) => {
        result[key] = (
          <ViewModeButton key={key} myViewMode={key} {...commonProps} />
        )
      })
    }
    if (!Object.prototype.hasOwnProperty.call(result, 'week')) {
      result.week = (
        <ViewModeButton key='week' myViewMode='week' {...commonProps} />
      )
    }
    if (!Object.prototype.hasOwnProperty.call(result, 'wweek')) {
      result.wweek = (
        <ViewModeButton key='wweek' myViewMode='wweek' {...commonProps} />
      )
    }
    if (!Object.prototype.hasOwnProperty.call(result, 'day')) {
      result.day = (
        <ViewModeButton key='day' myViewMode='day' {...commonProps} />
      )
    }
    if (!Object.prototype.hasOwnProperty.call(result, 'agenda')) {
      result.agenda = (
        <ViewModeButton key='agenda' myViewMode='agenda' {...commonProps} />
      )
    }
    return Object.keys(result).map((key) => result[key])
  }, [CustomViews, viewMode, setViewMode])

  return (
    <Toolbar>
      <Box display='flex' flexGrow={1}>
        <ButtonGroup size='small' aria-label='navigation buttons'>
          <Button color='inherit'>{translate(`rbc.tb.prev`)}</Button>
          <Button color='inherit'>{translate(`rbc.tb.today`)}</Button>
          <Button color='inherit'>{translate(`rbc.tb.next`)}</Button>
        </ButtonGroup>
      </Box>
      <Box display='flex' flexGrow={1}>
        <Typography variant='h6' color='inherit'>
          This is going to be a tunnel
        </Typography>
      </Box>
      <ButtonGroup size='small' aria-label='view mode buttons'>
        {viewModeButtons}
      </ButtonGroup>
    </Toolbar>
  )
}

export default CalendarToolbar
