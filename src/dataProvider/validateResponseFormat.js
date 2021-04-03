import {
  fetchActionsWithRecordResponse,
  fetchActionsWithArrayOfIdentifiedRecordsResponse,
  fetchActionsWithArrayOfRecordsResponse,
  fetchActionsWithTotalResponse
} from './dataFetchActions'

/**
 * Checks the shape of the reply and throws an error if it does not fit.
 *
 * This check helps the user make sure that the result data
 * is of the expected shape, thus helping to pinpoint errors.
 *
 * @param {*} response The object returned by the data provider.
 * @param {string} type The name of the method that was invoked
 * @param {func} logger Where to log errors.
 */
function validateResponseFormat(
  response,
  type,
  logger = console.error // eslint-disable-line no-console
) {
  if (!response) {
    logger(`The dataProvider returned an empty response for '${type}'.`)
    throw new Error('rbc.notification.data_provider_error')
  }

  if (!Object.prototype.hasOwnProperty.call(response, 'data')) {
    logger(
      `The response to '${type}' must be like { data: ... }, ` +
        `but the received response does not have a 'data' key. ` +
        `The dataProvider is probably wrong for '${type}'.`
    )
    throw new Error('rbc.notification.data_provider_error')
  }

  if (
    fetchActionsWithArrayOfRecordsResponse.includes(type) &&
    !Array.isArray(response.data)
  ) {
    logger(
      `The response to '${type}' must be like { data : [...] }, ` +
        `but the received data is not an array. ` +
        `The dataProvider is probably wrong for '${type}'`
    )
    throw new Error('rbc.notification.data_provider_error')
  }

  if (
    fetchActionsWithArrayOfIdentifiedRecordsResponse.includes(type) &&
    Array.isArray(response.data) &&
    response.data.length > 0 &&
    !Object.prototype.hasOwnProperty.call(response, 'id')
  ) {
    logger(
      `The response to '${type}' must be like { data : [{ id: 123, ...}, ...] }, ` +
        `but the received data items do not have an 'id' key. ` +
        `The dataProvider is probably wrong for '${type}'`
    )
    throw new Error('rbc.notification.data_provider_error')
  }

  if (
    fetchActionsWithRecordResponse.includes(type) &&
    !Object.prototype.hasOwnProperty.call(response, 'id')
  ) {
    logger(
      `The response to '${type}' must be like { data: { id: 123, ... } }, ` +
        `but the received data does not have an 'id' key. ` +
        `The dataProvider is probably wrong for '${type}'`
    )
    throw new Error('rbc.notification.data_provider_error')
  }

  if (
    fetchActionsWithTotalResponse.includes(type) &&
    !Object.prototype.hasOwnProperty.call(response, 'total')
  ) {
    logger(
      `The response to '${type}' must be like  { data: [...], total: 123 }, ` +
        `but the received response does not have a 'total' key. ` +
        `The dataProvider is probably wrong for '${type}'`
    )
    throw new Error('rbc.notification.data_provider_error')
  }
}

export default validateResponseFormat
