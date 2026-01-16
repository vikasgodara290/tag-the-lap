'use client'

import { Play } from "lucide-react"

interface ButtonWithIconProps{
    innerText : string,
    isRoundCorner: boolean,
    iconSize?: number | string | undefined,
    fontSize?: number,
    buttonSize?: string,
    onclick? : () => void,
}

export default function ButtonWithIcon({innerText, isRoundCorner = true, iconSize = 24, fontSize = 12, buttonSize = 'mid', onclick} : ButtonWithIconProps){
    let sizeStyle = 'p-2';
    switch(buttonSize){
        case 'sm': {
            sizeStyle = 'p-1';
            iconSize = 16;
            fontSize = 10;
        }
        break;
        case 'lg': {
            sizeStyle = 'p-3';
            iconSize = 32;
            fontSize = 24;
        }
        break;
    }
        
    return (
        <div className="">
            <button className={`flex flex-row justify-center gap-1 items-center border-2 border-black ${sizeStyle} ${isRoundCorner?'rounded-xl':''}`} onClick={onclick} >
                <span className="">
                    <Play size={iconSize}/>
                </span>
                <span className={`text-[${fontSize}px]`}>
                    {innerText}
                </span>
            </button>
        </div>
    )
}