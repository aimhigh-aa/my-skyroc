// 对reactrouter实例进行二次封装

import { createBrowserRouter ,createHashRouter} from 'react-router-dom'
import type { RouteObject ,  RouterNavigateOptions,To} from 'react-router-dom'
import Demo from '@/pages/Demo'
import Chart from '@/pages/Chart'
import Setting from '@/pages/Setting'
import User from '@/pages/User'
import {Layout} from '@/Layout'

// 1. 定义路由配置类型
const routerConfig = {
    routerMode:'hash', // 'browser' | 'hash'
    baseUrl:'/', // 基础路径
}

// 路由配置表
const routes = [
    {
            path: '/',
            element: <Layout />,
            handle: {
                title: '首页',
                icon: 'home-icon'      // 对应 SvgIcon 的 name
            },
            children: [
                {
                    path: '/user',
                    element: <User />,
                    handle: {
                        title: '用户管理',
                        icon: 'user-icon',
                        order: 1 // 对应你代码中的 sortRoutesByOrder
                    },
                },
                {
                    path: '/demo',
                    element: <Demo />,
                    handle: {
                        title: '示例页面',
                        icon: 'demo-icon',
                        order: 2
                    },
                },
                {
                    path: '/chart',
                    element: <Chart />,
                    handle: {
                        title: '图表分析',
                        icon: 'chart-icon',
                        order: 3
                    },
                },
                {
                    path: '/setting', // 建议统一写成 '/setting' 避免相对路径混淆
                    element: <Setting />,
                    handle: {
                        title: '系统设置',
                        icon: 'setting-icon',
                        order: 4
                    },
                }
            ]
    },
    {
        path: '*',
        element: <div>404</div>
    }
]
    
// 路由初始化函数
function initRouter(){
    const routerCreater = routerConfig.routerMode === 'hash' ? createHashRouter : createBrowserRouter;

    // 创建原生react-router实例
    const reactRouter = routerCreater(routes, { basename: routerConfig.baseUrl });

    return {
        reactRouter,
        // 预留一个重置方法
        resetRoutes: () => reactRouter._internalSetRoutes(routes)
    }

}

/**
 * 4. 导航器封装 (Navigator)
 * 作用：将分散的路由操作聚合
 */

function navigator(){
    const {reactRouter,resetRoutes} = initRouter();
    // 基础导航功能
    const push = (to: To, options?: RouterNavigateOptions) => {
        reactRouter.navigate(to, options);
    }
    const replace = (to: To, options?: RouterNavigateOptions) => {
        reactRouter.navigate(to, { ...options, replace: true });
    }
    const goBack = () => {
        reactRouter.navigate(-1);
    }

    // 状态获取功能（面包屑核心依赖）
    const getPathname = () => reactRouter.state.location.pathname;
    const getlocation = () => reactRouter.state.location;
    return {
        reactRouter,
        push,
        replace,
        goBack,
        resetRoutes,
        getPathname,
        getlocation
    }
}

export const router = navigator()

export type RouterContextType = ReturnType<typeof navigator>