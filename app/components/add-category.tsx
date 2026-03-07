'use client'
import { X } from "lucide-react";
import ButtonWithIcon from "./button-with-icon";
import Input from "./input";
import Dropdown from "./dropdown";
import { useRef } from "react";
import axios from "axios";
import { useSession } from "next-auth/react";


export default function AddCategory({
    isVisible,
    setIsVisible,
}: {
    isVisible: boolean,
    setIsVisible: React.Dispatch<React.SetStateAction<boolean>>
}){
    const catColorRef = useRef<HTMLSpanElement>(null);
    const catRef = useRef<HTMLTextAreaElement>(null);
    const modalRef = useRef<HTMLDivElement>(null);
    const url = process.env.NEXT_PUBLIC_BASE_URL;
    const session = useSession();

    const handleClosePopUp = () => {
        setIsVisible(false);
    }

    const handleAddCategory = () => {
        axios.post(`${url}/api/category`, {
            category: catRef.current?.value,
            categoryColor: catColorRef.current?.textContent.trim(),
            userId: session.data?.user.id
        });
        setIsVisible(false);
    }

    return(
        <>
        {
            isVisible &&
            <div className="absolute w-screen h-screen bg-gray-600/50 z-50 top-0 left-0 right-0 bottom-0">
                <div ref={modalRef} className="border-2 border-gray-200 w-5/12 max-sm:w-11/12 p-5 absolute bg-white top-1/6 left-1/2 transform -translate-x-1/2 rounded-md">
                    <div className="flex justify-end mb-4">
                        <X onClick={handleClosePopUp} className="hover:cursor-pointer"/>
                    </div>
                    <div className="flex justify-between sm:items-center gap-2 max-sm:flex-col">
                        <Input className="flex-1 outline-0" placeholder="category name..." ref={catRef} maxLength={15}/>
                        <Dropdown ref={catColorRef} options={toOptions()}/>
                    </div>
                    <div className="flex justify-center gap-4 mt-10">
                        <ButtonWithIcon innerText="Add" onclick={handleAddCategory} className="bg-linear-to-b from-violet-500 via-violet-600 to-violet-500 hover:via-violet-700 text-white px-6"/>
                    </div>
                </div>
            </div>
        }
        </>
    )
}


function toOptions() {
    const catColor = [
        {
            id: 1,
            color: "red"
        },
        {
            id: 2,
            color: "green"
        },
        {
            id: 3,
            color: "orange"
        },
        {
            id: 4,
            color: "pink"
        }
    ]
  return catColor.map(c => ({
    id: c.id,
    option: c.color,
  }))
}