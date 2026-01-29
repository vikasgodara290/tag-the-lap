'use client'

import { useEffect, useRef, useState } from "react";
import Input from "./input";
import Dropdown from "./dropdown";
import ButtonWithIcon from "./button-with-icon";
import { X } from "lucide-react";

const categoryArr = [
    "Entertainment",
    "Study",
    "Job",
    "Health"
]

export default function TaskPopup() {
    const categoryRef = useRef<HTMLSpanElement>(null);
    const taskRef = useRef<HTMLInputElement>(null);
    const modalRef = useRef<HTMLDivElement>(null);
    const [isVisible, setIsVisible] = useState(true);

    useEffect(() => {
        function handlePointerDown(e: MouseEvent) {
            if (!isVisible) return;
            if (!modalRef.current) return;

            if (!modalRef.current.contains(e.target as Node)) {
                setIsVisible(false);
            }
        }

        document.addEventListener("mousedown", handlePointerDown)
        return () => {
            document.removeEventListener("mousedown", handlePointerDown)
        }
    }, [isVisible]);

    return(
        <>
         {
            isVisible &&
            <div ref={modalRef} className="border w-1/4 p-5 absolute bg-white top-1/6 left-1/2 transform -translate-x-1/2">
                <div className="flex justify-end mb-4">
                    <X/>
                </div>
                <div className="flex justify-between gap-2">
                    <Input className="flex-1 outline-0" placeholder="What are you working on..." ref={taskRef}/>
                    <Dropdown ref={categoryRef} options={categoryArr}/>
                </div>
                <div className="flex justify-center gap-4 mt-10">
                    <ButtonWithIcon innerText="Submit"/>
                    <ButtonWithIcon innerText="Log Later"/>
                </div>
            </div>
         }
        </>
    )
}