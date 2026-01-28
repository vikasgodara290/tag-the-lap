'use client'

import { Clock9 } from "lucide-react";
import { Dispatch, SetStateAction, useEffect, useState } from "react"

interface StopwatchProps{
    isStarted: boolean,
    currentSeconds: number | undefined
}

export default function Stopwatch({isStarted, currentSeconds}: StopwatchProps) {
    const [seconds, setSeconds] = useState(currentSeconds ? currentSeconds : 0);

    useEffect(() =>{
        if(!isStarted) {
            setSeconds(0);
            return;
        }

        const timeInterval = setInterval(() => {
            setSeconds(prev => prev + 1);
        }, 1000);
        
        return () => {
            clearInterval(timeInterval);
        } 
    },[isStarted]);
    
    let hours = Math.floor((seconds / 3600) % 24);
    let minutes = Math.floor((seconds / 60) % 60);
    let currSeconds = seconds % 60;

    return(
        <div className="flex items-center justify-center gap-2">
            <Clock9 size={18} className="relative bottom-px"/>
            <span className="select-none">
                { `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${currSeconds.toString().padStart(2, '0')}` }
            </span>
        </div>
    )
}