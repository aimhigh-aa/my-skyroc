import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface InitialStateType {
  cacheRoutes: string[];
  removeCacheKey: string[] | string | null;
  routeHomePath: string;
}

const initialState: InitialStateType = {
  // 需要进行缓存的页面
  cacheRoutes: [],
  // 需要删除的缓存页面
  removeCacheKey: null,
  // 首页路由
  routeHomePath: "/",
};

export const routeSlice = createSlice({
  name: "route",
  initialState,
  reducers: {
    // 添加需要缓存的页面
    addCacheRoute: (state, { payload }: PayloadAction<string>) => {
      state.cacheRoutes.push(payload); //这里利用immer的特性，直接修改state
    },
    //重置为初始状态
    resetRouteStore: () => {
      return initialState;
    },
    // 设置缓存路由
    setCacheRoutes: (state, { payload }: PayloadAction<string[]>) => {
      state.cacheRoutes = payload;
    },
    //设置首页路由
    setHomePath: (state, { payload }: PayloadAction<string>) => {
      state.routeHomePath = payload;
    },
    // 设置需要删除的缓存页面
    setRemoveCacheKey: (
      state,
      { payload }: PayloadAction<InitialStateType["removeCacheKey"]>,
    ) => {
      state.removeCacheKey = payload;
    },
  },
  selectors: {
    // 获取需要缓存的页面
    selectCacheRoutes: (state) => state.cacheRoutes,
    // 获取需要删除的缓存页面
    selectRemoveCacheKey: (state) => state.removeCacheKey,
    // 获取首页路由
    selectHomePath: (state) => state.routeHomePath,
  },
});

//导出Action
export const {
  addCacheRoute,
  resetRouteStore,
  setCacheRoutes,
  setHomePath,
  setRemoveCacheKey,
} = routeSlice.actions;

//导出selector
export const { selectCacheRoutes, selectRemoveCacheKey, selectHomePath } = routeSlice.selectors;