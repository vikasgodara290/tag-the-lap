'use client'

import Button from "./button";
import AddTaskPopup from "./add-task-popup";
import { useState } from "react";

export default function PopupSection(){
    const [isOpen, setIsOpen] = useState<boolean>(false);

    const handleAddTask = () => {
        setIsOpen(true);
    }

    const handleStart = () => {
        const startTime = new Date();
        
    }

    const handleStop = () => {
        setIsOpen(true);
    }

    return(
        <div className="flex">
            <Button innerText={'Add Task'} onclick={handleAddTask}/>
            <Button innerText={'Start Recording'} onclick={handleStart}/>
            <Button innerText={'Stop Recording'} onclick={handleStop}/>
            {isOpen && 
                <div className="absolute left-[50%] top-[50%] transform translate-[-50%]">
                    <AddTaskPopup setIsOpen={setIsOpen}/>
                </div>
            }
        </div>
    )
}