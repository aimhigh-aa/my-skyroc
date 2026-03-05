import { Link, matchPath } from "react-router-dom";
import type { BreadcrumbProps } from "antd";

/**
 * 根据当前路由和菜单树生成 Ant Design Breadcrumb 的 items 数据
 * @param route 当前 useRoute 返回的路由状态 (包含 pathname 和 matched)
 * @param menus 经过 filterRoutesToMenus 处理后的全局菜单树
 * @returns Antd Breadcrumb 组件可以直接使用的 items 数组
 */
export function getBreadcrumbItems(
  route: any, // 建议替换为你项目中的 Router.Route 类型
  menus: App.Global.Menu[]
): BreadcrumbProps['items'] {
  const breadcrumbItems: any[] = [];
  
  // currentMenus 用于在递归/遍历过程中指向当前层级的子菜单
  let currentMenus = menus;

  /**
   * 逻辑说明：
   * route.matched 包含了从根路由到当前路由的所有匹配记录。
   * 我们通常跳过第 0 项（根/Layout层），从具体的业务页面开始展示。
   */
  for (let i = 0; i < route.matched.length; i++) {
    const matched = route.matched[i];
    
    // 1. 在当前层级的菜单中找到与路径匹配的那一项
    // 使用 matchPath 适配动态路由
    const currentMenu = currentMenus.find(item => 
    item?.key && matchPath({ path: item.key, end: true }, matched.pathname)
    );

    // 如果在菜单树中找不到对应的定义（比如某些隐藏路由），通常停止生成后续面包屑
    if (!currentMenu) break;

    // 2. 构造基础的面包屑节点
    const item: any = {
      key: currentMenu.key,
      // 这里的 title 可以包含图标和文字
      title: (
        <span>
          {currentMenu.icon}
          <span style={{ marginLeft: 8 }}>{currentMenu.title}</span>
        </span>
      ),
    };

    // 3. 处理下拉菜单 (Dropdown) 逻辑
    // 如果当前菜单有子项，我们希望点击面包屑旁边的三个点或箭头能看到子路由
    if (currentMenu.children && currentMenu.children.length > 0) {
      item.menu = {
        // 将子菜单转换成 Dropdown 要求的 items 格式
        items: currentMenu.children.map(child => {
          // 判断子项是否就是当前正处于激活状态的路径
          const isCurrentActive = !!matchPath({ path: child.key, end: true }, route.pathname);
          
          return {
            key: child.key,
            label: isCurrentActive 
              ? <span>{child.title}</span> // 当前页面不加 Link
              : <Link to={child.key}>{child.title}</Link>, // 其他页面加 Link 跳转
            icon: child.icon
          };
        }),
        // 让当前激活的子项在下拉列表中高亮
        selectedKeys: [route.pathname]
      };
    }

    breadcrumbItems.push(item);

    // 4. 重要：更新 currentMenus，指向下一层级，供下一次循环查找
    currentMenus = currentMenu.children || [];
  }

  return breadcrumbItems;
}