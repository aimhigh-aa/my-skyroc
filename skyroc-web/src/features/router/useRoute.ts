import { useMemo } from "react";
import { useLocation,useMatches } from "react-router-dom";

/**
 * 1. 从 useMatches 获取匹配到的路由层级数组。
 * 2. 过滤掉不需要显示的路由（比如没有 title 的根容器）。
 * 3. 提取 handle 中的元数据，供面包屑显示。
 */

export function useRoute(){
    // 获取当前所有匹配的路由片段（由父到子排列）
    const matches = useMatches();
    // 获取当前基础路径信息
    const {pathname , search , hash} = useLocation();

    const route = useMemo(() => {
       const matched =  matches.filter(match => Boolean((match.handle as any)?.title)).map(match =>{
            const handle = match.handle as any;
            return{
                id: match.id,
                pathname: match.pathname,
                title: handle.title,
                icon: handle.icon,
            }
        })

        return {
            pathname,
            fullPath: pathname + search + hash,//完整的当前路径
            matched,
            currentHandle:(matches.at(-1)?.handle as any) || {},//当前页面的元数据

        }

    }, [matches, pathname, search, hash])
}



