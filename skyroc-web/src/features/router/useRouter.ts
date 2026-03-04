import { useContext } from "react";

import type { RouterContextType } from "@/features/router/router";
import { RouterContext } from "@/features/router/router-context";

export function useRouter(): RouterContextType {
    const navigator = useContext(RouterContext);
    if (!navigator) {
        throw new Error("useRouter must be used within a RouterProvider");
    }
    return navigator;
}