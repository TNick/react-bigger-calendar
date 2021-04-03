export const REFRESH_VIEW = 'RA/REFRESH_VIEW'

export const refreshView = () => ({
  type: REFRESH_VIEW
})

export const SET_AUTOMATIC_REFRESH = 'RA/SET_AUTOMATIC_REFRESH'

export const setAutomaticRefresh = (enabled) => ({
  type: SET_AUTOMATIC_REFRESH,
  payload: enabled
})
