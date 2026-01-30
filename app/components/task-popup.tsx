'use client'

import { Dispatch, SetStateAction, useEffect, useRef, useState } from "react";
import Input from "./input";
import Dropdown from "./dropdown";
import ButtonWithIcon from "./button-with-icon";
import { X } from "lucide-react";
import axios from "axios";

const categoryArr = [
    "Entertainment",
    "Study",
    "Job",
    "Health"
]

interface TableType{
  id:number,
  task: string,
  category: string,
  startTime: Date,
  endTime: null | Date,
  duration: number | null,
  createdAt: Date
}


interface TaskPopupProps {
  isVisible: boolean
  setIsVisible: React.Dispatch<React.SetStateAction<boolean>>
  currentTask : TableType | undefined
  setCurrentTask : React.Dispatch<React.SetStateAction<TableType | undefined>>
}


export default function TaskPopup({isVisible, setIsVisible, currentTask, setCurrentTask}: TaskPopupProps) {
    const categoryRef = useRef<HTMLSpanElement>(null);
    const taskRef = useRef<HTMLInputElement>(null);
    const modalRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        function handlePointerDown(e: MouseEvent) {
            if (!isVisible) return;
            if (!modalRef.current) return;

            if (!modalRef.current.contains(e.target as Node)) {
                setIsVisible(false);
            }
        }

        document.addEventListener("mousedown", handlePointerDown)
        return () => {
            document.removeEventListener("mousedown", handlePointerDown)
        }
    }, [isVisible]);

    const handleBtnTransfer = async () => {
        // Get the task and category
        const taskInput = taskRef.current?.value;
        const category = categoryRef.current?.textContent.trim();
        
        // Close the current task
        const endTime = new Date();
        axios.put('http://localhost:3000/api/task',{
            id : currentTask?.id,
            endTime
        });
        
        // fill the new task and category on mainbar
        const res = await axios.post('http://localhost:3000/api/task',{
            task: taskInput, 
            category, 
            startTime : endTime,
            endTime : null
        });

        // restart the clock
        setCurrentTask(res.data);

        // send a notification on successful transaction


        setIsVisible(false);
    }

    const handleBtnLogLater = async () => {
        const endTime = new Date();
        axios.put('http://localhost:3000/api/task',{
            id : currentTask?.id,
            endTime : endTime
        });

        const res = await axios.post('http://localhost:3000/api/task',{
            task: 'To Be Defined', 
            category :  'Select', 
            startTime : endTime,
            endTime : null
        });

        setCurrentTask(res.data);
        setIsVisible(false);
    }

    return(
        <>
         {
            isVisible &&
            <div ref={modalRef} className="border w-1/4 p-5 absolute bg-white top-1/6 left-1/2 transform -translate-x-1/2">
                <div className="flex justify-end mb-4">
                    <X/>
                </div>
                <div className="flex justify-between gap-2">
                    <Input className="flex-1 outline-0" placeholder="What are you working on..." ref={taskRef}/>
                    <Dropdown ref={categoryRef} options={categoryArr}/>
                </div>
                <div className="flex justify-center gap-4 mt-10">
                    <ButtonWithIcon innerText="Submit" onclick={handleBtnTransfer}/>
                    <ButtonWithIcon innerText="Log Later" onclick={handleBtnLogLater}/>
                </div>
            </div>
         }
        </>
    )
}