import { combineReducers } from '@reduxjs/toolkit'
import authSlice from './authSlice'
import { authApi } from './api/authApi'

const rootReducers = combineReducers({
  [authApi.reducerPath]:authApi.reducer,
  authSlice:authSlice
})

export default rootReducers;