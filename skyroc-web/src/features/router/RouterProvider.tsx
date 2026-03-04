import { RouterProvider as Provider } from "react-router-dom";
import {router} from './router'
import { RouterContext } from "@/features/router/router-context";

export function RouterProvider(){
    return (
        <RouterContext.Provider value={router}>
            <Provider router={router.reactRouter} />
        </RouterContext.Provider>
    )
}