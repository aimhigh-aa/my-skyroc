import React, { use, useState } from "react";
import { Menu, Button, Collapse } from "antd";
import type { MenuProps } from "antd";
import {
  AppstoreOutlined,
  ContainerOutlined,
  DesktopOutlined,
  MailOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  PieChartOutlined,
} from "@ant-design/icons";
import type MenuItem from "antd/es/menu/MenuItem";
import { icons } from "antd/es/image/PreviewGroup";
import { SidebarHead } from "./components/SidebarHead";
import { useNavigate } from "react-router-dom";
import {useMixMenuContext} from "../features/menu/MenuContext";

export function Sidebar({collapsed}: { collapsed: boolean }) {
    const { allMenus, selectKey } = useMixMenuContext();  

  //todo 取消硬编码
  // 1. 直接从上下文获取计算好的全量菜单
  // 这里的 allMenus 已经是经过 MenuUtil 过滤、排序、翻译后的结果了
  // const { allMenus, selectKey } = useMixMenuContext();
  // const items: MenuItem[] = [
  //   {
  //     key: "/user",
  //     icon: <PieChartOutlined />,
  //     label: "用户",
  //   },
  //   {
  //     key: "/demo",
  //     icon: <DesktopOutlined />,
  //     label: "Demo",
  //   },
  //   {
  //     key: "/chart",
  //     icon: <ContainerOutlined />,
  //     label: "图表",
  //   },
  //   {
  //     key: "/setting",
  //     icon: <MailOutlined />,
  //     label: "设置",
  //     children: [
  //       { key: "5", label: "Option 5" },
  //       { key: "6", label: "Option 6" },
  //       { key: "7", label: "Option 7" },
  //       { key: "8", label: "Option 8" },
  //     ],
  //   },
  // ];

  const navigate = useNavigate();

  const handleMenuClick= (e:any) => {
    navigate(e.key);
  };

  return (
    <>
      <div >
        <SidebarHead collapsed={collapsed}/>
        <Menu
          className="h-screen"
          items={allMenus as any}
          selectedKeys={selectKey}
          // onClick={handleMenuClick} //menu通过link实现跳转
          mode="inline"
          inlineCollapsed={collapsed}
        ></Menu>
      </div>
    </>
  );
}
