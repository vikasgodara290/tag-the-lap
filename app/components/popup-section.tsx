'use client'

import MainBar from "./mainbar"
import TaskList from "./task-list"
import Notification from "./notification"
import { useState } from "react"

export default function PopupSection(){
    const [notification, setNotification] = useState('');

    return(
        <div className="">
            <Notification notification={notification} setNotification={setNotification}/>
            <MainBar setNotification={setNotification}/>
            <TaskList/>
            <TaskList/>
            <TaskList/>
        </div>
    )
}