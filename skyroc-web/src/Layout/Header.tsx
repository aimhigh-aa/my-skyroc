import { Button } from "antd";
import { MenuUnfoldOutlined, MenuFoldOutlined,ExceptionOutlined   } from "@ant-design/icons";
import {Dropdown ,Space , Typography } from 'antd'
import type { MenuProps} from "antd";


export function Header({
  onToggle,
  collapsed,
}: {
  onToggle: () => void;
  collapsed: boolean;
}) {

const items:MenuProps['items'] = [
    {
      key: '1',
      label: '选项1',
    },
    {
      key: '2',
      label: '选项2',
    },
  ];

  return (
    <div className="flex bg-red-400 w-[full] items-center justify-between">
    <div>
        <Button
        type="text"
        className="ml-[10px] mr-[20px]"
        onClick={onToggle}
        icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
      ></Button>
      <Dropdown menu={{items,selectable:true,defaultSelectedKeys:["1"]}} >
        <Typography.Link style={{color:"#f0f0f0"}}>
            <Space>
                <ExceptionOutlined />
                异常页
            </Space>
        </Typography.Link>
           
      </Dropdown>
    </div>
      
      
    </div>
  );
}
