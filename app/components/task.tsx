import { Ellipsis } from "lucide-react";
import CategoryTag from "./category-tag";

interface TableType{
  id:number,
  task: string,
  category: string,
  startTime: Date,
  endTime: Date,
  duration: number,
  createdAt: Date
}

interface PopupSectionProps{
    task: TableType
}


export default function Task({task}: PopupSectionProps) {
    console.log('task: ' , Math.floor(task.duration/1000))
    let hours = Math.floor((Math.floor(task.duration/1000) / 3600) % 24);
    let minutes = Math.floor((Math.floor(task.duration/1000) / 60) % 60);
    let currSeconds = Math.floor(task.duration/1000) % 60;

    return(
        <div className="h-16 flex items-center justify-between p-6 border-t">
            <div className="flex-1 flex ">
                <span className="relative top-px">
                    {task.task}
                </span>
                <span>
                    <CategoryTag category={task.category}/>
                </span>
            </div>
            <div className="flex items-center justify-center">
                <div className="mx-2">
                    { formatDate( new Date(task.startTime) ) + ' - ' + formatDate(new Date(task.endTime))}
                </div>
                <span className="border h-4 rounded-2xl border-gray-300 mx-2"></span>
                <div className="mx-2">
                    { `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${currSeconds.toString().padStart(2, '0')}` }
                </div>
                <span className="border h-4 rounded-2xl border-gray-300 mx-2"></span>
                <div className="">
                    <Ellipsis size={18} className="relative bottom-px"/>
                </div>
            </div>
        </div>
    )
}

function formatDate(date: Date) {
    console.log(date)
  return new Intl.DateTimeFormat("en-GB", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  }).format(date)
    .replace(" ", ":")
    .replace(",", "");
}
