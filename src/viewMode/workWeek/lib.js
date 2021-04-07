import startOfWeek from 'date-fns/startOfWeek'
import startOfToday from 'date-fns/startOfToday'
import endOfDay from 'date-fns/endOfDay'
import getDay from 'date-fns/getDay'
import addDays from 'date-fns/addDays'

/**
 * Compute the week interval that contains a certain date.
 *
 * @param {*} value The reference date we use to compute the interval
 * @returns
 */
export const workWeekIntervalFromDate = (value) => {
  // Make sure we have a valid value.
  if (!value) {
    value = startOfToday()
  }
  // 0 is always Sunday and 6 is always Saturday
  let intervalStart = startOfWeek(value)
  if (getDay(intervalStart) === 0) {
    intervalStart = addDays(intervalStart, 1)
  }
  // The work week is 5 days long
  return { start: intervalStart, end: endOfDay(addDays(intervalStart, 4)) }
}
