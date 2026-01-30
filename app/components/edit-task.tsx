import axios from "axios";
import { Edit, SquareCheckBig, Trash2 } from "lucide-react";
import { useState } from "react";

interface TableType{
  id:number,
  task: string,
  category: string,
  startTime: Date,
  endTime: null | Date,
  duration: number | null,
  createdAt: Date
}

interface EditIconProps {
    setTaskInputVal : React.Dispatch<React.SetStateAction<string | undefined>>
    setIsCatDropDownDisabled : React.Dispatch<React.SetStateAction<boolean>>
    setCurrentTask : React.Dispatch<React.SetStateAction<TableType | undefined>>
    catRef : React.RefObject<HTMLSpanElement | null>
    taskRef : React.RefObject<HTMLInputElement | null>
    currTask : TableType | undefined
    setNotification:  React.Dispatch<React.SetStateAction<string>>,
    setIsTaskInputDisabled  : React.Dispatch<React.SetStateAction<boolean>>
}

export default function EditIcon({setTaskInputVal, setIsCatDropDownDisabled, setCurrentTask, catRef, taskRef, currTask, setNotification, setIsTaskInputDisabled} : EditIconProps){
    const [isInEdit, setIsInEdit] = useState(false);

    const handleEditTask = () => {
        setIsTaskInputDisabled(false);
        setIsCatDropDownDisabled(false);
        setIsInEdit(true);
    }

    const handleCancelEdit = () => {
        setIsTaskInputDisabled(true);
        setIsCatDropDownDisabled(true);
        setIsInEdit(false);
    }

    const handleSaveTask = async () => {
        const taskInput = taskRef.current?.value;
        const category = catRef.current?.textContent.trim();

        if(!taskInput || taskInput === ''){
            setNotification('Please enter task first!');
            return;
        }

        if(!category || category === 'Select'){
            setNotification('Please select category first!');
            return;
        }

        const res = await axios.put('http://localhost:3000/api/task',{
            id : currTask?.id,
            task : taskInput,
            category
        });

        setCurrentTask(res.data);
        setIsInEdit(false);
    }

    return(
        <div className="">
            {
                isInEdit ?
                <span className="flex justify-center items-center gap-3">
                    <SquareCheckBig onClick={handleSaveTask} className="hover:cursor-pointer"/> 
                    <Trash2 onClick={handleCancelEdit} className="hover:cursor-pointer"/>
                </span>
                : <Edit onClick={handleEditTask} className="hover:cursor-pointer"/>
            }
        </div>
    )
}