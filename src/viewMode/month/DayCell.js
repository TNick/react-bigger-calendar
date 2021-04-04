import React, { useState } from 'react'
import getDate from 'date-fns/getDate'
import Chip from '@material-ui/core/Chip'
import Card from '@material-ui/core/Card'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'

const cardProps = {
  style: { width: '14%', height: '8rem' }
}

/**
 * A single cell in a month grid.
 */
export const DayCell = ({ day, inMonth, isCurrent, classes }) => {
  let className
  let badgeType
  if (isCurrent) {
    className = classes.selectedDay
    badgeType = 'primary'
  } else if (inMonth) {
    className = classes.activeDay
    badgeType = 'secondary'
  } else {
    className = classes.inactiveDay
    badgeType = 'default'
  }

  const [raised, setRaised] = useState(false)
  const nowIsRaised = () => setRaised(true)
  const nowIsNotRaised = () => setRaised(false)

  return (
    <Card
      bgcolor={inMonth ? 'background.default' : 'background.paper'}
      {...cardProps}
      className={className}
      variant='outlined'
      raised={raised}
      onMouseOver={nowIsRaised}
      onMouseOut={nowIsNotRaised}
    >
      <Chip
        label={getDate(day)}
        color={badgeType}
        size='small'
        variant={raised ? 'default' : 'outlined'}
      />
      <Grid
        container
        direction='column'
        justify='flex-start'
        alignItems='stretch'
        spacing={0}
      >
        <Grid key='123' zeroMinWidth item style={{ backgroundColor: 'blue' }}>
          <Typography variant='body2' noWrap>
            123456 123456 123456 123456 123456
          </Typography>
        </Grid>
        <Grid key='124' zeroMinWidth item style={{ backgroundColor: 'red' }}>
          <Typography variant='caption' noWrap>
            123456 123456 123456 123456 123456
          </Typography>
        </Grid>
        <Grid key='125' zeroMinWidth item style={{ backgroundColor: 'green' }}>
          <Typography variant='caption' noWrap />
        </Grid>
      </Grid>
    </Card>
  )
}
// <div style={{width: "100%", backgroundColor: "blue"}}>123</div>
// <div>123</div>
// <div>123</div>
