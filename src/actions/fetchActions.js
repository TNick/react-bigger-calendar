export const FETCH_START = 'RBC/FETCH_START'
export const fetchStart = () => ({ type: FETCH_START })

export const FETCH_END = 'RBC/FETCH_END'
export const fetchEnd = () => ({ type: FETCH_END })

export const FETCH_ERROR = 'RBC/FETCH_ERROR'
export const fetchError = () => ({ type: FETCH_ERROR })

export const FETCH_CANCEL = 'RBC/FETCH_CANCEL'
export const fetchCancel = () => ({ type: FETCH_CANCEL })
