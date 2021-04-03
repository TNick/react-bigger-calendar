export const GET_LIST = 'GET_LIST'
export const GET_ONE = 'GET_ONE'
export const GET_MANY = 'GET_MANY'
export const GET_MANY_REFERENCE = 'GET_MANY_REFERENCE'
export const CREATE = 'CREATE'
export const UPDATE = 'UPDATE'
export const UPDATE_MANY = 'UPDATE_MANY'
export const DELETE = 'DELETE'
export const DELETE_MANY = 'DELETE_MANY'

export const fetchActionsWithRecordResponse = [
  'getEvent',
  'createEvent',
  'updateEvent'
]
export const fetchActionsWithArrayOfIdentifiedRecordsResponse = [
  'getEvents',
  'getManyEvents'
]
export const fetchActionsWithArrayOfRecordsResponse = [
  ...fetchActionsWithArrayOfIdentifiedRecordsResponse,
  'updateManyEvents',
  'deleteManyEvents'
]
export const fetchActionsWithTotalResponse = ['getEvents', 'getManyEvents']

/**
 * Retrieve the name of the method if one of the standard methods.
 *
 * If the method is not one of the standard methods then the original name
 * is returned.
 *
 * @param {string} fetchType The type of fetch to perform.
 * @returns {string} The name of the dataProvider method.
 */
export const sanitizeFetchType = (fetchType) => {
  switch (fetchType) {
    case GET_LIST:
      return 'getEvents'
    case GET_ONE:
      return 'getEvent'
    case GET_MANY:
      return 'getManyEvents'
    case CREATE:
      return 'createEvent'
    case UPDATE:
      return 'updateEvent'
    case UPDATE_MANY:
      return 'updateManyEvents'
    case DELETE:
      return 'deleteEvent'
    case DELETE_MANY:
      return 'deleteManyEvents'
    default:
      return fetchType
  }
}
