export const UNDOABLE = 'RBC/UNDOABLE'
export const startUndoable = (action) => ({
  type: UNDOABLE,
  payload: { action }
})

export const UNDO = 'RBC/UNDO'
export const undo = () => ({
  type: UNDO
})

export const COMPLETE = 'RBC/COMPLETE'
export const complete = () => ({
  type: COMPLETE
})

export const START_OPTIMISTIC_MODE = 'RBC/START_OPTIMISTIC_MODE'
export const startOptimisticMode = () => ({
  type: START_OPTIMISTIC_MODE
})

export const STOP_OPTIMISTIC_MODE = 'RBC/STOP_OPTIMISTIC_MODE'
export const stopOptimisticMode = () => ({
  type: STOP_OPTIMISTIC_MODE
})
