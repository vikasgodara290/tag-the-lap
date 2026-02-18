'use client'

import { LucideProps } from "lucide-react"
import { cloneElement, ReactElement, Ref } from "react";

interface ButtonWithIconProps{
    icon?: ReactElement<LucideProps>
    innerText : string,
    isRoundCorner?: boolean,
    iconSize?: number | string | undefined,
    fontSize?: string,
    buttonSize?: string,
    onclick? : () => void,
    ref?: Ref<HTMLSpanElement>,
    className?: string
}

export default function ButtonWithIcon({innerText, isRoundCorner = true, iconSize = 16, fontSize = 'text-base', buttonSize = 'mid', onclick, icon, ref, className} : ButtonWithIconProps){
    let sizeStyle = 'p-2.5';
    switch(buttonSize){
        case 'sm': {
            sizeStyle = 'p-1';
            iconSize = 12;
            fontSize = 'text-xs';
        }
        break;
        case 'lg': {
            sizeStyle = 'p-3';
            iconSize = 24;
            fontSize = 'text-2xl';
        }
        break;
    }
        
    return (
        <div className="">
            <button className={`${className} flex flex-row justify-start gap-2 items-center hover:cursor-pointer border-2 ${sizeStyle} ${isRoundCorner?'rounded-md':''}`} onClick={onclick} >
                <span className="">
                    {icon && cloneElement(icon, {
                        size: iconSize,
                        className: "relative bottom-px"
                    })}
                </span>
                <span className={`${fontSize}`} ref={ref}>
                    {innerText}
                </span>
            </button>
        </div>
    )
}