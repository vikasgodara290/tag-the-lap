'use client'

import Button from "./button";
import AddTaskPopup from "./add-task-popup";
import { useEffect, useState } from "react";
import ButtonWithIcon from "./button-with-icon";
import Stopwatch from "./stopwatch";

export default function PopupSection(){
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [isStarted, setIsStarted] = useState<boolean>(false);

    const handleAddTask = () => {
        setIsOpen(true);
    }

    const handleStart = () => {
        setIsStarted(!isStarted);
    }
    
    useEffect(() => {
        setIsStarted(localStorage.getItem('isWatchRunning') === 'true'? true : false);
    },[]);

    useEffect(() => {
        localStorage.setItem('isWatchRunning', isStarted? 'true': 'false');
    },[isStarted]);


    return(
        <div className="flex">
            <Button innerText={'Add Task'} onclick={handleAddTask}/>
            {isOpen && 
                <div className="absolute left-[50%] top-[50%] transform translate-[-50%]">
                    <AddTaskPopup setIsOpen={setIsOpen}/>
                </div>
            }
            <ButtonWithIcon innerText={'Start'} isRoundCorner={true} buttonSize="sm"/>
            <ButtonWithIcon innerText={'Start'} isRoundCorner={true} buttonSize="mid"/>
            <ButtonWithIcon innerText={'Start'} isRoundCorner={true} buttonSize="lg" onclick={handleStart}/>

            <Stopwatch isStarted={isStarted}/>
        </div>
    )
}