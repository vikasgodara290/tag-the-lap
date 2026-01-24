'use client'

import MainBar from "./mainbar"
import TaskList from "./task-list"

export default function PopupSection(){

    return(
        <div className="">
            <MainBar/>
            <TaskList/>
            <TaskList/>
            <TaskList/>
        </div>
    )
}