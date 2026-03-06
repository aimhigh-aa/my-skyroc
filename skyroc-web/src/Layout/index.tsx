import { MenuProvider } from "@/features/menu/MenuProvider";
import { TabBarProvider } from "@/features/tab/TabBarProvider";
import { Layout as AntLayout } from "antd";
import { useState } from "react";
import { Outlet } from "react-router-dom";
import { Header } from "./Header";
import { Sidebar } from "./Sidebar";
import { TabBar } from "./TabBar";

const { Sider, Header:AntHeader, Content } = AntLayout;

//利用antd的layout组件实现页面的整体布局
export function Layout() {
  const [collapsed, setCollapsed] = useState(false);
  return (
    <>
      <MenuProvider>
        <TabBarProvider>
          <AntLayout style={{ background: "transparent"}}>
            <Sider collapsed={collapsed}>
              <Sidebar collapsed={collapsed} />
            </Sider>
            <AntLayout  style={{  padding: 0,width:'100vw',  }}  >
              <AntHeader style={{ padding: 0 ,width:'100%',background: 'transparent',}} >
                <Header collapsed={collapsed} onToggle={() => setCollapsed(!collapsed)} />
              </AntHeader>
              <TabBar />
              <Content>
                <Outlet />
              </Content>
            </AntLayout>
          </AntLayout>
        </TabBarProvider>
      </MenuProvider>
    </>
  );
}
