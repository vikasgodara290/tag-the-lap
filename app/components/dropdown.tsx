'use client'
import { ChevronsDownUp, ChevronsUpDown } from "lucide-react"
import React, { useEffect, useState } from "react"

interface OptionType {
    id : number,
    option : string
}

interface DropdownProps{
    ref : React.Ref<HTMLSpanElement>,
    options : OptionType[],
    currSelectedOptionId?: number | undefined,
    isDisabled?: boolean
}

export default function Dropdown({ref, options, currSelectedOptionId, isDisabled = false}: DropdownProps){
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [selectedOptionId, setSelectedOptionId] = useState(currSelectedOptionId ? currSelectedOptionId : 0);

    useEffect(() => {
        if(currSelectedOptionId){
            setSelectedOptionId(currSelectedOptionId)
        }
    }, [currSelectedOptionId])

    const handleClick = () => {
        if(isDisabled) return;
        setIsDropdownOpen(prev => !prev);
    }

    const handleBlur = () => {
        setIsDropdownOpen(false);
    }

    const handleSelectClick = (e : React.MouseEvent) => {
        const selectedOption = e.currentTarget.id.trim();
        setIsDropdownOpen(false);
        setSelectedOptionId(parseInt(selectedOption));
    }

    return(
        <div tabIndex={0} className="select-none" onBlur={handleBlur}>
            <div className="border-2 rounded-sm p-2 flex items-center justify-between w-36 hover:cursor-pointer" onClick={handleClick}>
                <span ref={ref} id={selectedOptionId.toString()}>
                    {selectedOptionId === 0? "Select" : options.find(option => option.id === selectedOptionId)?.option} 
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
                                <div id={value.id.toString()} key={value.id} className="p-2 hover:bg-gray-400" onClick={e => handleSelectClick(e)}>{value.option}</div>
                            )
                        })
                    }
                </div>
            }
        </div>
    )
}