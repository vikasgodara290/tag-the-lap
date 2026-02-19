import { Ellipsis } from "lucide-react";
import CategoryTag from "./category-tag";
import { CategoryType, TaskType } from "../lib/types";

interface PopupSectionProps{
    task: TaskType
    category : CategoryType[]
}

export default function Task({task, category}: PopupSectionProps) {
    let hours : number, minutes : number, currSeconds : number;
    const duration = (new Date(task.endTime!).getTime() - new Date(task.startTime).getTime()) / 1000;

    hours = Math.floor(duration / 3600);
    minutes = Math.floor((duration % 3600) / 60);
    currSeconds = Math.floor((duration % 3600) % 60);

    return(
        <div className="h-16 flex items-center justify-between p-6 border-t-2 border-gray-200">
            <div className="flex-1 flex ">
                <span className="relative top-px">
                    {task.task}
                </span>
                <span>
                    <CategoryTag taskCategory={task.categoryId} category={category}/>
                </span>
            </div>
            <div className="flex items-center justify-center">
                <div className="mx-2">
                    { formatDate(new Date(task.startTime)) + ' - ' + formatDate(new Date(task.endTime!)) }
                </div>
                <span className="border h-4 rounded-2xl border-gray-200 mx-2"></span>
                <div className="mx-2">
                    { `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${currSeconds.toString().padStart(2, '0')}` }
                </div>
                <span className="border h-4 rounded-2xl border-gray-200 mx-2"></span>
                <div className="">
                    <Ellipsis size={18} className="relative bottom-px"/>
                </div>
            </div>
        </div>
    )
}

function formatDate(date: Date) {
  return new Intl.DateTimeFormat("en-GB", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  }).format(date)
    .replace(" ", ":")
    .replace(",", "");
}
