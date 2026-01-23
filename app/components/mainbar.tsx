import { useEffect, useRef, useState } from "react";
import ButtonWithIcon from "./button-with-icon";
import Stopwatch from "./stopwatch";
import Input from "./input";
import Dropdown from "./dropdown";
import EditIcon from "./edit-icon";
import axios from "axios";

export default function MainBar(){
    const [isStarted, setIsStarted] = useState<boolean>(false);
    const categoryRef = useRef<HTMLSelectElement>(null);
    const taskRef = useRef<HTMLInputElement>(null);

    const handleStart = () => {
        const task = taskRef.current?.value;
        const category = categoryRef.current?.value;
        const startTime = new Date();
        axios.post('http://localhost:3000/api/task',{
            task, 
            category, 
            startTime
        })

        setIsStarted(!isStarted);
    }
    
    useEffect(() => {
        setIsStarted(localStorage.getItem('isWatchRunning') === 'true'? true : false);
    },[]);

    useEffect(() => {
        localStorage.setItem('isWatchRunning', isStarted? 'true': 'false');
    },[isStarted]);

    return(
        <div className="flex justify-between items-center gap-3 border w-1/2 p-3 rounded-xl m-5">
            <Input className="flex-1 outline-0" placeholder="What are you doing..." ref={taskRef}/>
            <span className="flex items-center gap-3">
                <Dropdown ref={categoryRef}/>
                <Stopwatch isStarted={isStarted}/>
                <ButtonWithIcon innerText={'Start'} isRoundCorner={true} buttonSize="mid" onclick={handleStart}/>
                <EditIcon/>
            </span>
        </div>
    )
}