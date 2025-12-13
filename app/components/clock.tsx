'use client'

import { useEffect, useState } from "react";

export default function Clock(){
    const [time, setTime] = useState(formattedTime(new Date()));
    const [currDate, setCurrDate] = useState(formattedDate(new Date()));

    useEffect(() => {
        const timeInterval = setInterval(() => {
            setTime(formattedTime(new Date()));
            setCurrDate(formattedDate(new Date()));
        }, 1000);
        return () => clearInterval(timeInterval);
    },[])

    return(
        <div className="font-black text-9xl" suppressContentEditableWarning={true} >
            <span className="">{time}</span>
            <span className="ml-8 text-4xl">{currDate}</span>
        </div>
    )
}

const formattedTime = (objDate : Date) => {
    const hour = objDate.getHours().toString().padStart(2,'0');
    const minutes = objDate.getMinutes().toString().padStart(2,'0');
    const seconds = objDate.getSeconds().toString().padStart(2,'0');
    return `${hour}:${minutes}:${seconds}`;
}

const formattedDate = (objDate : Date) => {
    const year = objDate.getFullYear();
    const month = objDate.toLocaleString('default', { month: 'short' }); 
    const day = String(objDate.getDate()).padStart(2, '0');

    const formattedDate = `${day}-${month}-${year}`;
    return formattedDate;
}