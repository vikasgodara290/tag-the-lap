'use client'

import { Dispatch, SetStateAction, useEffect, useRef, useState } from "react";
import Input from "./input";
import Dropdown from "./dropdown";
import ButtonWithIcon from "./button-with-icon";
import { X } from "lucide-react";
import axios from "axios";
import { CategoryType, TaskType } from "../lib/types";

interface TaskPopupProps {
  isVisible: boolean
  setIsVisible: React.Dispatch<React.SetStateAction<boolean>>
  currentTask : TaskType | undefined
  setCurrentTask : React.Dispatch<React.SetStateAction<TaskType | undefined>>
  category : CategoryType[]
}


export default function TaskPopup({isVisible, setIsVisible, currentTask, setCurrentTask, category}: TaskPopupProps) {
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
        const taskInput = taskRef.current?.value;
        const categoryId = parseInt(categoryRef.current?.id.trim()!);
        
        const endTime = new Date();
        await axios.put('http://localhost:3000/api/task',{
            id : currentTask?.id,
            endTime
        });
        
        const res = await axios.post('http://localhost:3000/api/task',{
            task: taskInput, 
            categoryId, 
            startTime : endTime,
            endTime : null
        });

        setCurrentTask(res.data);
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
            categoryId :  null, 
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
                    <Dropdown ref={categoryRef} options={toOptions(category)}/>
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

function toOptions(categories: CategoryType[]) {
  return categories.map(c => ({
    id: c.id,
    option: c.category,
  }))
}