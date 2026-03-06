import {Button , Tooltip} from 'antd'
import type { ButtonProps,TooltipProps } from 'antd'
import type { CSSProperties,ReactNode } from 'react'

interface ButtonIconProps extends Omit<ButtonProps, 'icon'>{
    children?: ReactNode;
    className?:string;
    tooltipContent?: string;
    tooltipPlacement?: TooltipProps['placement'];
    onClick?: () => void;
}

export function ButtonIcon({
    children,
    className = '',
    style,
    tooltipContent,
    tooltipPlacement = "bottom",
    onClick,
    ...restProps
}:ButtonIconProps){

    const buttonContent = (
        <Button
            type='text'
            className={`flex items-center justify-center h-[36px] px-[12px] ${className}`}
            style={style}
            onClick={onClick}
            {...restProps}
        >
            <div className='flex items-center gap-2'>{children}</div>

        </Button>
        )

    if(tooltipContent){
        return (
            <Tooltip title={tooltipContent} placement={tooltipPlacement}>
                {buttonContent}
            </Tooltip>
        );
    }
    return buttonContent
}