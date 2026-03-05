// src/store/index.ts

import { routeSlice } from '@/router/routeStore'
import { tabSlice } from '@/features/tab/tabStore'
import { combineSlices, configureStore } from '@reduxjs/toolkit'
import { useDispatch, useSelector } from 'react-redux' // 新增

// 利用redux toolkit 2.0的新特性combineSlices合并reducer
const rootReducer = combineSlices(routeSlice,tabSlice) 

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, // 因为可能存储 ReactNode (如 icon)
    }),
})

// 导出类型
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

// 导出类型安全的 hooks
export const useAppDispatch = useDispatch.withTypes<AppDispatch>()
export const useAppSelector = useSelector.withTypes<RootState>()