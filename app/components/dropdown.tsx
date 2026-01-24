'use client'
import { ChevronsDownUp, ChevronsUpDown } from "lucide-react"
import React, { useState } from "react"

interface DropdownProps{
    ref : React.Ref<HTMLSelectElement>
}

export default function Dropdown({ref}: DropdownProps){
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState("Entertainment");

    const handleClick = () => {
        setIsDropdownOpen(prev => !prev);
    }

    const handleBlur = () => {
        setIsDropdownOpen(false);
    }

    const handleSelectClick = (e : React.MouseEvent) => {
        const selectedCategory = e.currentTarget.textContent.trim();
        setIsDropdownOpen(false);
        setSelectedCategory(selectedCategory);
    }

    return(
        <div tabIndex={0} className="select-none" onBlur={handleBlur}>
            <div className="border-2 rounded-sm p-2 flex items-center justify-between w-36 hover:cursor-pointer" onClick={handleClick}>
                {selectedCategory} 
                {
                    !isDropdownOpen ? <ChevronsUpDown size={18}/>:<ChevronsDownUp size={18}/>
                }
            </div>
            {
                isDropdownOpen &&
                <div className="border-2 mt-1 rounded-sm absolute w-36 hover:cursor-pointer ">
                    <div className="p-2 hover:bg-gray-400" onClick={e => handleSelectClick(e)}>Entertainment</div>
                    <div className="p-2 hover:bg-gray-400" onClick={e => handleSelectClick(e)}>Job</div>
                    <div className="p-2 hover:bg-gray-400" onClick={e => handleSelectClick(e)}>Study</div>
                    <div className="p-2 hover:bg-gray-400" onClick={e => handleSelectClick(e)}>Health</div>
                </div>
            }
        </div>
    )
}