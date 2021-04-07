import startOfWeek from 'date-fns/startOfWeek'
import startOfToday from 'date-fns/startOfToday'
import endOfWeek from 'date-fns/endOfWeek'

/**
 * Compute the week interval that contains a certain date.
 *
 * @param {*} value The reference date we use to compute the interval
 * @returns
 */
export const weekIntervalFromDate = (value) => {
  // Make sure we have a valid value.
  if (!value) {
    value = startOfToday()
  }
  return { start: startOfWeek(value), end: endOfWeek(value) }
}
