import React, { useCallback, useMemo } from 'react'
import Toolbar from '@material-ui/core/Toolbar'
import Button from '@material-ui/core/Button'
import ButtonGroup from '@material-ui/core/ButtonGroup'
import Typography from '@material-ui/core/Typography'
import Box from '@material-ui/core/Box'
import useViewMode from './viewMode/useViewMode'

const ViewModeButton = ({ viewMode, onClick, myViewMode, ...rest }) => {
  return (
    <Button
      {...rest}
      color={viewMode === myViewMode ? 'primary' : 'inherit'}
      data-payload={myViewMode}
      onClick={onClick}
    >
      {myViewMode}
    </Button>
  )
}

/**
 * Controls the data used by the calendar
 */
const CalendarToolbar = ({ CustomViews }) => {
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
    if (CustomViews) {
      Object.keys(CustomViews).forEach((key) => {
        result[key] = (
          <ViewModeButton
            key={viewMode}
            myViewMode={key}
            viewMode={viewMode}
            onClick={onClick}
          />
        )
      })
    }
    if (!Object.prototype.hasOwnProperty.call(result, 'week')) {
      result.week = (
        <ViewModeButton
          viewMode={viewMode}
          key='week'
          myViewMode='week'
          onClick={onClick}
        />
      )
    }
    if (!Object.prototype.hasOwnProperty.call(result, 'wweek')) {
      result.wweek = (
        <ViewModeButton
          viewMode={viewMode}
          key='wweek'
          myViewMode='wweek'
          onClick={onClick}
        />
      )
    }
    if (!Object.prototype.hasOwnProperty.call(result, 'day')) {
      result.day = (
        <ViewModeButton
          viewMode={viewMode}
          key='day'
          myViewMode='day'
          onClick={onClick}
        />
      )
    }
    if (!Object.prototype.hasOwnProperty.call(result, 'agenda')) {
      result.agenda = (
        <ViewModeButton
          viewMode={viewMode}
          key='agenda'
          myViewMode='agenda'
          onClick={onClick}
        />
      )
    }
    return Object.keys(result).map((key) => result[key])
  }, [CustomViews, viewMode, setViewMode])

  return (
    <Toolbar>
      <Box display='flex' flexGrow={1}>
        <ButtonGroup size='small' aria-label='navigation buttons'>
          <Button color='inherit'>Previous</Button>
          <Button color='inherit'>Today</Button>
          <Button color='inherit'>Next</Button>
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
