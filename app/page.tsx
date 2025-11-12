'use client'

import { useRef } from "react";
import AddTaskPopup from "./components/add-task-popup";
import Button from "./components/button";
import Clock from "./components/clock";

export default function Home() {
  const addTaskPopupRef = useRef<HTMLDivElement>(null);

  const handleAddTask = () => {
    const element = addTaskPopupRef.current;
    if(element){
      element.classList.remove('hidden');
    }
  }

  return (
    <div className="">
      <Clock/>
      <Button innerText={'Add Task'} onclick={handleAddTask}/>
      <div ref={addTaskPopupRef} className="absolute left-[50%] top-[50%] transform translate-[-50%] hidden">
        <AddTaskPopup/>
      </div>
    </div>
  );
}
