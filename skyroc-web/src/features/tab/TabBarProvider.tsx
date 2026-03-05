import {useEffect,useRef} from 'react';
import type {FC , PropsWithChildren} from 'react'
import { useAppDispatch } from '@/store';
import { useRoute } from '../router/useRoute';
import { useMixMenuContext } from '../menu/MenuContext';
import { initHomeTab , addTab } from './tabStore';


export const TabBarProvider: FC<PropsWithChildren> = ({children}) => {
    const route = useRoute();
    const dispatch = useAppDispatch();
    const {allMenus} = useMixMenuContext();
    const lastAddedRef = useRef<string>('')

    //初始化首页标签
    useEffect(()=>{
        const homeMenu = allMenus.find(m=>m.key === '/');
        if(homeMenu){
            dispatch(initHomeTab({
                key: homeMenu.key,
                title: homeMenu.title || '首页',
                icon: homeMenu.icon,
                closable: false, // 首页不可关闭
            }))
        }
    },[allMenus,dispatch])

    //监听路由变化，自动添加标签
    useEffect(()=>{
        const {pathname , currentHandle} = route
        const {title,icon,hideInTab} = currentHandle
        console.log('路由变化',route.pathname);

        dispatch(addTab({
            key:pathname,
            title,
            icon,
            closable:pathname !== '/'//首页不可关闭
        }))

    },[dispatch , route.pathname])

    return <>{children}</>

}