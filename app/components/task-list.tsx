import { ChevronsDownUp, ChevronsUpDown  } from "lucide-react";
import Task from "./task";
import { useEffect, useState } from "react";
import { CategoryType, TaskType } from "../lib/types";


interface TaskListProps {
    taskList: TaskType[] | undefined
    category: CategoryType[]
    day: string
}

export default function TaskList({taskList, category, day}: TaskListProps) {
    const [isListOpen, setIsListOpen] = useState(new Date(day).getDate() == new Date().getDate()? true : false);
    const [totalTime, setTotalTime] = useState('00:00:00');

    const handleListCollapseClick = () => {
        setIsListOpen(prev => !prev);
    }

    useEffect(() => {
        let hours : number, minutes : number, currSeconds : number;
        let totalTimeLocal: number = 0;
        taskList?.forEach(task => {
            const duration = (new Date(task.endTime!).getTime() - new Date(task.startTime).getTime()) / 1000;
            console.log('from inside: ',duration)
            totalTimeLocal =+ duration;
        })

        hours = Math.floor((Math.floor(totalTimeLocal) / 3600) % 24);
        minutes = Math.floor((Math.floor(totalTimeLocal) / 60) % 60);
        currSeconds = Math.floor(totalTimeLocal) % 60;

        setTotalTime(`${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${currSeconds.toString().padStart(2, '0')}`)
    },[taskList])

    return(
        <div className="border-2 border-gray-200 rounded-md w-8/12 m-5 mx-auto">
            <div className="h-16 rounded-sm flex justify-between items-center p-6 bg-gray-50 hover:cursor-pointer" onClick={handleListCollapseClick}>
                <div className="flex-1">
                    {/* Today, 24 Jan 2026 */}
                    {day}
                </div>
                <div className="flex items-center justify-center">
                    <div className="mx-2">
                        Totals: {totalTime}
                    </div>
                    <div className="mx-2">
                        
                        {
                            isListOpen? <ChevronsDownUp size={18} className="relative bottom-px"/> : 
                            <ChevronsUpDown size={18} className="relative bottom-px"/>
                        }
                        
                    </div>
                </div>
            </div>
            {
                isListOpen && 
                <span>
                    {
                        taskList!.map(task => <Task key={task.id} task={task} category={category}/>)
                    }
                </span>
            }
        </div>
    )
}