'use client'

import MainBar from "./mainbar"
import TaskList from "./task-list"
import Notification from "./notification"
import { useState } from "react"
import TaskPopup from "./task-popup"
import { CategoryType, TaskType } from "../lib/types"
import { v4 as uuidv4 } from 'uuid';
import Navbar from "./navbar"
import Sidebar from "./sidebar"

interface PopupSectionProps{
    tasks: TaskType[]
    category : CategoryType[]
}

export default function PopupSection({tasks, category}: PopupSectionProps){
    const [notification, setNotification] = useState('');
    const [currentTask, setCurrentTask] = useState(tasks.find(value => value.endTime == null));
    const [isTaskModalVisible, setIsTaskModalVisible] = useState(false);

    const noOfDays = 15;

    const taskObj = getObjOfDates(noOfDays);
    const dateArr = getArrayOfDates2(noOfDays);

    for(let i = 0; i < dateArr.length; i++){
        let yesterday = new Date(new Date(new Date().setDate(dateArr[i].getDate() + 1)).setHours(0,0,0,0));
    
        taskObj[dateArr[i].toLocaleDateString()] = tasks.filter(task => {
            return (yesterday >= new Date (task.startTime)) && (new Date (task.startTime) >= dateArr[i]) && task.endTime != null
        });
    }

    return(
        <div className="h-screen flex flex-col">
        
            {/* Navbar */}
            <div className="h-24">
                <Navbar />
            </div>

            {/* Sidebar + Main Content */}
            <div className="flex flex-1 overflow-hidden">
                
                {/* Sidebar */}
                <div className="w-1/7 bg-gray-50 overflow-y-auto border-r-2 border-gray-200 z-50">
                    <Sidebar />
                </div>

                {/* Main Content */}
                <div className="flex-1 p-6 overflow-y-auto">
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

                    {getArrayOfDates2(noOfDays).map(day =>
                        taskObj[day.toLocaleDateString()]?.length > 0 && (
                        <TaskList
                            key={day.toLocaleDateString()}
                            taskList={taskObj[day.toLocaleDateString()]}
                            category={category}
                            day={day.toDateString()}
                        />
                        )
                    )}
                </div>
            </div>
        </div>

    )
}

function getObjOfDates(noOfDays : number){
    let arrOfDays : Record<string, TaskType[]> = {};
    for(let i = 0; i < noOfDays; i++){
        const day = new Date(new Date().setDate(new Date().getDate() - i));
        arrOfDays[day.toLocaleDateString()] = [];
    }
    return arrOfDays;
}

function getArrayOfDates2(noOfDays : number){
    let arrOfDays : Date[] = [];
    for(let i = 0; i < noOfDays; i++){
        const day =new Date(new Date(new Date().setDate(new Date().getDate() - i)).setHours(0,0,0,0));
        arrOfDays.push(day);
    }
    return arrOfDays;
}