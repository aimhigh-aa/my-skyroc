import { useEffect, useState } from "react";
import { FullscreenOutlined, FullscreenExitOutlined } from '@ant-design/icons';
import { ButtonIcon } from "./ButtonIcons";

interface FullScreenProps {
    className?: string;
}



export function FullScreen({ className }: FullScreenProps) {
    const [isFullscreen, setIsFullscreen] = useState(false);

    const toggleFullScreen = () => {
        if (!isFullscreen) {
            //进入全屏
            document.documentElement.requestFullscreen().catch(err => {
                console.log('进入全屏失败', err)
            })
        } else {
            //退出全屏
            document.exitFullscreen().catch(err => {
                console.log('退出全屏失败', err)
            })
        }
    }

    //监听全局状态变化（处理F11等原生全屏操作）
    useEffect(() => {
        const handleFullscreenChange = () => {
            setIsFullscreen(!!document.fullscreenElement);
        };

        document.addEventListener('fullscreenchange', handleFullscreenChange);
        
        return () => {
            document.removeEventListener('fullscreenchange', handleFullscreenChange);
        };

    }, [])

    return (
        <ButtonIcon
            className={className}
            tooltipContent={isFullscreen ? '退出全屏' : '全屏'}
            onClick={toggleFullScreen}
        >
            {isFullscreen ? <FullscreenExitOutlined style={{ fontSize: '18px' }} /> : <FullscreenOutlined style={{ fontSize: '18px' }} />}

        </ButtonIcon>
    )
}