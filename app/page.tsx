'use client'

import { useRef } from "react";
import AddTaskPopup from "./components/add-task-popup";
import Button from "./components/button";
import Clock from "./components/clock";

export default function Home() {
  const addTaskPopupRef = useRef<HTMLDivElement>(null);

  const handleAddTask = () => {
    const element = addTaskPopupRef.current;
    addTaskPopupRef.current?.focus();
    if(element){
      element.classList.remove('hidden');
    }
  }

  const handlePopupBlur = () => {
    const element = addTaskPopupRef.current;
    if(element){
      element.classList.add('hidden');
    }
  }

  return (
    <div className="">
      <Clock/>
      <Button innerText={'Add Task'} onclick={handleAddTask}/>
      <div ref={addTaskPopupRef} onClick={handleAddTask} className="w-56 h-48 absolute left-[50%] top-[50%] transform translate-[-50%] hidden" onBlur={handlePopupBlur} tabIndex={0} >
        <AddTaskPopup/>
      </div>
    </div>
  );
}
