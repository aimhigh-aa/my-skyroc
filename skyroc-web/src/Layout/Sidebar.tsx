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

export function Sidebar({collapsed}: { collapsed: boolean }) {
  type MenuItem = Required<MenuProps>["items"][number];

  const items: MenuItem[] = [
    {
      key: "/user",
      icon: <PieChartOutlined />,
      label: "用户",
    },
    {
      key: "/demo",
      icon: <DesktopOutlined />,
      label: "Demo",
    },
    {
      key: "/chart",
      icon: <ContainerOutlined />,
      label: "图表",
    },
    {
      key: "/setting",
      icon: <MailOutlined />,
      label: "设置",
      children: [
        { key: "5", label: "Option 5" },
        { key: "6", label: "Option 6" },
        { key: "7", label: "Option 7" },
        { key: "8", label: "Option 8" },
      ],
    },
  ];

  const navigate = useNavigate();

  const handleMenuClick: MenuProps["onClick"] = (e) => {
    navigate(e.key);
  };

  return (
    <>
      <div >
        <SidebarHead collapsed={collapsed}/>
        <Menu
          className="h-screen"
          items={items}
          defaultSelectedKeys={["1"]}
          defaultOpenKeys={["sub1"]}
          onClick={handleMenuClick}
          mode="inline"
          inlineCollapsed={collapsed}
        ></Menu>
      </div>
    </>
  );
}
