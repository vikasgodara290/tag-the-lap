'use client'

import { Dispatch, SetStateAction } from "react";
import Button from "./button";
import Dropdown from "./dropdown";
import Textarea from "./textarea";

interface AddTaskPopupProps{
    setIsOpen: Dispatch<SetStateAction<boolean>>
}

export default function AddTaskPopup({setIsOpen}: AddTaskPopupProps){

    const handlePopupClose = () => {
        setIsOpen(false);
    }

    return (
        <div className="border border-black w-96 h-72 place-items-center grid">
            <div className="w-full flex justify-end">
                <div className="w-fit px-1 items-end mx-1">
                    <Button innerText={'Close'} onclick={handlePopupClose}/>
                </div>
            </div>
            <div className="">
                <Textarea/>
            </div>
            <div className="">
                <Dropdown/>
            </div>
            <div className="">
                <Button innerText={'Add'}/>
            </div>
        </div>
    )
}