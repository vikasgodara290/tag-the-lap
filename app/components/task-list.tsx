import { Ellipsis, ChevronsDownUp, ChevronsUpDown  } from "lucide-react";
import Task from "./task";
import { useEffect, useState } from "react";

interface TableType{
  id:number,
  task: string,
  category: string,
  startTime: Date,
  endTime:  Date,
  duration: number,
  createdAt: Date
}

interface TaskListProps {
    taskList: TableType[] | undefined
}

export default function TaskList({taskList}: TaskListProps) {
    const [isListOpen, setIsListOpen] = useState(false);

    const handleListCollapseClick = () => {
        setIsListOpen(prev => !prev);
    }

    return(
        <div className="border rounded-sm w-8/12 m-5 mx-auto">
            <div className="h-16 rounded-sm flex justify-between items-center p-6 bg-gray-50 hover:cursor-pointer" onClick={handleListCollapseClick}>
                <div className="flex-1">
                    Today, 24 Jan 2026
                </div>
                <div className="flex items-center justify-center">
                    <div className="mx-2">
                        Totals:  05:42:23
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
                        taskList!.map(task => <Task key={task.id} task={task}/>)
                    }
                </span>
            }
        </div>
    )
}