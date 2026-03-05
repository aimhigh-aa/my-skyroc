import { createContext, useContext } from "react";
import type { Router } from "react-router-dom";

export interface MenuContextType {
  allMenus: App.Global.Menu[];
  route: any;
  selectKey: string[];
}

export const MixMenuContext = createContext<MenuContextType>({
  allMenus: [],
  route: {},
  selectKey: [],
});


export function useMixMenuContext() {
  const context = useContext(MixMenuContext);

  if (!context) {
    throw new Error('useMixMenu must be used within a MixMenuContext');
  }

  return context ;
}