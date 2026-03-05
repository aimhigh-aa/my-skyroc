import { use, type FC, type PropsWithChildren } from "react";
import { useRoute } from "../router/useRoute";
import { useRouter } from "../router/useRouter";
import { filterRoutesToMenus, getSelectKey } from "./MenuUtil";
import { useMemo } from "react";
import { MixMenuContext } from "./MenuContext";

export const MenuProvider: FC<PropsWithChildren> = ({ children }) => {
  const route = useRoute();
  const router = useRouter();

  // 1. 生成完整的菜单树（面包屑和侧边栏共用）
  const menus = useMemo(
    () => filterRoutesToMenus(router.reactRouter.routes),
    [router.reactRouter.routes],
  );

  // 2. 获取当前路由匹配的菜单 Key (侧边栏高亮用)
  const selectKey = useMemo(() => getSelectKey(route), [route]);

  // 3. 构造 Context
    const menuContext = {
        allMenus:menus,
        selectKey,
        route,
    }

    return <MixMenuContext value={menuContext}>{children}</MixMenuContext>;
};


