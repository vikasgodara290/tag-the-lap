'use client'

import { useEffect, useState } from "react"

interface StopwatchProps{
    isStarted: boolean,
}

export default function Stopwatch({isStarted}: StopwatchProps) {
    const [seconds, setSeconds] = useState(0);

    useEffect(() =>{
        if(!isStarted) return;

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
        <div className="">
            {
                `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${currSeconds.toString().padStart(2, '0')}` 
            }
        </div>
    )
}