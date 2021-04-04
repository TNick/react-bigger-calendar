import addDays from 'date-fns/addDays'
import endOfMonth from 'date-fns/endOfMonth'
import getDay from 'date-fns/getDay'
import startOfMonth from 'date-fns/startOfMonth'
import startOfToday from 'date-fns/startOfToday'
import subDays from 'date-fns/subDays'

/**
 * Compute the week interval that contains a certain date.
 *
 * @param {*} value The reference date we use to compute the interval
 * @returns
 */
export const intervalFromDate = (value) => {
  // Make sure we have a valid value.
  if (!value) {
    value = startOfToday()
  }
  // Get the start of the month.
  const monthStart = startOfMonth(value)
  // Get the 0-6 index inside week of this day
  // then subtract that many days from month start to get the
  // interval we're going to present.
  const intervalStart = subDays(monthStart, getDay(monthStart) - 1)

  // Get the end of the month.
  const monthEnd = endOfMonth(value)
  // Get the 0-6 index inside week of this day
  const intervalEnd = addDays(monthEnd, 7 - getDay(monthEnd))

  return [
    { start: intervalStart, end: intervalEnd },
    { start: monthStart, end: monthEnd }
  ]
}
