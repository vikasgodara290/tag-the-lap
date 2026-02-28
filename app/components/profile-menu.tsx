import { signOut } from "next-auth/react"
import { Dispatch, SetStateAction, useEffect, useRef } from "react";

interface ProfileMenuProps {
    isOpen: boolean,
    setIsOpen: Dispatch<SetStateAction<boolean>>
}

export default function ProfileMenu({isOpen, setIsOpen}: ProfileMenuProps) {
    const menuRef = useRef<HTMLDivElement>(null);
    useEffect(() => {
        isOpen && menuRef.current?.focus();
    },[isOpen])
    
    const handleOnBlur = () => {
        setIsOpen(false)
    }
    return(
        <>
        {
            isOpen &&
            <div tabIndex={0} className="bg-white border-2 border-gray-200 rounded-sm absolute w-32 max-sm:w-20 outline-0" onBlur={handleOnBlur} ref={menuRef}>
                <span className="hover:cursor-pointer" onClick={() => signOut()}>Log Out</span>
            </div>
        }
        </>
    )
}