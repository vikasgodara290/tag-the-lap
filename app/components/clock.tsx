'use client'

import { useEffect, useState } from "react";

export default function Clock(){
    const [time, setTime] = useState(formattedTime(new Date()));

    useEffect(() => {
        const timeInterval = setInterval(() => {
            setTime(formattedTime(new Date()));
        }, 1000);

        return () => clearInterval(timeInterval);
    },[])

    return(
        <div className="font-black text-9xl">
            {time}
        </div>
    )
}

const formattedTime = (objDate : Date) => {
    const hour = objDate.getHours().toString().padStart(2,'0');
    const minutes = objDate.getMinutes().toString().padStart(2,'0');
    const seconds = objDate.getSeconds().toString().padStart(2,'0');
    return `${hour}:${minutes}:${seconds}`;
}