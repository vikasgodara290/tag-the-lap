import { ChevronsDownUp, ChevronsUpDown  } from "lucide-react";
import Task from "./task";
import { useEffect, useMemo, useState } from "react";
import { CategoryType, TaskType } from "../lib/types";

export default function TaskList({
    taskList, 
    category, 
    day,
}: {
    taskList: TaskType[] | undefined,
    category: CategoryType[],
    day: string,
}) {
    const [isListOpen, setIsListOpen] = useState(new Date(day).getDate() == new Date().getDate()? true : false);
    const [totalTime, setTotalTime] = useState('00:00:00');

    const handleListCollapseClick = () => {
        setIsListOpen(prev => !prev);
    }

    const totalTimeCal = useMemo(() => getTotalTime(taskList), [taskList])

    useEffect(() => {
        setTotalTime(totalTimeCal);
    },[taskList])

    return(
        <div className="border-2 border-gray-200 rounded-md m-5 mx-auto">
            <div className="h-16 rounded-sm flex justify-between items-center max-sm:p-3 sm:p-6 bg-gray-50 hover:cursor-pointer" onClick={handleListCollapseClick}>
                <div className="flex-1">
                    {day}
                </div>
                <div className="flex items-center justify-center">
                    <div className="mx-2">
                        Total: <span className="font-mono">{totalTime}</span>
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

function getTotalTime(taskList : TaskType[] | undefined){
    let hours : number, minutes : number, currSeconds : number;
    let totalTimeLocal: number = 0;

    taskList?.forEach(task => {
        const duration = (new Date(task.endTime!).getTime() - new Date(task.startTime).getTime()) / 1000;
        totalTimeLocal = totalTimeLocal + duration;
    })

    hours = Math.floor(totalTimeLocal / 3600); 
    minutes = Math.floor((totalTimeLocal % 3600) / 60); 
    currSeconds = Math.floor((totalTimeLocal % 3600) % 60);
    
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${currSeconds.toString().padStart(2, '0')}`;
}