'use client'
import { ChevronsDownUp, ChevronsUpDown } from "lucide-react"
import React, { useState } from "react"
import { v4 as uuidv4 } from 'uuid'

interface DropdownProps{
    ref : React.Ref<HTMLSpanElement>,
    options : string[],
    currSelectedOption: string | undefined,
    isDisabled?: boolean
}

export default function Dropdown({ref, options, currSelectedOption, isDisabled = false}: DropdownProps){
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [selectedOption, setSelectedOption] = useState(currSelectedOption ? currSelectedOption : "Select");

    const handleClick = () => {
        if(isDisabled) return;
        setIsDropdownOpen(prev => !prev);
    }

    const handleBlur = () => {
        setIsDropdownOpen(false);
    }

    const handleSelectClick = (e : React.MouseEvent) => {
        const selectedOption = e.currentTarget.textContent.trim();
        setIsDropdownOpen(false);
        setSelectedOption(selectedOption);
    }

    return(
        <div tabIndex={0} className="select-none" onBlur={handleBlur}>
            <div className="border-2 rounded-sm p-2 flex items-center justify-between w-36 hover:cursor-pointer" onClick={handleClick}>
                <span ref={ref}>
                    {selectedOption} 
                </span>
                {
                    !isDropdownOpen ? <ChevronsUpDown size={18}/>:<ChevronsDownUp size={18}/>
                }
            </div>
            {
                isDropdownOpen &&
                <div className="border-2 mt-1 rounded-sm absolute w-36 hover:cursor-pointer bg-white">
                    {
                        options.map((value) => {
                            return (
                                <div key={uuidv4()} className="p-2 hover:bg-gray-400" onClick={e => handleSelectClick(e)}>{value}</div>
                            )
                        })
                    }
                </div>
            }
        </div>
    )
}