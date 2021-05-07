import { combineReducers } from '@reduxjs/toolkit'
import { reducer as jokesReducer } from '../slices/jokes'

const rootReducer = combineReducers({
  jokes: jokesReducer
})

// eslint-disable-next-line no-undef
export type RootState = ReturnType<typeof rootReducer>

export default rootReducer
