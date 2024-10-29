// State type is for the states of fetching data from API
export type State = 'idle' | 'loading' | 'success' | 'error' | 'not-found'

export const StateOptions = Object.freeze({
  IDLE: 'idle',
  LOADING: 'loading',
  SUCCESS: 'success',
  ERROR: 'error',
  NOT_FOUND: 'not-found',
})