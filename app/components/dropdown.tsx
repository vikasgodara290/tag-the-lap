'use client'
import React from "react"

interface DropdownProps{
    ref : React.Ref<HTMLSelectElement>
}

export default function Dropdown({ref}: DropdownProps){
    return(
        <div className="">
            <select ref={ref} name="" id="">
                <option value="Entertainment">Entertainment</option>
                <option value="Job">Job</option>
                <option value="Study">Study</option>
                <option value="Health">Health</option>
            </select>
        </div>
    )
}