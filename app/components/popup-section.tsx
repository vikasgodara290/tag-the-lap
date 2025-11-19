'use client'

import Button from "./button";
import AddTaskPopup from "./add-task-popup";
import { useRef, useState } from "react";

export default function PopupSection(){
    const addTaskPopupRef = useRef<HTMLDivElement>(null);
    const [isOpen, setIsOpen] = useState<boolean>(false);

    const handleAddTask = () => {
        setIsOpen(true);
    }

    return(
        <div className="">
            <Button innerText={'Add Task'} onclick={handleAddTask}/>
            {isOpen && 
                <div className="absolute left-[50%] top-[50%] transform translate-[-50%]">
                    <AddTaskPopup setIsOpen={setIsOpen}/>
                </div>
            }
        </div>
    )
}