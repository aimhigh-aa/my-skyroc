import type { RouteObject } from "react-router-dom";
import * as Icons from "@ant-design/icons"; // 导入所有图标
import React from "react";

/**
 * 根据权限路由列表生成菜单数据
 * * @param routes 路由对象数组 (React Router 格式)
 * @returns 过滤并转换后的菜单树数组
 */

export function filterRoutesToMenus(routes: RouteObject[]) {
  // 先根据 handle?.order 对路由做排序
  const sortedRoutes = sortRoutesByOrder(routes);
  const menus: App.Global.Menu[] = [];
  for (const route of sortedRoutes) {
    //场景1：标准的菜单项，条件：拥有路径(path)
    if (route.path) {
        // 直接转换当前路由为菜单项
      const newNode = getGlobalMenuByBaseRoute(route);
         // 如果当前路由有子路由，则递归处理子路由
      if (route.children && route.children.length) {
        const filteredChildren = filterRoutesToMenus(route.children);

        if (filteredChildren?.length) {
          newNode.children = filteredChildren;
        }
      }
      menus.push(newNode);
    }else if(route.children && route.children.length){
        // 场景2：路由本身不具备 path，但有子路由（比如纯容器路由），条件：没有路径(path)但有子路由
        menus.push(...filterRoutesToMenus(route.children));
        // 如果既没有 path 也没有 children，则该节点直接被过滤掉
    }
  }
  return menus;
}

// 根据 handle.order 对第一层路由进行排序
export function sortRoutesByOrder(routes: RouteObject[]) {
  routes.sort((next, prev) => {
    return Number(next.handle?.order || 0) - Number(prev.handle?.order || 0);
  });
  routes.forEach(sortRouteByOrder);
  return routes;
}

// 递归排序后代路由
export function sortRouteByOrder(route: RouteObject) {
  if (route.children?.length) {
    route.children.sort(
      (next, prev) =>
        (Number(next.handle?.order) || 0) - (Number(prev.handle?.order) || 0),
    );
    route.children.forEach((child) => sortRouteByOrder(child));
  }
  return route;
}

//通过单个route得到单个menu
export function getGlobalMenuByBaseRoute(route: RouteObject): App.Global.Menu {
  const { path } = route;
  const { icon = import.meta.env.VITE_MENU_ICON, title } = route.handle ?? {};
  const label = title;
  const AntdIcon = (Icons as any)[icon];

  const menu: App.Global.Menu = {
    icon: AntdIcon
      ? React.createElement(AntdIcon, {
          style: { fontSize: "18px" },
        })
      : null,
    key: path || "",
    label: (
      <span
        title={label}
        style={{
          overflow: "hidden",
          textOverflow: "ellipsis",
          whiteSpace: "nowrap",
        }}
      >
        {label}
      </span>
    ),
    title: label,
  };

  return menu;
}
