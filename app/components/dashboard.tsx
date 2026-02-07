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

    const noOfDays = 7;

    const arr : TaskType[][] = []

    getArrayOfDates(noOfDays).forEach(day => {
        arr.push(
            tasks.filter(task => {
                return new Date (task.startTime) > day
            })
        )
    });

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
            {
                arr.map(a => 
                    <TaskList 
                        taskList={a.filter(task => task.endTime != null)}
                        category={category}
                    />
                )
            }
        </div>
    )
}

function getArrayOfDays(noOfDays : number){
    let arrOfDays = [];
    for(let i = 0; i < noOfDays; i++){
        const day = new Date(new Date().setDate(new Date().getDate() - i))
        .toLocaleDateString('en-GB', { weekday: 'short', day: '2-digit', year : 'numeric', month : 'short'});
        arrOfDays.push(day);
    }
    return arrOfDays;
}

function getArrayOfDates(noOfDays : number){
    let arrOfDays : Date[] = [];
    for(let i = 0; i < noOfDays; i++){
        const day = new Date(new Date().setDate(new Date().getDate() - i));
        arrOfDays.push(day);
    }
    return arrOfDays;
}