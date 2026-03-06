import { Button } from "antd";
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  SearchOutlined,
  FullscreenOutlined
} from "@ant-design/icons";
import { Breadcrumb } from "antd";
import { useMixMenuContext } from "../features/menu/MenuContext";
import { getBreadcrumbItems } from "./breadCrumbShared";
import { ButtonIcon } from "./components/ButtonIcons";
import { FullScreen } from "./components/FullScreen";
import { ThemeSchemaSwitch } from "@/features/theme";
export function Header({
  onToggle,
  collapsed,
}: {
  onToggle: () => void;
  collapsed: boolean;
}) {

  //   {
  //     title: "Home",
  //   },
  //   {
  //     title: <a href="">Application Center</a>,
  //   },
  //   {
  //     title: <a href="">Application List</a>,
  //   },
  //   {
  //     title: "An Application",
  //   },
  // ];

  const {allMenus, route} = useMixMenuContext();
  const breadItems = getBreadcrumbItems(route, allMenus);


  return (
    <div className="flex h-full   w-[full] items-center justify-between  bg-container text-base-text transition-300">
      {/* 菜单按钮*/}
      <div className="flex items-center py-[10px]">
        <Button
          type="text"
          className="ml-[10px] mr-[20px]"
          onClick={onToggle}
          icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
        ></Button>
        <Breadcrumb items={breadItems} />
      </div>
      {/* 功能按钮*/}
      <div className="felx items-center gap-2">
        <ButtonIcon tooltipContent="搜索">
          <SearchOutlined style={{ fontSize: "15px"}} />
        </ButtonIcon>
        {/* 全屏 */}
        <FullScreen />
        {/* 主题切换 */}
        <ThemeSchemaSwitch/>
      </div>
    </div>
  );
}
