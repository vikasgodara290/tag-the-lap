import { Dispatch, ReactElement, SetStateAction, useEffect, useRef, useState } from "react";
import ButtonWithIcon from "./button-with-icon";
import Stopwatch from "./stopwatch";
import Input from "./input";
import Dropdown from "./dropdown";
import EditIcon from "./edit-icon";
import axios from "axios";
import { Ban, LucideProps, Play } from "lucide-react";

interface MainbarProps{
    setNotification:  Dispatch<SetStateAction<string>>
}

export default function MainBar({setNotification}: MainbarProps){
    const [isStarted, setIsStarted] = useState<boolean>(false);
    const categoryRef = useRef<HTMLSpanElement>(null);
    const taskRef = useRef<HTMLInputElement>(null);
    const btnRef = useRef<HTMLSpanElement>(null);

    const handleStart = () => {
        const task = taskRef.current?.value;
        const category = categoryRef.current?.textContent.trim();
        const startTime = new Date();
        const btnText = btnRef.current?.textContent.trim();

        if(!task || task === ''){
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
                task, 
                category, 
                startTime,
                endTime
            })
            setIsStarted(prev => !prev);
        }
        else if(btnText == 'Stop'){
            const endTime = new Date();
            // check the mode (Continuous or Non-Continuous)

            // If non-continuous get the current task and update the endTime

            // If continuous popup a modal to log next task

        }
        else if(btnText == 'Log the pending task'){
            // get temp task 

            // update temp task with info given

        }
    }

    let icon : ReactElement<LucideProps>;
    let startBtnText : string = 'Start';
    if(!isStarted){
        icon = <Play/>
    }
    else{
        icon = <Ban/>
        startBtnText=' Stop'
    }

    return(
        <div className="flex justify-between items-center gap-3 border w-8/12 p-6 rounded-sm m-5 mx-auto">
            <Input className="flex-1 outline-0" placeholder="What are you working on..." ref={taskRef}/>
            <span className="flex items-center gap-3">
                <Dropdown ref={categoryRef}/>
                <span className="border h-4 rounded-2xl border-gray-300 mx-2"></span>
                <Stopwatch isStarted={isStarted}/>
                <span className="border h-4 rounded-2xl border-gray-300 mx-2"></span>
                <ButtonWithIcon innerText={startBtnText} isRoundCorner={true} buttonSize="mid" onclick={handleStart} icon={icon} ref={btnRef}/>
                <span className="border h-4 rounded-2xl border-gray-300 mx-2"></span>
                <EditIcon/>
            </span>
        </div>
    )
}