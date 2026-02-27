"use client"
import { useSession } from "next-auth/react";
import { useRef, useState } from "react";
import ProfileMenu from "./profile-menu";

export default function Profile() {
    const [isOpen, setIsOpen] = useState(false);
    
    const session = useSession();
    const handleProfileClick = () => {
        setIsOpen(prev => !prev);
    }
    return (
        <div className="">
            <div className="flex pr-4 items-center h-13 border-2 border-gray-200 rounded-full bg-gray-50 mr-6 hover:cursor-pointer" onClick={handleProfileClick}>
                <div className="rounded-full border-2 border-gray-200 h-12 w-12 overflow-hidden">
                    <img src={session.data?.user?.image!} alt="profile" />
                </div>
                <div className="ml-2">
                    <span>{session.data?.user?.name}</span>
                </div>
            </div>
            <div className="">
                <ProfileMenu isOpen={isOpen} setIsOpen={setIsOpen}/>
            </div>
        </div>
    )
}