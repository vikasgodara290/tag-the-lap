'use client'

import MainBar from "./mainbar"
import TaskList from "./task-list"
import Notification from "./notification"
import { useState } from "react"
import TaskPopup from "./task-popup"
import { CategoryType, TaskType } from "../lib/types"

interface PopupSectionProps{
    tasks: TaskType[]
    category : CategoryType[]
}

export default function PopupSection({tasks, category}: PopupSectionProps){
    const [notification, setNotification] = useState('');
    const [currentTask, setCurrentTask] = useState(tasks.find(value => value.endTime == null));
    const [isTaskModalVisible, setIsTaskModalVisible] = useState(false);

    // Get the count of dates 
    
    // create array of TableType array

    // Split task duration if the task ends on next day or any day after that.

    // Get total number of hours 

    return(
        <div className="">
            <TaskPopup
                currentTask={currentTask}
                setCurrentTask={setCurrentTask}
                isVisible={isTaskModalVisible}
                setIsVisible={setIsTaskModalVisible}
                category={category}
            />
            <Notification 
                notification={notification} 
                setNotification={setNotification}
            />
            <MainBar 
                task={currentTask} 
                setCurrentTask={setCurrentTask}
                setNotification={setNotification} 
                setIsTaskModalVisible={setIsTaskModalVisible} 
                category={category}
            />
            <TaskList 
                taskList={tasks.filter(task => task.endTime != null)}
                category={category}
            />
        </div>
    )
}