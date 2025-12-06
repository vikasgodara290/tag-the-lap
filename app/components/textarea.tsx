'use client'

import React from "react"

interface TextareaProps{
    ref: React.Ref<HTMLTextAreaElement>
}

export default function Textarea({ref}: TextareaProps){
    return(
        <div className="">
            <textarea ref={ref} name="" id="" className="border border-black w-52"></textarea>
        </div>
    )
}