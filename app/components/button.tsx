'use client'

interface ButtonProps{
    innerText : String,
    onclick? : () => void,
}

export default function Button({innerText, onclick} : ButtonProps){
    return (
        <div className="">
            <button className="border-2 border-black p-2" onClick={onclick} >{innerText}</button>
        </div>
    )
}