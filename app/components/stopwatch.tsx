'use client'

import { useEffect, useState } from "react"

interface StopwatchProps{
    isStarted: boolean,
}

export default function Stopwatch({isStarted}: StopwatchProps) {
    const [seconds, setSeconds] = useState(0);

    useEffect(() => {
        console.log(parseInt(localStorage.getItem('seconds') ?? '0'));
        setSeconds(parseInt(localStorage.getItem('seconds') ?? '0'))
    },[]);

    useEffect(() =>{
        console.log('start of 1', isStarted);
        
        if(!isStarted) {
            setSeconds(0);
            return;
        }

        console.log('start of 2');
        

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
    
    useEffect(() => {
        console.log('start of 3');
        
        if(seconds == 0) return;
        console.log('start of 4');
        
        localStorage.setItem('seconds', seconds.toString());
    },[seconds]);

    return(
        <div className="">
            {
                `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${currSeconds.toString().padStart(2, '0')}` 
            }
        </div>
    )
}