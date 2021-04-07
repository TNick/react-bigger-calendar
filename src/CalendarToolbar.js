import React, { useCallback, useMemo } from 'react'
import Toolbar from '@material-ui/core/Toolbar'
import Button from '@material-ui/core/Button'
import ButtonGroup from '@material-ui/core/ButtonGroup'
import Typography from '@material-ui/core/Typography'
import Box from '@material-ui/core/Box'
import { useButton } from '@react-aria/button'
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft'
import ChevronRightIcon from '@material-ui/icons/ChevronRight'
import TodayIcon from '@material-ui/icons/Today'
import ViewWeekIcon from '@material-ui/icons/ViewWeek'
import WorkIcon from '@material-ui/icons/Work'
import ViewDayIcon from '@material-ui/icons/ViewDay'
import ViewAgendaIcon from '@material-ui/icons/ViewAgenda'
import ViewMonthIcon from '@material-ui/icons/ViewModule'

import IconButton from '@material-ui/core/IconButton'
import { useTheme } from '@material-ui/core/styles'
import useMediaQuery from '@material-ui/core/useMediaQuery'

import useViewMode from './viewMode/useViewMode'
import useTranslate from './i18n/useTranslate'

const ViewModeButton = ({
  viewMode,
  onClick,
  myViewMode,
  translate,
  icon,
  uiBreakPointMd,
  ...rest
}) => {
  const ref = React.useRef()
  const { buttonProps } = useButton(rest, ref)

  if (uiBreakPointMd) {
    return (
      <Button
        {...buttonProps}
        {...rest}
        color={viewMode === myViewMode ? 'primary' : 'inherit'}
        data-payload={myViewMode}
        onClick={onClick}
        ref={ref}
        startIcon={icon}
        aria-label={translate(`rbc.tb.${myViewMode}`)}
      >
        {translate(`rbc.tb.${myViewMode}`)}
      </Button>
    )
  } else {
    return (
      <IconButton
        {...buttonProps}
        {...rest}
        color={viewMode === myViewMode ? 'primary' : 'inherit'}
        data-payload={myViewMode}
        onClick={onClick}
        ref={ref}
        aria-label={translate(`rbc.tb.${myViewMode}`)}
      >
        {icon}
      </IconButton>
    )
  }
}

const NavigateLarge = ({
  translate,
  navigateToPrevious,
  navigateToToday,
  navigateToNext
}) => {
  return (
    <Box display='flex' flexGrow={1}>
      <ButtonGroup size='small' aria-label='navigation buttons'>
        <Button
          onClick={navigateToPrevious}
          color='inherit'
          startIcon={<ChevronLeftIcon />}
        >
          {translate(`rbc.tb.prev`)}
        </Button>
        <Button onClick={navigateToToday} color='inherit'>
          {translate(`rbc.tb.today`)}
        </Button>
        <Button
          onClick={navigateToNext}
          color='inherit'
          endIcon={<ChevronRightIcon />}
        >
          {translate(`rbc.tb.next`)}
        </Button>
      </ButtonGroup>
    </Box>
  )
}

const NavigateSmall = ({
  translate,
  navigateToPrevious,
  navigateToToday,
  navigateToNext
}) => {
  return (
    <Box display='flex' flexGrow={1}>
      <ButtonGroup size='small' aria-label='navigation buttons'>
        <IconButton
          onClick={navigateToPrevious}
          color='inherit'
          aria-label={translate(`rbc.tb.prev`)}
        >
          <ChevronLeftIcon />
        </IconButton>
        <IconButton
          onClick={navigateToToday}
          color='inherit'
          aria-label={translate(`rbc.tb.today`)}
        >
          <TodayIcon />
        </IconButton>
        <IconButton
          onClick={navigateToNext}
          color='inherit'
          aria-label={translate(`rbc.tb.next`)}
        >
          <ChevronRightIcon />
        </IconButton>
      </ButtonGroup>
    </Box>
  )
}

/**
 * Controls the data used by the calendar
 */
const CalendarToolbar = ({ CustomViews }) => {
  const translate = useTranslate()
  const theme = useTheme()
  const uiBreakPointMd = useMediaQuery(theme.breakpoints.up('md'))
  const uiBreakPointSm = useMediaQuery(theme.breakpoints.up('sm'))

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
      translate,
      uiBreakPointMd
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
        <ViewModeButton
          key='month'
          myViewMode='month'
          icon={<ViewMonthIcon />}
          {...commonProps}
        />
      )
    }
    if (!Object.prototype.hasOwnProperty.call(result, 'week')) {
      result.week = (
        <ViewModeButton
          key='week'
          myViewMode='week'
          icon={<ViewWeekIcon />}
          {...commonProps}
        />
      )
    }
    if (!Object.prototype.hasOwnProperty.call(result, 'wweek')) {
      result.wweek = (
        <ViewModeButton
          key='wweek'
          myViewMode='wweek'
          icon={<WorkIcon />}
          {...commonProps}
        />
      )
    }
    if (!Object.prototype.hasOwnProperty.call(result, 'day')) {
      result.day = (
        <ViewModeButton
          key='day'
          myViewMode='day'
          icon={<ViewDayIcon />}
          {...commonProps}
        />
      )
    }
    if (!Object.prototype.hasOwnProperty.call(result, 'agenda')) {
      result.agenda = (
        <ViewModeButton
          key='agenda'
          myViewMode='agenda'
          icon={<ViewAgendaIcon />}
          {...commonProps}
        />
      )
    }

    // Discard the dictionary and return a list.
    return Object.keys(result).map((key) => result[key])
  }, [CustomViews, viewMode, setViewMode, uiBreakPointMd])

  return (
    <Toolbar disableGutters>
      {uiBreakPointMd ? (
        <NavigateLarge
          translate={translate}
          navigateToPrevious={navigateToPrevious}
          navigateToToday={navigateToToday}
          navigateToNext={navigateToNext}
        />
      ) : (
        <NavigateSmall
          translate={translate}
          navigateToPrevious={navigateToPrevious}
          navigateToToday={navigateToToday}
          navigateToNext={navigateToNext}
        />
      )}
      <Box display='flex' flexGrow={1}>
        {uiBreakPointSm ? (
          <Typography variant='h6' color='inherit'>
            This is going to be a tunnel
          </Typography>
        ) : null}
      </Box>
      <ButtonGroup size='small' aria-label='view mode buttons'>
        {viewModeButtons}
      </ButtonGroup>
    </Toolbar>
  )
}

// <Toolbar disableGutters>
//   <Grid
//     container
//     spacing={1}
//     justify='space-between'
//     alignItems='center'
//     direction='row'
//   >
//     <Grid item sm={12} md={4}>
//       <ButtonGroup size='small' aria-label='navigation buttons'>
//         <Button onClick={navigateToPrevious} color='inherit'>
//           {translate(`rbc.tb.prev`)}
//         </Button>
//         <Button onClick={navigateToToday} color='inherit'>
//           {translate(`rbc.tb.today`)}
//         </Button>
//         <Button onClick={navigateToNext} color='inherit'>
//           {translate(`rbc.tb.next`)}
//         </Button>
//       </ButtonGroup>
//     </Grid>
//     <Grid item sm={12} md={4}>
//       <Typography variant='h6' color='inherit'>
//         This is going to be a tunnel
//       </Typography>
//     </Grid>
//     <Grid item sm={12} md={4}>
//       <Grid container alignItems='center'>
//         <Grid item>
//           <ButtonGroup size='small' aria-label='view mode buttons'>
//             {viewModeButtons}
//           </ButtonGroup>
//         </Grid>
//       </Grid>
//     </Grid>
//   </Grid>
// </Toolbar>

export default CalendarToolbar
