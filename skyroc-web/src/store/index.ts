import {routeSlice} from '@/router/routeStore'
import { combineSlices ,configureStore} from '@reduxjs/toolkit'



//利用redux toolkit 2.0的新特性combineSlices合并reduser
const rootReducer = combineSlices(routeSlice) 

export const store = configureStore({
  reducer: rootReducer,
})