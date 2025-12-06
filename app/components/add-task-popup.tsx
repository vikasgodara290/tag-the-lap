'use client'

import { Dispatch, SetStateAction, useRef } from "react";
import Button from "./button";
import Dropdown from "./dropdown";
import Textarea from "./textarea";

interface AddTaskPopupProps{
    setIsOpen: Dispatch<SetStateAction<boolean>>
}

export default function AddTaskPopup({setIsOpen}: AddTaskPopupProps){
    const taskRef = useRef<HTMLTextAreaElement>(null);
    const categoryRef = useRef<HTMLSelectElement>(null);

    const handlePopupClose = () => {
        setIsOpen(false);
    }

    const handleAddTask = () => {
        const task = taskRef.current?.value;
        const category = categoryRef.current?.value;
        console.log(task, category)
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
                <Textarea ref={taskRef}/>
            </div>
            <div className="">
                <Dropdown ref={categoryRef}/>
            </div>
            <div className="">
                <Button innerText={'Add'} onclick={handleAddTask}/>
            </div>
        </div>
    )
}