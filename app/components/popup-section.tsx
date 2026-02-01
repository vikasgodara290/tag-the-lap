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

interface TableType2{
  id:number,
  task: string,
  category: string,
  startTime: Date,
  endTime: Date,
  duration: number,
  createdAt: Date
}

interface PopupSectionProps{
    tasks: TableType[]
}

export default function PopupSection({tasks}: PopupSectionProps){
    const [notification, setNotification] = useState('');
    const [currentTask, setCurrentTask] = useState(tasks.find(value => value.duration == null));
    const [isTaskModalVisible, setIsTaskModalVisible] = useState(false);

    const taskList : TableType2[] = []
    
    tasks.map(task => {
        if(task.endTime != null){
            // @ts-ignore
            taskList.push(task)
        }
        
    })

    // Get the count of dates 
    
    // create array of TableType array

    // Split task duration if the task ends on next day or any day after that.

    // Get total number of hours 

    return(
        <div className="">
            <TaskPopup
                isVisible={isTaskModalVisible}
                setIsVisible={setIsTaskModalVisible}
                currentTask={currentTask}
                setCurrentTask={setCurrentTask}
            />
            <Notification notification={notification} setNotification={setNotification}/>
            <MainBar setNotification={setNotification} task={currentTask} setIsTaskModalVisible={setIsTaskModalVisible} setCurrentTask={setCurrentTask}/>
            <TaskList taskList={taskList}/>
        </div>
    )
}