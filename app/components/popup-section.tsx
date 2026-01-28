'use client'

import MainBar from "./mainbar"
import TaskList from "./task-list"
import Notification from "./notification"
import { useState } from "react"

interface TableType{
  id:number,
  task: string,
  category: string,
  startTime: Date,
  endTime: null | Date,
  duration: number | null,
  createdAt: Date
}

interface PopupSectionProps{
    tasks: TableType[]
}

export default function PopupSection({tasks}: PopupSectionProps){
    const [notification, setNotification] = useState('');
    const [currentTask, setCurrentTask] = useState(tasks.find(value => value.duration == null));

    console.log(currentTask)
    return(
        <div className="">
            <Notification notification={notification} setNotification={setNotification}/>
            <MainBar setNotification={setNotification} task={currentTask}/>
            <TaskList/>
            <TaskList/>
            <TaskList/>
        </div>
    )
}