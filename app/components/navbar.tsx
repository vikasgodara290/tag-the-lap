import { SessionProvider } from "next-auth/react";
import Profile from "./profile";

export default function Navbar(){
    return(
        <div className="flex justify-between max-sm:justify-end items-center w-screen h-24 border-b-2 border-gray-200">
            <div className="w-1/7 h-full bg-gray-50 border-r-2 border-gray-200 max-sm:hidden"></div>
            <div className="">
                <SessionProvider>
                    <Profile/>
                </SessionProvider>
            </div>
        </div>
    )
}