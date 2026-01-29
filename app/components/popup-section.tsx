'use client'

import MainBar from "./mainbar"
import TaskList from "./task-list"
import Notification from "./notification"
import { useState } from "react"
import TaskPopup from "./task-popup"

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
    const [isTaskModalVisible, setIsTaskModalVisible] = useState(false);

    console.log(currentTask)
    return(
        <div className="">
            <TaskPopup
                isVisible={isTaskModalVisible}
                setIsVisible={setIsTaskModalVisible}
                currentTask={currentTask}
                setCurrentTask={setCurrentTask}
            />
            <Notification notification={notification} setNotification={setNotification}/>
            <MainBar setNotification={setNotification} task={currentTask} setIsTaskModalVisible={setIsTaskModalVisible}/>
            <TaskList/>
            <TaskList/>
            <TaskList/>
        </div>
    )
}