import axios from "axios";
import { Edit, SquareCheckBig, X } from "lucide-react";
import { useState } from "react";
import { TaskType } from "../lib/types";

interface EditIconProps {
    setTaskInputVal : React.Dispatch<React.SetStateAction<string | undefined>>
    setIsCatDropDownDisabled : React.Dispatch<React.SetStateAction<boolean>>
    setCurrentTask : React.Dispatch<React.SetStateAction<TaskType | undefined>>
    catRef : React.RefObject<HTMLSpanElement | null>
    taskRef : React.RefObject<HTMLInputElement | null>
    currTask : TaskType | undefined
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
                    <SquareCheckBig onClick={handleSaveTask} className="hover:cursor-pointer" size={18}/> 
                    <X onClick={handleCancelEdit} className="hover:cursor-pointer" size={18}/>
                </span>
                : <Edit onClick={handleEditTask} className="hover:cursor-pointer" size={18}/>
            }
        </div>
    )
}