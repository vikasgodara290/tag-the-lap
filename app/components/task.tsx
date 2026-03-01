import { Ellipsis } from "lucide-react";
import CategoryTag from "./category-tag";
import { CategoryType, TaskType } from "../lib/types";

export default function Task({
    task, 
    category,
}: {
    task: TaskType,
    category : CategoryType[],
}) {
    let hours : number, minutes : number, currSeconds : number;
    const duration = (new Date(task.endTime!).getTime() - new Date(task.startTime).getTime()) / 1000;

    hours = Math.floor(duration / 3600);
    minutes = Math.floor((duration % 3600) / 60);
    currSeconds = Math.floor((duration % 3600) % 60);

    return(
        <div className="h-16 flex items-center sm:justify-between sm:p-6 max-sm:px-3 border-t-2 border-gray-200 max-sm:flex-col max-sm:h-32">
            <div className="flex-1 flex max-sm:w-full items-center">
                <span className="relative top-px max-sm:flex-1">
                    {task.task}
                </span>
                <span>
                    <CategoryTag taskCategory={task.categoryId} category={category}/>
                </span>
            </div>
            <div className="flex items-center justify-center max-sm:pt-2 max-sm:pb-4 max-sm:justify-between max-sm:w-full">
                <div className="mr-2 font-mono">
                    { formatDate(new Date(task.startTime)) + ' - ' + formatDate(new Date(task.endTime!)) }
                </div>
                <span className="border h-4 rounded-2xl border-gray-200 mx-2"></span>
                <div className="mx-2 font-mono">
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
