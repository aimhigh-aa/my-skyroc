import { Outlet } from "react-router-dom";
import React, { useState } from "react";
import { Menu, Button, Collapse } from "antd";
import type { MenuProps } from "antd";
import { Layout as AntLayout } from "antd";
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
import { Header } from "./Header";
import { Sidebar } from "./Sidebar";

const { Sider, Header:AntHeader, Content } = AntLayout;

//利用antd的layout组件实现页面的整体布局
export function Layout() {
  const [collapsed, setCollapsed] = useState(false);
  return (
    <>
      <AntLayout>
        <Sider collapsed={collapsed}>
          <Sidebar collapsed={collapsed} />
        </Sider>
        <AntLayout  style={{ background: '#fff', padding: 0,width:'100vw' }}  >
          <AntHeader style={{ background: '#fff', padding: 0 ,width:'100%'}} >
            <Header collapsed={collapsed} onToggle={() => setCollapsed(!collapsed)} />
          </AntHeader>
          <Content>
            <Outlet />
          </Content>
        </AntLayout>
      </AntLayout>
    </>
  );
}
