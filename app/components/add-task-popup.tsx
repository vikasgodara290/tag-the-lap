'use client'

import { Dispatch, SetStateAction, useRef, useState } from "react";
import Button from "./button";
import Dropdown from "./dropdown";
import Textarea from "./textarea";
import axios from "axios";

interface AddTaskPopupProps{
    setIsOpen: Dispatch<SetStateAction<boolean>>
}

export default function AddTaskPopup({setIsOpen}: AddTaskPopupProps){
    const taskRef = useRef<HTMLTextAreaElement>(null);
    const categoryRef = useRef<HTMLSelectElement>(null);
    const [task, setTask] = useState<{task: String; category: String; startTime: Date} | null>(null);

    const handlePopupClose = () => {
        setIsOpen(false);
    }

    const handleAddTask = async () => {
        const task = taskRef.current?.value;
        const category = categoryRef.current?.value;
        const startTime = new Date();
        console.log(task, category, startTime);

        axios.post('/api/task', {
            task,
            category,
            startTime
        })

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