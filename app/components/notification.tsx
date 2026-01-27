import { Dispatch, SetStateAction, useEffect, useState } from "react"



export default function Notification({notification, setNotification}: {notification : string, setNotification:  Dispatch<SetStateAction<string>>}) {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(()=> {
        if(notification == '') return;

        setIsVisible(true);
        const timeout = setTimeout(()=> {
            setIsVisible(false);
            setNotification('');
        },2000);

        return () => {
            clearTimeout(timeout);
        }
    },[notification])

    return(
        <>
        {
            isVisible &&
            <div className="bg-red-800 text-white absolute rounded-sm p-3 m-2">
                {notification}
            </div>
        }
        </>
    )
}