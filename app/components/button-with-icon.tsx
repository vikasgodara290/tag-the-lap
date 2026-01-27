'use client'

import { LucideProps } from "lucide-react"
import { cloneElement, ReactElement, Ref } from "react";

interface ButtonWithIconProps{
    icon: ReactElement<LucideProps>
    innerText : string,
    isRoundCorner: boolean,
    iconSize?: number | string | undefined,
    fontSize?: string,
    buttonSize?: string,
    onclick? : () => void,
    ref?: Ref<HTMLSpanElement>
}

export default function ButtonWithIcon({innerText, isRoundCorner = true, iconSize = 18, fontSize = 'text-base', buttonSize = 'mid', onclick, icon, ref} : ButtonWithIconProps){
    let sizeStyle = 'p-2';
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
            <button className={`w-20 flex flex-row justify-start gap-2 items-center border-2 border-black ${sizeStyle} ${isRoundCorner?'rounded-sm':''}`} onClick={onclick} >
                <span className="">
                    {cloneElement(icon, {
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