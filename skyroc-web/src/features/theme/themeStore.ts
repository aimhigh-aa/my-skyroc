import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";


type ThemeMode = "light" | "dark";

export interface ThemeState {
    mode: ThemeMode;
}

const initialState: ThemeState = {
    mode: (localStorage.getItem("themeMode") as ThemeMode) || "light",
};

export const themeSlice = createSlice({
    name: "theme",
    initialState,
    reducers: {
        //切换主题模式
        toggleThemeMode: (state) => {
            state.mode = state.mode === "light" ? "dark" : "light";
            //持久化
            localStorage.setItem("themeMode", state.mode);
        },
        //设置主题模式
        setThemeMode: (state, action: PayloadAction<ThemeMode>) => {
            state.mode = action.payload;
            //持久化
            localStorage.setItem("themeMode", state.mode);
        },
    },
    selectors: {
        selectThemeMode: (state) => state.mode
    }
});

export const {toggleThemeMode, setThemeMode} = themeSlice.actions
export const {selectThemeMode} = themeSlice.selectors