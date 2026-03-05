import { Button } from "antd";
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  ExceptionOutlined,
} from "@ant-design/icons";
import { Breadcrumb } from "antd";
import { useMixMenuContext } from "../features/menu/MenuContext";
import { getBreadcrumbItems } from "./breadCrumbShared";
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
    <div className="flex bg-white w-[full] items-center justify-between">
      <div className="flex items-center py-[10px]">
        <Button
          type="text"
          className="ml-[10px] mr-[20px]"
          onClick={onToggle}
          icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
        ></Button>
        <Breadcrumb items={breadItems} />

      </div>
    </div>
  );
}
