import { useRouter } from "@/features/router/useRouter";
import type { MenuProps } from 'antd';
import { selectTabs, selectActivateKey, setActivateTab, removeTab, closeAllTabs, closeOtherTabs } from "@/features/tab/tabStore";
import { CloseOutlined, ReloadOutlined } from '@ant-design/icons';
import { useAppSelector, useAppDispatch } from "@/store";
import { Tabs, Dropdown } from 'antd';
import { useEffect } from "react";
import * as AntdIcons from  '@ant-design/icons'
import React from "react";

export function TabBar() {
    const tabs = useAppSelector(selectTabs);
    const activateKey = useAppSelector(selectActivateKey);
    const dispatch = useAppDispatch();
    const router = useRouter();
    const { push } = router;

    useEffect(() => {
        router.push(activateKey);
    }, [activateKey])



    const handelTabClick = (key: string) => {
        console.log('点击',tabs);
        dispatch(setActivateTab(key));
        push(key);
    }

    // TabBar.tsx
    const handleRemove = (targetKey: string) => {
        
        dispatch(removeTab(targetKey));  // 再删除
    };



    // 右键菜单
    const getContextMenu = (tabKey: string): MenuProps['items'] => [
        {
            key: 'reload',
            label: '刷新',
            icon: <ReloadOutlined />,
            onClick: () => window.location.reload(),
        },
        {
            key: 'close',
            label: '关闭',
            icon: <CloseOutlined />,
            disabled: !tabs.find(t => t.key === tabKey)?.closable,
            onClick: ({ domEvent }) => {
                //  阻止事件冒泡到 Tabs 容器，防止触发 onTabClick
                domEvent.stopPropagation(); 
                handleRemove(tabKey);
            },
        },
        {
            key: 'closeOther',
            label: '关闭其他',
            onClick: ({domEvent}) => {
                domEvent.stopPropagation(); 
                dispatch(closeOtherTabs(tabKey))
            },
        },
        {
            key: 'closeAll',
            label: '关闭所有',
            onClick: ({domEvent}) => {
                domEvent.stopPropagation(); 
                dispatch(closeAllTabs());
                
            },
        },
    ];
    const tabItems = tabs.map(t => {
        const icon = (  AntdIcons as any )[t.icon]
        return {
            key: t.key,
            label: (<Dropdown menu={{ items: getContextMenu(t.key) }} trigger={['contextMenu']}>
                <span>{t.title}</span>
            </Dropdown>),
            icon: icon ? React.createElement((AntdIcons as any)[t.icon], { style: { fontSize: "15px" } }) : null,
            closable: t.title === '首页'?false:true,

        }
    })


    return (
        <div >
            <Tabs type='editable-card' items={tabItems} activeKey={activateKey} onTabClick={handelTabClick} onEdit={(targetKey, action) => {
                if (action === 'remove') {
                    handleRemove(targetKey as string)
                }
            }} hideAdd className="px-4 custom-tabs"></Tabs>
        </div>
    )

}