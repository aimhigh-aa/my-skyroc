import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { current } from '@reduxjs/toolkit';
import type { Slice } from "@reduxjs/toolkit";
export interface Tab {
  key: string;
  title: string;
  icon?: any;
  closable: boolean; //是否可关闭，首页不可关闭
}

export interface TabState {
  tabs: Tab[]; //打开的标签
  activateKey: string; //当前激活的标签
  hoomTab: string; //首页标签
}

const initialState: TabState = {
  tabs: [],
  activateKey: "/",
  hoomTab: "/",
};

export const tabSlice = createSlice({
  name: "tab",
  initialState,
  reducers: {
    //添加标签，如果已存在则激活
    addTab(state, action: PayloadAction<Tab>) {
      const exitindex = state.tabs.findIndex(
        (t) => t.key === action.payload.key,
      );

      if (exitindex === -1) {
        state.tabs.push(action.payload);
      } 
      state.activateKey = action.payload.key;

    },
    //删除标签
    removeTab(state, action: PayloadAction<string>) {
      const targetIndex = state.tabs.findIndex((t) => t.key === action.payload);
      if (targetIndex === -1) return;
      state.tabs.splice(targetIndex, 1);
      

      //如果删除的是激活标签，需要切换到相邻标签
      if (state.activateKey === action.payload) {
        
        //优先激活右侧标签
        state.activateKey =
          state.tabs[targetIndex]?.key ||
          state.tabs[targetIndex - 1]?.key ||
          state.hoomTab;
      }
    },
    //设置激活标签
    setActivateTab(state, action: PayloadAction<string>) {
      state.activateKey = action.payload;
    },
    //关闭其他标签
    closeOtherTabs(state, action: PayloadAction<string>) {
        state.tabs = state.tabs.filter(t=>t.key === action.payload || t.key === state.hoomTab);
        state.activateKey = action.payload;
    },
    //关闭所有标签,保留首页
    closeAllTabs(state){
        state.tabs = state.tabs.filter(t=>t.key === state.hoomTab);
        console.log('关闭所有后',state.tabs)
        state.activateKey = state.hoomTab;
    },
    //初始化首页标签
    initHomeTab(state,action:PayloadAction<Tab>){
        state.hoomTab = action.payload.key;
        if(state.tabs.length === 0){
            state.tabs.push(action.payload);
            state.activateKey = action.payload.key;
        }
    }
  },
  selectors:{
    selectTabs:(state) => state.tabs,
    selectActivateKey:(state) => state.activateKey,
  }
});


export const {addTab,removeTab,setActivateTab,closeOtherTabs,closeAllTabs,initHomeTab} = tabSlice.actions;
export const {selectTabs,selectActivateKey} = tabSlice.selectors;
