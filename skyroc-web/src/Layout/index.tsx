import { Outlet } from "react-router-dom";
import React, { useState } from "react";
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
import { Sidebar } from "./Sidebar";

export function Layout() {
  return (
    <>
    <div className="flex">
      <Sidebar />
      <Outlet/>
    </div>
      
    </>
  );
}
