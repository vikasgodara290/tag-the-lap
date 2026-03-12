import { Dispatch, SetStateAction, useEffect, useState } from 'react';

export default function Notification({ notification, setNotification }: { notification: string; setNotification: Dispatch<SetStateAction<string>> }) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (notification == '') return;

    setIsVisible(true);
    const timeout = setTimeout(() => {
      setIsVisible(false);
      setNotification('');
    }, 2000);

    return () => {
      clearTimeout(timeout);
    };
  }, [notification]);

  return <>{isVisible && <div className="absolute m-2 rounded-sm bg-red-800 p-3 text-white">{notification}</div>}</>;
}
