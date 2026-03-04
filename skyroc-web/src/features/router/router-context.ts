import {createContext} from "react";
import type {RouterContextType} from "@/features/router/router";

export const RouterContext = createContext<RouterContextType | null>(null)