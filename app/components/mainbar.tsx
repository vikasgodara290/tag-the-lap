import { Dispatch, ReactElement, SetStateAction, useEffect, useRef, useState } from "react";
import ButtonWithIcon from "./button-with-icon";
import Stopwatch from "./stopwatch";
import Input from "./input";
import Dropdown from "./dropdown";
import EditIcon from "./edit-task";
import axios from "axios";
import { Ban, LucideProps, NotebookPen, Play, SquareCheckBig, Trash2 } from "lucide-react";

interface TableType{
  id:number,
  task: string,
  category: string,
  startTime: Date,
  endTime: null | Date,
  duration: number | null,
  createdAt: Date
}

interface MainbarProps{
    setNotification:  Dispatch<SetStateAction<string>>,
    task : TableType | undefined,
    setIsTaskModalVisible: React.Dispatch<React.SetStateAction<boolean>>
    setCurrentTask : React.Dispatch<React.SetStateAction<TableType | undefined>>
}

const categoryArr = [
    "Entertainment",
    "Study",
    "Job",
    "Health"
]

export default function MainBar({setNotification, task, setIsTaskModalVisible, setCurrentTask}: MainbarProps){
    const [isStarted, setIsStarted] = useState<boolean>(!!task);
    const [taskInputVal, setTaskInputVal] = useState(task ? ((task.task == 'To Be Defined') ? undefined : task.task): undefined);
    const [isTaskInputDisabled, setIsTaskInputDisabled] = useState(task ? ((task.task == 'To Be Defined') ? false : true): false);
    const [isCatDropDownDisabled, setIsCatDropDownDisabled] = useState(true);
    const categoryRef = useRef<HTMLSpanElement>(null);
    const taskRef = useRef<HTMLInputElement>(null);
    const btnRef = useRef<HTMLSpanElement>(null);

    useEffect(() => {
        setTaskInputVal(task ? ((task.task == 'To Be Defined') ? undefined : task.task): undefined);
        setIsCatDropDownDisabled(!!task);
        setIsTaskInputDisabled(task ? ((task.task == 'To Be Defined') ? false : true): false);
    },[task])

    const handleStart = async () => {
        const taskInput = taskRef.current?.value;
        const category = categoryRef.current?.textContent.trim();
        const startTime = new Date();
        const btnText = btnRef.current?.textContent.trim();

        if(!taskInput || taskInput === ''){
            setNotification('Please enter task first!');
            return;
        }

        if(!category || category === 'Select'){
            setNotification('Please select category first!');
            return;
        }

        if(btnText == 'Start'){
            const endTime = null;
            axios.post('http://localhost:3000/api/task',{
                task: taskInput, 
                category, 
                startTime,
                endTime
            })
            setIsStarted(prev => !prev);
        }
        else if(btnText == 'Stop'){
            const endTime = new Date();
            // check the mode (Continuous or Non-Continuous)
            const mode = 'continuous'
            
            // If continuous popup a modal to log next task
            if(mode == 'continuous'){
                setIsTaskModalVisible(true);
            }
            else{
                //If non-continuous get the current task and update the endTime
                axios.put('http://localhost:3000/api/task',{
                    id : task?.id,
                    endTime
                });
                setIsStarted(prev => !prev);
            }
        }
        else if(btnText == 'Log the pending task'){
            // get temp task 
            const taskInput = taskRef.current?.value;
            const category = categoryRef.current?.textContent.trim();

            if(!taskInput || taskInput === ''){
                setNotification('Please enter task first!');
                return;
            }

            if(!category || category === 'Select'){
                setNotification('Please select category first!');
                return;
            }
            // update temp task with info given
            const res = await axios.put('http://localhost:3000/api/task',{
                id : task?.id,
                task : taskInput,
                category
            });

            setCurrentTask(res.data);
        }
    }

    let icon : ReactElement<LucideProps>;
    let startBtnText : string = 'Start';
    //let isCatDropDownDisabled = task? true: false;
    if(!isStarted){
        icon = <Play/>
    }
    else{
        icon = <Ban/>
        startBtnText=' Stop'
    }

    if(task ? task.task == 'To Be Defined': false){
        startBtnText = 'Log the pending task'
        icon = <NotebookPen />
        //isCatDropDownDisabled = false
    }
    
    return(
        <div className="flex justify-between items-center gap-3 border w-8/12 p-6 rounded-sm m-5 mx-auto">
            <Input className="flex-1 outline-0" placeholder="What are you working on..." ref={taskRef} value={taskInputVal} isTaskInputDisabled={isTaskInputDisabled}/>
            <span className="flex items-center gap-3">
                <Dropdown ref={categoryRef} options={categoryArr} currSelectedOption={task? task.category : undefined} isDisabled={isCatDropDownDisabled} />
                <span className="border h-4 rounded-2xl border-gray-300 mx-2"></span>
                <Stopwatch isStarted={isStarted} currentSeconds={task ? Math.floor((Date.now() - new Date(task.startTime).getTime()) / 1000) : 0}/>
                <span className="border h-4 rounded-2xl border-gray-300 mx-2"></span>
                <ButtonWithIcon innerText={startBtnText} isRoundCorner={true} buttonSize="mid" onclick={handleStart} icon={icon} ref={btnRef}/>
                <span className="border h-4 rounded-2xl border-gray-300 mx-2"></span>
                <EditIcon setCurrentTask={setCurrentTask} setIsCatDropDownDisabled={setIsCatDropDownDisabled} setTaskInputVal={setTaskInputVal} catRef={categoryRef} 
                taskRef={taskRef} currTask={task} setNotification={setNotification} setIsTaskInputDisabled={setIsTaskInputDisabled}/>
            </span>
        </div>
    )
}

function formatDate(date: Date) {
  console.log(date)
  return new Intl.DateTimeFormat("en-GB", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
  }).format(date)
    .replace(" ", "-")
    .replace(",", "");
}
