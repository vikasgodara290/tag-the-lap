'use client'

import { Play } from "lucide-react"

interface ButtonWithIconProps{
    innerText : string,
    isRoundCorner: boolean,
    iconSize?: number | string | undefined,
    fontSize?: string,
    buttonSize?: string,
    onclick? : () => void,
}

export default function ButtonWithIcon({innerText, isRoundCorner = true, iconSize = 18, fontSize = 'text-base', buttonSize = 'mid', onclick} : ButtonWithIconProps){
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
            <button className={`flex flex-row justify-center gap-2 items-center border-2 border-black ${sizeStyle} ${isRoundCorner?'rounded-sm':''}`} onClick={onclick} >
                <span className="">
                    <Play size={iconSize} className="relative bottom-px"/>
                </span>
                <span className={`${fontSize}`}>
                    {innerText}
                </span>
            </button>
        </div>
    )
}