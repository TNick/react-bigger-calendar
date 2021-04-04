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

  // Get the view controller properties.
  const {
    viewMode,
    setViewMode,
    navigateToPrevious,
    navigateToToday,
    navigateToNext
  } = useViewMode()

  // Handler for the buttons that change the view mode.
  const onViewModeClick = useCallback(
    (event) => {
      setViewMode(event.currentTarget.dataset.payload)
    },
    [setViewMode]
  )

  // Create a list of buttons for each view mode.
  const viewModeButtons = useMemo(() => {
    // We generate a dictionary at first to allow us to check if a certain
    // standard view has been set, then we convert it into a list
    // TODO: we should also allow for individual standard buttons to be hidden.
    const result = {}

    // Properties for all view mode buttons.
    const commonProps = {
      viewMode,
      onClick: onViewModeClick,
      translate
    }

    // First create buttons for custom views.
    if (CustomViews) {
      Object.keys(CustomViews).forEach((key) => {
        result[key] = (
          <ViewModeButton key={key} myViewMode={key} {...commonProps} />
        )
      })
    }

    // Then create standard buttons if not already defined.
    if (!Object.prototype.hasOwnProperty.call(result, 'month')) {
      result.month = (
        <ViewModeButton key='month' myViewMode='month' {...commonProps} />
      )
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

    // Discard the dictionary and return a list.
    return Object.keys(result).map((key) => result[key])
  }, [CustomViews, viewMode, setViewMode])

  return (
    <Toolbar>
      <Box display='flex' flexGrow={1}>
        <ButtonGroup size='small' aria-label='navigation buttons'>
          <Button onClick={navigateToPrevious} color='inherit'>
            {translate(`rbc.tb.prev`)}
          </Button>
          <Button onClick={navigateToToday} color='inherit'>
            {translate(`rbc.tb.today`)}
          </Button>
          <Button onClick={navigateToNext} color='inherit'>
            {translate(`rbc.tb.next`)}
          </Button>
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
