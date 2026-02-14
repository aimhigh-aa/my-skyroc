import {createBrowserRouter} from 'react-router-dom'
import Demo from '@/pages/Demo'
import Chart from '@/pages/Chart'
import Setting from '@/pages/Setting'
import User from '@/pages/User'
import {Layout} from '@/Layout'


export const router = createBrowserRouter([
    {
        path:'/',
        element:<Layout/>,
        children:[
            {
                path:'/user',
                element:<User/>,
            },
            {
                path:'/demo',
                element:<Demo/>,
            },
            {
                path:'/chart',
                element:<Chart/>,
            },
            {
                path:'setting',
                element:<Setting/>,
            }
        ]
    },
    {
        path:'*',
        element:<div>404</div>
    }
])